# Contratos compartidos de agentes

Estas reglas definen interfaces comunes. Cada agente conserva su identidad,
perspectiva, workflow y formato especializado.

## Propiedad y delegación

`base-orchestrator` es siempre el propietario del resultado integral y el único
agente autorizado para usar `task`.

Para trabajo mediano, grande o sensible, cada delegación incluye:

```yaml
delegation:
  task_id: T-###
  owner: base-orchestrator
  sender: base-orchestrator
  recipient: base-specialist
  objective: resultado observable
  scope:
    included: []
    excluded: []
  constraints: []
  inputs:
    refs: []
  dependencies: []
  mutable_state:
    owner: none
    parallel_safe: false
  acceptance_criteria: []
  evidence_required: []
  expected_output: result
  allow_redelegation: false
```

- Usa referencias y contexto mínimo; no copies conversaciones o archivos
  completos por costumbre.
- La delegación puede restringir, pero nunca ampliar permisos.
- Solo marca `parallel_safe: true` cuando las subtareas no comparten estado ni
  dependen entre sí.
- El receptor puede rechazar una tarea fuera de alcance, sin contexto suficiente
  o incompatible con sus permisos.

## Solicitud de handoff

Los especialistas no invocan otros agentes. Cuando necesitan otra capacidad
devuelven:

```yaml
handoff_request:
  request_id: HR-###
  task_id: T-###
  requester: base-specialist
  capability_needed: capacidad concreta
  requested_agent: base-specialist
  reason: límite que impide completar
  proposed_subtask: resultado pequeño y verificable
  inputs:
    refs: []
  acceptance_criteria: []
  current_status: PARTIAL
```

Orchestrator responde `accepted`, `modified` o `rejected`, explica la razón y,
si procede, emite una nueva delegación propia. No existe delegación directa ni
excepcional entre especialistas.

## Estados

- `COMPLETE`: el entregable propio está completo y verificado. Para el resultado
  integral, además pasaron todas las puertas requeridas.
- `PARTIAL`: existe trabajo útil, pero falta otra capacidad, verificación o
  aprobación. Puede incluir `handoff_request`.
- `BLOCKED`: falta autoridad, existe riesgo destructivo o no hay una ruta segura
  para continuar.

Un especialista invocado directamente por el usuario puede trabajar dentro de
su rol y permisos. Si modifica archivos, devuelve `PARTIAL — pendiente de
review`; no declara completo el ciclo integral.

## Resultado mínimo

Todo agente devuelve:

- `task_id` cuando existe una delegación;
- estado;
- resultado, cambios o hallazgos;
- evidencia y fuentes;
- verificación ejecutada y no ejecutada;
- riesgos, límites y confianza cuando aplique;
- handoff o acción siguiente.

La evidencia reportada por un especialista no se presenta como verificada por
Orchestrator salvo que este la haya comprobado.

## Fallos y cierre

- Conserva trabajo parcial y errores; no los ocultes para aparentar éxito.
- Un cambio de archivos requiere review independiente antes del cierre global.
- Autenticación, secretos, permisos, dependencias, MCP, red, entrada no
  confiable o datos sensibles requieren también Security.
- Un rechazo puede volver al Builder como máximo dos veces. Después, entrega
  `BLOCKED` con evidencia y alternativas.
- Una misma causa no recibe más de dos intentos fallidos aunque cambien
  superficialmente los comandos o argumentos. El tercero se sustituye por
  diagnóstico, alternativa o cierre `BLOCKED`.
- ALMA no se modifica. Sus evoluciones se preparan únicamente como propuestas.
