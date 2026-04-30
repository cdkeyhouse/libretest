const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const repoRoot = path.resolve(__dirname, '..');
const defaultBaseUrl = 'http://127.0.0.1:8765/split/';
const backendUrl = 'https://script.google.com/macros/s/AKfycbw_uv4htKdG-Qur5DZysZgdbOdQ8kCeGJiIkErJut3-U7QQqGq8TV3HwggGaJfGIqgqyw/exec';
const baseUrl = process.env.BASE_URL || defaultBaseUrl;
const facId = process.env.FAC_ID || 'FAC-001';
const facPin = process.env.FAC_PIN || '4101';
const headless = process.env.HEADFUL !== '1';
const strictNewSessionUi = process.env.STRICT_NEW_SESSION_UI === '1';
const scenarioFilter = String(process.env.SCENARIO_FILTER || '').trim().toLowerCase();

const scenarios = [
  {
    name: 'taller multigrupo observacion general',
    pattern: /Taller/i,
    exclude: null,
    kind: 'general',
    maxVisibleMs: 800
  },
  {
    name: 'multigrupo normal observacion general',
    pattern: /Razonamiento Matem.tico.*3 grupos|3 grupos.*Razonamiento Matem.tico/i,
    exclude: null,
    kind: 'general',
    maxVisibleMs: 800
  },
  {
    name: 'grupo normal observacion general',
    pattern: /5 alumno\(s\).*Razonamiento Matem.tico|TAU\s+Razonamiento Matem.tico/i,
    exclude: /grupos/i,
    kind: 'general',
    maxVisibleMs: 800
  },
  {
    name: 'taller multigrupo observacion final',
    pattern: /Taller/i,
    exclude: null,
    kind: 'final',
    maxVisibleMs: 800
  },
  {
    name: 'multigrupo normal observacion final',
    pattern: /Razonamiento Matem.tico.*3 grupos|3 grupos.*Razonamiento Matem.tico/i,
    exclude: null,
    kind: 'final',
    maxVisibleMs: 800
  }
];

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

function startStaticServerIfNeeded() {
  if (baseUrl !== defaultBaseUrl) return Promise.resolve(null);
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(repoRoot, requestPath);
      if (requestPath.endsWith('/')) filePath = path.join(repoRoot, requestPath, 'index.html');
      if (!filePath.startsWith(repoRoot)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, {
          'content-type': contentType(filePath),
          'cache-control': 'no-store'
        });
        res.end(data);
      });
    });
    server.once('error', () => resolve(null));
    server.listen(8765, '127.0.0.1', () => resolve(server));
  });
}

async function login(page) {
  await page.goto(baseUrl + (baseUrl.includes('?') ? '&' : '?') + 'verify=save-regression', { waitUntil: 'domcontentloaded' });
  await page.fill('#facilitadorId', facId);
  await page.fill('#pinInput', facPin);
  await page.click('#loginBtn');
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('button')).some((button) => /Abrir/i.test(button.textContent || ''));
  }, null, { timeout: 90000 });
}

async function clickOpenButton(page, cardId) {
  await page.evaluate((id) => {
    const card = document.getElementById(id);
    if (!card) throw new Error('No existe tarjeta ' + id);
    const button = Array.from(card.querySelectorAll('button'))
      .find((item) => /Abrir/i.test(item.textContent || '') && item.offsetParent !== null && !item.disabled);
    if (!button) throw new Error('No hay boton Abrir visible en ' + id);
    button.click();
  }, cardId);
}

async function openScenario(page, scenario) {
  const cards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[id^="plan-card-"]')).map((card) => ({
      id: card.id,
      text: (card.innerText || '').replace(/\s+/g, ' ').trim()
    }));
  });
  const target = cards.find((card) => scenario.pattern.test(card.text) && !(scenario.exclude && scenario.exclude.test(card.text)));
  if (!target) {
    throw new Error(`No encontre tarjeta para escenario "${scenario.name}". Tarjetas: ${JSON.stringify(cards, null, 2)}`);
  }
  await clickOpenButton(page, target.id);
  await page.waitForSelector('textarea[id^="obs-general-"]', { timeout: 60000 });
  const inputId = await page.locator('textarea[id^="obs-general-"]').first().getAttribute('id');
  const planId = String(inputId || '').replace('obs-general-', '');
  await page.waitForFunction((id) => {
    const button = document.getElementById('plan-save-' + id);
    return button && !button.disabled && /Guardar cambios/i.test(button.textContent || '');
  }, planId, { timeout: 60000 });
  return { target, inputId, planId };
}

async function saveObservation(page, scenario) {
  console.log(`[regression] escenario: ${scenario.name}`);
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await login(page);
  const { target, inputId, planId } = await openScenario(page, scenario);
  console.log(`[regression] objetivo: ${scenario.name} -> ${planId}`);
  const note = `QA ${scenario.name} ${Date.now()}`;
  let finalTarget = null;
  if (scenario.kind === 'final') {
    const preferredPrefix = 'obs-final-' + planId + '-';
    const preferredLocator = page.locator(`textarea[id^="${preferredPrefix}"]`).first();
    const hasPreferred = await preferredLocator.count();
    const finalInputId = hasPreferred
      ? await preferredLocator.getAttribute('id')
      : await page.locator('textarea[id^="obs-final-"]').first().getAttribute('id');
    if (!finalInputId) {
      throw new Error(`${scenario.name}: no encontre textarea de observacion final.`);
    }
    const normalizedFinalInputId = String(finalInputId || '');
    const onInput = await page.locator('#' + finalInputId).getAttribute('oninput');
    const onInputMatch = String(onInput || '').match(/updateOpenPlanFinalObservationDraft\('([^']*)',\s*'([^']*)'/);
    const targetPlanId = onInputMatch && onInputMatch[1] ? onInputMatch[1] : planId;
    const alumnoId = onInputMatch && onInputMatch[2]
      ? onInputMatch[2]
      : (normalizedFinalInputId.startsWith(preferredPrefix) ? normalizedFinalInputId.slice(preferredPrefix.length) : '');
    finalTarget = {
      inputId: finalInputId,
      planId: targetPlanId,
      alumnoId
    };
    console.log(`[regression] final target: ${JSON.stringify(finalTarget)}`);
    await page.fill('#' + finalInputId, note);
  } else {
    await page.fill('#' + inputId, note);
  }
  const countBefore = await page.locator('[id^="plan-card-"]').count();
  const startMs = Date.now();
  await page.evaluate((id) => {
    const button = document.getElementById('plan-save-' + id);
    if (!button) throw new Error('Falta boton guardar para ' + id);
    button.scrollIntoView({ block: 'center' });
    button.click();
  }, planId);

  await page.waitForFunction((id) => {
    const traces = window.__laSaveTrace || [];
    const trace = traces.find((item) => item.meta && item.meta.planId === id && item.label === 'guardarCambiosPlaneacion');
    return trace && trace.status !== 'running';
  }, planId, { timeout: 10000 });
  const visibleMs = Date.now() - startMs;
  const usesOutbox = await page.evaluate((id) => {
    const traces = window.__laSaveTrace || [];
    const trace = traces.find((item) => item.meta && item.meta.planId === id && item.label === 'guardarCambiosPlaneacion');
    const built = trace && trace.events && trace.events.find((event) => event.name === 'request_built');
    return !!(built && built.data && built.data.shouldUsePlaneacionOutbox);
  }, planId);

  if (scenario.kind === 'general') {
    await page.waitForFunction((value) => document.body.innerText.includes(value), note, { timeout: 5000 });
  }
  if (usesOutbox) {
    await page.waitForFunction((id) => {
      const traces = window.__laSaveTrace || [];
      return traces.some((item) =>
        item.label === 'planeacionOutboxSync' &&
        item.meta &&
        item.meta.planId === id &&
        item.status === 'success'
      );
    }, planId, { timeout: 90000 });
  }
  await page.waitForTimeout(800);

  const result = await page.evaluate(({ id, value, before, kind, finalInputId }) => {
    const input = document.getElementById('obs-general-' + id);
    const finalInput = finalInputId ? document.getElementById(finalInputId) : null;
    const traces = window.__laSaveTrace || [];
    return {
      countBefore: before,
      countAfter: document.querySelectorAll('[id^="plan-card-"]').length,
      targetStillExists: !!document.getElementById('plan-card-' + id),
      bodyContainsNote: document.body.innerText.includes(value),
      inputValue: input ? input.value : null,
      finalInputValue: finalInput ? finalInput.value : null,
      kind,
      traces: traces.filter((item) => item.meta && item.meta.planId === id)
    };
  }, { id: planId, value: note, before: countBefore, kind: scenario.kind, finalInputId: finalTarget && finalTarget.inputId || '' });
  const traceSummary = result.traces.map((trace) => ({
    label: trace.label,
    status: trace.status,
    duration_ms: trace.duration_ms,
    shouldSaveShared: trace.events && trace.events.find((event) => event.name === 'drafts_collected')?.data?.shouldSaveShared,
    shouldUsePlaneacionOutbox: trace.events && trace.events.find((event) => event.name === 'request_built')?.data?.shouldUsePlaneacionOutbox
  }));
  console.log(`[regression] visible=${visibleMs}ms outbox=${usesOutbox} traces=${JSON.stringify(traceSummary)}`);

  if (visibleMs > scenario.maxVisibleMs) {
    throw new Error(`${scenario.name}: guardado visible lento (${visibleMs}ms).`);
  }
  if (result.countAfter < result.countBefore || !result.targetStillExists) {
    throw new Error(`${scenario.name}: la tarjeta desaparecio. ${JSON.stringify(result, null, 2)}`);
  }
  if (scenario.kind === 'general' && !result.bodyContainsNote) {
    throw new Error(`${scenario.name}: la observacion no aparece localmente.`);
  }
  if (scenario.kind === 'general' && String(result.inputValue || '').trim()) {
    throw new Error(`${scenario.name}: el textarea no quedo limpio.`);
  }
  if (scenario.kind === 'final' && String(result.finalInputValue || '').trim() !== note) {
    throw new Error(`${scenario.name}: la observacion final no quedo visible en su campo.`);
  }
  if (errors.length) {
    throw new Error(`${scenario.name}: errores de consola: ${errors.join(' | ')}`);
  }

  let persisted = null;
  const persistDeadline = Date.now() + 90000;
  while (Date.now() < persistDeadline) {
    persisted = await page.evaluate(async ({ url, id, value, kind, finalTarget }) => {
      const session = JSON.parse(localStorage.getItem('la_v8_session') || '{}');
      const targetPlanId = kind === 'final' && finalTarget && finalTarget.planId
        ? finalTarget.planId
        : id;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'getPlaneacionObservaciones',
          token: session.token,
          payload: {
            planeacion_id: targetPlanId,
            skip_cache: true
          }
        })
      });
      const json = await response.json();
      const obs = json && json.data && Array.isArray(json.data.obs_semana) ? json.data.obs_semana : [];
      const finalObs = json && json.data && Array.isArray(json.data.obs_alumno_final) ? json.data.obs_alumno_final : [];
      return {
        ok: !!(json && json.ok),
        count: obs.length,
        finalCount: finalObs.length,
        containsNote: kind === 'final'
          ? finalObs.some((row) =>
              String((row && row.planeacion_id) || '').trim() === String(targetPlanId || '').trim() &&
              (
                !String((finalTarget && finalTarget.alumnoId) || '').trim() ||
                String((row && row.alumno_id) || '').trim() === String((finalTarget && finalTarget.alumnoId) || '').trim()
              ) &&
              String((row && row.nota) || '').trim() === value
            )
          : obs.some((row) => String((row && row.texto) || '').trim() === value),
        error: json && (json.error || json.message || json.code) || ''
      };
    }, { url: backendUrl, id: planId, value: note, kind: scenario.kind, finalTarget });
    if (persisted && persisted.ok && persisted.containsNote) break;
    await page.waitForTimeout(3000);
  }
  let persistedInputValue = '';
  if (strictNewSessionUi) {
    const context2 = await page.context().browser().newContext({ viewport: { width: 1440, height: 900 } });
    const page2 = await context2.newPage();
    await login(page2);
    await page2.waitForSelector('#' + target.id, { timeout: 60000 });
    await clickOpenButton(page2, target.id);
    try {
      await page2.waitForSelector('textarea[id^="obs-general-"]', { timeout: 60000 });
    } catch (err) {
      const bodyText = await page2.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 1200));
      throw new Error(`${scenario.name}: no abrio detalle en sesion nueva. Texto visible: ${bodyText}`);
    }
    await page2.waitForFunction((value) => document.body.innerText.includes(value), note, { timeout: 45000 });
    persistedInputValue = await page2.locator('textarea[id^="obs-general-"]').first().inputValue();
    await context2.close();
  }

  if (!persisted.ok || !persisted.containsNote) {
    throw new Error(`${scenario.name}: backend no devolvio la observacion persistida. ${JSON.stringify({ persisted, traceSummary }, null, 2)}`);
  }
  if (scenario.kind === 'general' && String(persistedInputValue || '').trim()) {
    throw new Error(`${scenario.name}: sesion nueva reinyecto texto en textarea.`);
  }

  return {
    scenario: scenario.name,
    planId,
    visibleMs,
    target: target.text.slice(0, 160),
    traces: traceSummary
  };
}

(async () => {
  const server = await startStaticServerIfNeeded();
  const browser = await chromium.launch({ headless });
  const results = [];
  try {
    const selectedScenarios = scenarioFilter
      ? scenarios.filter((scenario) => scenario.name.toLowerCase().includes(scenarioFilter))
      : scenarios;
    if (!selectedScenarios.length) {
      throw new Error('SCENARIO_FILTER no coincide con ningun escenario: ' + scenarioFilter);
    }
    for (const scenario of selectedScenarios) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      try {
        results.push(await saveObservation(page, scenario));
      } finally {
        await context.close();
      }
    }
    console.log(JSON.stringify({ ok: true, results }, null, 2));
  } finally {
    await browser.close();
    if (server) server.close();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
