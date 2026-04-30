# Protocolo anti-regresion LibreAprendiz Split

Este protocolo es obligatorio cuando se toca una funcion sensible o un bug ya corregido.

## Funciones sensibles

- `savePlanChanges`
- `renderPlaneacionesList`
- boot/login
- outbox/snapshot
- activar planeacion
- marcar material listo
- cierre de semana
- guardados admin
- flujos multigrupo/taller

## Antes de tocar codigo

1. Identificar si la zona ya tuvo regresiones.
2. Listar callsites directos e indirectos.
3. Separar estados:
   - fuente visual inmediata
   - fuente backend
   - draft/input visible
   - cache/snapshot
   - outbox
   - rollback/error
4. Confirmar que una condicion visual no esta siendo usada como condicion de guardado.
   - Mal: "existe editor multigrupo, entonces guarda lote".
   - Bien: "la firma compartida cambio, entonces guarda lote".
5. Definir la prueba anti-regresion especifica antes del parche.

## Durante el parche

- Un parche = un problema.
- No mezclar frontend/backend/diseno salvo necesidad explicita.
- No crear un segundo estado visual para el mismo dato sin definir cual reemplaza al anterior.
- Si un dato se muestra como guardado, el input/draft que lo capturo debe limpiarse en exito local.
- El outbox puede conservar payload para reintento, pero no debe reinyectarlo como texto visible.

## Despues del parche

Ejecutar la prueba especifica del bug, no solo smoke general.

Para `savePlanChanges`, minimo:

- Grupo normal: guardar observacion general.
- Multigrupo normal: guardar observacion general.
- Taller multigrupo: guardar observacion general.
- Multigrupo normal: guardar observacion final por alumno.
- Taller multigrupo: guardar observacion final por alumno.
- Verificar:
  - boton vuelve rapido;
  - tarjeta no desaparece;
  - observacion aparece una sola vez;
  - textarea de observacion general queda vacio;
  - observacion final queda visible en el campo del alumno;
  - API backend confirma con `skip_cache` que la observacion persistio;
  - no se llama guardado pesado de lote si solo cambio observacion.

## Comando recomendado

Desde `C:\Users\rafae\OneDrive\Documents\libretest`:

```powershell
$env:NODE_PATH='C:\Users\rafae\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
& 'C:\Users\rafae\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts\regression-save-planchanges.js
```

Variables utiles:

- `BASE_URL`: URL a probar. Default: `http://127.0.0.1:8765/split/`.
- `FAC_ID`: default `FAC-001`.
- `FAC_PIN`: default `4101`.
- `HEADFUL=1`: abre navegador visible.
- `STRICT_NEW_SESSION_UI=1`: ademas de verificar persistencia por API, abre el detalle en una segunda sesion y valida la UI. Es mas lento, hace mas logins y puede fallar por rate-limit/latencia visual, por eso no es default.

La verificacion de persistencia reintenta hasta 90s porque el outbox puede seguir sincronizando en segundo plano. Usa `skip_cache` para no confundir cache viejo de observaciones con fallo de guardado.
