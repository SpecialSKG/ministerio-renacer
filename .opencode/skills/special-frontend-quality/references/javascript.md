# JavaScript y TypeScript

## REQUIRED

- Preservar contratos, reglas de negocio y comportamiento no incluidos en el
  cambio solicitado.
- Manejar fallos relevantes de red, parsing, permisos y respuestas inesperadas.
- Mostrar feedback cuando el error afecta una acción del usuario.
- Validar datos externos en la frontera adecuada; los tipos de compilación no
  sustituyen validación de runtime.
- Mantener secretos y credenciales fuera del bundle público.

## DEFAULT

- Usar `const`; `let` cuando exista reasignación; `var` solo por compatibilidad.
- Preferir nombres que expresen intención y funciones con responsabilidad clara.
- Separar transformación de datos, IO y manipulación del DOM cuando mejore
  comprensión o pruebas.
- Preferir módulos ES en código moderno nuevo y seguir la arquitectura existente.
- Elegir funciones, composición, objetos o clases según el modelo del problema.
- Modelar flujos asíncronos relevantes con loading, success, empty, error,
  disabled y retry según correspondan.
- Limpiar listeners, timers, suscripciones y solicitudes cancelables.

## AVOID

- Estado de aplicación en `window`, globals accidentales o dependencias implícitas.
- Funciones monolíticas que mezclan API, datos, DOM, storage, tracking y feedback.
- Una función por archivo o abstracciones sin cohesión/reutilización comprobable.
- `catch {}` vacío, promesas ignoradas o logs que sustituyen feedback de usuario.
- Reescrituras completas, renombres públicos o formateo masivo por un cambio local.

## CONDITIONAL

- IIFE es válida para aislamiento puntual o legacy; no migrarla sin beneficio.
- TypeScript ayuda cuando el proyecto ya lo usa o el costo está justificado; no
  introducirlo por preferencia.
- Estado global, clases y patrones avanzados requieren una necesidad observable.

## Pruebas

Seguir comandos y convenciones existentes. Para cambios de comportamiento,
combinar con `test-driven-development` cuando esté disponible, sin asumir un
framework o exigir tests que el proyecto no puede ejecutar.

Fuente de actualización: [MDN JavaScript](https://developer.mozilla.org/docs/Web/JavaScript).
