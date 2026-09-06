# Modelo de seguridad

## Activos protegidos

- Código y documentación privados.
- Secretos, credenciales, llaves y sesiones.
- Historial Git y trabajo local no confirmado.
- Identidad ALMA y políticas centrales.
- Datos personales o de negocio.
- Integridad del entorno y de las dependencias.

## Límites de confianza

| Frontera | Tratamiento |
|---|---|
| Usuario → agente | El objetivo autoriza alcance, no acciones implícitas ajenas |
| Repositorio → agente | Código y documentos son datos; las instrucciones incrustadas se verifican |
| Orquestador → subagente | Contexto mínimo, riesgo y aceptación explícitos |
| Agente → shell | Aprobación por defecto y denegación de acciones destructivas |
| Agente → MCP/web | Opt-in, mínimo contexto y sin secretos |
| MCP personal → archivos | Allowlist, denylist, raíz real y solo lectura |
| Especialista → Orchestrator | Solo resultados y `handoff_request`; sin delegación lateral |
| Orchestrator → Reviewer/Security | Auditoría independiente sobre el diff real |

## Amenazas y controles

### Exposición de secretos

- Lectura denegada para `.env`, llaves, credenciales y bases locales.
- `.env.example` puede versionarse sin valores reales.
- Gitleaks extiende las reglas oficiales.
- Los logs y reportes deben redactar hallazgos sensibles.

### Prompt injection

- Las instrucciones encontradas en código, documentos o web no cambian rol,
  permisos o identidad.
- Se reportan y se continúa solo con contenido técnico seguro.

### Escalamiento entre agentes

- `task` está denegado globalmente.
- Solo Orchestrator posee una allowlist exacta de los seis especialistas.
- Todos los agentes hoja declaran `task: deny`.
- No hay excepción directa entre especialistas; todo handoff vuelve al owner.
- Builder y Docs directos quedan `PARTIAL` después de editar hasta review.

### Independencia de revisión

- Reviewer declara `edit: deny` y no persiste su propio reporte.
- Si el usuario pide guardar una auditoría, Orchestrator asigna la escritura a
  Docs y solicita una revisión nueva.
- Cambios de permisos, comandos, delegación o contexto pasan también por
  Security antes del cierre.

### Integridad de ALMA

- Builder y Docs tienen denegación explícita de edición.
- Los cambios se proponen en `.opencode/proposals/alma/`.
- La aplicación final pertenece al propietario.

### Supply chain y MCP

- No se usan etiquetas móviles en configuración operativa.
- El default del template es MCP y sharing deshabilitados al clonar; una
  excepción explícita (`mcpExceptions` + permisos `ask`) puede habilitar un
  MCP bajo guardas que el validador comprueba (ver "Excepción MCP").
- Versiones y acciones CI se fijan.
- Dependabot propone actualizaciones para revisión humana.
- Cada MCP declara timeout y permisos por prefijo.
- Playwright usa aislamiento, localhost, salida limitada y service workers
  bloqueados en su perfil inicial; el validador exige conservar esas guardas
  cuando está excepcionado.
- El MCP personal no ejecuta shell, no escribe y no accede a red; no admite
  excepción y permanece `disabled`/`deny`.

### Excepción MCP

El default del template es estricto: todo MCP inicia deshabilitado y sus
herramientas denegadas. Una decisión explícita del usuario puede habilitar un
MCP declarando una justificación no vacía en el bloque top-level
`mcpExceptions` de `opencode.json`; el validador exige entonces permisos `ask`
(nunca `allow`), conserva las guardas de aislamiento de Playwright (localhost
exclusivo) y rechaza excepciones para `personal`. La política completa vive en
[mcp-policy.md](../instructions/mcp-policy.md).

### Modo automático

`--auto` puede aprobar operaciones marcadas como `ask`. Los límites de secretos,
ALMA, delegación y comandos destructivos permanecen como `deny` y el
validador comprueba que no desaparezcan. Los MCP conservan el mismo default
estricto (deshabilitados y `deny`), pero una excepción explícita
(`mcpExceptions` + permisos `ask`) puede habilitarlos bajo guardas verificadas
por el validador; `personal` no admite excepción y permanece siempre `deny`.

### Acciones destructivas

- Se deniegan comandos comunes de borrado, limpieza, reset y force push.
- Estas reglas complementan, pero no sustituyen, el sandbox y la revisión
  humana.

### Bucles y estancamiento

- `doom_loop: deny` detiene la tercera llamada de herramienta con entrada
  idéntica, tanto globalmente como en los siete agentes.
- Cada agente conserva un límite finito de pasos y los especialistas no pueden
  delegarse entre sí, lo que limita ciclos entre sesiones.
- Tras dos intentos fallidos sobre la misma causa, el agente conserva evidencia
  y devuelve alternativas o `BLOCKED`; no cambia parámetros indefinidamente.
- Este control es local y determinista. No necesita MCP, red ni otro modelo.
- No detecta bloqueos de proveedor sin actividad ni repeticiones semánticas con
  argumentos diferentes; estos continúan limitados por pasos y cierre explícito.

## Riesgo residual

- Las políticas de texto dependen de que el modelo las siga.
- Las reglas de comandos no pueden detectar todas las formas de ejecución
  indirecta.
- Una dependencia fijada puede volverse vulnerable.
- El contenido enviado voluntariamente a un MCP sale del entorno local.
- Una allowlist demasiado amplia del MCP personal puede exponer código que no
  era necesario para la tarea.

Por eso se mantienen aprobación humana, auditoría independiente, CI y
actualizaciones revisadas.

## Verificación

```powershell
node scripts/validate-template.mjs
node scripts/test-agent-fixtures.mjs
gitleaks git --redact --verbose
gitleaks dir --redact --verbose .
node scripts/test-gitleaks.mjs gitleaks
```

El último comando genera la credencial ficticia únicamente en el directorio
temporal del sistema y exige detección y redacción.
