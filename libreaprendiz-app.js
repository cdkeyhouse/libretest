    const STORAGE_KEYS = {
      session: 'la_v8_session',
      bootSnapshot: 'la_v8_boot_snapshot',
      planeacionOutbox: 'la_v8_planeacion_outbox'
    };
    const BOOT_SNAPSHOT_MAX_AGE_MS = 1000 * 60 * 60 * 12;
    const FACILITADOR_FEED_SNAPSHOT_MAX_AGE_MS = 1000 * 60 * 3;
    const OPEN_PLAN_DETAIL_SNAPSHOT_MAX_AGE_MS = 1000 * 60 * 8;
    const OPEN_PLAN_OBS_SNAPSHOT_MAX_AGE_MS = 1000 * 60 * 8;
    const LOGIN_PRELOAD_CATALOG_BLOCKS = ['materias', 'semanas', 'grupos'];

    function createEmptyAlumnoEditorState() {
      return {
        alumno_id: '',
        matricula: '',
        nombres: '',
        alias: '',
        aliasTouched: false,
        apellidos: '',
        grupo_id: '',
        estatus: 'activo',
        notas_internas: ''
      };
    }

    function createEmptyAlumnoCambioState() {
      return {
        alumno_id: '',
        nuevo_grupo_id: '',
        motivo: ''
      };
    }

    function createEmptyAlumnosUiState() {
      return {
        search: '',
        filter: 'activos',
        grupo: '',
        sourceRevision: 0,
        editorOpen: false,
        editorMode: 'new',
        selectedAlumnoId: '',
        editor: createEmptyAlumnoEditorState(),
        cambioGrupoOpen: false,
        cambioGrupo: createEmptyAlumnoCambioState(),
        historialOpen: false,
        historialAlumnoId: '',
        archivedShadow: {},
        remoteHistoryByAlumno: {},
        remoteHistoryLoadedByAlumno: {},
        remoteHistoryFailedByAlumno: {},
        historyByAlumno: {},
        notesByAlumno: {},
        mockRows: []
      };
    }

    function createEmptyFacilitadorEditorState() {
      return {
        facilitador_id: '',
        nombre_completo: '',
        nombre_mostrado: '',
        rol: 'facilitador',
        color_ui: '',
        activo: true,
        pin_plano: ''
      };
    }

    function createEmptyFacilitadorAsignacionState() {
      return {
        asignacion_id: '',
        facilitador_id: '',
        grupo_id: '',
        materia_id: '',
        activa: true,
        fecha_inicio: '',
        fecha_fin: ''
      };
    }

    function createEmptyFacilitadoresUiState() {
      return {
        search: '',
        filter: 'activos',
        selectedFacilitadorId: '',
        panelMode: 'detail',
        editorOpen: false,
        editorMode: 'new',
        editor: createEmptyFacilitadorEditorState(),
        pinOpen: false,
        pinValue: '',
        asignacionOpen: false,
        asignacion: createEmptyFacilitadorAsignacionState()
      };
    }

    function createEmptyTallerEditorState() {
      return {
        taller_id: '',
        nombre: '',
        materia_id: '',
        facilitador_id: '',
        estatus: 'activo'
      };
    }

    function createEmptyTalleresUiState() {
      return {
        search: '',
        filter: 'activos',
        selectedTallerId: '',
        editorOpen: false,
        editorMode: 'new',
        editor: createEmptyTallerEditorState(),
        membershipOpen: false,
        membershipSearch: '',
        membershipGroup: '',
        membershipSelectedAlumnoIds: []
      };
    }

    function createEmptyMateriaEditorState() {
      return {
        materia_id: '',
        nombre: '',
        admite_submaterias: false,
        estatus: 'activa'
      };
    }

    function createEmptySubmateriaEditorState() {
      return {
        submateria_id: '',
        materia_id: '',
        nombre: '',
        estatus: 'activa'
      };
    }

    function createEmptyMateriasUiState() {
      return {
        search: '',
        filter: 'activas',
        selectedMateriaId: '',
        editorOpen: false,
        editorMode: 'new',
        editor: createEmptyMateriaEditorState(),
        subEditorOpen: false,
        subEditorMode: 'new',
        subEditor: createEmptySubmateriaEditorState()
      };
    }

    function createEmptyReportesUiState() {
      return {
        alumno_id: '',
        periodo_id: '',
        lastResult: null
      };
    }

    function createEmptyMaintenanceUiState() {
      return {
        selectedCategories: ['planeaciones', 'seguimiento', 'evaluaciones', 'reportes'],
        trashReportFiles: true,
        preview: null,
        audit: null,
        lastReset: null
      };
    }

    const FIXED_BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwV-oW-muzvKxlc3zmsQWIN7jQViq7fKZltWAuKsErx9Hej8Q59FV0AlzXFCsPdjxBA/exec';
    const BRAND_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAECCAYAAACR7GlXAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nO2dC3xcVbX/1z7nzGQySUlDA6HySGnLQ9AScnnk3hhJwZQWEh6KIvpXC3rv569ShYCA/BEB/ShXIa0W0Kvy8l7xcUWKibQQHsVQDIJpCr28bkib0tKmpE0fyWQe5/H/rGRPOTn7zMyZmTPnMbO/n08/bfc5mTlncn6z1l577bWIpmnA4XCcReKft3fp6m+eDQAtIanmIlmNfpyAOCeh7p9tdsECKYuKJLRPFALvRuXRRwBgfXtD7wBzIscTcIvnMbr6m+eVB47qSCgHPi+rkcMJiKCBkvVFCkTSNE1Ty6Tq/qg8+oP2ht41zEkc1+DC8whd/c0tZeLhv4gpe0+w+4p0Ivx1VB69o72hdytzEsdRuPBcpqu/uT4gzHpcVseP08CZ30VIqnkwKo92tDf07mMOZom6oa4eAGbTP/VpfhrdXny/rULTcMkLnwvPJXD+FpKOeCQm71mqgUqcvgoCohIUq25cctrjdzMHU0BF1kIFhn9OMz/TEs+jCHEuin9KTYxceC6AVk4gZRtULRZ28zpw/hgQZ22OK/uaU1k/dUPdJQCQ/FPFnGAfw1SEa4Sm4aKfj3LhOcxTmy6+LqbsvctL1ySQsoiqxZqSUVBq2a5xQGyp2A8ADwHAqmK1hFx4DrJuoO12WT34HTdcy0wQENXT1V23z41NngsA52Q43UnQJb1NaBpe76FryhsuPId4YuOS+1UtdqUXRZdEABE+lhiGWbLKHPMARSVALjwHQPcyruz7sZdFl8Tj4gMqwOV+d0EFZoRjK34SHaKCAn3B40H27tWiG7xF3VB3G3PER3CLV0AweklA/IcGiu++4GqFAJwx8Q4z7jE2Uevnu9Q4bvEKiCSEn/Gj6JDdqgyjwTJm3GPgOuJGdUPdNV6/UCNceAWi59VLH1DU2OF+vX7MoumXjvWyy6lnpbqh7iFm1MNwV7MAoIuJ38R+vw9cYD8RIrBwcoQ55lHQ9WwRmoZNkwG8BLd4BQBzL4vhPnBXxCCUM+MeBl3P9eqGOtOtU16CWzy6FQcA9H/0JNeNBlKlVRle6xIC4mO5bOXxImj1ToMJOHpyt58u2/OWrySFh65gSKr5hqImliXU/UcREDQAQlKJRSQhVdGiAgFRDopVW1RN+W1C3f+g2faav2z8xEFVi1UyL+JjwkIIFk+87bcb8LT4SkZ44e6eNmYwC/yckOwHFC0KCvH9R4vzvRZm1AW89Ek+GO7ueYoZtQAugBMQX+GiKywHhGAx3IYnrJ4nHtRwdw9mi8wCgNZwd88LzAlpwECKJITR0ompz+LYgSzOKYbPsc4LUU5T4YW7e74S7u65kwrCCb4DAMk9KE3h7p5rrb4nlsjz8y4AP5EQZhXLrVzjdqDFdDkh3N2zXlfwZgcAbAeAVwDg95G21l7mB/Ik3N2DK7O1ulcZB4BjI22taTMOsPoyAeFZv+zu9jvzpCo49eBrxXI7twtNw65ZvlRNS/QP/NH0z9kA8PVwd88oALwPANsAAN3C/4q0tTI5i1YJd/fcYxAdUkl98bQZB5IQflRWI1x0DhFQDxbT7aDVW+VWOlkqi3cLAHyPOZAatIpYJ2BFpK311ZRnse/TjHnFdH5nBH/Lx6WyetO1TMbucqrsOQfgw9oYzI9+IL6xQADGhQAcCC6AferkofEAEeEwIFCVGIZKJeblwklXCk3DrgRbUgkP53ZbmAOZiQHAXyNtrUsynRnu7qkDgH4ASDc/64i0ta5kRqd3AUyqWizEHOAUjLOV6Q2xg8EFsEcZx2YooGpy2rfDc4imwlGCBAtiQ14T4SahaThdv4eCYSo8mBYGupLHMges8UakrfWUVGdaFN3UBxNpa2U+mK7+5uUExAezyUzBfWWEBBRVi6aMfgokpGhaQuQZLywCCQLRZFCB5NQ2DKZ3dECVIMEibwnwdDeKJaWa4yE9AHAVM2qND4e7e56PtLUyFYnD3T0YTeq1IDrE1KIFhKofJtT9zHgSur9OlYTK9yWx/O3JxC7cqjOgaQq0N/SmzNfDYA39Z3154KhLZWXyxOn9ern1qCsmVC2e991ooMI+NQ5/DRwDJ5QJcOKEJ0pjLqfl6h0lncWbTQMoZvMvq1wRaWv9neF1cZG81eLP74i0tR6jH6C7xWe4wSgMTK4IilVDMWXvfXZ3Q0VBhqSaL8pq5GJFjVVroPCATp6g9asQJGiKDIJk/gg6xbDQNOzUstkhUgoPpkWCormcOWCd0Uhb6xG618tWzMORttYZHwpu9Umo+28lU0uQRAmIh70QV8ZWOdXxFIUfkmpujSsHr9A0OVTqljBfcHd7c+Rtt8XnuLtpuoCeJNLW+lncisUcsE5NuLtHP0e7LEsLyrjCqpa4TBLCezVQr2xrWC+df9qfW5xsM4w7zVsXPXbVhac/Xa6BcmVAqNpFLS4nByJqFHrDJ7q988Hx/M20wqOcTxe0c0WfIfCxLF+DeV9Fi3x+Wf2Tc9obel3PucNrWFrfPVcDZTF+GRDgHmguoPgGwgvcvIS068WFIKPw6LrcBWYisEAs0taaMphhAWYNz865m11gwAa/DIJi9fXYadVr1+cHsHL1SOhIt66UiZwXGsaVMwPTxMLdPU0A0J3lEkO+NeFs2zFMXV60vi3nhcsbcWyPohw+qiiHhwRhsk6SduxRlPcGYvFXab/ugVSL96nAtsZd/c33B4RZPbI68U88lc06mAixkYThEwTcmO9VYTNOJ+d5aYMrZtCAywUW52r/HmlrvSn5n3B3D4ZtTRfETUibuWLhOusbQ6Grdivyp4cS8lEVgqBOqKql3RiHCYJ2QFVJtShE54ji4GA8gX3C12eTGvf0q5f9a1Qe/TnfqmQdlytXX+pkC+icaq7Q6CTOsdAK1jAnTPNSpK210fBzzFJAGpift3Bd8+rLgrcOy/LlE6pWHtc0Wy3OXEncW07IPUMJeaWVLwSMgOKWJdw9waOf1nCxtoujSdN5FzsKd/f8GwB8nm6tR0GOAcDDkbbWVczJ0+fvBIBM1bhwPtlkNe+TCu4PA7H4mczBAhAiRK0LSL1vxRPLM1nB6cJL1WsSyv5zcAGZkx60emcp70FNPMYcKzAPC03Dy516M8erjNHE6K40Te1RdF+JtLX+njnCvtaU4F6PJ86w27pZpb4s+PJALP6ZTAJ8ctNF6xPK/o/zeV9mjhaCUD/huNV7XmgadmxZwfH5B93Phy4nNvYY1R3COd1L1NKlFR26uv/S8/wD6LailXNLdAi1slvweqgLbgquN4pC+CfT6WycdOwugU/I9bqayV3uVgMXGDSpFoUNE6oWjnuoJmiQEKgQSGRMUS9Mt4TyxMYl96ta9Cq+nSk950e3OR3ddDR1zFcFbU9c9+zK7bLi6e6fQUK0I0XhJ28vPTdl+QrqdvI5XwpwJ0RjYhiqEwnzEwr1vk3DjnlOjgiPWrV5dKFS745tpX/SrpmhC1cXkHq2y/IZfuibgdbvuIC0eTCeaE51X+sGLng5oR48gznAmQL3/jkdYCkK4YW7e1pOCgZu260oZ48paggfRjPXsEIg2oSqkbmSuL9CEJ4ajCdu0LudKLq5kvjOTlnxXUEjXH7YKSsLzMQ3XR2tYqusTqQKMpU0xt3uTuBr4YW7e5ZXi8LqCVWrNBNaJtBVO0YSR4YS8hVoCf0quiRUfOdF2lqZrAhahLefbzNi4cKzCAY96gLS4ztl5Tg7gh4iAQgAkaOaZimtzctUi8L4mKKaVk3DbU6yeuBWHmyZiQvCc7QMhC3LCWc8tf66ICH9wwnZFtHB1C4EgGIQHTKmqJVouc2WG5bWd39XEiq3MT9U4lQrUac/AOZLsZDkLbxFT63/w2BC/rGba2l+AN3lYyTxFbNLTagHmRIZpQxGNYudvISHotuSSHyai84auxV1AV34nwFurg1JNQ96/PIdA+u7zJKdXUqgO1IcI2fhoXu5LSFf5r+22O6Bbvjr8cRyjPgaLyIqj3bwvXzTBEnAja1B3nc1MZDyejxxF7d02YOfWbUorDXO99obeveJQvlqXkYC4AjiymOVMtuoEOQkvLmS+AwzyLHMhKqF6suCncbzZXX8dvS0SvmTxC+eYxLvMuMO4GitwayFhy7mbsW/62peAF3OgVj8SmM3JrR6AXHWoyX7wWBJBCK6sSVov9A07G3h7VSU7/N5nT3glibjC8WVfTf49HZsYR5JXxK+QDjqZkK2wsOslAOqalrdmZM9uKXIxOptxZKBpfhxiiDA/Igr1aW9LbxTgoGbubWzl4XBwI+ML5hQ938bm32UElig+GSIulXY1rFaK0ksCw+jcK/HEycwBzh5sT0hf9Lk59dk6sJTbOAWqbdJJfRXngw7y8qdLHA77PT8DrK0eC1Bd8K8RY1IQAh398woqIpBFiyQW2qfRUKLw04lAgPiXHgydNyUCLEHX4Fx3NpBNsKrLwte5KUd38UCbomqLwvebLwdSQg/XqqfSdLaowj/Jh0Nf688CaJiwb70TYtyFRrLwhvXNEcqeJUib8YTDcbbjsqjvxaIy608PAC6oO8rk/Bc2TzYUW57pelNbriZkJWrqWmZSvJxckcwNHeZKguvai638vAQqqbAJiiHgYqFdl6UK9YOshGearHcOyd7otOpd0z+piRU5NMspujAPYvvqbJd4ht2q/85uFHej2NOfVnwc8YDAgl4omWql0DX0ybxudptigvPI4yr6vHGKxGF8jdL9fNIx7T4EvnM+fa76WZClsJzfEtwKbFdVpjd6ZOJnRtK/XNJBbqdr0JFrtHO24SmYUe3ARnJOG/DhfOFwUDvdlmpZQ5ybCNFmQvP9QL0Eioo8Hr5SdAwnpVjgHM7V60dZLJ4GGkLEfL+YDzxEb73zh0ICZb8kkI6dinRbK2eY41J0pFSeJhNESLkHym+iTk2UyOKitnOdAEkvis9DTjfezNkuY3zT4SmYccTos0wFRVdU3osyjNVHCNAeH2/XNmlWsprHca5HTPqEozFw20qaOm8coEcTiY0IsBBiXmUjVzidkBFD3O1R4riS1FNY8Y5hSWhgelERdVivAhLBjC3c5+YdpvotU72N7fCDIFhN559qmp7QhwnM6OKIhqjmJg2poFylUDKIoT9juToOBBMOc972AtRTCOHSrjjskGIkD3c2rlHpK3V1OohaweWrZTVcU+3KHOTeVIVnHrwNeMVOFqWPRsOiQyrXnHReZdl9Wux397pklCxv9Q/CzP2qZPG0U1m+a9e4ZDQ3ownvujViywFFgak0Uy32d7QOyCrE/NKcZNsJipJmf6MKdF5KZhiZEp4uGYn8kmEq1QKwhYr74+702U1soCLbyZlcGi50/Oig6TwTgoGrsGd0MxRjmNgxbEF657d9y89zz9htpCu5wPxcbczSVUCl+ngYT+IDpLBlaPXPjOJXVuZoxxXwNo2FQLBnnpfiLS1pqwJgo0tAWAjc6DEQGftbPm9R444638/75c7n7J4XHTeAmvbYE89kcBji55a/5pZXz2gcz5JqFxV6rMEgQRifhId0JIDLZgnyBzhuA7WMMUE9WpR2GEsDZEEo52EBEp6y5YolP+ZGfQ4U1+VB1SVZ0d4mDFFDYcIecVYdTpJQKi4hZgnvpQEfix7PyU8XrbP+0Q1TZwriaY5tEtOe/xuQoJx5kAJEJJqXsay9367U76E4CP2KOrhZh1lYaowUnlJ1uGMyqOfYQZ9wJTw5kpiadUL9ymp2nvBtLt1Xyk1tcSAEgaW/GjtgApv605ZMd2Xx/Em9WXBW40XRhOqS+Y3Jgrhd2ganS8RIm2tW0OE8KimjxiW5cvNrjYgVHl+4dgOMGtHVsfP8PM9TLma8wPSEHOE41kwymnmbmqg7Cn239q06CILMHuHOegjpoQX1bTf+vkmSo3DBAHD0IzwJCFUtPmbOKcTSXh3MYgOkjVXhhLygwDAzBs43uSAqpou2omkOBOnCQhamXT4Q62LHruKOehTpiwezvMWBgObi+WmSpWYstfWjh5ug0kBAWHWNg3UhmISHeirjA3GEyuChDzL62d6H3Q1D6gqc50ExApm0GegS4kl+3BhPCqP3rC0/glPlOOzm0ML6JG21vXHBaT/KZo7K2Koq8msX8nqeI1f71ogZdGQdMRaDdRLAaC6ddFjZ+ESCXNikTBj/W4wnmgPETKI6UnFesPFQLUoRHYsO2+G8Lr6m+cREHz7ewuKs15rXfSnC5gDRcqMlDGc6320LPjVICE8edPDzBHFvxivLiBUXamBedDFD8hq9PBS+h0yuZrPf+LjvzxSFH5SuJbTnHzAL8XBeILJxtcgcbWfP1gC4hxmsIhhhIe8vfTcaxcGAs9zy+c9TgkGXkHPRH9h6GYqarS61D8bP2EqPGTjkpaWhQHpW1x83gFT+wZi8SXGCwpJNX/ws5tZiqQUHvLKkpa745p2brUoRLEOCMc98AswqmmXRdpaZ2RtYN2VmLzX13mLMNWODEpqh0xa4QFdZhhT1LmnBAMPhghhF484BQdFh96HWeEjSQg/UwzWTtWUkqqYZmkjLH7Lvth6zlVRTZszPyDdMVcS93MX1DlQdOh9GN+w59VLH1CKJBoYECt3MINFzKHeCdlCs+NbGkOhK7fLiaODhMwZSsim1bA42UNL/EXGFLUp0tbKdLp5atPF18WVfT8ulrkdbmr18/66bMlZeEZoCbox5gAnK6jgonNF8RYzKwfT8zpsJ/wgc8Cn4M55DZTFxZypYsTOnef1NIeQR2FyYK4k7q0VxZcGYvEf7Vv2iZQPIFo6ALiLOeBj6M55xqoXM3YKbzYXXe7slJXV7yw9N22r4Cc3tf8hoRy4jDngc7D/34WnP10Su+eT2GrxmBGOLXT1N7dIQsUaRZ2swsz9YiMoHvZ8qT0pvMiRh5kWXOWvCAjzZXWiKL0JnN9F5fd/wRwocrjwPMragfN7CZCPyep4sd+q0t7Qy6xPFju8oK1nEeZqUPxLpQFx1p+YwRLATuGV1OS4AKSMZBYzfux7YAd2Cm+A53PmRoUgqMYvLoGIVT66hZzwa98DO7BTeFt585PcmFBVwZidIqvRSh/dQk74te+BHdgmPNwjhrsYmAOcjMwPSLuM56harGibhWIkMyTVPFiq1g7sDq4cKYovMYMcK8wIp+NWH0ICRbsThBApGpVHO5gDJYStwnsrnljF53nZQwsK66nXtERRRpyxOK2qxZYVQzXofLAtSTrJ0WufmcDa/swBjil1AWnbG+cvrtMf63n10r9H5dEzzc4H6qqh1dA0OaiB4huBTpVhF8LMLoSu/uaPAcB/AcAxU6mbMNXeFv/Gqct7APDT9obee5kX9DG2/9LGFPXr3OpZAz+n4YT8JePJMXmsId0LlEnVD6pabG5QrLoBLQhzggdB0QXEquf1ouvqb67r6m/eCQC9+B2EVehpUkfybwwwnQgA93T1N8t4LhWp77Hd4iEnrnt2cLusLGAOcGaAQZXN5y+eqx/r6m++hID4mLHXHVo5SQhvS6gHz9EHJfyyL8/Y5aerv/nraMly/PLHdJ6PtDf0DjNHfEJB3JTtsnKG13ruea1cIe7gH0rIVxjHQ1LNzUbRYZXloFh1/dL6J+qMkUDsfx4UZ3/Ly5bPRHS4w+KePJ4/tIRbu/qbX2WO+ISCCA9LRUQ17Qwv1GhBdw6XOaoF8QEvie+UYGAd1rPRj3X1N882zu0w7I5uJQqMeRFKUnzMAZeZci+FWa+YtNb6vU1X9tGu/uaD6LIyRzxOwSbmuCAc1bR/ChHiWvUoFD4WacJiTduWnftlWiuUOc9pcNPrQCz+OeZ6pZpOoJG/oDgbuzcdj11yrEQAqTAXExA94WlMt9aas3Zp/RNn6q+/q7+5z+bnDq3fkN/EV5A5nh4sCXGMJL6yW1EXOJHZgsISANSTg4GHB2LxDn05PLyWuZL4zk5Zca1AEH4Z4BeSMVNluveBOCgKZftlNfKpXMsgoNWUhMpXFHVygVs90VH8GiiXme06wCAJDZ7Yjdre0Oub3hEFF16Sc57+678OJhI/PaCqIaUAbxkiRCsXyGS1INw1lJBXGutPJnFTfKlEB9MP5CrMd21v6H2I+cEcmA667L8Tp1hOCRCtXECs+mtcGbsklZVeN3Ch9qHqVphTeTqEy44EUawARZk4dDz5/0hsN+wZ3wjvjfVAQj3AvE4K9rc39Pqi4JZjwksS7u5ZPlcS796jqNX59uLDAEWFQGJ1kvTcQCx+s9kDbYbTVhgyiK5QoPVD9zUmj+GShVAoAaLgJKHi3YR68EuZLPXY+Bvarn0vwujBl2HfZOqucEdWNsKcWWfC0XPOg70HN8Ob7/0HRBLvMueZ8Hh7Q+8l7LC3cFx4SbA84PyAdGWIkCt2KsqxY4oaqhFF5YCqikYx1IiiivVcUKhzJXG8VhTfGIjFH8GtNPk8yIueWv+HbQn5skI348Q6pDtlpcVJ0elBAQaEqmsVLXq9piXK7Vh6MDaQtOoad/U3Z/3ANdTdDjVV08WyD0Tegf0T/wsHJt+CidgOM/FiQG++15caXBOeGeHunhaT4SRbjc067HrPalFYO6FqIbutH1pkjF5iICWV6+s0mAcakmq+IauRi2U1crhAgqqqxS0FO6aXLIhSJlVvjMqj9wHAmlQuZSq6+ptRGDkJ/+MnPwShYA0M734Ct01BebB2hrv69nsPwO5xjN3ArvaG3rnMC3gITwnPTU5c9+zKUUW9WgWQ8hUgLlvUSdIuXKczLhnkwkhjB85bsJbmmtq+Tlu/fLCuCwDMKw/MvVDTEnXGPnVl4uGDMWXvG7I6/jydg6Z9/67+5muwaFp7Q6/pkkE+wZWFRy4HVUvAh6rPgT0HX4M3dq4+dCwgHDb1N50Pau0NvZ5OpePC04Fzv1OCgS+PqerN2QZfMJqKgq0vC748EIvfYIfg4APR4ULxsbhNDx9qALi1tq/TliCMHXT1N2MGyr/hx2CwZjEAuE6fZ9nV34zCzSn0P7v8VJh/5BXQP3wLNNR9f2oM/50CT8/1eM0VHegOYvXmd5aei00SjweAK1FICwPSKHPydMBExrSv+rLg2rimTfXufrH1nLMKJDo9nikTQVO/VqBxNHEhy2iepV5o59AE6KzB+dys8PFTP5YUXFKAJpzHDnmHorZ49MGdbbd75hQjjR3PAUAzdc1wboQtmL9Y29fplfkiCmrIwhf4RHtD76Ed9TQx+ijmLAucvWAlvLat81CEE4V3YHIQBnczDoCn1/WK2uLRB3T5SGPHwEhjx7dHGjvmMSc5CH4RWL2GkcaOP+tEh+sAt9T2dV7kFdFRrGahlOv/QwMfOa1t7Dm4CY447KxD/0fLd/Sc1qnlBwOCl3cyFL2rWdvXeRsNTGAu45aRxo4dI40dd4w0drhR+fqr9BruYI7ooKK7QBeE+EZtX+cPmRPdp9biFZiJ4Ju5uJzDo3+C9w/8fcbYy4M3waJ5Nx0KsOjwbE2Xkpjj1fZ14vrZfDo3+hAAfAcb3tIH3ElupO91fqr3NIguDgCn1/Z13sec6DJd/c1rTOZ06WjVH6MBlxXZig+jlsaFdPz/G9vvg4bjbzeefgrzAh6hZIIr6KLV9nUuBoCb6RA+2BeMNHZsoXPBgjLS2PE1rORH3+NnZu810tiBSQFtOtGdTb80vEhTlte0yDigE1/eKTU79j0FAbHC6HK6OrVIR8mVcEeXbaSx42/YfIeGv/GXs3WksaPF6kOO5wIABj6wffB2AHgTAHA3wao0c7Af6D5vJipJhfkZakW8LjrElipoVHz3dvU3D9Pobc5ZNf1bvgf/ctJqeHqz5zPGSnM5obavEx/8swEg6bNg8diXRho7Ps+cnB78uVMB4FMA8O1UHZMM1u49Y5SVHv+pTyxdrqRNtGxv6K2jSzjP0R3misENVekYHnuH/sFlnkTyBHQ5Ma+zbs6nkkOmy0BeoGSbluCDPdLYsUi3TobW7+GRxo7jcgxk4JdYqmULvbV7Un/Ax6KL0r1wVhnKdB7NrzyXOZABGrhZh19umEzdcPx3YHjPo0CTDTxJSS+gU7dwEf32VOjD/30McFiY9xk3+Epm64UGa4c/82vDMb9auneYkTS0N/SuSn00P9obel+g64RXo9VDl5Pyu0K9Z76UfOYKFd8ZOvEJNKr4agbxZeyfRX++U2ftFOrmJueJ9+rW6a71mXv5n8xIahzZEEjni02RxLsazdc0zRf1AiUvPPhAfGfrXEWRup+78lzvu42mTSXZBNOiq9e5nDh3ucuLSwbpoA+51Zo6jjX5a2/ofZFGSj1diZsLj6KzfPogQBkNunyN+YEM0AyVbxrO+hkV3Ut0Ton8tbav86b0r+ZZEhYvbCUzUkDol0KNlz84LjwdujmfXnwokJ+ONHbcqRtDlzCdG4p0MyPTrbj0ohsDgEuZs/zDQQtXmmhv6GVWtguN10vEc+EZoOK7iAY7kqDreX0y6JJmrW4KzAsFgA8bhqO0rF1QN3aux3Ivs2WThfN/zoxw+H68VNDgR49hySW5H24RtVZ6FOqqzqZrUenAc++p7eu8Js05nqerv/nyDJFD3xQfchouvDRQy/V9E88gZgiaJEExzrKwPjpW29fpWolBO+nqb1ZMPh+g878T/FxmvZCYfWAcCl1If83k8zATHVJtQXT4oH6SGfUvZgWLMQ8x5qkAAA5QSURBVKLYwkWXGi68zLRQC2cXfcm1vCIhbriNZJWvF4voHm2HCy8DNPjxWRvXhf4PM+Jvtuiufhvu+uaWLjNceBao7evEvWd/s+GlnjRLK/M5mBQ5CQCfponOHAvw4IpF6IL4W4blgGzAudAJRSg8Tg5wi2cRKpiVKYIJVujnouMk4cLLApraNZHDj6JYvVgzheMSXHjZc3MOgRaFzhM5nCm48LKE7iKwkqOo51FmhFPScOHlxs1ZzPVwneu/mVFOScOjmjky0tixj9ZcyUhtX6eHuq9zrDC+ev7HaO7tzsoVQ7ZvqOUWL3esZt2/xYxwPM346vlfAYBeGsX+3fjq+ZvHV8+3dY2SCy937rT4k/9gRjhex1j1GivJPWOn+LjwcoSmkmXa/gN0axHH/yzA1vJ2iY8LLz9+nSHIEk1T8o/jP04EgP+w46q58PJjjYVtQH7eYV6qpKv2dv746vldxkEcG189/3L670dMjv9wfPX8P9Lz6nhUM08yRTd5RNOfjK+eP66rh2rGdytXDE11faIR0F8AwDIs4w8AR1euGDqLHsMOmlcbOivdyy1e/mz2+w1wTHnBbFDH9UkLR5cdUHgPA8DdOtFhP7HvmbQzU7nw8ocLrzhJ2eOZgiU+VuqCLSiuUOWKoRdwbHz1/EEAOJP5KYCtlSuGvsGFlz9v+v0GOCwoIGrB0jGXtsdG/pmu+aEQn6FRUCMjAPAF4MEVW0g3EZfdbv/MyZ3KFUPYSXhPhhc4lXYcPg0AHqMt2MxEh4kUZ1NBl263IJsZT9E5ZzzZf485wvH+L3X1fCy/OIc5wHIaHXnTpG8gbiP7feWKoS/rB7nw7CHdWh7Hv2TbN8MoOpz/t1WuGGJq0HBX0x5SfYGZWUFOaYBbx75qJjrgwssfWqovlcBSCZLjD9bmcZXfTc7nzODCKzw8uOJT6Hagf09x9anm7f8DABdWrhhK2yGJfyMXHi48H1O5Yuim8dXzu+kiOST3542vnt9Pf7cRutn5N5Urhq62eqdceIXHOOHm+AzqMh5yG2nGyunU6rWkmselg7uaheeoYr/BEmQH7X+Yk+iAWzwOJ3uMFjAXuMXLE9paOZrmVfLpoc4pUrjw8md2BuFxr4LDwIVXeFKt8XFKGC68wsODKxwGLjx7SNfnO1X3WE4Jw4XH4bgAF17+pLN2SJRGPjmcQ3Dh5Y8VUWUSJ6fE4MIrPCGer8kxwoWXP1ZEdTIzwilpuPCcYWEp3CTHOlx4+WNljseFx5kBF54z8OAKZwY8jzB/rIjK1t5qnNwhhCT30hkzinYBwM80Tctpm0+2cOHlD9/o6nEIIdjb4Bra985YTl3P1wkhTwLAdYUWIHc18yfdLzLJ5EhjRwszyikohJA6QsgfaXfXT1n4XVXS8zYTQi5hTmYPQ/SvgBhLNbq9L1YgRDyFSq6WTa95K8K8SXDhZcfmXaf6/kIM+IMlwLAYuzTRq1VTg8RdbsW64Y8tzZJrdMvbRQd0I5AtzOjecKjmvljde7m1oZY/QL/VAN9QsgSY9SOEHKN4ed2apr2e/hAdMaHz1PC07mXheAy2hHINrjw8iOb5OeU7Zod5sSk+Ki7uFTX7WYGhJD7AeB9ryd50+WCbNzLTanuOQUV6KprmpapWaVluKuZH9k8kG7tyzPr33ciLcZ6Y4YHsMInOysesig6tODzNE2r1zSN0PLs48xZ5tj6u+PCy49sHsqQS0sKO5kRe/CEq0nX6cwaQerBzj0dmqZ9Vu9ia5p2E517v838BAsXnofIdt62lBkpMMl5WgGoMJkXOgqNYGZap0PRoeBMm4hQIV7LHGDJJO6s4MLLj2yF51YJiAlmxB4uc/pGktDo7B3MgZkkRfcEc0QHPf4kc4B9z8uZwRzhwsuPbF1Ht+ZLg8yIPTQRQqxYiynwwSWEPEQIGaBLGxohZJz+/wV67BYaLMnE7TTUn467MolOh5WS7JnezzI8qpkf2SZIuyW8Qi5loKtn6sYloS7h1SkCORW68Sbdz2DkcR2dhxlfD4X5JeaVZvKopmmZLKIeK0GWx5iRHOEWLz+sJEjrcavG5i5mxD6a0r0SDX78MoXo0oHn30itoTFtK1MWDgaUrmNG05Op4veEnTsWuPCcpSh3KZgFWZJ5nTkmKes5jSYsPwQfzO3OZ86aya9zEEkm9zav7kBGuPCcpSwrCyi6JOnmyZtytHafZkZmYvsXJRdefuQiPMeTpTVNQzdphDlgIzSRurPAosvEPRmOpyLd/C5XMaeFu5q5k2uQJJ1LU0gGC/jel9FlATd5UtO0X+X4/qk+F4yOXsyM2gC3eLmTa96lW8nSMjNiH26LDslnDhZhRqZ3MHymUEWPuMXLnVyFl+ylUOhIYzL0fin977MAcA5zUnGwgbrTuXIK/Zzq6ZrnxgLmuE7BhZc7+VgtdFPXMKM2Q7+tVyVflRDyRbuTfT1CXqF+4+fkBNzVzJ18eptnCokXijtdet9C8zO/XTAXXu7U5PGzbtVf6QGA7cyov9niVPVnO+GuZu7kU8rB0TIQdK73VbqkgKHzZ4rI5bQ1o8QpuMXLgZHGjnx3kjuWs0mzMj6Ja1G4GRStg6ZpuHv8UeZkf3LAj1fNLV5u1NNtJLnO88rpaxQ6oyTdDvR1ADAEAEcCwBI795o5TKHT4QoCt3i5MTvP4Aq4UQYiCd28+pamaTdomoZl637EnOQPxu3cI+ckXHi5YUe+5UeZEQcghGBa1TOapvW68f42s8GPgRXgrmbO2JF58iFmpMDQndtYH3Kf4Z1ecfpabKLgSQiFglu83LBjT13c6U2xmN1hIjrIM+vDTbp9et1ceDlih/CCAPDPzKh7bPLQtVhhxMdfGFx42TLS2DEvw56wbLjQQ7dWSLdtpADCfp0Z8RF8jpc99TTT347Pzq3UMTPyKYiE5eBfMnROmhKypmkzciBpxbFv2dC77u/MiI/gwsueFhs/Nwm3CNX2dXohSJCP8BQsj86MmoB75gghmLq2Oc8lmY3MiI/grmb22Ln+JgLAMmbUHfKJbGaVfkaXAO5lDlhnIk1igC/gwsuek2x+vUuYERfIEKiIMSP5k8+OAt8uIyThwsuCkcaOSwqwk/ssG3I/88asNqYO2wviUquXax0YX6aJ6eHCy45PF2BerHjE6uWbApcLuQqaW7wSo70At4vzPNurWOVAumycgidzG8jUV96X+Zl6uPAsQt3M8gK9/AK6PugmriVtm7CfHTqErT0M3IILzzp3FnD5BV/358yoQ9A9e6kqhb3DjLDYWbNzU5pye1AM8zvgwrMGzak8ocBvc76LVq+ZGfmA8QxuKOQxVzObV2YSViE7HzkGF541fuPQZ+VW0m86YVkJZFht4G/EbP0v0/tx4ZUCI40dD2RwfezkwyONHd928mOlW4XS9biz8qBn7f6laWucKZDDXc1iZ6Sx42sA8EUaeXQC/H38wKlK04QQnLf+kTkwk105NJW0glmjkIkMC/mQh3X1FFx4JuCC9khjx3MAsNpB0el5qZDiw0RlQggK6kYL1txKKllWYqBWdglzwJpb69dNuzPgwjNArdwumgzt1ucTLLD4vm/RfcYIo5XkZ8vuHxXd/Sm6Cg3S4ynx8x48PVx4FIwojjR2YMb8T1zsVa4nKb5C7FK3Omcdp6523tDWzOjWPpFmSxBavDZmtAgpeeFRtxL3jG0BgFM9tlUKxfdcAQIuVtfdIikskx6rlb7upv3Q073eYxl61VlZU/QFJS08nVv5Teagt/geWmMbXc+rMogPj30XAN5jjrCst5hJkunaR+jrpIuwFkVgBSGapjGDxQzdCfA5jB7SbA0rFi5OrQ/kWcg2iULnRWtoXiJ2iT2dRg+lDAEdrAB9fW1f51bmSJbQkH4zvZ9xek2vJOdRdL61NsX94vmP0rqcGSGEYJuwxWnOe5IW2V3JHPkALOeXziL6hpIRHs0Kwa0v/5c+2OkEh0LTaHABxbE2uUt8pLHjEQC4gvmJ7IjW9nWa5n1Sq7aM9jo4ljnhA/BBvbO2r7OgCcy078K3DOJDgf5ntjmThJDN1J034176uumEd6+maVczoz6k6IVHk5txjnQWc/ADkhbtLQB4WC80k9dbZYNr+lZtX+fJzCj7XvOoyK+mARGjJcS9gQepVfp/dljBQkOt7DJq5ZP94FFw19F//0Yn8uT6IX4BvlAsooNiFt5IY8cfaYQslXXTP7T/XdvXaalR5Ehjx14AqDYMJwAgQLPqk5keR2XoClRd29fJ1LhMBbWEd2BOJ52bJ+9JBYC/4b1m83ocdzF7IIuFmGG+lLRqf6fu42+ztRAjjR3LDVE5fOjHAOBWAHjE+ODrLNaN9Fs8eS0ynWfex7xJCqgFvojOUb9K3b8wAHTU9nVafh2ONyhmi4cP6Kv0gc/KqplBX2+rzoqhkG+r7ev8ocnpDCONHXdSASbZX9vXmVfJBxS2H9xLDkvJRTVzhSZLf4FaURTd2anmgamg7uJL1PJiZPM7VoXLKS648CxAs0eepq4izufOyrUWJn2tHp2AT+JWq/Qo+cyVTFAXcx0VHc7pvptPAVoa/r+XzvOCdL7JKTG48DKjL3s3ZpNreBtugaHu5uEeqLfCcRjualqEzs/22eUW0vXFrR4p385xEgD4/3jnmVnPaw0lAAAAAElFTkSuQmCC';
    const DEFAULT_PERIODS = '';
    const PLANEACIONES_PAGE_SIZE = 30;

    const state = {
      config: {
        periodConfig: DEFAULT_PERIODS
      },
      session: null,
      catalogos: {
        alumnos: [],
        facilitadores: [],
        facilitadores_admin: [],
        facilitador_asignaciones: [],
        grupos: [],
        niveles: [],
        materias: [],
        materias_admin: [],
        submaterias: [],
        submaterias_admin: [],
        habilidades: [],
        talleres: [],
        talleres_admin: [],
        alumno_talleres: [],
        refuerzos: [],
        periodos: [],
        semanas: []
      },
      catalogosMeta: {
        loadedBlocks: [],
        revision: 0
      },
      planeacionOutbox: [],
      planeaciones: [],
      alertas: [],
      notificaciones: [],
      openPlanId: '',
      openPlanDraft: null,
      multiGroupSharedDrafts: {},
      ui: {
        planBuilderExpanded: false,
        planeacionesLoaded: false,
        planeacionesLoading: false,
        planeacionesLoadingMore: false,
        planeacionesHasMore: false,
        planeacionesOffset: 0,
        planeacionesCatalogosLoading: false,
        planeacionesCatalogosPromise: null,
        planeacionesCatalogosPendingBlocks: [],
        openPlanLoadingId: '',
        tallerMembershipCatalogosPromise: null,
        fastPlaneacionesBootPromise: null,
        planeacionesRestoreLock: false,
        adminModuleLoading: {},
        notificationEditorExpanded: false,
        notificationFilter: 'activas',
        planeacionesMateriaFilter: '',
        multiGroupActiveChildByLote: {},
        debounceTimers: {},
        adminUiEventsBound: false,
        restoreSnapshotSyncing: false,
        planeacionOutboxProcessing: false,
        planeacionOutboxRetryTimer: null,
        pendingPlanSaveTransactions: {},
        planDetailPromises: {}
      },
      alumnosUi: createEmptyAlumnosUiState(),
      facilitadoresUi: createEmptyFacilitadoresUiState(),
      talleresUi: createEmptyTalleresUiState(),
      materiasUi: createEmptyMateriasUiState(),
      reportesUi: createEmptyReportesUiState(),
      maintenanceUi: createEmptyMaintenanceUiState(),
      planEditor: {
        mode: 'create',
        planId: '',
        lockedSemanaId: '',
        lockedGrupoId: '',
        lastKnownUpdatedAt: '',
        lastKnownActivitiesVersion: '',
        activities: []
      },
      notificationEditor: {
        notificacion_id: '',
        titulo: '',
        mensaje: '',
        prioridad: 'normal',
        fecha_inicio: '',
        fecha_cierre: '',
        visible_para: 'todos',
        facilitadores_ids: [],
        estatus: 'borrador'
      },
      activeTab: 'planeaciones',
      activeAdminModule: 'dashboard'
    };

    const inFlightActions = new Map();
    const feedbackAnchors = [];
    let actionToastTimer = null;
    const adminCatalogMemo = {
      materias: { revision: -1, result: [] },
      submaterias: { revision: -1, result: [] },
      talleres: { revision: -1, result: [], byId: new Map() }
    };
    const alumnoSourceMemo = {
      signature: '',
      rows: [],
      byId: new Map()
    };
    const catalogIndexMemo = {
      revision: -1,
      alumnosById: new Map(),
      alumnosByGroupId: new Map(),
      gruposById: new Map(),
      materiasById: new Map()
    };
    const planeacionesIndexMemo = {
      signature: '',
      byId: new Map(),
      latestByFacilitadorId: new Map()
    };

    const $ = (id) => document.getElementById(id);

    function ensureAdminShellMarkupLoaded() {
      if ($('adminShell')) return true;
      const mount = $('adminShellMount');
      const template = $('adminShellTemplate');
      if (!mount || !template || !template.content) return false;
      mount.replaceChildren(template.content.cloneNode(true));
      return !!$('adminShell');
    }

    function tryShowDatePicker(input) {
      if (!input || input.disabled || input.readOnly) return;
      if (typeof input.showPicker !== 'function') return;
      try {
        input.showPicker();
      } catch (_) {}
    }

    const escapeHtml = (value) => String(value == null ? '' : value)
      .replace(/\u00C2\u00B7/g, '\u00B7')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    // Escapa valores cuando terminan dentro de una cadena JS en atributos HTML.
    const escapeJsAttrValue = (value) => String(value == null ? '' : value)
      .replace(/\\/g, '\\\\')
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '\\\'');

    function uid(prefix = 'RID') {
      return prefix + '-' + Math.random().toString(36).slice(2, 10).toUpperCase();
    }

    function createEmptyCatalogos() {
      return {
        alumnos: [],
        facilitadores: [],
        facilitadores_admin: [],
        facilitador_asignaciones: [],
        grupos: [],
        niveles: [],
        materias: [],
        materias_admin: [],
        submaterias: [],
        submaterias_admin: [],
        habilidades: [],
        talleres: [],
        talleres_admin: [],
        alumno_talleres: [],
        refuerzos: [],
        periodos: [],
        semanas: []
      };
    }

    function createEmptyCatalogosMeta() {
      return {
        loadedBlocks: [],
        revision: 0
      };
    }

    function getCatalogosRevision() {
      return Number(state.catalogosMeta && state.catalogosMeta.revision || 0);
    }

    function getCatalogIndex() {
      const revision = getCatalogosRevision();
      if (catalogIndexMemo.revision === revision) return catalogIndexMemo;

      const alumnosById = new Map();
      const alumnosByGroupId = new Map();
      const gruposById = new Map();
      const materiasById = new Map();

      (state.catalogos.alumnos || []).forEach((alumno) => {
        const alumnoId = String(alumno && alumno.alumno_id || '').trim();
        const grupoId = String(alumno && alumno.grupo_id || '').trim();
        if (alumnoId) alumnosById.set(alumnoId, alumno);
        if (grupoId) {
          if (!alumnosByGroupId.has(grupoId)) alumnosByGroupId.set(grupoId, []);
          alumnosByGroupId.get(grupoId).push(alumno);
        }
      });
      (state.catalogos.grupos || []).forEach((grupo) => {
        const grupoId = String(grupo && grupo.grupo_id || '').trim();
        if (grupoId) gruposById.set(grupoId, grupo);
      });
      (state.catalogos.materias || []).forEach((materia) => {
        const materiaId = String(materia && materia.materia_id || '').trim();
        if (materiaId) materiasById.set(materiaId, materia);
      });

      catalogIndexMemo.revision = revision;
      catalogIndexMemo.alumnosById = alumnosById;
      catalogIndexMemo.alumnosByGroupId = alumnosByGroupId;
      catalogIndexMemo.gruposById = gruposById;
      catalogIndexMemo.materiasById = materiasById;
      return catalogIndexMemo;
    }

    function getPlaneacionesIndex() {
      const rows = Array.isArray(state.planeaciones) ? state.planeaciones : [];
      const signature = rows.map((plan) => [
        plan && plan.planeacion_id,
        plan && plan.facilitador_id,
        plan && (plan.fecha_actualizacion || plan.fecha_creacion || ''),
        plan && plan.estado,
        plan && plan._local_save_state,
        plan && plan.actividades_version_actual,
        plan && plan.detail_loaded,
        plan && plan.obs_loaded
      ].join('|')).join('::');
      if (planeacionesIndexMemo.signature === signature) return planeacionesIndexMemo;

      const byId = new Map();
      const latestByFacilitadorId = new Map();
      rows.forEach((plan) => {
        const planId = String(plan && plan.planeacion_id || '').trim();
        if (planId) byId.set(planId, plan);
        const facilitadorId = String(plan && plan.facilitador_id || '').trim();
        if (!facilitadorId) return;
        const currentValue = String(plan.fecha_actualizacion || plan.fecha_creacion || '').trim();
        const previous = latestByFacilitadorId.get(facilitadorId);
        const previousValue = previous ? String(previous.fecha_actualizacion || previous.fecha_creacion || '').trim() : '';
        if (!previous || currentValue.localeCompare(previousValue) > 0) {
          latestByFacilitadorId.set(facilitadorId, plan);
        }
      });

      planeacionesIndexMemo.signature = signature;
      planeacionesIndexMemo.byId = byId;
      planeacionesIndexMemo.latestByFacilitadorId = latestByFacilitadorId;
      return planeacionesIndexMemo;
    }

    function getAlumnosSourceRevision() {
      return Number(state.alumnosUi && state.alumnosUi.sourceRevision || 0);
    }

    function bumpCatalogosRevision() {
      if (!state.catalogosMeta || !Array.isArray(state.catalogosMeta.loadedBlocks)) {
        state.catalogosMeta = createEmptyCatalogosMeta();
      }
      state.catalogosMeta.revision = Number(state.catalogosMeta.revision || 0) + 1;
    }

    function bumpAlumnosSourceRevision() {
      if (!state.alumnosUi) state.alumnosUi = createEmptyAlumnosUiState();
      state.alumnosUi.sourceRevision = Number(state.alumnosUi.sourceRevision || 0) + 1;
    }

    function getCatalogBlockKeys() {
      return Object.keys(createEmptyCatalogos());
    }

    function normalizeCatalogBlocks(blocks) {
      const valid = new Set(getCatalogBlockKeys());
      const raw = Array.isArray(blocks)
        ? blocks
        : String(blocks || '').split(',');
      const seen = new Set();
      return raw
        .map((item) => String(item || '').trim())
        .filter((item) => item && valid.has(item) && !seen.has(item) && (seen.add(item) || true));
    }

    function markCatalogBlocksLoaded(blocks) {
      const normalized = normalizeCatalogBlocks(blocks);
      if (!state.catalogosMeta || !Array.isArray(state.catalogosMeta.loadedBlocks)) {
        state.catalogosMeta = createEmptyCatalogosMeta();
      }
      const seen = new Set(state.catalogosMeta.loadedBlocks || []);
      normalized.forEach((block) => seen.add(block));
      state.catalogosMeta.loadedBlocks = Array.from(seen);
    }

    function mergeCatalogosPayload(partial, requestedBlocks) {
      if (!partial || typeof partial !== 'object') return;
      state.catalogos = Object.assign(createEmptyCatalogos(), state.catalogos || {}, partial);
      const loaded = requestedBlocks && requestedBlocks.length
        ? requestedBlocks
        : Object.keys(partial);
      markCatalogBlocksLoaded(loaded);
      bumpCatalogosRevision();
    }

    function isCatalogBlockLoaded(blockKey) {
      return !!(
        state.catalogosMeta &&
        Array.isArray(state.catalogosMeta.loadedBlocks) &&
        state.catalogosMeta.loadedBlocks.includes(String(blockKey || '').trim())
      );
    }

    function getMissingCatalogBlocks(blocks) {
      return normalizeCatalogBlocks(blocks).filter((block) => !isCatalogBlockLoaded(block));
    }

    function hasCatalogosLoaded() {
      return !!(
        state.catalogosMeta &&
        Array.isArray(state.catalogosMeta.loadedBlocks) &&
        state.catalogosMeta.loadedBlocks.length
      );
    }

    function hasCatalogBlocksLoaded(blocks) {
      return getMissingCatalogBlocks(blocks).length === 0;
    }

    function getCatalogBlocksForModule(moduleName) {
      return getCatalogBlocksForModuleWithScope(moduleName);
    }

    function getPlaneacionesSurfaceCatalogBlocks() {
      return canUseAdminShell()
        ? ['facilitadores', 'grupos', 'materias', 'semanas']
        : ['grupos', 'materias', 'semanas'];
    }

    function getPlaneacionesEditorCatalogBlocks() {
      return canUseAdminShell()
        ? ['alumnos', 'facilitadores', 'grupos', 'materias', 'submaterias', 'semanas']
        : ['alumnos', 'submaterias'];
    }

    function getCatalogBlocksForModuleWithScope(moduleName, options = {}) {
      const scope = String(options && options.scope || '').trim();
      switch (String(moduleName || '').trim()) {
        case 'planeaciones':
          return scope === 'editor' ? getPlaneacionesEditorCatalogBlocks() : getPlaneacionesSurfaceCatalogBlocks();
        case 'alumnos':
          return ['alumnos', 'grupos'];
        case 'notificaciones':
          return ['facilitadores'];
        case 'reporte-ciclo':
        case 'reportes':
          return ['alumnos', 'periodos'];
        case 'facilitadores':
          return ['facilitadores', 'facilitadores_admin', 'facilitador_asignaciones', 'grupos', 'materias'];
        case 'materias':
          return ['materias', 'materias_admin', 'submaterias', 'submaterias_admin'];
        case 'talleres':
          return ['talleres', 'talleres_admin', 'alumno_talleres', 'materias', 'facilitadores', 'facilitadores_admin'];
        case 'seguimiento':
          return ['alumnos', 'materias', 'submaterias', 'habilidades', 'periodos'];
        default:
          return [];
      }
    }

    function getAdminModuleCatalogBlocks(moduleName) {
      const normalized = String(moduleName || '').trim();
      if (normalized === 'planeaciones') return getCatalogBlocksForModuleWithScope(normalized, { scope: 'surface' });
      return getCatalogBlocksForModuleWithScope(normalized);
    }

    function adminModuleNeedsCatalogos(moduleName) {
      return ['planeaciones', 'alumnos', 'notificaciones', 'reporte-ciclo', 'facilitadores', 'materias', 'talleres'].includes(String(moduleName || '').trim());
    }

    function getCurrentCatalogBlocks() {
      if (canUseAdminShell()) return getCatalogBlocksForModule(state.activeAdminModule);
      return getCatalogBlocksForModule(state.activeTab);
    }

    function currentViewNeedsCatalogos() {
      if (canUseAdminShell()) return adminModuleNeedsCatalogos(state.activeAdminModule);
      return ['planeaciones', 'seguimiento', 'reportes'].includes(String(state.activeTab || '').trim());
    }

    function currentViewNeedsPlaneaciones() {
      if (canUseAdminShell()) return String(state.activeAdminModule || '').trim() === 'planeaciones';
      return String(state.activeTab || '').trim() === 'planeaciones';
    }

    function setPlaneacionesRestoreLock(isLocked) {
      if (state.ui) state.ui.planeacionesRestoreLock = !!isLocked;
    }

    function shouldSkipPlaneacionesTabBootRefresh() {
      return !!(
        state.ui &&
        (state.ui.planeacionesRestoreLock || state.ui.fastPlaneacionesBootPromise)
      );
    }

    function getMaintenanceUi() {
      if (!state.maintenanceUi) state.maintenanceUi = createEmptyMaintenanceUiState();
      return state.maintenanceUi;
    }

    function createEmptyNotificationEditorState() {
      return {
        notificacion_id: '',
        titulo: '',
        mensaje: '',
        prioridad: 'normal',
        fecha_inicio: '',
        fecha_cierre: '',
        visible_para: 'todos',
        facilitadores_ids: [],
        estatus: 'borrador'
      };
    }

    function getReportSelectionState() {
      if (!state.reportesUi) state.reportesUi = createEmptyReportesUiState();
      return state.reportesUi;
    }

    function getSelectedReporteAlumnoId() {
      const ui = getReportSelectionState();
      return String(ui.alumno_id || $('adminReportAlumno') && $('adminReportAlumno').value || $('repAlumno') && $('repAlumno').value || '').trim();
    }

    function getSelectedReportePeriodoId() {
      const ui = getReportSelectionState();
      return String(ui.periodo_id || $('adminReportPeriodo') && $('adminReportPeriodo').value || $('repPeriodo') && $('repPeriodo').value || '').trim();
    }

    function setReporteSelection(field, value) {
      const ui = getReportSelectionState();
      const nextValue = String(value || '').trim();
      if (ui[field] !== nextValue) {
        ui.lastResult = null;
      }
      ui[field] = nextValue;
      const alumnoSelectIds = ['repAlumno', 'adminReportAlumno'];
      const periodoSelectIds = ['repPeriodo', 'adminReportPeriodo'];
      (field === 'alumno_id' ? alumnoSelectIds : periodoSelectIds).forEach((id) => {
        const el = $(id);
        if (el) el.value = ui[field];
      });
    }

    function getSelectedReporteAlumnoRow() {
      const alumnoId = getSelectedReporteAlumnoId();
      return (state.catalogos.alumnos || []).find((row) => row.alumno_id === alumnoId) || null;
    }

    function getSelectedReportePeriodoRow() {
      const periodoId = getSelectedReportePeriodoId();
      return (state.catalogos.periodos || []).find((row) => String(row.periodo_id || '').trim() === periodoId) || null;
    }

    function getReportStatusLabel(status) {
      return ({
        pendiente: 'Pendiente',
        generando: 'Generando',
        listo: 'Listo',
        obsoleto: 'Obsoleto',
        error: 'Error',
        inexistente: 'Sin cachÃ©'
      })[String(status || '').trim().toLowerCase()] || (status || 'Sin estado');
    }

    function buildReportResultMarkup(data, options = {}) {
      const compact = !!options.compact;
      const warnings = Array.isArray(data && data.warnings)
        ? data.warnings
        : (data && data.warnings_json ? safeJsonParse(data.warnings_json) : null);
      const alumno = data && data._selection && data._selection.alumno_id
        ? (state.catalogos.alumnos || []).find((row) => row.alumno_id === data._selection.alumno_id)
        : getSelectedReporteAlumnoRow();
      const periodo = data && data._selection && data._selection.periodo_id
        ? (state.catalogos.periodos || []).find((row) => String(row.periodo_id || '').trim() === data._selection.periodo_id)
        : getSelectedReportePeriodoRow();
      const alumnoLabel = alumno ? (alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id) : '';
      const periodoLabel = periodo ? (periodo.nombre_visible || periodo.periodo_id) : '';

      if (!data) {
        return compact
          ? '<div class="subtle">TodavÃ­a no hay una consulta de reporte.</div>'
          : '<div class="admin-reporte-ciclo-result-empty"><div><strong>AÃºn no hay una consulta activa.</strong><div class="subtle">Selecciona alumno y perÃ­odo para generar o revisar el PDF.</div></div></div>';
      }

      const status = String(data.status || data.estado || '').trim().toLowerCase();
      const rows = [
        alumnoLabel ? '<div class="admin-reporte-ciclo-result-row"><span>Alumno</span><strong>' + escapeHtml(alumnoLabel + ' Â· ' + (alumno.alumno_id || '')) + '</strong></div>' : '',
        periodoLabel ? '<div class="admin-reporte-ciclo-result-row"><span>PerÃ­odo</span><strong>' + escapeHtml(periodoLabel) + '</strong></div>' : '',
        data.url ? '<div class="admin-reporte-ciclo-result-row"><span>PDF</span><strong><a class="link-out" href="' + escapeHtml(data.url) + '" target="_blank" rel="noopener noreferrer">Abrir reporte</a></strong></div>' : '',
        data.version_datos ? '<div class="admin-reporte-ciclo-result-row"><span>VersiÃ³n de datos</span><div class="code">' + escapeHtml(data.version_datos) + '</div></div>' : '',
        data.version_pdf ? '<div class="admin-reporte-ciclo-result-row"><span>VersiÃ³n PDF</span><div class="code">' + escapeHtml(data.version_pdf) + '</div></div>' : '',
        data.started_at ? '<div class="admin-reporte-ciclo-result-row"><span>Inicio</span><strong>' + escapeHtml(formatFechaHumana(data.started_at)) + '</strong></div>' : '',
        data.finished_at ? '<div class="admin-reporte-ciclo-result-row"><span>FinalizaciÃ³n</span><strong>' + escapeHtml(formatFechaHumana(data.finished_at)) + '</strong></div>' : '',
        data.next_retry_at ? '<div class="admin-reporte-ciclo-result-row"><span>Reintento</span><strong>' + escapeHtml(formatFechaHumana(data.next_retry_at)) + '</strong></div>' : '',
        data.error_message ? '<div class="admin-reporte-ciclo-result-row"><span>Error</span><strong>' + escapeHtml(data.error_message) + '</strong></div>' : '',
        data._meta && data._meta.message ? '<div class="admin-reporte-ciclo-result-row"><span>Info</span><strong>' + escapeHtml(data._meta.message) + '</strong></div>' : '',
        Array.isArray(warnings) && warnings.length ? '<div class="admin-reporte-ciclo-result-row"><span>Warnings</span><div class="tag-cloud">' + warnings.map((warning) => '<span class="tag">' + escapeHtml(warning) + '</span>').join('') + '</div></div>' : ''
      ].filter(Boolean).join('');

      if (compact) {
        return [
          '<div><strong>Estado:</strong> ' + escapeHtml(getReportStatusLabel(status)) + '</div>',
          data && data.url ? '<div><a class="link-out" href="' + escapeHtml(data.url) + '" target="_blank" rel="noopener noreferrer">Abrir reporte</a></div>' : '',
          data && data.version_datos ? '<div><strong>VersiÃ³n datos:</strong> <span class="code">' + escapeHtml(data.version_datos) + '</span></div>' : '',
          data && data.version_pdf ? '<div><strong>VersiÃ³n PDF:</strong> <span class="code">' + escapeHtml(data.version_pdf) + '</span></div>' : '',
          data && data.error_message ? '<div><strong>Error:</strong> ' + escapeHtml(data.error_message) + '</div>' : '',
          data && data._meta && data._meta.message ? '<div><strong>Info:</strong> ' + escapeHtml(data._meta.message) + '</div>' : '',
          Array.isArray(warnings) && warnings.length ? '<div><strong>Warnings:</strong><div class="tag-cloud">' + warnings.map((warning) => '<span class="tag">' + escapeHtml(warning) + '</span>').join('') + '</div></div>' : '',
          data && data.next_retry_at ? '<div><strong>Reintento:</strong> ' + escapeHtml(data.next_retry_at) + '</div>' : ''
        ].filter(Boolean).join('');
      }

      return (
        '<div class="admin-reporte-ciclo-result-head">' +
          '<div><strong>Resultado del reporte</strong></div>' +
          '<div class="admin-reporte-ciclo-status is-' + escapeHtml(status || 'inexistente') + '">' + escapeHtml(getReportStatusLabel(status || 'inexistente')) + '</div>' +
        '</div>' +
        '<div class="admin-reporte-ciclo-result-meta">' + rows + '</div>'
      );
    }

    function resetReportResult() {
      const ui = getReportSelectionState();
      ui.lastResult = null;
      const legacyHost = $('reportResult');
      const adminHost = $('adminReportResult');
      if (legacyHost) legacyHost.innerHTML = buildReportResultMarkup(null, { compact: true });
      if (adminHost) adminHost.innerHTML = buildReportResultMarkup(null);
    }

    function clearLoadedData() {
      if (state.ui && state.ui.planeacionOutboxRetryTimer) {
        window.clearTimeout(state.ui.planeacionOutboxRetryTimer);
        state.ui.planeacionOutboxRetryTimer = null;
      }
      state.planeacionOutbox = [];
      state.planeaciones = [];
      state.alertas = [];
      state.notificaciones = [];
      state.catalogos = createEmptyCatalogos();
      state.catalogosMeta = createEmptyCatalogosMeta();
      state.openPlanId = '';
      state.openPlanDraft = null;
      state.multiGroupSharedDrafts = {};
      if (state.ui) {
        state.ui.planBuilderExpanded = false;
        state.ui.planeacionesLoaded = false;
        state.ui.planeacionesLoading = false;
        state.ui.planeacionesLoadingMore = false;
        state.ui.planeacionesHasMore = false;
        state.ui.planeacionesOffset = 0;
        state.ui.planeacionesCatalogosLoading = false;
        state.ui.planeacionesCatalogosPromise = null;
        state.ui.openPlanLoadingId = '';
        state.ui.tallerMembershipCatalogosPromise = null;
        state.ui.fastPlaneacionesBootPromise = null;
        state.ui.notificationEditorExpanded = false;
        state.ui.notificationFilter = 'activas';
        state.ui.planeacionesMateriaFilter = '';
        state.ui.multiGroupActiveChildByLote = {};
        state.ui.restoreSnapshotSyncing = false;
        state.ui.planeacionOutboxProcessing = false;
        state.ui.pendingPlanSaveTransactions = {};
        state.ui.planDetailPromises = {};
      }
      state.notificationEditor = {
        notificacion_id: '',
        titulo: '',
        mensaje: '',
        prioridad: 'normal',
        fecha_inicio: '',
        fecha_cierre: '',
        visible_para: 'todos',
        facilitadores_ids: [],
        estatus: 'borrador'
      };
      state.alumnosUi = createEmptyAlumnosUiState();
      state.facilitadoresUi = createEmptyFacilitadoresUiState();
      state.talleresUi = createEmptyTalleresUiState();
      state.materiasUi = createEmptyMateriasUiState();
      state.reportesUi = createEmptyReportesUiState();
      state.maintenanceUi = createEmptyMaintenanceUiState();
      state.activeTab = 'planeaciones';
      state.activeAdminModule = 'dashboard';
      resetReportResult();
      clearActionToast();
    }

    function clearLoginInputs() {
      if ($('facilitadorId')) $('facilitadorId').value = '';
      if ($('pinInput')) $('pinInput').value = '';
    }

    function clearSessionScopedState() {
      saveSession(null);
      clearLoadedData();
      clearLoginInputs();
      renderAll();
    }

    function isPlanBuilderExpanded() {
      return !!(state.ui && state.ui.planBuilderExpanded) || state.planEditor.mode === 'edit';
    }

    function togglePlanBuilder(forceValue) {
      const next = typeof forceValue === 'boolean' ? forceValue : !isPlanBuilderExpanded();
      if (next) {
        closeOpenPlan();
        renderPlaneacionesList();
        if (state.planEditor.mode === 'create' && currentViewNeedsCatalogos()) {
          ensurePlaneacionesCatalogosAvailable({ render: true }).catch(() => {});
        }
      }
      if (state.ui) state.ui.planBuilderExpanded = next;
      renderPlanBuilderVisibility();
    }

    function renderPlanBuilderVisibility() {
      const body = $('planBuilderBody');
      const btn = $('togglePlanBuilderBtn');
      const focusBar = $('planBuilderFocusBar');
      const listCard = $('planeacionesListCard');
      if (!body || !btn) return;
      const expanded = isPlanBuilderExpanded();
      const createFocus = expanded && state.planEditor.mode === 'create';
      body.hidden = !expanded;
      if (focusBar) focusBar.hidden = !createFocus;
      if (listCard) listCard.hidden = createFocus;
      btn.textContent = expanded ? 'Ocultar editor' : 'Crear nueva planeaciÃ³n';
      btn.className = expanded
        ? 'btn-ghost plan-builder-launch-btn is-open'
        : 'btn-accent plan-builder-launch-btn is-collapsed';
    }

    function refreshStaticCopy() {
      const heroTitle = document.querySelector('.brand-copy h1');
      const heroParagraph = document.querySelector('.brand-copy p');
      const sessionIntro = document.querySelector('#sessionCard .card-head .subtle');
      if (heroTitle) heroTitle.textContent = 'Libre Aprendiz';
      if (heroParagraph) heroParagraph.textContent = 'Planeacion semanal en una sola vista.';
      if (sessionIntro) sessionIntro.textContent = 'Ingresa con tu facilitador ID y tu PIN.';
    }

    function normalizeActionKeyPart(value) {
      const text = String(value == null ? '' : value).trim();
      if (!text) return '-';
      return text.replace(/[\s:|]+/g, '_').slice(0, 80);
    }

    function buildActionKey(action, parts) {
      return [action].concat((parts || []).map(normalizeActionKeyPart)).join(':');
    }

    function setButtonBusy(button, busy, busyText = 'Procesando...') {
      if (!button) return;
      if (busy) {
        if (button._flashButtonLabelTimer) {
          window.clearTimeout(button._flashButtonLabelTimer);
          button._flashButtonLabelTimer = null;
        }
        if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
        if (!button.dataset.originalWidth) button.dataset.originalWidth = String(button.offsetWidth || 0);
        button.disabled = true;
        if (button.classList.contains('btn-open-plan')) {
          if (button.offsetWidth) {
            button.style.minWidth = Math.max(button.offsetWidth, 108) + 'px';
          }
          button.style.width = '';
        } else if (button.offsetWidth) {
          button.style.width = button.offsetWidth + 'px';
        }
        button.textContent = busyText;
        return;
      }
      button.disabled = false;
      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
      }
      button.style.width = '';
      button.style.minWidth = '';
      if (button.dataset.originalWidth) {
        delete button.dataset.originalWidth;
      }
    }

    function flashButtonLabel(button, label, duration = 1100) {
      if (!button) return;
      if (button._flashButtonLabelTimer) {
        window.clearTimeout(button._flashButtonLabelTimer);
        button._flashButtonLabelTimer = null;
      }
      const stableWidth = button.offsetWidth || Number(button.dataset.originalWidth || 0) || 0;
      if (stableWidth) {
        button.style.width = stableWidth + 'px';
      }
      button.textContent = String(label || '').trim() || button.textContent;
      button._flashButtonLabelTimer = window.setTimeout(() => {
        button._flashButtonLabelTimer = null;
        if (button.dataset.originalText) {
          button.textContent = button.dataset.originalText;
        }
        button.style.width = '';
      }, Math.max(300, Number(duration || 0)));
    }

    function captureFeedbackAnchor(button) {
      if (!button) return null;
      const rect = button.getBoundingClientRect();
      return {
        button,
        rect: {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        }
      };
    }

    function pushFeedbackAnchor(anchor) {
      feedbackAnchors.push(anchor || null);
    }

    function popFeedbackAnchor() {
      if (feedbackAnchors.length) feedbackAnchors.pop();
    }

    function getActiveFeedbackAnchor() {
      return feedbackAnchors.length ? feedbackAnchors[feedbackAnchors.length - 1] : null;
    }

    function getActionToastLayer() {
      let layer = $('actionToastLayer');
      if (!layer) {
        layer = document.createElement('div');
        layer.id = 'actionToastLayer';
        layer.className = 'action-toast-layer';
        document.body.appendChild(layer);
      }
      return layer;
    }

    function clearActionToast() {
      if (actionToastTimer) {
        clearTimeout(actionToastTimer);
        actionToastTimer = null;
      }
      const layer = $('actionToastLayer');
      if (!layer) return;
      layer.innerHTML = '';
    }

    function showActionToast(anchor, message, kind = 'info') {
      if (!anchor) return false;
      const rect = anchor.button && document.body.contains(anchor.button)
        ? anchor.button.getBoundingClientRect()
        : anchor.rect;
      if (!rect) return false;

      const layer = getActionToastLayer();
      const toast = document.createElement('div');
      const viewportPadding = 16;
      const maxWidth = Math.min(420, Math.max(240, window.innerWidth - (viewportPadding * 2)));
      let left = rect.right + 14;
      let top = rect.top + (rect.height / 2);
      let transform = 'translateY(-50%)';

      if (left + maxWidth > window.innerWidth - viewportPadding) {
        left = Math.max(viewportPadding, Math.min(rect.left, window.innerWidth - maxWidth - viewportPadding));
        top = Math.min(window.innerHeight - viewportPadding - 64, rect.bottom + 12);
        transform = 'none';
      } else {
        top = Math.max(viewportPadding + 24, top);
      }

      clearActionToast();
      toast.className = 'action-toast ' + kind;
      toast.textContent = message;
      toast.style.left = Math.round(left) + 'px';
      toast.style.top = Math.round(top) + 'px';
      toast.style.maxWidth = maxWidth + 'px';
      toast.style.transform = transform;
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      layer.appendChild(toast);

      actionToastTimer = window.setTimeout(clearActionToast, 4200);
      return true;
    }

    function parsePeriodsConfig(raw) {
      return String(raw || '')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const parts = line.split('|');
          const id = (parts[0] || '').trim();
          const name = (parts[1] || parts[0] || '').trim();
          return id ? { id, name } : null;
        })
        .filter(Boolean);
    }

    function setBanner(message, kind = 'info', options = {}) {
      const anchor = Object.prototype.hasOwnProperty.call(options, 'anchor')
        ? options.anchor
        : (Object.prototype.hasOwnProperty.call(options, 'button')
          ? captureFeedbackAnchor(options.button)
          : getActiveFeedbackAnchor());
      if (anchor && showActionToast(anchor, message, kind)) return;
      clearActionToast();
      const el = $('statusBanner');
      el.className = 'status-banner ' + kind;
      el.textContent = message;
    }

    function loadConfig() {
      state.config.periodConfig = DEFAULT_PERIODS;
    }

    function refreshStaticConfigUi() {
      renderPeriodSelects();
    }

    function getCurrentUserSnapshotKey() {
      const user = state.session && state.session.usuario ? state.session.usuario : null;
      if (!user) return '';
      return [String(user.rol || '').trim(), String(user.facilitador_id || '').trim()].filter(Boolean).join('::');
    }

    function readBootSnapshotStore() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.bootSnapshot);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (_) {
        return {};
      }
    }

    function writeBootSnapshotStore(store) {
      try {
        localStorage.setItem(STORAGE_KEYS.bootSnapshot, JSON.stringify(store || {}));
      } catch (_) {}
    }

    function isBootSnapshotFresh(snapshot) {
      if (!snapshot || typeof snapshot !== 'object') return false;
      const savedAtMs = Date.parse(String(snapshot.saved_at || ''));
      if (!Number.isFinite(savedAtMs)) return false;
      return (Date.now() - savedAtMs) <= BOOT_SNAPSHOT_MAX_AGE_MS;
    }

    function isTimestampFreshWithin(isoString, maxAgeMs) {
      const value = String(isoString || '').trim();
      if (!value || !Number.isFinite(Number(maxAgeMs)) || Number(maxAgeMs) <= 0) return false;
      const savedAtMs = Date.parse(value);
      if (!Number.isFinite(savedAtMs)) return false;
      return (Date.now() - savedAtMs) <= Number(maxAgeMs);
    }

    function getBootSnapshotByUserKey(userKey) {
      if (!userKey) return null;
      const snapshot = readBootSnapshotStore()[userKey];
      if (!isBootSnapshotFresh(snapshot)) return null;
      return Object.assign({ user_key: userKey }, snapshot);
    }

    function getBootSnapshotForSession(sessionLike = state.session) {
      const user = sessionLike && sessionLike.usuario ? sessionLike.usuario : null;
      if (!user) return null;
      const userKey = [String(user.rol || '').trim(), String(user.facilitador_id || '').trim()].filter(Boolean).join('::');
      return getBootSnapshotByUserKey(userKey);
    }

    function findLatestBootSnapshotByFacilitadorId(facilitadorId) {
      const normalizedId = String(facilitadorId || '').trim();
      if (!normalizedId) return null;
      const suffix = '::' + normalizedId;
      const store = readBootSnapshotStore();
      let latest = null;
      Object.keys(store).forEach((key) => {
        if (!String(key || '').endsWith(suffix)) return;
        const snapshot = getBootSnapshotByUserKey(key);
        if (!snapshot) return;
        const currentTime = Date.parse(String(snapshot.saved_at || '')) || 0;
        const latestTime = latest ? (Date.parse(String(latest.saved_at || '')) || 0) : -1;
        if (!latest || currentTime >= latestTime) latest = snapshot;
      });
      return latest;
    }

    function mergeLoginPreloadCatalogos(snapshot) {
      const catalogos = snapshot && snapshot.catalogos && typeof snapshot.catalogos === 'object'
        ? snapshot.catalogos
        : null;
      if (!catalogos) return false;
      const blocks = LOGIN_PRELOAD_CATALOG_BLOCKS.filter((block) => Array.isArray(catalogos[block]));
      if (!blocks.length) return false;
      mergeCatalogosPayload(catalogos, blocks);
      return true;
    }

    function primeLoginSnapshotCatalogos(facilitadorId) {
      if (state.session && state.session.token) return false;
      const snapshot = findLatestBootSnapshotByFacilitadorId(facilitadorId);
      if (!snapshot) return false;
      const merged = mergeLoginPreloadCatalogos(snapshot);
      if (merged && state.ui) {
        state.ui.loginSnapshotUserKey = snapshot.user_key || '';
        state.ui.loginSnapshotAt = snapshot.saved_at || '';
      }
      return merged;
    }

    function scheduleAfterPaint(task, delay = 0) {
      const runTask = () => Promise.resolve().then(() => (typeof task === 'function' ? task() : null));
      return new Promise((resolve) => {
        const execute = () => runTask().then(resolve, resolve);
        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(() => window.setTimeout(execute, delay));
          return;
        }
        window.setTimeout(execute, delay);
      });
    }

    function buildBootSnapshotCatalogos(blocks) {
      const normalized = normalizeCatalogBlocks(blocks);
      return normalized.reduce((acc, block) => {
        acc[block] = Array.isArray(state.catalogos && state.catalogos[block])
          ? state.catalogos[block]
          : [];
        return acc;
      }, {});
    }

    function buildBootSnapshotOpenPlan() {
      const planId = String(state.openPlanId || '').trim();
      if (!planId) return null;
      const plan = getPlanById(planId);
      if (!plan || !plan.detail_loaded) return null;
      try {
        return JSON.parse(JSON.stringify(plan));
      } catch (_) {
        return Object.assign({}, plan);
      }
    }

    function getBootSnapshotOpenPlanById(planId, sessionLike = state.session) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) return null;
      const snapshot = getBootSnapshotForSession(sessionLike);
      const openPlan = snapshot && snapshot.openPlan && String(snapshot.openPlan.planeacion_id || '').trim() === normalizedPlanId
        ? snapshot.openPlan
        : null;
      if (!openPlan) return null;
      try {
        return JSON.parse(JSON.stringify(openPlan));
      } catch (_) {
        return Object.assign({}, openPlan);
      }
    }

    function buildPlaneacionOpenPreviewRow(plan) {
      if (!plan || !plan.planeacion_id) return null;
      const snapshotOpenPlan = getBootSnapshotOpenPlanById(plan.planeacion_id);
      const preview = Object.assign({}, plan, snapshotOpenPlan || {});
      preview.alumnos = Array.isArray(preview.alumnos) ? preview.alumnos : [];
      preview.actividades = Array.isArray(preview.actividades) ? preview.actividades : [];
      preview.obs_semana = Array.isArray(preview.obs_semana) ? preview.obs_semana : [];
      preview.obs_alumno_final = Array.isArray(preview.obs_alumno_final) ? preview.obs_alumno_final : [];
      preview.alumnos_count = Number(preview.alumnos_count || preview.alumnos.length || 0);
      preview.actividades_count = Number(preview.actividades_count || preview.actividades.length || 0);
      const keepInlineDetail =
        !!((snapshotOpenPlan && snapshotOpenPlan.detail_loaded) || plan.detail_loaded) &&
        hasUsableOpenPlanDetail(preview);
      preview.detail_loaded = keepInlineDetail;
      preview.boot_detail_loaded = true;
      if (keepInlineDetail && snapshotOpenPlan && snapshotOpenPlan.obs_loaded) {
        preview.obs_loaded = true;
      }
      return preview;
    }

    function buildBootSnapshotOpenPlanDraft() {
      const planId = String(state.openPlanId || '').trim();
      if (!planId || !state.openPlanDraft || state.openPlanDraft.planId !== planId) return null;
      try {
        return JSON.parse(JSON.stringify(state.openPlanDraft));
      } catch (_) {
        return Object.assign({}, state.openPlanDraft);
      }
    }

    function getOpenPlanObsSnapshotSavedAt(planId = state.openPlanId) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId || !state.ui || !state.ui.planObservacionesSavedAtByPlan) return '';
      return String(state.ui.planObservacionesSavedAtByPlan[normalizedPlanId] || '').trim();
    }

    function getOpenPlanDetailSnapshotSavedAt(planId = state.openPlanId) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId || !state.ui || !state.ui.planDetailSavedAtByPlan) return '';
      return String(state.ui.planDetailSavedAtByPlan[normalizedPlanId] || '').trim();
    }

    function markAlertasFresh(savedAt = new Date().toISOString()) {
      if (!state.ui) return;
      state.ui.alertasSavedAt = String(savedAt || new Date().toISOString());
    }

    function markNotificacionesFresh(savedAt = new Date().toISOString()) {
      if (!state.ui) return;
      state.ui.notificacionesSavedAt = String(savedAt || new Date().toISOString());
    }

    function markPlaneacionObservacionesFresh(planId, savedAt = new Date().toISOString()) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId || !state.ui) return;
      if (!state.ui.planObservacionesSavedAtByPlan) state.ui.planObservacionesSavedAtByPlan = {};
      state.ui.planObservacionesSavedAtByPlan[normalizedPlanId] = String(savedAt || new Date().toISOString());
    }

    function markPlaneacionDetailFresh(planId, savedAt = new Date().toISOString()) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId || !state.ui) return;
      if (!state.ui.planDetailSavedAtByPlan) state.ui.planDetailSavedAtByPlan = {};
      state.ui.planDetailSavedAtByPlan[normalizedPlanId] = String(savedAt || new Date().toISOString());
    }

    function getSnapshotMetaForSession(sessionLike = state.session) {
      const snapshot = getBootSnapshotForSession(sessionLike);
      return snapshot && snapshot.meta && typeof snapshot.meta === 'object' ? snapshot.meta : {};
    }

    function getSnapshotOpenPlanObservaciones(planId, sessionLike = state.session) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) return null;
      const snapshot = getBootSnapshotForSession(sessionLike);
      if (!snapshot || !snapshot.openPlan || String(snapshot.openPlan.planeacion_id || '').trim() !== normalizedPlanId) return null;
      if (!snapshot.openPlan.obs_loaded) return null;
      const meta = snapshot.meta && typeof snapshot.meta === 'object' ? snapshot.meta : {};
      const obsSavedAt = String(meta.open_plan_obs_saved_at || snapshot.saved_at || '').trim();
      if (!isTimestampFreshWithin(obsSavedAt, OPEN_PLAN_OBS_SNAPSHOT_MAX_AGE_MS)) return null;
      try {
        return {
          planeacion_id: normalizedPlanId,
          obs_semana: Array.isArray(snapshot.openPlan.obs_semana) ? JSON.parse(JSON.stringify(snapshot.openPlan.obs_semana)) : [],
          obs_alumno_final: Array.isArray(snapshot.openPlan.obs_alumno_final) ? JSON.parse(JSON.stringify(snapshot.openPlan.obs_alumno_final)) : [],
          obs_loaded: true
        };
      } catch (_) {
        return {
          planeacion_id: normalizedPlanId,
          obs_semana: Array.isArray(snapshot.openPlan.obs_semana) ? snapshot.openPlan.obs_semana.slice() : [],
          obs_alumno_final: Array.isArray(snapshot.openPlan.obs_alumno_final) ? snapshot.openPlan.obs_alumno_final.slice() : [],
          obs_loaded: true
        };
      }
    }

    function shouldPreserveSnapshotPlanDetail(planId = state.openPlanId) {
      const savedAt = getOpenPlanDetailSnapshotSavedAt(planId);
      return isTimestampFreshWithin(savedAt, OPEN_PLAN_DETAIL_SNAPSHOT_MAX_AGE_MS);
    }

    function shouldReuseFacilitadorFeedSnapshot(kind) {
      if (canUseAdminShell() || getCurrentRole() !== 'facilitador') return false;
      const meta = getSnapshotMetaForSession();
      if (kind === 'planeaciones') {
        const savedAt = String(meta.planeaciones_saved_at || '').trim();
        return isTimestampFreshWithin(savedAt, FACILITADOR_FEED_SNAPSHOT_MAX_AGE_MS);
      }
      if (kind === 'alertas') {
        if (!Array.isArray(state.alertas)) return false;
        const savedAt = String((state.ui && state.ui.alertasSavedAt) || meta.alertas_saved_at || '').trim();
        return isTimestampFreshWithin(savedAt, FACILITADOR_FEED_SNAPSHOT_MAX_AGE_MS);
      }
      if (kind === 'notificaciones') {
        if (!Array.isArray(state.notificaciones)) return false;
        const savedAt = String((state.ui && state.ui.notificacionesSavedAt) || meta.notificaciones_saved_at || '').trim();
        return isTimestampFreshWithin(savedAt, FACILITADOR_FEED_SNAPSHOT_MAX_AGE_MS);
      }
      return false;
    }

    function persistOpenPlanSnapshotSoon(kind = 'planeacion_draft_local') {
      if (!state.ui) return;
      const timerKey = 'openPlanSnapshotPersist';
      if (state.ui.debounceTimers && state.ui.debounceTimers[timerKey]) {
        window.clearTimeout(state.ui.debounceTimers[timerKey]);
      }
      state.ui.debounceTimers[timerKey] = window.setTimeout(() => {
        persistCurrentBootSnapshot(kind);
        state.ui.debounceTimers[timerKey] = null;
      }, 180);
    }

    function persistCurrentBootSnapshot(kind) {
      const userKey = getCurrentUserSnapshotKey();
      if (!userKey) return;
      const store = readBootSnapshotStore();
      const role = getCurrentRole();
      const payload = {
        kind: kind || role || 'unknown',
        saved_at: new Date().toISOString(),
        user_key: userKey,
        dashboardStats: state.dashboardStats || {}
      };
      if (role === 'facilitador' && !canUseAdminShell()) {
        const snapshotPlaneaciones = Array.isArray(state.planeaciones)
          ? state.planeaciones.filter((plan) => !isPlaneacionPendingCreation(plan))
          : [];
        const snapshotOpenPlanId = String(state.openPlanId || '').trim();
        const snapshotOpenPlanAllowed =
          !!snapshotOpenPlanId &&
          snapshotPlaneaciones.some((plan) => String((plan && plan.planeacion_id) || '').trim() === snapshotOpenPlanId);
        payload.catalogos = buildBootSnapshotCatalogos(getPlaneacionesSurfaceCatalogBlocks());
        payload.planeaciones = snapshotPlaneaciones.slice(0, PLANEACIONES_PAGE_SIZE);
        payload.alertas = Array.isArray(state.alertas) ? state.alertas.slice(0, 20) : [];
        payload.notificaciones = Array.isArray(state.notificaciones) ? state.notificaciones.slice(0, 20) : [];
        payload.openPlanId = snapshotOpenPlanAllowed ? snapshotOpenPlanId : '';
        payload.openPlan = snapshotOpenPlanAllowed ? buildBootSnapshotOpenPlan() : null;
        payload.openPlanDraft = snapshotOpenPlanAllowed ? buildBootSnapshotOpenPlanDraft() : null;
        payload.planeacionesMeta = {
          loaded: !!(state.ui && state.ui.planeacionesLoaded),
          hasMore: !!(state.ui && state.ui.planeacionesHasMore),
          offset: Number(
            state.ui && state.ui.planeacionesOffset || payload.planeaciones.length || 0
          )
        };
        payload.meta = {
          planeaciones_saved_at: payload.saved_at,
          alertas_saved_at: String((state.ui && state.ui.alertasSavedAt) || ''),
          notificaciones_saved_at: String((state.ui && state.ui.notificacionesSavedAt) || ''),
          open_plan_detail_saved_at: getOpenPlanDetailSnapshotSavedAt(payload.openPlanId),
          open_plan_obs_saved_at: getOpenPlanObsSnapshotSavedAt(payload.openPlanId)
        };
      } else if (canUseAdminShell()) {
        payload.alertas = Array.isArray(state.alertas) ? state.alertas.slice(0, 20) : [];
        payload.notificaciones = Array.isArray(state.notificaciones) ? state.notificaciones.slice(0, 20) : [];
      }
      store[userKey] = payload;
      writeBootSnapshotStore(store);
    }

    function restoreBootSnapshotForSession(sessionLike = state.session) {
      const snapshot = getBootSnapshotForSession(sessionLike);
      if (!snapshot || typeof snapshot !== 'object') return false;
      const canReusePlaneacionesSnapshot =
        !(sessionLike && String((sessionLike.rol || getCurrentRole() || '')).trim() === 'facilitador')
        || isTimestampFreshWithin(
          String(
            (snapshot.meta && snapshot.meta.planeaciones_saved_at)
            || snapshot.saved_at
            || ''
          ).trim(),
          FACILITADOR_FEED_SNAPSHOT_MAX_AGE_MS
        );
      if (snapshot.catalogos && typeof snapshot.catalogos === 'object') {
        mergeCatalogosPayload(snapshot.catalogos, Object.keys(snapshot.catalogos));
      }
      if (snapshot.dashboardStats && typeof snapshot.dashboardStats === 'object') {
        state.dashboardStats = Object.assign({}, state.dashboardStats || {}, snapshot.dashboardStats);
      }
      if (canReusePlaneacionesSnapshot && Array.isArray(snapshot.planeaciones)) {
        state.planeaciones = snapshot.planeaciones.filter((plan) => !isPlaneacionPendingCreation(plan));
      }
      if (Array.isArray(snapshot.alertas)) {
        state.alertas = snapshot.alertas;
        markAlertasFresh(snapshot.meta && snapshot.meta.alertas_saved_at ? snapshot.meta.alertas_saved_at : snapshot.saved_at);
      }
      if (Array.isArray(snapshot.notificaciones)) {
        state.notificaciones = snapshot.notificaciones;
        markNotificacionesFresh(snapshot.meta && snapshot.meta.notificaciones_saved_at ? snapshot.meta.notificaciones_saved_at : snapshot.saved_at);
      }
      if (
        snapshot.openPlan &&
        typeof snapshot.openPlan === 'object' &&
        snapshot.openPlan.planeacion_id &&
        !isPlaneacionPendingCreation(snapshot.openPlan)
      ) {
        upsertPlaneacionRow(snapshot.openPlan);
        if (snapshot.openPlan.detail_loaded) {
          markPlaneacionDetailFresh(
            snapshot.openPlan.planeacion_id,
            snapshot.meta && snapshot.meta.open_plan_detail_saved_at ? snapshot.meta.open_plan_detail_saved_at : snapshot.saved_at
          );
        }
        if (snapshot.openPlan.obs_loaded) {
          markPlaneacionObservacionesFresh(
            snapshot.openPlan.planeacion_id,
            snapshot.meta && snapshot.meta.open_plan_obs_saved_at ? snapshot.meta.open_plan_obs_saved_at : snapshot.saved_at
          );
        }
      }
      if (
        canReusePlaneacionesSnapshot &&
        snapshot.openPlanId &&
        Array.isArray(snapshot.planeaciones) &&
        snapshot.planeaciones.some(
          (plan) =>
            plan &&
            !isPlaneacionPendingCreation(plan) &&
            plan.planeacion_id === snapshot.openPlanId
        )
      ) {
        state.openPlanId = snapshot.openPlanId;
      }
      if (
        snapshot.openPlanDraft &&
        typeof snapshot.openPlanDraft === 'object' &&
        snapshot.openPlanDraft.planId &&
        !/^tmppla/i.test(String(snapshot.openPlanDraft.planId || '').trim())
      ) {
        state.openPlanDraft = snapshot.openPlanDraft;
      }
      if (canReusePlaneacionesSnapshot && snapshot.planeacionesMeta && state.ui) {
        state.ui.planeacionesLoaded = !!snapshot.planeacionesMeta.loaded;
        state.ui.planeacionesHasMore = !!snapshot.planeacionesMeta.hasMore;
        state.ui.planeacionesOffset = Number(snapshot.planeacionesMeta.offset || state.planeaciones.length || 0);
      }
      return true;
    }

    function restoreBootSnapshot() {
      return restoreBootSnapshotForSession(state.session);
    }

    function getPlaneacionOutboxOwnerKey(sessionLike = state.session) {
      const usuario = sessionLike && sessionLike.usuario ? sessionLike.usuario : {};
      const role = String((usuario && usuario.rol) || (sessionLike && sessionLike.rol) || '').trim().toLowerCase();
      const facilitadorId = String((usuario && usuario.facilitador_id) || (sessionLike && sessionLike.facilitador_id) || '').trim();
      if (role !== 'facilitador' || !facilitadorId) return '';
      return role + ':' + facilitadorId;
    }

    function isPlaneacionOutboxEnabled(sessionLike = state.session) {
      return !!(sessionLike && sessionLike.token && getPlaneacionOutboxOwnerKey(sessionLike));
    }

    function readPlaneacionOutboxStore() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.planeacionOutbox);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (_) {
        return {};
      }
    }

    function writePlaneacionOutboxStore(store) {
      try {
        const nextStore = store && typeof store === 'object' ? store : {};
        if (Object.keys(nextStore).length) {
          localStorage.setItem(STORAGE_KEYS.planeacionOutbox, JSON.stringify(nextStore));
        } else {
          localStorage.removeItem(STORAGE_KEYS.planeacionOutbox);
        }
      } catch (_) {}
    }

    function setPlaneacionOutboxItems(items, ownerKey = getPlaneacionOutboxOwnerKey()) {
      const normalizedItems = Array.isArray(items) ? items.filter(Boolean) : [];
      state.planeacionOutbox = normalizedItems;
      if (!ownerKey) return;
      const store = readPlaneacionOutboxStore();
      if (normalizedItems.length) {
        store[ownerKey] = normalizedItems;
      } else {
        delete store[ownerKey];
      }
      writePlaneacionOutboxStore(store);
    }

    function hydratePlaneacionOutboxForSession(sessionLike = state.session) {
      const ownerKey = getPlaneacionOutboxOwnerKey(sessionLike);
      if (!ownerKey) {
        state.planeacionOutbox = [];
        return [];
      }
      const store = readPlaneacionOutboxStore();
      const items = Array.isArray(store[ownerKey]) ? store[ownerKey] : [];
      state.planeacionOutbox = items;
      return items;
    }

    function getPlaneacionOutboxPlanIds(item) {
      if (!item || typeof item !== 'object') return [];
      if (Array.isArray(item.tempPlanIds) && item.tempPlanIds.length) {
        return item.tempPlanIds.map((planId) => String(planId || '').trim()).filter(Boolean);
      }
      return [String(item.planId || '').trim()].filter(Boolean);
    }

    function shouldExposePlaneacionOutboxIssue(item) {
      if (!item || typeof item !== 'object') return false;
      if (item.retryable === false) return true;
      if (String(item.lastErrorCode || '').trim() === 'INVALID_SESSION') return true;
      return Number(item.attempts || 0) >= 3;
    }

    function getPlaneacionOutboxLocalState(item) {
      if (!item || typeof item !== 'object') return '';
      if (String(item.status || '').trim() === 'error' && shouldExposePlaneacionOutboxIssue(item)) return 'sync_error';
      if (String(item.kind || '').trim() === 'editor_create') return 'creating';
      return String(item.localState || 'saving').trim() || 'saving';
    }

    function getPlaneacionOutboxLocalMessage(item) {
      if (!item || typeof item !== 'object') return '';
      if (String(item.status || '').trim() === 'error') {
        if (!shouldExposePlaneacionOutboxIssue(item)) {
          return String(item.localMessage || 'Guardado local. Sincronizando...').trim();
        }
        if (item.retryable === false) return 'No se pudo sincronizar. Revisa y vuelve a guardar.';
        if (String(item.lastErrorCode || '').trim() === 'INVALID_SESSION') {
          return 'Pendiente de sincronizar. Vuelve a iniciar sesiÃ³n para terminar.';
        }
        return 'Guardado local pendiente. Reintentaremos en segundo plano.';
      }
      return String(item.localMessage || 'Guardado local. Sincronizando...').trim();
    }

    function applyPlaneacionOutboxVisualState(item) {
      if (!item || typeof item !== 'object') return;
      const localState = getPlaneacionOutboxLocalState(item);
      const localMessage = getPlaneacionOutboxLocalMessage(item);
      if (String(item.kind || '').trim() === 'editor_create') {
        upsertPlaneacionesRows((item.optimisticPlans || []).map((plan) => Object.assign({}, plan, {
          _local_save_state: localState,
          _local_save_message: localMessage,
          _local_queue_id: item.id
        })));
        return;
      }
      const optimisticPlan = item.optimisticPlan && typeof item.optimisticPlan === 'object'
        ? Object.assign({}, item.optimisticPlan, {
            _local_save_state: localState,
            _local_save_message: localMessage,
            _local_queue_id: item.id
          })
        : null;
      if (!optimisticPlan || !optimisticPlan.planeacion_id) return;
      upsertPlaneacionRow(optimisticPlan);
      if (state.openPlanId === optimisticPlan.planeacion_id && item.draft && typeof item.draft === 'object') {
        state.openPlanDraft = cloneJsonSafe(item.draft, item.draft) || item.draft;
      }
    }

    function reapplyPlaneacionOutboxState() {
      (state.planeacionOutbox || []).forEach((item) => applyPlaneacionOutboxVisualState(item));
    }

    function clearStalePlaneacionLocalState() {
      const pendingTransactionIds = new Set(
        Object.keys((state.ui && state.ui.pendingPlanSaveTransactions) || {})
          .map((planId) => String(planId || '').trim())
          .filter(Boolean)
      );
      const queuedPlanIds = new Set(
        (state.planeacionOutbox || [])
          .map((item) => String((item && item.planId) || '').trim())
          .filter(Boolean)
      );
      state.planeaciones = (state.planeaciones || []).map((plan) => {
        if (!plan || !plan.planeacion_id) return plan;
        const planId = String(plan.planeacion_id || '').trim();
        const localState = String(plan._local_save_state || '').trim();
        if (!localState) return plan;
        if (pendingTransactionIds.has(planId) || queuedPlanIds.has(planId)) return plan;
        return Object.assign({}, plan, {
          _local_save_state: '',
          _local_save_message: ''
        });
      });
    }

    function activatePlaneacionOutboxForSession(sessionLike = state.session) {
      hydratePlaneacionOutboxForSession(sessionLike);
      reapplyPlaneacionOutboxState();
      clearStalePlaneacionLocalState();
      schedulePlaneacionOutboxProcessing(140);
    }

    function loadSession() {
      const raw = localStorage.getItem(STORAGE_KEYS.session);
      if (!raw) return;
      try {
        state.session = JSON.parse(raw);
      } catch (_) {
        state.session = null;
        localStorage.removeItem(STORAGE_KEYS.session);
      }
    }

    function syncAuthMode() {
      const isLoggedIn = !!(state.session && state.session.token && state.session.usuario);
      document.body.classList.toggle('auth-mode', !isLoggedIn);
    }

    function saveSession(session) {
      state.session = session;
      if (session) {
        localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.session);
      }
      syncAuthMode();
      renderSession();
    }

    function requireBackendUrl() {
      return FIXED_BACKEND_URL;
    }

    function ensureLoggedIn() {
      if (!state.session || !state.session.token) throw new Error('Primero inicia sesiÃ³n.');
    }

    function formatApiError(err) {
      if (!err) return 'Error desconocido.';
      return err.code ? err.code + ': ' + err.message : err.message || String(err);
    }

    function getCurrentRole() {
      return state.session && state.session.usuario ? state.session.usuario.rol : '';
    }

    function isTruthyValue(value) {
      if (value === true) return true;
      const normalized = String(value == null ? '' : value).trim().toLowerCase();
      return normalized === 'si' || normalized === 'sÃ­' || normalized === 'true' || normalized === '1' || normalized === 'x' || normalized === 'yes';
    }

    function canUseReportes() {
      const role = getCurrentRole();
      return role === 'directora' || role === 'admin';
    }

    function canUseAdminShell() {
      const role = getCurrentRole();
      return role === 'directora' || role === 'admin';
    }

    function canResetTestEnvironment() {
      return getCurrentRole() === 'admin';
    }

    function ensureCanUseReportes() {
      if (!canUseReportes()) {
        throw new Error('Los reportes solo estÃ¡n disponibles para direcciÃ³n y admin.');
      }
    }

    function getLocalPeriods() {
      return parsePeriodsConfig(state.config.periodConfig);
    }

    function getAvailablePeriods() {
      const backendPeriods = Array.isArray(state.catalogos.periodos) ? state.catalogos.periodos : [];
      if (backendPeriods.length) {
        return backendPeriods
          .filter((item) => isTruthyValue(item.activo))
          .map((item) => ({
            id: String(item.periodo_id || '').trim(),
            name: String(item.nombre_visible || item.periodo_id || '').trim()
          }))
          .filter((item) => item.id);
      }
      return [];
    }

    function ensureBackendPeriodsReady() {
      if (!Array.isArray(state.catalogos.periodos) || !state.catalogos.periodos.length) {
        throw new Error('El backend no devolviÃ³ perÃ­odos activos. Revisa la hoja PERIODOS antes de continuar.');
      }
    }

    async function api(action, payload = {}, options = {}) {
      const backendUrl = requireBackendUrl();
      const body = { action, payload };
      if (state.session && state.session.token) body.token = state.session.token;

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body)
      });
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (_) {
        throw new Error('El backend respondio algo no JSON: ' + text.slice(0, 180));
      }

      if (!json.ok) {
        const err = new Error(json.error || 'Error del backend');
        err.code = json.code || 'ERROR';
        err.details = json.details || null;
        throw err;
      }
      if (json.meta && json.data && typeof json.data === 'object' && !Array.isArray(json.data)) {
        return Object.assign({}, json.data, { _meta: json.meta });
      }
      return json.data;
    }

    async function pingBackend() {
      const backendUrl = requireBackendUrl();
      const url = backendUrl + (backendUrl.includes('?') ? '&' : '?') + 'action=ping';
      const response = await fetch(url);
      const json = await response.json();
      if (!json.ok) throw new Error(json.error || 'Ping fallido');
      setBanner(
        'ConexiÃ³n activa con Libre Aprendiz. Backend ' + (json.data && json.data.version || '-') +
        ' | mÃ³dulo de reportes ' + (json.data && json.data.report_module || '-'),
        'success'
      );
    }

    function triggerLoginAction(button) {
      const loginButton = button || $('loginBtn');
      return handleAction('login', login, {
        button: loginButton,
        key: buildActionKey('login', [$('facilitadorId').value])
      });
    }

    async function login() {
      const facilitadorId = $('facilitadorId').value.trim();
      const pin = $('pinInput').value.trim();
      if (!facilitadorId || !pin) throw new Error('Captura facilitador_id y PIN.');
      primeLoginSnapshotCatalogos(facilitadorId);
      const data = await api('login', { facilitador_id: facilitadorId, pin });
      saveSession({ token: data.token, usuario: data.usuario });
      if (canUseAdminShell()) {
        ensureAdminShellMarkupLoaded();
        bindWindowActionGroup('admin');
        bindAdminUiEventsOnce();
      }
      const restoredSnapshot = restoreBootSnapshotForSession({ usuario: data.usuario });
      activatePlaneacionOutboxForSession(state.session);
      if (!canUseAdminShell() && String(state.activeTab || '').trim() === 'planeaciones') {
        setPlaneacionesRestoreLock(true);
      }
      clearLoginInputs();
      renderBootSurface();
      if (shouldDeferFacilitadorRestoreRefresh(restoredSnapshot, { usuario: data.usuario })) {
        scheduleDeferredRestoreRefresh();
        return;
      }
      setRestoreSnapshotSyncing(false);
      await refreshAll({ fastFacilitadorBoot: true });
    }

    async function logout() {
      if (!state.session || !state.session.token) {
        clearLoadedData();
        clearLoginInputs();
        renderAll();
        saveSession(null);
        setBanner('No habÃ­a una sesiÃ³n activa.', 'info');
        return;
      }
      let remoteLogoutFailed = false;
      try {
        await api('logout', {});
      } catch (_) {
        remoteLogoutFailed = true;
      }
      saveSession(null);
      clearLoadedData();
      clearLoginInputs();
      renderAll();
      setBanner(remoteLogoutFailed ? 'SesiÃ³n local cerrada.' : 'SesiÃ³n cerrada.', remoteLogoutFailed ? 'info' : 'success');
    }

    async function refreshCatalogos(options = {}) {
      ensureLoggedIn();
      const blocks = normalizeCatalogBlocks(options.blocks || getCurrentCatalogBlocks());
      if (!blocks.length) return state.catalogos;
      const data = await api('getCatalogos', { blocks });
      mergeCatalogosPayload(data, blocks);
      if (blocks.some((block) => getPlaneacionesSurfaceCatalogBlocks().includes(block))) {
        persistCurrentBootSnapshot('catalogos');
      }
      return state.catalogos;
    }

    function buildPlaneacionesPayload(options = {}) {
      const payload = {
        limit: Number(options.limit || PLANEACIONES_PAGE_SIZE),
        offset: Math.max(0, Number(options.offset || 0))
      };
      const semanaFilter = $('filterSemana').value;
      const estadoFilter = $('filterEstado').value;
      const grupoFilter = $('filterGrupo').value;
      const facilitadorFilter = $('filterFacilitador').value;
      const alumnoFilter = $('filterAlumnoId').value;
      if (semanaFilter) payload.semana_id = semanaFilter;
      if (estadoFilter) payload.estado = estadoFilter;
      if (grupoFilter) payload.grupo_id = grupoFilter;
      if (facilitadorFilter) payload.facilitador_id = facilitadorFilter;
      if (alumnoFilter) payload.alumno_id = alumnoFilter;
      return payload;
    }

    async function refreshPlaneaciones(options = {}) {
      ensureLoggedIn();
      const append = !!options.append;
      const nextOffset = append && state.ui ? Number(state.ui.planeacionesOffset || 0) : 0;
      if (state.ui) {
        state.ui.planeacionesLoading = !append;
        state.ui.planeacionesLoadingMore = append;
      }
      if (isPlaneacionesSurfaceVisible()) renderPlaneacionesList();
      try {
        const data = await api('getPlaneaciones', Object.assign({}, buildPlaneacionesPayload({
          limit: options.limit || PLANEACIONES_PAGE_SIZE,
          offset: nextOffset
        }), {
          include_detail: false
        }));
        const nextRows = Array.isArray(data.rows) ? data.rows : [];
        if (append) {
          appendPlaneacionesRows(nextRows);
        } else {
          state.planeaciones = preserveOpenPlanDetailOnRowsReplace(nextRows);
        }
        if (state.ui) {
          state.ui.planeacionesLoaded = true;
          state.ui.planeacionesOffset = append ? (nextOffset + nextRows.length) : nextRows.length;
          state.ui.planeacionesHasMore = !!data.has_more;
        }
        if (!append) persistCurrentBootSnapshot('planeaciones');
        if (!append && state.openPlanId && (canUseAdminShell() ? state.activeAdminModule === 'planeaciones' : state.activeTab === 'planeaciones')) {
          const openPlan = getPlanById(state.openPlanId);
          if (!(openPlan && openPlan.detail_loaded && shouldPreserveSnapshotPlanDetail(state.openPlanId))) {
            await ensurePlaneacionDetailLoaded(state.openPlanId, { silent: true });
          }
        }
      } finally {
        if (state.ui) {
          state.ui.planeacionesLoading = false;
          state.ui.planeacionesLoadingMore = false;
        }
      }
    }

    async function refreshAlertas(options = {}) {
      ensureLoggedIn();
      if (!options.force && shouldReuseFacilitadorFeedSnapshot('alertas')) {
        return { rows: Array.isArray(state.alertas) ? state.alertas : [], reusedSnapshot: true };
      }
      const data = await api('getAlertas', { limit: 20 });
      state.alertas = Array.isArray(data.rows) ? data.rows : [];
      markAlertasFresh();
      persistCurrentBootSnapshot('alertas');
      return data;
    }

    async function refreshNotificaciones(options = {}) {
      ensureLoggedIn();
      if (!options.force && shouldReuseFacilitadorFeedSnapshot('notificaciones')) {
        return { rows: Array.isArray(state.notificaciones) ? state.notificaciones : [], reusedSnapshot: true };
      }
      const defaultLimit = canUseAdminShell() ? 100 : 20;
      const limit = Math.max(1, Number(options.limit) || defaultLimit);
      const data = await api('getNotificaciones', { limit });
      state.notificaciones = Array.isArray(data.rows) ? data.rows : [];
      markNotificacionesFresh();
      persistCurrentBootSnapshot('notificaciones');
      return data;
    }

    function shouldUseFastFacilitadorPlaneacionesBoot(options = {}) {
      return !!(
        options &&
        options.fastFacilitadorBoot &&
        getCurrentRole() === 'facilitador' &&
        !canUseAdminShell() &&
        String(state.activeTab || '').trim() === 'planeaciones'
      );
    }

    function shouldUseFastAdminDashboardBoot(options = {}) {
      return !!(
        options &&
        options.fastFacilitadorBoot &&
        canUseAdminShell() &&
        String(state.activeAdminModule || '').trim() === 'dashboard'
      );
    }

    function shouldDeferFacilitadorRestoreRefresh(restoredSnapshot, sessionLike = state.session) {
      const role = sessionLike && sessionLike.usuario ? String(sessionLike.usuario.rol || '').trim() : getCurrentRole();
      if (!restoredSnapshot || role !== 'facilitador' || canUseAdminShell()) return false;
      if (String(state.activeTab || '').trim() !== 'planeaciones') return false;
      return shouldReuseFacilitadorFeedSnapshot('planeaciones');
    }

    function setRestoreSnapshotSyncing(isActive) {
      if (!state.ui) return;
      const nextValue = !!isActive;
      if (state.ui.restoreSnapshotSyncing === nextValue) return;
      state.ui.restoreSnapshotSyncing = nextValue;
      renderSession();
    }

    function scheduleDeferredRestoreRefresh() {
      setRestoreSnapshotSyncing(true);
      const promise = scheduleAfterPaint(() => refreshAll({ fastFacilitadorBoot: true }), 40)
        .catch((error) => {
          setPlaneacionesRestoreLock(false);
          setBanner(formatApiError(error), 'error');
        });
      if (state.ui) state.ui.fastPlaneacionesBootPromise = promise;
      promise.finally(() => {
        if (state.ui && state.ui.fastPlaneacionesBootPromise === promise) {
          state.ui.fastPlaneacionesBootPromise = null;
        }
        setRestoreSnapshotSyncing(false);
      });
      return promise;
    }

    async function ensurePlaneacionesCatalogosAvailable(options = {}) {
      const scope = String(options && options.scope || 'editor').trim() || 'editor';
      const blocks = getMissingCatalogBlocks(getCatalogBlocksForModuleWithScope('planeaciones', { scope }));
      if (!blocks.length) return state.catalogos;
      if (state.ui && state.ui.planeacionesCatalogosPromise) {
        const pendingBlocks = Array.isArray(state.ui.planeacionesCatalogosPendingBlocks)
          ? state.ui.planeacionesCatalogosPendingBlocks
          : [];
        if (blocks.every((block) => pendingBlocks.includes(block))) {
          return state.ui.planeacionesCatalogosPromise;
        }
        return state.ui.planeacionesCatalogosPromise.then(() => ensurePlaneacionesCatalogosAvailable(options));
      }
      if (state.ui) state.ui.planeacionesCatalogosLoading = true;
      if (state.ui) state.ui.planeacionesCatalogosPendingBlocks = [...blocks];
      if (options.render !== false) renderPlanEditor();
      const promise = refreshCatalogos({ blocks })
        .then(() => {
          if (state.ui) state.ui.planeacionesCatalogosLoading = false;
          if (options.render !== false) {
            renderBaseSelects({ planeaciones: true });
            renderPlanBuilderVisibility();
            if (isPlaneacionesSurfaceVisible()) {
              renderPlaneacionesSurface({
                includeStats: false,
                includePlaneaciones: true,
                includeAlertas: false
              });
            }
          } else if (isPlanBuilderExpanded() || isPlaneacionesSurfaceVisible()) {
            renderBaseSelects({ planeaciones: true });
            renderPlanBuilderVisibility();
          }
          return state.catalogos;
        })
        .finally(() => {
          if (state.ui) {
            state.ui.planeacionesCatalogosPromise = null;
            state.ui.planeacionesCatalogosLoading = false;
            state.ui.planeacionesCatalogosPendingBlocks = [];
          }
        });
      if (state.ui) state.ui.planeacionesCatalogosPromise = promise;
      return promise;
    }

    async function ensureTallerMembershipCatalogosAvailable(options = {}) {
      const blocks = getMissingCatalogBlocks(['alumnos', 'grupos']);
      if (!blocks.length) return state.catalogos;
      if (state.ui && state.ui.tallerMembershipCatalogosPromise) {
        return state.ui.tallerMembershipCatalogosPromise;
      }
      const promise = refreshCatalogos({ blocks })
        .then(() => {
          if (options.render !== false && state.activeAdminModule === 'talleres') {
            renderAdminTalleresModule();
          }
          return state.catalogos;
        })
        .finally(() => {
          if (state.ui) state.ui.tallerMembershipCatalogosPromise = null;
        });
      if (state.ui) state.ui.tallerMembershipCatalogosPromise = promise;
      return promise;
    }

    async function refreshFacilitadorPlaneacionesFastBoot(options = {}) {
      ensureLoggedIn();
      const surfaceCatalogBlocks = getPlaneacionesSurfaceCatalogBlocks();
      const missingSurfaceCatalogBlocks = getMissingCatalogBlocks(surfaceCatalogBlocks);
      const shouldRequestSurfaceCatalogs = missingSurfaceCatalogBlocks.length > 0;
      const hadLocalNotificaciones = Array.isArray(state.notificaciones) && state.notificaciones.length > 0;
      const requestedOpenPlanId = String(state.openPlanId || '').trim();
      const canReuseSnapshotOpenPlanDetail = requestedOpenPlanId && shouldPreserveSnapshotPlanDetail(requestedOpenPlanId);
      const canReusePlaneacionesSnapshot =
        shouldReuseFacilitadorFeedSnapshot('planeaciones') &&
        !hasActivePlaneacionesFilters() &&
        Array.isArray(state.planeaciones) &&
        (!!state.planeaciones.length || !!(state.ui && state.ui.planeacionesLoaded));
      const canReuseStatsSnapshot =
        canReusePlaneacionesSnapshot &&
        state.dashboardStats &&
        typeof state.dashboardStats === 'object' &&
        Object.keys(state.dashboardStats).length > 0;
      const shouldRequestPlaneaciones = !canReusePlaneacionesSnapshot;
      const shouldReuseAlertas = shouldReuseFacilitadorFeedSnapshot('alertas');
      const shouldReuseNotificaciones = shouldReuseFacilitadorFeedSnapshot('notificaciones');
      const bootData = await api('getFacilitadorBoot', Object.assign({}, buildPlaneacionesPayload(), {
        alert_limit: 20,
        notification_limit: 20,
        include_stats: !canReuseStatsSnapshot,
        include_planeaciones: shouldRequestPlaneaciones,
        include_alertas: !shouldReuseAlertas,
        include_notificaciones: !shouldReuseNotificaciones,
        include_catalogos: shouldRequestSurfaceCatalogs,
        catalog_blocks: shouldRequestSurfaceCatalogs ? missingSurfaceCatalogBlocks : [],
        open_plan_id: canReuseSnapshotOpenPlanDetail ? '' : (requestedOpenPlanId || '')
      }));
      if (bootData && bootData.catalogos && Object.keys(bootData.catalogos).length) {
        mergeCatalogosPayload(bootData.catalogos, shouldRequestSurfaceCatalogs ? missingSurfaceCatalogBlocks : surfaceCatalogBlocks);
      }
      state.dashboardStats = Object.assign({}, state.dashboardStats || {}, bootData && bootData.stats ? bootData.stats : {});
      if (shouldRequestPlaneaciones) {
        const bootRows = Array.isArray(bootData && bootData.planeaciones && bootData.planeaciones.rows)
          ? bootData.planeaciones.rows
          : [];
        const snapshotOpenPlan = canReuseSnapshotOpenPlanDetail
          ? (getPlanById(requestedOpenPlanId) || getBootSnapshotOpenPlanById(requestedOpenPlanId))
          : null;
        state.planeaciones = preserveOpenPlanDetailOnRowsReplace(bootRows, snapshotOpenPlan, requestedOpenPlanId);
      }
      const bootHasAlertas = !!(bootData && bootData.alertas && Array.isArray(bootData.alertas.rows));
      state.alertas = bootHasAlertas
        ? bootData.alertas.rows
        : (Array.isArray(state.alertas) ? state.alertas : []);
      if (bootHasAlertas) markAlertasFresh();
      const bootHasNotificaciones = !!(bootData && bootData.notificaciones && Array.isArray(bootData.notificaciones.rows));
      state.notificaciones = bootHasNotificaciones
        ? bootData.notificaciones.rows
        : (Array.isArray(state.notificaciones) ? state.notificaciones : []);
      if (bootHasNotificaciones) markNotificacionesFresh();
      let bootOpenPlan = null;
      if (bootData && bootData.open_planeacion && bootData.open_planeacion.planeacion_id) {
        bootOpenPlan = upsertPlaneacionRow(bootData.open_planeacion);
        if (bootOpenPlan && bootOpenPlan.detail_loaded) markPlaneacionDetailFresh(bootOpenPlan.planeacion_id);
        if (bootData.open_planeacion.obs_loaded) {
          markPlaneacionObservacionesFresh(bootData.open_planeacion.planeacion_id);
        }
      }
      if (state.ui) {
        state.ui.planeacionesLoaded = shouldRequestPlaneaciones
          ? true
          : !!(state.ui.planeacionesLoaded || canReusePlaneacionesSnapshot);
        state.ui.planeacionesLoading = false;
        state.ui.planeacionesLoadingMore = false;
        if (shouldRequestPlaneaciones) {
          state.ui.planeacionesOffset = state.planeaciones.length;
          state.ui.planeacionesHasMore = !!(bootData && bootData.planeaciones && bootData.planeaciones.has_more);
        }
      }
      persistCurrentBootSnapshot('facilitador_boot');
      renderSession();
      renderStats();
      renderPlaneacionesSurface({
        includeStats: false,
        includePlaneaciones: true,
        includeAlertas: true
      });
      renderInstitutionalNotices();
      syncRoleUi();
      const deferredPromise = scheduleAfterPaint(async () => {
        renderBaseSelects({ planeaciones: true });
        renderPlanBuilderVisibility();
        if (!shouldRequestPlaneaciones) {
          await scheduleAfterPaint(async () => {
            await refreshPlaneaciones();
            renderPlaneacionesSurface({
              includeStats: true,
              includePlaneaciones: true,
              includeAlertas: false
            });
          }, 90);
        }
        if (state.openPlanId && Array.isArray(state.planeaciones) && state.planeaciones.some((plan) => plan && plan.planeacion_id === state.openPlanId)) {
          await scheduleAfterPaint(async () => {
            try {
              const currentOpenPlan = getPlanById(state.openPlanId);
              const alreadyReadyFromBoot = !!(bootOpenPlan && bootOpenPlan.planeacion_id === state.openPlanId && bootOpenPlan.detail_loaded);
              const canReuseFullSnapshot = !!(currentOpenPlan && currentOpenPlan.detail_loaded && shouldPreserveSnapshotPlanDetail(state.openPlanId));
              if (!(alreadyReadyFromBoot || canReuseFullSnapshot)) {
                await ensurePlaneacionDetailLoaded(state.openPlanId, { silent: true });
              }
              persistCurrentBootSnapshot('facilitador_boot_detail');
              renderPlaneacionesList();
              scheduleAfterPaint(() => {
                if (state.openPlanId !== requestedOpenPlanId) return null;
                return ensurePlaneacionObservacionesLoaded(state.openPlanId, { silent: true })
                  .then(() => {
                    if (state.openPlanId !== requestedOpenPlanId) return;
                    renderPlaneacionesList();
                  })
                  .catch(() => null);
              }, 120);
            } catch (_) {}
          }, 120);
        }
        if (!bootHasNotificaciones && !hadLocalNotificaciones && !shouldReuseFacilitadorFeedSnapshot('notificaciones')) {
          await scheduleAfterPaint(async () => {
            await refreshNotificaciones();
            persistCurrentBootSnapshot('notificaciones');
            renderInstitutionalNotices();
          }, 180);
        }
      }, 80);

      if (state.ui) state.ui.fastPlaneacionesBootPromise = deferredPromise;
      deferredPromise.finally(() => {
        if (state.ui) state.ui.fastPlaneacionesBootPromise = null;
      });
      setPlaneacionesRestoreLock(false);
    }

    async function refreshAdminDashboardFastBoot(options = {}) {
      ensureLoggedIn();
      const dashboard = await api('getDashboard', Object.assign({}, buildPlaneacionesPayload(), {
        alert_limit: 20,
        notification_limit: 20,
        include_catalogos: false,
        include_planeaciones: false,
        include_notificaciones: false,
        include_detail: false
      }));
      state.dashboardStats = dashboard && dashboard.stats ? dashboard.stats : {};
      state.alertas = Array.isArray(dashboard && dashboard.alertas && dashboard.alertas.rows)
        ? dashboard.alertas.rows
        : [];
      state.notificaciones = [];
      renderSession();
      renderStats();
      renderAdminShell();
      renderAlertas();
      renderInstitutionalNotices();
      syncRoleUi();

      const deferredPromise = Promise.resolve();

      if (state.ui) state.ui.fastAdminBootPromise = deferredPromise;
      deferredPromise.finally(() => {
        if (state.ui) state.ui.fastAdminBootPromise = null;
      });
    }

    async function refreshAll(options = {}) {
      ensureLoggedIn();
      const attemptedFastFacilitadorBoot = shouldUseFastFacilitadorPlaneacionesBoot(options);
      const attemptedFastAdminBoot = shouldUseFastAdminDashboardBoot(options);
      if (shouldUseFastFacilitadorPlaneacionesBoot(options)) {
        try {
          await refreshFacilitadorPlaneacionesFastBoot(options);
          return;
        } catch (_) {
          setPlaneacionesRestoreLock(false);
        }
      }
      if (shouldUseFastAdminDashboardBoot(options)) {
        try {
          await refreshAdminDashboardFastBoot(options);
          return;
        } catch (_) {}
      }
      const silent = !!(options && options.silent);
      const adminNeedsAlertRows = canUseAdminShell() && ['dashboard', 'planeaciones'].includes(String(state.activeAdminModule || '').trim());
      const adminNeedsNotificationRows = canUseAdminShell() && String(state.activeAdminModule || '').trim() === 'notificaciones';
      const shouldIncludeCatalogos = currentViewNeedsCatalogos();
      const requestedCatalogBlocks = shouldIncludeCatalogos ? getCurrentCatalogBlocks() : [];
      const shouldIncludePlaneaciones = currentViewNeedsPlaneaciones();
      try {
        const notificationLimit = canUseAdminShell() ? (adminNeedsNotificationRows ? 100 : 20) : 120;
        const dashboardCatalogBlocks = shouldIncludeCatalogos
          ? (silent ? getMissingCatalogBlocks(requestedCatalogBlocks) : requestedCatalogBlocks)
          : [];
        const reuseCatalogos = shouldIncludeCatalogos && silent && dashboardCatalogBlocks.length === 0;
        const dashboard = await api('getDashboard', Object.assign({}, buildPlaneacionesPayload(), {
          alert_limit: 20,
          notification_limit: notificationLimit,
          include_catalogos: shouldIncludeCatalogos && !reuseCatalogos,
          catalog_blocks: dashboardCatalogBlocks,
          include_planeaciones: shouldIncludePlaneaciones,
          include_alertas: !canUseAdminShell() || adminNeedsAlertRows,
          include_notificaciones: !canUseAdminShell() || adminNeedsNotificationRows,
          include_detail: false
        }));
        state.dashboardStats = dashboard && dashboard.stats ? dashboard.stats : {};
        if (dashboard && dashboard.catalogos && Object.keys(dashboard.catalogos).length) {
          mergeCatalogosPayload(dashboard.catalogos, dashboardCatalogBlocks);
        } else if (!hasCatalogosLoaded()) {
          state.catalogos = createEmptyCatalogos();
          state.catalogosMeta = createEmptyCatalogosMeta();
        }
        if (shouldIncludePlaneaciones) {
          state.planeaciones = Array.isArray(dashboard && dashboard.planeaciones && dashboard.planeaciones.rows)
            ? dashboard.planeaciones.rows
            : [];
          if (state.ui) state.ui.planeacionesLoaded = true;
        }
        if (state.openPlanId && shouldIncludePlaneaciones && (canUseAdminShell() ? state.activeAdminModule === 'planeaciones' : state.activeTab === 'planeaciones')) {
          await ensurePlaneacionDetailLoaded(state.openPlanId, { silent: true });
        }
        state.alertas = Array.isArray(dashboard && dashboard.alertas && dashboard.alertas.rows)
          ? dashboard.alertas.rows
          : ((!canUseAdminShell() || adminNeedsAlertRows) ? [] : state.alertas);
        state.notificaciones = Array.isArray(dashboard && dashboard.notificaciones && dashboard.notificaciones.rows)
          ? dashboard.notificaciones.rows
          : ((!canUseAdminShell() || adminNeedsNotificationRows) ? [] : state.notificaciones);
      } catch (_) {
        const tasks = [];
        if (shouldIncludeCatalogos) tasks.push(refreshCatalogos());
        if (shouldIncludePlaneaciones) tasks.push(refreshPlaneaciones());
        if (!canUseAdminShell() || adminNeedsAlertRows) tasks.push(refreshAlertas());
        if (!canUseAdminShell() || adminNeedsNotificationRows) tasks.push(refreshNotificaciones());
        await Promise.all(tasks);
      }
      if (attemptedFastFacilitadorBoot || attemptedFastAdminBoot) {
        renderBootSurface();
      } else {
        renderAll();
      }
      if (requestedCatalogBlocks.includes('periodos') && (!Array.isArray(state.catalogos.periodos) || !state.catalogos.periodos.length)) {
        setBanner('Faltan perÃ­odos activos en el backend. Revisa la hoja PERIODOS.', 'error');
        return;
      }
    }

    function isPlaneacionesSurfaceVisible() {
      return canUseAdminShell() ? state.activeAdminModule === 'planeaciones' : state.activeTab === 'planeaciones';
    }

    function isAlertasSurfaceVisible() {
      return !canUseAdminShell() || state.activeAdminModule === 'dashboard' || state.activeAdminModule === 'planeaciones';
    }

    function renderPlaneacionesSurface(options = {}) {
      const includeStats = options.includeStats !== false;
      const includePlaneaciones = options.includePlaneaciones !== false;
      const includeAlertas = options.includeAlertas !== false;
      if (includeStats) renderStats();
      if (canUseAdminShell()) renderAdminShell();
      if (includePlaneaciones && isPlaneacionesSurfaceVisible()) {
        renderPlaneacionesList();
        renderPlanBuilderVisibility();
      }
      if (includeAlertas && isAlertasSurfaceVisible()) renderAlertas();
    }

    function scheduleUiDebounce(key, fn, delay = 140) {
      if (typeof fn !== 'function') return;
      if (!state.ui) {
        fn();
        return;
      }
      if (!state.ui.debounceTimers) state.ui.debounceTimers = {};
      const timers = state.ui.debounceTimers;
      if (timers[key]) window.clearTimeout(timers[key]);
      timers[key] = window.setTimeout(() => {
        delete timers[key];
        fn();
      }, delay);
    }

    async function refreshPlaneacionesSurface(options = {}) {
      const includePlaneaciones = options.includePlaneaciones !== false;
      const includeAlertas = options.includeAlertas !== false;
      if (includePlaneaciones) {
        await refreshPlaneaciones();
        renderPlaneacionesSurface({
          includeStats: options.includeStats,
          includePlaneaciones: true,
          includeAlertas: false
        });
      }
      if (includeAlertas) {
        await refreshAlertas();
        renderPlaneacionesSurface({
          includeStats: false,
          includePlaneaciones: false,
          includeAlertas: true
        });
        return;
      }
      if (!includePlaneaciones) {
        renderPlaneacionesSurface({
          includeStats: options.includeStats,
          includePlaneaciones: false,
          includeAlertas: false
        });
      }
    }

    function renderActiveAdminModule(moduleName = state.activeAdminModule) {
      if (!canUseAdminShell()) return;
      ensureAdminShellMarkupLoaded();
      const normalized = String(moduleName || '').trim();
      if (isAdminModuleLoading(normalized)) {
        renderAdminModulePlaceholder(normalized);
        return;
      }
      if (adminModuleNeedsCatalogos(normalized) && !hasCatalogBlocksLoaded(getAdminModuleCatalogBlocks(normalized))) {
        renderAdminModulePlaceholder(normalized);
        return;
      }
      switch (normalized) {
        case 'notificaciones':
          renderNotificationsAdmin();
          break;
        case 'alumnos':
          renderAdminAlumnosModule();
          break;
        case 'facilitadores':
          renderAdminFacilitadoresModule();
          break;
        case 'materias':
          renderAdminMateriasModule();
          break;
        case 'talleres':
          renderAdminTalleresModule();
          break;
        case 'reporte-ciclo':
          renderAdminReporteCicloModule();
          break;
        case 'configuracion':
          renderAdminConfiguracionModule();
          break;
        default:
          break;
      }
    }

    function isAdminModuleLoading(moduleName) {
      const key = String(moduleName || '').trim();
      return !!(state.ui && state.ui.adminModuleLoading && state.ui.adminModuleLoading[key]);
    }

    function setAdminModuleLoading(moduleName, isLoading) {
      const key = String(moduleName || '').trim();
      if (!state.ui) return;
      if (!state.ui.adminModuleLoading || typeof state.ui.adminModuleLoading !== 'object') {
        state.ui.adminModuleLoading = {};
      }
      if (isLoading) state.ui.adminModuleLoading[key] = true;
      else delete state.ui.adminModuleLoading[key];
    }

    function getAdminModulePlaceholderCopy(moduleName) {
      switch (String(moduleName || '').trim()) {
        case 'planeaciones':
          return {
            title: 'Cargando planeaciones',
            body: 'Preparamos filtros y herramientas del mÃ³dulo sin frenar la vista principal.'
          };
        case 'alumnos':
          return {
            title: 'Cargando alumnos',
            body: 'Se estÃ¡n hidratando grupos y fichas base para que el listado responda mÃ¡s rÃ¡pido.'
          };
        case 'facilitadores':
          return {
            title: 'Cargando facilitadores',
            body: 'Preparamos accesos, asignaciones y panel lateral de trabajo.'
          };
        case 'materias':
          return {
            title: 'Cargando materias',
            body: 'Se estÃ¡n organizando materias base y variantes activas.'
          };
        case 'talleres':
          return {
            title: 'Cargando talleres',
            body: 'Preparamos catÃ¡logo base y relaciones activas sin congelar la navegaciÃ³n.'
          };
        case 'notificaciones':
          return {
            title: 'Cargando notificaciones',
            body: 'Se estÃ¡ preparando la bandeja activa y el editor institucional.'
          };
        case 'reporte-ciclo':
          return {
            title: 'Cargando reporte de ciclo',
            body: 'Se estÃ¡n preparando alumnos y periodos para este mÃ³dulo.'
          };
        default:
          return {
            title: 'Cargando mÃ³dulo',
            body: 'Preparamos la informaciÃ³n necesaria para mostrar este panel.'
          };
      }
    }

    function renderAdminModulePlaceholder(moduleName) {
      const panel = $('admin-panel-' + String(moduleName || '').trim());
      if (!panel) return;
      const copy = getAdminModulePlaceholderCopy(moduleName);
      panel.innerHTML =
        '<article class="admin-placeholder">' +
          '<h3>' + escapeHtml(copy.title) + '</h3>' +
          '<p>' + escapeHtml(copy.body) + '</p>' +
        '</article>';
    }

    function renderAdminModuleSurface(moduleName = state.activeAdminModule, options = {}) {
      if (!canUseAdminShell()) return;
      if (options.includeStats !== false) renderStats();
      renderAdminShell();
      renderActiveAdminModule(moduleName);
      syncRoleUi();
    }

    async function refreshAdminModuleSurface(moduleName = state.activeAdminModule, options = {}) {
      if (!canUseAdminShell()) return;
      const targetModule = String(moduleName || state.activeAdminModule || '').trim();
      const tasks = [];
      if (options.refreshCatalogos !== false && adminModuleNeedsCatalogos(targetModule)) {
        tasks.push(refreshCatalogos({ blocks: getAdminModuleCatalogBlocks(targetModule) }));
      }
      if (options.refreshNotificaciones) tasks.push(refreshNotificaciones());
      if (options.refreshAlertas) tasks.push(refreshAlertas());
      if (tasks.length) await Promise.all(tasks);
      renderAdminModuleSurface(targetModule, { includeStats: options.includeStats });
    }

    function syncRoleUi() {
      const tabs = document.querySelector('.tabs');
      const seguimientoTabBtn = document.querySelector('.tab-btn[data-tab="seguimiento"]');
      const reportTabBtn = document.querySelector('.tab-btn[data-tab="reportes"]');
      const summaryCard = $('summaryCard');
      const alertsCard = $('alertsCard');
      const adminShell = $('adminShell');
      const adminPlaneacionesShell = $('adminPlaneacionesShell');
      const seguimientoPanel = $('panel-seguimiento');
      const reportPanel = $('panel-reportes');
      const estadoFilter = $('filterEstado');
      const role = getCurrentRole();
      const facilitatorMode = role === 'facilitador';
      const adminMode = canUseAdminShell();
      const canViewReportes = canUseReportes();
      if (tabs) tabs.hidden = facilitatorMode || adminMode;
      if (adminShell) adminShell.style.display = adminMode ? 'grid' : 'none';
      if (adminPlaneacionesShell) adminPlaneacionesShell.classList.toggle('is-active', !adminMode || state.activeAdminModule === 'planeaciones');
      if (summaryCard) summaryCard.hidden = facilitatorMode || (adminMode && state.activeAdminModule !== 'dashboard');
      if (alertsCard) {
        const hasVisibleAlerts = getVisibleOperationalAlerts().length > 0;
        alertsCard.hidden = (adminMode && state.activeAdminModule !== 'dashboard') || !hasVisibleAlerts;
      }
      if (seguimientoTabBtn) seguimientoTabBtn.hidden = facilitatorMode;
      if (seguimientoPanel) seguimientoPanel.hidden = facilitatorMode;
      if (reportTabBtn) reportTabBtn.hidden = !canViewReportes;
      if (reportPanel) reportPanel.hidden = facilitatorMode || adminMode || !canViewReportes;
      if (estadoFilter) {
        Array.from(estadoFilter.options).forEach((option) => {
          option.hidden = facilitatorMode && ['rechazada', 'cierre_pendiente', 'cerrada', 'archivada'].includes(option.value);
        });
        if (facilitatorMode && ['rechazada', 'cierre_pendiente', 'cerrada', 'archivada'].includes(estadoFilter.value)) {
          estadoFilter.value = '';
        }
      }
      ['filterGrupo', 'filterFacilitador', 'filterAlumnoSearch', 'clearAlumnoFilterBtn', 'filterAlumnoChip'].forEach((id) => {
        const el = $(id);
        if (el) el.hidden = facilitatorMode;
      });
      if (facilitatorMode) {
        if ($('filterGrupo')) $('filterGrupo').value = '';
        if ($('filterFacilitador')) $('filterFacilitador').value = '';
        if ($('filterAlumnoSearch')) $('filterAlumnoSearch').value = '';
        if ($('filterAlumnoId')) $('filterAlumnoId').value = '';
      }
      if (adminMode && !['dashboard', 'planeaciones', 'alumnos', 'notificaciones', 'reporte-ciclo', 'facilitadores', 'materias', 'talleres', 'configuracion'].includes(state.activeAdminModule)) {
        state.activeAdminModule = 'dashboard';
      }
      if (facilitatorMode && state.activeTab !== 'planeaciones') {
        state.activeTab = 'planeaciones';
      }
      if (!canViewReportes && state.activeTab === 'reportes') {
        state.activeTab = 'planeaciones';
      }
    }

    function renderSession() {
      const badge = $('sessionBadge');
      const info = $('sessionInfo');
      const logoutBtn = $('logoutBtn');
      const workspaceLogoutBtn = $('workspaceLogoutBtn');
      const workspaceSessionBar = $('workspaceSessionBar');
      const workspaceSessionCopy = $('workspaceSessionCopy');
      const user = state.session && state.session.usuario ? state.session.usuario : null;
      if (!user) {
        badge.textContent = 'Sin sesiÃ³n';
        badge.className = 'pill';
        info.textContent = 'AÃºn no hay una sesiÃ³n activa.';
        if (workspaceSessionCopy) {
          workspaceSessionCopy.innerHTML = '<strong>Sin sesion</strong><span class="mini">Libre Aprendiz</span>';
        }
        if (logoutBtn) logoutBtn.hidden = true;
        if (workspaceLogoutBtn) workspaceLogoutBtn.hidden = true;
        if (workspaceSessionBar) workspaceSessionBar.hidden = true;
        syncRoleUi();
        return;
      }
      badge.textContent = user.rol;
      badge.className = 'pill brand';
      info.innerHTML =
        '<strong>' + escapeHtml(user.nombre) + '</strong><br>' +
        '<span class="mini">' + escapeHtml(user.facilitador_id) + ' Â· ' +
        escapeHtml(user.rol) + '</span>';
      if (workspaceSessionCopy) {
        const restoreChip = state.ui && state.ui.restoreSnapshotSyncing
          ? '<span class="workspace-session-sync-chip" title="Datos restaurados mientras sincroniza en segundo plano">Restaurado Â· Sync</span>'
          : '';
        workspaceSessionCopy.innerHTML =
          '<strong>' + escapeHtml(user.nombre) + '</strong><div class="workspace-session-meta"><span class="mini">' +
          escapeHtml(user.facilitador_id) + ' | ' + escapeHtml(user.rol) + '</span>' + restoreChip + '</div>';
      }
      if (logoutBtn) logoutBtn.hidden = false;
      if (workspaceLogoutBtn) workspaceLogoutBtn.hidden = false;
      if (workspaceSessionBar) workspaceSessionBar.hidden = false;
      syncRoleUi();
    }

    function renderStats() {
      const adminAlumnosCount = getAdminAlumnosCount();
      const dashboardAlumnoCount = state.dashboardStats && state.dashboardStats.alumnos_activos;
      const facilitatorAlumnoCount = state.catalogos.alumnos.length
        ? state.catalogos.alumnos.length
        : (dashboardAlumnoCount != null ? Number(dashboardAlumnoCount) : null);
      $('statAlumnos').textContent = String(canUseAdminShell()
        ? (adminAlumnosCount || Number(dashboardAlumnoCount || 0))
        : (facilitatorAlumnoCount != null ? facilitatorAlumnoCount : '--'));
      $('statPlaneaciones').textContent = String(Number(state.dashboardStats && state.dashboardStats.planeaciones_visibles || 0) || state.planeaciones.length || 0);
      $('statSemanas').textContent = String(state.catalogos.semanas.length || 0);
      $('statMaterias').textContent = String(state.catalogos.materias.length || Number(state.dashboardStats && state.dashboardStats.materias_activas || 0) || 0);
    }

    function closeOpenPlan() {
      state.openPlanId = '';
      state.openPlanDraft = null;
      if (state.ui) state.ui.openPlanLoadingId = '';
      persistCurrentBootSnapshot('planeacion_cerrada');
    }

    function exitPlanFocus() {
      closeOpenPlan();
      renderPlaneacionesList();
    }

    function resetPlaneacionesTransientUi() {
      closeOpenPlan();
      closePlanBuilder();
      renderPlanBuilderVisibility();
      renderPlaneacionesList();
    }

    async function loadMorePlaneaciones(button) {
      if (!state.ui || state.ui.planeacionesLoadingMore || !state.ui.planeacionesHasMore) return;
      await handleAction('cargar mÃ¡s planeaciones', async () => {
        await refreshPlaneaciones({ append: true });
        renderPlaneacionesList();
      }, {
        button,
        key: buildActionKey('loadMorePlaneaciones', [String(state.ui.planeacionesOffset || 0)]),
        busyText: 'Cargando...'
      });
    }

    function clearPlaneacionesMateriaFilter() {
      if (state.ui) state.ui.planeacionesMateriaFilter = '';
    }

    function activateAdminModule(moduleName) {
      if (!canUseAdminShell()) return;
      ensureAdminShellMarkupLoaded();
      bindWindowActionGroup('admin');
      const nextModule = moduleName || 'dashboard';
      if (nextModule !== 'notificaciones' && state.ui && state.ui.notificationEditorExpanded) {
        resetNotificationEditor();
      }
      if (nextModule !== 'alumnos') {
        state.alumnosUi.filter = 'activos';
        syncAdminAlumnosModule();
      }
      if (nextModule !== 'facilitadores') {
        closeFacilitadorEditor();
        closeFacilitadorPin();
        closeFacilitadorAsignacionEditor();
      }
      if (nextModule !== 'talleres') {
        closeTallerEditor();
        closeTallerMembershipEditor();
      }
      if (nextModule !== 'materias') {
        closeMateriaEditor();
        closeSubmateriaEditor();
      }
      if (nextModule !== 'planeaciones') {
        resetPlaneacionesTransientUi();
        clearPlaneacionesMateriaFilter();
      }
      if (nextModule === 'notificaciones' && state.ui) {
        state.ui.notificationFilter = 'activas';
      }
      state.activeAdminModule = nextModule;
      renderAdminShell();
      const bootstrappingNotificationsModule = nextModule === 'notificaciones' && !Array.isArray(state.notificaciones).length;
      if (bootstrappingNotificationsModule) {
        setAdminModuleLoading(nextModule, true);
        renderActiveAdminModule(nextModule);
        refreshAdminModuleSurface(nextModule, {
          includeStats: true,
          refreshNotificaciones: true
        })
          .then(() => {
            setAdminModuleLoading(nextModule, false);
          })
          .catch(() => {
            setAdminModuleLoading(nextModule, false);
          });
      }
      if (nextModule === 'planeaciones' && state.ui && !state.ui.planeacionesLoaded) {
        refreshPlaneaciones()
          .then(() => renderPlaneacionesSurface({ includeStats: true, includePlaneaciones: true, includeAlertas: false }))
          .catch(() => {});
      }
      if (!bootstrappingNotificationsModule && adminModuleNeedsCatalogos(nextModule) && !hasCatalogBlocksLoaded(getAdminModuleCatalogBlocks(nextModule))) {
        setAdminModuleLoading(nextModule, true);
        renderActiveAdminModule(nextModule);
        refreshCatalogos({ blocks: getMissingCatalogBlocks(getAdminModuleCatalogBlocks(nextModule)) })
          .then(() => {
            setAdminModuleLoading(nextModule, false);
            if (nextModule === 'planeaciones') {
              renderBaseSelects();
              renderPlaneacionesSurface({ includeStats: true, includePlaneaciones: false, includeAlertas: false });
            } else {
              renderAdminModuleSurface(nextModule, { includeStats: false });
            }
          })
          .catch(() => {
            setAdminModuleLoading(nextModule, false);
          });
      }
      if (nextModule === 'configuracion' && !getMaintenanceUi().preview) {
        setAdminModuleLoading(nextModule, true);
        renderActiveAdminModule(nextModule);
        loadMaintenancePreview({ keepAudit: true })
          .then(() => {
            setAdminModuleLoading(nextModule, false);
            renderAdminModuleSurface(nextModule, { includeStats: false });
          })
          .catch(() => {
            setAdminModuleLoading(nextModule, false);
          });
      }
      if (nextModule === 'planeaciones') {
        renderPlaneacionesList();
        renderPlanBuilderVisibility();
      } else if (nextModule === 'dashboard') {
        renderAlertas();
      } else {
        renderActiveAdminModule(nextModule);
      }
      syncRoleUi();
    }

    function renderAdminShell() {
      if (!canUseAdminShell()) {
        const adminShell = $('adminShell');
        if (!adminShell) return;
        adminShell.style.display = 'none';
        return;
      }
      if (!ensureAdminShellMarkupLoaded()) return;
      const adminShell = $('adminShell');
      if (!adminShell) return;
      const user = state.session && state.session.usuario ? state.session.usuario : null;
      const openPlans = Number(state.dashboardStats && state.dashboardStats.planeaciones_abiertas || state.planeaciones.filter((plan) => ['borrador', 'borrador_pendiente_aprobacion', 'rechazada', 'activa', 'cierre_pendiente'].includes(String(plan.estado || '').trim())).length || 0);
      const closedPlans = Number(state.dashboardStats && state.dashboardStats.planeaciones_cerradas || state.planeaciones.filter((plan) => ['cerrada', 'archivada'].includes(String(plan.estado || '').trim())).length || 0);
      const openAlerts = Array.isArray(state.alertas) && state.alertas.length
        ? state.alertas.filter((alerta) => String(alerta.estado || '').trim() !== 'resuelta').length
        : Number(state.dashboardStats && state.dashboardStats.alertas_abiertas || 0);
      const activeFacilitadores = state.catalogos.facilitadores.filter((item) => isTruthyValue(item.activo)).length || Number(state.dashboardStats && state.dashboardStats.facilitadores_activos || 0);
      const visibleAlumnos = getAdminAlumnosCount() || Number(state.dashboardStats && state.dashboardStats.alumnos_activos || 0);
      const activeMaterias = state.catalogos.materias.length || Number(state.dashboardStats && state.dashboardStats.materias_activas || 0);
      const activeTalleres = (state.catalogos.talleres || []).length || (Array.isArray(state.catalogos.talleres_admin) ? state.catalogos.talleres_admin.filter((item) => String(item.estatus || '').trim() === 'activo').length : 0);

      if ($('adminShellTitle')) {
        $('adminShellTitle').textContent = 'Centro de control' + (user ? ' de ' + (user.nombre || user.nombre_mostrado || user.facilitador_id || '') : '');
      }
      if ($('adminRolePill')) {
        $('adminRolePill').textContent = user ? (user.rol === 'admin' ? 'Admin' : 'Directora') : 'AdministraciÃ³n';
      }
      if ($('adminKpiOpenPlans')) $('adminKpiOpenPlans').textContent = String(openPlans);
      if ($('adminKpiClosedPlans')) $('adminKpiClosedPlans').textContent = String(closedPlans);
      if ($('adminKpiAlerts')) $('adminKpiAlerts').textContent = String(openAlerts);
      if ($('adminKpiFacilitadores')) $('adminKpiFacilitadores').textContent = String(activeFacilitadores);
      if ($('adminCountAlumnos')) $('adminCountAlumnos').textContent = String(visibleAlumnos);
      if ($('adminCountPlaneaciones')) $('adminCountPlaneaciones').textContent = String(Number(state.dashboardStats && state.dashboardStats.planeaciones_visibles || 0) || state.planeaciones.length || 0);
      if ($('adminCountNotifications')) $('adminCountNotifications').textContent = String(
        (Array.isArray(state.notificaciones) && state.notificaciones.length
          ? (state.notificaciones || []).filter((row) => isNotificationActiveToday(row)).length
          : Number(state.dashboardStats && state.dashboardStats.notificaciones_activas || 0)) || 0
      );
      if ($('adminCountFacilitadoresCard')) $('adminCountFacilitadoresCard').textContent = String(activeFacilitadores);
      if ($('adminCountMaterias')) $('adminCountMaterias').textContent = String(activeMaterias);
      if ($('adminCountTalleres')) $('adminCountTalleres').textContent = String(activeTalleres);
      if ($('adminCountReportes')) $('adminCountReportes').textContent = getReportStatusLabel(getReportSelectionState().lastResult && (getReportSelectionState().lastResult.status || getReportSelectionState().lastResult.estado) || 'PDF');

      document.querySelectorAll('.admin-nav-btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.adminModule === state.activeAdminModule);
      });
      document.querySelectorAll('.admin-panel').forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === 'admin-panel-' + state.activeAdminModule);
      });
    }

    function getTodayYmdLocal() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    function getNotificationAudienceIds(notification) {
      if (Array.isArray(notification && notification.facilitadores_ids_array)) {
        return notification.facilitadores_ids_array.filter(Boolean);
      }
      const raw = String(notification && notification.facilitadores_ids || '').trim();
      return raw ? raw.split(',').map((item) => String(item).trim()).filter(Boolean) : [];
    }

    function isNotificationActiveToday(notification) {
      const status = String(notification && notification.estatus || '').trim();
      if (status !== 'publicada') return false;
      const today = getTodayYmdLocal();
      const start = toYmdFrontend_(notification && notification.fecha_inicio || '');
      const end = toYmdFrontend_(notification && notification.fecha_cierre || '');
      if (start && today < start) return false;
      if (end && today > end) return false;
      return true;
    }

    function formatNotificationVigencia(notification) {
      const start = toYmdFrontend_(notification && notification.fecha_inicio || '');
      const end = toYmdFrontend_(notification && notification.fecha_cierre || '');
      if (start && end) return formatFechaHumana(start) + ' al ' + formatFechaHumana(end);
      if (start) return 'Desde ' + formatFechaHumana(start);
      if (end) return 'Hasta ' + formatFechaHumana(end);
      return 'Sin cierre definido';
    }

    function formatNotificationAudience(notification) {
      const visiblePara = String(notification && notification.visible_para || 'todos').trim();
      if (visiblePara !== 'especificos') return 'Todos los facilitadores';
      const ids = getNotificationAudienceIds(notification);
      const names = ids.map((id) => {
        const row = (state.catalogos.facilitadores || []).find((item) => item.facilitador_id === id);
        return row ? (row.nombre_mostrado || row.nombre_completo || row.facilitador_id) : id;
      }).filter(Boolean);
      return names.length ? names.join(', ') : 'Facilitadores especÃ­ficos';
    }

    function setNotificationEditorExpanded(next) {
      if (state.ui) state.ui.notificationEditorExpanded = !!next;
    }

    function resetNotificationEditor() {
      state.notificationEditor = createEmptyNotificationEditorState();
      setNotificationEditorExpanded(false);
    }

    function openNotificationEditor(notification) {
      const source = notification || createEmptyNotificationEditorState();
      state.notificationEditor = {
        notificacion_id: source.notificacion_id || '',
        titulo: source.titulo || '',
        mensaje: source.mensaje || '',
        prioridad: source.prioridad || 'normal',
        fecha_inicio: toYmdFrontend_(source.fecha_inicio || ''),
        fecha_cierre: toYmdFrontend_(source.fecha_cierre || ''),
        visible_para: source.visible_para || 'todos',
        facilitadores_ids: getNotificationAudienceIds(source),
        estatus: source.estatus || 'borrador'
      };
      setNotificationEditorExpanded(true);
      renderNotificationsAdmin();
    }

    function getFilteredAdminNotifications() {
      const filter = (state.ui && state.ui.notificationFilter) || 'activas';
      const rows = Array.isArray(state.notificaciones) ? state.notificaciones : [];
      if (filter === 'programadas') {
        const today = getTodayYmdLocal();
        return rows.filter((row) => {
          const status = String(row && row.estatus || '').trim();
          const start = toYmdFrontend_(row && row.fecha_inicio || '');
          return status === 'publicada' && !!start && start > today;
        });
      }
      if (filter === 'borradores') {
        return rows.filter((row) => ['borrador', 'archivada'].includes(String(row.estatus || '').trim()));
      }
      if (filter === 'cerradas') {
        return rows.filter((row) => String(row.estatus || '').trim() === 'cerrada');
      }
      return rows.filter((row) => isNotificationActiveToday(row));
    }

    function getNotificationFilterTitle() {
      const filter = (state.ui && state.ui.notificationFilter) || 'activas';
      if (filter === 'programadas') return 'Notificaciones programadas';
      if (filter === 'borradores') return 'Borradores y archivadas';
      if (filter === 'cerradas') return 'Notificaciones cerradas';
      return 'Notificaciones activas';
    }

    function getNotificationStatusLabel(status) {
      const value = String(status || '').trim();
      if (value === 'publicada') return 'Publicada';
      if (value === 'borrador') return 'Borrador';
      if (value === 'cerrada') return 'Cerrada';
      if (value === 'archivada') return 'Archivada';
      return value || 'Sin estado';
    }

    function getNotificationRelativeUpdateLabel(value) {
      const ymd = toYmdFrontend_(value);
      if (!ymd) return 'Sin registro';
      const today = new Date(getTodayYmdLocal() + 'T12:00:00');
      const target = new Date(ymd + 'T12:00:00');
      const diff = Math.round((today.getTime() - target.getTime()) / 86400000);
      if (diff <= 0) return 'Hoy';
      if (diff === 1) return 'Ayer';
      return 'Hace ' + diff + ' dÃ­as';
    }

    function getNotificationActionMessage(action, status) {
      if (action === 'publicarNotificacion') return 'NotificaciÃ³n publicada.';
      if (action === 'despublicarNotificacion') return 'La notificaciÃ³n volviÃ³ a borrador.';
      if (action === 'cerrarNotificacion') return 'NotificaciÃ³n cerrada.';
      if (action === 'archivarNotificacion') return 'NotificaciÃ³n archivada.';
      if (action === 'duplicarNotificacion') return 'Se creÃ³ una copia en borrador.';
      if (status === 'publicada') return 'NotificaciÃ³n publicada.';
      if (status === 'borrador') return 'Borrador guardado.';
      return 'NotificaciÃ³n actualizada.';
    }

    function getNotificationBusyText(action) {
      if (action === 'publicarNotificacion') return 'Publicando...';
      if (action === 'despublicarNotificacion') return 'Guardando...';
      if (action === 'cerrarNotificacion') return 'Cerrando...';
      if (action === 'archivarNotificacion') return 'Archivando...';
      if (action === 'duplicarNotificacion') return 'Duplicando...';
      return 'Guardando...';
    }

    function renderNotificationAudienceChecklist() {
      const host = $('adminNotificationAudienceList');
      if (!host) return;
      const show = String(state.notificationEditor.visible_para || 'todos') === 'especificos';
      host.hidden = !show;
      if (!show) {
        host.innerHTML = '';
        return;
      }
      const selected = new Set(state.notificationEditor.facilitadores_ids || []);
      const facilitadores = (state.catalogos.facilitadores || []).filter((item) => isTruthyValue(item.activo));
      host.innerHTML = facilitadores.map((row) => {
        const label = row.nombre_mostrado || row.nombre_completo || row.facilitador_id;
        return '<label class="check-item">' +
          '<input type="checkbox" value="' + escapeHtml(row.facilitador_id) + '"' + (selected.has(row.facilitador_id) ? ' checked' : '') + ' onchange="toggleNotificationAudienceFacilitador(\'' + escapeJsAttrValue(row.facilitador_id) + '\', this.checked)">' +
          '<span><strong>' + escapeHtml(label) + '</strong><br><span class="mini">' + escapeHtml(row.facilitador_id) + '</span></span>' +
        '</label>';
      }).join('') || '<div class="empty">No hay facilitadores activos disponibles.</div>';
    }

    function renderNotificationsAdmin() {
      const panel = $('admin-panel-notificaciones');
      if (!panel || !canUseAdminShell()) return;
      const activeBtn = $('adminNotificationFilterActiveBtn');
      const scheduledBtn = $('adminNotificationFilterScheduledBtn');
      const draftBtn = $('adminNotificationFilterDraftBtn');
      const closedBtn = $('adminNotificationFilterClosedBtn');
      const editor = $('adminNotificationEditor');
      const editorTitle = $('adminNotificationEditorTitle');
      const listTitle = $('adminNotificationListTitle');
      const title = $('adminNotificationTitle');
      const message = $('adminNotificationMessage');
      const priority = $('adminNotificationPriority');
      const start = $('adminNotificationStart');
      const end = $('adminNotificationEnd');
      const audience = $('adminNotificationAudience');
      const list = $('adminNotificationsList');
      const feedback = $('adminNotificationFeedback');
      if (editor) editor.hidden = !(state.ui && state.ui.notificationEditorExpanded);
      if (title) title.value = state.notificationEditor.titulo || '';
      if (message) message.value = state.notificationEditor.mensaje || '';
      if (priority) priority.value = state.notificationEditor.prioridad || 'normal';
      if (start) start.value = state.notificationEditor.fecha_inicio || '';
      if (end) end.value = state.notificationEditor.fecha_cierre || '';
      if (audience) audience.value = state.notificationEditor.visible_para || 'todos';
      if (editorTitle) editorTitle.textContent = state.notificationEditor.notificacion_id ? 'Editar notificaciÃ³n' : 'Nueva notificaciÃ³n';
      if (listTitle) listTitle.textContent = getNotificationFilterTitle();
      const filter = (state.ui && state.ui.notificationFilter) || 'activas';
      if (activeBtn) activeBtn.classList.toggle('is-active', filter === 'activas');
      if (scheduledBtn) scheduledBtn.classList.toggle('is-active', filter === 'programadas');
      if (draftBtn) draftBtn.classList.toggle('is-active', filter === 'borradores');
      if (closedBtn) closedBtn.classList.toggle('is-active', filter === 'cerradas');
      renderNotificationAudienceChecklist();
      if (feedback) feedback.textContent = '';
      if (!list) return;
      const rows = getFilteredAdminNotifications();
      if (!rows.length) {
        list.innerHTML = '<div class="empty">TodavÃ­a no hay notificaciones en esta vista.</div>';
        return;
      }
      list.innerHTML = '<div class="admin-notification-list-table">' +
        '<div class="admin-notification-list-header">' +
          '<div>TÃ­tulo</div>' +
          '<div>Estado</div>' +
          '<div>Vigencia</div>' +
          '<div>Prioridad</div>' +
          '<div>Audiencia</div>' +
          '<div>Ãšltima actualizaciÃ³n</div>' +
          '<div>Acciones</div>' +
        '</div>' +
        rows.map((row) => {
        const high = String(row.prioridad || '').trim() === 'alta';
        const status = String(row.estatus || '').trim();
        const actions = [];
        if (status === 'borrador') {
          actions.push('<button class="btn-ghost" type="button" onclick="editNotification(\'' + escapeJsAttrValue(row.notificacion_id) + '\')">Editar</button>');
          actions.push('<button class="btn-primary" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'publicarNotificacion\')">Publicar</button>');
          actions.push('<button class="btn-ghost" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'archivarNotificacion\')">Archivar</button>');
        } else if (status === 'publicada') {
          actions.push('<button class="btn-ghost" type="button" onclick="editNotification(\'' + escapeJsAttrValue(row.notificacion_id) + '\')">Editar</button>');
          actions.push('<button class="btn-secondary" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'despublicarNotificacion\')">Despublicar</button>');
          actions.push('<button class="btn-accent" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'cerrarNotificacion\')">Cerrar</button>');
        } else if (status === 'cerrada') {
          actions.push('<button class="btn-ghost" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'duplicarNotificacion\')">Duplicar</button>');
          actions.push('<button class="btn-ghost" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'archivarNotificacion\')">Archivar</button>');
        } else if (status === 'archivada') {
          actions.push('<button class="btn-ghost" type="button" onclick="notificationAction(this, \'' + escapeJsAttrValue(row.notificacion_id) + '\', \'duplicarNotificacion\')">Duplicar</button>');
        }
        return '<article class="admin-notification-row' + (high ? ' is-high' : '') + '">' +
          '<div class="admin-notification-title">' +
            '<strong>' + escapeHtml(row.titulo || 'Sin tÃ­tulo') + '</strong>' +
            '<div class="admin-notification-message mini">' + escapeHtml(row.mensaje || '') + '</div>' +
          '</div>' +
          '<div class="admin-notification-meta-stack">' +
            '<span class="notice-chip ' + escapeHtml(status) + '">' + escapeHtml(getNotificationStatusLabel(status)) + '</span>' +
          '</div>' +
          '<div class="admin-notification-cell">' +
            '<div class="mini">' + escapeHtml(formatNotificationVigencia(row)) + '</div>' +
          '</div>' +
          '<div class="admin-notification-meta-stack">' +
            '<span class="notice-chip' + (high ? ' high' : '') + '">' + escapeHtml(high ? 'Alta' : 'Normal') + '</span>' +
          '</div>' +
          '<div class="admin-notification-cell">' +
            '<div class="mini">' + escapeHtml(formatNotificationAudience(row)) + '</div>' +
          '</div>' +
          '<div class="admin-notification-cell">' +
            '<div class="mini">' + escapeHtml(getNotificationRelativeUpdateLabel(row.fecha_actualizacion || row.fecha_creacion || '')) + '</div>' +
          '</div>' +
          '<div class="admin-notification-actions">' +
            actions.join('') +
          '</div>' +
        '</article>';
      }).join('') +
      '</div>';
    }

    function renderInstitutionalNotices() {
      const card = $('institutionalNoticesCard');
      const host = $('institutionalNoticesList');
      if (!card || !host) return;
      const facilitatorMode = getCurrentRole() === 'facilitador';
      const rows = facilitatorMode ? (state.notificaciones || []) : [];
      card.hidden = !facilitatorMode || !rows.length;
      if (card.hidden) {
        host.innerHTML = '';
        return;
      }
      host.innerHTML = rows.map((row) => {
        const high = String(row.prioridad || '').trim() === 'alta';
        return '<article class="institutional-notice-card' + (high ? ' is-high' : '') + '">' +
          '<div class="institutional-notice-top">' +
            '<div><h3>' + escapeHtml(row.titulo || 'Aviso institucional') + '</h3></div>' +
            '<div class="institutional-notice-meta"><span class="notice-chip' + (high ? ' high' : '') + '">' + escapeHtml(high ? 'Alta' : 'Normal') + '</span></div>' +
          '</div>' +
          '<div class="institutional-notice-message">' + escapeHtml(row.mensaje || '') + '</div>' +
          '<div class="mini">Vigencia: ' + escapeHtml(formatNotificationVigencia(row)) + '</div>' +
        '</article>';
      }).join('');
    }

    function setNotificationFilter(filter) {
      if (state.ui) state.ui.notificationFilter = filter || 'activas';
      renderNotificationsAdmin();
    }

    function updateNotificationEditorField(field, value) {
      if (!state.notificationEditor) state.notificationEditor = createEmptyNotificationEditorState();
      state.notificationEditor[field] = value;
      if (field === 'visible_para') {
        if (value !== 'especificos') state.notificationEditor.facilitadores_ids = [];
        renderNotificationsAdmin();
      }
    }

    function toggleNotificationAudienceFacilitador(facilitadorId, checked) {
      const selected = new Set(state.notificationEditor.facilitadores_ids || []);
      if (checked) selected.add(facilitadorId);
      else selected.delete(facilitadorId);
      state.notificationEditor.facilitadores_ids = Array.from(selected);
    }

    function editNotification(notificationId) {
      const row = (state.notificaciones || []).find((item) => item.notificacion_id === notificationId);
      if (!row) return;
      openNotificationEditor(row);
    }

    function buildNotificationPayload(statusOverride) {
      return {
        notificacion_id: state.notificationEditor.notificacion_id || '',
        titulo: String(state.notificationEditor.titulo || '').trim(),
        mensaje: String(state.notificationEditor.mensaje || '').trim(),
        prioridad: state.notificationEditor.prioridad || 'normal',
        fecha_inicio: state.notificationEditor.fecha_inicio || '',
        fecha_cierre: state.notificationEditor.fecha_cierre || '',
        visible_para: state.notificationEditor.visible_para || 'todos',
        facilitadores_ids: state.notificationEditor.visible_para === 'especificos' ? (state.notificationEditor.facilitadores_ids || []) : [],
        estatus: statusOverride || state.notificationEditor.estatus || 'borrador',
        request_id: uid('NOTI')
      };
    }

    async function saveNotificationEditor(button, targetStatus) {
      ensureLoggedIn();
      const wantsPublish = targetStatus === 'publicada';
      const isEditing = !!(state.notificationEditor && state.notificationEditor.notificacion_id);
      await handleAction(wantsPublish ? 'publicarNotificacion' : 'guardarNotificacion', async () => {
        if (wantsPublish) {
          const saveStatus = state.notificationEditor.notificacion_id
            ? (state.notificationEditor.estatus || 'borrador')
            : 'borrador';
          const saved = await api('guardarNotificacion', buildNotificationPayload(saveStatus));
          const notificationId = (saved && saved.notificacion_id) || state.notificationEditor.notificacion_id || '';
          if (!notificationId) throw new Error('No se pudo preparar la notificaciÃ³n para publicar.');
          await api('publicarNotificacion', {
            notificacion_id: notificationId,
            request_id: uid('NOTIP')
          });
        } else {
          await api('guardarNotificacion', buildNotificationPayload(targetStatus || 'borrador'));
        }
        if (state.ui) state.ui.notificationFilter = 'activas';
        resetNotificationEditor();
        await refreshAdminModuleSurface('notificaciones', {
          refreshCatalogos: false,
          refreshNotificaciones: true,
          includeStats: false
        });
        setBanner(
          targetStatus === 'publicada'
            ? (isEditing ? 'NotificaciÃ³n actualizada y publicada.' : 'NotificaciÃ³n publicada.')
            : (isEditing ? 'Cambios del borrador guardados.' : 'Borrador guardado. Puedes verlo en Ver borradores / archivadas.'),
          'success'
        );
      }, {
        button,
        busyText: button ? button.textContent : (targetStatus === 'publicada' ? 'Publicar' : 'Guardar borrador'),
        key: buildActionKey('guardarNotificacion', [state.notificationEditor.notificacion_id || 'new', targetStatus || 'borrador'])
      });
    }

    async function notificationAction(button, notificationId, action) {
      ensureLoggedIn();
      await handleAction(action, async () => {
        await api(action, { notificacion_id: notificationId, request_id: uid('NOTIA') });
        if (state.notificationEditor.notificacion_id === notificationId) {
          resetNotificationEditor();
        }
        if (state.ui) state.ui.notificationFilter = 'activas';
        await refreshAdminModuleSurface('notificaciones', {
          refreshCatalogos: false,
          refreshNotificaciones: true,
          includeStats: false
        });
        return;
      }, { button, busyText: button ? button.textContent : getNotificationBusyText(action), key: buildActionKey(action, [notificationId]) });
    }

    function splitAlumnoNombreCompleto(fullName) {
      const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
      if (!parts.length) return { nombres: '', apellidos: '' };
      if (parts.length === 1) return { nombres: parts[0], apellidos: '' };
      if (parts.length === 2) return { nombres: parts[0], apellidos: parts[1] };
      return {
        nombres: parts.slice(0, parts.length - 2).join(' '),
        apellidos: parts.slice(-2).join(' ')
      };
    }

    function composeAlumnoNombreCompleto(nombres, apellidos) {
      return [String(nombres || '').trim(), String(apellidos || '').trim()].filter(Boolean).join(' ').trim();
    }

    function buildAlumnoAliasSuggestion(nombres, fullName) {
      const tokens = String(nombres || fullName || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2);
      return tokens.join(' ').trim();
    }

    function composeAlumnoNombreMostrado(nombres, alias, fullName) {
      return String(alias || '').trim() || buildAlumnoAliasSuggestion(nombres, fullName) || String(fullName || '').trim();
    }

    function syncAlumnoAliasSuggestion(options = {}) {
      const editor = state.alumnosUi && state.alumnosUi.editor ? state.alumnosUi.editor : null;
      if (!editor) return;
      const force = !!options.force;
      const nextAlias = buildAlumnoAliasSuggestion(editor.nombres, composeAlumnoNombreCompleto(editor.nombres, editor.apellidos));
      if (force || !editor.aliasTouched || !String(editor.alias || '').trim()) {
        editor.alias = nextAlias;
        const aliasInput = $('adminAlumnoAlias');
        if (aliasInput && aliasInput.value !== nextAlias) aliasInput.value = nextAlias;
      }
    }

    function getGrupoDisplayName(group) {
      if (!group) return '';
      return String(group.nombre_grupo || group.grupo_id || '').trim() || String(group.grupo_id || '').trim();
    }

    function getGrupoById(grupoId) {
      return getCatalogIndex().gruposById.get(String(grupoId || '').trim()) || null;
    }

    function getMateriaById(materiaId) {
      return getCatalogIndex().materiasById.get(String(materiaId || '').trim()) || null;
    }

    function getGrupoNombre(grupoId) {
      if (!grupoId) return 'Sin grupo';
      const row = getGrupoById(grupoId);
      return row ? getGrupoDisplayName(row) : grupoId;
    }

    function getAlumnoStatusVisual(row) {
      const status = String(row && row.estatus || '').trim().toLowerCase();
      if (row && row.__archived) return 'archivado';
      if (status === 'pausa') return 'pausa';
      if (status === 'inactivo') return 'inactivo';
      if (status === 'egresado') return 'egresado';
      if (status === 'baja') return 'archivado';
      return 'activo';
    }

    function getAlumnoStatusLabel(status) {
      if (status === 'pausa') return 'Pausa';
      if (status === 'inactivo') return 'Inactivo';
      if (status === 'egresado') return 'Egresado';
      if (status === 'archivado') return 'Archivado';
      return 'Activo';
    }

    function getAlumnoStatusBadgeClass(status) {
      if (status === 'pausa') return 'is-paused';
      if (status === 'inactivo') return 'is-inactive';
      if (status === 'egresado') return 'is-graduated';
      if (status === 'archivado') return 'is-archived';
      return 'is-active';
    }

    function getAlumnoStatusSortWeight(status) {
      if (status === 'activo') return 0;
      if (status === 'pausa') return 1;
      if (status === 'inactivo') return 2;
      if (status === 'egresado') return 3;
      return 4;
    }

    function getAlumnoAdminNotes(alumnoId, fallback) {
      const notes = state.alumnosUi && state.alumnosUi.notesByAlumno ? state.alumnosUi.notesByAlumno : {};
      if (Object.prototype.hasOwnProperty.call(notes, alumnoId)) return notes[alumnoId] || '';
      return String(fallback || '').trim();
    }

    function normalizeAlumnoRowForAdmin(row, source) {
      const normalized = Object.assign({}, row || {});
      normalized.alumno_id = String(normalized.alumno_id || '').trim();
      normalized.matricula = String(normalized.matricula || '').trim();
      normalized.nombre_completo = String(normalized.nombre_completo || '').trim();
      normalized.nombre_mostrado = String(normalized.nombre_mostrado || '').trim();
      normalized.grupo_id = String(normalized.grupo_id || '').trim();
      normalized.estatus = String(normalized.estatus || 'activo').trim().toLowerCase();
      normalized.fecha_alta = toYmdFrontend_(normalized.fecha_alta || '');
      normalized.fecha_baja = toYmdFrontend_(normalized.fecha_baja || '');
      normalized.archivado_at = normalized.archivado_at || '';
      normalized.archivado_por = normalized.archivado_por || '';
      normalized.notas_internas = getAlumnoAdminNotes(normalized.alumno_id, normalized.notas_internas || '');
      normalized.__source = source || normalized.__source || 'catalogo';
      normalized.__archived = !!normalized.__archived;
      return normalized;
    }

    function buildAlumnoSourceRows() {
      const signature = [
        getCatalogosRevision(),
        getAlumnosSourceRevision()
      ].join(':');
      if (alumnoSourceMemo.signature === signature) {
        return alumnoSourceMemo.rows;
      }
      const catalogRows = Array.isArray(state.catalogos.alumnos) ? state.catalogos.alumnos : [];
      const shadowRows = Object.values((state.alumnosUi && state.alumnosUi.archivedShadow) || {});
      const mockRows = Array.isArray(state.alumnosUi && state.alumnosUi.mockRows) ? state.alumnosUi.mockRows : [];
      const byId = new Map();
      catalogRows.forEach((row) => {
        const normalized = normalizeAlumnoRowForAdmin(row, 'catalogo');
        if (normalized.alumno_id) byId.set(normalized.alumno_id, normalized);
      });
      shadowRows.forEach((row) => {
        const normalized = normalizeAlumnoRowForAdmin(Object.assign({}, row, { __archived: true }), 'shadow');
        if (normalized.alumno_id) byId.set(normalized.alumno_id, normalized);
      });
      mockRows.forEach((row) => {
        const normalized = normalizeAlumnoRowForAdmin(row, 'mock');
        if (normalized.alumno_id && !byId.has(normalized.alumno_id)) byId.set(normalized.alumno_id, normalized);
      });
      const rows = Array.from(byId.values());
      alumnoSourceMemo.signature = signature;
      alumnoSourceMemo.rows = rows;
      alumnoSourceMemo.byId = byId;
      return rows;
    }

    function getAlumnoById(alumnoId) {
      const id = String(alumnoId || '').trim();
      if (!id) return null;
      buildAlumnoSourceRows();
      return alumnoSourceMemo.byId.get(id) || null;
    }

    function upsertCatalogEntityRow(collectionKey, idField, row, options = {}) {
      if (!state.catalogos || !collectionKey || !idField || !row || !row[idField]) return null;
      if (!Array.isArray(state.catalogos[collectionKey])) state.catalogos[collectionKey] = [];
      const rows = state.catalogos[collectionKey];
      const id = String(row[idField] || '').trim();
      const index = rows.findIndex((item) => String((item && item[idField]) || '').trim() === id);
      if (index === -1) {
        if (options.append) rows.push(row);
        else rows.unshift(row);
        bumpCatalogosRevision();
        return row;
      }
      rows.splice(index, 1, Object.assign({}, rows[index], row));
      bumpCatalogosRevision();
      return rows[index];
    }

    function applySavedAlumnoCatalogRow(row) {
      return upsertCatalogEntityRow('alumnos', 'alumno_id', row);
    }

    function applyPatchedAlumnoCatalogRow(alumnoId, patch = {}) {
      const current = getAlumnoById(alumnoId);
      if (!current) return null;
      return applySavedAlumnoCatalogRow(Object.assign({}, current, patch));
    }

    function pushAlumnoHistory(alumnoId, tipo, titulo, detalle, fecha) {
      const id = String(alumnoId || '').trim();
      if (!id) return;
      if (!state.alumnosUi.historyByAlumno[id]) state.alumnosUi.historyByAlumno[id] = [];
      state.alumnosUi.historyByAlumno[id].unshift({
        entry_id: uid('ALUH'),
        tipo: tipo || 'evento',
        titulo: titulo || 'Movimiento',
        detalle: detalle || '',
        fecha: fecha || new Date().toISOString()
      });
      state.alumnosUi.historyByAlumno[id] = state.alumnosUi.historyByAlumno[id].slice(0, 24);
    }

    function seedAlumnoHistory(alumno) {
      const rows = [];
      if (!alumno) return rows;
      if (alumno.fecha_alta) {
        rows.push({
          entry_id: 'seed-alta-' + alumno.alumno_id,
          tipo: 'alta',
          titulo: 'Alta de alumno',
          detalle: 'Registro inicial del alumno en el catÃ¡logo.',
          fecha: alumno.fecha_alta
        });
      }
      if (alumno.__archived && (alumno.archivado_at || alumno.fecha_baja)) {
        rows.push({
          entry_id: 'seed-archivado-' + alumno.alumno_id,
          tipo: 'archivado',
          titulo: 'Alumno archivado',
          detalle: 'Se marcÃ³ como archivado dentro del catÃ¡logo escolar.',
          fecha: alumno.archivado_at || alumno.fecha_baja
        });
      }
      const visualStatus = getAlumnoStatusVisual(alumno);
      if (visualStatus === 'pausa') {
        rows.push({
          entry_id: 'seed-pausa-' + alumno.alumno_id,
          tipo: 'pausa',
          titulo: 'Alumno en pausa',
          detalle: 'El alumno quedÃ³ en pausa dentro del catÃ¡logo.',
          fecha: alumno.fecha_baja || alumno.fecha_alta || ''
        });
      }
      if (visualStatus === 'inactivo') {
        rows.push({
          entry_id: 'seed-inactivo-' + alumno.alumno_id,
          tipo: 'inactivo',
          titulo: 'Alumno inactivo',
          detalle: 'El alumno quedÃ³ marcado como inactivo en el catÃ¡logo.',
          fecha: alumno.fecha_baja || alumno.fecha_alta || ''
        });
      }
      if (visualStatus === 'egresado') {
        rows.push({
          entry_id: 'seed-egresado-' + alumno.alumno_id,
          tipo: 'egresado',
          titulo: 'Alumno egresado',
          detalle: 'El alumno quedÃ³ registrado como egresado.',
          fecha: alumno.fecha_baja || alumno.fecha_alta || ''
        });
      }
      return rows;
    }

    function getAlumnoHistorial(alumnoId) {
      const alumno = getAlumnoById(alumnoId);
      const seeded = seedAlumnoHistory(alumno);
      const remoteLoaded = !!(state.alumnosUi.remoteHistoryLoadedByAlumno && state.alumnosUi.remoteHistoryLoadedByAlumno[String(alumnoId || '').trim()]);
      const remoteRows = Array.isArray(state.alumnosUi.remoteHistoryByAlumno[String(alumnoId || '').trim()])
        ? state.alumnosUi.remoteHistoryByAlumno[String(alumnoId || '').trim()]
        : [];
      const localRows = Array.isArray(state.alumnosUi.historyByAlumno[String(alumnoId || '').trim()])
        ? state.alumnosUi.historyByAlumno[String(alumnoId || '').trim()]
        : [];
      if (remoteLoaded) {
        return remoteRows.slice().sort((a, b) => new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime());
      }
      return seeded
        .concat(localRows)
        .sort((a, b) => new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime());
    }

    function getFilteredAlumnos() {
      const rows = buildAlumnoSourceRows();
      const filter = String(state.alumnosUi.filter || 'activos').trim();
      const groupFilter = String(state.alumnosUi.grupo || '').trim();
      const query = String(state.alumnosUi.search || '').trim().toLowerCase();
      return rows
        .filter((row) => {
          const visualStatus = getAlumnoStatusVisual(row);
          if (filter === 'activos' && visualStatus !== 'activo') return false;
          if (filter === 'pausa' && visualStatus !== 'pausa') return false;
          if (filter === 'inactivos' && visualStatus !== 'inactivo') return false;
          if (filter === 'egresados' && visualStatus !== 'egresado') return false;
          if (filter === 'archivados' && visualStatus !== 'archivado') return false;
          if (groupFilter && String(row.grupo_id || '').trim() !== groupFilter) return false;
          if (!query) return true;
          const haystack = [row.matricula, row.alumno_id, row.nombre_completo, row.nombre_mostrado].join(' ').toLowerCase();
          return haystack.includes(query);
        })
        .sort((a, b) => {
          const visualA = getAlumnoStatusSortWeight(getAlumnoStatusVisual(a));
          const visualB = getAlumnoStatusSortWeight(getAlumnoStatusVisual(b));
          if (visualA !== visualB) return visualA - visualB;
          return String(a.nombre_completo || a.nombre_mostrado || a.alumno_id).localeCompare(String(b.nombre_completo || b.nombre_mostrado || b.alumno_id), 'es');
        });
    }

    function getVisibleAlumnos() {
      return getFilteredAlumnos();
    }

    function getAdminAlumnosCount() {
      return buildAlumnoSourceRows().length;
    }

    function getAlumnoListTitle() {
      const filter = String(state.alumnosUi.filter || 'activos').trim();
      if (filter === 'todos') return 'Todos los alumnos';
      if (filter === 'pausa') return 'Alumnos en pausa';
      if (filter === 'inactivos') return 'Alumnos inactivos';
      if (filter === 'egresados') return 'Alumnos egresados';
      if (filter === 'archivados') return 'Alumnos archivados';
      return 'Alumnos activos';
    }

    function formatAlumnoUpdatedLabel(alumno) {
      const latest = alumno
        ? (alumno.fecha_actualizacion || alumno.archivado_at || alumno.fecha_alta || '')
        : '';
      if (!latest) return 'Sin registro';
      return getNotificationRelativeUpdateLabel(latest);
    }

    function closeAlumnoEditor() {
      state.alumnosUi.editorOpen = false;
      state.alumnosUi.editorMode = 'new';
      state.alumnosUi.selectedAlumnoId = '';
      state.alumnosUi.editor = createEmptyAlumnoEditorState();
    }

    function closeCambioGrupo() {
      state.alumnosUi.cambioGrupoOpen = false;
      state.alumnosUi.cambioGrupo = createEmptyAlumnoCambioState();
    }

    function closeAlumnoHistorial() {
      state.alumnosUi.historialOpen = false;
      state.alumnosUi.historialAlumnoId = '';
    }

    function invalidateAlumnoHistorialCache(alumnoId) {
      const id = String(alumnoId || '').trim();
      if (!id || !state.alumnosUi) return;
      delete state.alumnosUi.remoteHistoryByAlumno[id];
      delete state.alumnosUi.remoteHistoryLoadedByAlumno[id];
      delete state.alumnosUi.remoteHistoryFailedByAlumno[id];
    }

    async function loadAlumnoHistorialRemoto(alumnoId) {
      const id = String(alumnoId || '').trim();
      if (!id || !canUseAdminShell()) return;
      try {
        const response = await api('getHistorialAlumno', { alumno_id: id });
        const remoteRows = Array.isArray(response && response.historial) ? response.historial : [];
        state.alumnosUi.remoteHistoryByAlumno[id] = remoteRows.map((row, index) => ({
          entry_id: String(row.entry_id || ('remote-' + id + '-' + index)),
          tipo: String(row.tipo || 'evento'),
          titulo: String(row.titulo || 'Movimiento'),
          detalle: String(row.detalle || ''),
          fecha: row.fecha || ''
        }));
        state.alumnosUi.remoteHistoryLoadedByAlumno[id] = true;
        state.alumnosUi.remoteHistoryFailedByAlumno[id] = false;
      } catch (error) {
        state.alumnosUi.remoteHistoryFailedByAlumno[id] = true;
        console.warn('No se pudo cargar historial remoto de alumno:', error);
      }
      if (state.alumnosUi.historialOpen && state.alumnosUi.historialAlumnoId === id) {
        renderAlumnoHistorial();
      }
    }

    function syncAdminAlumnosModule() {
      if (!canUseAdminShell()) return;
      if (state.activeAdminModule !== 'alumnos') {
        closeAlumnoEditor();
        closeCambioGrupo();
        closeAlumnoHistorial();
      }
    }

    function openAlumnoEditor(mode, alumnoId) {
      const alumno = mode === 'edit' ? getAlumnoById(alumnoId) : null;
      const split = splitAlumnoNombreCompleto(alumno ? alumno.nombre_completo : '');
      state.alumnosUi.editorMode = mode === 'edit' ? 'edit' : 'new';
      state.alumnosUi.selectedAlumnoId = alumno ? alumno.alumno_id : '';
      state.alumnosUi.editor = alumno ? {
        alumno_id: alumno.alumno_id,
        matricula: alumno.matricula || '',
        nombres: split.nombres || alumno.nombre_mostrado || '',
        alias: alumno.nombre_mostrado || '',
        aliasTouched: !!String(alumno.nombre_mostrado || '').trim(),
        apellidos: split.apellidos || '',
        grupo_id: alumno.grupo_id || '',
        estatus: alumno.estatus || 'activo',
        notas_internas: getAlumnoAdminNotes(alumno.alumno_id, alumno.notas_internas || '')
      } : createEmptyAlumnoEditorState();
      if (!alumno) syncAlumnoAliasSuggestion({ force: true });
      state.alumnosUi.editorOpen = true;
      closeCambioGrupo();
      closeAlumnoHistorial();
      renderAdminAlumnosModule();
    }

    async function saveAlumnoEditor(button) {
      ensureLoggedIn();
      const editor = state.alumnosUi.editor || createEmptyAlumnoEditorState();
      const fullName = composeAlumnoNombreCompleto(editor.nombres, editor.apellidos);
      if (!String(editor.matricula || '').trim()) throw new Error('Captura la matrÃ­cula del alumno.');
      if (!fullName) throw new Error('Captura el nombre del alumno.');
      if (!String(editor.grupo_id || '').trim()) throw new Error('Selecciona el grupo actual.');
      const editing = state.alumnosUi.editorMode === 'edit';
      const existingId = editing ? state.alumnosUi.selectedAlumnoId : '';
      const existingAlumno = editing ? getAlumnoById(existingId) : null;
      const previousStatus = existingAlumno ? getAlumnoStatusVisual(existingAlumno) : 'activo';
      const nextStatus = getAlumnoStatusVisual({ estatus: String(editor.estatus || 'activo').trim() });
      if (editing && previousStatus === 'activo' && nextStatus === 'pausa' && !confirm('El alumno pasarÃ¡ a pausa y seguirÃ¡ visible dentro del catÃ¡logo administrativo.')) return;
      await handleAction('guardarAlumno', async () => {
        const payload = {
          alumno_id: existingId,
          matricula: String(editor.matricula || '').trim(),
          nombre_completo: fullName,
          nombre_mostrado: composeAlumnoNombreMostrado(editor.nombres, editor.alias, fullName),
          grupo_id: String(editor.grupo_id || '').trim(),
          estatus: String(editor.estatus || 'activo').trim()
        };
        const response = await api('guardarAlumno', payload);
        const savedId = (response && response.alumno_id) || existingId || '';
        const savedAlumno = response && response.alumno ? response.alumno : null;
        if (savedId) {
          state.alumnosUi.notesByAlumno[savedId] = String(editor.notas_internas || '').trim();
          bumpAlumnosSourceRevision();
          if (savedAlumno) applySavedAlumnoCatalogRow(savedAlumno);
          pushAlumnoHistory(
            savedId,
            editing ? 'edicion' : 'alta',
            editing ? 'Ficha actualizada' : 'Alta de alumno',
            editing ? 'Se actualizaron datos principales de la ficha.' : 'Se agregÃ³ un nuevo alumno al catÃ¡logo.',
            new Date().toISOString()
          );
          invalidateAlumnoHistorialCache(savedId);
        }
        closeAlumnoEditor();
        renderAdminModuleSurface('alumnos');
        setBanner(editing ? 'Ficha actualizada.' : 'Alumno creado.', 'success');
      }, {
        button,
        key: buildActionKey('guardarAlumno', [existingId || editor.matricula, editor.grupo_id]),
        busyText: button ? button.textContent : 'Guardar'
      });
    }

    function openCambioGrupo(alumnoId) {
      const alumno = getAlumnoById(alumnoId);
      if (!alumno) return;
      state.alumnosUi.cambioGrupoOpen = true;
      state.alumnosUi.cambioGrupo = {
        alumno_id: alumno.alumno_id,
        nuevo_grupo_id: '',
        motivo: ''
      };
      closeAlumnoEditor();
      closeAlumnoHistorial();
      renderAdminAlumnosModule();
    }

    async function updateAlumnoStatus(alumnoId, nextStatus, button, options) {
      ensureLoggedIn();
      const alumno = getAlumnoById(alumnoId);
      if (!alumno) throw new Error('No se encontrÃ³ el alumno seleccionado.');
      const currentStatus = getAlumnoStatusVisual(alumno);
      const targetStatus = String(nextStatus || '').trim().toLowerCase();
      const meta = Object.assign({
        confirmText: '',
        actionKey: 'guardarAlumno:estatus',
        historyType: targetStatus || 'estado',
        historyTitle: 'Estado actualizado',
        historyDetail: 'Se actualizÃ³ el estatus del alumno.',
        successMessage: 'Estatus actualizado.'
      }, options || {});
      if (meta.confirmText && !confirm(meta.confirmText)) return;
      await handleAction(meta.actionKey, async () => {
        await api('guardarAlumno', {
          alumno_id: alumno.alumno_id,
          matricula: alumno.matricula,
          nombre_completo: alumno.nombre_completo,
          nombre_mostrado: alumno.nombre_mostrado || alumno.nombre_completo,
          grupo_id: alumno.grupo_id,
          estatus: targetStatus
        });
        applyPatchedAlumnoCatalogRow(alumno.alumno_id, {
          estatus: targetStatus,
          fecha_baja: targetStatus === 'activo' ? '' : (alumno.fecha_baja || ''),
          archivado_at: targetStatus === 'activo' ? '' : (alumno.archivado_at || ''),
          archivado_por: targetStatus === 'activo' ? '' : (alumno.archivado_por || '')
        });
        if (currentStatus === 'archivado' && targetStatus !== 'baja') {
          delete state.alumnosUi.archivedShadow[alumno.alumno_id];
          bumpAlumnosSourceRevision();
        }
        if (targetStatus === 'baja') {
          state.alumnosUi.archivedShadow[alumno.alumno_id] = Object.assign({}, alumno, {
            estatus: 'baja',
            __archived: true,
            fecha_baja: getTodayYmdLocal(),
            archivado_at: new Date().toISOString()
          });
          bumpAlumnosSourceRevision();
        }
        pushAlumnoHistory(alumno.alumno_id, meta.historyType, meta.historyTitle, meta.historyDetail, new Date().toISOString());
        invalidateAlumnoHistorialCache(alumno.alumno_id);
        if (state.alumnosUi.selectedAlumnoId === alumno.alumno_id) closeAlumnoEditor();
        renderAdminModuleSurface('alumnos');
        setBanner(meta.successMessage, 'success');
      }, { button, key: buildActionKey(meta.actionKey, [alumno.alumno_id, targetStatus]), busyText: button ? button.textContent : meta.historyTitle });
    }

    function pauseAlumno(alumnoId, button) {
      return updateAlumnoStatus(alumnoId, 'pausa', button, {
        confirmText: 'El alumno quedarÃ¡ en pausa y seguirÃ¡ visible dentro del catÃ¡logo administrativo.',
        actionKey: 'guardarAlumno:pausa',
        historyType: 'pausa',
        historyTitle: 'Alumno en pausa',
        historyDetail: 'Se pausÃ³ temporalmente al alumno dentro del catÃ¡logo.',
        successMessage: 'Alumno en pausa.'
      });
    }

    async function confirmCambioGrupo(button) {
      ensureLoggedIn();
      const cambio = state.alumnosUi.cambioGrupo || createEmptyAlumnoCambioState();
      const alumno = getAlumnoById(cambio.alumno_id);
      if (!alumno) throw new Error('No se encontrÃ³ el alumno seleccionado.');
      if (!String(cambio.nuevo_grupo_id || '').trim()) throw new Error('Selecciona el nuevo grupo.');
      if (String(cambio.nuevo_grupo_id || '').trim() === String(alumno.grupo_id || '').trim()) {
        throw new Error('Selecciona un grupo diferente al actual.');
      }
      await handleAction('guardarAlumno:cambioGrupo', async () => {
        await api('guardarAlumno', {
          alumno_id: alumno.alumno_id,
          matricula: alumno.matricula,
          nombre_completo: alumno.nombre_completo,
          nombre_mostrado: alumno.nombre_mostrado || alumno.nombre_completo,
          grupo_id: cambio.nuevo_grupo_id,
          estatus: alumno.estatus || 'activo',
          motivo: String(cambio.motivo || '').trim()
        });
        applyPatchedAlumnoCatalogRow(alumno.alumno_id, {
          grupo_id: cambio.nuevo_grupo_id
        });
        pushAlumnoHistory(
          alumno.alumno_id,
          'grupo',
          'Cambio de grupo',
          'De ' + getGrupoNombre(alumno.grupo_id) + ' a ' + getGrupoNombre(cambio.nuevo_grupo_id) + (String(cambio.motivo || '').trim() ? ' Â· ' + String(cambio.motivo || '').trim() : ''),
          new Date().toISOString()
        );
        invalidateAlumnoHistorialCache(alumno.alumno_id);
        closeCambioGrupo();
        renderAdminModuleSurface('alumnos');
        setBanner('Grupo actualizado.', 'success');
      }, {
        button,
        key: buildActionKey('guardarAlumno:cambioGrupo', [alumno.alumno_id, cambio.nuevo_grupo_id]),
        busyText: button ? button.textContent : 'Confirmar cambio'
      });
    }

    async function archiveAlumno(alumnoId, button) {
      ensureLoggedIn();
      const alumno = getAlumnoById(alumnoId);
      if (alumno && getAlumnoStatusVisual(alumno) === 'activo') {
        throw new Error('Primero pausa o cambia el estatus del alumno antes de archivarlo.');
      }
      if (!alumno) throw new Error('No se encontrÃ³ el alumno seleccionado.');
      if (!confirm('El alumno pasarÃ¡ a archivados y saldrÃ¡ de las vistas activas.')) return;
      await handleAction('archivarAlumno', async () => {
        await api('archivarAlumno', { alumno_id: alumno.alumno_id });
        const archivedAt = new Date().toISOString();
        applyPatchedAlumnoCatalogRow(alumno.alumno_id, {
          estatus: 'baja',
          fecha_baja: getTodayYmdLocal(),
          archivado_at: archivedAt,
          archivado_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || '')
        });
        state.alumnosUi.archivedShadow[alumno.alumno_id] = Object.assign({}, alumno, {
          estatus: 'baja',
          __archived: true,
          fecha_baja: getTodayYmdLocal(),
          archivado_at: archivedAt
        });
        bumpAlumnosSourceRevision();
        pushAlumnoHistory(alumno.alumno_id, 'archivado', 'Alumno archivado', 'Se retirÃ³ del listado activo del catÃ¡logo.', new Date().toISOString());
        invalidateAlumnoHistorialCache(alumno.alumno_id);
        if (state.alumnosUi.selectedAlumnoId === alumno.alumno_id) closeAlumnoEditor();
        closeCambioGrupo();
        renderAdminModuleSurface('alumnos');
        setBanner('Alumno archivado.', 'success');
      }, { button, key: buildActionKey('archivarAlumno', [alumno.alumno_id]), busyText: button ? button.textContent : 'Archivar' });
    }

    async function reactivateAlumno(alumnoId, button) {
      ensureLoggedIn();
      const alumno = getAlumnoById(alumnoId);
      if (!alumno) throw new Error('No se encontrÃ³ el alumno seleccionado.');
      if (!String(alumno.grupo_id || '').trim()) {
        openCambioGrupo(alumnoId);
        setBanner('Selecciona primero un grupo para reactivar al alumno.', 'info');
        return;
      }
      return updateAlumnoStatus(alumnoId, 'activo', button, {
        confirmText: 'El alumno volverÃ¡ al catÃ¡logo activo.',
        actionKey: 'reactivarAlumno',
        historyType: 'reactivado',
        historyTitle: 'Alumno reactivado',
        historyDetail: 'Se devolviÃ³ al alumno al catÃ¡logo activo.',
        successMessage: 'Alumno reactivado.'
      });
    }

    function openAlumnoHistorial(alumnoId) {
      const alumno = getAlumnoById(alumnoId);
      if (!alumno) return;
      state.alumnosUi.historialOpen = true;
      state.alumnosUi.historialAlumnoId = alumno.alumno_id;
      closeAlumnoEditor();
      closeCambioGrupo();
      renderAdminAlumnosModule();
      loadAlumnoHistorialRemoto(alumno.alumno_id);
    }

    function buildAlumnoQuickActionsMarkup(alumno) {
      if (!alumno) return '';
      const visualStatus = getAlumnoStatusVisual(alumno);
      const buttons = [
        '<button class="btn-ghost" type="button" onclick="openAlumnoHistorial(\'' + escapeJsAttrValue(alumno.alumno_id) + '\')">Ver historial</button>'
      ];
      if (visualStatus === 'activo') {
        buttons.unshift('<button class="btn-secondary" type="button" onclick="openCambioGrupo(\'' + escapeJsAttrValue(alumno.alumno_id) + '\')">Cambiar grupo</button>');
        buttons.push('<button class="btn-accent" type="button" onclick="pauseAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this)">Pausar</button>');
      } else if (visualStatus === 'pausa' || visualStatus === 'inactivo') {
        buttons.unshift('<button class="btn-primary" type="button" onclick="reactivateAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this)">Reactivar</button>');
        buttons.push('<button class="btn-accent" type="button" onclick="archiveAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this)">Archivar</button>');
      } else if (visualStatus === 'egresado') {
        buttons.push('<button class="btn-accent" type="button" onclick="archiveAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this)">Archivar</button>');
      } else {
        buttons.unshift('<button class="btn-primary" type="button" onclick="reactivateAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this)">Reactivar</button>');
      }
      return buttons.join('');
    }

    function renderAlumnoEditor() {
      const editorHost = $('adminAlumnoEditor');
      if (!editorHost) return;
      editorHost.hidden = !state.alumnosUi.editorOpen;
      if (editorHost.hidden) return;
      const selectedAlumno = state.alumnosUi.editorMode === 'edit'
        ? getAlumnoById(state.alumnosUi.selectedAlumnoId)
        : null;
      if ($('adminAlumnoEditorTitle')) $('adminAlumnoEditorTitle').textContent = state.alumnosUi.editorMode === 'edit' ? 'Editar ficha' : 'Nuevo alumno';
      if ($('adminAlumnoMatricula')) $('adminAlumnoMatricula').value = state.alumnosUi.editor.matricula || '';
      if ($('adminAlumnoNombres')) $('adminAlumnoNombres').value = state.alumnosUi.editor.nombres || '';
      if ($('adminAlumnoAlias')) $('adminAlumnoAlias').value = state.alumnosUi.editor.alias || '';
      if ($('adminAlumnoApellidos')) $('adminAlumnoApellidos').value = state.alumnosUi.editor.apellidos || '';
      if ($('adminAlumnoStatus')) $('adminAlumnoStatus').value = state.alumnosUi.editor.estatus || 'activo';
      if ($('adminAlumnoNotas')) $('adminAlumnoNotas').value = state.alumnosUi.editor.notas_internas || '';
      fillSelect($('adminAlumnoGrupo'), state.catalogos.grupos || [], (row) => row.grupo_id, (row) => getGrupoDisplayName(row), 'Selecciona grupo');
      if ($('adminAlumnoGrupo')) $('adminAlumnoGrupo').value = state.alumnosUi.editor.grupo_id || '';
      if ($('adminAlumnoQuickActions')) {
        $('adminAlumnoQuickActions').hidden = !selectedAlumno;
        $('adminAlumnoQuickActions').innerHTML = selectedAlumno ? buildAlumnoQuickActionsMarkup(selectedAlumno) : '';
      }
    }

    function renderAlumnoCambioGrupo() {
      const panel = $('adminAlumnoCambioGrupo');
      if (!panel) return;
      panel.hidden = !state.alumnosUi.cambioGrupoOpen;
      if (panel.hidden) return;
      const alumno = getAlumnoById(state.alumnosUi.cambioGrupo.alumno_id);
      if ($('adminAlumnoCambioMatricula')) $('adminAlumnoCambioMatricula').textContent = alumno ? (alumno.matricula || alumno.alumno_id) : '-';
      if ($('adminAlumnoCambioNombre')) $('adminAlumnoCambioNombre').textContent = alumno ? (alumno.nombre_completo || alumno.nombre_mostrado || alumno.alumno_id) : '-';
      if ($('adminAlumnoCambioGrupoActual')) $('adminAlumnoCambioGrupoActual').textContent = alumno ? getGrupoNombre(alumno.grupo_id) : '-';
      fillSelect($('adminAlumnoCambioGrupoNuevo'), state.catalogos.grupos || [], (row) => row.grupo_id, (row) => getGrupoDisplayName(row), 'Selecciona grupo');
      if ($('adminAlumnoCambioGrupoNuevo')) $('adminAlumnoCambioGrupoNuevo').value = state.alumnosUi.cambioGrupo.nuevo_grupo_id || '';
      if ($('adminAlumnoCambioMotivo')) $('adminAlumnoCambioMotivo').value = state.alumnosUi.cambioGrupo.motivo || '';
    }

    function renderAlumnoHistorial() {
      const panel = $('adminAlumnoHistorial');
      const host = $('adminAlumnoHistorialList');
      if (!panel || !host) return;
      panel.hidden = !state.alumnosUi.historialOpen;
      if (panel.hidden) return;
      const alumnoId = String(state.alumnosUi.historialAlumnoId || '').trim();
      const alumno = getAlumnoById(state.alumnosUi.historialAlumnoId);
      const remoteLoaded = !!(state.alumnosUi.remoteHistoryLoadedByAlumno && state.alumnosUi.remoteHistoryLoadedByAlumno[alumnoId]);
      const remoteFailed = !!(state.alumnosUi.remoteHistoryFailedByAlumno && state.alumnosUi.remoteHistoryFailedByAlumno[alumnoId]);
      if ($('adminAlumnoHistorialLabel')) {
        $('adminAlumnoHistorialLabel').textContent = alumno
          ? ((alumno.nombre_completo || alumno.nombre_mostrado || alumno.alumno_id) + ' Â· ' + (alumno.matricula || alumno.alumno_id))
          : 'Seguimiento del alumno.';
      }
      const historyFoot = $('adminAlumnoHistorial') ? $('adminAlumnoHistorial').querySelector('.admin-alumnos-history-foot') : null;
      if (historyFoot) {
        if (remoteLoaded) {
          historyFoot.textContent = 'Historial cargado desde backend.';
        } else if (remoteFailed) {
          historyFoot.textContent = 'Mostrando respaldo local porque el historial remoto no estuvo disponible.';
        } else {
          historyFoot.textContent = 'Cargando historial desde backend...';
        }
      }
      const rows = getAlumnoHistorial(state.alumnosUi.historialAlumnoId);
      if (!rows.length) {
        host.innerHTML = '<div class="admin-alumnos-empty">TodavÃ­a no hay movimientos registrados para este alumno.</div>';
        return;
      }
      host.innerHTML = rows.map((row) => {
        const ymd = toYmdFrontend_(row.fecha || '');
        return '<article class="admin-alumnos-history-item">' +
          '<strong>' + escapeHtml(row.titulo || 'Movimiento') + '</strong>' +
          '<div class="mini">' + escapeHtml(row.detalle || '') + '</div>' +
          '<div class="mini">' + escapeHtml(ymd ? formatFechaHumana(ymd) : 'Sin fecha') + '</div>' +
        '</article>';
      }).join('');
    }

    function renderAdminAlumnosList() {
      const host = $('adminAlumnosList');
      if (!host) return;
      const rows = getVisibleAlumnos();
      if ($('adminAlumnosListTitle')) $('adminAlumnosListTitle').textContent = getAlumnoListTitle();
      if ($('adminAlumnosListMeta')) $('adminAlumnosListMeta').textContent = rows.length ? (rows.length + ' alumno(s) visibles en esta vista.') : 'No hay resultados con los filtros actuales.';
      if (!rows.length) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>No hay alumnos para mostrar.</strong><br><span class="subtle">Ajusta los filtros o crea un nuevo registro.</span></div></div>';
        return;
      }
      host.innerHTML = '<div class="admin-alumnos-table">' +
        '<div class="admin-alumnos-list-header">' +
          '<div>Matr&iacute;cula</div>' +
          '<div>Alumno</div>' +
          '<div>Grupo actual</div>' +
          '<div>Estado</div>' +
          '<div>Alta</div>' +
          '<div>&Uacute;ltima actualizaci&oacute;n</div>' +
          '<div>Acciones</div>' +
        '</div>' +
        rows.map((row) => {
          const visualStatus = getAlumnoStatusVisual(row);
          const actions = [
            '<button class="btn-ghost" type="button" onclick="openAlumnoEditor(\'edit\', \'' + escapeJsAttrValue(row.alumno_id) + '\')">Editar</button>'
          ];
          return '<article class="admin-alumnos-row">' +
            '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(row.matricula || row.alumno_id) + '</div></div>' +
            '<div class="admin-alumnos-title"><button class="admin-alumnos-title-btn" type="button" onclick="openAlumnoHistorial(\'' + escapeJsAttrValue(row.alumno_id) + '\')">' + escapeHtml(row.nombre_completo || row.nombre_mostrado || row.alumno_id) + '</button></div>' +
            '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(getGrupoNombre(row.grupo_id)) + '</div></div>' +
            '<div class="admin-alumnos-cell"><span class="admin-alumnos-badge ' + getAlumnoStatusBadgeClass(visualStatus) + '">' + escapeHtml(getAlumnoStatusLabel(visualStatus)) + '</span></div>' +
            '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(row.fecha_alta ? formatFechaHumana(row.fecha_alta) : 'Sin fecha') + '</div></div>' +
            '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(formatAlumnoUpdatedLabel(row)) + '</div></div>' +
            '<div class="admin-alumnos-actions">' + actions.join('') + '</div>' +
          '</article>';
        }).join('') +
      '</div>';
    }

    function getAdminAlumnosModuleTemplate() {
      return [
        '<article class="admin-toolbar admin-alumnos-module">',
          '<div class="admin-toolbar-head admin-alumnos-head">',
            '<div class="admin-alumnos-head-copy">',
              '<h3>CatÃ¡logo de alumnos</h3>',
              '<p class="subtle">Administra altas, ediciÃ³n, cambios de grupo y estatus del catÃ¡logo escolar.</p>',
            '</div>',
            '<div class="admin-alumnos-head-actions">',
              '<label class="admin-alumnos-search" for="adminAlumnosSearch">',
                '<span>Buscar</span>',
                '<input id="adminAlumnosSearch" type="search" placeholder="Buscar por matrÃ­cula o nombre">',
              '</label>',
              '<button id="adminAlumnoNewBtn" class="btn-primary" type="button">Nuevo alumno</button>',
            '</div>',
          '</div>',
          '<div class="admin-alumnos-filterbar">',
            '<div class="admin-alumnos-filterchips">',
              '<button id="adminAlumnosFilterAllBtn" class="btn-ghost" type="button">Todos</button>',
              '<button id="adminAlumnosFilterActiveBtn" class="btn-ghost" type="button">Activos</button>',
              '<button id="adminAlumnosFilterPauseBtn" class="btn-ghost" type="button">Pausa</button>',
              '<button id="adminAlumnosFilterInactiveBtn" class="btn-ghost" type="button">Inactivos</button>',
              '<button id="adminAlumnosFilterGraduatedBtn" class="btn-ghost" type="button">Egresados</button>',
              '<button id="adminAlumnosFilterArchivedBtn" class="btn-ghost" type="button">Archivados</button>',
            '</div>',
            '<label class="admin-alumnos-group-filter" for="adminAlumnosGroupFilter">',
              '<span>Grupo</span>',
              '<select id="adminAlumnosGroupFilter"></select>',
            '</label>',
          '</div>',
          '<div class="admin-alumnos-layout">',
            '<section class="admin-alumnos-main">',
              '<div class="admin-alumnos-section-head">',
                '<div>',
                  '<h4 id="adminAlumnosListTitle">Alumnos activos</h4>',
                  '<div id="adminAlumnosListMeta" class="subtle">Listado del catÃ¡logo escolar.</div>',
                '</div>',
              '</div>',
              '<div id="adminAlumnosList" class="admin-alumnos-list"></div>',
            '</section>',
            '<aside class="admin-alumnos-side">',
              '<section id="adminAlumnoEditor" class="admin-alumnos-panel" hidden>',
                '<div class="admin-alumnos-panel-head">',
                  '<div>',
                    '<h4 id="adminAlumnoEditorTitle">Nuevo alumno</h4>',
                    '<div class="subtle">Completa la ficha principal del alumno.</div>',
                  '</div>',
                '</div>',
                '<div id="adminAlumnoQuickActions" class="actions compact admin-alumnos-panel-actions" hidden></div>',
                '<div class="admin-alumnos-editor-grid">',
                  '<label class="field">',
                    '<span>MatrÃ­cula</span>',
                    '<input id="adminAlumnoMatricula" type="text" maxlength="50" placeholder="Ej. A-1024">',
                  '</label>',
                  '<label class="field">',
                    '<span>Grupo actual</span>',
                    '<select id="adminAlumnoGrupo"></select>',
                  '</label>',
                  '<label class="field">',
                    '<span>Nombre(s)</span>',
                    '<input id="adminAlumnoNombres" type="text" maxlength="100" placeholder="Nombre(s)">',
                  '</label>',
                  '<label class="field">',
                    '<span>Alias visible</span>',
                    '<input id="adminAlumnoAlias" type="text" maxlength="100" placeholder="Se sugiere con primer y segundo nombre">',
                  '</label>',
                  '<label class="field">',
                    '<span>Apellidos</span>',
                    '<input id="adminAlumnoApellidos" type="text" maxlength="100" placeholder="Apellidos">',
                  '</label>',
                  '<label class="field">',
                    '<span>Estatus</span>',
                    '<select id="adminAlumnoStatus">',
                      '<option value="activo">Activo</option>',
                      '<option value="pausa">Pausa</option>',
                      '<option value="inactivo">Inactivo</option>',
                      '<option value="egresado">Egresado</option>',
                    '</select>',
                  '</label>',
                  '<label class="field admin-alumnos-field-full">',
                    '<span>ObservaciÃ³n administrativa</span>',
                    '<textarea id="adminAlumnoNotas" rows="4" placeholder="Notas internas para administraciÃ³n"></textarea>',
                  '</label>',
                '</div>',
                '<div class="actions compact admin-alumnos-panel-actions">',
                  '<button id="adminAlumnoCancelBtn" class="btn-ghost" type="button">Cancelar</button>',
                  '<button id="adminAlumnoSaveBtn" class="btn-primary" type="button">Guardar</button>',
                '</div>',
              '</section>',
              '<section id="adminAlumnoCambioGrupo" class="admin-alumnos-panel" hidden>',
                '<div class="admin-alumnos-panel-head">',
                  '<div>',
                    '<h4>Cambiar grupo</h4>',
                    '<div class="subtle">Actualiza el grupo del alumno con un motivo opcional.</div>',
                  '</div>',
                '</div>',
                '<div class="admin-alumnos-mini-grid">',
                  '<div class="admin-alumnos-readonly">',
                    '<span>MatrÃ­cula</span>',
                    '<strong id="adminAlumnoCambioMatricula">-</strong>',
                  '</div>',
                  '<div class="admin-alumnos-readonly">',
                    '<span>Alumno</span>',
                    '<strong id="adminAlumnoCambioNombre">-</strong>',
                  '</div>',
                  '<div class="admin-alumnos-readonly">',
                    '<span>Grupo actual</span>',
                    '<strong id="adminAlumnoCambioGrupoActual">-</strong>',
                  '</div>',
                  '<label class="field">',
                    '<span>Nuevo grupo</span>',
                    '<select id="adminAlumnoCambioGrupoNuevo"></select>',
                  '</label>',
                  '<label class="field admin-alumnos-field-full">',
                    '<span>Motivo opcional</span>',
                    '<textarea id="adminAlumnoCambioMotivo" rows="3" placeholder="Motivo del cambio"></textarea>',
                  '</label>',
                '</div>',
                '<div class="actions compact admin-alumnos-panel-actions">',
                  '<button id="adminAlumnoCambioCancelBtn" class="btn-ghost" type="button">Cancelar</button>',
                  '<button id="adminAlumnoCambioConfirmBtn" class="btn-primary" type="button">Confirmar cambio</button>',
                '</div>',
              '</section>',
              '<section id="adminAlumnoHistorial" class="admin-alumnos-panel" hidden>',
                '<div class="admin-alumnos-panel-head">',
                  '<div>',
                    '<h4>Historial del alumno</h4>',
                    '<div id="adminAlumnoHistorialLabel" class="subtle">Seguimiento del alumno.</div>',
                  '</div>',
                '</div>',
                '<div id="adminAlumnoHistorialList" class="admin-alumnos-history"></div>',
                '<div class="admin-alumnos-history-foot subtle">Espacio preparado para acceso futuro al reporte de ciclo.</div>',
                '<div class="actions compact admin-alumnos-panel-actions">',
                  '<button id="adminAlumnoHistorialCloseBtn" class="btn-ghost" type="button">Cerrar</button>',
                '</div>',
              '</section>',
            '</aside>',
          '</div>',
        '</article>'
      ].join('');
    }

    function renderAdminAlumnosModule() {
      const panel = $('admin-panel-alumnos');
      if (!panel || !canUseAdminShell()) return;
      if (panel.dataset.ready !== '1') {
        panel.innerHTML = getAdminAlumnosModuleTemplate();
        panel.dataset.ready = '1';
        bindAdminAlumnosEvents();
      }
      syncAdminAlumnosModule();
      const filter = String(state.alumnosUi.filter || 'activos').trim();
      if ($('adminAlumnosSearch')) $('adminAlumnosSearch').value = state.alumnosUi.search || '';
      fillSelect($('adminAlumnosGroupFilter'), state.catalogos.grupos || [], (row) => row.grupo_id, (row) => getGrupoDisplayName(row), 'Todos los grupos');
      if ($('adminAlumnosGroupFilter')) $('adminAlumnosGroupFilter').value = state.alumnosUi.grupo || '';
      if ($('adminAlumnosFilterAllBtn')) $('adminAlumnosFilterAllBtn').classList.toggle('is-active', filter === 'todos');
      if ($('adminAlumnosFilterActiveBtn')) $('adminAlumnosFilterActiveBtn').classList.toggle('is-active', filter === 'activos');
      if ($('adminAlumnosFilterPauseBtn')) $('adminAlumnosFilterPauseBtn').classList.toggle('is-active', filter === 'pausa');
      if ($('adminAlumnosFilterInactiveBtn')) $('adminAlumnosFilterInactiveBtn').classList.toggle('is-active', filter === 'inactivos');
      if ($('adminAlumnosFilterGraduatedBtn')) $('adminAlumnosFilterGraduatedBtn').classList.toggle('is-active', filter === 'egresados');
      if ($('adminAlumnosFilterArchivedBtn')) $('adminAlumnosFilterArchivedBtn').classList.toggle('is-active', filter === 'archivados');
      const headTitle = panel.querySelector('.admin-alumnos-head-copy h3');
      if (headTitle) headTitle.textContent = 'Cat\u00e1logo de alumnos';
      const headSubtitle = panel.querySelector('.admin-alumnos-head-copy .subtle');
      if (headSubtitle) headSubtitle.textContent = 'Administra altas, edici\u00f3n, cambios de grupo y estatus del cat\u00e1logo escolar.';
      if ($('adminAlumnosSearch')) $('adminAlumnosSearch').placeholder = 'Buscar por matr\u00edcula o nombre';
      const historyTitle = $('adminAlumnoHistorial') ? $('adminAlumnoHistorial').querySelector('h4') : null;
      if (historyTitle) historyTitle.textContent = 'Historial administrativo reciente';
      const historyFoot = $('adminAlumnoHistorial') ? $('adminAlumnoHistorial').querySelector('.admin-alumnos-history-foot') : null;
      if (historyFoot) historyFoot.textContent = 'El historial se mostrar\u00e1 desde backend cuando est\u00e9 disponible.';
      const matriculaLabel = $('adminAlumnoMatricula') ? $('adminAlumnoMatricula').closest('label').querySelector('span') : null;
      if (matriculaLabel) matriculaLabel.textContent = 'Matr\u00edcula';
      const notasLabel = $('adminAlumnoNotas') ? $('adminAlumnoNotas').closest('label').querySelector('span') : null;
      if (notasLabel) notasLabel.textContent = 'Observaci\u00f3n administrativa';
      if ($('adminAlumnoNotas')) $('adminAlumnoNotas').placeholder = 'Notas internas para administraci\u00f3n';
      const cambioMatriculaLabel = $('adminAlumnoCambioMatricula') ? $('adminAlumnoCambioMatricula').closest('.admin-alumnos-readonly').querySelector('span') : null;
      if (cambioMatriculaLabel) cambioMatriculaLabel.textContent = 'Matr\u00edcula';
      renderAdminAlumnosList();
      renderAlumnoEditor();
      renderAlumnoCambioGrupo();
      renderAlumnoHistorial();
    }

    function bindAdminAlumnosEvents() {
      if ($('adminAlumnosSearch')) $('adminAlumnosSearch').addEventListener('input', (event) => {
        state.alumnosUi.search = event.currentTarget.value;
        scheduleUiDebounce('admin-alumnos-search', () => renderAdminAlumnosModule());
      });
      if ($('adminAlumnosGroupFilter')) $('adminAlumnosGroupFilter').addEventListener('change', (event) => {
        state.alumnosUi.grupo = event.currentTarget.value;
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnosFilterAllBtn')) $('adminAlumnosFilterAllBtn').addEventListener('click', () => {
        state.alumnosUi.filter = 'todos';
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnosFilterActiveBtn')) $('adminAlumnosFilterActiveBtn').addEventListener('click', () => {
        state.alumnosUi.filter = 'activos';
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnosFilterPauseBtn')) $('adminAlumnosFilterPauseBtn').addEventListener('click', () => {
        state.alumnosUi.filter = 'pausa';
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnosFilterInactiveBtn')) $('adminAlumnosFilterInactiveBtn').addEventListener('click', () => {
        state.alumnosUi.filter = 'inactivos';
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnosFilterGraduatedBtn')) $('adminAlumnosFilterGraduatedBtn').addEventListener('click', () => {
        state.alumnosUi.filter = 'egresados';
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnosFilterArchivedBtn')) $('adminAlumnosFilterArchivedBtn').addEventListener('click', () => {
        state.alumnosUi.filter = 'archivados';
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnoNewBtn')) $('adminAlumnoNewBtn').addEventListener('click', () => openAlumnoEditor('new'));
      if ($('adminAlumnoMatricula')) $('adminAlumnoMatricula').addEventListener('input', (event) => { state.alumnosUi.editor.matricula = event.currentTarget.value; });
      if ($('adminAlumnoNombres')) $('adminAlumnoNombres').addEventListener('input', (event) => {
        state.alumnosUi.editor.nombres = event.currentTarget.value;
        syncAlumnoAliasSuggestion();
      });
      if ($('adminAlumnoAlias')) $('adminAlumnoAlias').addEventListener('input', (event) => {
        state.alumnosUi.editor.alias = event.currentTarget.value;
        state.alumnosUi.editor.aliasTouched = String(event.currentTarget.value || '').trim().length > 0;
      });
      if ($('adminAlumnoApellidos')) $('adminAlumnoApellidos').addEventListener('input', (event) => { state.alumnosUi.editor.apellidos = event.currentTarget.value; });
      if ($('adminAlumnoGrupo')) $('adminAlumnoGrupo').addEventListener('change', (event) => { state.alumnosUi.editor.grupo_id = event.currentTarget.value; });
      if ($('adminAlumnoStatus')) $('adminAlumnoStatus').addEventListener('change', (event) => { state.alumnosUi.editor.estatus = event.currentTarget.value; });
      if ($('adminAlumnoNotas')) $('adminAlumnoNotas').addEventListener('input', (event) => { state.alumnosUi.editor.notas_internas = event.currentTarget.value; });
      if ($('adminAlumnoCancelBtn')) $('adminAlumnoCancelBtn').addEventListener('click', () => {
        closeAlumnoEditor();
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnoSaveBtn')) $('adminAlumnoSaveBtn').addEventListener('click', (event) => saveAlumnoEditor(event.currentTarget));
      if ($('adminAlumnoCambioGrupoNuevo')) $('adminAlumnoCambioGrupoNuevo').addEventListener('change', (event) => { state.alumnosUi.cambioGrupo.nuevo_grupo_id = event.currentTarget.value; });
      if ($('adminAlumnoCambioMotivo')) $('adminAlumnoCambioMotivo').addEventListener('input', (event) => { state.alumnosUi.cambioGrupo.motivo = event.currentTarget.value; });
      if ($('adminAlumnoCambioCancelBtn')) $('adminAlumnoCambioCancelBtn').addEventListener('click', () => {
        closeCambioGrupo();
        renderAdminAlumnosModule();
      });
      if ($('adminAlumnoCambioConfirmBtn')) $('adminAlumnoCambioConfirmBtn').addEventListener('click', (event) => confirmCambioGrupo(event.currentTarget));
      if ($('adminAlumnoHistorialCloseBtn')) $('adminAlumnoHistorialCloseBtn').addEventListener('click', () => {
        closeAlumnoHistorial();
        renderAdminAlumnosModule();
      });
    }

    function canManageFacilitadoresCatalog() {
      return getCurrentRole() === 'admin';
    }

    function getAdminFacilitadoresCatalog() {
      const rows = Array.isArray(state.catalogos.facilitadores_admin) && state.catalogos.facilitadores_admin.length
        ? state.catalogos.facilitadores_admin
        : (state.catalogos.facilitadores || []);
      return rows.map((row) => ({
        facilitador_id: String(row.facilitador_id || '').trim(),
        nombre_completo: String(row.nombre_completo || '').trim(),
        nombre_mostrado: String(row.nombre_mostrado || '').trim(),
        color_ui: String(row.color_ui || '').trim(),
        activo: isTruthyValue(row.activo),
        rol: String(row.rol || 'facilitador').trim(),
        fecha_alta: toYmdFrontend_(row.fecha_alta || ''),
        fecha_baja: toYmdFrontend_(row.fecha_baja || ''),
        archivado_at: String(row.archivado_at || '').trim(),
        archivado_por: String(row.archivado_por || '').trim()
      }));
    }

    function getFacilitadorById(facilitadorId) {
      const id = String(facilitadorId || '').trim();
      return getAdminFacilitadoresCatalog().find((row) => row.facilitador_id === id) || null;
    }

    function applySavedFacilitadorCatalogRow(row) {
      if (!row || !row.facilitador_id) return null;
      upsertCatalogEntityRow('facilitadores_admin', 'facilitador_id', row);
      upsertCatalogEntityRow('facilitadores', 'facilitador_id', row);
      return getFacilitadorById(row.facilitador_id);
    }

    function applyPatchedFacilitadorCatalogRow(facilitadorId, patch = {}) {
      const current = getFacilitadorById(facilitadorId);
      if (!current) return null;
      return applySavedFacilitadorCatalogRow(Object.assign({}, current, patch));
    }

    function applySavedFacilitadorAsignacionCatalogRow(row) {
      if (!row || !row.asignacion_id) return null;
      const normalized = Object.assign({}, row, {
        asignacion_id: String(row.asignacion_id || '').trim(),
        facilitador_id: String(row.facilitador_id || '').trim(),
        grupo_id: String(row.grupo_id || '').trim(),
        materia_id: String(row.materia_id || '').trim(),
        activa: row.activa === undefined ? true : row.activa,
        fecha_inicio: toYmdFrontend_(row.fecha_inicio || ''),
        fecha_fin: toYmdFrontend_(row.fecha_fin || ''),
        archivado_at: String(row.archivado_at || row.archivada_at || '').trim(),
        archivada_at: String(row.archivada_at || row.archivado_at || '').trim(),
        archivado_por: String(row.archivado_por || row.archivada_por || '').trim(),
        archivada_por: String(row.archivada_por || row.archivado_por || '').trim()
      });
      return upsertCatalogEntityRow('facilitador_asignaciones', 'asignacion_id', normalized);
    }

    function getFacilitadorVisualStatus(row) {
      if (!row) return 'inactivo';
      if (String(row.archivado_at || '').trim()) return 'archivado';
      return row.activo ? 'activo' : 'inactivo';
    }

    function getFacilitadorStatusLabel(status) {
      if (status === 'archivado') return 'Archivado';
      if (status === 'inactivo') return 'Inactivo';
      return 'Activo';
    }

    function getFacilitadorStatusBadgeClass(status) {
      if (status === 'archivado') return 'is-archived';
      if (status === 'inactivo') return 'is-inactive';
      return 'is-active';
    }

    function getFacilitadorStatusSortWeight(status) {
      if (status === 'activo') return 0;
      if (status === 'inactivo') return 1;
      return 2;
    }

    function getFacilitadorAsignaciones(facilitadorId, options = {}) {
      const includeArchived = !!options.includeArchived;
      return (Array.isArray(state.catalogos.facilitador_asignaciones) ? state.catalogos.facilitador_asignaciones : [])
        .filter((row) => String(row.facilitador_id || '').trim() === String(facilitadorId || '').trim())
        .filter((row) => includeArchived || !String(row.archivado_at || '').trim())
        .map((row) => ({
          asignacion_id: String(row.asignacion_id || '').trim(),
          facilitador_id: String(row.facilitador_id || '').trim(),
          grupo_id: String(row.grupo_id || '').trim(),
          materia_id: String(row.materia_id || '').trim(),
          activa: isTruthyValue(row.activa),
          fecha_inicio: toYmdFrontend_(row.fecha_inicio || ''),
          fecha_fin: toYmdFrontend_(row.fecha_fin || ''),
          fecha_creacion: row.fecha_creacion || '',
          fecha_actualizacion: row.fecha_actualizacion || '',
          archivado_at: String(row.archivado_at || '').trim(),
          archivado_por: String(row.archivado_por || '').trim()
        }))
        .sort((a, b) => {
          const materiaA = ((state.catalogos.materias || []).find((item) => item.materia_id === a.materia_id) || {}).nombre || a.materia_id;
          const materiaB = ((state.catalogos.materias || []).find((item) => item.materia_id === b.materia_id) || {}).nombre || b.materia_id;
          const labelA = getGrupoNombre(a.grupo_id) + ' ' + materiaA;
          const labelB = getGrupoNombre(b.grupo_id) + ' ' + materiaB;
          return String(labelA || '').localeCompare(String(labelB || ''), 'es');
        });
    }

    function getFacilitadorSearchText(row) {
      return [
        row.facilitador_id,
        row.nombre_completo,
        row.nombre_mostrado,
        row.rol
      ].join(' ').toLowerCase();
    }

    function getFilteredFacilitadores() {
      const filter = String(state.facilitadoresUi.filter || 'activos').trim();
      const query = String(state.facilitadoresUi.search || '').trim().toLowerCase();
      return getAdminFacilitadoresCatalog()
        .filter((row) => {
          const visualStatus = getFacilitadorVisualStatus(row);
          if (filter === 'activos' && visualStatus !== 'activo') return false;
          if (filter === 'inactivos' && visualStatus !== 'inactivo') return false;
          if (filter === 'archivados' && visualStatus !== 'archivado') return false;
          if (!query) return true;
          return getFacilitadorSearchText(row).includes(query);
        })
        .sort((a, b) => {
          const weightDiff = getFacilitadorStatusSortWeight(getFacilitadorVisualStatus(a)) - getFacilitadorStatusSortWeight(getFacilitadorVisualStatus(b));
          if (weightDiff) return weightDiff;
          return String(a.nombre_mostrado || a.nombre_completo || a.facilitador_id).localeCompare(String(b.nombre_mostrado || b.nombre_completo || b.facilitador_id), 'es');
        });
    }

    function getVisibleFacilitadores() {
      return getFilteredFacilitadores();
    }

    function getFacilitadorListTitle() {
      const filter = String(state.facilitadoresUi.filter || 'activos').trim();
      if (filter === 'todos') return 'Todos los facilitadores';
      if (filter === 'inactivos') return 'Facilitadores inactivos';
      if (filter === 'archivados') return 'Facilitadores archivados';
      return 'Facilitadores activos';
    }

    function getFacilitadorRecentWeeks() {
      const rows = Array.isArray(state.catalogos.semanas) ? state.catalogos.semanas : [];
      return rows
        .slice()
        .sort((a, b) => String(a.fecha_inicio || '').localeCompare(String(b.fecha_inicio || '')))
        .slice(-6);
    }

    function isAssignmentActiveForSemana(asignacion, semana) {
      if (!asignacion || !semana) return false;
      if (String(asignacion.archivado_at || '').trim()) return false;
      if (!asignacion.activa) return false;
      const weekStart = toYmdFrontend_(semana.fecha_inicio || '');
      const weekEnd = toYmdFrontend_(semana.fecha_fin || '');
      const start = toYmdFrontend_(asignacion.fecha_inicio || '');
      const end = toYmdFrontend_(asignacion.fecha_fin || '');
      if (start && weekEnd && weekEnd < start) return false;
      if (end && weekStart && weekStart > end) return false;
      return true;
    }

    function getFacilitadorPlanForCell(facilitadorId, asignacion, semanaId) {
      const matches = (state.planeaciones || []).filter((plan) => {
        return String(plan.facilitador_id || '').trim() === String(facilitadorId || '').trim() &&
          String(plan.grupo_id || '').trim() === String(asignacion.grupo_id || '').trim() &&
          String(plan.materia_id || '').trim() === String(asignacion.materia_id || '').trim() &&
          String(plan.semana_id || '').trim() === String(semanaId || '').trim();
      });
      if (!matches.length) return null;
      return matches.sort((a, b) => String(b.fecha_actualizacion || b.fecha_creacion || '').localeCompare(String(a.fecha_actualizacion || a.fecha_creacion || '')))[0] || null;
    }

    function getFacilitadorPlanAlertCount(planId) {
      return (state.alertas || []).filter((alerta) => {
        return String(alerta.planeacion_id || '').trim() === String(planId || '').trim() &&
          String(alerta.estado || '').trim() !== 'resuelta';
      }).length;
    }

    function getFacilitadorMatrixCellState(facilitadorId, asignacion, semana) {
      if (!isAssignmentActiveForSemana(asignacion, semana)) {
        return { code: 'na', label: 'â€”', title: 'Sin asignaciÃ³n activa en esta semana' };
      }
      const plan = getFacilitadorPlanForCell(facilitadorId, asignacion, semana.semana_id);
      if (!plan) {
        return { code: 'missing', label: 'Falta', title: 'No existe una planeaciÃ³n registrada para esta asignaciÃ³n en la semana.' };
      }
      if (getFacilitadorPlanAlertCount(plan.planeacion_id)) {
        return { code: 'alert', label: 'Alerta', title: 'La planeaciÃ³n tiene alertas abiertas.' };
      }
      const status = String(plan.estado || '').trim();
      if (status === 'cierre_pendiente') {
        return { code: 'pending', label: 'Cierre', title: 'La planeaciÃ³n quedÃ³ en cierre pendiente.' };
      }
      if (status === 'cerrada' || status === 'archivada') {
        return { code: 'closed', label: 'Cerrada', title: 'La planeaciÃ³n ya cerrÃ³ su ciclo operativo.' };
      }
      return { code: 'ok', label: 'Lista', title: 'La planeaciÃ³n estÃ¡ registrada y operativa.' };
    }

    function buildFacilitadorPulse(facilitadorId) {
      const asignaciones = getFacilitadorAsignaciones(facilitadorId).filter((row) => row.activa);
      const semanas = getFacilitadorRecentWeeks();
      let esperadas = 0;
      let entregadas = 0;
      let faltantes = 0;
      let cierresPendientes = 0;
      asignaciones.forEach((asignacion) => {
        semanas.forEach((semana) => {
          const stateCell = getFacilitadorMatrixCellState(facilitadorId, asignacion, semana);
          if (stateCell.code === 'na') return;
          esperadas += 1;
          if (stateCell.code === 'missing') faltantes += 1;
          else entregadas += 1;
          if (stateCell.code === 'pending') cierresPendientes += 1;
        });
      });
      const planesIds = new Set((state.planeaciones || [])
        .filter((plan) => String(plan.facilitador_id || '').trim() === String(facilitadorId || '').trim())
        .map((plan) => plan.planeacion_id));
      const alertasAbiertas = (state.alertas || []).filter((alerta) => planesIds.has(alerta.planeacion_id) && String(alerta.estado || '').trim() !== 'resuelta').length;
      return { esperadas, entregadas, faltantes, cierresPendientes, alertasAbiertas };
    }

    function getFacilitadorUpdatedLabel(facilitador) {
      if (!facilitador) return 'Sin registro';
      const latestPlan = getPlaneacionesIndex().latestByFacilitadorId.get(String(facilitador.facilitador_id || '').trim());
      const latestValue = latestPlan
        ? (latestPlan.fecha_actualizacion || latestPlan.fecha_creacion || '')
        : (facilitador.archivado_at || facilitador.fecha_baja || facilitador.fecha_alta || '');
      return latestValue ? getNotificationRelativeUpdateLabel(latestValue) : 'Sin registro';
    }

    function buildFacilitadorPulseSummary(facilitadorId) {
      const pulse = buildFacilitadorPulse(facilitadorId);
      const parts = [];
      if (pulse.faltantes) parts.push(pulse.faltantes + ' faltante(s)');
      if (pulse.cierresPendientes) parts.push(pulse.cierresPendientes + ' cierre(s)');
      if (pulse.alertasAbiertas) parts.push(pulse.alertasAbiertas + ' alerta(s)');
      return parts.join(' Â· ') || 'Sin pendientes crÃ­ticos';
    }

    function closeFacilitadorEditor() {
      state.facilitadoresUi.editorOpen = false;
      state.facilitadoresUi.editorMode = 'new';
      state.facilitadoresUi.editor = createEmptyFacilitadorEditorState();
    }

    function closeFacilitadorPin() {
      state.facilitadoresUi.pinOpen = false;
      state.facilitadoresUi.pinValue = '';
    }

    function closeFacilitadorAsignacionEditor() {
      state.facilitadoresUi.asignacionOpen = false;
      state.facilitadoresUi.asignacion = createEmptyFacilitadorAsignacionState();
    }

    function syncAdminFacilitadoresModule() {
      const visible = getVisibleFacilitadores();
      const selected = String(state.facilitadoresUi.selectedFacilitadorId || '').trim();
      if (selected && visible.some((row) => row.facilitador_id === selected)) return;
      state.facilitadoresUi.selectedFacilitadorId = visible.length ? visible[0].facilitador_id : '';
      if (!visible.length) {
        closeFacilitadorEditor();
        closeFacilitadorPin();
        closeFacilitadorAsignacionEditor();
      }
    }

    function getAdminFacilitadoresModuleTemplate() {
      return [
        '<article class="admin-toolbar admin-alumnos-module admin-facilitadores-module">',
          '<div class="admin-toolbar-head admin-alumnos-head">',
            '<div class="admin-alumnos-head-copy">',
              '<h3>Facilitadores</h3>',
              '<p class="subtle">Administra accesos, asignaciones y pulso semanal del equipo acadÃ©mico.</p>',
            '</div>',
            '<div class="admin-alumnos-head-actions">',
              '<label class="admin-alumnos-search" for="adminFacilitadoresSearch">',
                '<span>Buscar</span>',
                '<input id="adminFacilitadoresSearch" type="search" placeholder="Buscar por ID o nombre">',
              '</label>',
              '<button id="adminFacilitadorNewBtn" class="btn-primary" type="button">Nuevo facilitador</button>',
            '</div>',
          '</div>',
          '<div class="admin-alumnos-filterbar">',
            '<div class="admin-alumnos-filterchips">',
              '<button id="adminFacilitadoresFilterAllBtn" class="btn-ghost" type="button">Todos</button>',
              '<button id="adminFacilitadoresFilterActiveBtn" class="btn-ghost" type="button">Activos</button>',
              '<button id="adminFacilitadoresFilterInactiveBtn" class="btn-ghost" type="button">Inactivos</button>',
              '<button id="adminFacilitadoresFilterArchivedBtn" class="btn-ghost" type="button">Archivados</button>',
            '</div>',
          '</div>',
          '<div class="admin-alumnos-layout">',
            '<section class="admin-alumnos-main">',
              '<div class="admin-alumnos-section-head">',
                '<div>',
                  '<h4 id="adminFacilitadoresListTitle">Facilitadores activos</h4>',
                  '<div id="adminFacilitadoresListMeta" class="subtle">Pulso semanal, asignaciones y accesos operativos.</div>',
                '</div>',
              '</div>',
              '<div id="adminFacilitadoresList" class="admin-alumnos-list"></div>',
            '</section>',
            '<aside class="admin-alumnos-side">',
              '<section id="adminFacilitadorDetailPanel" class="admin-alumnos-panel"></section>',
              '<section id="adminFacilitadorEditorPanel" class="admin-alumnos-panel" hidden>',
                '<div class="admin-alumnos-panel-head">',
                  '<div>',
                    '<h4 id="adminFacilitadorEditorTitle">Nuevo facilitador</h4>',
                    '<div class="subtle">Configura identidad operativa y acceso del facilitador.</div>',
                  '</div>',
                '</div>',
                '<div class="admin-alumnos-editor-grid">',
                  '<label class="field">',
                    '<span>Facilitador ID</span>',
                    '<input id="adminFacilitadorIdInput" type="text" maxlength="50" placeholder="Ej. FAC-009">',
                  '</label>',
                  '<label class="field">',
                    '<span>Rol</span>',
                    '<select id="adminFacilitadorRolInput">',
                      '<option value="facilitador">Facilitador</option>',
                      '<option value="directora">Directora</option>',
                      '<option value="admin">Admin</option>',
                    '</select>',
                  '</label>',
                  '<label class="field">',
                    '<span>Nombre completo</span>',
                    '<input id="adminFacilitadorNombreCompletoInput" type="text" maxlength="150" placeholder="Nombre completo">',
                  '</label>',
                  '<label class="field">',
                    '<span>Nombre mostrado</span>',
                    '<input id="adminFacilitadorNombreMostradoInput" type="text" maxlength="100" placeholder="Nombre corto visible">',
                  '</label>',
                  '<label class="field">',
                    '<span>Color UI</span>',
                    '<input id="adminFacilitadorColorInput" type="text" maxlength="30" placeholder="Ej. cyan o #41c9ff">',
                  '</label>',
                  '<label class="field">',
                    '<span>Estatus</span>',
                    '<select id="adminFacilitadorActivoInput">',
                      '<option value="si">Activo</option>',
                      '<option value="no">Inactivo</option>',
                    '</select>',
                  '</label>',
                  '<label class="field admin-alumnos-field-full">',
                    '<span>PIN temporal</span>',
                    '<input id="adminFacilitadorPinInput" type="password" maxlength="20" placeholder="Opcional al editar Â· requerido al crear">',
                  '</label>',
                '</div>',
                '<div class="actions compact admin-alumnos-panel-actions">',
                  '<button id="adminFacilitadorCancelBtn" class="btn-ghost" type="button">Cancelar</button>',
                  '<button id="adminFacilitadorSaveBtn" class="btn-primary" type="button">Guardar</button>',
                '</div>',
              '</section>',
            '</aside>',
          '</div>',
        '</article>'
      ].join('');
    }

    function renderAdminFacilitadoresModule() {
      const panel = $('admin-panel-facilitadores');
      if (!panel || !canUseAdminShell()) return;
      if (panel.dataset.ready !== '1') {
        panel.innerHTML = getAdminFacilitadoresModuleTemplate();
        panel.dataset.ready = '1';
        bindAdminFacilitadoresEvents();
      }
      syncAdminFacilitadoresModule();
      if ($('adminFacilitadoresSearch')) $('adminFacilitadoresSearch').value = state.facilitadoresUi.search || '';
      if ($('adminFacilitadorNewBtn')) $('adminFacilitadorNewBtn').hidden = !canManageFacilitadoresCatalog();
      if ($('adminFacilitadoresFilterAllBtn')) $('adminFacilitadoresFilterAllBtn').classList.toggle('is-active', state.facilitadoresUi.filter === 'todos');
      if ($('adminFacilitadoresFilterActiveBtn')) $('adminFacilitadoresFilterActiveBtn').classList.toggle('is-active', state.facilitadoresUi.filter === 'activos');
      if ($('adminFacilitadoresFilterInactiveBtn')) $('adminFacilitadoresFilterInactiveBtn').classList.toggle('is-active', state.facilitadoresUi.filter === 'inactivos');
      if ($('adminFacilitadoresFilterArchivedBtn')) $('adminFacilitadoresFilterArchivedBtn').classList.toggle('is-active', state.facilitadoresUi.filter === 'archivados');
      renderAdminFacilitadoresList();
      renderFacilitadorDetailPanel();
      renderFacilitadorEditorPanel();
      if (state.facilitadoresUi.asignacionOpen) {
        fillSelect($('adminFacilitadorAsignacionGrupo'), state.catalogos.grupos || [], (item) => item.grupo_id, (item) => getGrupoDisplayName(item), 'Selecciona grupo');
        fillSelect($('adminFacilitadorAsignacionMateria'), state.catalogos.materias || [], (item) => item.materia_id, (item) => item.nombre || item.materia_id, 'Selecciona materia');
        if ($('adminFacilitadorAsignacionGrupo')) $('adminFacilitadorAsignacionGrupo').value = state.facilitadoresUi.asignacion.grupo_id || '';
        if ($('adminFacilitadorAsignacionMateria')) $('adminFacilitadorAsignacionMateria').value = state.facilitadoresUi.asignacion.materia_id || '';
        if ($('adminFacilitadorAsignacionInicio')) $('adminFacilitadorAsignacionInicio').value = state.facilitadoresUi.asignacion.fecha_inicio || '';
        if ($('adminFacilitadorAsignacionFin')) $('adminFacilitadorAsignacionFin').value = state.facilitadoresUi.asignacion.fecha_fin || '';
      }
    }

    function renderAdminFacilitadoresList() {
      const host = $('adminFacilitadoresList');
      if (!host) return;
      const rows = getVisibleFacilitadores();
      if ($('adminFacilitadoresListTitle')) $('adminFacilitadoresListTitle').textContent = getFacilitadorListTitle();
      if ($('adminFacilitadoresListMeta')) $('adminFacilitadoresListMeta').textContent = rows.length + ' facilitador(es) visibles en esta vista.';
      if (!rows.length) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>No hay facilitadores para mostrar.</strong><div class="subtle">Ajusta el filtro o crea un nuevo facilitador para empezar.</div></div></div>';
        return;
      }
      host.innerHTML = [
        '<div class="admin-alumnos-table">',
          '<div class="admin-facilitadores-list-header">',
            '<div>ID</div>',
            '<div>Facilitador</div>',
            '<div>Rol</div>',
            '<div>Estado</div>',
            '<div>Asignaciones</div>',
            '<div>Pulso</div>',
            '<div>Acciones</div>',
          '</div>',
          rows.map((row) => {
            const visualStatus = getFacilitadorVisualStatus(row);
            const asignaciones = getFacilitadorAsignaciones(row.facilitador_id).filter((item) => item.activa);
            const pulseText = buildFacilitadorPulseSummary(row.facilitador_id);
            const actions = [
            '<button class="btn-ghost" type="button" onclick="openFacilitadorPanel(\'' + escapeJsAttrValue(row.facilitador_id) + '\')">Ver panel</button>'
            ];
            return [
              '<article class="admin-facilitadores-row">',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(row.facilitador_id) + '</div></div>',
                '<div class="admin-alumnos-title"><strong>' + escapeHtml(row.nombre_mostrado || row.nombre_completo || row.facilitador_id) + '</strong><div class="mini">' + escapeHtml(row.nombre_completo || 'Sin nombre') + '</div></div>',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml((row.rol || 'facilitador').replace('directora', 'directora')) + '</div></div>',
                '<div class="admin-alumnos-cell"><span class="admin-alumnos-badge ' + getFacilitadorStatusBadgeClass(visualStatus) + '">' + escapeHtml(getFacilitadorStatusLabel(visualStatus)) + '</span></div>',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(String(asignaciones.length)) + ' activa(s)</div></div>',
                '<div class="admin-alumnos-cell is-pulse"><div class="mini">' + escapeHtml(pulseText) + '</div></div>',
                '<div class="admin-alumnos-actions">' + actions.join('') + '</div>',
              '</article>'
            ].join('');
          }).join(''),
        '</div>'
      ].join('');
    }

    function renderFacilitadorDetailPanel() {
      const host = $('adminFacilitadorDetailPanel');
      if (!host) return;
      const facilitador = getFacilitadorById(state.facilitadoresUi.selectedFacilitadorId);
      if (!facilitador) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>Selecciona un facilitador</strong><div class="subtle">AquÃ­ aparecerÃ¡n sus asignaciones, pulso semanal y accesos rÃ¡pidos.</div></div></div>';
        return;
      }
      const visualStatus = getFacilitadorVisualStatus(facilitador);
      const pulse = buildFacilitadorPulse(facilitador.facilitador_id);
      const asignaciones = getFacilitadorAsignaciones(facilitador.facilitador_id);
      const canManage = canManageFacilitadoresCatalog();
      const pinOpen = !!state.facilitadoresUi.pinOpen;
      const asignacionOpen = !!state.facilitadoresUi.asignacionOpen;
      host.hidden = false;
      host.innerHTML = [
        '<div class="admin-facilitadores-summary">',
          '<div class="admin-facilitadores-identity">',
            '<div>',
              '<strong>' + escapeHtml(facilitador.nombre_mostrado || facilitador.nombre_completo || facilitador.facilitador_id) + '</strong>',
              '<div class="mini">' + escapeHtml(facilitador.facilitador_id) + ' Â· ' + escapeHtml(facilitador.rol || 'facilitador') + '</div>',
            '</div>',
            '<span class="admin-alumnos-badge ' + getFacilitadorStatusBadgeClass(visualStatus) + '">' + escapeHtml(getFacilitadorStatusLabel(visualStatus)) + '</span>',
          '</div>',
          '<div class="admin-facilitadores-inline-actions">',
            (canManage ? '<button class="btn-ghost" type="button" onclick="openFacilitadorEditor(\'edit\', \'' + escapeJsAttrValue(facilitador.facilitador_id) + '\')">Editar ficha</button>' : ''),
            '<button class="btn-secondary" type="button" onclick="openFacilitadorPlaneaciones(\'' + escapeJsAttrValue(facilitador.facilitador_id) + '\')">Ver planeaciones</button>',
            (canManage ? '<button class="btn-ghost" type="button" onclick="openFacilitadorPin(\'' + escapeJsAttrValue(facilitador.facilitador_id) + '\')">Resetear PIN</button>' : ''),
            (canManage && visualStatus === 'activo' ? '<button class="btn-ghost" type="button" onclick="toggleFacilitadorActivo(this, \'' + escapeJsAttrValue(facilitador.facilitador_id) + '\', false)">Desactivar</button>' : ''),
            (canManage && visualStatus === 'inactivo' ? '<button class="btn-primary" type="button" onclick="toggleFacilitadorActivo(this, \'' + escapeJsAttrValue(facilitador.facilitador_id) + '\', true)">Activar</button>' : ''),
            (canManage && visualStatus === 'archivado' ? '<button class="btn-primary" type="button" onclick="reactivateFacilitador(this, \'' + escapeJsAttrValue(facilitador.facilitador_id) + '\')">Reactivar</button>' : ''),
            (canManage && visualStatus !== 'archivado' ? '<button class="btn-accent" type="button" onclick="archiveFacilitador(this, \'' + escapeJsAttrValue(facilitador.facilitador_id) + '\')">Archivar</button>' : ''),
          '</div>',
          '<div class="admin-facilitadores-meta-grid">',
            '<div class="admin-alumnos-readonly"><span>Alta</span><strong>' + escapeHtml(facilitador.fecha_alta ? formatFechaHumana(facilitador.fecha_alta) : 'Sin fecha') + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Ãšltima actividad</span><strong>' + escapeHtml(getFacilitadorUpdatedLabel(facilitador)) + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Asignaciones activas</span><strong>' + escapeHtml(String(asignaciones.filter((item) => item.activa && !item.archivado_at).length)) + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Estado operativo</span><strong>' + escapeHtml(getFacilitadorStatusLabel(visualStatus)) + '</strong></div>',
          '</div>',
          '<div class="admin-facilitadores-kpis">',
            '<div class="admin-facilitadores-kpi"><strong>' + escapeHtml(String(pulse.esperadas)) + '</strong><span>Esperadas</span></div>',
            '<div class="admin-facilitadores-kpi"><strong>' + escapeHtml(String(pulse.entregadas)) + '</strong><span>Entregadas</span></div>',
            '<div class="admin-facilitadores-kpi"><strong>' + escapeHtml(String(pulse.faltantes)) + '</strong><span>Faltantes</span></div>',
            '<div class="admin-facilitadores-kpi"><strong>' + escapeHtml(String(pulse.cierresPendientes)) + '</strong><span>Cierres</span></div>',
            '<div class="admin-facilitadores-kpi"><strong>' + escapeHtml(String(pulse.alertasAbiertas)) + '</strong><span>Alertas</span></div>',
          '</div>',
          (pinOpen && canManage ? renderFacilitadorPinBlock() : ''),
          '<div class="admin-alumnos-section-head"><div><h4>Asignaciones</h4><div class="subtle">RelaciÃ³n grupo + materia que se espera de este facilitador.</div></div>' +
            '<div class="actions compact">' + (canUseAdminShell() ? '<button class="btn-primary" type="button" onclick="openFacilitadorAsignacionEditor(\'new\')">Nueva asignaciÃ³n</button>' : '') + '</div></div>',
          '<div class="admin-facilitadores-assignment-list">' + renderFacilitadorAssignmentsList(facilitador.facilitador_id) + '</div>',
          (asignacionOpen ? renderFacilitadorAsignacionEditor() : ''),
          '<div class="admin-alumnos-section-head"><div><h4>Pulso semanal</h4><div class="subtle">Semanas recientes cruzadas con asignaciones activas y planeaciones existentes.</div></div></div>',
          renderFacilitadorMatrix(facilitador.facilitador_id),
        '</div>'
      ].join('');
    }

    function renderFacilitadorAssignmentsList(facilitadorId) {
      const rows = getFacilitadorAsignaciones(facilitadorId);
      if (!rows.length) {
        return '<div class="admin-alumnos-empty" style="min-height:140px;"><div><strong>Sin asignaciones activas.</strong><div class="subtle">Agrega grupo y materia para medir faltantes con confianza.</div></div></div>';
      }
      return rows.map((row) => {
        const materia = (state.catalogos.materias || []).find((item) => item.materia_id === row.materia_id);
        const periodo = [
          row.fecha_inicio ? ('Desde ' + formatFechaHumana(row.fecha_inicio)) : '',
          row.fecha_fin ? ('Hasta ' + formatFechaHumana(row.fecha_fin)) : ''
        ].filter(Boolean).join(' Â· ') || 'Sin vigencia cerrada';
        return [
          '<article class="admin-facilitadores-assignment-item">',
            '<div class="admin-facilitadores-assignment-copy">',
              '<strong>' + escapeHtml(getGrupoNombre(row.grupo_id)) + ' Â· ' + escapeHtml((materia && materia.nombre) || row.materia_id) + '</strong>',
              '<div class="mini">' + escapeHtml(periodo) + '</div>',
            '</div>',
            '<div class="admin-facilitadores-assignment-actions">',
          '<button class="btn-ghost" type="button" onclick="openFacilitadorAsignacionEditor(\'edit\', \'' + escapeJsAttrValue(row.asignacion_id) + '\')">Editar</button>',
          '<button class="btn-secondary" type="button" onclick="openFacilitadorPlaneaciones(\'' + escapeJsAttrValue(state.facilitadoresUi.selectedFacilitadorId) + '\', \'' + escapeJsAttrValue(row.grupo_id) + '\', \'' + escapeJsAttrValue(row.materia_id) + '\')">Ver</button>',
          '<button class="btn-accent" type="button" onclick="archiveFacilitadorAsignacion(this, \'' + escapeJsAttrValue(row.asignacion_id) + '\')">Quitar</button>',
            '</div>',
          '</article>'
        ].join('');
      }).join('');
    }

    function renderFacilitadorPinBlock() {
      const current = getFacilitadorById(state.facilitadoresUi.selectedFacilitadorId);
      return [
        '<section class="admin-alumnos-panel">',
          '<div class="admin-alumnos-panel-head"><div><h4>Resetear PIN</h4><div class="subtle">Genera un PIN temporal y cierra sesiones activas del facilitador.</div></div></div>',
          '<div class="admin-alumnos-editor-grid">',
            '<label class="field admin-alumnos-field-full">',
              '<span>Nuevo PIN</span>',
              '<input id="adminFacilitadorResetPinInput" type="password" maxlength="20" placeholder="Nuevo PIN temporal para ' + escapeHtml((current && current.nombre_mostrado) || '') + '">',
            '</label>',
          '</div>',
          '<div class="actions compact admin-alumnos-panel-actions">',
            '<button class="btn-ghost" type="button" onclick="closeFacilitadorPinPanel()">Cancelar</button>',
            '<button class="btn-primary" type="button" onclick="saveFacilitadorPin(this)">Guardar PIN</button>',
          '</div>',
        '</section>'
      ].join('');
    }

    function renderFacilitadorAsignacionEditor() {
      const asign = state.facilitadoresUi.asignacion || createEmptyFacilitadorAsignacionState();
      return [
        '<section class="admin-alumnos-panel">',
          '<div class="admin-alumnos-panel-head"><div><h4>' + escapeHtml(asign.asignacion_id ? 'Editar asignaciÃ³n' : 'Nueva asignaciÃ³n') + '</h4><div class="subtle">Define grupo, materia y vigencia para medir el cumplimiento semanal.</div></div></div>',
          '<div class="admin-alumnos-mini-grid">',
            '<label class="field">',
              '<span>Grupo</span>',
              '<select id="adminFacilitadorAsignacionGrupo"></select>',
            '</label>',
            '<label class="field">',
              '<span>Materia</span>',
              '<select id="adminFacilitadorAsignacionMateria"></select>',
            '</label>',
            '<label class="field">',
              '<span>Fecha de inicio</span>',
              '<input id="adminFacilitadorAsignacionInicio" type="date">',
            '</label>',
            '<label class="field">',
              '<span>Fecha de fin</span>',
              '<input id="adminFacilitadorAsignacionFin" type="date">',
            '</label>',
          '</div>',
          '<div class="actions compact admin-alumnos-panel-actions">',
            '<button class="btn-ghost" type="button" onclick="closeFacilitadorAsignacionPanel()">Cancelar</button>',
            '<button class="btn-primary" type="button" onclick="saveFacilitadorAsignacion(this)">Guardar asignaciÃ³n</button>',
          '</div>',
        '</section>'
      ].join('');
    }

    function renderFacilitadorMatrix(facilitadorId) {
      const semanas = getFacilitadorRecentWeeks();
      const asignaciones = getFacilitadorAsignaciones(facilitadorId).filter((row) => row.activa);
      if (!semanas.length || !asignaciones.length) {
        return '<div class="admin-alumnos-empty" style="min-height:160px;"><div><strong>No hay matriz disponible todavÃ­a.</strong><div class="subtle">Necesitas semanas cargadas y al menos una asignaciÃ³n activa.</div></div></div>';
      }
      return [
        '<div class="admin-facilitadores-matrix-table">',
          '<div class="admin-facilitadores-matrix-header">',
            '<div class="admin-facilitadores-matrix-label">AsignaciÃ³n</div>',
            semanas.map((semana) => '<div class="admin-facilitadores-matrix-cell">' + escapeHtml(formatSemanaLabel(semana)) + '</div>').join(''),
          '</div>',
          asignaciones.map((asignacion) => {
            const materia = (state.catalogos.materias || []).find((item) => item.materia_id === asignacion.materia_id);
            return [
              '<div class="admin-facilitadores-matrix-row">',
                '<div class="admin-facilitadores-matrix-label">' + escapeHtml(getGrupoNombre(asignacion.grupo_id)) + ' Â· ' + escapeHtml((materia && materia.nombre) || asignacion.materia_id) + '</div>',
                semanas.map((semana) => {
                  const cell = getFacilitadorMatrixCellState(facilitadorId, asignacion, semana);
                  const css = cell.code === 'ok' ? 'is-ok' :
                    cell.code === 'alert' ? 'is-alert' :
                    cell.code === 'pending' ? 'is-pending' :
                    cell.code === 'closed' ? 'is-closed' :
                    'is-missing';
                  return '<div class="admin-facilitadores-matrix-cell"><span class="facilitador-matrix-state ' + css + '" title="' + escapeHtml(cell.title) + '">' + escapeHtml(cell.label) + '</span></div>';
                }).join(''),
              '</div>'
            ].join('');
          }).join(''),
        '</div>'
      ].join('');
    }

    function renderFacilitadorEditorPanel() {
      const panel = $('adminFacilitadorEditorPanel');
      if (!panel) return;
      panel.hidden = !state.facilitadoresUi.editorOpen;
      if (panel.hidden) return;
      const mode = state.facilitadoresUi.editorMode || 'new';
      const editor = state.facilitadoresUi.editor || createEmptyFacilitadorEditorState();
      if ($('adminFacilitadorEditorTitle')) $('adminFacilitadorEditorTitle').textContent = mode === 'edit' ? 'Editar facilitador' : 'Nuevo facilitador';
      if ($('adminFacilitadorIdInput')) {
        $('adminFacilitadorIdInput').value = editor.facilitador_id || '';
        $('adminFacilitadorIdInput').disabled = mode === 'edit';
      }
      if ($('adminFacilitadorNombreCompletoInput')) $('adminFacilitadorNombreCompletoInput').value = editor.nombre_completo || '';
      if ($('adminFacilitadorNombreMostradoInput')) $('adminFacilitadorNombreMostradoInput').value = editor.nombre_mostrado || '';
      if ($('adminFacilitadorRolInput')) $('adminFacilitadorRolInput').value = editor.rol || 'facilitador';
      if ($('adminFacilitadorColorInput')) $('adminFacilitadorColorInput').value = editor.color_ui || '';
      if ($('adminFacilitadorActivoInput')) $('adminFacilitadorActivoInput').value = editor.activo ? 'si' : 'no';
      if ($('adminFacilitadorPinInput')) $('adminFacilitadorPinInput').value = editor.pin_plano || '';
    }

    function bindAdminFacilitadoresEvents() {
      if ($('adminFacilitadoresSearch')) $('adminFacilitadoresSearch').addEventListener('input', (event) => {
        state.facilitadoresUi.search = event.currentTarget.value;
        scheduleUiDebounce('admin-facilitadores-search', () => renderAdminFacilitadoresModule());
      });
      if ($('adminFacilitadoresFilterAllBtn')) $('adminFacilitadoresFilterAllBtn').addEventListener('click', () => {
        state.facilitadoresUi.filter = 'todos';
        renderAdminFacilitadoresModule();
      });
      if ($('adminFacilitadoresFilterActiveBtn')) $('adminFacilitadoresFilterActiveBtn').addEventListener('click', () => {
        state.facilitadoresUi.filter = 'activos';
        renderAdminFacilitadoresModule();
      });
      if ($('adminFacilitadoresFilterInactiveBtn')) $('adminFacilitadoresFilterInactiveBtn').addEventListener('click', () => {
        state.facilitadoresUi.filter = 'inactivos';
        renderAdminFacilitadoresModule();
      });
      if ($('adminFacilitadoresFilterArchivedBtn')) $('adminFacilitadoresFilterArchivedBtn').addEventListener('click', () => {
        state.facilitadoresUi.filter = 'archivados';
        renderAdminFacilitadoresModule();
      });
      if ($('adminFacilitadorNewBtn')) $('adminFacilitadorNewBtn').addEventListener('click', () => openFacilitadorEditor('new'));
      if ($('adminFacilitadorCancelBtn')) $('adminFacilitadorCancelBtn').addEventListener('click', () => {
        closeFacilitadorEditor();
        renderAdminFacilitadoresModule();
      });
      if ($('adminFacilitadorSaveBtn')) $('adminFacilitadorSaveBtn').addEventListener('click', (event) => saveFacilitadorEditor(event.currentTarget));
    }

    function openFacilitadorPanel(facilitadorId) {
      state.facilitadoresUi.selectedFacilitadorId = String(facilitadorId || '').trim();
      state.facilitadoresUi.panelMode = 'detail';
      closeFacilitadorEditor();
      renderAdminFacilitadoresModule();
      focusAdminFacilitadorPanel('adminFacilitadorDetailPanel');
    }

    function focusAdminFacilitadorPanel(panelId, fieldId) {
      window.requestAnimationFrame(() => {
        const panel = $(panelId);
        if (!panel || panel.hidden || typeof panel.scrollIntoView !== 'function') return;
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => {
          const firstField = fieldId ? $(fieldId) : null;
          if (firstField && typeof firstField.focus === 'function') {
            firstField.focus({ preventScroll: true });
            if (typeof firstField.select === 'function' && !firstField.disabled) {
              firstField.select();
            }
          }
        }, 180);
      });
    }

    function openFacilitadorEditor(mode, facilitadorId) {
      const nextMode = mode === 'edit' ? 'edit' : 'new';
      const facilitador = nextMode === 'edit' ? getFacilitadorById(facilitadorId) : null;
      state.facilitadoresUi.editorMode = nextMode;
      state.facilitadoresUi.editorOpen = true;
      state.facilitadoresUi.selectedFacilitadorId = facilitador ? facilitador.facilitador_id : state.facilitadoresUi.selectedFacilitadorId;
      state.facilitadoresUi.editor = facilitador ? {
        facilitador_id: facilitador.facilitador_id,
        nombre_completo: facilitador.nombre_completo || '',
        nombre_mostrado: facilitador.nombre_mostrado || '',
        rol: facilitador.rol || 'facilitador',
        color_ui: facilitador.color_ui || '',
        activo: facilitador.activo,
        pin_plano: ''
      } : createEmptyFacilitadorEditorState();
      renderAdminFacilitadoresModule();
      focusAdminFacilitadorPanel(
        'adminFacilitadorEditorPanel',
        nextMode === 'edit' ? 'adminFacilitadorNombreCompletoInput' : 'adminFacilitadorIdInput'
      );
    }

    async function saveFacilitadorEditor(button) {
      if (!canManageFacilitadoresCatalog()) throw new Error('Solo admin puede editar facilitadores.');
      const mode = state.facilitadoresUi.editorMode || 'new';
      const payload = {
        facilitador_id: $('adminFacilitadorIdInput') ? $('adminFacilitadorIdInput').value.trim() : '',
        nombre_completo: $('adminFacilitadorNombreCompletoInput') ? $('adminFacilitadorNombreCompletoInput').value.trim() : '',
        nombre_mostrado: $('adminFacilitadorNombreMostradoInput') ? $('adminFacilitadorNombreMostradoInput').value.trim() : '',
        rol: $('adminFacilitadorRolInput') ? $('adminFacilitadorRolInput').value : 'facilitador',
        color_ui: $('adminFacilitadorColorInput') ? $('adminFacilitadorColorInput').value.trim() : '',
        activo: $('adminFacilitadorActivoInput') ? $('adminFacilitadorActivoInput').value === 'si' : true,
        request_id: uid('FACED')
      };
      const pinPlano = $('adminFacilitadorPinInput') ? $('adminFacilitadorPinInput').value.trim() : '';
      if (!payload.facilitador_id) throw new Error('Captura el Facilitador ID.');
      if (!payload.nombre_completo) throw new Error('Captura el nombre completo.');
      if (!payload.nombre_mostrado) throw new Error('Captura el nombre mostrado.');
      if (mode === 'new' && !pinPlano) throw new Error('Captura un PIN temporal para el nuevo facilitador.');
      if (pinPlano) payload.pin_plano = pinPlano;
      await handleAction('guardarFacilitador', async () => {
        const data = await api('guardarFacilitador', payload);
        if (data && data.facilitador) applySavedFacilitadorCatalogRow(data.facilitador);
        closeFacilitadorEditor();
        state.facilitadoresUi.selectedFacilitadorId = data.facilitador_id || payload.facilitador_id;
        renderAdminModuleSurface('facilitadores');
        setBanner(mode === 'new' ? 'Facilitador creado.' : 'Ficha del facilitador actualizada.', 'success');
      }, {
        button,
        key: buildActionKey('guardarFacilitador', [payload.facilitador_id, mode]),
        busyText: mode === 'new' ? 'Creando...' : 'Guardando...'
      });
    }

    function openFacilitadorPin(facilitadorId) {
      state.facilitadoresUi.selectedFacilitadorId = String(facilitadorId || '').trim();
      state.facilitadoresUi.pinOpen = true;
      state.facilitadoresUi.pinValue = '';
      renderAdminFacilitadoresModule();
      focusAdminFacilitadorPanel('adminFacilitadorDetailPanel', 'adminFacilitadorResetPinInput');
    }

    function closeFacilitadorPinPanel() {
      closeFacilitadorPin();
      renderAdminFacilitadoresModule();
    }

    async function saveFacilitadorPin(button) {
      if (!canManageFacilitadoresCatalog()) throw new Error('Solo admin puede resetear PIN.');
      const facilitadorId = String(state.facilitadoresUi.selectedFacilitadorId || '').trim();
      const pinPlano = $('adminFacilitadorResetPinInput') ? $('adminFacilitadorResetPinInput').value.trim() : '';
      if (!facilitadorId) throw new Error('Selecciona un facilitador.');
      if (!pinPlano) throw new Error('Captura un nuevo PIN.');
      await handleAction('resetearPinFacilitador', async () => {
        await api('guardarFacilitador', {
          facilitador_id: facilitadorId,
          pin_plano: pinPlano,
          request_id: uid('FACPIN')
        });
        closeFacilitadorPin();
        renderAdminModuleSurface('facilitadores');
        setBanner('PIN restablecido para el facilitador.', 'success');
      }, {
        button,
        key: buildActionKey('resetearPinFacilitador', [facilitadorId]),
        busyText: 'Guardando...'
      });
    }

    async function toggleFacilitadorActivo(button, facilitadorId, nextActive) {
      if (!canManageFacilitadoresCatalog()) throw new Error('Solo admin puede cambiar el estatus operativo del facilitador.');
      const row = getFacilitadorById(facilitadorId);
      if (!row) throw new Error('Facilitador no encontrado.');
      await handleAction('toggleFacilitadorActivo', async () => {
        await api('guardarFacilitador', {
          facilitador_id: row.facilitador_id,
          activo: !!nextActive,
          request_id: uid('FACTOG')
        });
        applyPatchedFacilitadorCatalogRow(row.facilitador_id, {
          activo: !!nextActive
        });
        renderAdminModuleSurface('facilitadores');
        setBanner(nextActive ? 'Facilitador activado.' : 'Facilitador desactivado.', 'success');
      }, {
        button,
        key: buildActionKey('toggleFacilitadorActivo', [facilitadorId, nextActive ? 'si' : 'no']),
        busyText: nextActive ? 'Activando...' : 'Desactivando...'
      });
    }

    async function archiveFacilitador(button, facilitadorId) {
      if (!canManageFacilitadoresCatalog()) throw new Error('Solo admin puede archivar facilitadores.');
      const row = getFacilitadorById(facilitadorId);
      if (!row) throw new Error('Facilitador no encontrado.');
      if (!confirm('Esto archivarÃ¡ al facilitador y cerrarÃ¡ sus accesos operativos.')) return;
      await handleAction('archivarFacilitador', async () => {
        await api('archivarFacilitador', {
          facilitador_id: row.facilitador_id,
          request_id: uid('FACARC')
        });
        const archivedAt = new Date().toISOString();
        applyPatchedFacilitadorCatalogRow(row.facilitador_id, {
          activo: false,
          fecha_baja: getTodayYmdLocal(),
          archivado_at: archivedAt,
          archivado_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || '')
        });
        renderAdminModuleSurface('facilitadores');
        setBanner('Facilitador archivado.', 'success');
      }, {
        button,
        key: buildActionKey('archivarFacilitador', [facilitadorId]),
        busyText: 'Archivando...'
      });
    }

    async function reactivateFacilitador(button, facilitadorId) {
      if (!canManageFacilitadoresCatalog()) throw new Error('Solo admin puede reactivar facilitadores.');
      const row = getFacilitadorById(facilitadorId);
      if (!row) throw new Error('Facilitador no encontrado.');
      await handleAction('reactivarFacilitador', async () => {
        await api('reactivarFacilitador', {
          facilitador_id: row.facilitador_id,
          request_id: uid('FACREA')
        });
        applyPatchedFacilitadorCatalogRow(row.facilitador_id, {
          activo: true,
          fecha_baja: '',
          archivado_at: '',
          archivado_por: ''
        });
        renderAdminModuleSurface('facilitadores');
        setBanner('Facilitador reactivado.', 'success');
      }, {
        button,
        key: buildActionKey('reactivarFacilitador', [facilitadorId]),
        busyText: 'Reactivando...'
      });
    }

    function openFacilitadorAsignacionEditor(mode, asignacionId) {
      const facilitadorId = String(state.facilitadoresUi.selectedFacilitadorId || '').trim();
      if (!facilitadorId) return;
      const current = mode === 'edit'
        ? getFacilitadorAsignaciones(facilitadorId, { includeArchived: true }).find((row) => row.asignacion_id === String(asignacionId || '').trim())
        : null;
      state.facilitadoresUi.asignacionOpen = true;
      state.facilitadoresUi.asignacion = current ? {
        asignacion_id: current.asignacion_id,
        facilitador_id: current.facilitador_id,
        grupo_id: current.grupo_id,
        materia_id: current.materia_id,
        activa: current.activa,
        fecha_inicio: current.fecha_inicio || '',
        fecha_fin: current.fecha_fin || ''
      } : {
        asignacion_id: '',
        facilitador_id: facilitadorId,
        grupo_id: '',
        materia_id: '',
        activa: true,
        fecha_inicio: '',
        fecha_fin: ''
      };
      renderAdminFacilitadoresModule();
      fillSelect($('adminFacilitadorAsignacionGrupo'), state.catalogos.grupos || [], (item) => item.grupo_id, (item) => getGrupoDisplayName(item), 'Selecciona grupo');
      fillSelect($('adminFacilitadorAsignacionMateria'), state.catalogos.materias || [], (item) => item.materia_id, (item) => item.nombre || item.materia_id, 'Selecciona materia');
      if ($('adminFacilitadorAsignacionGrupo')) $('adminFacilitadorAsignacionGrupo').value = state.facilitadoresUi.asignacion.grupo_id || '';
      if ($('adminFacilitadorAsignacionMateria')) $('adminFacilitadorAsignacionMateria').value = state.facilitadoresUi.asignacion.materia_id || '';
      if ($('adminFacilitadorAsignacionInicio')) $('adminFacilitadorAsignacionInicio').value = state.facilitadoresUi.asignacion.fecha_inicio || '';
      if ($('adminFacilitadorAsignacionFin')) $('adminFacilitadorAsignacionFin').value = state.facilitadoresUi.asignacion.fecha_fin || '';
      focusAdminFacilitadorPanel('adminFacilitadorDetailPanel', 'adminFacilitadorAsignacionGrupo');
    }

    function closeFacilitadorAsignacionPanel() {
      closeFacilitadorAsignacionEditor();
      renderAdminFacilitadoresModule();
    }

    async function saveFacilitadorAsignacion(button) {
      const facilitadorId = String(state.facilitadoresUi.selectedFacilitadorId || '').trim();
      if (!facilitadorId) throw new Error('Selecciona un facilitador.');
      const payload = {
        asignacion_id: state.facilitadoresUi.asignacion.asignacion_id || '',
        facilitador_id: facilitadorId,
        grupo_id: $('adminFacilitadorAsignacionGrupo') ? $('adminFacilitadorAsignacionGrupo').value : '',
        materia_id: $('adminFacilitadorAsignacionMateria') ? $('adminFacilitadorAsignacionMateria').value : '',
        fecha_inicio: $('adminFacilitadorAsignacionInicio') ? $('adminFacilitadorAsignacionInicio').value : '',
        fecha_fin: $('adminFacilitadorAsignacionFin') ? $('adminFacilitadorAsignacionFin').value : '',
        activa: true,
        request_id: uid('FAS')
      };
      if (!payload.grupo_id) throw new Error('Selecciona un grupo.');
      if (!payload.materia_id) throw new Error('Selecciona una materia.');
      await handleAction('guardarFacilitadorAsignacion', async () => {
        const data = await api('guardarFacilitadorAsignacion', payload);
        applySavedFacilitadorAsignacionCatalogRow({
          asignacion_id: data && data.asignacion_id ? data.asignacion_id : (payload.asignacion_id || uid('FASLOCAL')),
          facilitador_id: facilitadorId,
          grupo_id: payload.grupo_id,
          materia_id: payload.materia_id,
          activa: true,
          fecha_inicio: payload.fecha_inicio || '',
          fecha_fin: payload.fecha_fin || '',
          fecha_actualizacion: new Date().toISOString(),
          archivado_at: '',
          archivada_at: '',
          archivado_por: '',
          archivada_por: ''
        });
        closeFacilitadorAsignacionEditor();
        renderAdminModuleSurface('facilitadores');
        setBanner('AsignaciÃ³n guardada.', 'success');
      }, {
        button,
        key: buildActionKey('guardarFacilitadorAsignacion', [facilitadorId, payload.grupo_id, payload.materia_id, payload.asignacion_id || 'new']),
        busyText: 'Guardando...'
      });
    }

    async function archiveFacilitadorAsignacion(button, asignacionId) {
      if (!confirm('Esta asignaciÃ³n dejarÃ¡ de contar para el pulso semanal del facilitador.')) return;
      await handleAction('archivarFacilitadorAsignacion', async () => {
        await api('archivarFacilitadorAsignacion', {
          asignacion_id: asignacionId,
          request_id: uid('FASARC')
        });
        const archivedAt = new Date().toISOString();
        applySavedFacilitadorAsignacionCatalogRow({
          asignacion_id: asignacionId,
          activa: false,
          fecha_fin: getTodayYmdLocal(),
          fecha_actualizacion: archivedAt,
          archivado_at: archivedAt,
          archivada_at: archivedAt,
          archivado_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || ''),
          archivada_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || '')
        });
        closeFacilitadorAsignacionEditor();
        renderAdminModuleSurface('facilitadores');
        setBanner('AsignaciÃ³n retirada del pulso semanal.', 'success');
      }, {
        button,
        key: buildActionKey('archivarFacilitadorAsignacion', [asignacionId]),
        busyText: 'Quitando...'
      });
    }

    async function openFacilitadorPlaneaciones(facilitadorId, grupoId, materiaId) {
      activateAdminModule('planeaciones');
      if ($('filterFacilitador')) $('filterFacilitador').value = String(facilitadorId || '').trim();
      if ($('filterGrupo') && grupoId !== undefined) $('filterGrupo').value = String(grupoId || '').trim();
      if (state.ui) state.ui.planeacionesMateriaFilter = materiaId !== undefined ? String(materiaId || '').trim() : '';
      renderPlaneacionesSurface({
        includeStats: false,
        includePlaneaciones: true,
        includeAlertas: false
      });
      await refreshPlaneaciones();
      renderPlaneacionesSurface({
        includeStats: false,
        includePlaneaciones: true,
        includeAlertas: false
      });
      setBanner(
        state.ui && state.ui.planeacionesMateriaFilter
          ? 'Planeaciones filtradas por asignaciÃ³n del facilitador.'
          : 'Planeaciones filtradas por facilitador.',
        'info'
      );
    }

    function canManageTalleresCatalog() {
      return canUseAdminShell();
    }

    function getAdminTalleresCatalog() {
      const revision = getCatalogosRevision();
      if (adminCatalogMemo.talleres.revision === revision) {
        return adminCatalogMemo.talleres.result;
      }
      const rows = Array.isArray(state.catalogos.talleres_admin) && state.catalogos.talleres_admin.length
        ? state.catalogos.talleres_admin
        : (state.catalogos.talleres || []);
      const result = rows.map((row) => ({
        taller_id: String(row.taller_id || '').trim(),
        nombre: String(row.nombre || '').trim(),
        materia_id: String(row.materia_id || '').trim(),
        facilitador_id: String(row.facilitador_id || '').trim(),
        activo: !!row.activo,
        estatus: String(row.estatus || '').trim() || (row.activo ? 'activo' : 'inactivo'),
        fecha_actualizacion: String(row.fecha_actualizacion || '').trim(),
        archivado_at: String(row.archivado_at || '').trim(),
        archivado_por: String(row.archivado_por || '').trim()
      }));
      adminCatalogMemo.talleres = {
        revision,
        result,
        byId: new Map(result.map((row) => [row.taller_id, row]))
      };
      return result;
    }

    function getTallerById(tallerId) {
      const id = String(tallerId || '').trim();
      if (!id) return null;
      getAdminTalleresCatalog();
      return adminCatalogMemo.talleres.byId.get(id) || null;
    }

    function applySavedTallerCatalogRow(row) {
      if (!row || !row.taller_id) return null;
      upsertCatalogEntityRow('talleres_admin', 'taller_id', row);
      upsertCatalogEntityRow('talleres', 'taller_id', row);
      return getTallerById(row.taller_id);
    }

    function getTallerStatusLabel(status) {
      if (status === 'archivado') return 'Archivado';
      if (status === 'inactivo') return 'Inactivo';
      return 'Activo';
    }

    function getTallerStatusBadgeClass(status) {
      if (status === 'archivado') return 'is-archived';
      if (status === 'inactivo') return 'is-inactive';
      return 'is-active';
    }

    function closeTallerEditor() {
      state.talleresUi.editorOpen = false;
      state.talleresUi.editorMode = 'new';
      state.talleresUi.editor = createEmptyTallerEditorState();
    }

    function closeTallerMembershipEditor() {
      state.talleresUi.membershipOpen = false;
      state.talleresUi.membershipSearch = '';
      state.talleresUi.membershipGroup = '';
      state.talleresUi.membershipSelectedAlumnoIds = [];
    }

    function syncAdminTalleresModule() {
      const visible = getVisibleTalleres();
      const selected = String(state.talleresUi.selectedTallerId || '').trim();
      if (selected && visible.some((row) => row.taller_id === selected)) return;
      state.talleresUi.selectedTallerId = visible.length ? visible[0].taller_id : '';
      if (!visible.length) {
        closeTallerEditor();
        closeTallerMembershipEditor();
      }
    }

    function getTallerSearchText(row) {
      const materia = (state.catalogos.materias || []).find((item) => item.materia_id === row.materia_id);
      const facilitador = getFacilitadorById(row.facilitador_id);
      return [
        row.taller_id,
        row.nombre,
        row.materia_id,
        materia && materia.nombre,
        row.facilitador_id,
        facilitador && (facilitador.nombre_mostrado || facilitador.nombre_completo)
      ].filter(Boolean).join(' ').toLowerCase();
    }

    function getVisibleTalleres() {
      const filter = String(state.talleresUi.filter || 'activos').trim();
      const query = String(state.talleresUi.search || '').trim().toLowerCase();
      return getAdminTalleresCatalog()
        .filter((row) => {
          const status = String(row.estatus || '').trim();
          if (filter === 'activos' && status !== 'activo') return false;
          if (filter === 'inactivos' && status !== 'inactivo') return false;
          if (filter === 'archivados' && status !== 'archivado') return false;
          if (!query) return true;
          return getTallerSearchText(row).includes(query);
        })
        .sort((a, b) => String(a.nombre || a.taller_id).localeCompare(String(b.nombre || b.taller_id), 'es'));
    }

    function getTalleresKpis() {
      const rows = getAdminTalleresCatalog();
      return {
        total: rows.length,
        activos: rows.filter((row) => row.estatus === 'activo').length,
        inactivos: rows.filter((row) => row.estatus === 'inactivo').length,
        archivados: rows.filter((row) => row.estatus === 'archivado').length
      };
    }

    function getTallerMateriaOptions() {
      return (state.catalogos.materias || []).filter((row) => String(row.estatus || '').trim() !== 'archivada');
    }

    function getTallerFacilitadorOptions() {
      const rows = Array.isArray(state.catalogos.facilitadores_admin) && state.catalogos.facilitadores_admin.length
        ? state.catalogos.facilitadores_admin
        : (state.catalogos.facilitadores || []);
      return rows.filter((row) => String(row.archivado_at || '').trim() === '');
    }

    function getActiveTallerAlumnoRows(tallerId) {
      const targetId = String(tallerId || '').trim();
      if (!targetId) return [];
      return (state.catalogos.alumno_talleres || [])
        .filter((row) => String(row.taller_id || '').trim() === targetId && row.activa !== false)
        .map((row) => {
          const alumno = getAlumnoById(row.alumno_id);
          return Object.assign({}, row, { alumno: alumno || null });
        })
        .sort((a, b) => String((a.alumno && (a.alumno.nombre_mostrado || a.alumno.nombre_completo)) || '').localeCompare(String((b.alumno && (b.alumno.nombre_mostrado || b.alumno.nombre_completo)) || ''), 'es'));
    }

    function getTallerAlumnoIds(tallerId) {
      return getActiveTallerAlumnoRows(tallerId).map((row) => String(row.alumno_id || '').trim());
    }

    function getTallerCandidateAlumnos() {
      return (state.catalogos.alumnos || [])
        .filter((row) => getAlumnoStatusVisual(row) === 'activo')
        .map((row) => Object.assign({}, row, { grupo_nombre: getGrupoNombre(row.grupo_id) }))
        .sort((a, b) => {
          const groupDiff = String(a.grupo_nombre || '').localeCompare(String(b.grupo_nombre || ''), 'es');
          if (groupDiff) return groupDiff;
          return String(a.nombre_mostrado || a.nombre_completo || a.alumno_id).localeCompare(String(b.nombre_mostrado || b.nombre_completo || b.alumno_id), 'es');
        });
    }

    function getVisibleTallerCandidateAlumnos() {
      const query = String(state.talleresUi.membershipSearch || '').trim().toLowerCase();
      const groupFilter = String(state.talleresUi.membershipGroup || '').trim();
      return getTallerCandidateAlumnos().filter((row) => {
        if (groupFilter && String(row.grupo_id || '').trim() !== groupFilter) return false;
        if (!query) return true;
        return [
          row.alumno_id,
          row.matricula,
          row.nombre_mostrado,
          row.nombre_completo,
          row.grupo_nombre
        ].filter(Boolean).join(' ').toLowerCase().includes(query);
      });
    }

    function replaceTallerAlumnoRelations(tallerId, activeRows) {
      const targetId = String(tallerId || '').trim();
      const nextRows = Array.isArray(activeRows) ? activeRows.slice() : [];
      state.catalogos.alumno_talleres = (state.catalogos.alumno_talleres || []).filter((row) => String(row.taller_id || '').trim() !== targetId);
      nextRows.forEach((row) => state.catalogos.alumno_talleres.push(row));
    }

    async function openTallerMembershipEditor(tallerId) {
      const targetId = String(tallerId || state.talleresUi.selectedTallerId || '').trim();
      const taller = getTallerById(targetId);
      if (!taller) return;
      closeTallerEditor();
      state.talleresUi.selectedTallerId = targetId;
      state.talleresUi.membershipOpen = true;
      state.talleresUi.membershipSearch = '';
      state.talleresUi.membershipGroup = '';
      state.talleresUi.membershipSelectedAlumnoIds = getTallerAlumnoIds(targetId);
      renderAdminTalleresModule();
      await ensureTallerMembershipCatalogosAvailable();
      focusAdminFacilitadorPanel('adminTallerDetailPanel', 'adminTallerMembershipSearch');
    }

    function toggleTallerAlumnoDraft(alumnoId, checked) {
      const id = String(alumnoId || '').trim();
      if (!id) return;
      const selected = new Set((state.talleresUi.membershipSelectedAlumnoIds || []).map((item) => String(item || '').trim()).filter(Boolean));
      if (checked) selected.add(id);
      else selected.delete(id);
      state.talleresUi.membershipSelectedAlumnoIds = Array.from(selected);
      renderAdminTalleresModule();
    }

    function toggleAllVisibleTallerAlumnos(nextChecked) {
      const selected = new Set((state.talleresUi.membershipSelectedAlumnoIds || []).map((item) => String(item || '').trim()).filter(Boolean));
      getVisibleTallerCandidateAlumnos().forEach((row) => {
        const id = String(row.alumno_id || '').trim();
        if (!id) return;
        if (nextChecked) selected.add(id);
        else selected.delete(id);
      });
      state.talleresUi.membershipSelectedAlumnoIds = Array.from(selected);
      renderAdminTalleresModule();
    }

    function getAdminTalleresModuleTemplate() {
      return [
        '<article class="admin-toolbar admin-alumnos-module admin-talleres-module">',
          '<div class="admin-toolbar-head admin-alumnos-head">',
            '<div class="admin-alumnos-head-copy">',
              '<h3>Talleres</h3>',
              '<p class="subtle">Administra el catÃ¡logo base de talleres antes de asignar alumnos o crear planeaciones por taller.</p>',
            '</div>',
            '<div class="admin-alumnos-head-actions">',
              '<label class="admin-alumnos-search" for="adminTalleresSearch">',
                '<span>Buscar</span>',
                '<input id="adminTalleresSearch" type="search" placeholder="Buscar por ID, nombre o responsable">',
              '</label>',
              '<button id="adminTallerNewBtn" class="btn-primary" type="button">Nuevo taller</button>',
            '</div>',
          '</div>',
          '<div class="admin-materias-kpis">',
            '<div class="admin-materias-kpi"><strong id="adminTalleresKpiTotal">0</strong><span>Total talleres</span></div>',
            '<div class="admin-materias-kpi"><strong id="adminTalleresKpiActive">0</strong><span>Activos</span></div>',
            '<div class="admin-materias-kpi"><strong id="adminTalleresKpiInactive">0</strong><span>Inactivos</span></div>',
            '<div class="admin-materias-kpi"><strong id="adminTalleresKpiArchived">0</strong><span>Archivados</span></div>',
          '</div>',
          '<div class="admin-alumnos-filterbar">',
            '<div class="admin-alumnos-filterchips">',
              '<button id="adminTalleresFilterAllBtn" class="btn-ghost" type="button">Todos</button>',
              '<button id="adminTalleresFilterActiveBtn" class="btn-ghost" type="button">Activos</button>',
              '<button id="adminTalleresFilterInactiveBtn" class="btn-ghost" type="button">Inactivos</button>',
              '<button id="adminTalleresFilterArchivedBtn" class="btn-ghost" type="button">Archivados</button>',
            '</div>',
          '</div>',
          '<div class="admin-alumnos-layout">',
            '<section class="admin-alumnos-main">',
              '<div class="admin-alumnos-section-head">',
                '<div>',
                  '<h4 id="adminTalleresListTitle">Talleres activos</h4>',
                  '<div id="adminTalleresListMeta" class="subtle">CatÃ¡logo operativo base para futuros grupos mixtos.</div>',
                '</div>',
              '</div>',
              '<div id="adminTalleresList" class="admin-alumnos-list"></div>',
            '</section>',
            '<aside class="admin-alumnos-side">',
              '<section id="adminTallerDetailPanel" class="admin-alumnos-panel"></section>',
              '<section id="adminTallerEditorPanel" class="admin-alumnos-panel" hidden>',
                '<div class="admin-alumnos-panel-head">',
                  '<div>',
                    '<h4 id="adminTallerEditorTitle">Nuevo taller</h4>',
                    '<div class="subtle">Configura el taller base con su materia y facilitador responsable.</div>',
                  '</div>',
                '</div>',
                '<div class="admin-alumnos-editor-grid">',
                  '<label class="field">',
                    '<span>Taller ID</span>',
                    '<input id="adminTallerIdInput" type="text" maxlength="50" placeholder="Ej. TALL-001">',
                  '</label>',
                  '<label class="field">',
                    '<span>Estatus</span>',
                    '<select id="adminTallerStatusInput">',
                      '<option value="activo">Activo</option>',
                      '<option value="inactivo">Inactivo</option>',
                    '</select>',
                  '</label>',
                  '<label class="field admin-alumnos-field-full">',
                    '<span>Nombre</span>',
                    '<input id="adminTallerNombreInput" type="text" maxlength="100" placeholder="Ej. Taller de futbol">',
                  '</label>',
                  '<label class="field">',
                    '<span>Materia base</span>',
                    '<select id="adminTallerMateriaInput"></select>',
                  '</label>',
                  '<label class="field">',
                    '<span>Facilitador responsable</span>',
                    '<select id="adminTallerFacilitadorInput"></select>',
                  '</label>',
                '</div>',
                '<div class="actions compact admin-alumnos-panel-actions">',
                  '<button id="adminTallerCancelBtn" class="btn-ghost" type="button">Cancelar</button>',
                  '<button id="adminTallerSaveBtn" class="btn-primary" type="button">Guardar</button>',
                '</div>',
              '</section>',
            '</aside>',
          '</div>',
        '</article>'
      ].join('');
    }

    function renderAdminTalleresModule() {
      const panel = $('admin-panel-talleres');
      if (!panel || !canUseAdminShell()) return;
      if (panel.dataset.ready !== '1') {
        panel.innerHTML = getAdminTalleresModuleTemplate();
        panel.dataset.ready = '1';
        bindAdminTalleresEvents();
      }
      syncAdminTalleresModule();
      const kpis = getTalleresKpis();
      if ($('adminTalleresSearch')) $('adminTalleresSearch').value = state.talleresUi.search || '';
      if ($('adminTalleresKpiTotal')) $('adminTalleresKpiTotal').textContent = String(kpis.total);
      if ($('adminTalleresKpiActive')) $('adminTalleresKpiActive').textContent = String(kpis.activos);
      if ($('adminTalleresKpiInactive')) $('adminTalleresKpiInactive').textContent = String(kpis.inactivos);
      if ($('adminTalleresKpiArchived')) $('adminTalleresKpiArchived').textContent = String(kpis.archivados);
      if ($('adminTalleresFilterAllBtn')) $('adminTalleresFilterAllBtn').classList.toggle('is-active', state.talleresUi.filter === 'todos');
      if ($('adminTalleresFilterActiveBtn')) $('adminTalleresFilterActiveBtn').classList.toggle('is-active', state.talleresUi.filter === 'activos');
      if ($('adminTalleresFilterInactiveBtn')) $('adminTalleresFilterInactiveBtn').classList.toggle('is-active', state.talleresUi.filter === 'inactivos');
      if ($('adminTalleresFilterArchivedBtn')) $('adminTalleresFilterArchivedBtn').classList.toggle('is-active', state.talleresUi.filter === 'archivados');
      renderAdminTalleresList();
      renderTallerDetailPanel();
      renderTallerEditorPanel();
    }

    function renderAdminTalleresList() {
      const host = $('adminTalleresList');
      if (!host) return;
      const rows = getVisibleTalleres();
      const filter = String(state.talleresUi.filter || 'activos').trim();
      if ($('adminTalleresListTitle')) $('adminTalleresListTitle').textContent = filter === 'todos' ? 'Todos los talleres' : (filter === 'archivados' ? 'Talleres archivados' : (filter === 'inactivos' ? 'Talleres inactivos' : 'Talleres activos'));
      if ($('adminTalleresListMeta')) $('adminTalleresListMeta').textContent = rows.length + ' taller(es) visibles en esta vista.';
      if (!rows.length) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>No hay talleres para mostrar.</strong><div class="subtle">Crea el catÃ¡logo base del taller para pasar despuÃ©s a inscripciones y planeaciones.</div></div></div>';
        return;
      }
      host.innerHTML = [
        '<div class="admin-alumnos-table">',
          '<div class="admin-talleres-list-header">',
            '<div>ID</div>',
            '<div>Taller</div>',
            '<div>Materia</div>',
            '<div>Responsable</div>',
            '<div>Estado</div>',
            '<div>Acciones</div>',
          '</div>',
          rows.map((row) => {
            const selected = String(state.talleresUi.selectedTallerId || '').trim() === row.taller_id;
            const materia = (state.catalogos.materias || []).find((item) => item.materia_id === row.materia_id);
            const facilitador = getFacilitadorById(row.facilitador_id);
            return [
              '<article class="admin-talleres-row' + (selected ? ' is-selected' : '') + '" onclick="selectTaller(\'' + escapeJsAttrValue(row.taller_id) + '\')">',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(row.taller_id) + '</div></div>',
                '<div class="admin-alumnos-title"><strong>' + escapeHtml(row.nombre || row.taller_id) + '</strong><div class="mini">' + escapeHtml(row.archivado_at ? ('Archivado ' + formatFechaHumana(row.archivado_at)) : 'Listo para recibir alumnos despuÃ©s') + '</div></div>',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml((materia && materia.nombre) || 'Sin materia base') + '</div></div>',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml((facilitador && (facilitador.nombre_mostrado || facilitador.nombre_completo)) || 'Sin responsable') + '</div></div>',
                '<div class="admin-alumnos-cell"><span class="admin-alumnos-badge ' + getTallerStatusBadgeClass(row.estatus) + '">' + escapeHtml(getTallerStatusLabel(row.estatus)) + '</span></div>',
                '<div class="admin-alumnos-actions"><button class="btn-ghost" type="button" onclick="event.stopPropagation(); openTallerEditor(\'edit\', \'' + escapeJsAttrValue(row.taller_id) + '\')">Editar</button></div>',
              '</article>'
            ].join('');
          }).join(''),
        '</div>'
      ].join('');
    }

    function renderTallerDetailPanel() {
      const host = $('adminTallerDetailPanel');
      if (!host) return;
      const taller = getTallerById(state.talleresUi.selectedTallerId);
      if (!taller) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>Selecciona un taller</strong><div class="subtle">AquÃ­ verÃ¡s su materia base, responsable y el acceso rÃ¡pido para editar el catÃ¡logo.</div></div></div>';
        return;
      }
      const materia = (state.catalogos.materias || []).find((item) => item.materia_id === taller.materia_id);
      const facilitador = getFacilitadorById(taller.facilitador_id);
      const canManage = canManageTalleresCatalog();
      const activeMembers = getActiveTallerAlumnoRows(taller.taller_id);
      const representedGroups = Array.from(new Set(activeMembers.map((row) => String((row.alumno && row.alumno.grupo_id) || '').trim()).filter(Boolean)));
      const membershipOpen = !!state.talleresUi.membershipOpen && String(state.talleresUi.selectedTallerId || '').trim() === taller.taller_id;
      const selectedIds = new Set((state.talleresUi.membershipSelectedAlumnoIds || []).map((item) => String(item || '').trim()).filter(Boolean));
      const visibleCandidates = membershipOpen ? getVisibleTallerCandidateAlumnos() : [];
      host.hidden = false;
      host.innerHTML = [
        '<div class="admin-facilitadores-summary">',
          '<div class="admin-facilitadores-identity">',
            '<div>',
              '<strong>' + escapeHtml(taller.nombre || taller.taller_id) + '</strong>',
              '<div class="mini">' + escapeHtml(taller.taller_id) + '</div>',
            '</div>',
            '<span class="admin-alumnos-badge ' + getTallerStatusBadgeClass(taller.estatus) + '">' + escapeHtml(getTallerStatusLabel(taller.estatus)) + '</span>',
          '</div>',
          '<div class="admin-facilitadores-inline-actions">',
            (canManage ? '<button class="btn-ghost" type="button" onclick="openTallerEditor(\'edit\', \'' + escapeJsAttrValue(taller.taller_id) + '\')">Editar ficha</button>' : ''),
            (canManage && taller.estatus === 'activo' ? '<button class="btn-ghost" type="button" onclick="toggleTallerStatus(this, \'' + escapeJsAttrValue(taller.taller_id) + '\', \'inactivo\')">Desactivar</button>' : ''),
            (canManage && taller.estatus === 'inactivo' ? '<button class="btn-primary" type="button" onclick="toggleTallerStatus(this, \'' + escapeJsAttrValue(taller.taller_id) + '\', \'activo\')">Activar</button>' : ''),
            (canManage && taller.estatus === 'archivado' ? '<button class="btn-primary" type="button" onclick="reactivateTaller(this, \'' + escapeJsAttrValue(taller.taller_id) + '\')">Reactivar</button>' : ''),
            (canManage && taller.estatus !== 'archivado' ? '<button class="btn-accent" type="button" onclick="archiveTaller(this, \'' + escapeJsAttrValue(taller.taller_id) + '\')">Archivar</button>' : ''),
          '</div>',
          '<div class="admin-facilitadores-meta-grid">',
            '<div class="admin-alumnos-readonly"><span>Materia base</span><strong>' + escapeHtml((materia && materia.nombre) || 'Sin materia base') + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Responsable</span><strong>' + escapeHtml((facilitador && (facilitador.nombre_mostrado || facilitador.nombre_completo)) || 'Sin responsable') + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Ãšltima actualizaciÃ³n</span><strong>' + escapeHtml(taller.fecha_actualizacion ? formatFechaHumana(taller.fecha_actualizacion) : 'Sin dato') + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Alumnos inscritos</span><strong>' + escapeHtml(String(activeMembers.length)) + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Grupos mezclados</span><strong>' + escapeHtml(representedGroups.length ? String(representedGroups.length) : '0') + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Siguiente paso</span><strong>Inscribir alumnos</strong></div>',
          '</div>',
          '<div class="admin-taller-membership">',
            '<div class="admin-taller-membership-head">',
              '<div class="admin-taller-membership-copy">',
                '<h4>Alumnos del taller</h4>',
                '<div class="subtle">Selecciona alumnos activos de cualquier grupo sin moverlos de su grupo escolar.</div>',
              '</div>',
              '<div class="admin-taller-membership-actions">',
                (canManage && taller.estatus !== 'archivado' && !membershipOpen ? '<button class="btn-primary" type="button" onclick="openTallerMembershipEditor(\'' + escapeJsAttrValue(taller.taller_id) + '\')">Inscribir alumnos</button>' : ''),
                (canManage && membershipOpen ? '<button class="btn-ghost" type="button" onclick="cancelTallerMembershipEditor()">Cancelar</button>' : ''),
              '</div>',
            '</div>',
            '<div class="admin-taller-membership-summary">',
              (activeMembers.length
                ? '<div class="admin-taller-member-cloud">' + activeMembers.map((row) => {
                    const alumno = row.alumno || {};
                    return '<span class="admin-taller-member-chip"><span>' + escapeHtml(alumno.nombre_mostrado || alumno.nombre_completo || row.alumno_id) + '</span><span class="mini">' + escapeHtml(getGrupoNombre(alumno.grupo_id)) + '</span></span>';
                  }).join('') + '</div>'
                : '<div class="admin-alumnos-empty" style="min-height:132px;"><div><strong>Sin alumnos inscritos.</strong><div class="subtle">Usa el acceso rÃ¡pido para armar la mezcla del taller con alumnos de distintos grupos.</div></div></div>'),
            '</div>',
            (membershipOpen
              ? '<div class="admin-taller-membership-head">' +
                  '<div class="admin-taller-membership-tools">' +
                    '<label class="field" for="adminTallerMembershipSearch"><span>Buscar alumno</span><input id="adminTallerMembershipSearch" type="search" placeholder="Nombre, matrÃ­cula o grupo"></label>' +
                    '<label class="field" for="adminTallerMembershipGroup"><span>Grupo</span><select id="adminTallerMembershipGroup"></select></label>' +
                  '</div>' +
                  '<div class="admin-taller-membership-actions">' +
                    '<button class="btn-ghost" type="button" onclick="toggleAllVisibleTallerAlumnos(true)">Seleccionar visibles</button>' +
                    '<button class="btn-ghost" type="button" onclick="toggleAllVisibleTallerAlumnos(false)">Limpiar visibles</button>' +
                    '<button id="adminTallerMembershipSaveBtn" class="btn-primary" type="button" onclick="saveTallerMemberships(this)">Guardar alumnos</button>' +
                  '</div>' +
                '</div>' +
                '<div class="subtle">' + escapeHtml(String(selectedIds.size)) + ' alumno(s) listos para este taller.</div>' +
                (visibleCandidates.length
                  ? '<div class="checklist admin-taller-membership-candidates">' + visibleCandidates.map((row) => {
                      const alumnoId = String(row.alumno_id || '').trim();
                      return '<label class="admin-taller-membership-candidate">' +
                        '<input type="checkbox" value="' + escapeHtml(alumnoId) + '" ' + (selectedIds.has(alumnoId) ? 'checked' : '') + ' onchange="toggleTallerAlumnoDraft(\'' + escapeJsAttrValue(alumnoId) + '\', this.checked)">' +
                        '<span><strong>' + escapeHtml(row.nombre_mostrado || row.nombre_completo || alumnoId) + '</strong><span class="mini">' + escapeHtml((row.matricula || 'Sin matrÃ­cula') + ' Â· ' + getGrupoNombre(row.grupo_id)) + '</span></span>' +
                      '</label>';
                    }).join('') + '</div>'
                  : '<div class="admin-alumnos-empty" style="min-height:132px;"><div><strong>No hay alumnos para esta bÃºsqueda.</strong><div class="subtle">Ajusta el grupo o el texto para seguir inscribiendo.</div></div></div>')
              : ''),
          '</div>',
        '</div>'
      ].join('');
      if (membershipOpen) {
        fillSelect($('adminTallerMembershipGroup'), state.catalogos.grupos || [], (row) => row.grupo_id, (row) => getGrupoDisplayName(row), 'Todos los grupos');
        if ($('adminTallerMembershipGroup')) $('adminTallerMembershipGroup').value = state.talleresUi.membershipGroup || '';
        if ($('adminTallerMembershipSearch')) $('adminTallerMembershipSearch').value = state.talleresUi.membershipSearch || '';
        if ($('adminTallerMembershipSearch')) $('adminTallerMembershipSearch').addEventListener('input', (event) => {
          state.talleresUi.membershipSearch = event.currentTarget.value;
          renderAdminTalleresModule();
        });
        if ($('adminTallerMembershipGroup')) $('adminTallerMembershipGroup').addEventListener('change', (event) => {
          state.talleresUi.membershipGroup = event.currentTarget.value;
          renderAdminTalleresModule();
        });
      }
    }

    function renderTallerEditorPanel() {
      const panel = $('adminTallerEditorPanel');
      if (!panel) return;
      panel.hidden = !state.talleresUi.editorOpen;
      if (panel.hidden) return;
      const mode = state.talleresUi.editorMode || 'new';
      const editor = state.talleresUi.editor || createEmptyTallerEditorState();
      if ($('adminTallerEditorTitle')) $('adminTallerEditorTitle').textContent = mode === 'edit' ? 'Editar taller' : 'Nuevo taller';
      if ($('adminTallerIdInput')) {
        $('adminTallerIdInput').value = editor.taller_id || '';
        $('adminTallerIdInput').disabled = mode === 'edit';
      }
      if ($('adminTallerNombreInput')) $('adminTallerNombreInput').value = editor.nombre || '';
      fillSelect($('adminTallerMateriaInput'), getTallerMateriaOptions(), (item) => item.materia_id, (item) => item.nombre || item.materia_id, 'Sin materia base');
      fillSelect($('adminTallerFacilitadorInput'), getTallerFacilitadorOptions(), (item) => item.facilitador_id, (item) => item.nombre_mostrado || item.nombre_completo || item.facilitador_id, 'Sin responsable');
      if ($('adminTallerMateriaInput')) $('adminTallerMateriaInput').value = editor.materia_id || '';
      if ($('adminTallerFacilitadorInput')) $('adminTallerFacilitadorInput').value = editor.facilitador_id || '';
      if ($('adminTallerStatusInput')) $('adminTallerStatusInput').value = editor.estatus || 'activo';
    }

    function openTallerEditor(mode, tallerId) {
      const nextMode = mode === 'edit' ? 'edit' : 'new';
      const taller = nextMode === 'edit'
        ? getTallerById(String(tallerId || '').trim())
        : null;
      closeTallerMembershipEditor();
      state.talleresUi.editorMode = nextMode;
      state.talleresUi.editorOpen = true;
      state.talleresUi.selectedTallerId = taller ? taller.taller_id : state.talleresUi.selectedTallerId;
      state.talleresUi.editor = taller ? {
        taller_id: taller.taller_id,
        nombre: taller.nombre || '',
        materia_id: taller.materia_id || '',
        facilitador_id: taller.facilitador_id || '',
        estatus: taller.estatus || 'activo'
      } : createEmptyTallerEditorState();
      renderAdminTalleresModule();
      focusAdminFacilitadorPanel('adminTallerEditorPanel', nextMode === 'edit' ? 'adminTallerNombreInput' : 'adminTallerIdInput');
    }

    function selectTaller(tallerId) {
      const nextId = String(tallerId || '').trim();
      if (String(state.talleresUi.selectedTallerId || '').trim() !== nextId) {
        closeTallerMembershipEditor();
      }
      state.talleresUi.selectedTallerId = nextId;
      renderAdminTalleresModule();
      if ((state.catalogos.alumno_talleres || []).some((row) => String(row.taller_id || '').trim() === nextId && row.activa !== false) && getMissingCatalogBlocks(['alumnos', 'grupos']).length) {
        ensureTallerMembershipCatalogosAvailable({ render: true }).catch(() => {});
      }
      focusAdminFacilitadorPanel('adminTallerDetailPanel');
    }

    function cancelTallerMembershipEditor() {
      closeTallerMembershipEditor();
      renderAdminTalleresModule();
    }

    async function saveTallerMemberships(button) {
      const tallerId = String(state.talleresUi.selectedTallerId || '').trim();
      if (!tallerId) throw new Error('Selecciona un taller.');
      const alumnosIds = (state.talleresUi.membershipSelectedAlumnoIds || []).map((item) => String(item || '').trim()).filter(Boolean);
      await handleAction('syncTallerAlumnos', async () => {
        const data = await api('syncTallerAlumnos', {
          taller_id: tallerId,
          alumnos_ids: alumnosIds,
          request_id: uid('TALREL')
        });
        replaceTallerAlumnoRelations(tallerId, data.relaciones || []);
        closeTallerMembershipEditor();
        renderAdminModuleSurface('talleres');
        setBanner('Alumnos del taller actualizados.', 'success');
      }, {
        button,
        key: buildActionKey('syncTallerAlumnos', [tallerId, alumnosIds.join('|')]),
        busyText: 'Guardando...'
      });
    }

    async function saveTallerEditor(button) {
      if (!canManageTalleresCatalog()) throw new Error('No tienes permiso para editar talleres.');
      const mode = state.talleresUi.editorMode || 'new';
      const payload = {
        taller_id: $('adminTallerIdInput') ? $('adminTallerIdInput').value.trim() : '',
        nombre: $('adminTallerNombreInput') ? $('adminTallerNombreInput').value.trim() : '',
        materia_id: $('adminTallerMateriaInput') ? $('adminTallerMateriaInput').value : '',
        facilitador_id: $('adminTallerFacilitadorInput') ? $('adminTallerFacilitadorInput').value : '',
        estatus: $('adminTallerStatusInput') ? $('adminTallerStatusInput').value : 'activo',
        request_id: uid('TAL')
      };
      if (!payload.taller_id) throw new Error('Captura el taller ID.');
      if (!payload.nombre) throw new Error('Captura el nombre del taller.');
      await handleAction('guardarTaller', async () => {
        const data = await api('guardarTaller', payload);
        if (data && data.taller) applySavedTallerCatalogRow(data.taller);
        closeTallerEditor();
        state.talleresUi.selectedTallerId = data.taller_id || payload.taller_id;
        renderAdminModuleSurface('talleres');
        setBanner(mode === 'new' ? 'Taller creado.' : 'Taller actualizado.', 'success');
      }, {
        button,
        key: buildActionKey('guardarTaller', [payload.taller_id, mode]),
        busyText: mode === 'new' ? 'Creando...' : 'Guardando...'
      });
    }

    async function toggleTallerStatus(button, tallerId, nextStatus) {
      const row = getTallerById(tallerId);
      if (!row) throw new Error('Taller no encontrado.');
      await handleAction('toggleTallerStatus', async () => {
        const data = await api('guardarTaller', {
          taller_id: row.taller_id,
          estatus: nextStatus,
          request_id: uid('TALTOG')
        });
        if (data && data.taller) applySavedTallerCatalogRow(data.taller);
        renderAdminModuleSurface('talleres');
        setBanner(nextStatus === 'activo' ? 'Taller activado.' : 'Taller desactivado.', 'success');
      }, {
        button,
        key: buildActionKey('toggleTallerStatus', [tallerId, nextStatus]),
        busyText: nextStatus === 'activo' ? 'Activando...' : 'Desactivando...'
      });
    }

    async function archiveTaller(button, tallerId) {
      if (!window.confirm('Esto archivarÃ¡ el taller del catÃ¡logo base.')) return;
      await handleAction('archivarTaller', async () => {
        await api('archivarTaller', {
          taller_id: tallerId,
          request_id: uid('TALARC')
        });
        upsertCatalogEntityRow('talleres_admin', 'taller_id', Object.assign({}, getTallerById(tallerId) || { taller_id: tallerId }, { estatus: 'archivado', activo: false }));
        renderAdminModuleSurface('talleres');
        setBanner('Taller archivado.', 'success');
      }, {
        button,
        key: buildActionKey('archivarTaller', [tallerId]),
        busyText: 'Archivando...'
      });
    }

    async function reactivateTaller(button, tallerId) {
      const row = getTallerById(tallerId);
      if (!row) throw new Error('Taller no encontrado.');
      await handleAction('reactivateTaller', async () => {
        const data = await api('guardarTaller', {
          taller_id: row.taller_id,
          estatus: 'activo',
          request_id: uid('TALREA')
        });
        if (data && data.taller) applySavedTallerCatalogRow(data.taller);
        renderAdminModuleSurface('talleres');
        setBanner('Taller reactivado.', 'success');
      }, {
        button,
        key: buildActionKey('reactivateTaller', [tallerId]),
        busyText: 'Reactivando...'
      });
    }

    function bindAdminTalleresEvents() {
      if ($('adminTalleresSearch')) $('adminTalleresSearch').addEventListener('input', (event) => {
        state.talleresUi.search = event.currentTarget.value;
        scheduleUiDebounce('admin-talleres-search', () => renderAdminTalleresModule());
      });
      if ($('adminTalleresFilterAllBtn')) $('adminTalleresFilterAllBtn').addEventListener('click', () => {
        state.talleresUi.filter = 'todos';
        renderAdminTalleresModule();
      });
      if ($('adminTalleresFilterActiveBtn')) $('adminTalleresFilterActiveBtn').addEventListener('click', () => {
        state.talleresUi.filter = 'activos';
        renderAdminTalleresModule();
      });
      if ($('adminTalleresFilterInactiveBtn')) $('adminTalleresFilterInactiveBtn').addEventListener('click', () => {
        state.talleresUi.filter = 'inactivos';
        renderAdminTalleresModule();
      });
      if ($('adminTalleresFilterArchivedBtn')) $('adminTalleresFilterArchivedBtn').addEventListener('click', () => {
        state.talleresUi.filter = 'archivados';
        renderAdminTalleresModule();
      });
      if ($('adminTallerNewBtn')) $('adminTallerNewBtn').addEventListener('click', () => openTallerEditor('new'));
      if ($('adminTallerCancelBtn')) $('adminTallerCancelBtn').addEventListener('click', () => {
        closeTallerEditor();
        renderAdminTalleresModule();
      });
      if ($('adminTallerSaveBtn')) $('adminTallerSaveBtn').addEventListener('click', (event) => saveTallerEditor(event.currentTarget));
    }

    function getAdminMateriasCatalog() {
      const revision = getCatalogosRevision();
      if (adminCatalogMemo.materias.revision === revision) {
        return adminCatalogMemo.materias.result;
      }
      const rows = Array.isArray(state.catalogos.materias_admin) && state.catalogos.materias_admin.length
        ? state.catalogos.materias_admin
        : (state.catalogos.materias || []);
      const result = rows.map((row) => {
        const archived = String(row.archivado_at || '').trim();
        const rawStatus = String(row.estatus || '').trim().toLowerCase();
        const status = archived
          ? 'archivada'
          : (rawStatus === 'inactiva'
            ? 'inactiva'
            : ((row.activo === false || row.activo === 'no' || row.activo === 'false') ? 'inactiva' : 'activa'));
        return {
          materia_id: String(row.materia_id || '').trim(),
          nombre: String(row.nombre || '').trim(),
          tipo: String(row.tipo || '').trim(),
          activo: status === 'activa',
          admite_submaterias: isTruthyValue(row.admite_submaterias),
          estatus: status,
          orden_visual: Number(row.orden_visual || 0),
          fecha_actualizacion: String(row.fecha_actualizacion || '').trim(),
          archivado_at: archived,
          archivado_por: String(row.archivado_por || '').trim()
        };
      }).sort((a, b) => {
        const orderDiff = Number(a.orden_visual || 0) - Number(b.orden_visual || 0);
        if (orderDiff) return orderDiff;
        return String(a.nombre || a.materia_id).localeCompare(String(b.nombre || b.materia_id), 'es');
      });
      adminCatalogMemo.materias = { revision, result };
      return result;
    }

    function applySavedMateriaCatalogRow(row) {
      if (!row || !row.materia_id) return null;
      upsertCatalogEntityRow('materias_admin', 'materia_id', row);
      upsertCatalogEntityRow('materias', 'materia_id', row);
      return getAdminMateriasCatalog().find((item) => item.materia_id === row.materia_id) || null;
    }

    function applyPatchedMateriaCatalogRow(materiaId, patch = {}) {
      const current = getMateriaBaseRows().find((item) => item.materia_id === String(materiaId || '').trim());
      if (!current) return null;
      return applySavedMateriaCatalogRow(Object.assign({}, current, patch));
    }

    function applySavedSubmateriaCatalogRow(row) {
      if (!row || !row.submateria_id) return null;
      upsertCatalogEntityRow('submaterias_admin', 'submateria_id', row);
      upsertCatalogEntityRow('submaterias', 'submateria_id', row);
      return getAdminSubmateriasCatalog().find((item) => item.submateria_id === row.submateria_id) || null;
    }

    function applyPatchedSubmateriaCatalogRow(submateriaId, patch = {}) {
      const current = getAdminSubmateriasCatalog().find((item) => item.submateria_id === String(submateriaId || '').trim());
      if (!current) return null;
      return applySavedSubmateriaCatalogRow(Object.assign({}, current, patch));
    }

    function getAdminSubmateriasCatalog() {
      const revision = getCatalogosRevision();
      if (adminCatalogMemo.submaterias.revision === revision) {
        return adminCatalogMemo.submaterias.result;
      }
      const rows = Array.isArray(state.catalogos.submaterias_admin) && state.catalogos.submaterias_admin.length
        ? state.catalogos.submaterias_admin
        : (state.catalogos.submaterias || []);
      const result = rows.map((row) => {
        const archived = String(row.archivado_at || '').trim();
        const rawStatus = String(row.estatus || '').trim().toLowerCase();
        const status = archived ? 'archivada' : (rawStatus === 'inactiva' ? 'inactiva' : 'activa');
        return {
          submateria_id: String(row.submateria_id || '').trim(),
          materia_id: String(row.materia_id || '').trim(),
          nombre: String(row.nombre || '').trim(),
          estatus: status,
          orden: Number(row.orden || 0),
          fecha_actualizacion: String(row.fecha_actualizacion || '').trim(),
          archivado_at: archived,
          archivado_por: String(row.archivado_por || '').trim()
        };
      }).sort((a, b) => {
        if (String(a.materia_id || '') !== String(b.materia_id || '')) {
          return String(a.materia_id || '').localeCompare(String(b.materia_id || ''), 'es');
        }
        const orderDiff = Number(a.orden || 0) - Number(b.orden || 0);
        if (orderDiff) return orderDiff;
        return String(a.nombre || a.submateria_id).localeCompare(String(b.nombre || b.submateria_id), 'es');
      });
      adminCatalogMemo.submaterias = { revision, result };
      return result;
    }

    function getMateriaBaseRows() {
      return getAdminMateriasCatalog();
    }

    function getSubmateriasForMateria(materiaId) {
      const id = String(materiaId || '').trim();
      return getAdminSubmateriasCatalog().filter((row) => row.materia_id === id);
    }

    function getSelectedMateria() {
      const selectedId = String(state.materiasUi.selectedMateriaId || '').trim();
      return getMateriaBaseRows().find((row) => row.materia_id === selectedId) || null;
    }

    function getMateriaSearchText(row) {
      const variants = getSubmateriasForMateria(row.materia_id).map((item) => item.nombre + ' ' + item.submateria_id).join(' ');
      return [
        row.materia_id,
        row.nombre,
        row.tipo,
        variants
      ].join(' ').toLowerCase();
    }

    function materiaHasVariants(row) {
      return !!(row && (row.admite_submaterias || getSubmateriasForMateria(row.materia_id).length));
    }

    function getFilteredMaterias() {
      const filter = String(state.materiasUi.filter || 'activas').trim();
      const query = String(state.materiasUi.search || '').trim().toLowerCase();
      return getMateriaBaseRows().filter((row) => {
        if (filter === 'activas' && row.estatus !== 'activa') return false;
        if (filter === 'archivadas' && row.estatus !== 'archivada') return false;
        if (filter === 'con_submaterias' && !materiaHasVariants(row)) return false;
        if (!query) return true;
        return getMateriaSearchText(row).includes(query);
      });
    }

    function getVisibleMaterias() {
      return getFilteredMaterias();
    }

    function getMateriaStatusLabel(status) {
      if (status === 'archivada') return 'Archivada';
      if (status === 'inactiva') return 'Inactiva';
      return 'Activa';
    }

    function getMateriaStatusBadgeClass(status) {
      if (status === 'archivada') return 'is-archived';
      if (status === 'inactiva') return 'is-inactive';
      return 'is-active';
    }

    function getMateriaStructureLabel(row) {
      return materiaHasVariants(row) ? 'Con variantes' : 'Simple';
    }

    function getMateriasKpis() {
      const rows = getMateriaBaseRows();
      return {
        total: rows.length,
        activas: rows.filter((row) => row.estatus === 'activa').length,
        conSubmaterias: rows.filter((row) => materiaHasVariants(row)).length,
        archivadas: rows.filter((row) => row.estatus === 'archivada').length
      };
    }

    function closeMateriaEditor() {
      state.materiasUi.editorOpen = false;
      state.materiasUi.editorMode = 'new';
      state.materiasUi.editor = createEmptyMateriaEditorState();
    }

    function closeSubmateriaEditor() {
      state.materiasUi.subEditorOpen = false;
      state.materiasUi.subEditorMode = 'new';
      state.materiasUi.subEditor = createEmptySubmateriaEditorState();
    }

    function syncAdminMateriasModule() {
      const visible = getVisibleMaterias();
      const selected = String(state.materiasUi.selectedMateriaId || '').trim();
      if (selected && visible.some((row) => row.materia_id === selected)) return;
      state.materiasUi.selectedMateriaId = visible.length ? visible[0].materia_id : '';
      if (!visible.length) {
        closeMateriaEditor();
        closeSubmateriaEditor();
      }
    }

    function getAdminMateriasModuleTemplate() {
      return [
        '<article class="admin-toolbar admin-alumnos-module admin-materias-module">',
          '<div class="admin-toolbar-head admin-alumnos-head">',
            '<div class="admin-alumnos-head-copy">',
              '<h3>Materias</h3>',
              '<p class="subtle">Administra el catÃ¡logo base y sus variantes operativas.</p>',
            '</div>',
            '<div class="admin-alumnos-head-actions">',
              '<label class="admin-alumnos-search" for="adminMateriasSearch">',
                '<span>Buscar</span>',
                '<input id="adminMateriasSearch" type="search" placeholder="Buscar materia o variante">',
              '</label>',
              '<button id="adminMateriaNewBtn" class="btn-primary" type="button">Nueva materia</button>',
            '</div>',
          '</div>',
          '<div class="admin-materias-kpis">',
            '<div class="admin-materias-kpi"><strong id="adminMateriasKpiTotal">0</strong><span>Total materias</span></div>',
            '<div class="admin-materias-kpi"><strong id="adminMateriasKpiActive">0</strong><span>Activas</span></div>',
            '<div class="admin-materias-kpi"><strong id="adminMateriasKpiVariants">0</strong><span>Con variantes</span></div>',
            '<div class="admin-materias-kpi"><strong id="adminMateriasKpiArchived">0</strong><span>Archivadas</span></div>',
          '</div>',
          '<div class="admin-alumnos-filterbar">',
            '<div class="admin-alumnos-filterchips">',
              '<button id="adminMateriasFilterAllBtn" class="btn-ghost" type="button">Todas</button>',
              '<button id="adminMateriasFilterActiveBtn" class="btn-ghost" type="button">Activas</button>',
              '<button id="adminMateriasFilterArchivedBtn" class="btn-ghost" type="button">Archivadas</button>',
              '<button id="adminMateriasFilterVariantsBtn" class="btn-ghost" type="button">Con submaterias</button>',
            '</div>',
          '</div>',
          '<div class="admin-alumnos-layout">',
            '<section class="admin-alumnos-main">',
              '<div class="admin-alumnos-section-head">',
                '<div>',
                  '<h4 id="adminMateriasListTitle">Materias activas</h4>',
                  '<div id="adminMateriasListMeta" class="subtle">CatÃ¡logo base, estructura y orden visual.</div>',
                '</div>',
              '</div>',
              '<div id="adminMateriasList" class="admin-alumnos-list"></div>',
            '</section>',
            '<aside class="admin-alumnos-side">',
              '<section id="adminMateriaDetailPanel" class="admin-alumnos-panel"></section>',
              '<section id="adminMateriaEditorPanel" class="admin-alumnos-panel" hidden>',
                '<div class="admin-alumnos-panel-head">',
                  '<div>',
                    '<h4 id="adminMateriaEditorTitle">Nueva materia</h4>',
                    '<div class="subtle">Define catÃ¡logo base, estructura y estatus operativo.</div>',
                  '</div>',
                '</div>',
                '<div class="admin-alumnos-editor-grid">',
                  '<label class="field">',
                    '<span>Materia ID</span>',
                    '<input id="adminMateriaIdInput" type="text" maxlength="50" placeholder="Ej. MAT-010">',
                  '</label>',
                  '<label class="field">',
                    '<span>Estatus</span>',
                    '<select id="adminMateriaStatusInput">',
                      '<option value="activa">Activa</option>',
                      '<option value="inactiva">Inactiva</option>',
                      '<option value="archivada">Archivada</option>',
                    '</select>',
                  '</label>',
                  '<label class="field admin-alumnos-field-full">',
                    '<span>Nombre</span>',
                    '<input id="adminMateriaNombreInput" type="text" maxlength="100" placeholder="Nombre visible de la materia">',
                  '</label>',
                  '<label class="field admin-alumnos-field-full">',
                    '<span>Estructura</span>',
                    '<select id="adminMateriaVariantsInput">',
                      '<option value="no">Simple</option>',
                      '<option value="si">Con submaterias</option>',
                    '</select>',
                  '</label>',
                '</div>',
                '<div class="actions compact admin-alumnos-panel-actions">',
                  '<button id="adminMateriaCancelBtn" class="btn-ghost" type="button">Cancelar</button>',
                  '<button id="adminMateriaSaveBtn" class="btn-primary" type="button">Guardar</button>',
                '</div>',
              '</section>',
            '</aside>',
          '</div>',
        '</article>'
      ].join('');
    }

    function renderAdminMateriasModule() {
      const panel = $('admin-panel-materias');
      if (!panel || !canUseAdminShell()) return;
      if (panel.dataset.ready !== '1') {
        panel.innerHTML = getAdminMateriasModuleTemplate();
        panel.dataset.ready = '1';
        bindAdminMateriasEvents();
      }
      syncAdminMateriasModule();
      const kpis = getMateriasKpis();
      if ($('adminMateriasSearch')) $('adminMateriasSearch').value = state.materiasUi.search || '';
      if ($('adminMateriasKpiTotal')) $('adminMateriasKpiTotal').textContent = String(kpis.total);
      if ($('adminMateriasKpiActive')) $('adminMateriasKpiActive').textContent = String(kpis.activas);
      if ($('adminMateriasKpiVariants')) $('adminMateriasKpiVariants').textContent = String(kpis.conSubmaterias);
      if ($('adminMateriasKpiArchived')) $('adminMateriasKpiArchived').textContent = String(kpis.archivadas);
      if ($('adminMateriasFilterAllBtn')) $('adminMateriasFilterAllBtn').classList.toggle('is-active', state.materiasUi.filter === 'todas');
      if ($('adminMateriasFilterActiveBtn')) $('adminMateriasFilterActiveBtn').classList.toggle('is-active', state.materiasUi.filter === 'activas');
      if ($('adminMateriasFilterArchivedBtn')) $('adminMateriasFilterArchivedBtn').classList.toggle('is-active', state.materiasUi.filter === 'archivadas');
      if ($('adminMateriasFilterVariantsBtn')) $('adminMateriasFilterVariantsBtn').classList.toggle('is-active', state.materiasUi.filter === 'con_submaterias');
      renderAdminMateriasList();
      renderAdminMateriaDetail();
      renderMateriaEditor();
    }

    function renderAdminMateriasList() {
      const host = $('adminMateriasList');
      if (!host) return;
      const rows = getVisibleMaterias();
      const filter = String(state.materiasUi.filter || 'activas').trim();
      if ($('adminMateriasListTitle')) {
        $('adminMateriasListTitle').textContent = filter === 'todas'
          ? 'Todas las materias'
          : (filter === 'archivadas'
            ? 'Materias archivadas'
            : (filter === 'con_submaterias' ? 'Materias con submaterias' : 'Materias activas'));
      }
      if ($('adminMateriasListMeta')) $('adminMateriasListMeta').textContent = rows.length + ' materia(s) visibles en esta vista.';
      if (!rows.length) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>No hay materias para mostrar.</strong><div class="subtle">Ajusta el filtro o crea una materia base para empezar.</div></div></div>';
        return;
      }
      host.innerHTML = [
        '<div class="admin-alumnos-table">',
          '<div class="admin-materias-list-header">',
            '<div>Orden</div>',
            '<div>Materia</div>',
            '<div>Tipo</div>',
            '<div>Estado</div>',
            '<div>Submaterias</div>',
            '<div>Acciones</div>',
          '</div>',
          rows.map((row) => {
            const selected = String(state.materiasUi.selectedMateriaId || '').trim() === row.materia_id;
            const subRows = getSubmateriasForMateria(row.materia_id);
            const actions = [
              '<button class="btn-ghost" type="button" onclick="event.stopPropagation(); openMateriaEditor(\'edit\', \'' + escapeJsAttrValue(row.materia_id) + '\')">Editar</button>',
              '<button class="btn-ghost" type="button" onclick="event.stopPropagation(); moveMateria(this, \'' + escapeJsAttrValue(row.materia_id) + '\', \'up\')">â†‘</button>',
              '<button class="btn-ghost" type="button" onclick="event.stopPropagation(); moveMateria(this, \'' + escapeJsAttrValue(row.materia_id) + '\', \'down\')">â†“</button>',
              '<button class="btn-secondary" type="button" onclick="event.stopPropagation(); selectMateria(\'' + escapeJsAttrValue(row.materia_id) + '\')">Ver panel</button>'
            ];
            return [
              '<article class="admin-materias-row' + (selected ? ' is-selected' : '') + '" onclick="selectMateria(\'' + escapeJsAttrValue(row.materia_id) + '\')">',
                '<div class="admin-alumnos-cell"><span class="admin-materias-order">' + escapeHtml(String(row.orden_visual || 0)) + '</span></div>',
                '<div class="admin-alumnos-title"><strong>' + escapeHtml(row.nombre || row.materia_id) + '</strong><div class="mini">' + escapeHtml(row.materia_id) + '</div></div>',
                '<div class="admin-alumnos-cell"><div class="admin-materias-structure"><span class="admin-alumnos-badge">' + escapeHtml(getMateriaStructureLabel(row)) + '</span></div></div>',
                '<div class="admin-alumnos-cell"><span class="admin-alumnos-badge ' + getMateriaStatusBadgeClass(row.estatus) + '">' + escapeHtml(getMateriaStatusLabel(row.estatus)) + '</span></div>',
                '<div class="admin-alumnos-cell"><div class="mini">' + escapeHtml(String(subRows.length)) + ' variante(s)</div></div>',
                '<div class="admin-alumnos-actions">' + actions.join('') + '</div>',
              '</article>'
            ].join('');
          }).join(''),
        '</div>'
      ].join('');
    }

    function renderAdminMateriaDetail() {
      const host = $('adminMateriaDetailPanel');
      if (!host) return;
      const materia = getSelectedMateria();
      if (!materia) {
        host.innerHTML = '<div class="admin-alumnos-empty"><div><strong>Selecciona una materia</strong><div class="subtle">AquÃ­ aparecerÃ¡ su estructura, variantes y acciones operativas.</div></div></div>';
        return;
      }
      const subRows = getSubmateriasForMateria(materia.materia_id);
      const canManage = canUseAdminShell();
      host.hidden = false;
      host.innerHTML = [
        '<div class="admin-materias-detail">',
          '<div class="admin-materias-identity">',
            '<div>',
              '<strong>' + escapeHtml(materia.nombre || materia.materia_id) + '</strong>',
              '<div class="mini">' + escapeHtml(materia.materia_id) + ' Â· ' + escapeHtml(getMateriaStructureLabel(materia)) + '</div>',
            '</div>',
            '<div class="admin-materias-structure">',
              '<span class="admin-alumnos-badge">' + escapeHtml(getMateriaStructureLabel(materia)) + '</span>',
              '<span class="admin-alumnos-badge ' + getMateriaStatusBadgeClass(materia.estatus) + '">' + escapeHtml(getMateriaStatusLabel(materia.estatus)) + '</span>',
            '</div>',
          '</div>',
          '<div class="admin-materias-inline-actions">',
            (canManage ? '<button class="btn-ghost" type="button" onclick="openMateriaEditor(\'edit\', \'' + escapeJsAttrValue(materia.materia_id) + '\')">Editar materia</button>' : ''),
            (canManage && materia.estatus === 'activa' ? '<button class="btn-secondary" type="button" onclick="toggleMateriaStatus(this, \'' + escapeJsAttrValue(materia.materia_id) + '\')">Desactivar</button>' : ''),
            (canManage && materia.estatus === 'inactiva' ? '<button class="btn-secondary" type="button" onclick="toggleMateriaStatus(this, \'' + escapeJsAttrValue(materia.materia_id) + '\')">Activar</button>' : ''),
            (canManage && materia.estatus === 'archivada' ? '<button class="btn-secondary" type="button" onclick="reactivateMateria(this, \'' + escapeJsAttrValue(materia.materia_id) + '\')">Reactivar</button>' : ''),
            (canManage && materia.estatus !== 'archivada' ? '<button class="btn-accent" type="button" onclick="archiveMateria(this, \'' + escapeJsAttrValue(materia.materia_id) + '\')">Archivar</button>' : ''),
            (canManage && materiaHasVariants(materia) && materia.estatus !== 'archivada' ? '<button class="btn-primary" type="button" onclick="openSubmateriaEditor(\'new\', \'' + escapeJsAttrValue(materia.materia_id) + '\')">Agregar submateria</button>' : ''),
          '</div>',
          '<div class="admin-materias-meta-grid">',
            '<div class="admin-alumnos-readonly"><span>Materia ID</span><strong>' + escapeHtml(materia.materia_id) + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Orden visual</span><strong>' + escapeHtml(String(materia.orden_visual || 0)) + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Estructura</span><strong>' + escapeHtml(getMateriaStructureLabel(materia)) + '</strong></div>',
            '<div class="admin-alumnos-readonly"><span>Variantes registradas</span><strong>' + escapeHtml(String(subRows.length)) + '</strong></div>',
          '</div>',
          '<div class="admin-alumnos-section-head"><div><h4>Variantes</h4><div class="subtle">' + escapeHtml(materiaHasVariants(materia) ? 'Submaterias de operaciÃ³n para esta materia base.' : 'Materia simple sin variantes registradas.') + '</div></div></div>',
          (materiaHasVariants(materia) ? renderMateriaVariantsList(materia) : '<div class="admin-alumnos-empty" style="min-height:136px;"><div><strong>Materia simple.</strong><div class="subtle">Esta materia no usa submaterias operativas en este momento.</div></div></div>'),
          (state.materiasUi.subEditorOpen && String(state.materiasUi.subEditor.materia_id || '').trim() === materia.materia_id ? renderSubmateriaEditor() : ''),
        '</div>'
      ].join('');
    }

    function renderMateriaVariantsList(materia) {
      const subRows = getSubmateriasForMateria(materia.materia_id);
      if (!subRows.length) {
        return '<div class="admin-alumnos-empty" style="min-height:140px;"><div><strong>Sin variantes registradas.</strong><div class="subtle">Agrega submaterias para especializar la operaciÃ³n sin duplicar la materia base.</div></div></div>';
      }
      return [
        '<div class="admin-materias-variants">',
          subRows.map((row) => {
            const actions = [
              '<button class="btn-ghost" type="button" onclick="openSubmateriaEditor(\'edit\', \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\')">Editar</button>',
              '<button class="btn-ghost" type="button" onclick="moveSubmateria(this, \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\', \'up\')">â†‘</button>',
              '<button class="btn-ghost" type="button" onclick="moveSubmateria(this, \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\', \'down\')">â†“</button>',
              (row.estatus === 'activa'
                ? '<button class="btn-secondary" type="button" onclick="toggleSubmateriaStatus(this, \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\')">Desactivar</button>'
                : (row.estatus === 'inactiva'
                  ? '<button class="btn-secondary" type="button" onclick="toggleSubmateriaStatus(this, \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\')">Activar</button>'
                  : '<button class="btn-secondary" type="button" onclick="reactivateSubmateria(this, \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\')">Reactivar</button>'))
            ];
            if (row.estatus !== 'archivada') {
              actions.push('<button class="btn-accent" type="button" onclick="archiveSubmateria(this, \'' + escapeJsAttrValue(materia.materia_id) + '\', \'' + escapeJsAttrValue(row.submateria_id) + '\')">Archivar</button>');
            }
            return [
              '<article class="admin-materias-variant-item">',
                '<div class="admin-materias-variant-copy">',
                  '<strong>' + escapeHtml(row.nombre || row.submateria_id) + '</strong>',
                  '<div class="mini">' + escapeHtml(row.submateria_id) + ' Â· ' + escapeHtml(getMateriaStatusLabel(row.estatus)) + ' Â· Orden ' + escapeHtml(String(row.orden || 0)) + '</div>',
                '</div>',
                '<div class="admin-materias-variant-actions">' + actions.join('') + '</div>',
              '</article>'
            ].join('');
          }).join(''),
        '</div>'
      ].join('');
    }

    function renderMateriaEditor() {
      const panel = $('adminMateriaEditorPanel');
      if (!panel) return;
      panel.hidden = !state.materiasUi.editorOpen;
      if (panel.hidden) return;
      const mode = state.materiasUi.editorMode || 'new';
      const editor = state.materiasUi.editor || createEmptyMateriaEditorState();
      if ($('adminMateriaEditorTitle')) $('adminMateriaEditorTitle').textContent = mode === 'edit' ? 'Editar materia' : 'Nueva materia';
      if ($('adminMateriaIdInput')) {
        $('adminMateriaIdInput').value = editor.materia_id || '';
        $('adminMateriaIdInput').disabled = mode === 'edit';
      }
      if ($('adminMateriaNombreInput')) $('adminMateriaNombreInput').value = editor.nombre || '';
      if ($('adminMateriaVariantsInput')) $('adminMateriaVariantsInput').value = editor.admite_submaterias ? 'si' : 'no';
      if ($('adminMateriaStatusInput')) $('adminMateriaStatusInput').value = editor.estatus || 'activa';
    }

    function renderSubmateriaEditor() {
      const editor = state.materiasUi.subEditor || createEmptySubmateriaEditorState();
      return [
        '<section class="admin-alumnos-panel">',
          '<div class="admin-alumnos-panel-head"><div><h4>' + escapeHtml(editor.submateria_id ? 'Editar submateria' : 'Nueva submateria') + '</h4><div class="subtle">MantÃ©n la materia base limpia y administra sus variantes aquÃ­.</div></div></div>',
          '<div class="admin-alumnos-mini-grid">',
            '<label class="field">',
              '<span>Submateria ID</span>',
              '<input id="adminSubmateriaIdInput" type="text" maxlength="50" value="' + escapeHtml(editor.submateria_id || '') + '"' + (editor.submateria_id ? ' disabled' : '') + ' placeholder="Ej. SUB-FUT">',
            '</label>',
            '<label class="field">',
              '<span>Estatus</span>',
              '<select id="adminSubmateriaStatusInput">',
                '<option value="activa"' + (editor.estatus === 'activa' ? ' selected' : '') + '>Activa</option>',
                '<option value="inactiva"' + (editor.estatus === 'inactiva' ? ' selected' : '') + '>Inactiva</option>',
                '<option value="archivada"' + (editor.estatus === 'archivada' ? ' selected' : '') + '>Archivada</option>',
              '</select>',
            '</label>',
            '<label class="field admin-alumnos-field-full">',
              '<span>Nombre</span>',
              '<input id="adminSubmateriaNombreInput" type="text" maxlength="100" value="' + escapeHtml(editor.nombre || '') + '" placeholder="Nombre visible de la variante">',
            '</label>',
          '</div>',
          '<div class="actions compact admin-alumnos-panel-actions">',
            '<button class="btn-ghost" type="button" onclick="closeSubmateriaEditor(); renderAdminMateriasModule()">Cancelar</button>',
            '<button class="btn-primary" type="button" onclick="saveSubmateriaEditor(this)">Guardar</button>',
          '</div>',
        '</section>'
      ].join('');
    }

    function openMateriaEditor(mode, materiaId) {
      const nextMode = mode === 'edit' ? 'edit' : 'new';
      const materia = nextMode === 'edit'
        ? getMateriaBaseRows().find((row) => row.materia_id === String(materiaId || '').trim())
        : null;
      state.materiasUi.editorMode = nextMode;
      state.materiasUi.editorOpen = true;
      state.materiasUi.subEditorOpen = false;
      state.materiasUi.selectedMateriaId = materia ? materia.materia_id : state.materiasUi.selectedMateriaId;
      state.materiasUi.editor = materia ? {
        materia_id: materia.materia_id,
        nombre: materia.nombre || '',
        admite_submaterias: materiaHasVariants(materia),
        estatus: materia.estatus || 'activa'
      } : createEmptyMateriaEditorState();
      renderAdminMateriasModule();
      focusAdminFacilitadorPanel(
        'adminMateriaEditorPanel',
        nextMode === 'edit' ? 'adminMateriaNombreInput' : 'adminMateriaIdInput'
      );
    }

    async function saveMateriaEditor(button) {
      const mode = state.materiasUi.editorMode || 'new';
      const payload = {
        materia_id: $('adminMateriaIdInput') ? $('adminMateriaIdInput').value.trim() : '',
        nombre: $('adminMateriaNombreInput') ? $('adminMateriaNombreInput').value.trim() : '',
        admite_submaterias: $('adminMateriaVariantsInput') ? $('adminMateriaVariantsInput').value === 'si' : false,
        estatus: $('adminMateriaStatusInput') ? $('adminMateriaStatusInput').value : 'activa',
        request_id: uid('MAT')
      };
      if (!payload.materia_id) throw new Error('Captura la materia ID.');
      if (!payload.nombre) throw new Error('Captura el nombre de la materia.');
      await handleAction('guardarMateria', async () => {
        const data = await api('guardarMateria', payload);
        if (data && data.materia) applySavedMateriaCatalogRow(data.materia);
        closeMateriaEditor();
        state.materiasUi.selectedMateriaId = data.materia_id || payload.materia_id;
        renderAdminModuleSurface('materias');
        setBanner(mode === 'new' ? 'Materia creada.' : 'Materia actualizada.', 'success');
      }, {
        button,
        key: buildActionKey('guardarMateria', [payload.materia_id, mode]),
        busyText: mode === 'new' ? 'Creando...' : 'Guardando...'
      });
    }

    function openSubmateriaEditor(mode, materiaId, submateriaId) {
      const nextMode = mode === 'edit' ? 'edit' : 'new';
      const parentId = String(materiaId || state.materiasUi.selectedMateriaId || '').trim();
      const current = nextMode === 'edit'
        ? getSubmateriasForMateria(parentId).find((row) => row.submateria_id === String(submateriaId || '').trim())
        : null;
      state.materiasUi.selectedMateriaId = parentId;
      state.materiasUi.subEditorOpen = true;
      state.materiasUi.subEditorMode = nextMode;
      state.materiasUi.subEditor = current ? {
        submateria_id: current.submateria_id,
        materia_id: current.materia_id,
        nombre: current.nombre || '',
        estatus: current.estatus || 'activa'
      } : {
        submateria_id: '',
        materia_id: parentId,
        nombre: '',
        estatus: 'activa'
      };
      renderAdminMateriasModule();
      focusAdminFacilitadorPanel('adminMateriaDetailPanel', nextMode === 'edit' ? 'adminSubmateriaNombreInput' : 'adminSubmateriaIdInput');
    }

    async function saveSubmateriaEditor(button) {
      const editor = state.materiasUi.subEditor || createEmptySubmateriaEditorState();
      const payload = {
        materia_id: editor.materia_id,
        submateria_id: $('adminSubmateriaIdInput') ? $('adminSubmateriaIdInput').value.trim() : editor.submateria_id,
        nombre: $('adminSubmateriaNombreInput') ? $('adminSubmateriaNombreInput').value.trim() : editor.nombre,
        estatus: $('adminSubmateriaStatusInput') ? $('adminSubmateriaStatusInput').value : editor.estatus,
        request_id: uid('SUB')
      };
      if (!payload.materia_id) throw new Error('Selecciona una materia base.');
      if (!payload.submateria_id) throw new Error('Captura la submateria ID.');
      if (!payload.nombre) throw new Error('Captura el nombre de la submateria.');
      await handleAction('guardarSubmateria', async () => {
        await api('guardarSubmateria', payload);
        applySavedSubmateriaCatalogRow(Object.assign({}, state.materiasUi.subEditorMode === 'edit'
          ? (getAdminSubmateriasCatalog().find((item) => item.submateria_id === payload.submateria_id) || {})
          : {}, {
          materia_id: payload.materia_id,
          submateria_id: payload.submateria_id,
          nombre: payload.nombre,
          estatus: payload.estatus,
          fecha_actualizacion: new Date().toISOString(),
          archivado_at: payload.estatus === 'archivada' ? new Date().toISOString() : '',
          archivado_por: payload.estatus === 'archivada' ? String(state.session && state.session.usuario && state.session.usuario.facilitador_id || '') : ''
        }));
        closeSubmateriaEditor();
        state.materiasUi.selectedMateriaId = payload.materia_id;
        renderAdminModuleSurface('materias');
        setBanner('Submateria guardada.', 'success');
      }, {
        button,
        key: buildActionKey('guardarSubmateria', [payload.materia_id, payload.submateria_id]),
        busyText: 'Guardando...'
      });
    }

    function selectMateria(materiaId) {
      state.materiasUi.selectedMateriaId = String(materiaId || '').trim();
      renderAdminMateriasModule();
      focusAdminFacilitadorPanel('adminMateriaDetailPanel');
    }

    async function archiveMateria(button, materiaId) {
      if (!window.confirm('Esto archivarÃ¡ la materia base y retirarÃ¡ sus variantes operativas visibles.')) return;
      await handleAction('archivarMateria', async () => {
        await api('archivarMateria', {
          materia_id: materiaId,
          request_id: uid('MATARC')
        });
        const archivedAt = new Date().toISOString();
        applyPatchedMateriaCatalogRow(materiaId, {
          activo: false,
          estatus: 'archivada',
          archivado_at: archivedAt,
          archivado_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || ''),
          fecha_actualizacion: archivedAt
        });
        getSubmateriasForMateria(materiaId).forEach((row) => {
          applyPatchedSubmateriaCatalogRow(row.submateria_id, {
            estatus: 'archivada',
            archivado_at: archivedAt,
            archivado_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || ''),
            fecha_actualizacion: archivedAt
          });
        });
        renderAdminModuleSurface('materias');
        setBanner('Materia archivada.', 'success');
      }, {
        button,
        key: buildActionKey('archivarMateria', [materiaId]),
        busyText: 'Archivando...'
      });
    }

    async function toggleMateriaStatus(button, materiaId) {
      const row = getMateriaBaseRows().find((item) => item.materia_id === String(materiaId || '').trim());
      if (!row) throw new Error('Materia no encontrada.');
      if (row.estatus === 'archivada') throw new Error('Usa la acciÃ³n de reactivar para una materia archivada.');
      const nextStatus = row.estatus === 'activa' ? 'inactiva' : 'activa';
      await handleAction('toggleMateriaStatus', async () => {
        await api('guardarMateria', {
          materia_id: row.materia_id,
          estatus: nextStatus,
          request_id: uid('MATTOG')
        });
        applyPatchedMateriaCatalogRow(row.materia_id, {
          activo: nextStatus === 'activa',
          estatus: nextStatus,
          archivado_at: '',
          archivado_por: '',
          fecha_actualizacion: new Date().toISOString()
        });
        renderAdminModuleSurface('materias');
        setBanner(nextStatus === 'activa' ? 'Materia activada.' : 'Materia desactivada.', 'success');
      }, {
        button,
        key: buildActionKey('toggleMateriaStatus', [materiaId, nextStatus]),
        busyText: nextStatus === 'activa' ? 'Activando...' : 'Desactivando...'
      });
    }

    async function reactivateMateria(button, materiaId) {
      const row = getMateriaBaseRows().find((item) => item.materia_id === String(materiaId || '').trim());
      if (!row) throw new Error('Materia no encontrada.');
      await handleAction('reactivateMateria', async () => {
        await api('guardarMateria', {
          materia_id: row.materia_id,
          estatus: 'activa',
          request_id: uid('MATREA')
        });
        applyPatchedMateriaCatalogRow(row.materia_id, {
          activo: true,
          estatus: 'activa',
          archivado_at: '',
          archivado_por: '',
          fecha_actualizacion: new Date().toISOString()
        });
        renderAdminModuleSurface('materias');
        setBanner('Materia reactivada.', 'success');
      }, {
        button,
        key: buildActionKey('reactivateMateria', [materiaId]),
        busyText: 'Reactivando...'
      });
    }

    async function moveMateria(button, materiaId, direction) {
      await handleAction('reordenarMateria', async () => {
        await api('reordenarMateria', {
          materia_id: materiaId,
          direction: direction,
          request_id: uid('MATMOV')
        });
        const visibleRows = getMateriaBaseRows().filter((item) => item.estatus !== 'archivada');
        const currentIndex = visibleRows.findIndex((item) => item.materia_id === String(materiaId || '').trim());
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (currentIndex >= 0 && targetIndex >= 0 && targetIndex < visibleRows.length) {
          const current = visibleRows[currentIndex];
          const target = visibleRows[targetIndex];
          applyPatchedMateriaCatalogRow(current.materia_id, { orden_visual: target.orden_visual });
          applyPatchedMateriaCatalogRow(target.materia_id, { orden_visual: current.orden_visual });
        }
        renderAdminModuleSurface('materias');
      }, {
        button,
        key: buildActionKey('reordenarMateria', [materiaId, direction]),
        busyText: direction === 'up' ? 'â†‘' : 'â†“'
      });
    }

    async function archiveSubmateria(button, materiaId, submateriaId) {
      if (!window.confirm('Esta variante dejarÃ¡ de estar disponible en el catÃ¡logo operativo.')) return;
      await handleAction('archivarSubmateria', async () => {
        await api('archivarSubmateria', {
          submateria_id: submateriaId,
          request_id: uid('SUBARC')
        });
        state.materiasUi.selectedMateriaId = materiaId;
        applyPatchedSubmateriaCatalogRow(submateriaId, {
          estatus: 'archivada',
          archivado_at: new Date().toISOString(),
          archivado_por: String(state.session && state.session.usuario && state.session.usuario.facilitador_id || ''),
          fecha_actualizacion: new Date().toISOString()
        });
        renderAdminModuleSurface('materias');
        setBanner('Submateria archivada.', 'success');
      }, {
        button,
        key: buildActionKey('archivarSubmateria', [submateriaId]),
        busyText: 'Archivando...'
      });
    }

    async function toggleSubmateriaStatus(button, materiaId, submateriaId) {
      const row = getSubmateriasForMateria(materiaId).find((item) => item.submateria_id === String(submateriaId || '').trim());
      if (!row) throw new Error('Submateria no encontrada.');
      if (row.estatus === 'archivada') throw new Error('Usa la acciÃ³n de reactivar para una submateria archivada.');
      const nextStatus = row.estatus === 'activa' ? 'inactiva' : 'activa';
      await handleAction('toggleSubmateriaStatus', async () => {
        await api('guardarSubmateria', {
          materia_id: materiaId,
          submateria_id: submateriaId,
          estatus: nextStatus,
          request_id: uid('SUBTOG')
        });
        state.materiasUi.selectedMateriaId = materiaId;
        applyPatchedSubmateriaCatalogRow(submateriaId, {
          estatus: nextStatus,
          archivado_at: '',
          archivado_por: '',
          fecha_actualizacion: new Date().toISOString()
        });
        renderAdminModuleSurface('materias');
        setBanner(nextStatus === 'activa' ? 'Submateria activada.' : 'Submateria desactivada.', 'success');
      }, {
        button,
        key: buildActionKey('toggleSubmateriaStatus', [submateriaId, nextStatus]),
        busyText: nextStatus === 'activa' ? 'Activando...' : 'Desactivando...'
      });
    }

    async function reactivateSubmateria(button, materiaId, submateriaId) {
      const row = getSubmateriasForMateria(materiaId).find((item) => item.submateria_id === String(submateriaId || '').trim());
      if (!row) throw new Error('Submateria no encontrada.');
      await handleAction('reactivateSubmateria', async () => {
        await api('guardarSubmateria', {
          materia_id: materiaId,
          submateria_id: submateriaId,
          estatus: 'activa',
          request_id: uid('SUBREA')
        });
        state.materiasUi.selectedMateriaId = materiaId;
        applyPatchedSubmateriaCatalogRow(submateriaId, {
          estatus: 'activa',
          archivado_at: '',
          archivado_por: '',
          fecha_actualizacion: new Date().toISOString()
        });
        renderAdminModuleSurface('materias');
        setBanner('Submateria reactivada.', 'success');
      }, {
        button,
        key: buildActionKey('reactivateSubmateria', [materiaId, submateriaId]),
        busyText: 'Reactivando...'
      });
    }

    async function moveSubmateria(button, materiaId, submateriaId, direction) {
      await handleAction('reordenarSubmateria', async () => {
        await api('reordenarSubmateria', {
          materia_id: materiaId,
          submateria_id: submateriaId,
          direction: direction,
          request_id: uid('SUBMOV')
        });
        state.materiasUi.selectedMateriaId = materiaId;
        const visibleRows = getSubmateriasForMateria(materiaId).filter((item) => item.estatus !== 'archivada');
        const currentIndex = visibleRows.findIndex((item) => item.submateria_id === String(submateriaId || '').trim());
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (currentIndex >= 0 && targetIndex >= 0 && targetIndex < visibleRows.length) {
          const current = visibleRows[currentIndex];
          const target = visibleRows[targetIndex];
          applyPatchedSubmateriaCatalogRow(current.submateria_id, { orden: target.orden });
          applyPatchedSubmateriaCatalogRow(target.submateria_id, { orden: current.orden });
        }
        renderAdminModuleSurface('materias');
      }, {
        button,
        key: buildActionKey('reordenarSubmateria', [submateriaId, direction]),
        busyText: direction === 'up' ? 'â†‘' : 'â†“'
      });
    }

    function bindAdminMateriasEvents() {
      if ($('adminMateriasSearch')) $('adminMateriasSearch').addEventListener('input', (event) => {
        state.materiasUi.search = event.currentTarget.value;
        scheduleUiDebounce('admin-materias-search', () => renderAdminMateriasModule());
      });
      if ($('adminMateriasFilterAllBtn')) $('adminMateriasFilterAllBtn').addEventListener('click', () => {
        state.materiasUi.filter = 'todas';
        renderAdminMateriasModule();
      });
      if ($('adminMateriasFilterActiveBtn')) $('adminMateriasFilterActiveBtn').addEventListener('click', () => {
        state.materiasUi.filter = 'activas';
        renderAdminMateriasModule();
      });
      if ($('adminMateriasFilterArchivedBtn')) $('adminMateriasFilterArchivedBtn').addEventListener('click', () => {
        state.materiasUi.filter = 'archivadas';
        renderAdminMateriasModule();
      });
      if ($('adminMateriasFilterVariantsBtn')) $('adminMateriasFilterVariantsBtn').addEventListener('click', () => {
        state.materiasUi.filter = 'con_submaterias';
        renderAdminMateriasModule();
      });
      if ($('adminMateriaNewBtn')) $('adminMateriaNewBtn').addEventListener('click', () => openMateriaEditor('new'));
      if ($('adminMateriaCancelBtn')) $('adminMateriaCancelBtn').addEventListener('click', () => {
        closeMateriaEditor();
        renderAdminMateriasModule();
      });
      if ($('adminMateriaSaveBtn')) $('adminMateriaSaveBtn').addEventListener('click', (event) => saveMateriaEditor(event.currentTarget));
    }

    function fillSelect(select, items, getValue, getLabel, placeholder = 'Selecciona') {
      const current = select.value;
      const options = ['<option value="">' + escapeHtml(placeholder) + '</option>'];
      items.forEach((item) => {
        const value = getValue(item);
        const label = getLabel(item);
        options.push('<option value="' + escapeHtml(value) + '">' + escapeHtml(label) + '</option>');
      });
      select.innerHTML = options.join('');
      if (current && items.some((item) => getValue(item) === current)) {
        select.value = current;
      }
    }

    function renderPeriodSelects() {
      const periods = getAvailablePeriods();
      ['obsPeriodo', 'evaPeriodo', 'notaPeriodo', 'repPeriodo'].forEach((id) => {
        fillSelect($(id), periods, (p) => p.id, (p) => p.id + ' - ' + p.name, 'Selecciona perÃ­odo');
      });
      const reportUi = getReportSelectionState();
      if ($('repPeriodo') && reportUi.periodo_id) $('repPeriodo').value = reportUi.periodo_id;
      syncNotePeriodoState();
    }

    function createEmptyActivityDraft() {
      return {
        key: uid('ACTROW'),
        texto: '',
        material_en_carpeta: 'no_requiere',
        realizada: '',
        comentario_cierre: '',
        actividad_id: '',
        last_known_updated_at: ''
      };
    }

    function emptyPlanEditorState() {
      return {
        mode: 'create',
        planId: '',
        lockedSemanaId: '',
        lockedGrupoId: '',
        selectedSubmateriaId: '',
        lastKnownUpdatedAt: '',
        lastKnownActivitiesVersion: '',
        activities: [createEmptyActivityDraft()]
      };
    }

    function normalizeMaterialStatus(value) {
      const raw = String(value == null ? '' : value).trim().toLowerCase();
      if (!raw) return 'no_requiere';
      if (['listo', 'si', 'sÃ­', 'true', '1'].includes(raw)) return 'listo';
      if (['no_listo', 'no', 'false', '0'].includes(raw)) return 'no_listo';
      return 'no_requiere';
    }

    function normalizeRealizadaStatus(value) {
      const raw = String(value == null ? '' : value).trim().toLowerCase();
      if (['si', 'sÃ­', 'true', '1'].includes(raw)) return 'si';
      if (['no', 'false', '0'].includes(raw)) return 'no';
      return '';
    }

    function toYmdFrontend_(value) {
      if (value === undefined || value === null || value === '') return '';
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return '';
        const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
        if (match) return match[1];
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    function formatFechaHumana(value) {
      const ymd = toYmdFrontend_(value);
      if (!ymd) return value ? String(value) : '';
      const [year, month, day] = ymd.split('-').map(Number);
      const date = new Date(year, (month || 1) - 1, day || 1);
      if (Number.isNaN(date.getTime())) return ymd;
      return date.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    function getSortedSemanas() {
      return [...state.catalogos.semanas].sort((a, b) => toYmdFrontend_(a.fecha_inicio).localeCompare(toYmdFrontend_(b.fecha_inicio)));
    }

    function getWeekById(semanaId) {
      return state.catalogos.semanas.find((item) => item.semana_id === semanaId) || null;
    }

    function buildWeekRangeFromDate(dateValue) {
      const target = toYmdFrontend_(dateValue);
      if (!target) return null;
      const base = new Date(target + 'T12:00:00');
      const day = base.getDay();
      const mondayOffset = day === 0 ? -6 : (1 - day);
      const fridayOffset = mondayOffset + 4;
      const from = new Date(base);
      from.setDate(base.getDate() + mondayOffset);
      const to = new Date(base);
      to.setDate(base.getDate() + fridayOffset);
      return {
        semana_id: '',
        fecha_inicio: toYmdFrontend_(from),
        fecha_fin: toYmdFrontend_(to),
        nombre_visible: 'Semana ' + toYmdFrontend_(from) + ' al ' + toYmdFrontend_(to),
        cerrada_global: 'no',
        draft: true
      };
    }

    function getWeekByDate(dateValue) {
      const target = toYmdFrontend_(dateValue);
      if (!target) return null;
      return getSortedSemanas().find((semana) => {
        const start = toYmdFrontend_(semana.fecha_inicio);
        const end = toYmdFrontend_(semana.fecha_fin);
        return start && end && start <= target && target <= end;
      }) || null;
    }

    function getWeekByDateOrDraft(dateValue) {
      return getWeekByDate(dateValue) || buildWeekRangeFromDate(dateValue);
    }

    function formatFechaCorta(value) {
      const ymd = toYmdFrontend_(value);
      if (!ymd) return '';
      const date = new Date(ymd + 'T12:00:00');
      if (isNaN(date.getTime())) return ymd;
      return date.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).replace('.', '');
    }

    function formatSemanaLabel(semana) {
      if (!semana) return 'Semana sin resolver';
      const start = toYmdFrontend_(semana.fecha_inicio);
      const end = toYmdFrontend_(semana.fecha_fin);
      if (!start || !end) return semana.nombre_visible || semana.semana_id || 'Semana sin resolver';
      return formatFechaCorta(start) + ' - ' + formatFechaCorta(end);
    }

    function getSemanaHintText(semana) {
      return '';
    }

    function getWeekLabelForPlan(plan, semana) {
      if (semana) return formatSemanaLabel(semana);
      const weekId = String(plan && plan.semana_id || '').trim();
      const match = weekId.match(/^SEM_(\d{4})(\d{2})(\d{2})$/);
      if (!match) return weekId || '-';
      const inferred = buildWeekRangeFromDate(match[1] + '-' + match[2] + '-' + match[3]);
      return inferred ? formatSemanaLabel(inferred) : weekId;
    }

    function getPlanStatusLabel(status) {
      return ({
        borrador: 'Borrador',
        borrador_pendiente_aprobacion: 'Pendiente de aprobaciÃ³n',
        rechazada: 'Rechazada',
        activa: 'Activa',
        cierre_pendiente: 'Cierre pendiente',
        cerrada: 'Cerrada',
        archivada: 'Archivada'
      })[String(status || '').trim()] || String(status || 'Sin estado');
    }

    function getPlanLocalSaveState(plan) {
      return String((plan && plan._local_save_state) || '').trim().toLowerCase();
    }

    function isPlaneacionLocalSavePending(plan) {
      return ['creating', 'saving', 'activating', 'sync_error'].includes(getPlanLocalSaveState(plan));
    }

    function getPlanStatusBadgeMeta(plan) {
      const localState = getPlanLocalSaveState(plan);
      const baseClass = String((plan && plan.estado) || '').trim();
      if (localState === 'creating') {
        const isActiveTarget = String((plan && plan.estado) || '').trim() === 'activa';
        return {
          className: ('is-local-pending ' + baseClass).trim(),
          label: isActiveTarget ? 'Activando...' : 'Creando...'
        };
      }
      if (localState === 'saving') {
        return {
          className: ('is-local-pending ' + baseClass).trim(),
          label: 'Guardando...'
        };
      }
      if (localState === 'activating') {
        return {
          className: ('is-local-pending ' + baseClass).trim(),
          label: 'Activando...'
        };
      }
      if (localState === 'sync_error') {
        return {
          className: ('is-local-pending ' + baseClass).trim(),
          label: 'Pendiente'
        };
      }
      return {
        className: baseClass,
        label: getPlanStatusLabel(plan && plan.estado)
      };
    }

    function getPlanLocalFeedbackMarkup(plan) {
      const message = String((plan && plan._local_save_message) || '').trim();
      const localState = getPlanLocalSaveState(plan);
      if (localState === 'activating') {
        return '';
      }
      if (localState === 'saving') return '';
      if (localState === 'saved') return '';
      if (!message) return '';
      const compactLabel = ({
        creating: 'Creando',
        saving: 'Sincronizando',
        activating: 'Activando',
        sync_error: 'Pendiente'
      })[localState] || 'Actualizando';
      const toneClass = localState === 'sync_error' ? 'is-warning' : 'is-pending';
      return (
        '<div class="plan-inline-feedback ' + toneClass + '">' +
          '<span class="plan-inline-feedback-dot" aria-hidden="true"></span>' +
          '<span class="plan-inline-feedback-label">' + escapeHtml(compactLabel) + '</span>' +
          '<span class="plan-inline-feedback-text">' + escapeHtml(message) + '</span>' +
        '</div>'
      );
    }

    function getPlanActionStatusMarkup(plan) {
      const localState = getPlanLocalSaveState(plan);
      if (localState === 'saved') return '';
      const label = ({
        sync_error: 'Pendiente'
      })[localState] || '';
      if (!label) return '';
      const toneClass = localState === 'sync_error' ? 'is-warning' : 'is-pending';
      return (
        '<span class="plan-action-status ' + toneClass + '">' +
          '<span class="plan-inline-feedback-dot" aria-hidden="true"></span>' +
          '<span>' + escapeHtml(label) + '</span>' +
        '</span>'
      );
    }

    function isPlaneacionPendingCreation(plan) {
      if (!plan) return false;
      const localState = getPlanLocalSaveState(plan);
      const planId = String((plan && plan.planeacion_id) || '').trim();
      return localState === 'creating' || /^tmppla/i.test(planId);
    }

    function focusPlaneacionCardSoon(planId) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) return;
      window.requestAnimationFrame(() => {
        const card = $('plan-card-' + normalizedPlanId);
        if (!card || typeof card.scrollIntoView !== 'function') return;
        document.querySelectorAll('.plan-card.is-alert-focus').forEach((item) => {
          item.classList.remove('is-alert-focus');
          if (item._alertFocusTimer) {
            window.clearTimeout(item._alertFocusTimer);
            item._alertFocusTimer = null;
          }
        });
        card.classList.add('is-alert-focus');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card._alertFocusTimer = window.setTimeout(() => {
          card.classList.remove('is-alert-focus');
          card._alertFocusTimer = null;
        }, 2200);
      });
    }

    function getCurrentUserId() {
      return String((state.session && state.session.usuario && state.session.usuario.facilitador_id) || '').trim();
    }

    function getSelectedGroupIds() {
      const host = $('planGruposChecklist');
      if (!host) return [];
      return Array.from(host.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value);
    }

    function getSelectedPlanAlumnos() {
      return Array.from($('planAlumnosChecklist').querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value);
    }

    function resetPlanEditor() {
      state.planEditor = emptyPlanEditorState();
      state.openPlanId = '';
      state.openPlanDraft = null;
      if (state.ui) state.ui.planBuilderExpanded = false;
      $('planFecha').value = '';
      $('planMateria').value = '';
      if ($('planSubmateria')) $('planSubmateria').value = '';
      $('planFrase').value = '';
      if ($('planGruposChecklist')) $('planGruposChecklist').innerHTML = '';
      if ($('planAlumnosChecklist')) $('planAlumnosChecklist').innerHTML = '';
      if ($('planActivitiesList')) $('planActivitiesList').innerHTML = '';
      renderPlanEditor();
      renderPlanBuilderVisibility();
      renderAlumnoFilterUi();
      if ($('planeacionesSectionTitle')) {
        $('planeacionesSectionTitle').textContent = canUseAdminShell() ? 'Planeaciones' : 'Planeaciones abiertas';
      }
      if ($('planeacionesSectionCopy')) {
        $('planeacionesSectionCopy').textContent = canUseAdminShell()
          ? 'Consulta histÃ³rico, filtra y corrige cualquier planeaciÃ³n del sistema.'
          : 'AquÃ­ puedes editar, observar y cerrar las planeaciones que siguen en trabajo.';
      }
    }

    function closePlanBuilder() {
      state.planEditor = emptyPlanEditorState();
      if (state.ui) state.ui.planBuilderExpanded = false;
      if ($('planFecha')) $('planFecha').value = '';
      if ($('planMateria')) $('planMateria').value = '';
      if ($('planSubmateria')) $('planSubmateria').value = '';
      if ($('planFrase')) $('planFrase').value = '';
      if ($('planGruposChecklist')) $('planGruposChecklist').innerHTML = '';
      if ($('planAlumnosChecklist')) $('planAlumnosChecklist').innerHTML = '';
      if ($('planActivitiesList')) $('planActivitiesList').innerHTML = '';
      renderPlanEditor();
      renderPlanBuilderVisibility();
    }

    function loadPlanIntoEditor(plan) {
      const semana = getWeekById(plan.semana_id);
      state.openPlanId = plan.planeacion_id;
      state.openPlanDraft = null;
      if (state.ui) state.ui.planBuilderExpanded = true;
      state.planEditor = {
        mode: 'edit',
        planId: plan.planeacion_id,
        lockedSemanaId: plan.semana_id,
        lockedGrupoId: plan.grupo_id,
        selectedSubmateriaId: plan.submateria_id || '',
        lastKnownUpdatedAt: plan.fecha_actualizacion || '',
        lastKnownActivitiesVersion: plan.actividades_version_actual || '',
        activities: (plan.actividades || []).length ? (plan.actividades || []).map((actividad) => ({
          key: actividad.actividad_id || uid('ACTROW'),
          actividad_id: actividad.actividad_id || '',
          texto: actividad.texto || '',
          material_en_carpeta: normalizeMaterialStatus(actividad.material_en_carpeta),
          realizada: normalizeRealizadaStatus(actividad.realizada),
          comentario_cierre: actividad.comentario_cierre || '',
          last_known_updated_at: actividad.fecha_actualizacion || ''
        })) : [createEmptyActivityDraft()]
      };
      $('planFecha').value = semana && semana.fecha_inicio ? toYmdFrontend_(semana.fecha_inicio) : '';
      $('planFrase').value = plan.frase_semana || '';
      $('planMateria').value = plan.materia_id || '';
      syncPlanSubmateriaSelect(plan.submateria_id || '');
      renderPlanEditor();
      renderPlanBuilderVisibility();
      Array.from($('planAlumnosChecklist').querySelectorAll('input[type="checkbox"]')).forEach((input) => {
        input.checked = (plan.alumnos || []).some((row) => row.alumno_id === input.value);
      });
    }

    function buildOpenPlanDraft(plan) {
      const semana = getWeekById(plan.semana_id);
      const snapshotOpenPlan = getBootSnapshotOpenPlanById(plan.planeacion_id);
      const sourcePlan = (
        plan &&
        (
          (Array.isArray(plan.alumnos) && plan.alumnos.length) ||
          (Array.isArray(plan.actividades) && plan.actividades.length)
        )
      )
        ? plan
        : Object.assign({}, snapshotOpenPlan || {}, plan || {});
      const finalObservationsByKey = Object.assign({}, sourcePlan._draft_final_observations_by_key || {});
      (Array.isArray(sourcePlan.obs_alumno_final) ? sourcePlan.obs_alumno_final : []).forEach((row) => {
        const alumnoId = String((row && row.alumno_id) || '').trim();
        const targetPlanId = String((row && row.planeacion_id) || plan.planeacion_id || '').trim();
        const nota = String((row && row.nota) || '').trim();
        if (!alumnoId) return;
        finalObservationsByKey[alumnoId] = nota;
        if (targetPlanId) finalObservationsByKey[targetPlanId + '::' + alumnoId] = nota;
      });
      const generalObservationText = String(
        sourcePlan._draft_general_observation_text ||
        ''
      ).trim();
      return {
        planId: plan.planeacion_id,
        fecha_planeacion: toYmdFrontend_((semana && semana.fecha_inicio) || ''),
        frase_semana: sourcePlan.frase_semana || '',
        materia_id: sourcePlan.materia_id || '',
        submateria_id: sourcePlan.submateria_id || '',
        alumnos_ids: (sourcePlan.alumnos || []).map((row) => row.alumno_id),
        original_alumnos_ids: (sourcePlan.alumnos || []).map((row) => row.alumno_id),
        activities: (sourcePlan.actividades || []).length ? (sourcePlan.actividades || []).map((actividad) => ({
          key: actividad.actividad_id || uid('ACTOPEN'),
          actividad_id: actividad.actividad_id || '',
          texto: actividad.texto || '',
          material_en_carpeta: normalizeMaterialStatus(actividad.material_en_carpeta),
          realizada: normalizeRealizadaStatus(actividad.realizada),
          comentario_cierre: actividad.comentario_cierre || '',
          last_known_updated_at: actividad.fecha_actualizacion || ''
        })) : [createEmptyActivityDraft()],
        generalObservationText,
        finalObservationsByKey,
        lastKnownUpdatedAt: plan.fecha_actualizacion || '',
        lastKnownActivitiesVersion: plan.actividades_version_actual || '',
        activitiesDirty: false
      };
    }

    function preserveOpenPlanDraftLocalNotes(planId, draft, planLike = null) {
      if (!draft || !draft.planId) return draft;
      const normalizedPlanId = String(planId || draft.planId || '').trim();
      const currentPlan = planLike || getPlanById(normalizedPlanId) || null;
      const currentDraft = state.openPlanDraft && String(state.openPlanDraft.planId || '').trim() === normalizedPlanId
        ? state.openPlanDraft
        : null;
      const nextDraft = cloneJsonSafe(draft, draft) || draft;
      const generalText = String(
        (currentDraft && currentDraft.generalObservationText) ||
        (currentPlan && currentPlan._draft_general_observation_text) ||
        nextDraft.generalObservationText ||
        ''
      );
      if (generalText) {
        nextDraft.generalObservationText = generalText;
      }
      nextDraft.finalObservationsByKey = Object.assign(
        {},
        nextDraft.finalObservationsByKey || {},
        (currentPlan && currentPlan._draft_final_observations_by_key) || {},
        (currentDraft && currentDraft.finalObservationsByKey) || {}
      );
      return nextDraft;
    }

    function hasUsableOpenPlanDetail(plan) {
      if (!plan || !plan.planeacion_id) return false;
      const alumnosReady = Number(plan.alumnos_count || 0) === 0 || (Array.isArray(plan.alumnos) && plan.alumnos.length > 0);
      const actividadesReady = Number(plan.actividades_count || 0) === 0 || (Array.isArray(plan.actividades) && plan.actividades.length > 0);
      return alumnosReady && actividadesReady;
    }

    function hasUsableOpenPlanDraftData(draft, plan) {
      if (!draft || !plan) return false;
      const alumnosReady = Number(plan.alumnos_count || 0) === 0 || (Array.isArray(draft.alumnos_ids) && draft.alumnos_ids.length > 0);
      const actividadesReady = Number(plan.actividades_count || 0) === 0 || (Array.isArray(draft.activities) && draft.activities.some((activity) => String((activity && activity.texto) || '').trim() || String((activity && activity.actividad_id) || '').trim()));
      return alumnosReady && actividadesReady;
    }

    function getCurrentPlanFechaPlaneacion(plan) {
      const semana = plan ? getWeekById(plan.semana_id) : null;
      return toYmdFrontend_((semana && semana.fecha_inicio) || '');
    }

    function buildOpenPlanStructuralSignatureFromDraft(draft) {
      if (!draft) return '';
      return JSON.stringify({
        fecha_planeacion: String(draft.fecha_planeacion || '').trim(),
        frase_semana: String(draft.frase_semana || '').trim(),
        materia_id: String(draft.materia_id || '').trim(),
        submateria_id: String(draft.submateria_id || '').trim(),
        alumnos_ids: normalizeIdList(draft.alumnos_ids),
        activities: (Array.isArray(draft.activities) ? draft.activities : [])
          .map((activity, index) => ({
            actividad_id: String((activity && activity.actividad_id) || '').trim(),
            texto: String((activity && activity.texto) || '').trim(),
            orden: index + 1
          }))
          .filter((activity) => activity.texto || activity.actividad_id)
      });
    }

    function buildOpenPlanStructuralSignatureFromPlan(plan) {
      if (!plan) return '';
      return JSON.stringify({
        fecha_planeacion: getCurrentPlanFechaPlaneacion(plan),
        frase_semana: String(plan.frase_semana || '').trim(),
        materia_id: String(plan.materia_id || '').trim(),
        submateria_id: String(plan.submateria_id || '').trim(),
        alumnos_ids: normalizeIdList((plan.alumnos || []).map((row) => row && row.alumno_id)),
        activities: (Array.isArray(plan.actividades) ? plan.actividades : [])
          .map((activity, index) => ({
            actividad_id: String((activity && activity.actividad_id) || '').trim(),
            texto: String((activity && activity.texto) || '').trim(),
            orden: index + 1
          }))
          .filter((activity) => activity.texto || activity.actividad_id)
      });
    }

    function getOpenPlanStructuralDraftState(planId, fallbackPlan) {
      const currentPlan = getPlanById(planId) || fallbackPlan || null;
      const draft = currentPlan ? getOpenPlanDraft(currentPlan) : null;
      if (!currentPlan || !draft) {
        return {
          dirty: false,
          hasActivitiesWithoutId: false
        };
      }
      const activities = Array.isArray(draft.activities) ? draft.activities : [];
      const hasActivitiesWithoutId = activities.some((activity) => {
        return String((activity && activity.texto) || '').trim() &&
          !String((activity && activity.actividad_id) || '').trim();
      });
      const dirty = buildOpenPlanStructuralSignatureFromDraft(draft) !== buildOpenPlanStructuralSignatureFromPlan(currentPlan);
      return {
        dirty,
        hasActivitiesWithoutId
      };
    }

    function getOpenPlanDraft(plan) {
      if (!plan) return null;
      if (state.openPlanDraft && state.openPlanDraft.planId === plan.planeacion_id && !hasUsableOpenPlanDraftData(state.openPlanDraft, plan)) {
        state.openPlanDraft = null;
      }
      if (!state.openPlanDraft || state.openPlanDraft.planId !== plan.planeacion_id) {
        if (!hasUsableOpenPlanDetail(plan)) return null;
        state.openPlanDraft = buildOpenPlanDraft(plan);
      }
      return state.openPlanDraft;
    }

    function updateOpenPlanDraftField(field, value, rerender) {
      if (!state.openPlanDraft) return;
      state.openPlanDraft[field] = value;
      if (field === 'materia_id') {
        const nextMateriaId = String(value || '').trim();
        const currentSubmateriaId = String(state.openPlanDraft.submateria_id || '').trim();
        const hasMatchingSubmateria = currentSubmateriaId && getPlanSubmateriasForMateria(nextMateriaId).some((item) => String(item.submateria_id || '').trim() === currentSubmateriaId);
        state.openPlanDraft.submateria_id = hasMatchingSubmateria ? currentSubmateriaId : '';
      }
      persistOpenPlanSnapshotSoon('planeacion_draft_campo');
      if (rerender) renderPlaneacionesList();
    }

    function toggleOpenPlanDraftAlumno(alumnoId, checked) {
      if (!state.openPlanDraft) return;
      const current = new Set(state.openPlanDraft.alumnos_ids || []);
      if (checked) current.add(alumnoId); else current.delete(alumnoId);
      state.openPlanDraft.alumnos_ids = Array.from(current);
      persistOpenPlanSnapshotSoon('planeacion_draft_alumnos');
    }

    function updateOpenPlanDraftActivityField(index, field, value) {
      if (!state.openPlanDraft || !state.openPlanDraft.activities[index]) return;
      state.openPlanDraft.activities[index][field] = value;
      state.openPlanDraft.activitiesDirty = true;
      persistOpenPlanSnapshotSoon('planeacion_draft_actividad');
    }

    function updateOpenPlanFinalObservationDraft(planId, alumnoId, value) {
      if (!state.openPlanDraft) return;
      const normalizedAlumnoId = String(alumnoId || '').trim();
      const normalizedPlanId = String(planId || state.openPlanDraft.planId || '').trim();
      if (!normalizedAlumnoId) return;
      if (!state.openPlanDraft.finalObservationsByKey || typeof state.openPlanDraft.finalObservationsByKey !== 'object') {
        state.openPlanDraft.finalObservationsByKey = {};
      }
      const normalizedValue = String(value || '');
      state.openPlanDraft.finalObservationsByKey[normalizedAlumnoId] = normalizedValue;
      if (normalizedPlanId) {
        state.openPlanDraft.finalObservationsByKey[normalizedPlanId + '::' + normalizedAlumnoId] = normalizedValue;
      }
      const currentPlan = getPlanById(normalizedPlanId);
      if (currentPlan && currentPlan.planeacion_id) {
        const nextDraftMap = Object.assign({}, currentPlan._draft_final_observations_by_key || {});
        if (normalizedValue) {
          nextDraftMap[normalizedAlumnoId] = normalizedValue;
          if (normalizedPlanId) nextDraftMap[normalizedPlanId + '::' + normalizedAlumnoId] = normalizedValue;
        } else {
          delete nextDraftMap[normalizedAlumnoId];
          if (normalizedPlanId) delete nextDraftMap[normalizedPlanId + '::' + normalizedAlumnoId];
        }
        upsertPlaneacionRow({
          planeacion_id: normalizedPlanId,
          _draft_final_observations_by_key: nextDraftMap
        });
      }
      persistOpenPlanSnapshotSoon('planeacion_draft_obs_final');
    }

    function applyPendingPlanObservationDraft(planId, generalText, finalPayloads) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) return;
      const currentPlan = getPlanById(normalizedPlanId);
      const draft = state.openPlanDraft && String(state.openPlanDraft.planId || '').trim() === normalizedPlanId
        ? state.openPlanDraft
        : null;
      let nextFinalMap = Object.assign({}, (currentPlan && currentPlan._draft_final_observations_by_key) || {});
      const trimmedGeneral = String(generalText || '').trim();
      if (draft) {
        draft.generalObservationText = trimmedGeneral;
      }
      if (Array.isArray(finalPayloads) && finalPayloads.length) {
        finalPayloads.forEach((row) => {
          const alumnoId = String((row && row.alumnoId) || '').trim();
          const targetPlanId = String((row && (row.planId || normalizedPlanId)) || '').trim();
          const nota = String((row && row.nota) || '').trim();
          if (!alumnoId) return;
          if (draft) {
            if (!draft.finalObservationsByKey || typeof draft.finalObservationsByKey !== 'object') {
              draft.finalObservationsByKey = {};
            }
            draft.finalObservationsByKey[alumnoId] = nota;
            if (targetPlanId) draft.finalObservationsByKey[targetPlanId + '::' + alumnoId] = nota;
          }
          nextFinalMap[alumnoId] = nota;
          if (targetPlanId) nextFinalMap[targetPlanId + '::' + alumnoId] = nota;
        });
      }
      const patch = {
        planeacion_id: normalizedPlanId,
        _draft_general_observation_text: trimmedGeneral,
        _draft_final_observations_by_key: nextFinalMap
      };
      upsertPlaneacionRow(patch);
      persistOpenPlanSnapshotSoon('planeacion_draft_obs_bundle');
    }

    function syncOpenPlanDraftConcurrencyHints(plan, draft) {
      if (!plan || !draft) return draft;
      const latestPlanUpdatedAt = String((plan && plan.fecha_actualizacion) || '').trim();
      const latestActivitiesVersion = String((plan && plan.actividades_version_actual) || '').trim();
      if (latestPlanUpdatedAt) {
        draft.lastKnownUpdatedAt = latestPlanUpdatedAt;
      }
      if (latestActivitiesVersion) {
        draft.lastKnownActivitiesVersion = latestActivitiesVersion;
      }
      if (Array.isArray(draft.activities) && Array.isArray(plan.actividades) && plan.actividades.length) {
        const activitiesById = new Map(
          plan.actividades
            .map((activity) => [String((activity && activity.actividad_id) || '').trim(), activity])
            .filter((entry) => entry[0])
        );
        draft.activities.forEach((activity) => {
          const activityId = String((activity && activity.actividad_id) || '').trim();
          if (!activityId) return;
          const currentActivity = activitiesById.get(activityId);
          const latestActivityUpdatedAt = String((currentActivity && currentActivity.fecha_actualizacion) || '').trim();
          if (latestActivityUpdatedAt) {
            activity.last_known_updated_at = latestActivityUpdatedAt;
          }
        });
      }
      return draft;
    }

    function syncOpenPlanDraftFromVisibleControls(draft) {
      if (!draft || !Array.isArray(draft.activities) || !draft.activities.length) return draft;
      draft.activities = draft.activities.map((activity) => {
        const nextActivity = Object.assign({}, activity || {});
        const activityId = String((nextActivity && nextActivity.actividad_id) || '').trim();
        if (!activityId) return nextActivity;
        const realizadaNode = $('activity-realizada-' + activityId);
        const materialNode = $('activity-material-' + activityId);
        const comentarioNode = $('activity-comment-' + activityId);
        if (realizadaNode) {
          nextActivity.realizada = normalizeRealizadaStatus(realizadaNode.value);
        }
        if (materialNode) {
          nextActivity.material_en_carpeta = normalizeMaterialStatus(materialNode.value);
        }
        if (comentarioNode) {
          nextActivity.comentario_cierre = String(comentarioNode.value || '').trim();
        }
        return nextActivity;
      });
      return draft;
    }

    function addOpenPlanDraftActivity() {
      if (!state.openPlanDraft) return;
      state.openPlanDraft.activities.push(createEmptyActivityDraft());
      state.openPlanDraft.activitiesDirty = true;
      persistOpenPlanSnapshotSoon('planeacion_draft_actividad');
      renderPlaneacionesList();
    }

    function removeOpenPlanDraftActivity(index) {
      if (!state.openPlanDraft || state.openPlanDraft.activities.length <= 1) return;
      state.openPlanDraft.activities.splice(index, 1);
      state.openPlanDraft.activitiesDirty = true;
      persistOpenPlanSnapshotSoon('planeacion_draft_actividad');
      renderPlaneacionesList();
    }

    function moveOpenPlanDraftActivity(index, direction) {
      if (!state.openPlanDraft) return;
      const target = index + direction;
      if (target < 0 || target >= state.openPlanDraft.activities.length) return;
      const copy = [...state.openPlanDraft.activities];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      state.openPlanDraft.activities = copy;
      state.openPlanDraft.activitiesDirty = true;
      persistOpenPlanSnapshotSoon('planeacion_draft_actividad');
      renderPlaneacionesList();
    }

    function toggleAllOpenPlanDraftAlumnos(checked) {
      if (!state.openPlanDraft || !state.openPlanId) return;
      const plan = getPlanById(state.openPlanId);
      if (!plan) return;
      const alumnosGrupo = state.catalogos.alumnos
        .filter((alumno) => alumno.grupo_id === plan.grupo_id)
        .map((alumno) => alumno.alumno_id);
      state.openPlanDraft.alumnos_ids = checked ? alumnosGrupo : [];
      persistOpenPlanSnapshotSoon('planeacion_draft_alumnos');
      renderPlaneacionesList();
    }

    function formatPlanShort(plan) {
      const materia = getMateriaById(plan.materia_id);
      const grupo = getGrupoById(plan.grupo_id);
      const semana = state.catalogos.semanas.find((item) => item.semana_id === plan.semana_id);
      return [
        grupo ? getGrupoDisplayName(grupo) : plan.grupo_id,
        getPlanMateriaDisplayLabel(plan, materia),
        semana ? (semana.nombre_visible || semana.semana_id) : plan.semana_id
      ].join(' Â· ');
    }

    function getPlanSubmateriasForMateria(materiaId) {
      const targetId = String(materiaId || '').trim();
      if (!targetId) return [];
      return (state.catalogos.submaterias || []).filter((item) => String(item.materia_id || '').trim() === targetId);
    }

    function getSubmateriaById(submateriaId) {
      const targetId = String(submateriaId || '').trim();
      if (!targetId) return null;
      return (state.catalogos.submaterias || []).find((item) => String(item.submateria_id || '').trim() === targetId) || null;
    }

    function materiaRequiresPlanSubmateria(materiaId) {
      return getPlanSubmateriasForMateria(materiaId).length > 0;
    }

    function getPlanMateriaDisplayLabel(plan, materiaRow) {
      const materia = materiaRow || getMateriaById(plan.materia_id);
      const materiaLabel = materia
        ? (materia.nombre || materia.materia_id)
        : (plan.materia_nombre || plan.materia_id || '-');
      const submateria = getSubmateriaById(plan && plan.submateria_id);
      const submateriaLabel = submateria
        ? (submateria.nombre || submateria.submateria_id)
        : (plan && plan.submateria_nombre ? String(plan.submateria_nombre).trim() : '');
      return submateriaLabel ? (materiaLabel + ' Â· ' + submateriaLabel) : materiaLabel;
    }

    function syncPlanSubmateriaSelect(preferredValue) {
      const field = $('planSubmateriaField');
      const select = $('planSubmateria');
      const materiaId = $('planMateria') ? $('planMateria').value : '';
      if (!field || !select) return;
      const submaterias = getPlanSubmateriasForMateria(materiaId);
      field.hidden = !submaterias.length;
      fillSelect(select, submaterias, (item) => item.submateria_id, (item) => item.nombre || item.submateria_id, 'Selecciona submateria');
      const nextValue = preferredValue !== undefined ? String(preferredValue || '').trim() : String(state.planEditor.selectedSubmateriaId || '').trim();
      if (nextValue && submaterias.some((item) => item.submateria_id === nextValue)) {
        select.value = nextValue;
      } else {
        select.value = '';
      }
      state.planEditor.selectedSubmateriaId = select.value || '';
      select.disabled = !submaterias.length || (state.ui && state.ui.planeacionesCatalogosLoading);
    }

    function getPlanById(planId) {
      return getPlaneacionesIndex().byId.get(String(planId || '').trim()) || null;
    }

    function getPlanByActivityId(activityId) {
      const normalizedActivityId = String(activityId || '').trim();
      if (!normalizedActivityId) return null;
      return (state.planeaciones || []).find((plan) =>
        Array.isArray(plan && plan.actividades) &&
        plan.actividades.some((actividad) => String((actividad && actividad.actividad_id) || '').trim() === normalizedActivityId)
      ) || null;
    }

    function getPlanAlumnoCount(plan) {
      if (!plan) return 0;
      if (Array.isArray(plan.alumnos) && plan.alumnos.length) return plan.alumnos.length;
      return Number(plan.alumnos_count || 0);
    }

    function getPlanActividadCount(plan) {
      if (!plan) return 0;
      if (Array.isArray(plan.actividades) && plan.actividades.length) return plan.actividades.length;
      return Number(plan.actividades_count || 0);
    }

    function getPlanLoteId(plan) {
      return String((plan && plan.planeacion_lote_id) || '').trim();
    }

    function getPlaneacionEntryKey(plan) {
      const loteId = getPlanLoteId(plan);
      return loteId ? ('lote:' + loteId) : ('plan:' + String((plan && plan.planeacion_id) || '').trim());
    }

    function buildPlaneacionEntries(plans) {
      const source = Array.isArray(plans) ? plans : [];
      const entries = [];
      const index = {};
      source.forEach((plan) => {
        const key = getPlaneacionEntryKey(plan);
        if (!index[key]) {
          index[key] = {
            key,
            loteId: getPlanLoteId(plan),
            isMulti: !!getPlanLoteId(plan),
            representative: plan,
            plans: []
          };
          entries.push(index[key]);
        }
        index[key].plans.push(plan);
      });
      return entries.map((entry) => {
        entry.isMulti = entry.plans.length > 1;
        return entry;
      });
    }

    function getVisiblePlaneacionEntries() {
      return buildPlaneacionEntries(getVisiblePlaneaciones());
    }

    function getPlaneacionEntryByKey(entryKey) {
      return buildPlaneacionEntries(state.planeaciones || []).find((entry) => entry.key === entryKey) || null;
    }

    function getOpenPlaneacionEntry(entry) {
      if (!entry) return null;
      const plans = Array.isArray(entry.plans) ? entry.plans : [];
      if (!plans.length) return null;
      const openPlanId = String(state.openPlanId || '').trim();
      if (openPlanId) {
        const matched = plans.find((plan) => String(plan.planeacion_id || '').trim() === openPlanId);
        if (matched) return matched;
      }
      if (entry.isMulti && state.ui && state.ui.multiGroupActiveChildByLote) {
        const preferredId = String(state.ui.multiGroupActiveChildByLote[entry.loteId] || '').trim();
        if (preferredId) {
          const preferred = plans.find((plan) => String(plan.planeacion_id || '').trim() === preferredId);
          if (preferred) return preferred;
        }
      }
      return plans[0];
    }

    function setMultiGroupActivePlan(loteId, planId) {
      if (!loteId || !state.ui || !state.ui.multiGroupActiveChildByLote) return;
      state.ui.multiGroupActiveChildByLote[loteId] = planId;
    }

    function isPlaneacionEntryOpen(entry) {
      if (!entry) return false;
      const openPlanId = String(state.openPlanId || '').trim();
      if (!openPlanId) return false;
      return (entry.plans || []).some((plan) => String(plan.planeacion_id || '').trim() === openPlanId);
    }

    function getPlaneacionEntryGroupLabels(entry) {
      return (entry && entry.plans || []).map((plan) => {
        const grupo = getGrupoById(plan.grupo_id);
        return grupo ? getGrupoDisplayName(grupo) : plan.grupo_id;
      });
    }

    function getPlaneacionEntryAlumnoCount(entry) {
      return (entry && entry.plans || []).reduce((sum, plan) => sum + getPlanAlumnoCount(plan), 0);
    }

    function getPlaneacionEntryActividadCount(entry) {
      const plan = entry && entry.representative;
      return getPlanActividadCount(plan);
    }

    function planEntryHasOpenMaterialAlert(entry) {
      return !!((entry && entry.plans || []).some((plan) => planHasOpenMaterialAlert(plan.planeacion_id)));
    }

    function getLatestResolvedMaterialAlertForEntry(entry) {
      const role = getCurrentRole();
      if (role !== 'admin' && role !== 'directora') return null;
      const alerts = (entry && entry.plans || [])
        .map((plan) => getLatestResolvedMaterialAlertForPlan(plan.planeacion_id))
        .filter(Boolean)
        .sort((a, b) => {
          const aDate = new Date(a.fecha_resolucion || a.fecha_actualizacion || a.fecha_creacion || 0).getTime();
          const bDate = new Date(b.fecha_resolucion || b.fecha_actualizacion || b.fecha_creacion || 0).getTime();
          return bDate - aDate;
        });
      return alerts[0] || null;
    }

    function buildMultiGroupSharedDraft(entry) {
      const selectedPlan = getOpenPlaneacionEntry(entry) || (entry && entry.representative) || null;
      if (!selectedPlan) return null;
      const semana = getWeekById(selectedPlan.semana_id);
      return {
        entryKey: entry.key,
        loteId: entry.loteId,
        basePlanId: selectedPlan.planeacion_id,
        fecha_planeacion: toYmdFrontend_((semana && semana.fecha_inicio) || ''),
        materia_id: selectedPlan.materia_id || '',
        submateria_id: selectedPlan.submateria_id || '',
        frase_semana: selectedPlan.frase_semana || '',
        activities: (selectedPlan.actividades || []).length ? (selectedPlan.actividades || []).map((actividad) => ({
          key: actividad.actividad_id || uid('ACTSHR'),
          texto: actividad.texto || '',
          material_en_carpeta: normalizeMaterialStatus(actividad.material_en_carpeta),
          realizada: normalizeRealizadaStatus(actividad.realizada),
          comentario_cierre: actividad.comentario_cierre || ''
        })) : [{ key: uid('ACTSHR'), texto: '' }],
        plans: (entry.plans || []).map((plan) => ({
          planeacion_id: plan.planeacion_id,
          last_known_updated_at: plan.fecha_actualizacion || '',
          last_known_activities_version: plan.actividades_version_actual || ''
        }))
      };
    }

    function getMultiGroupSharedDraft(entry) {
      if (!entry || !entry.isMulti) return null;
      const existing = state.multiGroupSharedDrafts[entry.key];
      const selectedPlan = getOpenPlaneacionEntry(entry);
      if (!existing || !selectedPlan || existing.basePlanId !== selectedPlan.planeacion_id) {
        state.multiGroupSharedDrafts[entry.key] = buildMultiGroupSharedDraft(entry);
      }
      return state.multiGroupSharedDrafts[entry.key] || null;
    }

    function updateMultiGroupSharedField(entryKey, field, value, rerender) {
      const draft = state.multiGroupSharedDrafts[entryKey];
      if (!draft) return;
      draft[field] = value;
      if (field === 'materia_id') {
        const nextMateriaId = String(value || '').trim();
        const currentSubmateriaId = String(draft.submateria_id || '').trim();
        const hasMatchingSubmateria = currentSubmateriaId && getPlanSubmateriasForMateria(nextMateriaId).some((item) => String(item.submateria_id || '').trim() === currentSubmateriaId);
        draft.submateria_id = hasMatchingSubmateria ? currentSubmateriaId : '';
      }
      if (rerender) renderPlaneacionesList();
    }

    function updateMultiGroupSharedActivityField(entryKey, index, field, value) {
      const draft = state.multiGroupSharedDrafts[entryKey];
      if (!draft || !draft.activities[index]) return;
      draft.activities[index][field] = value;
    }

    function addMultiGroupSharedActivity(entryKey) {
      const draft = state.multiGroupSharedDrafts[entryKey];
      if (!draft) return;
      draft.activities.push({ key: uid('ACTSHR'), texto: '' });
      renderPlaneacionesList();
    }

    function removeMultiGroupSharedActivity(entryKey, index) {
      const draft = state.multiGroupSharedDrafts[entryKey];
      if (!draft || draft.activities.length <= 1) return;
      draft.activities.splice(index, 1);
      renderPlaneacionesList();
    }

    async function switchMultiGroupPlan(planId) {
      let plan = getPlanById(planId);
      if (!plan) return;
      plan = await ensurePlaneacionDetailLoaded(planId, { silent: true });
      const loteId = getPlanLoteId(plan);
      if (loteId) setMultiGroupActivePlan(loteId, planId);
      state.openPlanId = planId;
      state.openPlanDraft = buildOpenPlanDraft(plan);
      renderPlaneacionesList();
    }

    function upsertPlaneacionRow(row) {
      if (!row || !row.planeacion_id) return null;
      const idx = state.planeaciones.findIndex((plan) => plan.planeacion_id === row.planeacion_id);
      if (idx === -1) {
        state.planeaciones.unshift(row);
        return row;
      }
      const existing = state.planeaciones[idx] || {};
      const nextRow = Object.assign({}, existing, row);
      const existingUpdatedAtMs = Date.parse(String(existing.fecha_actualizacion || ''));
      const incomingUpdatedAtMs = Date.parse(String(row.fecha_actualizacion || ''));
      const incomingLooksOlder = Number.isFinite(existingUpdatedAtMs) &&
        Number.isFinite(incomingUpdatedAtMs) &&
        incomingUpdatedAtMs < existingUpdatedAtMs;
      if (incomingLooksOlder) {
        nextRow.estado = existing.estado || nextRow.estado;
        nextRow.fecha_actualizacion = existing.fecha_actualizacion || nextRow.fecha_actualizacion;
        nextRow.actividades_version_actual = existing.actividades_version_actual || nextRow.actividades_version_actual;
        nextRow.material_confirmado = existing.material_confirmado || nextRow.material_confirmado;
        if (existing.actividades_count !== undefined) {
          nextRow.actividades_count = existing.actividades_count;
        }
        if (existing.alumnos_count !== undefined) {
          nextRow.alumnos_count = existing.alumnos_count;
        }
        if (existing._local_save_state && !row._local_save_state) {
          nextRow._local_save_state = existing._local_save_state;
          nextRow._local_save_message = existing._local_save_message || nextRow._local_save_message || '';
        }
      }
      if (row.detail_loaded === false && existing.detail_loaded && shouldPreserveSnapshotPlanDetail(row.planeacion_id)) {
        nextRow.detail_loaded = true;
        nextRow.alumnos = Array.isArray(existing.alumnos) ? existing.alumnos : [];
        nextRow.actividades = Array.isArray(existing.actividades) ? existing.actividades : [];
      }
      if (incomingLooksOlder && existing.detail_loaded) {
        nextRow.detail_loaded = true;
        nextRow.boot_detail_loaded = !!existing.boot_detail_loaded;
        nextRow.alumnos = Array.isArray(existing.alumnos) ? existing.alumnos : [];
        nextRow.actividades = Array.isArray(existing.actividades) ? existing.actividades : [];
      }
      if (row.obs_loaded === false && existing.obs_loaded) {
        nextRow.obs_semana = Array.isArray(existing.obs_semana) ? existing.obs_semana : [];
        nextRow.obs_alumno_final = Array.isArray(existing.obs_alumno_final) ? existing.obs_alumno_final : [];
        nextRow.obs_loaded = true;
      }
      if (incomingLooksOlder && existing.obs_loaded) {
        nextRow.obs_semana = Array.isArray(existing.obs_semana) ? existing.obs_semana : [];
        nextRow.obs_alumno_final = Array.isArray(existing.obs_alumno_final) ? existing.obs_alumno_final : [];
        nextRow.obs_loaded = true;
      }
      state.planeaciones.splice(idx, 1, nextRow);
      return state.planeaciones[idx];
    }

    function upsertPlaneacionesRows(rows) {
      if (!Array.isArray(rows) || !rows.length) return [];
      return rows.map((row) => upsertPlaneacionRow(row)).filter(Boolean);
    }

    function preserveOpenPlanDetailOnRowsReplace(rows, planSnapshot = null, planId = state.openPlanId) {
      const normalizedPlanId = String(planId || '').trim();
      const nextRows = Array.isArray(rows) ? rows.slice() : [];
      if (!normalizedPlanId || !nextRows.length) return nextRows;
      const preservedPlan = planSnapshot || getPlanById(normalizedPlanId) || getBootSnapshotOpenPlanById(normalizedPlanId);
      if (!(preservedPlan && preservedPlan.detail_loaded && shouldPreserveSnapshotPlanDetail(normalizedPlanId))) {
        return nextRows;
      }
      const rowIndex = nextRows.findIndex((plan) => String((plan && plan.planeacion_id) || '').trim() === normalizedPlanId);
      if (rowIndex === -1) return nextRows;
      nextRows[rowIndex] = Object.assign({}, nextRows[rowIndex], {
        detail_loaded: true,
        boot_detail_loaded: true,
        alumnos: Array.isArray(preservedPlan.alumnos) ? preservedPlan.alumnos : [],
        actividades: Array.isArray(preservedPlan.actividades) ? preservedPlan.actividades : [],
        _draft_general_observation_text: String(preservedPlan._draft_general_observation_text || ''),
        _draft_final_observations_by_key: Object.assign({}, preservedPlan._draft_final_observations_by_key || {})
      });
      if (preservedPlan.obs_loaded) {
        nextRows[rowIndex].obs_loaded = true;
        nextRows[rowIndex].obs_semana = Array.isArray(preservedPlan.obs_semana) ? preservedPlan.obs_semana : [];
        nextRows[rowIndex].obs_alumno_final = Array.isArray(preservedPlan.obs_alumno_final) ? preservedPlan.obs_alumno_final : [];
      }
      return nextRows;
    }

    function removePlaneacionRows(planIds) {
      const ids = new Set((Array.isArray(planIds) ? planIds : [planIds]).map((item) => String(item || '').trim()).filter(Boolean));
      if (!ids.size) return;
      state.planeaciones = (state.planeaciones || []).filter((plan) => !ids.has(String((plan && plan.planeacion_id) || '').trim()));
      if (state.openPlanId && ids.has(String(state.openPlanId || '').trim())) {
        state.openPlanId = '';
        state.openPlanDraft = null;
      }
    }

    function cloneJsonSafe(value, fallback) {
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (_) {
        return fallback;
      }
    }

    function buildPlanAlumnoSnapshotsByIds(alumnosIds, groupId, existingRows = []) {
      const existingMap = new Map((Array.isArray(existingRows) ? existingRows : []).map((row) => [String((row && row.alumno_id) || '').trim(), row]));
      return (Array.isArray(alumnosIds) ? alumnosIds : []).map((alumnoId) => {
        const normalizedId = String(alumnoId || '').trim();
        const existing = existingMap.get(normalizedId) || null;
        const alumno = getAlumnoById(normalizedId);
        return {
          alumno_id: normalizedId,
          grupo_snapshot: String((alumno && alumno.grupo_id) || (existing && existing.grupo_snapshot) || groupId || '').trim(),
          nombre_snapshot: String(
            (alumno && (alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id)) ||
            (existing && existing.nombre_snapshot) ||
            normalizedId
          ).trim()
        };
      });
    }

    function mergeOptimisticAlumnoFinalRows(plan, payloads) {
      const byAlumnoId = {};
      (Array.isArray(plan && plan.obs_alumno_final) ? plan.obs_alumno_final : []).forEach((row) => {
        byAlumnoId[String((row && row.alumno_id) || '').trim()] = Object.assign({}, row);
      });
      (Array.isArray(payloads) ? payloads : []).forEach((row) => {
        const alumnoId = String((row && row.alumnoId) || '').trim();
        if (!alumnoId) return;
        byAlumnoId[alumnoId] = Object.assign({}, byAlumnoId[alumnoId] || {}, {
          alumno_id: alumnoId,
          nota: String((row && row.nota) || '').trim(),
          fecha: getTodayYmdLocal(),
          fecha_creacion: new Date().toISOString()
        });
      });
      return Object.keys(byAlumnoId).map((alumnoId) => byAlumnoId[alumnoId]);
    }

    function mergeSavedObservationPreview(plan, generalText, finalPayloads) {
      if (!plan || !plan.planeacion_id) return plan;
      const nextPlan = cloneJsonSafe(plan, Object.assign({}, plan)) || Object.assign({}, plan);
      const nowIso = new Date().toISOString();
      const trimmedGeneral = String(generalText || '').trim();
      if (trimmedGeneral) {
        const current = Array.isArray(nextPlan.obs_semana) ? nextPlan.obs_semana.slice() : [];
        current.push({
          obs_semana_id: uid('TMPOS'),
          planeacion_id: nextPlan.planeacion_id,
          fecha: getTodayYmdLocal(),
          fecha_creacion: nowIso,
          texto: trimmedGeneral,
          autor_id: getCurrentUserId()
        });
        nextPlan.obs_semana = current;
        nextPlan.obs_loaded = true;
      }
      if (String(generalText || '').trim()) {
        nextPlan._draft_general_observation_text = trimmedGeneral;
      }
      if (Array.isArray(finalPayloads) && finalPayloads.length) {
        nextPlan.obs_alumno_final = mergeOptimisticAlumnoFinalRows(nextPlan, finalPayloads);
        const draftFinalMap = Object.assign({}, nextPlan._draft_final_observations_by_key || {});
        finalPayloads.forEach((row) => {
          const alumnoId = String((row && row.alumnoId) || '').trim();
          const targetPlanId = String((row && (row.planId || nextPlan.planeacion_id)) || '').trim();
          const nota = String((row && row.nota) || '').trim();
          if (!alumnoId) return;
          draftFinalMap[alumnoId] = nota;
          if (targetPlanId) draftFinalMap[targetPlanId + '::' + alumnoId] = nota;
        });
        nextPlan._draft_final_observations_by_key = draftFinalMap;
        nextPlan.obs_loaded = true;
      }
      return nextPlan;
    }

    function buildInlineSavedPlaneacionPreview(plan, optimisticPlan, updatedPlan, options = {}) {
      const basePlan = optimisticPlan || updatedPlan || plan;
      if (!basePlan || !basePlan.planeacion_id) return null;
      const nextPlan = cloneJsonSafe(basePlan, Object.assign({}, basePlan)) || Object.assign({}, basePlan);
      if (updatedPlan && typeof updatedPlan === 'object') {
        Object.keys(updatedPlan).forEach((key) => {
          if (key === 'actividades') return;
          if (updatedPlan[key] === undefined) return;
          nextPlan[key] = updatedPlan[key];
        });
      }
      if (Array.isArray(updatedPlan && updatedPlan.actividades) && updatedPlan.actividades.length) {
        const optimisticActivities = Array.isArray(optimisticPlan && optimisticPlan.actividades)
          ? optimisticPlan.actividades
          : [];
        const optimisticById = new Map(
          optimisticActivities
            .map((activity, index) => [String((activity && activity.actividad_id) || (activity && activity.orden) || index).trim(), activity])
        );
        nextPlan.actividades = updatedPlan.actividades.map((activity, index) => {
          const activityKey = String((activity && activity.actividad_id) || (activity && activity.orden) || index).trim();
          const optimisticActivity = optimisticById.get(activityKey) || optimisticActivities[index] || null;
          const mergedActivity = Object.assign({}, optimisticActivity || {}, activity || {});
          if ((!String((activity && activity.realizada) || '').trim()) && optimisticActivity) {
            mergedActivity.realizada = optimisticActivity.realizada;
          }
          if ((!String((activity && activity.comentario_cierre) || '').trim()) && optimisticActivity) {
            mergedActivity.comentario_cierre = optimisticActivity.comentario_cierre;
          }
          if ((!String((activity && activity.material_en_carpeta) || '').trim()) && optimisticActivity) {
            mergedActivity.material_en_carpeta = optimisticActivity.material_en_carpeta;
          }
          if ((!String((activity && activity.texto) || '').trim()) && optimisticActivity) {
            mergedActivity.texto = optimisticActivity.texto;
          }
          return mergedActivity;
        });
      }
      nextPlan.detail_loaded = true;
      nextPlan.boot_detail_loaded = true;
      if (Array.isArray(nextPlan.actividades) && nextPlan.actividades.length) {
        const syncedAt = String(nextPlan.fecha_actualizacion || '').trim() || new Date().toISOString();
        nextPlan.actividades = nextPlan.actividades.map((activity, index) => {
          const sourceActivity = Array.isArray(plan && plan.actividades) ? plan.actividades[index] : null;
          const normalizedActivity = Object.assign({}, sourceActivity || {}, activity || {});
          normalizedActivity.fecha_actualizacion = String(normalizedActivity.fecha_actualizacion || '').trim() || syncedAt;
          return normalizedActivity;
        });
      }
      if (options.localState !== undefined) {
        nextPlan._local_save_state = String(options.localState || '').trim();
      }
      if (options.localMessage !== undefined) {
        nextPlan._local_save_message = String(options.localMessage || '').trim();
      }
      return nextPlan;
    }

    function buildOptimisticPlaneacionSavePreview(plan, options = {}) {
      if (!plan || !plan.planeacion_id) return null;
      const nextPlan = cloneJsonSafe(plan, Object.assign({}, plan)) || Object.assign({}, plan);
      const nowIso = new Date().toISOString();
      const draft = options.draft || null;
      const request = draft ? (options.request || buildOpenPlanSaveRequest(plan, draft)) : null;
      if (draft && request) {
        const fallbackWeekId = String((request.semana && request.semana.semana_id) || '').trim() || ('SEM_' + String(draft.fecha_planeacion || request.fallbackDate || '').replace(/-/g, ''));
        nextPlan.semana_id = request.semana && !request.semana.draft ? request.semana.semana_id : fallbackWeekId;
        nextPlan.materia_id = request.materiaId;
        nextPlan.submateria_id = request.submateriaId;
        nextPlan.frase_semana = String(draft.frase_semana || '').trim();
        nextPlan.alumnos = buildPlanAlumnoSnapshotsByIds(request.alumnosIds, plan.grupo_id, plan.alumnos);
        nextPlan.alumnos_count = nextPlan.alumnos.length;
        nextPlan.actividades = request.actividades.map((activity, index) => ({
          actividad_id: String((draft.activities && draft.activities[index] && draft.activities[index].actividad_id) || '').trim(),
          orden: index + 1,
          texto: String((activity && activity.texto) || '').trim(),
          material_en_carpeta: normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere'),
          realizada: normalizeRealizadaStatus((activity && activity.realizada) || ''),
          comentario_cierre: String((activity && activity.comentario_cierre) || '').trim(),
          fecha_actualizacion: nowIso
        }));
        nextPlan.actividades_count = nextPlan.actividades.length;
        nextPlan.detail_loaded = true;
        nextPlan.boot_detail_loaded = true;
        nextPlan.fecha_actualizacion = nowIso;
      }
      if (String(options.generalText || '').trim()) {
        const current = Array.isArray(nextPlan.obs_semana) ? nextPlan.obs_semana.slice() : [];
        current.push({
          obs_semana_id: uid('TMPOS'),
          planeacion_id: plan.planeacion_id,
          fecha: getTodayYmdLocal(),
          fecha_creacion: nowIso,
          texto: String(options.generalText || '').trim(),
          autor_id: getCurrentUserId()
        });
        nextPlan.obs_semana = current;
        nextPlan.obs_loaded = true;
        nextPlan._draft_general_observation_text = String(options.generalText || '').trim();
      }
      if (Array.isArray(options.finalPayloads) && options.finalPayloads.length) {
        nextPlan.obs_alumno_final = mergeOptimisticAlumnoFinalRows(nextPlan, options.finalPayloads);
        const draftFinalMap = Object.assign({}, nextPlan._draft_final_observations_by_key || {});
        options.finalPayloads.forEach((row) => {
          const alumnoId = String((row && row.alumnoId) || '').trim();
          const targetPlanId = String((row && (row.planId || nextPlan.planeacion_id)) || '').trim();
          const nota = String((row && row.nota) || '').trim();
          if (!alumnoId) return;
          draftFinalMap[alumnoId] = nota;
          if (targetPlanId) draftFinalMap[targetPlanId + '::' + alumnoId] = nota;
        });
        nextPlan._draft_final_observations_by_key = draftFinalMap;
        nextPlan.obs_loaded = true;
      }
      nextPlan._local_save_state = String(options.localState || 'saving').trim();
      nextPlan._local_save_message = String(options.localMessage || 'Guardando cambios...').trim();
      return nextPlan;
    }

    function buildOptimisticCreatedPlaneaciones(options = {}) {
      const groupIds = Array.isArray(options.groupIds) ? options.groupIds.map((item) => String(item || '').trim()).filter(Boolean) : [];
      if (!groupIds.length) return [];
      const nowIso = new Date().toISOString();
      const materiaId = String(options.materiaId || '').trim();
      const submateriaId = String(options.submateriaId || '').trim();
      const semanaId = String((options.semana && options.semana.semana_id) || '').trim() || ('SEM_' + String(options.fechaPlaneacion || '').replace(/-/g, ''));
      const loteId = groupIds.length > 1 ? uid('TMPLTE') : '';
      const materiaRow = (state.catalogos.materias || []).find((item) => String(item.materia_id || '').trim() === materiaId) || null;
      const submateriaRow = getSubmateriaById(submateriaId);
      const facilitadorId = String((state.session && state.session.usuario && state.session.usuario.facilitador_id) || '').trim();
      return groupIds.map((groupId) => {
        const alumnosIds = (Array.isArray(options.alumnosIds) ? options.alumnosIds : []).filter((alumnoId) => {
          const alumno = getAlumnoById(alumnoId);
          return !alumno || String(alumno.grupo_id || '').trim() === groupId;
        });
        return {
          planeacion_id: uid('TMPPLA'),
          planeacion_lote_id: loteId,
          semana_id: semanaId,
          fecha_planeacion: String(options.fechaPlaneacion || '').trim(),
          facilitador_id: facilitadorId,
          grupo_id: groupId,
          materia_id: materiaId,
          submateria_id: submateriaId,
          materia_nombre: materiaRow ? (materiaRow.nombre || materiaId) : materiaId,
          submateria_nombre: submateriaRow ? (submateriaRow.nombre || submateriaId) : '',
          frase_semana: String(options.fraseSemana || '').trim(),
          estado: String(options.targetStatus || 'borrador').trim() || 'borrador',
          fecha_creacion: nowIso,
          fecha_actualizacion: nowIso,
          actividades_version_actual: '',
          actividades_count: Array.isArray(options.activities) ? options.activities.length : 0,
          alumnos_count: alumnosIds.length,
          alumnos: buildPlanAlumnoSnapshotsByIds(alumnosIds, groupId),
          actividades: (Array.isArray(options.activities) ? options.activities : []).map((activity, index) => ({
            actividad_id: '',
            orden: index + 1,
            texto: String((activity && activity.texto) || '').trim(),
            material_en_carpeta: normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere'),
            realizada: normalizeRealizadaStatus((activity && activity.realizada) || ''),
            comentario_cierre: String((activity && activity.comentario_cierre) || '').trim(),
            fecha_actualizacion: nowIso
          })),
          detail_loaded: false,
          boot_detail_loaded: true,
          obs_loaded: false,
          _local_save_state: 'creating',
          _local_save_message: 'Creando planeaciÃ³n...'
        };
      });
    }

    function applyLocalPlaneacionFeedback(planIds, stateName, message) {
      (Array.isArray(planIds) ? planIds : [planIds]).forEach((planId) => {
        const normalizedId = String(planId || '').trim();
        if (!normalizedId) return;
        const current = getPlanById(normalizedId);
        if (!current) return;
        upsertPlaneacionRow({
          planeacion_id: normalizedId,
          _local_save_state: String(stateName || '').trim(),
          _local_save_message: String(message || '').trim()
        });
      });
    }

    function scheduleClearLocalPlaneacionFeedback(planIds, delay = 1400) {
      const ids = (Array.isArray(planIds) ? planIds : [planIds]).map((planId) => String(planId || '').trim()).filter(Boolean);
      if (!ids.length) return;
      scheduleUiDebounce('plan-feedback-clear:' + ids.join(','), () => {
        ids.forEach((planId) => {
          const current = getPlanById(planId);
          if (!current) return;
          upsertPlaneacionRow({
            planeacion_id: planId,
            _local_save_state: '',
            _local_save_message: ''
          });
        });
        if (isPlaneacionesSurfaceVisible()) renderPlaneacionesList();
      }, delay);
    }

    function restorePlanEditorFromSnapshot(snapshot) {
      if (!snapshot) return;
      state.planEditor = cloneJsonSafe(snapshot, snapshot) || snapshot;
      if (state.ui) state.ui.planBuilderExpanded = true;
      renderPlanEditor();
      renderPlanBuilderVisibility();
    }

    function restorePendingPlanObservationInputs(planId, generalText, finalPayloads) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) return;
      window.requestAnimationFrame(() => {
        if (String(generalText || '').trim()) {
          const generalInput = $('obs-general-' + normalizedPlanId);
          if (generalInput) generalInput.value = String(generalText || '').trim();
        }
        (Array.isArray(finalPayloads) ? finalPayloads : []).forEach((row) => {
          const alumnoId = String((row && row.alumnoId) || '').trim();
          const targetPlanId = String((row && row.planId) || normalizedPlanId).trim();
          if (!alumnoId) return;
          const input = $('obs-final-' + targetPlanId + '-' + alumnoId);
          if (input) {
            input.value = String((row && row.nota) || '').trim();
            autoGrowObsFinal(input);
          }
        });
      });
    }

    function updateOpenPlanGeneralObservationDraft(planId, value) {
      if (!state.openPlanDraft) return;
      const normalizedPlanId = String(planId || state.openPlanDraft.planId || '').trim();
      if (!normalizedPlanId) return;
      if (String(state.openPlanDraft.planId || '').trim() !== normalizedPlanId) return;
      state.openPlanDraft.generalObservationText = String(value || '');
      const currentPlan = getPlanById(normalizedPlanId);
      if (currentPlan && currentPlan.planeacion_id) {
        upsertPlaneacionRow({
          planeacion_id: normalizedPlanId,
          _draft_general_observation_text: state.openPlanDraft.generalObservationText
        });
      }
      persistOpenPlanSnapshotSoon('planeacion_draft_obs_general');
    }

    function queuePlaneacionPostSaveSync(planId, options = {}) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) return;
      const delay = Number(options.delay || 520);
      scheduleUiDebounce('plan-post-save-sync:' + normalizedPlanId, async () => {
        try {
          if (options.refreshDetail !== false) {
            await refreshSinglePlaneacionSurface(normalizedPlanId, {
              includeAlertas: false,
              snapshotKind: options.snapshotKind || 'planeacion_post_save_sync'
            });
          }
        } catch (_) {}
        if (options.refreshObservaciones) {
          try {
            await ensurePlaneacionObservacionesLoaded(normalizedPlanId, { silent: true, force: true });
            renderPlaneacionesList();
          } catch (_) {}
        }
        if (options.refreshAlertas) {
          refreshPlaneacionesAlertsDeferred({
            force: true,
            includeStats: false,
            includePlaneaciones: false,
            delay: 120
          }).catch(() => {});
        }
      }, delay);
    }

    function appendPlaneacionesRows(rows) {
      if (!Array.isArray(rows) || !rows.length) return;
      const existingById = new Map((state.planeaciones || []).map((plan) => [plan.planeacion_id, plan]));
      const nextRows = [...(state.planeaciones || [])];
      rows.forEach((row) => {
        if (!row || !row.planeacion_id) return;
        const existing = existingById.get(row.planeacion_id);
        if (existing) {
          const existingIndex = nextRows.findIndex((plan) => plan.planeacion_id === row.planeacion_id);
          if (existingIndex >= 0) nextRows.splice(existingIndex, 1, Object.assign({}, existing, row));
          return;
        }
        nextRows.push(row);
        existingById.set(row.planeacion_id, row);
      });
      state.planeaciones = nextRows;
    }

    async function fetchPlaneacionDetalle(planId, options = {}) {
      const bypassDetailCache = options && options.bypassDetailCache === true;
      let primaryPlan = null;
      if (!bypassDetailCache) {
        try {
          const data = await api('getPlaneacionDetalle', { planeacion_id: planId, include_observaciones: false });
          if (data && data.planeacion) {
            primaryPlan = data.planeacion;
            if (primaryPlan.detail_loaded) return primaryPlan;
          }
        } catch (err) {
          if (!err || err.code !== 'NOT_FOUND') throw err;
        }
      }
      const fallback = await api('getPlaneaciones', {
        planeacion_id: planId,
        include_detail: true,
        limit: 1
      });
      const rows = Array.isArray(fallback && fallback.rows) ? fallback.rows : [];
      if (!rows.length) {
        if (primaryPlan) {
          return Object.assign({}, primaryPlan, {
            detail_loaded: true
          });
        }
        throw new Error('PlaneaciÃ³n no encontrada.');
      }
      return Object.assign({}, rows[0], {
        detail_loaded: true
      });
    }

    async function fetchPlaneacionObservaciones(planId) {
      const data = await api('getPlaneacionObservaciones', { planeacion_id: planId });
      return {
        planeacion_id: planId,
        obs_semana: Array.isArray(data && data.obs_semana) ? data.obs_semana : [],
        obs_alumno_final: Array.isArray(data && data.obs_alumno_final) ? data.obs_alumno_final : [],
        obs_loaded: true
      };
    }

    async function ensurePlaneacionDetailLoaded(planId, options = {}) {
      const current = getPlanById(planId);
      const hasUsableCurrentDetail = current && current.detail_loaded && (
        (Number(current.alumnos_count || 0) === 0 || (Array.isArray(current.alumnos) && current.alumnos.length > 0)) &&
        (Number(current.actividades_count || 0) === 0 || (Array.isArray(current.actividades) && current.actividades.length > 0))
      );
      if (hasUsableCurrentDetail && !options.force) return current;
      if (!state.ui.planDetailPromises) state.ui.planDetailPromises = {};
      if (!options.force && state.ui.planDetailPromises[planId]) {
        return state.ui.planDetailPromises[planId];
      }
      if (options.force && state.ui.planDetailPromises[planId]) {
        delete state.ui.planDetailPromises[planId];
      }
      const promise = fetchPlaneacionDetalle(planId, {
        bypassDetailCache: options.force === true
      })
        .then((detail) => {
          const updated = upsertPlaneacionRow(detail);
          if (state.openPlanId === planId && hasUsableOpenPlanDetail(updated)) {
            state.openPlanDraft = updated
              ? preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(updated), updated)
              : null;
          }
          markPlaneacionDetailFresh(planId);
          return updated;
        })
        .finally(() => {
          if (state.ui && state.ui.planDetailPromises) {
            delete state.ui.planDetailPromises[planId];
          }
        });
      state.ui.planDetailPromises[planId] = promise;
      return promise;
    }

    async function ensurePlaneacionObservacionesLoaded(planId, options = {}) {
      const current = getPlanById(planId);
      if (!current || !current.detail_loaded) return current;
      if (current.obs_loaded) return current;
      if (!options.force && getPlanLocalSaveState(current) === 'saving') return current;
      if (!options.force) {
        const snapshotObs = getSnapshotOpenPlanObservaciones(planId);
        if (snapshotObs) {
          const updatedFromSnapshot = upsertPlaneacionRow(snapshotObs);
          markPlaneacionObservacionesFresh(planId);
          if (!options.silent) renderPlaneacionesList();
          return updatedFromSnapshot;
        }
      }
      if (!state.ui.planObservacionesPromises) state.ui.planObservacionesPromises = {};
      if (state.ui.planObservacionesPromises[planId]) {
        return state.ui.planObservacionesPromises[planId];
      }
      const promise = fetchPlaneacionObservaciones(planId)
        .then((payload) => {
          const updated = upsertPlaneacionRow(payload);
          markPlaneacionObservacionesFresh(planId);
          if (!options.silent) renderPlaneacionesList();
          persistCurrentBootSnapshot('planeacion_obs_hidratadas');
          return updated;
        })
        .finally(() => {
          if (state.ui && state.ui.planObservacionesPromises) {
            delete state.ui.planObservacionesPromises[planId];
          }
        });
      state.ui.planObservacionesPromises[planId] = promise;
      return promise;
    }

    async function ensurePlaneacionEntryDetailsLoaded(entry, options = {}) {
      if (!entry || !entry.isMulti) return entry;
      const missingPlanIds = (entry.plans || [])
        .filter((plan) => !plan.detail_loaded)
        .map((plan) => plan.planeacion_id);
      if (!missingPlanIds.length) return entry;
      const concurrency = 2;
      for (let index = 0; index < missingPlanIds.length; index += concurrency) {
        const batch = missingPlanIds.slice(index, index + concurrency);
        await Promise.all(batch.map((siblingPlanId) => ensurePlaneacionDetailLoaded(siblingPlanId, { silent: true })));
      }
      const refreshedEntry = getPlaneacionEntryByKey(entry.key) || entry;
      if (!options.silent) renderPlaneacionesList();
      return refreshedEntry;
    }

    function renderPlanWeekResolved() {
      const host = $('planSemanaResolved');
      const fallbackDate = state.planEditor.mode === 'edit'
        ? toYmdFrontend_((getWeekById(state.planEditor.lockedSemanaId) || {}).fecha_inicio || '')
        : '';
      const resolvedDate = $('planFecha').value || fallbackDate;
      const week = getWeekByDateOrDraft(resolvedDate);
      const hint = week ? getSemanaHintText(week) : '';
      host.textContent = week
        ? [formatSemanaLabel(week), hint].filter(Boolean).join(' Â· ')
        : 'Selecciona una fecha.';
      host.className = 'inline-note';
      if (week) host.classList.add(String(week.cerrada_global || '').toLowerCase() === 'si' ? 'is-closed' : 'is-open');
    }

    function handlePlanFechaChanged(event) {
      const input = event && event.currentTarget ? event.currentTarget : $('planFecha');
      if (!input) return;
      if ($('planFecha') && $('planFecha') !== input) $('planFecha').value = input.value || '';
      renderPlanWeekResolved();
    }

    function renderPlanGroupChecklist() {
      const host = $('planGruposChecklist');
      const catalogsLoading = !!(state.ui && state.ui.planeacionesCatalogosLoading) && currentViewNeedsCatalogos();
      if (catalogsLoading) {
        host.innerHTML = '<div class="empty">Cargando grupos...</div>';
        return;
      }
      const editLocked = state.planEditor.mode === 'edit' && !canUseAdminShell();
      const currentSelectedGroups = getSelectedGroupIds();
      const checkedSet = new Set(
        state.planEditor.mode === 'edit'
          ? (currentSelectedGroups.length ? currentSelectedGroups : [state.planEditor.lockedGrupoId])
          : currentSelectedGroups
      );
      const groups = [...state.catalogos.grupos].sort((a, b) => getGrupoDisplayName(a).localeCompare(getGrupoDisplayName(b), 'es'));
      host.innerHTML = groups.map((group) => {
        const disabled = editLocked && group.grupo_id !== state.planEditor.lockedGrupoId;
        const checked = editLocked ? group.grupo_id === state.planEditor.lockedGrupoId : checkedSet.has(group.grupo_id);
        return (
          '<label class="check-item">' +
            '<input type="checkbox" value="' + escapeHtml(group.grupo_id) + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
            '<span><strong>' + escapeHtml(getGrupoDisplayName(group)) + '</strong></span>' +
          '</label>'
        );
      }).join('');
      window.requestAnimationFrame(() => {
        document.querySelectorAll('.obs-final-input').forEach((textarea) => autoGrowObsFinal(textarea));
        if (state.openPlanDraft && state.openPlanDraft.planId) {
          const generalInput = $('obs-general-' + state.openPlanDraft.planId);
          if (generalInput && generalInput.value !== String(state.openPlanDraft.generalObservationText || '')) {
            generalInput.value = String(state.openPlanDraft.generalObservationText || '');
          }
        }
      });
    }

    function getAlumnosByGroupId(groupId) {
      return getCatalogIndex().alumnosByGroupId.get(String(groupId || '').trim()) || [];
    }

    function getAlumnoDisplaySnapshot(alumnoRow) {
      const alumnoId = String(alumnoRow && alumnoRow.alumno_id || '').trim();
      const catalogAlumno = getCatalogIndex().alumnosById.get(alumnoId);
      return {
        nombre: catalogAlumno
          ? (catalogAlumno.nombre_mostrado || catalogAlumno.nombre_completo || catalogAlumno.alumno_id)
          : (alumnoRow && (alumnoRow.nombre_snapshot || alumnoRow.alumno_id) || alumnoId)
      };
    }

    function applyGroupSelectionToAlumnoSet(selectedSet, groupId, checked) {
      const nextSelected = selectedSet instanceof Set ? selectedSet : new Set(selectedSet || []);
      getAlumnosByGroupId(groupId).forEach((alumno) => {
        if (checked) nextSelected.add(alumno.alumno_id);
        else nextSelected.delete(alumno.alumno_id);
      });
      return nextSelected;
    }

    function renderPlanAlumnosChecklist(selectedOverride) {
      const host = $('planAlumnosChecklist');
      const catalogsLoading = !!(state.ui && state.ui.planeacionesCatalogosLoading) && currentViewNeedsCatalogos();
      if (catalogsLoading) {
        host.innerHTML = '<div class="empty">Cargando grupos y alumnos...</div>';
        return;
      }
      const selected = selectedOverride instanceof Set ? new Set(selectedOverride) : new Set(getSelectedPlanAlumnos());
      const selectedGroups = getSelectedGroupIds();
      const groupIds = state.planEditor.mode === 'edit'
        ? ((canUseAdminShell() ? selectedGroups : []).length ? selectedGroups : [state.planEditor.lockedGrupoId])
        : selectedGroups;
      if (!groupIds.length) {
        host.innerHTML = '<div class="empty">Selecciona al menos un grupo para cargar alumnos.</div>';
        return;
      }
      host.innerHTML = groupIds.map((groupId) => {
        const group = getCatalogIndex().gruposById.get(String(groupId || '').trim());
        const alumnos = getAlumnosByGroupId(groupId);
        return (
            '<div class="group-block">' +
              '<div class="group-block-head">' +
                '<div><strong>' + escapeHtml(group ? getGrupoDisplayName(group) : groupId) + '</strong></div>' +
              '</div>' +
            '<div class="checklist">' +
              alumnos.map((alumno) => {
                const label = alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id;
                return (
                  '<label class="check-item">' +
                    '<input type="checkbox" data-group-id="' + escapeHtml(groupId) + '" value="' + escapeHtml(alumno.alumno_id) + '"' + (selected.has(alumno.alumno_id) ? ' checked' : '') + '>' +
                    '<span><strong>' + escapeHtml(label) + '</strong></span>' +
                  '</label>'
                );
              }).join('') +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    function handlePlanGroupChecklistChange(event) {
      const input = event && event.target;
      if (!input || input.type !== 'checkbox') return;
      const selected = applyGroupSelectionToAlumnoSet(new Set(getSelectedPlanAlumnos()), input.value, !!input.checked);
      renderPlanAlumnosChecklist(selected);
    }

    function renderPlanActivitiesEditor() {
      const host = $('planActivitiesList');
      if (!state.planEditor.activities.length) state.planEditor.activities = [createEmptyActivityDraft()];
      const showSeguimientoFields = canUseAdminShell() && state.planEditor.mode === 'edit';
      host.innerHTML = state.planEditor.activities.map((activity, index) => {
        const seguimientoHtml = showSeguimientoFields
          ? '<div class="activity-inline-grid">' +
              '<div><label>Material</label><select onchange="updateEditorActivityField(' + index + ', \'material_en_carpeta\', this.value)"><option value="no_requiere"' + (activity.material_en_carpeta === 'no_requiere' ? ' selected' : '') + '>No requiere</option><option value="listo"' + (activity.material_en_carpeta === 'listo' ? ' selected' : '') + '>Listo</option><option value="no_listo"' + (activity.material_en_carpeta === 'no_listo' ? ' selected' : '') + '>No listo</option></select></div>' +
              '<div><label>¿Se realizó esta actividad?</label><select onchange="updateEditorActivityField(' + index + ', \'realizada\', this.value)"><option value=""' + (!activity.realizada ? ' selected' : '') + '>Pendiente</option><option value="si"' + (activity.realizada === 'si' ? ' selected' : '') + '>Sí</option><option value="no"' + (activity.realizada === 'no' ? ' selected' : '') + '>No</option></select></div>' +
              '<div><label>Comentario</label><input type="text" value="' + escapeHtml(activity.comentario_cierre || '') + '" onchange="updateEditorActivityField(' + index + ', \'comentario_cierre\', this.value)"></div>' +
            '</div>'
          : '<div class="activity-inline-grid">' +
              '<div><label>Material</label><select onchange="updateEditorActivityField(' + index + ', \'material_en_carpeta\', this.value)"><option value="no_requiere"' + (activity.material_en_carpeta === 'no_requiere' ? ' selected' : '') + '>No requiere</option><option value="listo"' + (activity.material_en_carpeta === 'listo' ? ' selected' : '') + '>Listo</option><option value="no_listo"' + (activity.material_en_carpeta === 'no_listo' ? ' selected' : '') + '>No listo</option></select></div>' +
              '<div class="helper" style="grid-column: span 2;">El seguimiento de realizada / no realizada se captura al cerrar la semana.</div>' +
            '</div>';
        return (
          '<div class="activity-editor">' +
            '<div class="activity-editor-top">' +
              '<span class="activity-chip">Actividad ' + (index + 1) + '</span>' +
              '<div class="actions compact activity-remove-desktop">' +
                '<button class="btn-ghost" type="button" onclick="removeEditorActivity(' + index + ')">Quitar</button>' +
              '</div>' +
            '</div>' +
            '<textarea onchange="updateEditorActivityField(' + index + ', \'texto\', this.value)">' + escapeHtml(activity.texto || '') + '</textarea>' +
            seguimientoHtml +
            '<div class="activity-remove-mobile">' +
              '<button class="btn-ghost" type="button" onclick="removeEditorActivity(' + index + ')">Quitar actividad</button>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    function renderPlanEditor() {
      const isEdit = state.planEditor.mode === 'edit';
      const currentPlan = isEdit ? getPlanById(state.planEditor.planId) : null;
      const canEditDate = !isEdit || canUseAdminShell() || (currentPlan && ['borrador', 'activa', 'rechazada'].includes(String(currentPlan.estado || '').trim()));
      const catalogsLoading = !!(state.ui && state.ui.planeacionesCatalogosLoading) && currentViewNeedsCatalogos();
      const loadingNote = $('planBuilderLoadingNote');
      const primarySaveBtn = $('savePlanBtn');
      const draftSaveBtn = $('savePlanDraftBtn');
      const activeSaveBtn = $('savePlanActiveBtn');
      $('planEditorTitle').textContent = isEdit ? 'Editar planeaciÃ³n' : 'Plan';
      if (primarySaveBtn) {
        primarySaveBtn.hidden = !isEdit;
        primarySaveBtn.textContent = 'Guardar cambios';
        primarySaveBtn.disabled = catalogsLoading;
      }
      if (draftSaveBtn) {
        draftSaveBtn.hidden = isEdit;
        draftSaveBtn.disabled = catalogsLoading;
      }
      if (activeSaveBtn) {
        activeSaveBtn.hidden = isEdit;
        activeSaveBtn.disabled = catalogsLoading;
      }
      $('planFecha').disabled = !canEditDate;
      $('planMateria').disabled = catalogsLoading;
      if ($('planSubmateria')) $('planSubmateria').disabled = catalogsLoading;
      $('planFrase').disabled = catalogsLoading;
      $('selectAllVisibleAlumnosBtn').disabled = catalogsLoading;
      $('clearVisibleAlumnosBtn').disabled = catalogsLoading;
      $('addActivityBtn').disabled = catalogsLoading;
      if (loadingNote) loadingNote.hidden = !catalogsLoading;
      renderPlanWeekResolved();
      syncPlanSubmateriaSelect();
      renderPlanGroupChecklist();
      renderPlanAlumnosChecklist();
      renderPlanActivitiesEditor();
      renderPlanBuilderVisibility();
    }

    function renderBaseSelects(options = {}) {
      const shouldRenderPlaneaciones = options.planeaciones !== false && (
        currentViewNeedsPlaneaciones() ||
        isPlaneacionesSurfaceVisible() ||
        isPlanBuilderExpanded() ||
        !!state.openPlanId
      );
      const shouldRenderSeguimiento = !!options.seguimiento;
      const shouldRenderReportes = !!options.reportes;

      if (shouldRenderPlaneaciones) {
        fillSelect($('planMateria'), state.catalogos.materias, (m) => m.materia_id, (m) => m.nombre || m.materia_id, 'Selecciona materia');
        syncPlanSubmateriaSelect();
        fillSelect($('filterSemana'), getSortedSemanas(), (s) => s.semana_id, (s) => s.nombre_visible || s.semana_id, 'Todas las semanas');
        fillSelect($('filterGrupo'), state.catalogos.grupos, (g) => g.grupo_id, (g) => getGrupoDisplayName(g), 'Todos los grupos');
        if (canUseAdminShell()) {
          fillSelect($('filterFacilitador'), state.catalogos.facilitadores.filter((item) => isTruthyValue(item.activo)), (f) => f.facilitador_id, (f) => f.nombre_mostrado || f.nombre_completo || f.facilitador_id, 'Todos los facilitadores');
        }
        renderPlanEditor();
      }

      if (shouldRenderSeguimiento) {
        fillSelect($('evaAlumno'), state.catalogos.alumnos, (a) => a.alumno_id, (a) => (a.nombre_mostrado || a.nombre_completo) + ' Â· ' + a.alumno_id, 'Selecciona alumno');
        fillSelect($('notaAlumno'), state.catalogos.alumnos, (a) => a.alumno_id, (a) => (a.nombre_mostrado || a.nombre_completo) + ' Â· ' + a.alumno_id, 'Selecciona alumno');
        fillSelect($('evaMateria'), state.catalogos.materias, (m) => m.materia_id, (m) => m.nombre || m.materia_id, 'Selecciona materia');
        fillSelect($('obsPlan'), state.planeaciones, (p) => p.planeacion_id, (p) => formatPlanShort(p), 'Selecciona planeaciÃ³n');
      }

      if (shouldRenderReportes) {
        const reportUi = getReportSelectionState();
        fillSelect($('repAlumno'), state.catalogos.alumnos, (a) => a.alumno_id, (a) => (a.nombre_mostrado || a.nombre_completo) + ' Â· ' + a.alumno_id, 'Selecciona alumno');
        if ($('repAlumno') && reportUi.alumno_id) $('repAlumno').value = reportUi.alumno_id;
      }
    }

    function updateEditorActivityField(index, field, value) {
      if (!state.planEditor.activities[index]) return;
      state.planEditor.activities[index][field] = value;
    }

    function addEditorActivity() {
      state.planEditor.activities.push(createEmptyActivityDraft());
      renderPlanActivitiesEditor();
    }

    function removeEditorActivity(index) {
      if (state.planEditor.activities.length <= 1) return;
      state.planEditor.activities.splice(index, 1);
      renderPlanActivitiesEditor();
    }

    function moveEditorActivity(index, direction) {
      const target = index + direction;
      if (target < 0 || target >= state.planEditor.activities.length) return;
      const copy = [...state.planEditor.activities];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      state.planEditor.activities = copy;
      renderPlanActivitiesEditor();
    }

    function togglePlanAlumnosByGroup(groupId, checked) {
      Array.from($('planAlumnosChecklist').querySelectorAll('input[data-group-id="' + groupId + '"]')).forEach((input) => {
        input.checked = checked;
      });
    }

    function toggleAllVisibleAlumnos(checked) {
      Array.from($('planAlumnosChecklist').querySelectorAll('input[type="checkbox"]')).forEach((input) => {
        input.checked = checked;
      });
    }

    function toggleAllGroups(checked) {
      if (state.planEditor.mode === 'edit') return;
      Array.from($('planGruposChecklist').querySelectorAll('input[type="checkbox"]')).forEach((input) => {
        input.checked = checked;
      });
      if (!checked) {
        renderPlanAlumnosChecklist(new Set());
        return;
      }
      const selected = new Set();
      getSelectedGroupIds().forEach((groupId) => applyGroupSelectionToAlumnoSet(selected, groupId, true));
      renderPlanAlumnosChecklist(selected);
    }

    function renderObsAlumnoSelect() {
      const plan = getPlanById($('obsPlan').value);
      const host = $('obsAlumno');
      if (!plan) {
        host.innerHTML = '<option value="">Selecciona alumno</option>';
        return;
      }
      const alumnos = (plan.alumnos || []).map((pa) => {
        const alumno = state.catalogos.alumnos.find((row) => row.alumno_id === pa.alumno_id);
        return {
          alumno_id: pa.alumno_id,
          nombre: alumno ? (alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id) : (pa.nombre_snapshot || pa.alumno_id)
        };
      });
      fillSelect(host, alumnos, (a) => a.alumno_id, (a) => a.nombre + ' Â· ' + a.alumno_id, 'Selecciona alumno');
    }

    function renderEvaluationDependencies() {
      const materiaId = $('evaMateria').value;
      const submaterias = state.catalogos.submaterias.filter((item) => !materiaId || item.materia_id === materiaId);
      const habilidades = state.catalogos.habilidades.filter((item) => !materiaId || item.materia_id === materiaId);
      fillSelect($('evaSubmateria'), submaterias, (item) => item.submateria_id, (item) => item.nombre || item.submateria_id, 'Selecciona submateria');
      fillSelect($('evaHabilidad'), habilidades, (item) => item.habilidad_id, (item) => item.nombre || item.habilidad_id, 'Selecciona habilidad');
    }
    function renderAlumnoFilterUi() {
      const search = $('filterAlumnoSearch');
      const dataList = $('filterAlumnoSuggestions');
      const hidden = $('filterAlumnoId');
      const chip = $('filterAlumnoChip');
      if (!search || !dataList || !hidden || !chip) return;
      const rows = [...state.catalogos.alumnos]
        .map((alumno) => {
          const label = [alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id, alumno.matricula || '', alumno.alumno_id]
            .filter(Boolean)
            .join(' Â· ');
          return { id: alumno.alumno_id, label };
        })
        .sort((a, b) => a.label.localeCompare(b.label, 'es', { sensitivity: 'base' }));
      dataList.innerHTML = rows.map((row) => '<option value="' + escapeHtml(row.label) + '"></option>').join('');
      const active = rows.find((row) => row.id === hidden.value) || null;
      chip.textContent = active ? ('Alumno: ' + active.label) : 'Sin filtro de alumno';
      if (active && search.value !== active.label) search.value = active.label;
    }

    function syncAlumnoFilterFromInput() {
      const search = $('filterAlumnoSearch');
      const hidden = $('filterAlumnoId');
      if (!search || !hidden) return;
      const query = String(search.value || '').trim().toLowerCase();
      if (!query) {
        hidden.value = '';
        renderAlumnoFilterUi();
        return;
      }
      const match = state.catalogos.alumnos.find((alumno) => {
        const label = [alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id, alumno.matricula || '', alumno.alumno_id]
          .filter(Boolean)
          .join(' Â· ')
          .toLowerCase();
        return label === query;
      });
      hidden.value = match ? match.alumno_id : '';
      renderAlumnoFilterUi();
    }

    function clearAlumnoFilter() {
      if ($('filterAlumnoSearch')) $('filterAlumnoSearch').value = '';
      if ($('filterAlumnoId')) $('filterAlumnoId').value = '';
      renderAlumnoFilterUi();
    }

    function syncNotePeriodoState() {
      const alcance = $('notaAlcance').value;
      const periodo = $('notaPeriodo');
      const isGlobal = alcance === 'global';
      periodo.disabled = isGlobal;
      if (isGlobal) {
        periodo.value = '';
      }
    }

    function getVisiblePlaneaciones() {
      const role = state.session && state.session.usuario ? state.session.usuario.rol : '';
      let rows = [...state.planeaciones];
      const materiaFilter = String((state.ui && state.ui.planeacionesMateriaFilter) || '').trim();
      if (role === 'facilitador') {
        rows = rows.filter((plan) => !['cerrada', 'archivada', 'cierre_pendiente'].includes(plan.estado));
      }
      if (materiaFilter) {
        rows = rows.filter((plan) => String(plan.materia_id || '').trim() === materiaFilter);
      }
      return rows;
    }

    function getPlanGeneralObservations(plan) {
      return Array.isArray(plan.obs_semana) ? plan.obs_semana : [];
    }

    function getPlanAlumnoFinalMap(plan) {
      return (Array.isArray(plan.obs_alumno_final) ? plan.obs_alumno_final : []).reduce((acc, row) => {
        acc[row.alumno_id] = row;
        return acc;
      }, {});
    }

    function getPlaneacionEntryAlumnoRows(entry) {
      return (entry && entry.plans || []).flatMap((plan) => {
        const grupo = getGrupoById(plan.grupo_id);
        const grupoLabel = grupo ? getGrupoDisplayName(grupo) : plan.grupo_id;
        return (Array.isArray(plan.alumnos) ? plan.alumnos : []).map((row) => Object.assign({}, row, {
          planeacion_id: plan.planeacion_id,
          grupo_id: plan.grupo_id,
          grupo_label: grupoLabel
        }));
      });
    }

    function getPlaneacionEntryAlumnoFinalMap(entry) {
      return (entry && entry.plans || []).reduce((acc, plan) => {
        (Array.isArray(plan.obs_alumno_final) ? plan.obs_alumno_final : []).forEach((row) => {
          acc[plan.planeacion_id + '::' + row.alumno_id] = row;
        });
        return acc;
      }, {});
    }

    async function togglePlanOpen(button, planId) {
      if (state.openPlanId === planId) {
        state.openPlanId = '';
        state.openPlanDraft = null;
        if (state.ui) state.ui.openPlanLoadingId = '';
        persistCurrentBootSnapshot('planeacion_cerrada');
        renderPlaneacionesList();
        return;
      }
      const currentPlan = getPlanById(planId);
      if (isPlaneacionPendingCreation(currentPlan)) {
        setBanner('La planeaciÃ³n se estÃ¡ creando. Espera un momento para abrirla.', 'info', { button });
        return;
      }
      if (state.ui) state.ui.openPlanLoadingId = planId;
      state.openPlanId = planId;
      state.openPlanDraft = null;
      const previewPlan = buildPlaneacionOpenPreviewRow(currentPlan);
      if (previewPlan) upsertPlaneacionRow(previewPlan);
      if (currentPlan) {
        const loteId = getPlanLoteId(currentPlan);
        if (loteId) setMultiGroupActivePlan(loteId, planId);
      }
      closePlanBuilder();
      renderPlaneacionesList();
      await handleAction('togglePlanOpen', async () => {
        const detailPromise = ensurePlaneacionDetailLoaded(planId, { silent: true });
        const plan = await detailPromise;
        const entry = getPlaneacionEntryByKey(getPlaneacionEntryKey(plan));
        if (entry && entry.isMulti) {
          ensurePlaneacionEntryDetailsLoaded(entry, { silent: true }).then(() => {
            if (state.openPlanId !== planId) return;
            const refreshedPlan = getPlanById(planId) || plan;
            state.openPlanDraft = refreshedPlan && hasUsableOpenPlanDetail(refreshedPlan)
              ? preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(refreshedPlan), refreshedPlan)
              : null;
            persistCurrentBootSnapshot('planeacion_abierta_multigrupo');
            renderPlaneacionesList();
          }).catch(() => {});
        }
        if (state.ui) state.ui.openPlanLoadingId = '';
        state.openPlanDraft = plan && hasUsableOpenPlanDetail(plan)
          ? preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(plan), plan)
          : null;
        persistCurrentBootSnapshot('planeacion_abierta');
        renderPlaneacionesList();
        scheduleAfterPaint(() => {
          if (state.openPlanId !== planId) return null;
          return ensurePlaneacionObservacionesLoaded(planId, { silent: true })
            .then(() => {
              if (state.openPlanId !== planId) return;
              renderPlaneacionesList();
            })
            .catch(() => null);
        }, 120);
        scheduleAfterPaint(() => {
          if (state.openPlanId !== planId) return null;
          return ensurePlaneacionesCatalogosAvailable({ render: false, scope: 'editor' })
            .then(() => {
              if (state.openPlanId !== planId) return;
              const refreshedPlan = getPlanById(planId) || plan;
              state.openPlanDraft = refreshedPlan && hasUsableOpenPlanDetail(refreshedPlan)
                ? preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(refreshedPlan), refreshedPlan)
                : null;
              renderPlaneacionesList();
            })
            .catch(() => state.catalogos);
        }, 140);
        scheduleAfterPaint(() => {
          if (state.openPlanId !== planId) return null;
          const currentOpenPlan = getPlanById(planId);
          if (currentOpenPlan && currentOpenPlan.detail_loaded) return null;
          return ensurePlaneacionDetailLoaded(planId, { silent: true, force: true })
            .then((retryPlan) => {
              if (state.openPlanId !== planId) return;
              if (state.ui) state.ui.openPlanLoadingId = '';
              state.openPlanDraft = retryPlan && hasUsableOpenPlanDetail(retryPlan)
                ? preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(retryPlan), retryPlan)
                : null;
              renderPlaneacionesList();
            })
            .catch(() => null);
        }, 2600);
      }, {
        button,
        key: buildActionKey('togglePlanOpen', [planId]),
        busyText: 'Abriendo...',
        onError: () => {
          if (state.openPlanId === planId) {
            state.openPlanId = '';
            state.openPlanDraft = null;
          }
          if (state.ui && state.ui.openPlanLoadingId === planId) {
            state.ui.openPlanLoadingId = '';
          }
          renderPlaneacionesList();
          return false;
        }
      });
      renderPlaneacionesList();
      if (state.openPlanId) {
        window.requestAnimationFrame(() => {
          const card = $('plan-card-' + planId);
          if (card && typeof card.scrollIntoView === 'function') {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }

    function renderOpenPlanGroupSpecificEditor(plan) {
      const draft = getOpenPlanDraft(plan);
      if (!draft) {
        return (
          '<div class="plan-inline-feedback is-pending">' +
            '<span class="plan-inline-feedback-dot" aria-hidden="true"></span>' +
            '<span class="plan-inline-feedback-label">Abriendo</span>' +
            '<span class="plan-inline-feedback-text">Cargando alumnos y actividades...</span>' +
          '</div>'
        );
      }
      const entry = getPlaneacionEntryByKey(getPlaneacionEntryKey(plan));
      const isMulti = !!(entry && entry.isMulti);
      const showSeguimientoFields = String(plan.estado || '').trim() === 'activa';
      const activePlanActivities = Array.isArray(plan.actividades) ? plan.actividades : [];
      const activitiesSource = Array.isArray(draft.activities) && draft.activities.some((activity) => String((activity && activity.texto) || '').trim() || String((activity && activity.actividad_id) || '').trim())
        ? draft.activities
        : activePlanActivities.map((activity) => ({
            key: activity.actividad_id || uid('ACTOPEN'),
            actividad_id: activity.actividad_id || '',
            texto: activity.texto || '',
            material_en_carpeta: normalizeMaterialStatus(activity.material_en_carpeta),
            realizada: normalizeRealizadaStatus(activity.realizada),
            comentario_cierre: activity.comentario_cierre || '',
            last_known_updated_at: activity.fecha_actualizacion || ''
          }));
      const activitiesHtml = isMulti ? '' : activitiesSource.map((activity, index) => (
        '<div class="activity-editor">' +
          '<div class="activity-editor-top">' +
            '<span class="activity-chip">Actividad ' + (index + 1) + '</span>' +
          '</div>' +
          '<div class="activity-inline-grid">' +
            '<div><label>Material</label><select id="activity-material-' + escapeHtml(activity.actividad_id) + '" onchange="updateOpenPlanDraftActivityField(' + index + ', \'material_en_carpeta\', this.value)">' +
              '<option value="no_requiere"' + (activity.material_en_carpeta === 'no_requiere' ? ' selected' : '') + '>No requiere</option>' +
              '<option value="listo"' + (activity.material_en_carpeta === 'listo' ? ' selected' : '') + '>Listo</option>' +
              '<option value="no_listo"' + (activity.material_en_carpeta === 'no_listo' ? ' selected' : '') + '>No listo</option>' +
            '</select></div>' +
            (showSeguimientoFields
              ? '<div><label>¿Se realizó esta actividad?</label><select id="activity-realizada-' + escapeHtml(activity.actividad_id) + '" onchange="updateOpenPlanDraftActivityField(' + index + ', \'realizada\', this.value)">' +
                  '<option value=""' + (!activity.realizada ? ' selected' : '') + '>Pendiente</option>' +
                  '<option value="si"' + (activity.realizada === 'si' ? ' selected' : '') + '>Sí</option>' +
                  '<option value="no"' + (activity.realizada === 'no' ? ' selected' : '') + '>No</option>' +
                '</select></div>' +
                '<div><label>Comentario</label><input id="activity-comment-' + escapeHtml(activity.actividad_id) + '" type="text" value="' + escapeHtml(activity.comentario_cierre || '') + '" onchange="updateOpenPlanDraftActivityField(' + index + ', \'comentario_cierre\', this.value)"></div>'
              : '<div class="helper" style="grid-column: span 2;">El seguimiento de realizada / no realizada se captura al cerrar la semana.</div>') +
          '</div>' +
        '</div>'
      )).join('');

      const allStudentBlocks = (() => {
        const plansToRender = isMulti ? (entry.plans || []) : [plan];
        return plansToRender.map((groupPlan) => {
          const isActiveGroup = groupPlan.planeacion_id === plan.planeacion_id;
          const groupDraft = isActiveGroup ? draft : null;
          const initialSelectedIds = (
            isActiveGroup
              ? (groupDraft && groupDraft.alumnos_ids || [])
              : ((Array.isArray(groupPlan.alumnos) ? groupPlan.alumnos : []).map((row) => row.alumno_id))
          );
          const alumnosGrupo = getAlumnosByGroupId(groupPlan.grupo_id);
          const selectedIds = new Set(
            (!initialSelectedIds.length &&
              Number(groupPlan.alumnos_count || 0) > 0 &&
              Number(groupPlan.alumnos_count || 0) === alumnosGrupo.length)
              ? alumnosGrupo.map((alumno) => alumno.alumno_id)
              : initialSelectedIds
          );
          const grupo = getGrupoById(groupPlan.grupo_id);
          const grupoLabel = grupo ? getGrupoDisplayName(grupo) : groupPlan.grupo_id;
          return (
            '<div class="group-block">' +
              '<div class="group-block-head">' +
                '<div><strong>' + escapeHtml(grupoLabel) + '</strong></div>' +
                (isActiveGroup
                  ? '<div class="actions compact">' +
                      '<button class="btn-ghost" type="button" onclick="toggleAllOpenPlanDraftAlumnos(true)">Seleccionar todos</button>' +
                      '<button class="btn-ghost" type="button" onclick="toggleAllOpenPlanDraftAlumnos(false)">Limpiar</button>' +
                    '</div>'
                  : '') +
              '</div>' +
              '<div class="group-block plan-open-students">' +
                (alumnosGrupo.map((alumno) => (
                  '<label class="check-item">' +
                    '<input type="checkbox" value="' + escapeHtml(alumno.alumno_id) + '"' + (selectedIds.has(alumno.alumno_id) ? ' checked' : '') + (isActiveGroup ? '' : ' disabled') + ' onchange="toggleOpenPlanDraftAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this.checked)">' +
                    '<span><strong>' + escapeHtml(alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id) + '</strong></span>' +
                  '</label>'
                )).join('') || '<div class="empty">No hay alumnos activos en este grupo.</div>') +
              '</div>' +
            '</div>'
          );
        }).join('');
      })();

      return (
        '<div class="plan-open-editor plan-open-editor-group">' +
          '<div>' +
            '<div class="card-head inline-head">' +
              '<div><label>' + (isMulti ? 'Alumnos' : 'Alumnos del grupo') + '</label>' + (isMulti ? '' : '<p class="subtle">Esta selecciÃ³n solo afecta al grupo actual.</p>') + '</div>' +
            '</div>' +
            '<div class="stack">' + allStudentBlocks + '</div>' +
          '</div>' +
          (isMulti
            ? ''
            : '<div>' +
            '<div class="card-head inline-head">' +
              '<div><label>Seguimiento del grupo</label><p class="subtle">Material, realizada y comentario se guardan por grupo.</p></div>' +
            '</div>' +
            '<div class="stack">' + activitiesHtml + '</div>' +
          '</div>') +
        '</div>'
      );
    }

    function renderMultiGroupSharedActivities(entry) {
      const draft = getMultiGroupSharedDraft(entry);
      if (!draft) return '';
      return (
        '<div>' +
          '<div class="card-head inline-head">' +
            '<div><label>Actividades</label></div>' +
          '</div>' +
          '<div class="stack">' + (draft.activities || []).map((activity, index) => (
            '<div class="activity-editor">' +
              '<div class="activity-editor-top">' +
                '<span class="activity-chip">Actividad ' + (index + 1) + '</span>' +
                '<div class="actions compact">' +
                  '<button class="btn-ghost" type="button" onclick="removeMultiGroupSharedActivity(\'' + escapeJsAttrValue(entry.key) + '\', ' + index + ')">Quitar</button>' +
                '</div>' +
              '</div>' +
              '<textarea onchange="updateMultiGroupSharedActivityField(\'' + escapeJsAttrValue(entry.key) + '\', ' + index + ', \'texto\', this.value)">' + escapeHtml(activity.texto || '') + '</textarea>' +
              '<div class="activity-inline-grid">' +
                '<div><label>Material compartido</label><select onchange="updateMultiGroupSharedActivityField(\'' + escapeJsAttrValue(entry.key) + '\', ' + index + ', \'material_en_carpeta\', this.value)">' +
                  '<option value="no_requiere"' + (activity.material_en_carpeta === 'no_requiere' ? ' selected' : '') + '>No requiere</option>' +
                  '<option value="listo"' + (activity.material_en_carpeta === 'listo' ? ' selected' : '') + '>Listo</option>' +
                  '<option value="no_listo"' + (activity.material_en_carpeta === 'no_listo' ? ' selected' : '') + '>No listo</option>' +
                '</select></div>' +
                '<div><label>¿Se realizó?</label><select onchange="updateMultiGroupSharedActivityField(\'' + escapeJsAttrValue(entry.key) + '\', ' + index + ', \'realizada\', this.value)">' +
                  '<option value=""' + (!activity.realizada ? ' selected' : '') + '>Pendiente</option>' +
                  '<option value="si"' + (activity.realizada === 'si' ? ' selected' : '') + '>Sí</option>' +
                  '<option value="no"' + (activity.realizada === 'no' ? ' selected' : '') + '>No</option>' +
                '</select></div>' +
                '<div><label>Comentario compartido</label><input type="text" value="' + escapeHtml(activity.comentario_cierre || '') + '" onchange="updateMultiGroupSharedActivityField(\'' + escapeJsAttrValue(entry.key) + '\', ' + index + ', \'comentario_cierre\', this.value)"></div>' +
              '</div>' +
            '</div>'
          )).join('') + '</div>' +
          '<div class="plan-activities-add-wrap">' +
            '<button class="btn-accent plan-activities-add-btn" type="button" onclick="addMultiGroupSharedActivity(\'' + escapeJsAttrValue(entry.key) + '\')">Agregar otra actividad</button>' +
          '</div>' +
        '</div>'
      );
    }

    function renderMultiGroupSharedEditor(entry) {
      const draft = getMultiGroupSharedDraft(entry);
      if (!draft) return '';
      const selectedPlan = getOpenPlaneacionEntry(entry);
      const selectedMateriaId = String((draft && draft.materia_id) || (selectedPlan || {}).materia_id || '').trim();
      const selectedSubmaterias = getPlanSubmateriasForMateria(selectedMateriaId);
      const week = getWeekByDateOrDraft(draft.fecha_planeacion || toYmdFrontend_((getWeekById((selectedPlan || {}).semana_id) || {}).fecha_inicio || ''));
      const weekText = week ? formatSemanaLabel(week) : 'Selecciona una fecha.';
      return (
        '<div class="plan-multigroup-shared">' +
          '<div class="plan-multigroup-header">' +
            '<div>' +
              '<div class="plan-multigroup-title">PlaneaciÃ³n multigrupo</div>' +
              '<div class="plan-multigroup-groups">' + getPlaneacionEntryGroupLabels(entry).map((label) => '<span class="plan-multigroup-chip">' + escapeHtml(label) + '</span>').join('') + '</div>' +
            '</div>' +
            '<div class="mini">' + escapeHtml(String((entry.plans || []).length)) + ' grupos vinculados</div>' +
          '</div>' +
          '<div class="grid-3">' +
            '<div class="plan-date-detected-field"><label>Fecha:</label><input type="date" value="' + escapeHtml(draft.fecha_planeacion || '') + '" oninput="updateMultiGroupSharedField(\'' + escapeJsAttrValue(entry.key) + '\', \'fecha_planeacion\', this.value, true)" onchange="updateMultiGroupSharedField(\'' + escapeJsAttrValue(entry.key) + '\', \'fecha_planeacion\', this.value, true)"><div class="plan-date-inline-meta"><div class="plan-date-resolved-head">Semana:</div><div class="inline-note ' + (week && String(week.cerrada_global || '').toLowerCase() === 'si' ? 'is-closed' : 'is-open') + '">' + escapeHtml(weekText) + '</div></div></div>' +
            '<div><label>Materia</label><select onchange="updateMultiGroupSharedField(\'' + escapeJsAttrValue(entry.key) + '\', \'materia_id\', this.value, true)">' +
              '<option value="">Selecciona materia</option>' +
              (state.catalogos.materias || []).map((item) => '<option value="' + escapeHtml(item.materia_id) + '"' + (String(item.materia_id || '') === selectedMateriaId ? ' selected' : '') + '>' + escapeHtml(item.nombre || item.materia_id) + '</option>').join('') +
            '</select></div>' +
            (selectedSubmaterias.length
              ? '<div><label>Submateria</label><select onchange="updateMultiGroupSharedField(\'' + escapeJsAttrValue(entry.key) + '\', \'submateria_id\', this.value, true)">' +
                  '<option value="">Selecciona submateria</option>' +
                  selectedSubmaterias.map((item) => '<option value="' + escapeHtml(item.submateria_id) + '"' + (String(draft.submateria_id || '') === String(item.submateria_id || '') ? ' selected' : '') + '>' + escapeHtml(item.nombre || item.submateria_id) + '</option>').join('') +
                '</select></div>'
              : '') +
          '</div>' +
          '<div class="plan-inline-field">' +
            '<label>Frase de la semana</label>' +
            '<textarea onchange="updateMultiGroupSharedField(\'' + escapeJsAttrValue(entry.key) + '\', \'frase_semana\', this.value)">' + escapeHtml(draft.frase_semana || '') + '</textarea>' +
          '</div>' +
        '</div>'
      );
    }

    function renderOpenPlanStructureEditor(plan, allowStructureEdit, options = {}) {
      if (!allowStructureEdit) return '';
      if (options.groupSpecificOnly) return renderOpenPlanGroupSpecificEditor(plan);
      const draft = getOpenPlanDraft(plan);
      if (!draft) {
        return (
          '<div class="plan-inline-feedback is-pending">' +
            '<span class="plan-inline-feedback-dot" aria-hidden="true"></span>' +
            '<span class="plan-inline-feedback-label">Abriendo</span>' +
            '<span class="plan-inline-feedback-text">Cargando alumnos y actividades...</span>' +
          '</div>'
        );
      }
        const selectedMateriaId = String((draft && draft.materia_id) || plan.materia_id || '').trim();
        const submaterias = getPlanSubmateriasForMateria(selectedMateriaId);
        const week = getWeekByDateOrDraft(draft.fecha_planeacion || toYmdFrontend_((getWeekById(plan.semana_id) || {}).fecha_inicio || ''));
        const weekText = week ? formatSemanaLabel(week) : 'Selecciona una fecha.';
        const alumnosGrupoCatalogo = state.catalogos.alumnos.filter((alumno) => alumno.grupo_id === plan.grupo_id);
        const alumnosGrupo = alumnosGrupoCatalogo.length
          ? alumnosGrupoCatalogo
          : ((Array.isArray(plan.alumnos) ? plan.alumnos : []).map((row) => ({
              alumno_id: row.alumno_id,
              grupo_id: plan.grupo_id,
              nombre_mostrado: row.nombre_snapshot || row.alumno_id,
              nombre_completo: row.nombre_snapshot || row.alumno_id
            })));
        const selectedIds = Array.isArray(draft.alumnos_ids) && draft.alumnos_ids.length
          ? draft.alumnos_ids
          : ((plan.alumnos || []).map((row) => row.alumno_id));
        const selectedFallbackIds = !selectedIds.length &&
          Number(plan.alumnos_count || 0) > 0 &&
          Number(plan.alumnos_count || 0) === alumnosGrupo.length
          ? alumnosGrupo.map((alumno) => alumno.alumno_id)
          : selectedIds;
        const selected = new Set(selectedFallbackIds);
        const showSeguimientoFields = String(plan.estado || '').trim() === 'activa';
        const localState = getPlanLocalSaveState(plan);
        const isOpenSaveBusy = localState === 'saving';
        const activitiesSource = Array.isArray(draft.activities) && draft.activities.some((activity) => String((activity && activity.texto) || '').trim() || String((activity && activity.actividad_id) || '').trim())
          ? draft.activities
          : ((plan.actividades || []).length ? (plan.actividades || []).map((actividad) => ({
              key: actividad.actividad_id || uid('ACTOPEN'),
              actividad_id: actividad.actividad_id || '',
              texto: actividad.texto || '',
              material_en_carpeta: normalizeMaterialStatus(actividad.material_en_carpeta),
              realizada: normalizeRealizadaStatus(actividad.realizada),
              comentario_cierre: actividad.comentario_cierre || '',
              last_known_updated_at: actividad.fecha_actualizacion || ''
            })) : [createEmptyActivityDraft()]);
        const activitiesHtml = activitiesSource.map((activity, index) => (
          '<div class="activity-editor">' +
          '<div class="activity-editor-top">' +
            '<span class="activity-chip">Actividad ' + (index + 1) + '</span>' +
            '<div class="actions compact">' +
              '<button class="btn-ghost" type="button" onclick="removeOpenPlanDraftActivity(' + index + ')">Quitar</button>' +
            '</div>' +
          '</div>' +
          '<textarea onchange="updateOpenPlanDraftActivityField(' + index + ', \'texto\', this.value)">' + escapeHtml(activity.texto || '') + '</textarea>' +
          '<div class="activity-inline-grid">' +
            '<div><label>Material</label><select id="activity-material-' + escapeHtml(activity.actividad_id) + '" onchange="updateOpenPlanDraftActivityField(' + index + ', \'material_en_carpeta\', this.value)">' +
              '<option value="no_requiere"' + (activity.material_en_carpeta === 'no_requiere' ? ' selected' : '') + '>No requiere</option>' +
              '<option value="listo"' + (activity.material_en_carpeta === 'listo' ? ' selected' : '') + '>Listo</option>' +
              '<option value="no_listo"' + (activity.material_en_carpeta === 'no_listo' ? ' selected' : '') + '>No listo</option>' +
            '</select></div>' +
            (showSeguimientoFields
              ? '<div><label>¿Se realizó esta actividad?</label><select id="activity-realizada-' + escapeHtml(activity.actividad_id) + '" onchange="updateOpenPlanDraftActivityField(' + index + ', \'realizada\', this.value)">' +
                  '<option value=""' + (!activity.realizada ? ' selected' : '') + '>Pendiente</option>' +
                  '<option value="si"' + (activity.realizada === 'si' ? ' selected' : '') + '>Sí</option>' +
                  '<option value="no"' + (activity.realizada === 'no' ? ' selected' : '') + '>No</option>' +
                '</select></div>' +
                '<div><label>Comentario</label><input id="activity-comment-' + escapeHtml(activity.actividad_id) + '" type="text" value="' + escapeHtml(activity.comentario_cierre || '') + '" onchange="updateOpenPlanDraftActivityField(' + index + ', \'comentario_cierre\', this.value)"></div>'
              : '<div class="helper" style="grid-column: span 2;">El seguimiento de realizada / no realizada se captura al cerrar la semana.</div>') +
          '</div>' +
        '</div>'
      )).join('');

      return (
        '<div class="plan-open-editor">' +
          '<div class="grid-3">' +
            '<div class="plan-date-detected-field"><label>Fecha:</label><input type="date" value="' + escapeHtml(draft.fecha_planeacion || '') + '" oninput="updateOpenPlanDraftField(\'fecha_planeacion\', this.value, true)" onchange="updateOpenPlanDraftField(\'fecha_planeacion\', this.value, true)"><div class="plan-date-inline-meta"><div class="plan-date-resolved-head">Semana:</div><div class="inline-note ' + (week && String(week.cerrada_global || '').toLowerCase() === 'si' ? 'is-closed' : 'is-open') + '">' + escapeHtml(weekText) + '</div></div></div>' +
            '<div><label>Materia</label><select onchange="updateOpenPlanDraftField(\'materia_id\', this.value, true)">' +
              '<option value="">Selecciona materia</option>' +
              (state.catalogos.materias || []).map((item) => '<option value="' + escapeHtml(item.materia_id) + '"' + (String(item.materia_id || '') === selectedMateriaId ? ' selected' : '') + '>' + escapeHtml(item.nombre || item.materia_id) + '</option>').join('') +
            '</select></div>' +
            (submaterias.length
              ? '<div><label>Submateria</label><select onchange="updateOpenPlanDraftField(\'submateria_id\', this.value, true)">' +
                  '<option value="">Selecciona submateria</option>' +
                  submaterias.map((item) => '<option value="' + escapeHtml(item.submateria_id) + '"' + (String(draft.submateria_id || '') === String(item.submateria_id || '') ? ' selected' : '') + '>' + escapeHtml(item.nombre || item.submateria_id) + '</option>').join('') +
                '</select></div>'
              : '') +
          '</div>' +
          '<div class="plan-inline-field">' +
            '<label>Frase de la semana</label>' +
            '<textarea onchange="updateOpenPlanDraftField(\'frase_semana\', this.value)">' + escapeHtml(draft.frase_semana || '') + '</textarea>' +
          '</div>' +
          '<div>' +
            '<div class="card-head inline-head">' +
              '<div><label>Alumnos</label></div>' +
              '<div class="actions compact">' +
                '<button class="btn-ghost" type="button" onclick="toggleAllOpenPlanDraftAlumnos(true)">Seleccionar todos</button>' +
                '<button class="btn-ghost" type="button" onclick="toggleAllOpenPlanDraftAlumnos(false)">Limpiar</button>' +
              '</div>' +
            '</div>' +
            '<div class="group-block plan-open-students">' +
              (alumnosGrupo.map((alumno) => (
                '<label class="check-item">' +
                  '<input type="checkbox" value="' + escapeHtml(alumno.alumno_id) + '"' + (selected.has(alumno.alumno_id) ? ' checked' : '') + ' onchange="toggleOpenPlanDraftAlumno(\'' + escapeJsAttrValue(alumno.alumno_id) + '\', this.checked)">' +
                  '<span><strong>' + escapeHtml(alumno.nombre_mostrado || alumno.nombre_completo || alumno.alumno_id) + '</strong></span>' +
                '</label>'
              )).join('') || '<div class="empty">No hay alumnos activos en este grupo.</div>') +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="card-head inline-head">' +
              '<div><label>Actividades</label></div>' +
            '</div>' +
            '<div class="stack">' + activitiesHtml + '</div>' +
            '<div class="plan-activities-add-wrap">' +
              '<button class="btn-accent plan-activities-add-btn" type="button" onclick="addOpenPlanDraftActivity()">Agregar otra actividad</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }

    function renderPlaneacionesList() {
      const host = $('planeacionesList');
      const listHead = $('planeacionesListHead');
      const role = state.session && state.session.usuario ? state.session.usuario.rol : '';
      const planeacionesLoading = !!(state.ui && state.ui.planeacionesLoading);
      const planeacionesLoaded = !!(state.ui && state.ui.planeacionesLoaded);
      const visibleEntries = getVisiblePlaneacionEntries();
      const visiblePlans = visibleEntries.flatMap((entry) => entry.plans || []);
      if (state.openPlanId && !visiblePlans.some((plan) => plan.planeacion_id === state.openPlanId)) {
        state.openPlanId = '';
        state.openPlanDraft = null;
      }
      const focusedEntry = state.openPlanId
        ? visibleEntries.find((entry) => (entry.plans || []).some((item) => item.planeacion_id === state.openPlanId))
        : null;
      const entriesToRender = focusedEntry ? [focusedEntry] : visibleEntries;
      if (listHead) listHead.hidden = !!focusedEntry;

      if (planeacionesLoading && !planeacionesLoaded && !entriesToRender.length) {
        const previewCount = getPlaneacionesLoadingPreviewCount();
        host.innerHTML = previewCount > 0
          ? buildPlaneacionesListSkeleton(previewCount)
          : buildPlaneacionesLoadingEmptyState();
        return;
      }

      if (!entriesToRender.length) {
        host.innerHTML = '<div class="empty">TodavÃ­a no hay planeaciones para los filtros actuales.</div>';
        return;
      }

      const desktopHeader = (
        '<div class="plan-list-compact-head">' +
          '<span>Fecha</span>' +
          '<span>Grupo</span>' +
          '<span>Materia</span>' +
          '<span>Resumen</span>' +
          '<span>Estado</span>' +
          '<span>Acciones</span>' +
        '</div>'
      );

      let focusBar = '';
      if (focusedEntry) {
        focusBar =
          '<div class="plan-focus-shell">' +
            '<div class="plan-focus-bar">' +
              '<button class="btn-ghost plan-focus-back-btn" type="button" onclick="exitPlanFocus()">Volver a la lista</button>' +
            '</div>' +
          '</div>';
      }

      const loadMoreHtml = (!focusedEntry && state.ui && state.ui.planeacionesHasMore)
        ? (
            '<div class="plan-list-more">' +
              '<button class="btn-ghost" type="button" onclick="loadMorePlaneaciones(this)"' + ((state.ui && state.ui.planeacionesLoadingMore) ? ' disabled' : '') + '>' +
                ((state.ui && state.ui.planeacionesLoadingMore) ? 'Cargando...' : 'Cargar mÃ¡s') +
              '</button>' +
            '</div>'
          )
        : '';

      host.innerHTML = (focusedEntry ? focusBar : desktopHeader) + entriesToRender.map((entry) => {
        const plan = getOpenPlaneacionEntry(entry) || entry.representative;
        if (!plan) return '';
        const grupo = getGrupoById(plan.grupo_id);
        const materia = getMateriaById(plan.materia_id);
        const semana = state.catalogos.semanas.find((item) => item.semana_id === plan.semana_id);
        const groupLabel = entry.isMulti
          ? getPlaneacionEntryGroupLabels(entry).join(' Â· ')
          : (grupo ? getGrupoDisplayName(grupo) : plan.grupo_id);
        const materiaLabel = getPlanMateriaDisplayLabel(plan, materia);
        const weekLabel = getWeekLabelForPlan(plan, semana);
        const weekPrimaryLabel = semana && semana.fecha_inicio
          ? formatFechaHumana(semana.fecha_inicio)
          : weekLabel;
        const weekSecondaryLabel = weekLabel && weekLabel !== weekPrimaryLabel
          ? weekLabel
          : ((semana && semana.nombre_visible && semana.nombre_visible !== weekPrimaryLabel) ? semana.nombre_visible : '');
        const weekClosed = semana && String(semana.cerrada_global || '').toLowerCase() === 'si';
        const hasAdminPower = role === 'admin' || role === 'directora';
        const alumnosRows = entry.isMulti ? getPlaneacionEntryAlumnoRows(entry) : (plan.alumnos || []);
        const obsGenerales = getPlanGeneralObservations(plan);
        const draftGeneralObservationText = state.openPlanDraft && state.openPlanDraft.planId === plan.planeacion_id
          ? String(state.openPlanDraft.generalObservationText || plan._draft_general_observation_text || '')
          : String(plan._draft_general_observation_text || '');
        const obsAlumnoFinalMap = entry.isMulti ? getPlaneacionEntryAlumnoFinalMap(entry) : getPlanAlumnoFinalMap(plan);
        const allowStructureEdit = hasAdminPower || ((['borrador', 'activa'].includes(plan.estado) && !weekClosed) || plan.estado === 'rechazada');
        const allowGeneralObs = hasAdminPower || !weekClosed;
        const allowAlumnoObs = hasAdminPower || !weekClosed;
        const allowClose = hasAdminPower
          ? ['activa', 'cierre_pendiente'].includes(plan.estado)
          : plan.estado === 'activa';
        const isOpen = isPlaneacionEntryOpen(entry);
        const hasMaterialAlert = entry.isMulti ? planEntryHasOpenMaterialAlert(entry) : planHasOpenMaterialAlert(plan.planeacion_id);
        const latestResolvedMaterialAlert = entry.isMulti ? getLatestResolvedMaterialAlertForEntry(entry) : (hasAdminPower ? getLatestResolvedMaterialAlertForPlan(plan.planeacion_id) : null);
        const materialHistoryHtml = latestResolvedMaterialAlert
          ? '<div class="plan-alert-history">Historico: material resuelto ' + escapeHtml(formatFechaHumana(latestResolvedMaterialAlert.fecha_resolucion || latestResolvedMaterialAlert.fecha_creacion || '')) + '</div>'
          : '';
        const alumnosCount = entry.isMulti ? getPlaneacionEntryAlumnoCount(entry) : getPlanAlumnoCount(plan);
        const actividadesCount = entry.isMulti ? getPlaneacionEntryActividadCount(entry) : getPlanActividadCount(plan);
        const phraseText = String(plan.frase_semana || '-');
        const phraseNeedsTooltip = phraseText.length > 42;
        const phraseCompactClass = phraseNeedsTooltip
          ? 'plan-compact-secondary plan-compact-truncate plan-compact-tooltip'
          : 'plan-compact-secondary plan-compact-truncate';
        const phraseCompactAttrs = phraseNeedsTooltip
          ? ' tabindex="0" data-tooltip="' + escapeHtml(phraseText) + '"'
          : '';
        const localFeedbackHtml = getPlanLocalFeedbackMarkup(plan);
        const badgeMeta = getPlanStatusBadgeMeta(plan);
        const badgeHtml = '<span class="badge ' + escapeHtml(badgeMeta.className) + '">' + escapeHtml(badgeMeta.label) + '</span>';
        const summaryMetaHtml = ((hasMaterialAlert || latestResolvedMaterialAlert)
          ? (
              '<div class="plan-compact-summary-meta">' +
                (hasMaterialAlert ? '<span class="plan-alert-chip">Material pendiente</span>' : '') +
                (!hasMaterialAlert && latestResolvedMaterialAlert ? '<span class="mini">HistÃ³rico: material resuelto ' + escapeHtml(formatFechaHumana(latestResolvedMaterialAlert.fecha_resolucion || latestResolvedMaterialAlert.fecha_creacion || '')) + '</span>' : '') +
                (entry.isMulti ? '<span class="mini">' + escapeHtml(String((entry.plans || []).length)) + ' grupos vinculados</span>' : '') +
              '</div>'
            )
          : '');
        const actividades = (plan.actividades || []).map((item) => {
          const material = normalizeMaterialStatus(item.material_en_carpeta);
          const realizada = normalizeRealizadaStatus(item.realizada);
          const editableSeguimiento = hasAdminPower || (plan.estado === 'activa' && !weekClosed);
          return (
            '<div class="activity-card">' +
              '<div><strong>' + escapeHtml(String(item.orden || '?') + '. ' + (item.texto || '')) + '</strong></div>' +
              '<div class="activity-inline-grid">' +
                '<div><label>Material</label><select id="activity-material-' + escapeHtml(item.actividad_id) + '"' + (editableSeguimiento ? '' : ' disabled') + '>' +
                  '<option value="no_requiere"' + (material === 'no_requiere' ? ' selected' : '') + '>No requiere</option>' +
                  '<option value="listo"' + (material === 'listo' ? ' selected' : '') + '>Listo</option>' +
                  '<option value="no_listo"' + (material === 'no_listo' ? ' selected' : '') + '>No listo</option>' +
                '</select></div>' +
                '<div><label>¿Se realizó esta actividad?</label><select id="activity-realizada-' + escapeHtml(item.actividad_id) + '"' + (editableSeguimiento ? '' : ' disabled') + '>' +
                  '<option value=""' + (!realizada ? ' selected' : '') + '>Pendiente</option>' +
                  '<option value="si"' + (realizada === 'si' ? ' selected' : '') + '>Sí</option>' +
                  '<option value="no"' + (realizada === 'no' ? ' selected' : '') + '>No</option>' +
                '</select></div>' +
                '<div><label>Comentario</label><input id="activity-comment-' + escapeHtml(item.actividad_id) + '" type="text" value="' + escapeHtml(item.comentario_cierre || '') + '"' + (editableSeguimiento ? '' : ' disabled') + '></div>' +
              '</div>' +
              ((hasAdminPower || editableSeguimiento)
                ? '<div class="mini">Los cambios de seguimiento se guardan con el botÃ³n Guardar cambios.</div>'
                : '') +
            '</div>'
          );
        }).join('');
        const obsGeneralesHtml = obsGenerales.length
          ? '<div class="obs-list">' + obsGenerales.map((obs) => (
              '<div class="obs-item">' +
                '<div>' + escapeHtml(obs.texto || '') + '</div>' +
                '<div class="mini">' + escapeHtml(formatFechaHumana(obs.fecha || obs.fecha_creacion || '')) + '</div>' +
              '</div>'
            )).join('') + '</div>'
          : '';
        const obsAlumnoHtml = alumnosRows.length
          ? '<div class="obs-grid">' + alumnosRows.map((alumnoRow) => {
              const targetPlanId = String(alumnoRow.planeacion_id || plan.planeacion_id || '').trim();
              const normalizedAlumnoId = String(alumnoRow.alumno_id || '').trim();
              const alumnoKey = entry.isMulti
                ? (targetPlanId + '::' + normalizedAlumnoId)
                : normalizedAlumnoId;
              const alumnoObs = obsAlumnoFinalMap[alumnoKey] || null;
              const planDraftFinalMap = Object.assign({}, plan._draft_final_observations_by_key || {});
              const draftAlumnoObs = state.openPlanDraft && state.openPlanDraft.planId === plan.planeacion_id &&
                state.openPlanDraft.finalObservationsByKey &&
                Object.prototype.hasOwnProperty.call(state.openPlanDraft.finalObservationsByKey, alumnoKey)
                  ? String(state.openPlanDraft.finalObservationsByKey[alumnoKey] || planDraftFinalMap[alumnoKey] || '')
                  : (
                      state.openPlanDraft && state.openPlanDraft.planId === plan.planeacion_id &&
                      state.openPlanDraft.finalObservationsByKey &&
                      Object.prototype.hasOwnProperty.call(state.openPlanDraft.finalObservationsByKey, normalizedAlumnoId)
                        ? String(state.openPlanDraft.finalObservationsByKey[normalizedAlumnoId] || planDraftFinalMap[normalizedAlumnoId] || '')
                        : String(planDraftFinalMap[alumnoKey] || planDraftFinalMap[normalizedAlumnoId] || '')
                    );
              const alumnoNombre = alumnoRow.nombre_snapshot || alumnoRow.alumno_id;
              return (
                '<div class="obs-alumno-card">' +
                  '<div><strong>' + escapeHtml(alumnoNombre) + '</strong>' + (entry.isMulti ? '<div class="mini">' + escapeHtml(alumnoRow.grupo_label || '') + '</div>' : '') + '</div>' +
                  '<textarea class="obs-final-input" id="obs-final-' + escapeHtml(targetPlanId) + '-' + escapeHtml(normalizedAlumnoId) + '" oninput="autoGrowObsFinal(this);updateOpenPlanFinalObservationDraft(\'' + escapeJsAttrValue(targetPlanId) + '\', \'' + escapeJsAttrValue(normalizedAlumnoId) + '\', this.value)"' + (allowAlumnoObs ? '' : ' disabled') + '>' + escapeHtml(draftAlumnoObs || (alumnoObs ? (alumnoObs.nota || '') : '')) + '</textarea>' +
                '</div>'
              );
            }).join('') + '</div>'
          : '<div class="mini">No hay alumnos ligados a esta planeaciÃ³n.</div>';
        const observationsLoadingHint = !plan.obs_loaded
          ? '<div class="mini">Se estÃ¡n cargando observaciones de esta planeaciÃ³n...</div>'
          : '';
        const localState = getPlanLocalSaveState(plan);
        const isOpenSaveBusy = localState === 'saving';
        const actionStatusHtml = getPlanActionStatusMarkup(plan);
        const buttons = [];
        if (plan.estado === 'borrador' && !isPlaneacionLocalSavePending(plan)) {
          buttons.push('<button class="btn-primary" type="button" onclick="planAction(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\', \'activarPlaneacion\')">Activar</button>');
        }
        if (plan.estado === 'borrador_pendiente_aprobacion' && hasAdminPower) {
          buttons.push('<button class="btn-primary" type="button" onclick="approvePlan(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Aprobar</button>');
          buttons.push('<button class="btn-secondary" type="button" onclick="rejectPlan(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Rechazar</button>');
        }
        if (plan.estado === 'rechazada') {
          buttons.push('<button class="btn-secondary" type="button" onclick="resubmitPlan(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Reenviar aprobaciÃ³n</button>');
        }
        if (allowClose) {
          buttons.push('<button class="btn-accent" type="button" onclick="confirmClosePlan(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Cerrar semana</button>');
        }
        if (plan.estado === 'cerrada' && hasAdminPower) {
          buttons.push('<button class="btn-ghost" type="button" onclick="planAction(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\', \'archivarPlaneacion\')">Archivar</button>');
        }

        if (!isOpen) {
          const isPendingCreation = isPlaneacionPendingCreation(plan);
          const localPending = isPlaneacionLocalSavePending(plan);
          const openButtonHtml = isPendingCreation
            ? '<button class="btn-open-plan" type="button" disabled aria-disabled="true">Creando...</button>'
            : '<button class="btn-open-plan" type="button" onclick="togglePlanOpen(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Abrir</button>';
          const quickActivateButton = !localPending && plan.estado === 'borrador'
            ? '<button class="btn-primary" type="button" onclick="planAction(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\', \'activarPlaneacion\')">Activar</button>'
            : '';
          return (
            '<article id="plan-card-' + escapeHtml(plan.planeacion_id) + '" class="plan-card is-collapsed plan-card-compact">' +
              '<div class="plan-collapsed-mobile">' +
                '<div class="plan-top">' +
                  '<div>' +
                    '<h3>' + escapeHtml(materiaLabel) + '</h3>' +
                    '<div class="subtle">' + escapeHtml(groupLabel) +
                    ' Â· ' + escapeHtml(weekLabel) + '</div>' +
                  '</div>' +
                  badgeHtml +
                '</div>' +
                '<div class="meta-grid">' +
                  '<div><strong>Frase:</strong> ' + escapeHtml(plan.frase_semana || '-') + '</div>' +
                  '<div><strong>Resumen:</strong> ' + escapeHtml(String(alumnosCount)) + ' alumno(s) Â· ' + escapeHtml(String(actividadesCount)) + ' actividad(es)' + (entry.isMulti ? ' Â· ' + escapeHtml(String((entry.plans || []).length)) + ' grupo(s)' : '') + '</div>' +
                '</div>' +
                localFeedbackHtml +
                (hasMaterialAlert ? '<div class="plan-alert-chip">Material pendiente</div>' : '') +
                materialHistoryHtml +
                '<div class="actions" style="margin-top:14px;">' +
                  quickActivateButton +
                  openButtonHtml +
                '</div>' +
              '</div>' +
              '<div class="plan-collapsed-desktop">' +
                '<div class="plan-compact-grid">' +
                  '<div class="plan-compact-cell plan-compact-cell-date">' +
                    '<span class="plan-compact-label">Fecha</span>' +
                    '<span class="plan-compact-primary plan-compact-truncate">' + escapeHtml(weekPrimaryLabel) + '</span>' +
                    (weekSecondaryLabel ? '<span class="plan-compact-secondary plan-compact-truncate">' + escapeHtml(weekSecondaryLabel) + '</span>' : '') +
                  '</div>' +
                  '<div class="plan-compact-cell plan-compact-cell-group">' +
                    '<span class="plan-compact-label">Grupo</span>' +
                    '<span class="plan-compact-primary plan-compact-truncate">' + escapeHtml(groupLabel) + '</span>' +
                    (entry.isMulti ? '<span class="mini">' + escapeHtml(String((entry.plans || []).length)) + ' grupos</span>' : '') +
                  '</div>' +
                  '<div class="plan-compact-cell plan-compact-cell-materia">' +
                    '<span class="plan-compact-label">Materia</span>' +
                    '<span class="plan-compact-primary plan-compact-truncate">' + escapeHtml(materiaLabel) + '</span>' +
                  '</div>' +
                  '<div class="plan-compact-cell plan-compact-cell-summary">' +
                    '<span class="plan-compact-label">Resumen</span>' +
                    '<span class="plan-compact-secondary plan-compact-truncate">' + escapeHtml(String(alumnosCount)) + ' alumno(s) Â· ' + escapeHtml(String(actividadesCount)) + ' actividad(es)</span>' +
                    summaryMetaHtml +
                    localFeedbackHtml +
                  '</div>' +
                  '<div class="plan-compact-cell plan-compact-status plan-compact-cell-status">' +
                    '<span class="plan-compact-label">Estado</span>' +
                    badgeHtml +
                  '</div>' +
                  '<div class="plan-compact-cell plan-compact-actions plan-compact-cell-actions">' +
              quickActivateButton +
              openButtonHtml +
                  '</div>' +
                  '<div class="plan-compact-cell plan-compact-cell-phrase">' +
                    '<span class="plan-compact-label">Frase</span>' +
                    '<span class="plan-compact-phrase-chip">Frase de la semana:</span>' +
                    '<span class="' + phraseCompactClass.replace('plan-compact-secondary', 'plan-compact-phrase-copy') + '"' + phraseCompactAttrs + '>' + escapeHtml(phraseText) + '</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</article>'
          );
        }

        if (!plan.detail_loaded && plan.boot_detail_loaded) {
          const previewSharedHtml = entry.isMulti
            ? (
                '<div class="plan-multigroup-switcher">' +
                  '<div class="plan-multigroup-switcher-list">' +
                    (entry.plans || []).map((groupPlan) => {
                      const groupRow = getGrupoById(groupPlan.grupo_id);
                      const groupText = groupRow ? getGrupoDisplayName(groupRow) : groupPlan.grupo_id;
                      const activeClass = groupPlan.planeacion_id === plan.planeacion_id ? ' is-active' : '';
                      return '<button class="btn-ghost plan-multigroup-switch' + activeClass + '" type="button" onclick="switchMultiGroupPlan(\'' + escapeJsAttrValue(groupPlan.planeacion_id) + '\')">' + escapeHtml(groupText) + '</button>';
                    }).join('') +
                  '</div>' +
                '</div>'
              )
            : '';
          return (
            '<article id="plan-card-' + escapeHtml(plan.planeacion_id) + '" class="plan-card">' +
              '<div class="plan-top">' +
                '<div>' +
                  '<h3>' + escapeHtml(materiaLabel) + '</h3>' +
                  '<div class="subtle">' + escapeHtml(groupLabel) +
                  ' Â· ' + escapeHtml(weekLabel) + '</div>' +
                '</div>' +
                badgeHtml +
              '</div>' +
              '<div class="meta-grid">' +
                '<div><strong>Frase:</strong> ' + escapeHtml(plan.frase_semana || '-') + '</div>' +
                '<div><strong>Alumnos:</strong> ' + escapeHtml(String(alumnosCount)) + ' Â· <strong>Actividades:</strong> ' + escapeHtml(String(actividadesCount)) + (entry.isMulti ? ' Â· <strong>Grupos:</strong> ' + escapeHtml(String((entry.plans || []).length)) : '') + '</div>' +
              '</div>' +
              localFeedbackHtml +
              previewSharedHtml +
              '<div class="plan-loading-note is-compact">' +
                '<strong>Abriendo planeación...</strong>' +
                '<div class="mini">Estamos trayendo alumnos, actividades y observaciones para que abras con contexto completo.</div>' +
                '<div class="plan-loading-progress" aria-hidden="true"></div>' +
                '<div class="plan-loading-pill-row">' +
                  '<span class="plan-loading-pill">Alumnos</span>' +
                  '<span class="plan-loading-pill">Actividades</span>' +
                  '<span class="plan-loading-pill">Observaciones</span>' +
                '</div>' +
              '</div>' +
              '<div class="actions" style="margin-top:14px;">' +
                '<button class="btn-open-plan" type="button" onclick="togglePlanOpen(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Ocultar</button>' +
              '</div>' +
            '</article>'
          );
        }

        if (!plan.detail_loaded) {
          return (
            '<article id="plan-card-' + escapeHtml(plan.planeacion_id) + '" class="plan-card">' +
              '<div class="plan-top">' +
                '<div>' +
                  '<h3>' + escapeHtml(materiaLabel) + '</h3>' +
                  '<div class="subtle">' + escapeHtml(groupLabel) +
                  ' Â· ' + escapeHtml(weekLabel) + '</div>' +
                '</div>' +
                badgeHtml +
              '</div>' +
              '<div class="meta-grid">' +
                '<div><strong>Frase:</strong> ' + escapeHtml(plan.frase_semana || '-') + '</div>' +
                '<div><strong>Alumnos:</strong> ' + escapeHtml(String(alumnosCount)) + ' Â· <strong>Actividades:</strong> ' + escapeHtml(String(actividadesCount)) + (entry.isMulti ? ' Â· <strong>Grupos:</strong> ' + escapeHtml(String((entry.plans || []).length)) : '') + '</div>' +
              '</div>' +
              localFeedbackHtml +
              '<div class="plan-loading-note">' +
                '<strong>Abriendo planeación...</strong>' +
                '<div class="mini">Se están cargando algunos datos para que puedas empezar a revisar de inmediato.</div>' +
                '<div class="plan-loading-progress" aria-hidden="true"></div>' +
                '<div class="plan-loading-pill-row">' +
                  '<span class="plan-loading-pill">Alumnos</span>' +
                  '<span class="plan-loading-pill">Actividades</span>' +
                  '<span class="plan-loading-pill">Observaciones</span>' +
                '</div>' +
              '</div>' +
            '</article>'
          );
        }

        return (
          '<article id="plan-card-' + escapeHtml(plan.planeacion_id) + '" class="plan-card">' +
              '<div class="plan-top">' +
                '<div>' +
                  '<h3>' + escapeHtml(materiaLabel) + '</h3>' +
                  '<div class="subtle">' + escapeHtml(groupLabel) +
                  ' Â· ' + escapeHtml(weekLabel) + '</div>' +
                '</div>' +
              badgeHtml +
            '</div>' +
            '<div class="meta-grid">' +
              '<div><strong>Frase:</strong> ' + escapeHtml(plan.frase_semana || '-') + '</div>' +
              '<div><strong>Alumnos:</strong> ' + escapeHtml(String(alumnosCount)) + ' Â· <strong>Actividades:</strong> ' + escapeHtml(String(actividadesCount)) + (entry.isMulti ? ' Â· <strong>Grupos:</strong> ' + escapeHtml(String((entry.plans || []).length)) : '') + '</div>' +
            '</div>' +
            localFeedbackHtml +
            (plan.estado === 'borrador'
              ? '<div class="plan-quick-actions"><button class="btn-primary" type="button" onclick="planAction(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\', \'activarPlaneacion\')">Activar planeación</button></div>'
              : '') +
            (hasMaterialAlert
              ? (
                  '<div class="plan-alert-bar">' +
                    '<div class="plan-alert-chip">Material pendiente</div>' +
                    (allowStructureEdit
                      ? '<button class="btn-primary plan-alert-action" type="button" onclick="markPlanMaterialReady(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Marcar material listo</button>'
                      : '') +
                  '</div>'
                )
              : '') +
            materialHistoryHtml +
            (entry.isMulti && allowStructureEdit ? renderMultiGroupSharedEditor(entry) : '') +
            (entry.isMulti
              ? (
                  '<div class="plan-multigroup-switcher">' +
                    '<div class="plan-multigroup-switcher-list">' +
                      (entry.plans || []).map((groupPlan) => {
                        const groupRow = getGrupoById(groupPlan.grupo_id);
                        const groupText = groupRow ? getGrupoDisplayName(groupRow) : groupPlan.grupo_id;
                        const activeClass = groupPlan.planeacion_id === plan.planeacion_id ? ' is-active' : '';
                        return '<button class="btn-ghost plan-multigroup-switch' + activeClass + '" type="button" onclick="switchMultiGroupPlan(\'' + escapeJsAttrValue(groupPlan.planeacion_id) + '\')">' + escapeHtml(groupText) + '</button>';
                      }).join('') +
                    '</div>' +
                  '</div>'
                )
              : '') +
            (allowStructureEdit
              ? renderOpenPlanStructureEditor(plan, allowStructureEdit, { groupSpecificOnly: entry.isMulti })
              : ('<div class="plan-student-chip-cloud">' + alumnosRows.map((alumnoRow) => {
                    const alumnoDisplay = getAlumnoDisplaySnapshot(alumnoRow);
                    return '<div class="plan-student-chip"><strong>' + escapeHtml(alumnoDisplay.nombre) + '</strong></div>';
                  }).join('') + '</div>' +
                '<div class="stack">' + (actividades || '<span class="mini">Sin actividades capturadas.</span>') + '</div>')) +
            (entry.isMulti && allowStructureEdit ? renderMultiGroupSharedActivities(entry) : '') +
            '<div class="stack">' +
              '<div><strong>Observaciones generales</strong></div>' +
              obsGeneralesHtml +
              '<div class="actions compact">' +
                '<textarea id="obs-general-' + escapeHtml(plan.planeacion_id) + '" placeholder="Agregar observación general para administración"' + (allowGeneralObs ? '' : ' disabled') + '>' + escapeHtml(draftGeneralObservationText || '') + '</textarea>' +
                (allowGeneralObs ? '' : '<span class="mini">Solo administraciÃ³n puede agregar observaciones en semana cerrada.</span>') +
              '</div>' +
            '</div>' +
            '<div class="stack">' +
              '<div><strong>ObservaciÃ³n final por alumno' + (entry.isMulti ? ' Â· todos los grupos' : '') + '</strong></div>' +
              obsAlumnoHtml +
              '<div class="actions obs-final-actions">' +
                (allowAlumnoObs
                  ? ''
                  : '<span class="mini">Solo administraciÃ³n puede editar en semana cerrada.</span>') +
              '</div>' +
            '</div>' +
            '<div class="actions" style="margin-top:14px;">' +
              ((allowStructureEdit || allowGeneralObs || allowAlumnoObs)
                ? '<button class="btn-primary" type="button"' + (isOpenSaveBusy ? ' disabled aria-disabled="true"' : '') + ' onclick="savePlanChanges(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\'' + (entry.isMulti ? ', \'' + escapeJsAttrValue(entry.key) + '\'' : '') + ')">' + (isOpenSaveBusy ? 'Guardando...' : 'Guardar cambios') + '</button>'
                : '') +
              actionStatusHtml +
              '<button class="btn-open-plan" type="button" onclick="togglePlanOpen(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Ocultar</button>' +
              buttons.join('') +
            '</div>' +
          '</article>'
        );
      }).join('') + loadMoreHtml;
      window.requestAnimationFrame(() => {
        document.querySelectorAll('.obs-final-input').forEach((textarea) => autoGrowObsFinal(textarea));
        if (state.openPlanDraft && state.openPlanDraft.planId) {
          const normalizedPlanId = String(state.openPlanDraft.planId || '').trim();
          const generalInput = $('obs-general-' + normalizedPlanId);
          if (generalInput) {
            const currentPlan = getPlanById(normalizedPlanId);
            generalInput.value = String(state.openPlanDraft.generalObservationText || currentPlan && currentPlan._draft_general_observation_text || '');
          }
          const finalMap = state.openPlanDraft.finalObservationsByKey || {};
          Object.keys(finalMap).forEach((key) => {
            const normalizedKey = String(key || '').trim();
            if (!normalizedKey) return;
            let input = $('obs-final-' + normalizedKey);
            if (!input && normalizedKey.indexOf('::') < 0) {
              input = $('obs-final-' + normalizedPlanId + '-' + normalizedKey);
            }
            if (input) {
              input.value = String(finalMap[key] || '');
              autoGrowObsFinal(input);
            }
          });
        }
      });
    }

    function buildPlaneacionesListSkeleton(count = 3) {
      const desktopHeader =
        '<div class="plan-list-compact-head">' +
          '<span>Fecha</span>' +
          '<span>Grupo</span>' +
          '<span>Materia</span>' +
          '<span>Resumen</span>' +
          '<span>Estado</span>' +
          '<span>Acciones</span>' +
        '</div>';
      const cards = Array.from({ length: count }).map(() => (
        '<article class="plan-card is-collapsed plan-card-compact plan-card-loading">' +
          '<div class="plan-collapsed-mobile">' +
            '<div class="plan-top">' +
              '<div>' +
                '<h3>Cargando planeaciÃ³n...</h3>' +
                '<div class="subtle">Preparando fecha, grupo y materia</div>' +
              '</div>' +
              '<span class="plan-loading-badge">Cargando</span>' +
            '</div>' +
            '<div class="meta-grid">' +
              '<div><strong>Frase:</strong> Cargando frase de la semana...</div>' +
              '<div><strong>Resumen:</strong> Preparando alumnos y actividades...</div>' +
            '</div>' +
            '<div class="actions" style="margin-top:14px;">' +
              '<button class="plan-loading-btn" type="button" disabled>Cargando...</button>' +
            '</div>' +
          '</div>' +
          '<div class="plan-collapsed-desktop">' +
            '<div class="plan-compact-grid">' +
              '<div class="plan-compact-cell plan-compact-cell-date">' +
                '<span class="plan-compact-label">Fecha</span>' +
                '<span class="plan-loading-line primary">Cargando fecha...</span>' +
                '<span class="plan-loading-line secondary">Semana en preparaciÃ³n</span>' +
              '</div>' +
              '<div class="plan-compact-cell plan-compact-cell-group">' +
                '<span class="plan-compact-label">Grupo</span>' +
                '<span class="plan-loading-line primary">Cargando grupo...</span>' +
                '<span class="plan-loading-line muted">Esperando datos</span>' +
              '</div>' +
              '<div class="plan-compact-cell plan-compact-cell-materia">' +
                '<span class="plan-compact-label">Materia</span>' +
                '<span class="plan-loading-line primary">Cargando materia...</span>' +
              '</div>' +
              '<div class="plan-compact-cell plan-compact-cell-summary">' +
                '<span class="plan-compact-label">Resumen</span>' +
                '<span class="plan-loading-line secondary">Preparando alumnos y actividades...</span>' +
              '</div>' +
              '<div class="plan-compact-cell plan-compact-status plan-compact-cell-status">' +
                '<span class="plan-compact-label">Estado</span>' +
                '<span class="plan-loading-badge">Cargando</span>' +
              '</div>' +
              '<div class="plan-compact-cell plan-compact-actions plan-compact-cell-actions">' +
                '<button class="plan-loading-btn" type="button" disabled>Cargando...</button>' +
              '</div>' +
              '<div class="plan-compact-cell plan-compact-cell-phrase">' +
                '<span class="plan-compact-label">Frase</span>' +
                '<span class="plan-loading-phrase-chip">Frase de la semana</span>' +
                '<span class="plan-loading-line secondary">Preparando el contenido de la planeaciÃ³n...</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>'
      )).join('');
      return '<div class="plan-list-loading-shell">' +
        '<div class="plan-list-loading-copy"><span>Cargando planeaciones...</span></div>' +
        desktopHeader +
        cards +
      '</div>';
    }

    function getPlaneacionesLoadingPreviewCount() {
      const currentRows = Array.isArray(state.planeaciones)
        ? state.planeaciones.filter((plan) => !isPlaneacionPendingCreation(plan))
        : [];
      if (currentRows.length) return Math.max(1, Math.min(currentRows.length, 3));
      if (!canUseAdminShell()) {
        return 0;
      }
      const stats = state.dashboardStats || {};
      const knownCount = Number(
        stats.planeaciones_visibles != null ? stats.planeaciones_visibles : NaN
      );
      if (Number.isFinite(knownCount) && knownCount >= 0) {
        return Math.max(0, Math.min(knownCount, 3));
      }
      return 3;
    }

    function buildPlaneacionesLoadingEmptyState() {
      return '<div class="plan-list-loading-shell">' +
        '<div class="plan-list-loading-copy"><span>Revisando si tienes planeaciones activas...</span></div>' +
        '<div class="empty">Si no tienes planeaciones abiertas, en un momento verÃ¡s el estado vacÃ­o real.</div>' +
      '</div>';
    }

    function getAlertTypeLabel(tipo) {
      return ({
        planeacion_semana_cerrada_aprobacion: 'AprobaciÃ³n pendiente',
        planeacion_rechazada: 'PlaneaciÃ³n rechazada',
        material_pendiente: 'Material pendiente',
        material_inicio_semana_pendiente: 'Material pendiente'
      })[String(tipo || '').trim()] || String(tipo || 'Alerta');
    }

    function formatAlertDescription(alerta) {
      const tipo = String((alerta && alerta.tipo_alerta) || '').trim();
      const descripcion = String((alerta && alerta.descripcion) || '').trim();
      if (tipo === 'material_pendiente' && descripcion.indexOf('Material no confirmado en carpetas') === 0) {
        const nombre = descripcion.split('â€”').slice(1).join('â€”').trim();
        return nombre
          ? ('Falta confirmar el material en carpetas para ' + nombre)
          : 'Falta confirmar el material en carpetas.';
      }
      return descripcion;
    }

    function getAlertStatusLabel(status) {
      return ({
        abierta: 'Abierta',
        en_revision: 'En revisiÃ³n',
        resuelta: 'Resuelta'
      })[String(status || '').trim()] || String(status || 'Sin estado');
    }

    function isOperationalAlert(alerta) {
      const tipo = String(alerta && alerta.tipo_alerta || '').trim().toLowerCase();
      return !/(obs|observacion|observaciÃ³n|nota|seguimiento)/.test(tipo);
    }

    function isOpenMaterialAlert(alerta) {
      const tipo = String((alerta && alerta.tipo_alerta) || '').trim();
      const estado = String((alerta && alerta.estado) || '').trim();
      return ['material_pendiente', 'material_inicio_semana_pendiente'].includes(tipo) && estado !== 'resuelta';
    }

    function isResolvedMaterialAlert(alerta) {
      const tipo = String((alerta && alerta.tipo_alerta) || '').trim();
      const estado = String((alerta && alerta.estado) || '').trim();
      return ['material_pendiente', 'material_inicio_semana_pendiente'].includes(tipo) && estado === 'resuelta';
    }

    function shouldShowMaterialAlertForPlan(plan) {
      if (!plan) return false;
      const role = getCurrentRole();
      const status = String((plan && plan.estado) || '').trim();
      if (role === 'admin' || role === 'directora') return status === 'activa';
      return status === 'borrador' || status === 'activa' || status === 'rechazada';
    }

    function planHasOpenMaterialAlert(planId) {
      const plan = getPlanById(planId);
      if (!shouldShowMaterialAlertForPlan(plan)) return false;
      return state.alertas.some((alerta) => alerta.planeacion_id === planId && isOpenMaterialAlert(alerta));
    }

    function getLatestResolvedMaterialAlertForPlan(planId) {
      const plan = getPlanById(planId);
      if (!shouldShowMaterialAlertForPlan(plan)) return null;
      return state.alertas
        .filter((alerta) => alerta.planeacion_id === planId && isResolvedMaterialAlert(alerta))
        .sort((a, b) => {
          const aDate = new Date(a.fecha_resolucion || a.fecha_actualizacion || a.fecha_creacion || 0).getTime();
          const bDate = new Date(b.fecha_resolucion || b.fecha_actualizacion || b.fecha_creacion || 0).getTime();
          return bDate - aDate;
        })[0] || null;
    }

    function injectLocalMaterialAlerts(plansLike) {
      const plans = Array.isArray(plansLike) ? plansLike : [plansLike];
      if (!Array.isArray(state.alertas)) state.alertas = [];
      let changed = false;
      plans.forEach((planLike) => {
        const plan = planLike && planLike.planeacion_id ? planLike : getPlanById(planLike && planLike.planeacion_id);
        if (!plan || !plan.planeacion_id) return;
        const planId = String(plan.planeacion_id || '').trim();
        if (!planId) return;
        const status = String(plan.estado || '').trim();
        const materialConfirmado = String(plan.material_confirmado || '').trim().toLowerCase() === 'si';
        if (status !== 'activa' || materialConfirmado) return;
        const hasOpenAlert = state.alertas.some((alerta) =>
          String((alerta && alerta.planeacion_id) || '').trim() === planId &&
          isOpenMaterialAlert(alerta)
        );
        if (hasOpenAlert) return;
        state.alertas.unshift({
          alerta_id: 'LOCAL-ALT-' + planId,
          planeacion_id: planId,
          tipo_alerta: 'material_pendiente',
          descripcion: 'Falta confirmar el material en carpetas para esta planeación',
          estado: 'abierta',
          fecha_creacion: new Date().toISOString(),
          __local_only: true
        });
        changed = true;
      });
      if (changed) {
        markAlertasFresh();
        persistCurrentBootSnapshot('alertas_local_material');
      }
    }

    function getVisibleOperationalAlerts() {
      return state.alertas.filter((alerta) => {
        const plan = getPlanById(alerta && alerta.planeacion_id);
        if (isOpenMaterialAlert(alerta) && !shouldShowMaterialAlertForPlan(plan)) return false;
        return isOperationalAlert(alerta) && String((alerta && alerta.estado) || '').trim() !== 'resuelta';
      });
    }

    async function openPlanFromAlert(button, planId) {
      if (canUseAdminShell()) {
        activateAdminModule('planeaciones');
      } else {
        activateTab('planeaciones');
      }
      if (state.ui) state.ui.openPlanLoadingId = planId;
      state.openPlanId = planId;
      state.openPlanDraft = null;
      const previewPlan = buildPlaneacionOpenPreviewRow(getPlanById(planId));
      if (previewPlan) upsertPlaneacionRow(previewPlan);
      closePlanBuilder();
      renderPlaneacionesList();
      await handleAction('openPlanFromAlert', async () => {
        const detailPromise = ensurePlaneacionDetailLoaded(planId, { silent: true });
        const plan = await detailPromise;
        const entry = getPlaneacionEntryByKey(getPlaneacionEntryKey(plan));
        if (entry && entry.isMulti) {
          ensurePlaneacionEntryDetailsLoaded(entry, { silent: true }).then(() => {
            if (state.openPlanId !== planId) return;
            const refreshedPlan = getPlanById(planId) || plan;
            state.openPlanDraft = refreshedPlan ? buildOpenPlanDraft(refreshedPlan) : null;
            persistCurrentBootSnapshot('planeacion_abierta_alerta_multigrupo');
            renderPlaneacionesList();
          }).catch(() => {});
        }
        if (state.ui) state.ui.openPlanLoadingId = '';
        state.openPlanDraft = plan ? buildOpenPlanDraft(plan) : null;
        persistCurrentBootSnapshot('planeacion_abierta_alerta');
        renderPlaneacionesList();
        scheduleAfterPaint(() => {
          if (state.openPlanId !== planId) return null;
          return ensurePlaneacionObservacionesLoaded(planId, { silent: true })
            .then(() => {
              if (state.openPlanId !== planId) return;
              renderPlaneacionesList();
            })
            .catch(() => null);
        }, 120);
        scheduleAfterPaint(() => {
          if (state.openPlanId !== planId) return null;
          return ensurePlaneacionesCatalogosAvailable({ render: false, scope: 'editor' })
            .then(() => {
              if (state.openPlanId !== planId) return;
              const refreshedPlan = getPlanById(planId) || plan;
              state.openPlanDraft = refreshedPlan ? buildOpenPlanDraft(refreshedPlan) : null;
              renderPlaneacionesList();
            })
            .catch(() => state.catalogos);
        }, 140);
      }, {
        button,
        key: buildActionKey('openPlanFromAlert', [planId]),
        busyText: 'Abriendo...',
        onError: () => {
          if (state.openPlanId === planId) {
            state.openPlanId = '';
            state.openPlanDraft = null;
          }
          if (state.ui && state.ui.openPlanLoadingId === planId) {
            state.ui.openPlanLoadingId = '';
          }
          renderPlaneacionesList();
          return false;
        }
      });
      renderPlaneacionesList();
      window.requestAnimationFrame(() => {
        const card = $('plan-card-' + planId);
        if (card && typeof card.scrollIntoView === 'function') {
          document.querySelectorAll('.plan-card.is-alert-focus').forEach((item) => {
            item.classList.remove('is-alert-focus');
            if (item._alertFocusTimer) {
              window.clearTimeout(item._alertFocusTimer);
              item._alertFocusTimer = null;
            }
          });
          card.classList.add('is-alert-focus');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card._alertFocusTimer = window.setTimeout(() => {
            card.classList.remove('is-alert-focus');
            card._alertFocusTimer = null;
          }, 2200);
        }
      });
    }

    function renderAlertas() {
      const host = $('alertsList');
      const card = $('alertsCard');
      if (!host) return;
      const visibleAlertas = getVisibleOperationalAlerts();
      if (card) {
        const adminMode = canUseAdminShell();
        card.hidden = (adminMode && state.activeAdminModule !== 'dashboard') || !visibleAlertas.length;
      }
      if (!visibleAlertas.length) {
        host.innerHTML = '<div class="empty">TodavÃ­a no hay alertas visibles para esta sesiÃ³n.</div>';
        return;
      }

      host.innerHTML = visibleAlertas.map((alerta) => {
        const plan = getPlanById(alerta.planeacion_id);
        const grupo = plan ? getGrupoById(plan.grupo_id) : null;
        const materia = plan ? getMateriaById(plan.materia_id) : null;
        const semana = plan ? state.catalogos.semanas.find((item) => item.semana_id === plan.semana_id) : null;
        const contexto = plan ? [
          grupo ? getGrupoDisplayName(grupo) : '',
          materia ? (materia.nombre || materia.materia_id) : '',
          semana ? (semana.nombre_visible || semana.semana_id) : ''
        ].filter(Boolean).join(' Â· ') : '';
        const metaParts = [];
        if (contexto) metaParts.push(contexto);
        if (alerta.fecha_creacion) metaParts.push('Creada ' + formatFechaHumana(alerta.fecha_creacion));
        return (
          '<div class="alert-item">' +
            '<div class="alert-item-main">' +
              '<div class="alert-item-top">' +
                '<div class="alert-type">' + escapeHtml(getAlertTypeLabel(alerta.tipo_alerta)) + '</div>' +
                '<div class="alert-status ' + escapeHtml(String(alerta.estado || '').trim()) + '">' + escapeHtml(getAlertStatusLabel(alerta.estado)) + '</div>' +
              '</div>' +
              '<div class="alert-summary">' + escapeHtml(formatAlertDescription(alerta)) + '</div>' +
              (metaParts.length ? '<div class="alert-meta">' + escapeHtml(metaParts.join(' Â· ')) + '</div>' : '') +
            '</div>' +
        (plan ? '<div class="alert-item-actions"><button class="btn-open-plan alert-open-btn" type="button" onclick="openPlanFromAlert(this, \'' + escapeJsAttrValue(plan.planeacion_id) + '\')">Abrir</button></div>' : '') +
          '</div>'
        );
      }).join('');
    }

    function safeJsonParse(raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {
        return null;
      }
    }

    function renderAdminReporteCicloModule() {
      const ui = getReportSelectionState();
      const alumnos = state.catalogos.alumnos || [];
      const periodos = getAvailablePeriods();
      const adminAlumno = $('adminReportAlumno');
      const adminPeriodo = $('adminReportPeriodo');
      const selectedAlumno = getSelectedReporteAlumnoRow();
      const selectedPeriodo = getSelectedReportePeriodoRow();

      if (adminAlumno) {
        fillSelect(adminAlumno, alumnos, (row) => row.alumno_id, (row) => (row.nombre_mostrado || row.nombre_completo || row.alumno_id) + ' Â· ' + row.alumno_id, 'Selecciona alumno');
        if (ui.alumno_id) adminAlumno.value = ui.alumno_id;
      }
      if (adminPeriodo) {
        fillSelect(adminPeriodo, periodos, (row) => row.id, (row) => row.id + ' - ' + row.name, 'Selecciona perÃ­odo');
        if (ui.periodo_id) adminPeriodo.value = ui.periodo_id;
      }
      if ($('repAlumno') && ui.alumno_id) $('repAlumno').value = ui.alumno_id;
      if ($('repPeriodo') && ui.periodo_id) $('repPeriodo').value = ui.periodo_id;

      if ($('adminReporteKpiAlumnos')) $('adminReporteKpiAlumnos').textContent = String(alumnos.length || 0);
      if ($('adminReporteKpiPeriodos')) $('adminReporteKpiPeriodos').textContent = String(periodos.length || 0);
      if ($('adminReporteKpiPdf')) $('adminReporteKpiPdf').textContent = getReportStatusLabel(ui.lastResult && (ui.lastResult.status || ui.lastResult.estado) || 'sin consulta');

      if ($('adminReportSelectionSummary')) {
        $('adminReportSelectionSummary').innerHTML = [
          '<div class="admin-reporte-ciclo-summary-card"><span>Alumno seleccionado</span><strong>' + escapeHtml(selectedAlumno ? (selectedAlumno.nombre_mostrado || selectedAlumno.nombre_completo || selectedAlumno.alumno_id) : 'Sin selecciÃ³n') + '</strong></div>',
          '<div class="admin-reporte-ciclo-summary-card"><span>Grupo / matrÃ­cula</span><strong>' + escapeHtml(selectedAlumno ? ((selectedAlumno.grupo_id || '-') + ' Â· ' + (selectedAlumno.matricula || selectedAlumno.alumno_id || '-')) : 'Pendiente') + '</strong></div>',
          '<div class="admin-reporte-ciclo-summary-card"><span>PerÃ­odo</span><strong>' + escapeHtml(selectedPeriodo ? (selectedPeriodo.nombre_visible || selectedPeriodo.periodo_id || '') : 'Sin selecciÃ³n') + '</strong></div>'
        ].join('');
      }
      if ($('adminReportPreviewAlumno')) {
        $('adminReportPreviewAlumno').textContent = selectedAlumno ? (selectedAlumno.nombre_mostrado || selectedAlumno.nombre_completo || selectedAlumno.alumno_id) : 'Selecciona un alumno';
      }
      if ($('adminReportPreviewMeta')) {
        $('adminReportPreviewMeta').textContent = selectedAlumno
          ? ('Grupo ' + (selectedAlumno.grupo_id || '-') + ' Â· MatrÃ­cula ' + (selectedAlumno.matricula || selectedAlumno.alumno_id || '-') + ' Â· Documento acadÃ©mico familiar')
          : 'Grupo, matrÃ­cula y facilitadora se resolverÃ¡n aquÃ­.';
      }
      if ($('adminReportPreviewPeriodo')) {
        $('adminReportPreviewPeriodo').textContent = selectedPeriodo ? (selectedPeriodo.nombre_visible || selectedPeriodo.periodo_id || 'PerÃ­odo') : 'PerÃ­odo';
      }

      const adminHost = $('adminReportResult');
      if (adminHost) {
        adminHost.innerHTML = buildReportResultMarkup(ui.lastResult);
      }
      if (!ui.lastResult && $('reportResult')) {
        $('reportResult').innerHTML = buildReportResultMarkup(null, { compact: true });
      }
    }

    function renderReportResult(data) {
      const ui = getReportSelectionState();
      ui.lastResult = data || null;
      const label = getReportStatusLabel(data && (data.status || data.estado) || 'sin consulta');
      const host = $('reportResult');
      if (host) host.innerHTML = buildReportResultMarkup(data, { compact: true });
      const adminHost = $('adminReportResult');
      if (adminHost) adminHost.innerHTML = buildReportResultMarkup(data);
      if ($('adminReporteKpiPdf')) $('adminReporteKpiPdf').textContent = label;
      if ($('adminCountReportes')) $('adminCountReportes').textContent = label;
    }

    async function loadMaintenancePreview(options = {}) {
      if (!canUseAdminShell()) return null;
      const ui = getMaintenanceUi();
      const payload = {
        categories: ui.selectedCategories,
        trash_report_files: !!ui.trashReportFiles
      };
      const data = await api('getEntornoPruebasStatus', payload);
      ui.preview = data.preview || null;
      ui.lastReset = data.last_reset || null;
      ui.availableCategories = Array.isArray(data.available_categories) ? data.available_categories : [];
      if (!options || !options.keepAudit) {
        ui.audit = ui.audit || null;
      }
      return data;
    }

    function getMaintenanceCategories() {
      const ui = getMaintenanceUi();
      const available = Array.isArray(ui.availableCategories) && ui.availableCategories.length
        ? ui.availableCategories
        : [
            { key: 'planeaciones', label: 'Planeaciones y actividades', description: 'Limpia planeaciones, relaciones y actividades.', default_selected: true },
            { key: 'seguimiento', label: 'Seguimiento, alertas y notas', description: 'Limpia observaciones, alertas y notas.', default_selected: true },
            { key: 'evaluaciones', label: 'Evaluaciones acadÃ©micas', description: 'Limpia evaluaciones usadas por historial y reporte.', default_selected: true },
            { key: 'reportes', label: 'Cache y artefactos de reportes', description: 'Limpia cache y permite mover PDFs/docs a papelera.', default_selected: true },
            { key: 'comunicacion', label: 'Notificaciones internas', description: 'Limpia avisos y notificaciones.', default_selected: false },
            { key: 'apoyos', label: 'Refuerzos y talleres', description: 'Limpia apoyos operativos sin tocar catÃ¡logos base.', default_selected: false },
            { key: 'bitacora', label: 'BitÃ¡cora operativa', description: 'Limpia historial de acciones.', default_selected: false }
          ];
      return available;
    }

    function getMaintenanceSummaryMarkup() {
      const ui = getMaintenanceUi();
      const preview = ui.preview || {};
      const reportFiles = preview.report_files || {};
      return [
        '<div class="admin-config-summary">',
          '<div class="admin-config-stat"><span>Filas objetivo</span><strong>' + escapeHtml(String(preview.total_rows || 0)) + '</strong></div>',
          '<div class="admin-config-stat"><span>Hojas tocadas</span><strong>' + escapeHtml(String((preview.per_sheet || []).length || 0)) + '</strong></div>',
          '<div class="admin-config-stat"><span>Archivos de reporte</span><strong>' + escapeHtml(String((reportFiles.pdf_files || 0) + (reportFiles.doc_files || 0))) + '</strong></div>',
        '</div>'
      ].join('');
    }

    function renderMaintenanceSheetRows() {
      const ui = getMaintenanceUi();
      const rows = ui.preview && Array.isArray(ui.preview.per_sheet) ? ui.preview.per_sheet : [];
      if (!rows.length) {
        return '<div class="admin-alumnos-empty"><div><strong>Sin datos cargados.</strong><div class="subtle">Usa â€œActualizar vista previaâ€ para revisar quÃ© se limpiarÃ­a.</div></div></div>';
      }
      return '<div class="admin-config-sheet-list">' + rows.map((row) => (
        '<div class="admin-config-sheet-row"><strong>' + escapeHtml(row.sheet) + '</strong><span class="mini">' + escapeHtml(String(row.rows || 0)) + ' fila(s)</span></div>'
      )).join('') + '</div>';
    }

    function renderMaintenanceAuditBlock() {
      const ui = getMaintenanceUi();
      const audit = ui.audit || null;
      if (!audit) {
        return '<div class="admin-alumnos-empty"><div><strong>AuditorÃ­a pendiente.</strong><div class="subtle">Ejecuta la auditorÃ­a para revisar duplicados, referencias huÃ©rfanas y estados invÃ¡lidos.</div></div></div>';
      }
      const issues = Array.isArray(audit.issues) ? audit.issues : [];
      const warnings = Array.isArray(audit.warnings) ? audit.warnings : [];
      const items = issues.slice(0, 6).concat(warnings.slice(0, 6));
      return [
        '<div class="admin-config-summary">',
          '<div class="admin-config-stat"><span>Problemas</span><strong>' + escapeHtml(String((audit.summary && audit.summary.issues) || issues.length || 0)) + '</strong></div>',
          '<div class="admin-config-stat"><span>Advertencias</span><strong>' + escapeHtml(String((audit.summary && audit.summary.warnings) || warnings.length || 0)) + '</strong></div>',
          '<div class="admin-config-stat"><span>Backend</span><strong>' + escapeHtml(String(audit.backend_version || '-')) + '</strong></div>',
        '</div>',
        items.length
          ? ('<div class="admin-config-audit-list">' + items.map((item) => '<div class="admin-config-audit-item admin-config-note">' + escapeHtml(item) + '</div>').join('') + '</div>')
          : '<div class="admin-note">La auditorÃ­a no detectÃ³ hallazgos en esta corrida.</div>'
      ].join('');
    }

    function getAdminConfiguracionModuleTemplate() {
      const ui = getMaintenanceUi();
      const categories = getMaintenanceCategories();
      const lastReset = ui.lastReset || null;
      const canReset = canResetTestEnvironment();
      const reportFiles = ui.preview && ui.preview.report_files ? ui.preview.report_files : { pdf_files: 0, doc_files: 0 };
      return [
        '<div class="admin-config-module">',
          '<article class="admin-placeholder">',
            '<div>',
              '<h3>ConfiguraciÃ³n y mantenimiento</h3>',
              '<p>Zona tÃ©cnica para auditar el entorno online de pruebas y limpiar solo datos transaccionales, sin borrar hojas ni headers.</p>',
            '</div>',
            '<div class="admin-config-pills">',
              '<span class="admin-config-pill">Preserva estructura</span>',
              '<span class="admin-config-pill">Preview antes de reset</span>',
              '<span class="admin-config-pill">AuditorÃ­a final</span>',
            '</div>',
            lastReset
              ? ('<div class="admin-note">Ãšltimo reset registrado: ' + escapeHtml(lastReset.at || '-') + ' por ' + escapeHtml(lastReset.by || '-') + (lastReset.role ? ' (' + escapeHtml(lastReset.role) + ')' : '') + '.</div>')
              : '<div class="admin-note">AÃºn no hay un reset tÃ©cnico registrado en este entorno.</div>',
          '</article>',
          '<div class="admin-config-grid">',
            '<section class="admin-config-card">',
              '<div class="admin-config-card-head"><div><h3>Reset seguro del entorno</h3><div class="subtle">Selecciona quÃ© capas operativas quieres limpiar.</div></div></div>',
              '<div class="admin-config-categories">',
                categories.map((item) => (
                  '<label class="admin-config-category">' +
                    '<input type="checkbox" class="admin-config-category-input" data-maintenance-category="' + escapeHtml(item.key) + '"' + (ui.selectedCategories.includes(item.key) ? ' checked' : '') + '>' +
                    '<div><strong>' + escapeHtml(item.label || item.key) + '</strong><div class="subtle">' + escapeHtml(item.description || '') + '</div></div>' +
                  '</label>'
                )).join(''),
              '</div>',
              '<div class="admin-config-inline">',
                '<label class="admin-config-switch"><input id="maintenanceTrashFilesInput" type="checkbox"' + (ui.trashReportFiles ? ' checked' : '') + '> Mandar PDFs/docs de reportes a papelera (' + escapeHtml(String((reportFiles.pdf_files || 0) + (reportFiles.doc_files || 0))) + ' detectados)</label>',
              '</div>',
              getMaintenanceSummaryMarkup(),
              '<div class="actions compact">',
                '<button id="maintenancePreviewBtn" class="btn-secondary" type="button">Actualizar vista previa</button>',
                '<button id="maintenanceAuditBtn" class="btn-ghost" type="button">Ejecutar auditorÃ­a</button>',
                canReset
                  ? '<button id="maintenanceResetBtn" class="btn-primary" type="button">Resetear entorno de pruebas</button>'
                  : '<button class="btn-primary" type="button" disabled>Reset solo para admin</button>',
              '</div>',
              '<div class="admin-config-danger"><strong>ProtecciÃ³n activa:</strong> este reset solo limpia datos operativos. CatÃ¡logos maestros, semanas, perÃ­odos, facilitadores, alumnos, materias, submaterias y configuraciÃ³n base se conservan.</div>',
            '</section>',
            '<section class="admin-config-card">',
              '<div class="admin-config-card-head"><div><h4>Vista previa</h4><div class="subtle">Conteo por hoja antes de ejecutar el reset.</div></div></div>',
              renderMaintenanceSheetRows(),
              '<div class="admin-config-card-head"><div><h4>AuditorÃ­a</h4><div class="subtle">Chequeo rÃ¡pido de consistencia estructural y operativa.</div></div></div>',
              renderMaintenanceAuditBlock(),
            '</section>',
          '</div>',
        '</div>'
      ].join('');
    }

    function renderAdminConfiguracionModule() {
      const panel = $('admin-panel-configuracion');
      if (!panel || !canUseAdminShell()) return;
      panel.innerHTML = getAdminConfiguracionModuleTemplate();
      document.querySelectorAll('.admin-config-category-input').forEach((input) => {
        input.addEventListener('change', () => {
          const ui = getMaintenanceUi();
          ui.selectedCategories = Array.from(document.querySelectorAll('.admin-config-category-input:checked')).map((node) => node.dataset.maintenanceCategory);
        });
      });
      if ($('maintenanceTrashFilesInput')) {
        $('maintenanceTrashFilesInput').addEventListener('change', (event) => {
          getMaintenanceUi().trashReportFiles = !!event.currentTarget.checked;
        });
      }
      if ($('maintenancePreviewBtn')) {
        $('maintenancePreviewBtn').addEventListener('click', (event) => refreshMaintenancePreview(event.currentTarget));
      }
      if ($('maintenanceAuditBtn')) {
        $('maintenanceAuditBtn').addEventListener('click', (event) => runMaintenanceAudit(event.currentTarget));
      }
      if ($('maintenanceResetBtn')) {
        $('maintenanceResetBtn').addEventListener('click', (event) => resetMaintenanceEnvironment(event.currentTarget));
      }
    }

    async function refreshMaintenancePreview(button) {
      await handleAction('getEntornoPruebasStatus', async () => {
        await loadMaintenancePreview({ keepAudit: true });
        renderAdminConfiguracionModule();
        setBanner('Vista previa del reset actualizada.', 'info');
      }, { button, key: buildActionKey('getEntornoPruebasStatus', [getMaintenanceUi().selectedCategories.join(','), getMaintenanceUi().trashReportFiles ? 'trash' : 'keep']) });
    }

    async function runMaintenanceAudit(button) {
      await handleAction('auditarEntornoPruebas', async () => {
        const audit = await api('auditarEntornoPruebas');
        getMaintenanceUi().audit = audit || null;
        renderAdminConfiguracionModule();
        setBanner(
          ((audit && audit.summary && audit.summary.issues) || 0) > 0
            ? 'AuditorÃ­a completada con hallazgos. RevÃ­salos antes del reset.'
            : 'AuditorÃ­a completada sin problemas crÃ­ticos detectados.',
          ((audit && audit.summary && audit.summary.issues) || 0) > 0 ? 'warning' : 'success'
        );
      }, { button, key: 'auditarEntornoPruebas' });
    }

    async function resetMaintenanceEnvironment(button) {
      if (!canResetTestEnvironment()) throw new Error('Solo admin puede resetear el entorno de pruebas.');
      const ui = getMaintenanceUi();
      if (!ui.selectedCategories.length) throw new Error('Selecciona al menos una categorÃ­a.');
      if (!ui.preview) {
        await loadMaintenancePreview({ keepAudit: true });
      }
      const preview = ui.preview || { total_rows: 0, per_sheet: [] };
      const confirmation = [
        'Se limpiarÃ¡n ' + String(preview.total_rows || 0) + ' filas en ' + String((preview.per_sheet || []).length || 0) + ' hojas.',
        'CategorÃ­as: ' + ui.selectedCategories.join(', ') + '.',
        ui.trashReportFiles ? 'Los PDFs/docs asociados en REPORTES_CACHE tambiÃ©n se mandarÃ¡n a papelera si existen.' : 'Los archivos fÃ­sicos de reportes se conservarÃ¡n.',
        'La estructura del spreadsheet se mantiene.',
        'Â¿Deseas continuar?'
      ].join('\n');
      if (!window.confirm(confirmation)) return;

      await handleAction('resetEntornoPruebas', async () => {
        const data = await api('resetEntornoPruebas', {
          categories: ui.selectedCategories,
          trash_report_files: !!ui.trashReportFiles,
          confirmation_code: 'RESET_ENTORNO_PRUEBAS',
          request_id: uid('RSTENV')
        });
        ui.preview = data.preview_after || null;
        ui.lastReset = data.last_reset || null;
        ui.audit = data.audit_after || null;
        await refreshAll({ silent: true });
        setBanner('Entorno de pruebas reseteado sin tocar la estructura base.', 'success');
      }, { button, key: buildActionKey('resetEntornoPruebas', [ui.selectedCategories.join(','), ui.trashReportFiles ? 'trash' : 'keep']) });
    }

    function activateTab(tabName) {
      if (getCurrentRole() === 'facilitador' && tabName !== 'planeaciones') {
        tabName = 'planeaciones';
      }
      if (tabName === 'reportes' && !canUseReportes()) {
        tabName = 'planeaciones';
      }
      if (tabName !== 'planeaciones') {
        resetPlaneacionesTransientUi();
      }
      state.activeTab = tabName;
      document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.tab === tabName);
      });
      document.querySelectorAll('.panel').forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === 'panel-' + tabName);
      });
      if (tabName === 'planeaciones' && state.ui && !state.ui.planeacionesLoaded) {
        if (shouldSkipPlaneacionesTabBootRefresh()) return;
        refreshPlaneaciones()
          .then(() => renderPlaneacionesSurface({
            includeStats: true,
            includePlaneaciones: true,
            includeAlertas: true
          }))
          .catch(() => {});
      }
    }

    function renderAll() {
      const adminMode = canUseAdminShell();
      const activeTab = state.activeTab;
      const activeAdminModule = state.activeAdminModule;
      const shouldRenderPlaneaciones = adminMode ? activeAdminModule === 'planeaciones' : activeTab === 'planeaciones';
      const shouldRenderSeguimiento = !adminMode && activeTab === 'seguimiento';
      const shouldRenderReportes = adminMode ? activeAdminModule === 'reporte-ciclo' : activeTab === 'reportes';
      const shouldRenderCatalogSelects = shouldRenderPlaneaciones || shouldRenderSeguimiento || shouldRenderReportes;
      const shouldRenderAlerts = !adminMode || activeAdminModule === 'dashboard' || activeAdminModule === 'planeaciones';

      refreshStaticCopy();
      syncAuthMode();
      renderSession();
      renderStats();
      renderAdminShell();
      if (adminMode) renderActiveAdminModule(activeAdminModule);
      renderInstitutionalNotices();
      if (shouldRenderCatalogSelects) {
        if (shouldRenderReportes) renderPeriodSelects();
        renderBaseSelects({
          planeaciones: shouldRenderPlaneaciones,
          seguimiento: shouldRenderSeguimiento,
          reportes: shouldRenderReportes
        });
      }
      if (shouldRenderSeguimiento) {
        renderObsAlumnoSelect();
        renderEvaluationDependencies();
      }
      if (shouldRenderPlaneaciones) {
        renderPlaneacionesList();
        renderPlanBuilderVisibility();
      }
      if (shouldRenderAlerts) renderAlertas();
      syncRoleUi();
      activateTab(state.activeTab);
    }

    function renderBootSurface() {
      refreshStaticCopy();
      syncAuthMode();
      renderSession();
      renderStats();
      renderAdminShell();
      renderInstitutionalNotices();
      if (canUseAdminShell()) {
        if (state.activeAdminModule === 'dashboard') {
          renderAlertas();
        } else {
          renderActiveAdminModule(state.activeAdminModule);
        }
      } else if (String(state.activeTab || '').trim() === 'planeaciones') {
        renderPlaneacionesList();
        renderPlanBuilderVisibility();
      }
      syncRoleUi();
      activateTab(state.activeTab);
    }

    async function savePlanEditor(targetStatusOverride) {
      ensureLoggedIn();
      if (state.ui && state.ui.planeacionesCatalogosLoading) {
        throw new Error('Espera a que terminen de cargar materias y grupos.');
      }
      const hasAdminPower = canUseAdminShell();
      const editorMode = state.planEditor.mode;
      const fallbackDate = editorMode === 'edit'
        ? toYmdFrontend_((getWeekById(state.planEditor.lockedSemanaId) || {}).fecha_inicio || '')
        : '';
      const fechaPlaneacion = $('planFecha').value || fallbackDate;
      const semana = getWeekByDateOrDraft(fechaPlaneacion);
      if (!semana) throw new Error('Selecciona una fecha valida para construir la semana.');
      const materiaId = String($('planMateria').value || '').trim();
      const fraseSemana = $('planFrase').value.trim();
      if (!materiaId) throw new Error('Selecciona una materia.');
      const selectedSubmateriaId = $('planSubmateria') ? $('planSubmateria').value : '';
      if (materiaRequiresPlanSubmateria(materiaId) && !selectedSubmateriaId) {
        throw new Error('Selecciona una submateria.');
      }
      const grupoIds = state.planEditor.mode === 'edit'
        ? (hasAdminPower ? getSelectedGroupIds() : [state.planEditor.lockedGrupoId])
        : getSelectedGroupIds();
      if (!grupoIds.length) throw new Error('Selecciona al menos un grupo.');
      if (editorMode === 'edit' && hasAdminPower && grupoIds.length !== 1) {
        throw new Error('AdministraciÃ³n debe seleccionar exactamente un grupo al editar una planeaciÃ³n.');
      }
      const alumnosIds = getSelectedPlanAlumnos();
      if (!alumnosIds.length) throw new Error('Selecciona al menos un alumno.');
      const includeSeguimientoOnEditor = canUseAdminShell() && editorMode === 'edit';
      const usePlaneacionOutboxFeedback = !hasAdminPower && isPlaneacionOutboxEnabled();
      const actividades = state.planEditor.activities
        .map((activity) => ({
          actividad_id: activity.actividad_id || '',
          texto: String(activity.texto || '').trim(),
          material_en_carpeta: activity.material_en_carpeta || 'no_requiere',
          realizada: includeSeguimientoOnEditor ? (activity.realizada || '') : '',
          comentario_cierre: includeSeguimientoOnEditor ? String(activity.comentario_cierre || '').trim() : '',
          last_known_updated_at: activity.last_known_updated_at || ''
        }))
        .filter((activity) => activity.texto);
      if (!actividades.length) throw new Error('Captura al menos una actividad.');
      if (includeSeguimientoOnEditor) {
        actividades.forEach((activity, index) => {
          if (activity.realizada === 'no' && !activity.comentario_cierre) {
            throw new Error('La actividad ' + (index + 1) + ' necesita comentario porque no se realizÃ³.');
          }
        });
      }

      const previousPlan = editorMode === 'edit' ? getPlanById(state.planEditor.planId) : null;
      const planEditorSnapshot = cloneJsonSafe(state.planEditor, state.planEditor);
      const targetStatus = editorMode === 'edit'
        ? String((previousPlan && previousPlan.estado) || 'borrador').trim()
        : (String(targetStatusOverride || '').trim() === 'activa' ? 'activa' : 'borrador');
      const optimisticCreatedPlans = editorMode !== 'edit'
        ? buildOptimisticCreatedPlaneaciones({
            fechaPlaneacion,
            semana,
            groupIds: grupoIds,
            materiaId,
            submateriaId: selectedSubmateriaId,
            fraseSemana,
            alumnosIds,
            activities: actividades,
            targetStatus
          })
        : [];
      const shouldForceAlertasAfterSave = actividades.some((activity) => normalizeMaterialStatus(activity.material_en_carpeta) === 'no_listo');
      const optimisticUpdatedPlan = editorMode === 'edit' && previousPlan
        ? buildOptimisticPlaneacionSavePreview(previousPlan, {
            draft: {
              fecha_planeacion: fechaPlaneacion,
              frase_semana: fraseSemana,
              materia_id: materiaId,
              submateria_id: selectedSubmateriaId,
              alumnos_ids: alumnosIds,
              activities: actividades.map((activity) => ({
                actividad_id: activity.actividad_id || '',
                texto: activity.texto,
                material_en_carpeta: activity.material_en_carpeta,
                realizada: activity.realizada,
                comentario_cierre: activity.comentario_cierre,
                last_known_updated_at: activity.last_known_updated_at || ''
              })),
              lastKnownUpdatedAt: state.planEditor.lastKnownUpdatedAt,
              lastKnownActivitiesVersion: state.planEditor.lastKnownActivitiesVersion
            },
            request: {
              semana,
              fallbackDate,
              materiaId,
              submateriaId: selectedSubmateriaId,
              alumnosIds,
              actividades
            },
            localState: 'saving',
            localMessage: usePlaneacionOutboxFeedback
              ? 'Guardado local. Sincronizando...'
              : 'Guardando en segundo plano...'
          })
        : null;
      const optimisticCreatedIds = optimisticCreatedPlans.map((plan) => plan.planeacion_id);
      if (usePlaneacionOutboxFeedback && optimisticCreatedPlans.length) {
        optimisticCreatedPlans.forEach((plan) => {
          plan._local_save_message = 'Guardada localmente. Sincronizando creación...';
        });
      }
      const shouldRollbackCreate = optimisticCreatedIds.length > 0;
      if (optimisticUpdatedPlan) {
        upsertPlaneacionRow(optimisticUpdatedPlan);
        state.openPlanId = optimisticUpdatedPlan.planeacion_id;
        state.openPlanDraft = buildOpenPlanDraft(optimisticUpdatedPlan);
        persistCurrentBootSnapshot('planeacion_editor_guardando');
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
        setBanner('Guardando planeación en segundo plano...', 'info');
      } else if (optimisticCreatedPlans.length) {
        upsertPlaneacionesRows(optimisticCreatedPlans);
        resetPlanEditor();
        state.openPlanId = optimisticCreatedIds[0] || '';
        state.openPlanDraft = null;
        persistCurrentBootSnapshot('planeacion_editor_creando');
        focusPlaneacionCardSoon(optimisticCreatedIds[0]);
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
        setBanner('Creando planeación...', 'info');
      }
      if (!hasAdminPower && isPlaneacionOutboxEnabled()) {
        if (editorMode === 'edit' && optimisticUpdatedPlan) {
          enqueuePlaneacionOutboxItem(buildPlaneacionOutboxItem('editor_edit', {
            mergeKey: 'plan:' + String(state.planEditor.planId || '').trim(),
            planId: String(state.planEditor.planId || '').trim(),
            previousPlanSnapshot: previousPlan,
            optimisticPlan: optimisticUpdatedPlan,
            forceAlertas: shouldForceAlertasAfterSave,
            localMessage: 'Guardado local. Sincronizando...',
            requestAction: 'guardarPlaneacionCompleta',
            requestPayload: {
              planeacion_id: state.planEditor.planId,
              fecha_planeacion: fechaPlaneacion,
              semana_id: semana.draft ? '' : semana.semana_id,
              grupo_id: grupoIds[0],
              materia_id: materiaId,
              submateria_id: selectedSubmateriaId,
              frase_semana: fraseSemana,
              alumnos_ids: alumnosIds,
              actividades,
              last_known_updated_at: state.planEditor.lastKnownUpdatedAt,
              last_known_activities_version: state.planEditor.lastKnownActivitiesVersion,
              request_id: uid('PLAUPD')
            }
          }));
          setBanner('Guardado local. Sincronizando en segundo plano...', 'success');
          return;
        }
        if (editorMode !== 'edit' && optimisticCreatedPlans.length) {
          enqueuePlaneacionOutboxItem(buildPlaneacionOutboxItem('editor_create', {
            tempPlanIds: optimisticCreatedIds,
            optimisticPlans: optimisticCreatedPlans,
            forceAlertas: shouldForceAlertasAfterSave,
            localMessage: 'Guardada localmente. Sincronizando creación...',
            requestAction: 'crearPlaneacion',
            requestPayload: {
              fecha_planeacion: fechaPlaneacion,
              semana_id: semana.draft ? '' : semana.semana_id,
              grupo_ids: grupoIds,
              estado_inicial: targetStatus,
              materia_id: materiaId,
              submateria_id: selectedSubmateriaId,
              frase_semana: fraseSemana,
              alumnos_ids: alumnosIds,
              actividades,
              request_id: uid('PLA')
            }
          }));
          setBanner('Guardada localmente. Sincronizando creación en segundo plano...', 'success');
          return;
        }
      }
      let responseData = null;
      try {
        if (editorMode === 'edit') {
          responseData = await api('guardarPlaneacionCompleta', {
            planeacion_id: state.planEditor.planId,
            fecha_planeacion: fechaPlaneacion,
            semana_id: semana.draft ? '' : semana.semana_id,
            grupo_id: grupoIds[0],
            materia_id: materiaId,
            submateria_id: selectedSubmateriaId,
            frase_semana: fraseSemana,
            alumnos_ids: alumnosIds,
            actividades,
            last_known_updated_at: state.planEditor.lastKnownUpdatedAt,
            last_known_activities_version: state.planEditor.lastKnownActivitiesVersion,
            request_id: uid('PLAUPD')
          });
        } else {
          responseData = await api('crearPlaneacion', {
            fecha_planeacion: fechaPlaneacion,
            semana_id: semana.draft ? '' : semana.semana_id,
            grupo_ids: grupoIds,
            estado_inicial: targetStatus,
            materia_id: materiaId,
            submateria_id: selectedSubmateriaId,
            frase_semana: fraseSemana,
            alumnos_ids: alumnosIds,
            actividades,
            request_id: uid('PLA')
          });
        }
      } catch (err) {
        if (optimisticUpdatedPlan && previousPlan) {
          upsertPlaneacionRow(previousPlan);
          state.openPlanId = previousPlan.planeacion_id;
          state.openPlanDraft = buildOpenPlanDraft(previousPlan);
          renderPlaneacionesSurface({
            includeStats: true,
            includePlaneaciones: true,
            includeAlertas: false
          });
        }
        if (shouldRollbackCreate) {
          removePlaneacionRows(optimisticCreatedIds);
          restorePlanEditorFromSnapshot(planEditorSnapshot);
          renderPlaneacionesSurface({
            includeStats: true,
            includePlaneaciones: true,
            includeAlertas: false
          });
        }
        throw err;
      }
      const updatedPlan = responseData && responseData.planeacion ? responseData.planeacion : null;
      const createdPlans = Array.isArray(responseData && responseData.planeaciones)
        ? responseData.planeaciones.filter((plan) => plan && plan.planeacion_id)
        : (updatedPlan && updatedPlan.planeacion_id ? [updatedPlan] : []);
      const canApplyLocally = editorMode === 'edit' && updatedPlan && !shouldRefetchPlaneacionesAfterPlanSave(previousPlan, updatedPlan);
      const canApplyCreateLocally = editorMode !== 'edit' && createdPlans.length;
      if (editorMode !== 'edit' && !optimisticCreatedPlans.length) {
        resetPlanEditor();
      }
      if (optimisticCreatedIds.length) removePlaneacionRows(optimisticCreatedIds);
      if (canApplyLocally) {
        upsertPlaneacionRow(Object.assign({}, updatedPlan, {
          _local_save_state: 'saved',
          _local_save_message: 'Planeación guardada.'
        }));
        state.openPlanId = updatedPlan.planeacion_id;
        state.openPlanDraft = buildOpenPlanDraft(getPlanById(updatedPlan.planeacion_id) || updatedPlan);
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
        persistCurrentBootSnapshot('planeacion_editor_guardada');
        scheduleClearLocalPlaneacionFeedback(updatedPlan.planeacion_id);
        refreshPlaneacionesAlertsDeferred({
          force: shouldForceAlertasAfterSave
        });
      } else if (canApplyCreateLocally) {
        const appliedPlans = upsertPlaneacionesRows(createdPlans.map((plan) => Object.assign({}, plan, {
          _local_save_state: 'saved',
          _local_save_message: 'Planeación creada.'
        })));
        if (shouldForceAlertasAfterSave) injectLocalMaterialAlerts(appliedPlans);
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
        persistCurrentBootSnapshot('planeacion_editor_creada');
        scheduleClearLocalPlaneacionFeedback(appliedPlans.map((plan) => plan.planeacion_id));
        refreshPlaneacionesAlertsDeferred({
          force: shouldForceAlertasAfterSave
        });
      } else {
        await refreshPlaneacionesSurface({ includeAlertas: false });
        refreshPlaneacionesAlertsDeferred({
          force: shouldForceAlertasAfterSave,
          includeStats: false,
          includePlaneaciones: false
        }).catch(() => {});
      }
      setBanner(
        responseData && responseData._meta && responseData._meta.message
          ? responseData._meta.message
          : (editorMode === 'edit' ? 'Planeación actualizada.' : 'Planeación guardada.'),
        'success'
      );
    }

    async function saveObservation() {
      ensureLoggedIn();
      ensureBackendPeriodsReady();
      if (!$('obsPlan').value) throw new Error('Selecciona una planeaciÃ³n.');
      if (!$('obsAlumno').value) throw new Error('Selecciona un alumno.');
      if (!$('obsPeriodo').value) throw new Error('Selecciona un perÃ­odo.');
      if (!$('obsNota').value.trim()) throw new Error('Escribe la observaciÃ³n.');
      await api('crearObsAlumno', {
        planeacion_id: $('obsPlan').value,
        alumno_id: $('obsAlumno').value,
        tipo: $('obsTipo').value,
        nota: $('obsNota').value.trim(),
        fecha: $('obsFecha').value,
        visible_en_reporte: $('obsVisible').checked ? 'si' : 'no',
        requiere_revision_directora: $('obsRevision').checked ? 'si' : 'no',
        periodo_id: $('obsPeriodo').value,
        request_id: uid('OBS')
      });
      $('obsNota').value = '';
      $('obsRevision').checked = false;
      setBanner('ObservaciÃ³n guardada.', 'success');
    }

    async function saveEvaluation() {
      ensureLoggedIn();
      ensureBackendPeriodsReady();
      if (!$('evaAlumno').value) throw new Error('Selecciona un alumno.');
      if (!$('evaPeriodo').value) throw new Error('Selecciona un perÃ­odo.');
      if (!$('evaMateria').value) throw new Error('Selecciona una materia.');
      const data = await api('guardarEvaluacion', {
        alumno_id: $('evaAlumno').value,
        materia_id: $('evaMateria').value,
        submateria_id: $('evaSubmateria').value,
        habilidad_id: $('evaHabilidad').value,
        nivel: $('evaNivel').value,
        comentario: $('evaComentario').value.trim(),
        visible_en_reporte: $('evaVisible').checked ? 'si' : 'no',
        periodo_id: $('evaPeriodo').value,
        request_id: uid('EVA')
      });
      $('evaComentario').value = '';
      setBanner('EvaluaciÃ³n guardada (' + data.evaluacion_id + ').', 'success');
    }

    async function saveNote() {
      ensureLoggedIn();
      ensureBackendPeriodsReady();
      if (!$('notaAlumno').value) throw new Error('Selecciona un alumno.');
      if (!$('notaTexto').value.trim()) throw new Error('Escribe el texto de la nota.');
      if ($('notaAlcance').value === 'periodo' && !$('notaPeriodo').value) {
        throw new Error('Selecciona un perÃ­odo para la nota.');
      }
      await api('crearNotaDirectora', {
        alumno_id: $('notaAlumno').value,
        tipo: $('notaTipo').value,
        alcance: $('notaAlcance').value,
        periodo_id: $('notaAlcance').value === 'global' ? '' : $('notaPeriodo').value,
        texto: $('notaTexto').value.trim(),
        visible_en_reporte: $('notaVisible').checked ? 'si' : 'no',
        request_id: uid('NTA')
      });
      $('notaTexto').value = '';
      setBanner('Nota de direcciÃ³n guardada.', 'success');
    }

    async function generateReportNow() {
      ensureLoggedIn();
      ensureCanUseReportes();
      ensureBackendPeriodsReady();
      const alumnoId = getSelectedReporteAlumnoId();
      const periodoId = getSelectedReportePeriodoId();
      if (!alumnoId) throw new Error('Selecciona un alumno.');
      if (!periodoId) throw new Error('Selecciona un perÃ­odo.');
      const data = await api('requestReporteAlumno', {
        alumno_id: alumnoId,
        periodo_id: periodoId,
        request_id: uid('REP')
      });
      data._selection = { alumno_id: alumnoId, periodo_id: periodoId };
      renderReportResult(data);
      if (data.status === 'listo' && data.url) {
        setBanner('El reporte ya estaba vigente y listo para abrir.', 'success');
        return;
      }
      setBanner('Solicitud registrada. El worker generarÃ¡ o actualizarÃ¡ el reporte en segundo plano.', 'success');
    }

    async function requestReport() {
      ensureLoggedIn();
      ensureCanUseReportes();
      ensureBackendPeriodsReady();
      const alumnoId = getSelectedReporteAlumnoId();
      const periodoId = getSelectedReportePeriodoId();
      if (!alumnoId) throw new Error('Selecciona un alumno.');
      if (!periodoId) throw new Error('Selecciona un perÃ­odo.');
      const data = await api('regenerarReporteAlumno', {
        alumno_id: alumnoId,
        periodo_id: periodoId,
        request_id: uid('RRG')
      });
      data._selection = { alumno_id: alumnoId, periodo_id: periodoId };
      renderReportResult(data);
      setBanner('RegeneraciÃ³n forzada registrada. El worker armarÃ¡ una nueva versiÃ³n del PDF.', 'success');
    }

    async function checkReportStatus() {
      ensureLoggedIn();
      ensureCanUseReportes();
      ensureBackendPeriodsReady();
      const alumnoId = getSelectedReporteAlumnoId();
      const periodoId = getSelectedReportePeriodoId();
      if (!alumnoId) throw new Error('Selecciona un alumno.');
      if (!periodoId) throw new Error('Selecciona un perÃ­odo.');
      const data = await api('getReporteAlumnoStatus', {
        alumno_id: alumnoId,
        periodo_id: periodoId
      });
      data._selection = { alumno_id: alumnoId, periodo_id: periodoId };
      renderReportResult(data);
      setBanner('Estado de reporte actualizado.', data.status === 'listo' ? 'success' : 'info');
    }

    async function handleAction(label, fn, options = {}) {
      const actionKey = options.key || label;
      const button = options.button || null;
      const busyText = options.busyText || 'Procesando...';
      const feedbackAnchor = captureFeedbackAnchor(button);
      if (inFlightActions.has(actionKey)) {
        return inFlightActions.get(actionKey);
      }

      const runner = (async () => {
        pushFeedbackAnchor(feedbackAnchor);
        try {
          clearActionToast();
          setButtonBusy(button, true, busyText);
          await fn();
        } catch (err) {
          if (err && err.code === 'INVALID_SESSION') {
            clearSessionScopedState();
            setBanner('Tu sesiÃ³n expirÃ³ o ya no es vÃ¡lida. Vuelve a iniciar sesiÃ³n.', 'error', { anchor: feedbackAnchor });
            return;
          }
          const handled = typeof options.onError === 'function'
            ? options.onError(err, { anchor: feedbackAnchor, button })
            : false;
          if (!handled) {
            setBanner(formatApiError(err), 'error', { anchor: feedbackAnchor });
          }
        } finally {
          popFeedbackAnchor();
          inFlightActions.delete(actionKey);
          setButtonBusy(button, false, busyText);
        }
      })();

      inFlightActions.set(actionKey, runner);
      return runner;
    }

    async function planAction(button, planId, action) {
      await handleAction(action, async () => {
        const shouldCloseOpenCard = false;
        const previousPlan = getPlanById(planId);
        if (!previousPlan) throw new Error('PlaneaciÃ³n no encontrada.');
        if (action === 'activarPlaneacion') {
          const localState = getPlanLocalSaveState(previousPlan);
          if (isPlaneacionPendingCreation(previousPlan) || ['creating', 'saving', 'activating'].includes(localState)) {
            setBanner('Espera a que termine de guardarse antes de activarla.', 'info');
            return;
          }
          if (localState === 'sync_error') {
            schedulePlaneacionOutboxProcessing(60);
            setBanner('Primero corrige el guardado pendiente antes de activar la semana.', 'info');
            return;
          }
        }
        const previousPlanSnapshot = previousPlan ? cloneJsonSafe(previousPlan, previousPlan) : null;
        if (action === 'activarPlaneacion' && previousPlan) {
          upsertPlaneacionRow(Object.assign({}, previousPlan, {
            estado: 'activa',
            _local_save_state: 'activating',
            _local_save_message: 'La semana ya estÃ¡ visible mientras termina de activarse.'
          }));
          if (state.openPlanId === planId) {
            state.openPlanDraft = null;
          }
          persistCurrentBootSnapshot('planeacion_activando_local');
          renderPlaneacionesList();
          focusPlaneacionCardSoon(planId);
          setBanner('Activando semana en segundo plano...', 'info');
        }
        if (shouldCloseOpenCard) {
          state.openPlanId = '';
          state.openPlanDraft = null;
        }
        let response = null;
        try {
          response = await api(action, { planeacion_id: planId, request_id: uid('PLAN') });
        } catch (err) {
          if (action === 'activarPlaneacion' && previousPlanSnapshot) {
            upsertPlaneacionRow(previousPlanSnapshot);
            persistCurrentBootSnapshot('planeacion_activacion_revertida');
            renderPlaneacionesList();
          }
          throw err;
        }
        const updatedPlan = response && response.planeacion
          ? Object.assign({}, previousPlan || {}, response.planeacion)
          : null;
        if (action === 'activarPlaneacion' && updatedPlan && state.openPlanId === planId) {
          const currentOpenPlan = getPlanById(planId) || previousPlan || updatedPlan;
          const activatedOpenPlan = Object.assign({}, currentOpenPlan, updatedPlan, {
            estado: 'activa',
            fecha_actualizacion: String((updatedPlan && updatedPlan.fecha_actualizacion) || (currentOpenPlan && currentOpenPlan.fecha_actualizacion) || '').trim()
          });
          if (currentOpenPlan && currentOpenPlan.detail_loaded) {
            activatedOpenPlan.detail_loaded = true;
            activatedOpenPlan.boot_detail_loaded = !!currentOpenPlan.boot_detail_loaded;
            activatedOpenPlan.actividades = Array.isArray(currentOpenPlan.actividades) ? currentOpenPlan.actividades : [];
            activatedOpenPlan.alumnos = Array.isArray(currentOpenPlan.alumnos) ? currentOpenPlan.alumnos : [];
            activatedOpenPlan.obs_semana = Array.isArray(currentOpenPlan.obs_semana) ? currentOpenPlan.obs_semana : [];
            activatedOpenPlan.obs_alumno_final = Array.isArray(currentOpenPlan.obs_alumno_final) ? currentOpenPlan.obs_alumno_final : [];
            activatedOpenPlan.obs_loaded = !!currentOpenPlan.obs_loaded;
          }
          upsertPlaneacionRow(activatedOpenPlan);
          state.openPlanDraft = syncOpenPlanDraftConcurrencyHints(
            activatedOpenPlan,
            buildOpenPlanDraft(activatedOpenPlan)
          );
        }
        const appliedLocally = !hasActivePlaneacionesFilters() &&
          await applySavedPlaneacionTransition(planId, updatedPlan, { closeOpenCard: shouldCloseOpenCard });
        if (!appliedLocally) {
          await refreshPlaneacionesSurface();
        }
        setBanner(
          action === 'activarPlaneacion'
            ? 'La planeaciÃ³n ya estÃ¡ activa y lista para trabajarse.'
            : ('AcciÃ³n completada: ' + action),
          'success'
        );
      }, { button, key: buildActionKey(action, [planId]) });
    }

    async function saveActivityProgress(button, actividadId, lastKnownUpdatedAt) {
      const realizada = $('activity-realizada-' + actividadId).value;
      const material = $('activity-material-' + actividadId).value;
      const comentario = $('activity-comment-' + actividadId).value.trim();
      await handleAction('actualizarActividad', async () => {
        const targetPlan = (state.openPlanId && getPlanById(state.openPlanId)) || getPlanByActivityId(actividadId);
        const targetPlanId = targetPlan && targetPlan.planeacion_id ? targetPlan.planeacion_id : String(state.openPlanId || '').trim();
        const draftActivity = state.openPlanDraft && Array.isArray(state.openPlanDraft.activities)
          ? state.openPlanDraft.activities.find((item) => item.actividad_id === actividadId)
          : null;
        await api('actualizarActividad', {
          actividad_id: actividadId,
          realizada,
          material_en_carpeta: material,
          comentario_cierre: comentario,
          last_known_updated_at: lastKnownUpdatedAt,
          request_id: uid('ACTUPD')
        });
        if (draftActivity) {
          draftActivity.realizada = realizada;
          draftActivity.material_en_carpeta = material;
          draftActivity.comentario_cierre = comentario;
        }
        await refreshSinglePlaneacionSurface(targetPlanId, {
          activityIds: [actividadId],
          snapshotKind: 'actividad_actualizada'
        });
        setBanner('Actividad actualizada.', 'success');
      }, { button, key: buildActionKey('actualizarActividad', [actividadId, realizada, material, comentario.slice(0, 20)]) });
    }

    async function saveGeneralObservation(button, planId) {
      const input = $('obs-general-' + planId);
      const texto = input ? input.value.trim() : '';
      if (!texto) throw new Error('Escribe la observaciÃ³n general.');
      await handleAction('crearObsSemana', async () => {
        const previousValue = input ? input.value : '';
        if (input) input.value = '';
        try {
          await persistGeneralObservation(planId, texto);
          await refreshSinglePlaneacionSurface(planId, {
            snapshotKind: 'obs_general'
          });
          setBanner('ObservaciÃ³n general guardada.', 'success');
        } catch (error) {
          if (input) input.value = previousValue;
          throw error;
        }
      }, { button, key: buildActionKey('crearObsSemana', [planId, texto.slice(0, 40)]) });
    }

    async function saveAlumnoFinalObservation(button, planId, alumnoId) {
      const input = $('obs-final-' + planId + '-' + alumnoId);
      const nota = input ? input.value.trim() : '';
      if (!nota) throw new Error('Escribe la observaciÃ³n final del alumno.');
      await handleAction('guardarObsAlumnoFinal', async () => {
        await persistAlumnoFinalObservation(planId, alumnoId, nota);
        await refreshSinglePlaneacionSurface(planId, {
          snapshotKind: 'obs_final_alumno'
        });
        setBanner('ObservaciÃ³n final por alumno guardada.', 'success');
      }, { button, key: buildActionKey('guardarObsAlumnoFinal', [planId, alumnoId, nota.slice(0, 40)]) });
    }

    function autoGrowObsFinal(textarea) {
      if (!textarea) return;
      textarea.style.height = '54px';
      textarea.style.height = Math.max(54, textarea.scrollHeight) + 'px';
    }

    async function saveAllAlumnoFinalObservations(button, planId) {
      const plan = getPlanById(planId);
      if (!plan) throw new Error('PlaneaciÃ³n no encontrada.');
      const entry = getPlaneacionEntryByKey(getPlaneacionEntryKey(plan));
      const payloads = collectPendingAlumnoFinalObservations(planId, plan, entry);
      if (!payloads.length) throw new Error('Escribe al menos una observaciÃ³n final.');

      await handleAction('guardarObsAlumnoFinalLote', async () => {
        await persistAlumnoFinalObservationBatch(planId, payloads);
        await refreshSinglePlaneacionSurface(planId, {
          snapshotKind: 'obs_final_lote'
        });
        payloads.forEach((row) => {
          const input = $('obs-final-' + (row.planId || planId) + '-' + row.alumnoId);
          if (input) autoGrowObsFinal(input);
        });
        setBanner('Observaciones finales guardadas.', 'success');
      }, { button, key: buildActionKey('guardarObsAlumnoFinalLote', [planId, payloads.map((row) => row.alumnoId + ':' + row.nota.slice(0, 20)).join('|')]) });
    }

    async function editPlan(button, planId) {
      let plan = null;
      await handleAction('editPlanLoad', async () => {
        const result = await Promise.all([
          ensurePlaneacionDetailLoaded(planId, { silent: true }),
          ensurePlaneacionesCatalogosAvailable({ render: false, scope: 'editor' }).catch(() => state.catalogos)
        ]);
        plan = result[0];
      }, {
        button,
        key: buildActionKey('editPlanLoad', [planId]),
        busyText: 'Abriendo...'
      });
      if (!plan) throw new Error('PlaneaciÃ³n no encontrada.');
      loadPlanIntoEditor(plan);
      activateTab('planeaciones');
    }

    function buildOpenPlanSaveRequest(plan, draft) {
      const fallbackDate = toYmdFrontend_((getWeekById(plan.semana_id) || {}).fecha_inicio || '');
      const semana = getWeekByDateOrDraft(draft.fecha_planeacion || fallbackDate);
      if (!semana) throw new Error('Selecciona una fecha vÃ¡lida.');
      const materiaId = String((draft && draft.materia_id) || (plan && plan.materia_id) || '').trim();
      if (!materiaId) throw new Error('Selecciona una materia.');
      const submateriaId = String((draft && draft.submateria_id) || '').trim();
      if (materiaRequiresPlanSubmateria(materiaId) && !submateriaId) {
        throw new Error('Selecciona una submateria.');
      }
      const alumnosIds = Array.from(new Set(draft.alumnos_ids || []));
      if (!alumnosIds.length) throw new Error('Selecciona al menos un alumno.');
      const actividades = (draft.activities || [])
        .map((activity) => ({
          actividad_id: activity.actividad_id || '',
          texto: String(activity.texto || '').trim(),
          material_en_carpeta: activity.material_en_carpeta || 'no_requiere',
          realizada: activity.realizada || '',
          comentario_cierre: String(activity.comentario_cierre || '').trim(),
          last_known_updated_at: activity.last_known_updated_at || ''
        }))
        .filter((activity) => activity.texto);
      if (!actividades.length) throw new Error('Captura al menos una actividad.');
      return {
        fallbackDate,
        semana,
        materiaId,
        submateriaId,
        alumnosIds,
        actividades
      };
    }

    function normalizeIdList(values) {
      return Array.from(new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))).sort();
    }

    function shouldUseLightOpenPlanSave(plan, draft, request) {
      if (!plan || !draft || !request) return false;
      const targetSemanaId = String((request.semana && request.semana.semana_id) || '').trim();
      const currentSemanaId = String(plan.semana_id || '').trim();
      const targetMateriaId = String(request.materiaId || '').trim();
      const currentMateriaId = String(plan.materia_id || '').trim();
      const targetSubmateriaId = String(request.submateriaId || '').trim();
      const currentSubmateriaId = String(plan.submateria_id || '').trim();
      if (!targetSemanaId || targetSemanaId !== currentSemanaId) return false;
      if (targetMateriaId !== currentMateriaId) return false;
      if (targetSubmateriaId !== currentSubmateriaId) return false;
      const currentAlumnoIds = normalizeIdList(
        Array.isArray(plan.alumnos) && plan.alumnos.length
          ? plan.alumnos.map((row) => row && row.alumno_id)
          : (Array.isArray(draft.original_alumnos_ids) ? draft.original_alumnos_ids : [])
      );
      const nextAlumnoIds = normalizeIdList(request.alumnosIds);
      if (!currentAlumnoIds.length) return false;
      return JSON.stringify(currentAlumnoIds) === JSON.stringify(nextAlumnoIds);
    }

    function isFullSaveRequiredError(error) {
      return !!(error && error.code === 'FULL_SAVE_REQUIRED');
    }

    async function persistOpenPlanDraft(button, planId, draft, options = {}) {
      const plan = getPlanById(planId);
      if (!plan || !draft) throw new Error('PlaneaciÃ³n no encontrada.');
      const request = buildOpenPlanSaveRequest(plan, draft);
      const successMessage = options.successMessage || 'PlaneaciÃ³n actualizada.';
      const actionLabel = options.actionLabel || 'guardarPlaneacionCompletaInline';
      const actionKey = options.actionKey || buildActionKey(actionLabel, [planId, request.fallbackDate, request.alumnosIds.join(',')]);
      await handleAction(actionLabel, async () => {
        const response = await persistOpenPlanDraftApi(planId, draft, plan, request);
        const updatedPlan = response && response.planeacion ? response.planeacion : null;
        if (!shouldRefetchPlaneacionesAfterPlanSave(plan, updatedPlan)) {
          applySavedPlaneacionDetail(planId, updatedPlan);
          persistCurrentBootSnapshot(options.snapshotKind || 'planeacion_inline_save');
          renderPlaneacionesSurface({
            includeStats: true,
            includePlaneaciones: true,
            includeAlertas: false
          });
          refreshPlaneacionesAlertsDeferred({
            force: !!options.forceAlertas
          });
        } else {
          state.openPlanId = planId;
          state.openPlanDraft = null;
          await refreshPlaneacionesSurface();
          if (options.forceAlertas) {
            refreshPlaneacionesAlertsDeferred({
              force: true,
              includeStats: false,
              includePlaneaciones: false
            }).catch(() => {});
          }
        }
        setBanner(successMessage, 'success');
      }, {
        button,
        key: actionKey,
        busyText: options.busyText || button && button.textContent || 'Guardando...'
      });
    }

    async function saveOpenPlan(button, planId) {
      const plan = getPlanById(planId);
      const draft = getOpenPlanDraft(plan);
      await persistOpenPlanDraft(button, planId, draft, {
        successMessage: 'PlaneaciÃ³n actualizada.',
        actionLabel: 'guardarPlaneacionCompletaInline',
        forceAlertas: planDraftAffectsMaterialAlerts(draft)
      });
    }

    async function saveMultiGroupShared(button, entryKey) {
      const entry = getPlaneacionEntryByKey(entryKey);
      if (!entry || !entry.isMulti) throw new Error('PlaneaciÃ³n multigrupo no encontrada.');
      const draft = getMultiGroupSharedDraft(entry);
      await handleAction('guardarPlaneacionMultigrupo', async () => {
        await persistMultiGroupSharedApi(entry, draft);
        state.multiGroupSharedDrafts[entryKey] = null;
        state.openPlanDraft = null;
        await refreshPlaneacionesSurface();
        setBanner('Base multigrupo actualizada.', 'success');
      }, {
        button,
        key: buildActionKey('guardarPlaneacionMultigrupo', [
          entryKey,
          String((draft && draft.fecha_planeacion) || ''),
          ((draft && draft.activities) || []).map((activity) => [
            String((activity && activity.texto) || '').trim(),
            normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere'),
            normalizeRealizadaStatus((activity && activity.realizada) || ''),
            String((activity && activity.comentario_cierre) || '').trim()
          ].join(':')).join('|')
        ]),
        busyText: 'Guardando lote...'
      });
    }

    function getPendingGeneralObservationText(planId) {
      const normalizedPlanId = String(planId || '').trim();
      const input = $('obs-general-' + normalizedPlanId);
      const inputValue = input ? String(input.value || '').trim() : '';
      if (inputValue) return inputValue;
      if (state.openPlanDraft && String(state.openPlanDraft.planId || '').trim() === normalizedPlanId) {
        const draftValue = String(state.openPlanDraft.generalObservationText || '').trim();
        if (draftValue) return draftValue;
      }
      const currentPlan = getPlanById(normalizedPlanId);
      return currentPlan ? String(currentPlan._draft_general_observation_text || '').trim() : '';
    }

    function collectPendingAlumnoFinalObservations(planId, plan, entry) {
      const normalizedPlanId = String(planId || '').trim();
      const draftMap = state.openPlanDraft && String(state.openPlanDraft.planId || '').trim() === normalizedPlanId
        ? (state.openPlanDraft.finalObservationsByKey || {})
        : {};
      const planDraftMap = Object.assign({}, ((plan || getPlanById(normalizedPlanId) || {})._draft_final_observations_by_key || {}));
      const targetEntry = entry && entry.isMulti ? entry : null;
      const alumnosRows = targetEntry
        ? getPlaneacionEntryAlumnoRows(targetEntry)
        : (Array.isArray((plan || getPlanById(normalizedPlanId) || {}).alumnos) ? (plan || getPlanById(normalizedPlanId)).alumnos : []);
      if (!alumnosRows.length) return [];
      return alumnosRows.map((alumnoRow) => {
        const alumnoId = alumnoRow.alumno_id;
        const targetPlanId = String(alumnoRow.planeacion_id || normalizedPlanId);
        const input = $('obs-final-' + targetPlanId + '-' + alumnoId);
        const inputValue = input ? String(input.value || '').trim() : '';
        const fallbackValue =
          String(draftMap[targetPlanId + '::' + alumnoId] || '').trim() ||
          String(draftMap[alumnoId] || '').trim() ||
          String(planDraftMap[targetPlanId + '::' + alumnoId] || '').trim() ||
          String(planDraftMap[alumnoId] || '').trim();
        const nota = inputValue || fallbackValue;
        return { planId: targetPlanId, alumnoId, nota };
      }).filter((row) => row.nota);
    }

    function collectStoredAlumnoFinalObservations(planId, plan, entry) {
      const normalizedPlanId = String(planId || '').trim();
      const currentPlan = plan || getPlanById(normalizedPlanId);
      const draftMap = state.openPlanDraft && String(state.openPlanDraft.planId || '').trim() === normalizedPlanId
        ? (state.openPlanDraft.finalObservationsByKey || {})
        : {};
      const planDraftMap = Object.assign({}, ((currentPlan || {})._draft_final_observations_by_key || {}));
      const targetEntry = entry && entry.isMulti ? entry : null;
      const alumnosRows = targetEntry
        ? getPlaneacionEntryAlumnoRows(targetEntry)
        : (Array.isArray((currentPlan || {}).alumnos) ? currentPlan.alumnos : []);
      if (!alumnosRows.length) return [];
      return alumnosRows.map((alumnoRow) => {
        const alumnoId = String((alumnoRow && alumnoRow.alumno_id) || '').trim();
        const targetPlanId = String((alumnoRow && (alumnoRow.planeacion_id || normalizedPlanId)) || '').trim();
        const nota =
          String(draftMap[targetPlanId + '::' + alumnoId] || '').trim() ||
          String(draftMap[alumnoId] || '').trim() ||
          String(planDraftMap[targetPlanId + '::' + alumnoId] || '').trim() ||
          String(planDraftMap[alumnoId] || '').trim();
        if (!alumnoId || !nota) return null;
        return {
          planId: targetPlanId || normalizedPlanId,
          alumnoId,
          nota
        };
      }).filter(Boolean);
    }

    async function persistGeneralObservation(planId, texto) {
      await api('crearObsSemana', {
        planeacion_id: planId,
        texto,
        request_id: uid('OSG')
      });
    }

    async function persistAlumnoFinalObservation(planId, alumnoId, nota) {
      await api('guardarObsAlumnoFinal', {
        planeacion_id: planId,
        alumno_id: alumnoId,
        nota,
        request_id: uid('OAF')
      });
    }

    async function persistAlumnoFinalObservationBatch(planId, payloads) {
      await api('guardarObsAlumnoFinalLote', {
        items: payloads.map((row) => ({
          planeacion_id: row.planId || planId,
          alumno_id: row.alumnoId,
          nota: row.nota
        })),
        request_id: uid('OAFL')
      });
    }

    function clearPendingPlanSaveTransaction(planId) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId || !state.ui || !state.ui.pendingPlanSaveTransactions) return;
      delete state.ui.pendingPlanSaveTransactions[normalizedPlanId];
    }

    function buildPlanSaveTransactionFingerprint(config = {}) {
      return JSON.stringify({
        planId: String(config.planId || '').trim(),
        generalText: String(config.generalText || '').trim(),
        finalPayloads: (config.finalPayloads || []).map((row) => ({
          planId: String((row && row.planId) || '').trim(),
          alumnoId: String((row && row.alumnoId) || '').trim(),
          nota: String((row && row.nota) || '').trim()
        })),
        planSaveAction: String(config.planSaveAction || '').trim(),
        planSavePayload: config.planSavePayload
          ? Object.assign({}, config.planSavePayload, { request_id: '' })
          : null
      });
    }

    function buildPlanSaveTransactionBundle(config = {}) {
      const normalizedPlanId = String(config.planId || '').trim();
      if (!normalizedPlanId) throw new Error('PlaneaciÃ³n no encontrada.');
      if (!state.ui) state.ui = {};
      if (!state.ui.pendingPlanSaveTransactions) state.ui.pendingPlanSaveTransactions = {};
      const fingerprint = buildPlanSaveTransactionFingerprint(config);
      const existing = state.ui.pendingPlanSaveTransactions[normalizedPlanId];
      if (existing && existing.fingerprint === fingerprint && existing.bundle) {
        return cloneJsonSafe(existing.bundle, existing.bundle) || existing.bundle;
      }
      const rootRequestId = uid('PLASAVE');
      const bundle = {
        planeacion_id: normalizedPlanId,
        request_id: rootRequestId,
        general_observation: String(config.generalText || '').trim()
          ? {
              planeacion_id: normalizedPlanId,
              texto: String(config.generalText || '').trim(),
              request_id: rootRequestId + ':obsg'
            }
          : null,
        final_observation_batch: Array.isArray(config.finalPayloads) && config.finalPayloads.length
          ? {
              items: config.finalPayloads.map((row) => ({
                planeacion_id: row.planId || normalizedPlanId,
                alumno_id: row.alumnoId,
                nota: row.nota
              })),
              request_id: rootRequestId + ':obsf'
            }
          : null,
        plan_save_action: String(config.planSaveAction || '').trim() || '',
        plan_save: config.planSavePayload
          ? Object.assign({}, config.planSavePayload, {
              request_id: rootRequestId + ':plan'
            })
          : null
      };
      state.ui.pendingPlanSaveTransactions[normalizedPlanId] = {
        fingerprint,
        bundle
      };
      return cloneJsonSafe(bundle, bundle) || bundle;
    }

    function buildOpenPlanDraftWithPendingObservations(draft, generalText, finalPayloads) {
      if (!draft || typeof draft !== 'object') return draft;
      const nextDraft = cloneJsonSafe(draft, draft) || draft;
      const trimmedGeneral = String(generalText || '').trim();
      if (trimmedGeneral) {
        nextDraft.generalObservationText = trimmedGeneral;
      }
      if (!nextDraft.finalObservationsByKey || typeof nextDraft.finalObservationsByKey !== 'object') {
        nextDraft.finalObservationsByKey = {};
      }
      (Array.isArray(finalPayloads) ? finalPayloads : []).forEach((row) => {
        const alumnoId = String((row && row.alumnoId) || '').trim();
        const targetPlanId = String((row && (row.planId || nextDraft.planId)) || '').trim();
        const nota = String((row && row.nota) || '').trim();
        if (!alumnoId || !nota) return;
        nextDraft.finalObservationsByKey[alumnoId] = nota;
        if (targetPlanId) {
          nextDraft.finalObservationsByKey[targetPlanId + '::' + alumnoId] = nota;
        }
      });
      return nextDraft;
    }

    async function persistPlanChangesCompositeApi(bundle) {
      return await api('guardarCambiosPlaneacion', bundle);
    }

    function buildPlaneacionOutboxItem(kind, payload = {}) {
      const createdAt = new Date().toISOString();
      return Object.assign({
        id: uid('PLOUT'),
        kind: String(kind || '').trim(),
        ownerKey: getPlaneacionOutboxOwnerKey(),
        mergeKey: '',
        status: 'pending',
        retryable: true,
        attempts: 0,
        created_at: createdAt,
        updated_at: createdAt,
        nextAttemptAt: ''
      }, payload);
    }

    function markPlaneacionOutboxItem(itemId, patch = {}) {
      const normalizedId = String(itemId || '').trim();
      if (!normalizedId) return null;
      let updatedItem = null;
      const items = (state.planeacionOutbox || []).map((item) => {
        if (!item || String(item.id || '').trim() !== normalizedId) return item;
        updatedItem = Object.assign({}, item, patch, {
          updated_at: new Date().toISOString()
        });
        return updatedItem;
      });
      setPlaneacionOutboxItems(items);
      return updatedItem;
    }

    function removePlaneacionOutboxItem(itemId) {
      const normalizedId = String(itemId || '').trim();
      if (!normalizedId) return;
      const items = (state.planeacionOutbox || []).filter((item) => String((item && item.id) || '').trim() !== normalizedId);
      setPlaneacionOutboxItems(items);
    }

    function enqueuePlaneacionOutboxItem(item) {
      if (!item || !item.id) return null;
      const nextItem = Object.assign({}, item, {
        ownerKey: item.ownerKey || getPlaneacionOutboxOwnerKey(),
        updated_at: new Date().toISOString()
      });
      const items = Array.isArray(state.planeacionOutbox) ? state.planeacionOutbox.slice() : [];
      const mergeKey = String(nextItem.mergeKey || '').trim();
      const existingIndex = mergeKey
        ? items.findIndex((row) => row && row.mergeKey === mergeKey && String(row.status || '').trim() !== 'syncing')
        : -1;
      if (existingIndex >= 0) {
        items.splice(existingIndex, 1, nextItem);
      } else {
        items.push(nextItem);
      }
      setPlaneacionOutboxItems(items);
      applyPlaneacionOutboxVisualState(nextItem);
      persistCurrentBootSnapshot('planeacion_outbox_enqueue');
      schedulePlaneacionOutboxProcessing(90);
      return nextItem;
    }

    function clearPlaneacionOutboxRetryTimer() {
      if (!state.ui || !state.ui.planeacionOutboxRetryTimer) return;
      window.clearTimeout(state.ui.planeacionOutboxRetryTimer);
      state.ui.planeacionOutboxRetryTimer = null;
    }

    function getNextPlaneacionOutboxItem() {
      const now = Date.now();
      return (state.planeacionOutbox || []).find((item) => {
        if (!item || !item.id) return false;
        const status = String(item.status || '').trim();
        if (status === 'pending') return true;
        if (status !== 'error' || item.retryable === false) return false;
        if (!item.nextAttemptAt) return true;
        const retryAt = Date.parse(item.nextAttemptAt);
        return Number.isFinite(retryAt) && retryAt <= now;
      }) || null;
    }

    function isPlaneacionOutboxRetryableError(error) {
      const code = String((error && error.code) || '').trim().toUpperCase();
      if (!code) return true;
      return ![
        'VALIDATION_ERROR',
        'FULL_SAVE_REQUIRED',
        'NOT_FOUND',
        'NO_ACCESS',
        'FORBIDDEN',
        'CONFLICT',
        'DUPLICATE'
      ].includes(code);
    }

    function schedulePlaneacionOutboxProcessing(delay = 120) {
      if (!isPlaneacionOutboxEnabled() || !Array.isArray(state.planeacionOutbox) || !state.planeacionOutbox.length) return;
      clearPlaneacionOutboxRetryTimer();
      if (!state.ui) return;
      state.ui.planeacionOutboxRetryTimer = window.setTimeout(() => {
        state.ui.planeacionOutboxRetryTimer = null;
        processPlaneacionOutboxQueue().catch(() => {});
      }, Math.max(40, Number(delay || 0)));
    }

    async function performOpenPlanSaveRequest(action, payload) {
      try {
        return await api(action, payload);
      } catch (error) {
        if (String(action || '').trim() === 'guardarPlaneacionLigera' && isFullSaveRequiredError(error)) {
          return await api('guardarPlaneacionCompleta', payload);
        }
        throw error;
      }
    }

    async function processPlaneacionOutboxEditorCreate(item) {
      const responseData = await api(item.requestAction || 'crearPlaneacion', item.requestPayload || {});
      const createdPlans = Array.isArray(responseData && responseData.planeaciones)
        ? responseData.planeaciones.filter((plan) => plan && plan.planeacion_id)
        : [];
      if (Array.isArray(item.tempPlanIds) && item.tempPlanIds.length) {
        removePlaneacionRows(item.tempPlanIds);
      }
      if (createdPlans.length) {
        const appliedPlans = upsertPlaneacionesRows(createdPlans.map((plan) => Object.assign({}, plan, {
          _local_save_state: 'saved',
          _local_save_message: 'Planeación sincronizada.'
        })));
        if (item.forceAlertas) injectLocalMaterialAlerts(appliedPlans);
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
        persistCurrentBootSnapshot('planeacion_outbox_create_synced');
        scheduleClearLocalPlaneacionFeedback(appliedPlans.map((plan) => plan.planeacion_id));
        refreshPlaneacionesAlertsDeferred({
          force: !!item.forceAlertas
        }).catch(() => {});
        if (appliedPlans[0] && appliedPlans[0].planeacion_id) {
          focusPlaneacionCardSoon(appliedPlans[0].planeacion_id);
        }
      }
    }

    async function processPlaneacionOutboxEditorEdit(item) {
      const responseData = await api(item.requestAction || 'guardarPlaneacionCompleta', item.requestPayload || {});
      const previousPlan = item.previousPlanSnapshot || getPlanById(item.planId);
      const updatedPlan = responseData && responseData.planeacion
        ? Object.assign({}, previousPlan || {}, responseData.planeacion)
        : null;
      if (updatedPlan && !shouldRefetchPlaneacionesAfterPlanSave(previousPlan, updatedPlan)) {
        upsertPlaneacionRow(Object.assign({}, updatedPlan, {
          _local_save_state: 'saved',
          _local_save_message: 'Planeación sincronizada.'
        }));
        if (state.openPlanId === updatedPlan.planeacion_id) {
          state.openPlanDraft = buildOpenPlanDraft(getPlanById(updatedPlan.planeacion_id) || updatedPlan);
        }
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
        persistCurrentBootSnapshot('planeacion_outbox_edit_synced');
        scheduleClearLocalPlaneacionFeedback(updatedPlan.planeacion_id);
        refreshPlaneacionesAlertsDeferred({
          force: !!item.forceAlertas
        }).catch(() => {});
        return;
      }
      await refreshPlaneacionesSurface({ includeAlertas: false });
      refreshPlaneacionesAlertsDeferred({
        force: !!item.forceAlertas,
        includeStats: false,
        includePlaneaciones: false
      }).catch(() => {});
    }

    async function processPlaneacionOutboxOpenSave(item) {
      const combinedRequest = item.combinedRequest && typeof item.combinedRequest === 'object'
        ? item.combinedRequest
        : null;
      let savedPlanResponse = null;
      if (combinedRequest) {
        const compositeResponse = await persistPlanChangesCompositeApi(combinedRequest);
        savedPlanResponse = compositeResponse && compositeResponse.plan_save
          ? compositeResponse.plan_save
          : (compositeResponse && compositeResponse.planeacion ? { planeacion: compositeResponse.planeacion } : null);
      } else {
        const requests = item.requests && typeof item.requests === 'object' ? item.requests : {};
        if (requests.generalObservation) {
          await api('crearObsSemana', requests.generalObservation);
        }
        if (requests.finalObservationBatch) {
          await api('guardarObsAlumnoFinalLote', requests.finalObservationBatch);
        }
        if (requests.planSave) {
          savedPlanResponse = await performOpenPlanSaveRequest(item.planSaveAction || 'guardarPlaneacionCompleta', requests.planSave);
        }
      }
      const previousPlan = item.previousPlanSnapshot || getPlanById(item.planId);
      const updatedPlan = savedPlanResponse && savedPlanResponse.planeacion
        ? Object.assign({}, previousPlan || {}, savedPlanResponse.planeacion)
        : null;
      const outboxGeneralText = combinedRequest && combinedRequest.general_observation
        ? String((combinedRequest.general_observation && combinedRequest.general_observation.texto) || '').trim()
        : String((((item.requests || {}).generalObservation || {}).texto) || '').trim();
      const outboxFinalPayloads = combinedRequest && combinedRequest.final_observation_batch && Array.isArray(combinedRequest.final_observation_batch.items)
        ? combinedRequest.final_observation_batch.items.map((row) => ({
            planId: String((row && row.planeacion_id) || item.planId || '').trim(),
            alumnoId: String((row && row.alumno_id) || '').trim(),
            nota: String((row && row.nota) || '').trim()
          })).filter((row) => row.alumnoId && row.nota)
        : (Array.isArray((((item.requests || {}).finalObservationBatch || {}).items))
            ? (((item.requests || {}).finalObservationBatch || {}).items).map((row) => ({
                planId: String((row && row.planeacion_id) || item.planId || '').trim(),
                alumnoId: String((row && row.alumno_id) || '').trim(),
                nota: String((row && row.nota) || '').trim()
              })).filter((row) => row.alumnoId && row.nota)
            : []);
      const planWithSavedObservations = mergeSavedObservationPreview(updatedPlan || previousPlan, outboxGeneralText, outboxFinalPayloads);
      const inlineSavedPreview = buildInlineSavedPlaneacionPreview(
        previousPlan,
        item.optimisticPlan || null,
        planWithSavedObservations,
        {
          localState: 'saved',
          localMessage: 'Cambios sincronizados.'
        }
      );
      clearPendingPlanSaveTransaction(item.planId);
      const canPatchSimplePlanLocally = !!(item.shouldSavePlan && !item.shouldSaveShared && updatedPlan);
      if (canPatchSimplePlanLocally && !shouldRefetchPlaneacionesAfterPlanSave(previousPlan, updatedPlan)) {
        applySavedPlaneacionDetail(item.planId, inlineSavedPreview || Object.assign({}, planWithSavedObservations, {
          _local_save_state: 'saved',
          _local_save_message: 'Cambios sincronizados.'
        }));
        persistCurrentBootSnapshot('planeacion_outbox_open_save_local');
        renderPlaneacionesList();
        restorePendingPlanObservationInputs(item.planId, outboxGeneralText, outboxFinalPayloads);
        scheduleClearLocalPlaneacionFeedback(item.planId);
        if (item.shouldSavePlan) {
          queuePlaneacionPostSaveSync(item.planId, {
            refreshDetail: false,
            refreshObservaciones: false,
            refreshAlertas: !!item.shouldRefreshMaterialAlertas
          });
        }
        refreshPlaneacionesAlertsDeferred({
          force: !!item.shouldForceAlertasAfterSave
        }).catch(() => {});
        return;
      }
      if (!item.shouldSavePlan && !item.shouldSaveShared) {
        applySavedPlaneacionDetail(item.planId, Object.assign({}, planWithSavedObservations, {
          _local_save_state: 'saved',
          _local_save_message: 'Cambios sincronizados.'
        }));
        persistCurrentBootSnapshot('planeacion_outbox_open_obs_local');
        renderPlaneacionesList();
        restorePendingPlanObservationInputs(item.planId, outboxGeneralText, outboxFinalPayloads);
        scheduleClearLocalPlaneacionFeedback(item.planId);
        queuePlaneacionPostSaveSync(item.planId, {
          refreshDetail: true,
          refreshObservaciones: true,
          refreshAlertas: false,
          snapshotKind: 'planeacion_outbox_open_obs'
        });
        return;
      }
      state.openPlanId = item.shouldSavePlan ? item.planId : state.openPlanId;
      if (state.openPlanId !== item.planId) state.openPlanDraft = null;
      await refreshPlaneacionesSurface({ includeAlertas: false });
      refreshPlaneacionesAlertsDeferred({
        force: !!item.shouldForceAlertasAfterSave,
        includeStats: false,
        includePlaneaciones: false
      }).catch(() => {});
    }

    function handlePlaneacionOutboxFailure(item, error) {
      const retryable = isPlaneacionOutboxRetryableError(error);
      const attempts = Number(item && item.attempts || 0) + 1;
      const nextDelay = retryable ? Math.min(30000, 1200 * attempts) : 0;
      const updatedItem = markPlaneacionOutboxItem(item.id, {
        status: 'error',
        retryable,
        attempts,
        lastErrorCode: String((error && error.code) || '').trim(),
        lastErrorMessage: formatApiError(error),
        nextAttemptAt: retryable ? new Date(Date.now() + nextDelay).toISOString() : ''
      });
      if (updatedItem) {
        applyPlaneacionOutboxVisualState(updatedItem);
        persistCurrentBootSnapshot('planeacion_outbox_error');
      }
      const shouldNotifyUser = shouldExposePlaneacionOutboxIssue(updatedItem || Object.assign({}, item, {
        retryable,
        attempts,
        lastErrorCode: String((error && error.code) || '').trim()
      }));
      if (retryable && shouldNotifyUser) {
        setBanner(
          String((error && error.code) || '').trim() === 'INVALID_SESSION'
            ? 'Hay cambios guardados localmente pendientes de sincronizar. Vuelve a iniciar sesiÃ³n.'
            : 'Hay cambios guardados localmente pendientes de sincronizar. Seguiremos intentando.',
          'info'
        );
      } else if (!retryable) {
        setBanner(formatApiError(error), 'error');
      }
      if (shouldNotifyUser) {
        renderPlaneacionesSurface({
          includeStats: true,
          includePlaneaciones: true,
          includeAlertas: false
        });
      }
      if (retryable) schedulePlaneacionOutboxProcessing(nextDelay + 120);
      else schedulePlaneacionOutboxProcessing(120);
    }

    async function processPlaneacionOutboxQueue() {
      if (!isPlaneacionOutboxEnabled() || !state.ui || state.ui.planeacionOutboxProcessing) return;
      const item = getNextPlaneacionOutboxItem();
      if (!item) return;
      state.ui.planeacionOutboxProcessing = true;
      const syncingItem = markPlaneacionOutboxItem(item.id, {
        status: 'syncing',
        nextAttemptAt: ''
      }) || item;
      applyPlaneacionOutboxVisualState(syncingItem);
      try {
        if (syncingItem.kind === 'editor_create') {
          await processPlaneacionOutboxEditorCreate(syncingItem);
        } else if (syncingItem.kind === 'editor_edit') {
          await processPlaneacionOutboxEditorEdit(syncingItem);
        } else if (syncingItem.kind === 'open_save') {
          await processPlaneacionOutboxOpenSave(syncingItem);
        }
        removePlaneacionOutboxItem(syncingItem.id);
        schedulePlaneacionOutboxProcessing(80);
      } catch (error) {
        handlePlaneacionOutboxFailure(syncingItem, error);
      } finally {
        state.ui.planeacionOutboxProcessing = false;
      }
    }

    function syncInlineSavedPlanDraft(planId, updatedPlan, options = {}) {
      if (!updatedPlan || !state.openPlanDraft || state.openPlanDraft.planId !== planId) return;
      state.openPlanDraft.lastKnownUpdatedAt = updatedPlan.fecha_actualizacion || state.openPlanDraft.lastKnownUpdatedAt || '';
      state.openPlanDraft.lastKnownActivitiesVersion = updatedPlan.actividades_version_actual || state.openPlanDraft.lastKnownActivitiesVersion || '';
      const activityIds = Array.isArray(options.activityIds) ? options.activityIds.filter(Boolean) : [];
      if (!activityIds.length || !Array.isArray(state.openPlanDraft.activities)) return;
      activityIds.forEach((activityId) => {
        const draftActivity = state.openPlanDraft.activities.find((item) => item.actividad_id === activityId);
        const freshActivity = Array.isArray(updatedPlan.actividades)
          ? updatedPlan.actividades.find((item) => item.actividad_id === activityId)
          : null;
        if (!draftActivity || !freshActivity) return;
        draftActivity.realizada = normalizeRealizadaStatus(freshActivity.realizada);
        draftActivity.material_en_carpeta = normalizeMaterialStatus(freshActivity.material_en_carpeta);
        draftActivity.comentario_cierre = freshActivity.comentario_cierre || '';
        draftActivity.last_known_updated_at = freshActivity.fecha_actualizacion || draftActivity.last_known_updated_at || '';
      });
    }

    async function refreshSinglePlaneacionSurface(planId, options = {}) {
      const normalizedPlanId = String(planId || '').trim();
      if (!normalizedPlanId) throw new Error('PlaneaciÃ³n no encontrada.');
      const updatedPlan = await fetchPlaneacionDetalle(normalizedPlanId);
      if (!updatedPlan || !updatedPlan.planeacion_id) throw new Error('No se pudo recargar la planeaciÃ³n.');
      upsertPlaneacionRow(updatedPlan);
      syncInlineSavedPlanDraft(normalizedPlanId, updatedPlan, options);
      persistCurrentBootSnapshot(options.snapshotKind || 'planeacion_inline_save');
      renderPlaneacionesSurface({
        includeStats: options.includeStats === true,
        includePlaneaciones: true,
        includeAlertas: options.includeAlertas === true
      });
      return updatedPlan;
    }

    function refreshPlaneacionesAlertsDeferred(options = {}) {
      const includeStats = options.includeStats === true;
      const includePlaneaciones = options.includePlaneaciones === true;
      const delay = Number(options.delay || 140);
      if (!options.force && shouldReuseFacilitadorFeedSnapshot('alertas')) {
        renderPlaneacionesSurface({
          includeStats,
          includePlaneaciones,
          includeAlertas: true
        });
        return Promise.resolve();
      }
      if (!options.force && state.ui && state.ui.deferredPlaneacionesAlertRefreshPromise) {
        return state.ui.deferredPlaneacionesAlertRefreshPromise;
      }
      if (options.force) {
        const immediateTask = (async () => {
          try {
            await refreshAlertas({ force: true });
            renderPlaneacionesSurface({
              includeStats,
              includePlaneaciones,
              includeAlertas: true
            });
          } finally {
            if (state.ui) state.ui.deferredPlaneacionesAlertRefreshPromise = null;
          }
        })();
        if (state.ui) state.ui.deferredPlaneacionesAlertRefreshPromise = immediateTask;
        return immediateTask;
      }
      const task = scheduleAfterPaint(async () => {
        try {
          await refreshAlertas({ force: !!options.force });
          renderPlaneacionesSurface({
            includeStats,
            includePlaneaciones,
            includeAlertas: true
          });
        } finally {
          if (state.ui) state.ui.deferredPlaneacionesAlertRefreshPromise = null;
        }
      }, delay);
      if (state.ui) state.ui.deferredPlaneacionesAlertRefreshPromise = task;
      return task;
    }

    function planDraftAffectsMaterialAlerts(draftLike) {
      return !!(
        draftLike &&
        Array.isArray(draftLike.activities) &&
        draftLike.activities.some((activity) => {
          const status = normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere');
          return status === 'no_listo' || status === 'listo';
        })
      );
    }

    function didOpenPlanMaterialStateChange(plan, request) {
      if (!plan || !request) return true;
      const currentActivities = Array.isArray(plan.actividades) ? plan.actividades : [];
      const nextActivities = Array.isArray(request.actividades) ? request.actividades : [];
      if (!currentActivities.length || currentActivities.length !== nextActivities.length) return true;
      const currentMaterialConfirmado = String(plan.material_confirmado || '').trim().toLowerCase() === 'si';
      const nextMaterialConfirmado = nextActivities.every((activity) =>
        normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere') !== 'no_listo'
      );
      if (currentMaterialConfirmado !== nextMaterialConfirmado) return true;
      return currentActivities.some((activity, index) => {
        const currentStatus = normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere');
        const nextStatus = normalizeMaterialStatus((nextActivities[index] && nextActivities[index].material_en_carpeta) || 'no_requiere');
        return currentStatus !== nextStatus;
      });
    }

    function didOpenPlanActivityProgressChange(plan, request) {
      if (!plan || !request) return true;
      const currentActivities = Array.isArray(plan.actividades) ? plan.actividades : [];
      const nextActivities = Array.isArray(request.actividades) ? request.actividades : [];
      if (!currentActivities.length || currentActivities.length !== nextActivities.length) return true;
      return currentActivities.some((activity, index) => {
        const nextActivity = nextActivities[index] || {};
        return normalizeRealizadaStatus((activity && activity.realizada) || '') !== normalizeRealizadaStatus(nextActivity.realizada || '') ||
          normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere') !== normalizeMaterialStatus(nextActivity.material_en_carpeta || 'no_requiere') ||
          String((activity && activity.comentario_cierre) || '').trim() !== String(nextActivity.comentario_cierre || '').trim();
      });
    }

    async function persistOpenPlanDraftApi(planId, draft, providedPlan, providedRequest) {
      const plan = providedPlan || getPlanById(planId);
      if (!plan || !draft) throw new Error('PlaneaciÃ³n no encontrada.');
      const request = providedRequest || buildOpenPlanSaveRequest(plan, draft);
      const shouldUseLiteSave = shouldUseLightOpenPlanSave(plan, draft, request);
      const trackingChanged = didOpenPlanActivityProgressChange(plan, request);
      const activitiesUnchanged = shouldUseLiteSave && draft.activitiesDirty !== true && !trackingChanged;
      const activitiesChanged = shouldUseLiteSave && (draft.activitiesDirty === true || trackingChanged);
      const payload = {
        planeacion_id: planId,
        fecha_planeacion: draft.fecha_planeacion || request.fallbackDate,
        semana_id: request.semana.draft ? '' : request.semana.semana_id,
        grupo_id: plan.grupo_id,
        materia_id: request.materiaId,
        submateria_id: request.submateriaId,
        frase_semana: String(draft.frase_semana || '').trim(),
        alumnos_ids: request.alumnosIds,
        actividades: request.actividades,
        activities_unchanged: activitiesUnchanged,
        activities_changed: activitiesChanged,
        last_known_updated_at: draft.lastKnownUpdatedAt || plan.fecha_actualizacion || '',
        last_known_activities_version: draft.lastKnownActivitiesVersion || plan.actividades_version_actual || '',
        skip_material_sync: !didOpenPlanMaterialStateChange(plan, request),
        minimal_response: shouldUseLiteSave,
        request_id: uid('PLAOPEN')
      };
      return await performOpenPlanSaveRequest(
        shouldUseLiteSave ? 'guardarPlaneacionLigera' : 'guardarPlaneacionCompleta',
        payload
      );
    }

    function hasActivePlaneacionesFilters() {
      return !!(
        ($('filterSemana') && $('filterSemana').value) ||
        ($('filterEstado') && $('filterEstado').value) ||
        ($('filterGrupo') && $('filterGrupo').value) ||
        ($('filterFacilitador') && $('filterFacilitador').value) ||
        ($('filterAlumnoId') && $('filterAlumnoId').value) ||
        (state.ui && state.ui.planeacionesMateriaFilter)
      );
    }

    function shouldRefetchPlaneacionesAfterPlanSave(previousPlan, updatedPlan) {
      if (!previousPlan || !updatedPlan) return true;
      if (hasActivePlaneacionesFilters()) return true;
      return ['semana_id', 'grupo_id', 'materia_id', 'submateria_id', 'estado', 'facilitador_id'].some((field) => {
        return String(previousPlan[field] || '') !== String(updatedPlan[field] || '');
      });
    }

    function applySavedPlaneacionDetail(planId, updatedPlan) {
      if (!updatedPlan || !updatedPlan.planeacion_id) return;
      const mergedPlan = upsertPlaneacionRow(updatedPlan) || updatedPlan;
      state.openPlanId = planId;
      state.openPlanDraft = preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(mergedPlan), mergedPlan);
    }

    async function applySavedPlaneacionTransition(planId, updatedPlan, options = {}) {
      if (!updatedPlan || !updatedPlan.planeacion_id) return false;
      upsertPlaneacionRow(updatedPlan);
      if (options.closeOpenCard) {
        state.openPlanId = '';
        state.openPlanDraft = null;
      } else if (state.openPlanId === planId) {
        const refreshedPlan = Object.assign({}, getPlanById(planId) || updatedPlan);
        state.openPlanDraft = preserveOpenPlanDraftLocalNotes(planId, buildOpenPlanDraft(refreshedPlan), refreshedPlan);
      }
      persistCurrentBootSnapshot('planeacion_transition_local');
      await refreshAlertas();
      renderPlaneacionesSurface();
      return true;
    }

    function buildMultiGroupSharedSavePayload(entry, draft) {
      if (!entry || !entry.isMulti) throw new Error('PlaneaciÃ³n multigrupo no encontrada.');
      if (!draft) throw new Error('No se pudo preparar la base multigrupo.');
      const selectedPlan = getOpenPlaneacionEntry(entry) || entry.representative || null;
      const fallbackDate = toYmdFrontend_((getWeekById((selectedPlan || {}).semana_id) || {}).fecha_inicio || '');
      const semana = getWeekByDateOrDraft(draft.fecha_planeacion || fallbackDate);
      if (!semana) throw new Error('Selecciona una fecha vÃ¡lida para el multigrupo.');
      const materiaId = String((draft && draft.materia_id) || (selectedPlan && selectedPlan.materia_id) || '').trim();
      if (!materiaId) throw new Error('Selecciona una materia.');
      const submateriaId = String(((draft && draft.submateria_id) || '')).trim();
      if (materiaRequiresPlanSubmateria(materiaId) && !submateriaId) {
        throw new Error('Selecciona una submateria.');
      }
      const activities = (draft.activities || [])
        .map((activity) => ({
          texto: String((activity && activity.texto) || '').trim(),
          material_en_carpeta: normalizeMaterialStatus((activity && activity.material_en_carpeta) || 'no_requiere'),
          realizada: normalizeRealizadaStatus((activity && activity.realizada) || ''),
          comentario_cierre: String((activity && activity.comentario_cierre) || '').trim()
        }))
        .filter((activity) => activity.texto);
      if (!activities.length) throw new Error('Captura al menos una actividad compartida.');
      return {
        planeacion_lote_id: draft.loteId,
        planeacion_base_id: (selectedPlan && selectedPlan.planeacion_id) || draft.basePlanId,
        fecha_planeacion: draft.fecha_planeacion || fallbackDate,
        semana_id: semana.draft ? '' : semana.semana_id,
        materia_id: materiaId,
        submateria_id: submateriaId,
        frase_semana: String(draft.frase_semana || '').trim(),
        actividades: activities,
        planes: (entry.plans || []).map((plan) => ({
          planeacion_id: plan.planeacion_id,
          last_known_updated_at: plan.fecha_actualizacion || '',
          last_known_activities_version: plan.actividades_version_actual || ''
        })),
        request_id: uid('PLMG')
      };
    }

    async function persistMultiGroupSharedApi(entry, draft) {
      const payload = buildMultiGroupSharedSavePayload(entry, draft);
      await api('guardarPlaneacionMultigrupo', payload);
    }

    async function savePlanChanges(button, planId, entryKey) {
      const plan = getPlanById(planId);
      if (!plan) throw new Error('PlaneaciÃ³n no encontrada.');
      const entry = entryKey ? getPlaneacionEntryByKey(entryKey) : null;
      const planCard = $('plan-card-' + planId);
      const hasPlanEditor = !!(planCard && planCard.querySelector('.plan-open-editor'));
      const hasSharedEditor = !!(planCard && planCard.querySelector('.plan-multigroup-shared'));
      const fallbackGeneralText =
        String(
          (state.openPlanDraft && String(state.openPlanDraft.planId || '').trim() === String(planId || '').trim()
            ? state.openPlanDraft.generalObservationText
            : '') ||
          plan._draft_general_observation_text ||
          ''
        ).trim();
      const generalText = getPendingGeneralObservationText(planId) || fallbackGeneralText;
      const finalPayloads = collectPendingAlumnoFinalObservations(planId, plan, entry);
      if (!finalPayloads.length) {
        finalPayloads.push(...collectStoredAlumnoFinalObservations(planId, plan, entry));
      }
      const currentDraft = hasPlanEditor ? getOpenPlanDraft(plan) : null;
      const planDraft = currentDraft
        ? syncOpenPlanDraftFromVisibleControls(
            syncOpenPlanDraftConcurrencyHints(plan, JSON.parse(JSON.stringify(currentDraft)))
          )
        : null;
      const sharedDraft = hasSharedEditor && entry && entry.isMulti ? JSON.parse(JSON.stringify(getMultiGroupSharedDraft(entry) || null)) : null;
      const shouldSavePlan = !!planDraft;
      const shouldSaveShared = !!(sharedDraft && entry && entry.isMulti);
      const planSaveRequest = shouldSavePlan ? buildOpenPlanSaveRequest(plan, planDraft) : null;
      const shouldPersistOpenPlanActivities = shouldSavePlan
        ? (planDraft.activitiesDirty === true || didOpenPlanActivityProgressChange(plan, planSaveRequest))
        : false;
      const shouldRefreshMaterialAlertas = shouldSavePlan
        ? didOpenPlanMaterialStateChange(plan, planSaveRequest)
        : false;
      const shouldForceAlertasAfterSave =
        (shouldSavePlan && shouldRefreshMaterialAlertas && planDraftAffectsMaterialAlerts(planDraft)) ||
        (shouldSaveShared && planDraftAffectsMaterialAlerts(sharedDraft));
      const previousPlanSnapshot = cloneJsonSafe(plan, plan);
      const canOptimisticallyRender = !shouldSaveShared && !(entry && entry.isMulti);
      const shouldUsePlaneacionOutbox = !canUseAdminShell() && canOptimisticallyRender && !shouldSaveShared && isPlaneacionOutboxEnabled();
      const shouldUseLiteSave = !!(shouldSavePlan && shouldUseLightOpenPlanSave(plan, planDraft, planSaveRequest));
      const outboxDraft = shouldSavePlan
        ? buildOpenPlanDraftWithPendingObservations(planDraft, generalText, finalPayloads)
        : null;
      applyPendingPlanObservationDraft(planId, generalText, finalPayloads);
      const combinedSaveRequest = buildPlanSaveTransactionBundle({
        planId,
        generalText,
        finalPayloads,
        planSaveAction: shouldSavePlan
          ? (shouldUseLiteSave ? 'guardarPlaneacionLigera' : 'guardarPlaneacionCompleta')
          : '',
        planSavePayload: shouldSavePlan ? {
          planeacion_id: planId,
          fecha_planeacion: planDraft.fecha_planeacion || planSaveRequest.fallbackDate,
          semana_id: planSaveRequest.semana.draft ? '' : planSaveRequest.semana.semana_id,
          grupo_id: plan.grupo_id,
          materia_id: planSaveRequest.materiaId,
          submateria_id: planSaveRequest.submateriaId,
          frase_semana: String(planDraft.frase_semana || '').trim(),
          alumnos_ids: planSaveRequest.alumnosIds,
          actividades: planSaveRequest.actividades,
          activities_unchanged: shouldUseLiteSave && !shouldPersistOpenPlanActivities,
          activities_changed: shouldUseLiteSave && shouldPersistOpenPlanActivities,
          last_known_updated_at: planDraft.lastKnownUpdatedAt || plan.fecha_actualizacion || '',
          last_known_activities_version: planDraft.lastKnownActivitiesVersion || plan.actividades_version_actual || '',
          skip_material_sync: !didOpenPlanMaterialStateChange(plan, planSaveRequest),
          minimal_response: shouldUseLiteSave
        } : null
      });
      const optimisticPlan = canOptimisticallyRender
        ? buildOptimisticPlaneacionSavePreview(plan, {
            draft: shouldSavePlan ? planDraft : null,
            generalText,
            finalPayloads,
            localState: 'saving',
            localMessage: shouldUsePlaneacionOutbox
              ? 'Guardado local. Sincronizando...'
              : 'Guardando en segundo plano...'
          })
        : null;
      if (!generalText && !finalPayloads.length && !shouldSavePlan && !shouldSaveShared) {
        throw new Error('No hay cambios para guardar.');
      }

      await handleAction('guardarCambiosPlaneacion', async () => {
        if (optimisticPlan) {
          upsertPlaneacionRow(optimisticPlan);
          state.openPlanId = planId;
          state.openPlanDraft = buildOpenPlanDraft(optimisticPlan);
          persistCurrentBootSnapshot('guardar_cambios_optimistic');
          renderPlaneacionesSurface({
            includeStats: true,
            includePlaneaciones: true,
            includeAlertas: false
          });
        }
        if (shouldUsePlaneacionOutbox) {
          enqueuePlaneacionOutboxItem(buildPlaneacionOutboxItem('open_save', {
            mergeKey: 'plan:' + String(planId || '').trim(),
            planId: String(planId || '').trim(),
            previousPlanSnapshot,
            optimisticPlan,
            draft: outboxDraft,
            shouldSavePlan,
            shouldSaveShared: false,
            shouldRefreshMaterialAlertas,
            shouldForceAlertasAfterSave,
            combinedRequest: combinedSaveRequest,
            localState: 'saving',
            localMessage: 'Guardado local. Sincronizando...',
            planSaveAction: shouldUseLiteSave ? 'guardarPlaneacionLigera' : 'guardarPlaneacionCompleta',
            requests: {
              generalObservation: generalText ? {
                planeacion_id: planId,
                texto: generalText,
                request_id: combinedSaveRequest && combinedSaveRequest.general_observation
                  ? combinedSaveRequest.general_observation.request_id
                  : uid('OSG')
              } : null,
              finalObservationBatch: finalPayloads.length ? {
                items: finalPayloads.map((row) => ({
                  planeacion_id: row.planId || planId,
                  alumno_id: row.alumnoId,
                  nota: row.nota
                })),
                request_id: combinedSaveRequest && combinedSaveRequest.final_observation_batch
                  ? combinedSaveRequest.final_observation_batch.request_id
                  : uid('OAFL')
              } : null,
              planSave: combinedSaveRequest ? combinedSaveRequest.plan_save : null
            }
          }));
          persistCurrentBootSnapshot('guardar_cambios_outbox_local');
          renderPlaneacionesSurface({
            includeStats: true,
            includePlaneaciones: true,
            includeAlertas: false
          });
          restorePendingPlanObservationInputs(planId, generalText, finalPayloads);
          flashButtonLabel(button, 'Guardado');
          return;
        }

        const savedParts = [];
        let savedPlanResponse = null;
        try {
          const compositeResponse = await persistPlanChangesCompositeApi(combinedSaveRequest);
          if (generalText) savedParts.push('observaciÃ³n general');
          if (finalPayloads.length) savedParts.push('observaciones finales');
          if (shouldSavePlan) {
            savedPlanResponse = compositeResponse && compositeResponse.plan_save
              ? compositeResponse.plan_save
              : (compositeResponse && compositeResponse.planeacion ? { planeacion: compositeResponse.planeacion } : null);
            savedParts.push(entry && entry.isMulti ? 'grupo activo' : 'planeaciÃ³n');
          }
          if (shouldSaveShared) {
            const freshEntry = getPlaneacionEntryByKey(entryKey) || entry;
            await persistMultiGroupSharedApi(freshEntry, sharedDraft);
            state.multiGroupSharedDrafts[entryKey] = null;
            state.openPlanDraft = null;
            savedParts.push('base multigrupo');
          }
        } catch (err) {
          if (optimisticPlan && previousPlanSnapshot) {
            upsertPlaneacionRow(previousPlanSnapshot);
            state.openPlanId = planId;
            state.openPlanDraft = buildOpenPlanDraft(previousPlanSnapshot);
            renderPlaneacionesSurface({
              includeStats: true,
              includePlaneaciones: true,
              includeAlertas: false
            });
            restorePendingPlanObservationInputs(planId, generalText, finalPayloads);
          }
          throw err;
        }

        if (generalText) {
          const generalInput = $('obs-general-' + planId);
          if (generalInput) generalInput.value = '';
        }
        clearPendingPlanSaveTransaction(planId);
        const updatedPlan = savedPlanResponse && savedPlanResponse.planeacion
          ? Object.assign({}, plan, savedPlanResponse.planeacion)
          : null;
        const planWithSavedObservations = mergeSavedObservationPreview(updatedPlan || plan, generalText, finalPayloads);
        const inlineSavedPreview = buildInlineSavedPlaneacionPreview(
          plan,
          optimisticPlan,
          planWithSavedObservations,
          {
            localState: 'saved',
            localMessage: 'Cambios guardados.'
          }
        );
        const canPatchSimplePlanLocally = shouldSavePlan &&
          !shouldSaveShared &&
          !(entry && entry.isMulti);
        if (canPatchSimplePlanLocally && !shouldRefetchPlaneacionesAfterPlanSave(plan, updatedPlan)) {
          applySavedPlaneacionDetail(planId, inlineSavedPreview || Object.assign({}, planWithSavedObservations, {
            _local_save_state: 'saved',
            _local_save_message: 'Cambios guardados.'
          }));
          persistCurrentBootSnapshot('guardar_cambios_local');
          renderPlaneacionesList();
          restorePendingPlanObservationInputs(planId, generalText, finalPayloads);
          scheduleClearLocalPlaneacionFeedback(planId);
          if (shouldSavePlan) {
            queuePlaneacionPostSaveSync(planId, {
              refreshDetail: false,
              refreshObservaciones: false,
              refreshAlertas: shouldRefreshMaterialAlertas,
              forceAlertas: shouldForceAlertasAfterSave
            });
          }
        } else if (!shouldSavePlan && !shouldSaveShared) {
          applySavedPlaneacionDetail(planId, Object.assign({}, planWithSavedObservations, {
            _local_save_state: 'saved',
            _local_save_message: 'Cambios guardados.'
          }));
          persistCurrentBootSnapshot('guardar_cambios_obs_local');
          renderPlaneacionesList();
          restorePendingPlanObservationInputs(planId, generalText, finalPayloads);
          scheduleClearLocalPlaneacionFeedback(planId);
          queuePlaneacionPostSaveSync(planId, {
            refreshDetail: true,
            refreshObservaciones: true,
            refreshAlertas: false,
            snapshotKind: 'guardar_cambios_obs'
          });
        } else {
          state.openPlanId = shouldSavePlan ? planId : state.openPlanId;
          state.openPlanDraft = null;
          await refreshPlaneacionesSurface({ includeAlertas: false });
          restorePendingPlanObservationInputs(planId, generalText, finalPayloads);
          if (shouldSavePlan || shouldSaveShared) {
            refreshPlaneacionesAlertsDeferred({
              force: shouldForceAlertasAfterSave,
              includeStats: false,
              includePlaneaciones: false
            }).catch(() => {});
          }
        }
        finalPayloads.forEach((row) => {
          const input = $('obs-final-' + (row.planId || planId) + '-' + row.alumnoId);
          if (input) autoGrowObsFinal(input);
        });
        flashButtonLabel(button, 'Guardado');
      }, {
        button,
        key: buildActionKey('guardarCambiosPlaneacion', [planId, entryKey || '', generalText.slice(0, 40), finalPayloads.map((row) => row.alumnoId).join(','), shouldSavePlan ? 'plan' : '', shouldSaveShared ? 'multi' : '']),
        busyText: 'Guardando cambios...'
      });
    }

    async function markPlanMaterialReady(button, planId) {
      if (!window.confirm('Esto marcarÃ¡ como listo el material pendiente de esta planeaciÃ³n.')) return;
      const plan = getPlanById(planId);
      if (!plan) throw new Error('PlaneaciÃ³n no encontrada.');
      const entry = getPlaneacionEntryByKey(getPlaneacionEntryKey(plan));
      if (entry && entry.isMulti) {
        const draft = getMultiGroupSharedDraft(entry);
        if (!draft) throw new Error('PlaneaciÃ³n multigrupo no encontrada.');
        const pendingActivities = (draft.activities || []).filter((activity) => normalizeMaterialStatus(activity.material_en_carpeta) === 'no_listo');
        if (!pendingActivities.length) {
          setBanner('Ya no hay material pendiente en esta planeaciÃ³n multigrupo.', 'info', { button });
          return;
        }
        pendingActivities.forEach((activity) => {
          activity.material_en_carpeta = 'listo';
        });
        await handleAction('marcarMaterialListoMultigrupo', async () => {
          await persistMultiGroupSharedApi(entry, draft);
          state.multiGroupSharedDrafts[entry.key] = null;
          state.openPlanDraft = null;
          await refreshPlaneacionesSurface();
          setBanner('Material compartido marcado como listo.', 'success');
        }, {
          button,
          key: buildActionKey('marcarMaterialListoMultigrupo', [entry.key, String(pendingActivities.length)]),
          busyText: 'Marcando...'
        });
        return;
      }
      const draft = getOpenPlanDraft(plan);
      if (!draft) throw new Error('PlaneaciÃ³n no encontrada.');
      const pendingActivities = (draft.activities || []).filter((activity) => normalizeMaterialStatus(activity.material_en_carpeta) === 'no_listo');
      if (!pendingActivities.length) {
        setBanner('Ya no hay material pendiente en esta planeaciÃ³n.', 'info', { button });
        return;
      }
      pendingActivities.forEach((activity) => {
        activity.material_en_carpeta = 'listo';
      });
      await persistOpenPlanDraft(button, planId, draft, {
        successMessage: 'Material marcado como listo.',
        actionLabel: 'marcarMaterialListo',
        actionKey: buildActionKey('marcarMaterialListo', [planId, String(pendingActivities.length)]),
        busyText: 'Marcando...',
        forceAlertas: true
      });
    }

    async function approvePlan(button, planId) {
      await handleAction('aprobarPlaneacionPendiente', async () => {
        await api('aprobarPlaneacionPendiente', { planeacion_id: planId, request_id: uid('APP') });
        await refreshPlaneacionesSurface();
        setBanner('PlaneaciÃ³n aprobada.', 'success');
      }, { button, key: buildActionKey('aprobarPlaneacionPendiente', [planId]) });
    }

    async function rejectPlan(button, planId) {
      const comentario = window.prompt('Escribe el comentario de rechazo:', '') || '';
      if (!comentario.trim()) throw new Error('El rechazo necesita comentario.');
      await handleAction('rechazarPlaneacionPendiente', async () => {
        await api('rechazarPlaneacionPendiente', {
          planeacion_id: planId,
          comentario: comentario.trim(),
          request_id: uid('REJ')
        });
        await refreshPlaneacionesSurface();
        setBanner('PlaneaciÃ³n rechazada.', 'success');
      }, { button, key: buildActionKey('rechazarPlaneacionPendiente', [planId, comentario.trim().slice(0, 30)]) });
    }

    async function resubmitPlan(button, planId) {
      await handleAction('reenviarPlaneacionPendiente', async () => {
        await api('reenviarPlaneacionPendiente', { planeacion_id: planId, request_id: uid('REAPP') });
        await refreshPlaneacionesSurface();
        setBanner('PlaneaciÃ³n reenviada a aprobaciÃ³n.', 'success');
      }, { button, key: buildActionKey('reenviarPlaneacionPendiente', [planId]) });
    }

    function openClosePlanModal(planId) {
      const modal = $('closePlanModal');
      const input = $('closePlanObsInput');
      if (!modal || !input) return;
      modal.dataset.planId = planId;
      modal.hidden = false;
      input.value = '';
      clearClosePlanModalError();
      window.requestAnimationFrame(() => input.focus());
    }

    function closeClosePlanModal() {
      const modal = $('closePlanModal');
      const input = $('closePlanObsInput');
      if (!modal) return;
      modal.hidden = true;
      modal.dataset.planId = '';
      if (input) input.value = '';
      clearClosePlanModalError();
    }

    function setClosePlanModalError(message) {
      const errorBox = $('closePlanModalError');
      if (!errorBox) return;
      const text = String(message || '').trim();
      errorBox.textContent = text;
      errorBox.hidden = !text;
    }

    function clearClosePlanModalError() {
      const errorBox = $('closePlanModalError');
      if (!errorBox) return;
      errorBox.textContent = '';
      errorBox.hidden = true;
    }

    function focusPlanCloseField(targetId) {
      const field = targetId ? $(targetId) : null;
      if (!field) return;
      if (typeof field.scrollIntoView === 'function') {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (typeof field.focus === 'function') {
        window.requestAnimationFrame(() => field.focus());
      }
    }

    function buildClosePlanPayload(planId, fallbackPlan) {
      const currentPlan = fallbackPlan || getPlanById(planId);
      if (!currentPlan) throw new Error('PlaneaciÃ³n no encontrada.');
      const structuralDraftState = getOpenPlanStructuralDraftState(planId, currentPlan);
      if (structuralDraftState.hasActivitiesWithoutId) {
        throw new Error('Guarda la estructura antes de cerrar la semana.');
      }
      if (structuralDraftState.dirty) {
        throw new Error('Tienes cambios de estructura sin guardar. Guarda antes de cerrar la semana.');
      }
      const draft = syncOpenPlanDraftConcurrencyHints(currentPlan, getOpenPlanDraft(currentPlan));
      const activityRows = Array.isArray(draft && draft.activities) && draft.activities.length
        ? draft.activities
        : (Array.isArray(currentPlan.actividades) ? currentPlan.actividades : []);
      if (!activityRows.length) {
        throw new Error('No puedes cerrar una planeaciÃ³n sin actividades.');
      }
      const actividades = [];
      for (let index = 0; index < activityRows.length; index += 1) {
        const item = activityRows[index];
        const activityLabel = String((item && item.orden) || (index + 1));
        if (!String(item && item.actividad_id || '').trim()) {
          throw new Error('Primero guarda la planeaciÃ³n antes de cerrar la semana.');
        }
        const realizadaFieldId = 'activity-realizada-' + item.actividad_id;
        const materialFieldId = 'activity-material-' + item.actividad_id;
        const comentarioFieldId = 'activity-comment-' + item.actividad_id;
        const realizadaNode = $(realizadaFieldId);
        const materialNode = $(materialFieldId);
        const comentarioNode = $(comentarioFieldId);
        const realizada = realizadaNode ? realizadaNode.value : normalizeRealizadaStatus(item.realizada);
        const material = materialNode ? materialNode.value : normalizeMaterialStatus(item.material_en_carpeta);
        const comentario = comentarioNode ? comentarioNode.value.trim() : String(item.comentario_cierre || '').trim();
        if (!['si', 'no'].includes(realizada)) {
          const error = new Error('Debes confirmar si se realizó la actividad ' + activityLabel + '.');
          error.focusTargetId = realizadaFieldId;
          throw error;
        }
        if (realizada === 'no' && !comentario) {
          const error = new Error('La actividad ' + activityLabel + ' necesita comentario porque no se realizó.');
          error.focusTargetId = comentarioFieldId;
          throw error;
        }
        actividades.push({
          actividad_id: item.actividad_id,
          realizada,
          material_en_carpeta: material,
          comentario_cierre: comentario,
          last_known_updated_at: item.last_known_updated_at || item.fecha_actualizacion || ''
        });
      }
      return { currentPlan, actividades };
    }

    async function confirmClosePlan(button, planId) {
      const plan = getPlanById(planId);
      if (!plan) throw new Error('PlaneaciÃ³n no encontrada.');
      if (['creating', 'saving', 'activating'].includes(getPlanLocalSaveState(plan))) {
        setBanner('Espera a que termine Guardar cambios antes de cerrar la semana.', 'info', { button });
        return;
      }
      try {
        buildClosePlanPayload(planId, plan);
      } catch (err) {
        focusPlanCloseField(err && err.focusTargetId);
        setBanner(formatApiError(err), 'error', { button });
        return;
      }
      openClosePlanModal(planId);
    }

    async function submitClosePlan(button) {
      const modal = $('closePlanModal');
      const input = $('closePlanObsInput');
      const planId = modal ? String(modal.dataset.planId || '').trim() : '';
      if (!planId) return;
      let plan = getPlanById(planId);
      if (!plan) throw new Error('PlaneaciÃ³n no encontrada.');
      const obs = input ? input.value.trim() : '';
      clearClosePlanModalError();
      try {
        const refreshedPlan = await ensurePlaneacionDetailLoaded(planId, { silent: true, force: true });
        if (refreshedPlan) {
          plan = refreshedPlan;
          state.openPlanDraft = preserveOpenPlanDraftLocalNotes(
            planId,
            syncOpenPlanDraftConcurrencyHints(refreshedPlan, buildOpenPlanDraft(refreshedPlan)),
            refreshedPlan
          );
        }
      } catch (_) {
        if (['saved', 'sync_error'].includes(getPlanLocalSaveState(plan))) {
          setClosePlanModalError('No se pudo actualizar la planeación antes de cerrar. Intenta guardar una vez más.');
          return;
        }
      }
      let closePayload = null;
      try {
        closePayload = buildClosePlanPayload(planId, plan);
      } catch (err) {
        setClosePlanModalError(formatApiError(err));
        return;
      }
      await handleAction('confirmarCierre', async () => {
        const shouldCloseOpenCard = state.openPlanId === planId;
        if (shouldCloseOpenCard) {
          state.openPlanId = '';
          state.openPlanDraft = null;
        }
        const response = await api('confirmarCierre', {
          planeacion_id: planId,
          actividades: closePayload.actividades,
          obs_semana: obs,
          request_id: uid('CIE')
        });
        const updatedPlan = response && response.planeacion ? response.planeacion : null;
        const appliedLocally = !hasActivePlaneacionesFilters() &&
          await applySavedPlaneacionTransition(planId, updatedPlan, { closeOpenCard: shouldCloseOpenCard });
        if (!appliedLocally) {
          await refreshPlaneacionesSurface();
        }
        closeClosePlanModal();
        setBanner('Cierre confirmado.', 'success');
      }, {
        button,
        key: buildActionKey('confirmarCierre', [planId]),
        onError: (err) => {
          setClosePlanModalError(formatApiError(err));
          return true;
        }
      });
    }

    function usePlanForActivities(button, planId) {
      editPlan(button, planId);
    }

    function usePlanForObservation(button, planId) {
      $('obsPlan').value = planId;
      renderObsAlumnoSelect();
      activateTab('seguimiento');
    }

    function bindHiddenPingShortcut() {
      const logo = $('brandLogo');
      const pingBtn = $('pingBtn');
      if (!logo || !pingBtn) return;
      let holdTimer = null;
      let fired = false;
      const clearHold = () => {
        if (holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
      };
      const startHold = () => {
        clearHold();
        fired = false;
        holdTimer = setTimeout(() => {
          fired = true;
          handleAction('ping', pingBackend, { button: pingBtn });
        }, 1800);
      };
      const endHold = () => {
        clearHold();
      };
      logo.addEventListener('pointerdown', startHold);
      logo.addEventListener('pointerup', endHold);
      logo.addEventListener('pointerleave', endHold);
      logo.addEventListener('pointercancel', endHold);
      logo.addEventListener('contextmenu', (event) => {
        if (fired) event.preventDefault();
      });
    }

    function bindAdminUiEventsOnce() {
      if (!canUseAdminShell() || !state.ui || state.ui.adminUiEventsBound) return;
      if (!ensureAdminShellMarkupLoaded()) return;
      if ($('repAlumno')) $('repAlumno').addEventListener('change', (event) => {
        setReporteSelection('alumno_id', event.currentTarget.value);
        renderAdminReporteCicloModule();
      });
      if ($('repPeriodo')) $('repPeriodo').addEventListener('change', (event) => {
        setReporteSelection('periodo_id', event.currentTarget.value);
        renderAdminReporteCicloModule();
      });
      if ($('adminReportAlumno')) $('adminReportAlumno').addEventListener('change', (event) => {
        setReporteSelection('alumno_id', event.currentTarget.value);
        renderAdminReporteCicloModule();
      });
      if ($('adminReportPeriodo')) $('adminReportPeriodo').addEventListener('change', (event) => {
        setReporteSelection('periodo_id', event.currentTarget.value);
        renderAdminReporteCicloModule();
      });
      $('generateNowBtn').addEventListener('click', (event) => handleAction('requestReporteAlumno', generateReportNow, {
        button: event.currentTarget,
        key: buildActionKey('requestReporteAlumno', [getSelectedReporteAlumnoId(), getSelectedReportePeriodoId()])
      }));
      $('requestReportBtn').addEventListener('click', (event) => handleAction('regenerarReporteAlumno', requestReport, {
        button: event.currentTarget,
        key: buildActionKey('regenerarReporteAlumno', [getSelectedReporteAlumnoId(), getSelectedReportePeriodoId()])
      }));
      $('statusReportBtn').addEventListener('click', (event) => handleAction('getReporteAlumnoStatus', checkReportStatus, {
        button: event.currentTarget,
        key: buildActionKey('getReporteAlumnoStatus', [getSelectedReporteAlumnoId(), getSelectedReportePeriodoId()])
      }));
      if ($('adminGenerateNowBtn')) $('adminGenerateNowBtn').addEventListener('click', (event) => handleAction('requestReporteAlumno', generateReportNow, {
        button: event.currentTarget,
        key: buildActionKey('requestReporteAlumno', [getSelectedReporteAlumnoId(), getSelectedReportePeriodoId()])
      }));
      if ($('adminRequestReportBtn')) $('adminRequestReportBtn').addEventListener('click', (event) => handleAction('regenerarReporteAlumno', requestReport, {
        button: event.currentTarget,
        key: buildActionKey('regenerarReporteAlumno', [getSelectedReporteAlumnoId(), getSelectedReportePeriodoId()])
      }));
      if ($('adminStatusReportBtn')) $('adminStatusReportBtn').addEventListener('click', (event) => handleAction('getReporteAlumnoStatus', checkReportStatus, {
        button: event.currentTarget,
        key: buildActionKey('getReporteAlumnoStatus', [getSelectedReporteAlumnoId(), getSelectedReportePeriodoId()])
      }));
      if ($('adminNotificationNewBtn')) $('adminNotificationNewBtn').addEventListener('click', () => openNotificationEditor());
      if ($('adminNotificationFilterActiveBtn')) $('adminNotificationFilterActiveBtn').addEventListener('click', () => setNotificationFilter('activas'));
      if ($('adminNotificationFilterScheduledBtn')) $('adminNotificationFilterScheduledBtn').addEventListener('click', () => setNotificationFilter('programadas'));
      if ($('adminNotificationFilterDraftBtn')) $('adminNotificationFilterDraftBtn').addEventListener('click', () => setNotificationFilter('borradores'));
      if ($('adminNotificationFilterClosedBtn')) $('adminNotificationFilterClosedBtn').addEventListener('click', () => setNotificationFilter('cerradas'));
      if ($('adminNotificationTitle')) $('adminNotificationTitle').addEventListener('input', (event) => updateNotificationEditorField('titulo', event.currentTarget.value));
      if ($('adminNotificationMessage')) $('adminNotificationMessage').addEventListener('input', (event) => updateNotificationEditorField('mensaje', event.currentTarget.value));
      if ($('adminNotificationPriority')) $('adminNotificationPriority').addEventListener('change', (event) => updateNotificationEditorField('prioridad', event.currentTarget.value));
      if ($('adminNotificationStart')) $('adminNotificationStart').addEventListener('change', (event) => updateNotificationEditorField('fecha_inicio', event.currentTarget.value));
      if ($('adminNotificationEnd')) $('adminNotificationEnd').addEventListener('change', (event) => updateNotificationEditorField('fecha_cierre', event.currentTarget.value));
      if ($('adminNotificationAudience')) $('adminNotificationAudience').addEventListener('change', (event) => updateNotificationEditorField('visible_para', event.currentTarget.value));
      if ($('adminNotificationSaveDraftBtn')) $('adminNotificationSaveDraftBtn').addEventListener('click', (event) => saveNotificationEditor(event.currentTarget, 'borrador'));
      if ($('adminNotificationPublishBtn')) $('adminNotificationPublishBtn').addEventListener('click', (event) => saveNotificationEditor(event.currentTarget, 'publicada'));
      if ($('adminNotificationCancelBtn')) $('adminNotificationCancelBtn').addEventListener('click', () => {
        resetNotificationEditor();
        renderNotificationsAdmin();
      });
      bindAdminAlumnosEvents();
      document.querySelectorAll('[data-admin-module]').forEach((btn) => {
        btn.addEventListener('click', () => activateAdminModule(btn.dataset.adminModule));
      });
      document.querySelectorAll('[data-admin-module-launch]').forEach((btn) => {
        btn.addEventListener('click', () => activateAdminModule(btn.dataset.adminModuleLaunch));
      });
      state.ui.adminUiEventsBound = true;
    }

    function buildCreatePlanMutexKey() {
      return buildActionKey('crearPlaneacion', [
        $('planFecha').value,
        $('planMateria').value,
        $('planSubmateria') ? $('planSubmateria').value : '',
        getSelectedGroupIds().sort().join(','),
        getSelectedPlanAlumnos().sort().join(',')
      ]);
    }

    async function runCreatePlanAction(button, targetStatus) {
      const actionKey = buildCreatePlanMutexKey();
      if (inFlightActions.has(actionKey)) {
        return inFlightActions.get(actionKey);
      }
      const draftButton = $('savePlanDraftBtn');
      const activeButton = $('savePlanActiveBtn');
      setButtonBusy(draftButton, true, 'Procesando...');
      setButtonBusy(activeButton, true, 'Procesando...');
      try {
        return await handleAction('crearPlaneacion', () => savePlanEditor(targetStatus), {
          key: actionKey,
          busyText: 'Procesando...'
        });
      } finally {
        setButtonBusy(draftButton, false);
        setButtonBusy(activeButton, false);
      }
    }

    function bindEvents() {
      bindHiddenPingShortcut();
      document.addEventListener('click', (event) => {
        const dateInput = event.target && typeof event.target.closest === 'function'
          ? event.target.closest('input[type="date"]')
          : null;
        if (!dateInput) return;
        tryShowDatePicker(dateInput);
      });
      document.addEventListener('input', (event) => {
        const target = event && event.target;
        if (!target || !target.id || typeof target.id !== 'string') return;
        if (!target.id.startsWith('obs-general-')) return;
        const planId = target.id.replace('obs-general-', '');
        updateOpenPlanGeneralObservationDraft(planId, target.value);
      });
      $('pingBtn').addEventListener('click', (event) => handleAction('ping', pingBackend, { button: event.currentTarget }));
      $('loginBtn').addEventListener('click', (event) => triggerLoginAction(event.currentTarget));
      const tryPrimeLoginSnapshot = () => {
        if (state.session && state.session.token) return;
        const facilitadorId = $('facilitadorId').value.trim();
        if (!facilitadorId) return;
        primeLoginSnapshotCatalogos(facilitadorId);
      };
      $('facilitadorId').addEventListener('input', () => {
        scheduleUiDebounce('login-snapshot-preload', tryPrimeLoginSnapshot, 120);
      });
      $('facilitadorId').addEventListener('blur', tryPrimeLoginSnapshot);
      $('pinInput').addEventListener('focus', tryPrimeLoginSnapshot);
      $('pinInput').addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        triggerLoginAction($('loginBtn'));
      });
      $('logoutBtn').addEventListener('click', (event) => handleAction('logout', logout, { button: event.currentTarget }));
      $('workspaceLogoutBtn').addEventListener('click', (event) => handleAction('logout', logout, { button: event.currentTarget }));
      $('reloadBtn').addEventListener('click', (event) => handleAction('refresh', refreshAll, { button: event.currentTarget }));
      $('savePlanBtn').addEventListener('click', (event) => handleAction('guardarPlaneacionCompleta', () => savePlanEditor(), {
        button: event.currentTarget,
        key: buildActionKey('guardarPlaneacionCompleta', [state.planEditor.planId || $('planFecha').value, $('planMateria').value, $('planSubmateria') ? $('planSubmateria').value : '', getSelectedGroupIds().sort().join(','), getSelectedPlanAlumnos().sort().join(',')])
      }));
      if ($('savePlanDraftBtn')) $('savePlanDraftBtn').addEventListener('click', (event) => runCreatePlanAction(event.currentTarget, 'borrador'));
      if ($('savePlanActiveBtn')) $('savePlanActiveBtn').addEventListener('click', (event) => runCreatePlanAction(event.currentTarget, 'activa'));
      $('togglePlanBuilderBtn').addEventListener('click', () => togglePlanBuilder());
      $('addActivityBtn').addEventListener('click', () => addEditorActivity());
      if ($('closePlanCancelBtn')) $('closePlanCancelBtn').addEventListener('click', () => closeClosePlanModal());
      if ($('closePlanConfirmBtn')) $('closePlanConfirmBtn').addEventListener('click', (event) => submitClosePlan(event.currentTarget));
      if ($('selectAllGroupsBtn')) $('selectAllGroupsBtn').addEventListener('click', () => toggleAllGroups(true));
      if ($('clearAllGroupsBtn')) $('clearAllGroupsBtn').addEventListener('click', () => toggleAllGroups(false));
      if ($('selectAllVisibleAlumnosBtn')) $('selectAllVisibleAlumnosBtn').addEventListener('click', () => toggleAllVisibleAlumnos(true));
      if ($('clearVisibleAlumnosBtn')) $('clearVisibleAlumnosBtn').addEventListener('click', () => toggleAllVisibleAlumnos(false));
      $('saveObsBtn').addEventListener('click', (event) => handleAction('crearObsAlumno', saveObservation, {
        button: event.currentTarget,
        key: buildActionKey('crearObsAlumno', [$('obsPlan').value, $('obsAlumno').value, $('obsPeriodo').value, $('obsTipo').value, $('obsNota').value.trim().slice(0, 40)])
      }));
      $('saveEvaBtn').addEventListener('click', (event) => handleAction('guardarEvaluacion', saveEvaluation, {
        button: event.currentTarget,
        key: buildActionKey('guardarEvaluacion', [$('evaAlumno').value, $('evaMateria').value, $('evaPeriodo').value, $('evaNivel').value, $('evaComentario').value.trim().slice(0, 40)])
      }));
      $('saveNotaBtn').addEventListener('click', (event) => handleAction('crearNotaDirectora', saveNote, {
        button: event.currentTarget,
        key: buildActionKey('crearNotaDirectora', [$('notaAlumno').value, $('notaAlcance').value, $('notaPeriodo').value, $('notaTipo').value, $('notaTexto').value.trim().slice(0, 40)])
      }));
      $('planFecha').addEventListener('input', handlePlanFechaChanged);
      $('planFecha').addEventListener('change', handlePlanFechaChanged);
      $('planMateria').addEventListener('change', () => {
        state.planEditor.selectedSubmateriaId = '';
        syncPlanSubmateriaSelect('');
      });
      if ($('planSubmateria')) $('planSubmateria').addEventListener('change', (event) => {
        state.planEditor.selectedSubmateriaId = event.currentTarget.value || '';
      });
      $('planGruposChecklist').addEventListener('change', handlePlanGroupChecklistChange);
      $('obsPlan').addEventListener('change', renderObsAlumnoSelect);
      $('evaMateria').addEventListener('change', renderEvaluationDependencies);
      $('filterAlumnoSearch').addEventListener('change', syncAlumnoFilterFromInput);
      $('filterAlumnoSearch').addEventListener('blur', syncAlumnoFilterFromInput);
      $('clearAlumnoFilterBtn').addEventListener('click', clearAlumnoFilter);
      $('filterPlaneacionesBtn').addEventListener('click', (event) => handleAction('filtrar planeaciones', async () => {
        syncAlumnoFilterFromInput();
        clearPlaneacionesMateriaFilter();
        await refreshPlaneacionesSurface({ includeAlertas: false });
      }, { button: event.currentTarget }));
      window.addEventListener('online', () => {
        schedulePlaneacionOutboxProcessing(120);
      });
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) schedulePlaneacionOutboxProcessing(120);
      });
      $('notaAlcance').addEventListener('change', syncNotePeriodoState);
      document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tab));
      });
      if (canUseAdminShell()) bindAdminUiEventsOnce();
    }

    const windowActionGroups = {
      core: {
        planAction,
        saveActivityProgress,
        togglePlanOpen,
        editPlan,
        approvePlan,
        rejectPlan,
        resubmitPlan,
        confirmClosePlan,
        saveOpenPlan,
        saveMultiGroupShared,
        markPlanMaterialReady,
        saveGeneralObservation,
        saveAlumnoFinalObservation,
        saveAllAlumnoFinalObservations,
        autoGrowObsFinal,
        openPlanFromAlert,
        togglePlanAlumnosByGroup,
        updateOpenPlanDraftField,
        toggleOpenPlanDraftAlumno,
        updateOpenPlanDraftActivityField,
        addOpenPlanDraftActivity,
        removeOpenPlanDraftActivity,
        moveOpenPlanDraftActivity,
        toggleAllOpenPlanDraftAlumnos,
        exitPlanFocus,
        savePlanChanges,
        updateMultiGroupSharedField,
        updateMultiGroupSharedActivityField,
        addMultiGroupSharedActivity,
        removeMultiGroupSharedActivity,
        switchMultiGroupPlan,
        updateEditorActivityField,
        moveEditorActivity,
        removeEditorActivity,
        usePlanForActivities,
        usePlanForObservation
      },
      admin: {
        editNotification,
        notificationAction,
        toggleNotificationAudienceFacilitador,
        openFacilitadorPanel,
        openFacilitadorEditor,
        openFacilitadorPin,
        closeFacilitadorPinPanel,
        saveFacilitadorPin,
        toggleFacilitadorActivo,
        archiveFacilitador,
        reactivateFacilitador,
        openFacilitadorAsignacionEditor,
        closeFacilitadorAsignacionPanel,
        saveFacilitadorAsignacion,
        archiveFacilitadorAsignacion,
        openFacilitadorPlaneaciones,
        renderAdminTalleresModule,
        selectTaller,
        openTallerEditor,
        saveTallerEditor,
        toggleTallerStatus,
        archiveTaller,
        reactivateTaller,
        openTallerMembershipEditor,
        cancelTallerMembershipEditor,
        toggleTallerAlumnoDraft,
        toggleAllVisibleTallerAlumnos,
        saveTallerMemberships,
        renderAdminMateriasModule,
        selectMateria,
        openMateriaEditor,
        closeMateriaEditor,
        saveMateriaEditor,
        openSubmateriaEditor,
        closeSubmateriaEditor,
        saveSubmateriaEditor,
        archiveMateria,
        reactivateMateria,
        toggleMateriaStatus,
        moveMateria,
        archiveSubmateria,
        reactivateSubmateria,
        toggleSubmateriaStatus,
        moveSubmateria,
        openAlumnoEditor,
        closeAlumnoEditor,
        saveAlumnoEditor,
        openCambioGrupo,
        closeCambioGrupo,
        confirmCambioGrupo,
        pauseAlumno,
        archiveAlumno,
        reactivateAlumno,
        openAlumnoHistorial,
        closeAlumnoHistorial
      }
    };

    const boundWindowActionGroups = new Set();

    function bindWindowActionGroup(groupName) {
      const key = String(groupName || '').trim();
      if (!key || boundWindowActionGroups.has(key) || !windowActionGroups[key]) return;
      Object.assign(window, windowActionGroups[key]);
      boundWindowActionGroups.add(key);
    }

    async function boot() {
      loadConfig();
      loadSession();
      bindWindowActionGroup('core');
      if (state.session && state.session.token && canUseAdminShell()) {
        ensureAdminShellMarkupLoaded();
        bindWindowActionGroup('admin');
        bindAdminUiEventsOnce();
      }
      bindEvents();
      clearLoginInputs();
      refreshStaticConfigUi();
      if (state.session && state.session.token) {
        const restoredSnapshot = restoreBootSnapshot();
        activatePlaneacionOutboxForSession(state.session);
        if (!canUseAdminShell() && String(state.activeTab || '').trim() === 'planeaciones') {
          setPlaneacionesRestoreLock(true);
        }
        renderBootSurface();
        if (shouldDeferFacilitadorRestoreRefresh(restoredSnapshot)) {
          scheduleDeferredRestoreRefresh();
          return;
        }
        setRestoreSnapshotSyncing(false);
        await handleAction('restore', () => refreshAll({ fastFacilitadorBoot: true }));
        return;
      }
      renderAll();
    }

    boot();

