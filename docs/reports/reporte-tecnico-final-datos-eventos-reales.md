# Reporte Técnico Final — Datos de eventos reales

> **Generado:** 2026-10-04
> **Proyecto:** Ministerio Renacer
> **Stack:** HTML/CSS/JS/JSON estático
> **Iteración:** 1 de 1
> **Veredicto final:** APROBADO (con observaciones menores documentadas)

## Resumen del ciclo

Se reemplazaron los eventos ficticios de ejemplo de `data/events.json` por los
**13 eventos reales** del calendario de compromisos del ministerio (sep/oct 2026),
provistos y autorizados por el usuario. El cambio pasa la prueba de concepto de un
dataset de muestra a contenido real del ministerio, sin alterar la arquitectura del
producto, las rutas ni las dependencias.

El ajuste de datos se acompañó de dos cambios mínimos en `assets/js/app.js`:
se amplió `typeLabel()` con los nuevos tipos de evento y se corrigió
`renderUpcomingEvents()` para que "Próximos encuentros" solo muestre eventos de hoy
en adelante (antes incluía eventos ya pasados). `data/repertoires.json` conservó su
repertorio de ejemplo renombrado a "Repertorio Ensayo", asociado a `evt-001`
(ensayo) para mantener la demo de repertorio; los cantos siguen siendo de ejemplo.

Reviewer y QA Playwright aprobaron el resultado. La deuda restante es menor y está
documentada.

| Iteración | Veredicto | Fallas |
|-----------|-----------|--------|
| 1 | APROBADO | Ninguna bloqueante; observaciones menores documentadas |

## Contexto y motivo

- **Motivo:** la POC usaba eventos ficticios de ejemplo. El ministerio necesitaba
  publicar su calendario real de compromisos de septiembre–octubre 2026 para que el
  sitio fuera útil a miembros, feligreses y público general.
- **Alcance de datos:** reemplazo completo del array de `data/events.json` (13 eventos
  publicados). No se modificaron `data/songs.json` ni la estructura/relaciones del
  modelo de datos.
- **Autorización:** los datos, incluidos títulos y referencias, fueron provistos y
  autorizados por el usuario antes de cargarlos.
- **Ajuste funcional derivado:** durante la verificación se detectó que la sección
  "Próximos encuentros" de la landing mostraba eventos ya pasados porque no filtraba
  por fecha. Se corrigió con un filtro mínimo (`date >= hoy`).
- **Ajuste de demostración:** el único repertorio de ejemplo se renombró a
  "Repertorio Ensayo" y se mantuvo asociado a `evt-001` (Ensayo) para conservar la
  demo de la vista `#/repertorio/:id`.

## Eventos cargados (13)

Fuente única de verdad: `data/events.json`. Todos con `status: "published"`.

| # | Fecha | Día | Título | Tipo | Hora | Lugar |
|---|-------|-----|--------|------|------|-------|
| 1 | 2026-09-28 | lunes | Ensayo | Ensayo | 19:00 | Parroquia San Daniel Comboni |
| 2 | 2026-09-29 | martes | Ensayo | Ensayo | 19:00 | Parroquia San Daniel Comboni |
| 3 | 2026-09-30 | miércoles | Ensayo | Ensayo | 19:00 | Parroquia San Daniel Comboni |
| 4 | 2026-10-02 | viernes | Misa 40 días por mamá de Hno Sergio | Misa | 14:00 | Parroquia San Daniel Comboni |
| 5 | 2026-10-03 | sábado | Encuentro Vicarial de Coros | Encuentro | 13:30 | Parroquia San Daniel Comboni |
| 6 | 2026-10-05 | lunes | Novena a San Daniel Comboni | Novena | 18:00 | Parroquia San Daniel Comboni |
| 7 | 2026-10-08 | jueves | Hora Santa y Octavo Día de la Novena | Hora Santa | 18:00 | Parroquia San Daniel Comboni |
| 8 | 2026-10-11 | domingo | Misas Dominicales | Misa | 06:30 | Parroquia San Daniel Comboni |
| 9 | 2026-10-18 | domingo | Preparación y Venta de Atol | Atol | 05:30 | Parroquia San Daniel Comboni |
| 10 | 2026-10-24 | sábado | Boda | Boda | 10:00 | Parroquia San Daniel Comboni |
| 11 | 2026-10-25 | domingo | Preparación y Venta de Atol | Atol | 05:30 | Parroquia San Daniel Comboni |
| 12 | 2026-10-25 | domingo | Una Tarde con el Corazón de Jesús | Tarde | 14:30 | Cantón Molineros, San Vicente |
| 13 | 2026-10-31 | sábado | Vigilia Juvenil | Vigilia | 18:00 | Parroquia Divina Providencia, San Vicente |

### Detalles adicionales registrados

- **evt-006 — Novena a San Daniel Comboni:** `description` "Inicio con el Santo
  Rosario."; vestimenta `Amarillo` (hombres y mujeres).
- **evt-007 — Hora Santa y Octavo Día de la Novena:** vestimenta `Blanco`.
- **evt-008 — Misas Dominicales:** `description` "Horarios: 6:30 a. m. y
  10:30 a. m. La misa de las 6:00 p. m. será apoyada por otro coro." El campo
  `time` registra `06:30`; el segundo horario vive en la descripción.
- **evt-013 — Vigilia Juvenil:** `description` "6:00 p. m. en adelante."; el campo
  `time` registra `18:00`.

## Cambios de código

Únicos dos cambios en `assets/js/app.js` (el resto del JS no se tocó):

| Cambio | Antes | Después |
|--------|-------|---------|
| `typeLabel()` (línea ~43) | Tipos base: `ensayo`, `misa`, `taller` | Se agregaron `encuentro` → "Encuentro", `novena` → "Novena", `horaSanta` → "Hora Santa", `atol` → "Atol", `boda` → "Boda", `tarde` → "Tarde", `vigilia` → "Vigilia" |
| `renderUpcomingEvents()` (línea ~472) | Renderizaba todos los eventos publicados ordenados | Filtra `e.date >= todayKey()` para que "Próximos encuentros" muestre solo eventos de hoy en adelante |

- `typeLabel()` alimenta el badge de tipo en la lista, el detalle y el calendario, por
  lo que los nuevos tipos se muestran correctamente en todas las vistas.
- El filtro usa `todayKey()` (fecha local del navegador) y conserva el estado vacío
  existente cuando no hay eventos futuros.
- No se modificó la lógica de orden, relaciones ni el resto del router.

## Ajuste del repertorio

- `data/repertoires.json`: el único repertorio pasó de un título genérico a
  **"Repertorio Ensayo"** y sigue asociado a `evt-001` (`eventId: "evt-001"`), que
  ahora corresponde al ensayo del 28 sep.
- Los cantos asociados (`song-001`, `song-002`) siguen siendo de ejemplo: la vista
  `#/repertorio/rep-001` permanece demostrable sin introducir datos reales de cantos.
- La relación `events.repertoireId` → `repertoires.id` → `repertoires.items[].songId`
  se mantiene íntegra.

## Verificación

Toda la verificación descrita fue ejecutada y aprobada por Reviewer y QA durante el
ciclo de cambio de datos (contexto provisto y confirmado). Este reporte la recoge;
no se re-ejecutó desde esta sesión de documentación por falta de herramienta de shell
(ver "Validadores").

### Reviewer — COMPLETE

- 13 eventos publicados renderizados en lista, calendario y vistas de detalle.
- Calendario de octubre con **9 días marcados** (2, 3, 5, 8, 11, 18, 24, 25 y 31).
- Detalle de evento correcto: badge de tipo, vestimenta, descripción y botón
  compartir.
- "Próximos encuentros" muestra solo eventos futuros tras el filtro `date >= hoy`.
- Defecto detectado en la verificación: "Próximos encuentros" incluía eventos
  pasados; resuelto con el filtro de `renderUpcomingEvents()`.
- JSON válidos y relaciones entre eventos, repertorios y cantos verificables.

### QA Playwright

- Navegación por `#/eventos`, `#/evento/:id`, `#/calendario` y `#/repertorio/:id`
  sin errores en consola en flujo normal.
- Badge de los nuevos tipos (`Encuentro`, `Novena`, `Hora Santa`, `Atol`, `Boda`,
  `Tarde`, `Vigilia`) con etiqueta legible.
- `data/events.json`, `data/songs.json` y `data/repertoires.json` parsean como JSON
  válido.
- Relaciones verificadas: `evt-001.repertoireId` → `rep-001` → `song-001`, `song-002`.

### Validadores

- `node scripts/validate-template.mjs` — **exit 0** según el ciclo aprobado. El
  modo visible (headed) de Playwright dejó de ser un estado temporal: es ahora la
  postura **permanente** por decisión explícita del usuario (commit `5be510c`).
  `--headless` es opcional en el validador (el default del template sigue siendo
  headless; el navegador visible está permitido por decisión explícita), y las
  demás guardas de Playwright —`--isolated`, `--block-service-workers` y allowlist
  `localhost`— permanecen obligatorias. Fuente de la postura documentada:
  `.opencode/instructions/mcp-policy.md` y `.opencode/docs/security-model.md`
  (secciones "Playwright" y "Excepción MCP").
- `node scripts/test-agent-fixtures.mjs` — exit 0 según el ciclo aprobado.
- **Nota de verificación:** esta sesión de documentación **no dispone de herramienta
  de shell**, por lo que no pudo re-ejecutar los validadores. Los enlaces internos de
  este reporte se verificaron manualmente contra el sistema de archivos.

## Deuda y observaciones

| # | Descripción | Severidad | Fuente |
|---|-------------|-----------|--------|
| 1 | `evt-004` incluye el título "Misa 40 días por mamá de Hno Sergio", con referencia a una persona real. Fue provisto y autorizado por el usuario; se marca como dato potencialmente sensible a reconsiderar antes de publicar de forma masiva o reutilizar. | BAJA (privacidad) | `data/events.json` |
| 2 | **RESUELTA** (Fase 10): los estados vacíos/error de las vistas dinámicas dentro de `#dynamic-view` ya no usan `<h3>`; ahora usan `<h1>` y, cuando la vista ya declara su `<h1>` de contenido, `<h2>` (p. ej. "Sin resultados"). Evidencia: `assets/js/app.js` (cambio de Fase 10). | BAJA (a11y/SEO) | `assets/js/app.js`, [`reporte-tecnico-final-rediseno-identidad.md`](reporte-tecnico-final-rediseno-identidad.md) |
| 3 | `evt-008` registra un único `time` (06:30); el segundo horario (10:30) vive en `description`, no como dato estructurado. Aceptado para POC; considerar múltiples horarios si el modelo evoluciona. | BAJA | `data/events.json` |
| 4 | Los cantos de `data/songs.json` siguen siendo de ejemplo; solo los eventos pasaron a datos reales. | Informativa | `data/songs.json` |

> **Nota (actualizada):** la antigua observación sobre Playwright sin `--headless`
> como deuda "pendiente de revertir" quedó **resuelta**: el modo visible (headed)
> es permanente por decisión del usuario (commit `5be510c`), con las guardas de
> aislamiento y allowlist localhost conservadas. No es deuda vigente.

## Veredicto

**APROBADO (con observaciones menores documentadas).** El cambio reemplaza los datos
ficticios por los 13 eventos reales del ministerio y mantiene la integridad del
modelo y de las rutas. Los dos ajustes de código son mínimos y acotados: etiquetas de
tipo ampliadas y filtro de eventos futuros que corrige un defecto real. La relación
con el repertorio de ejemplo queda preservada para la demo. Reviewer y QA Playwright
aprobaron; los JSON y las relaciones son válidos. La deuda restante es menor y está
documentada, con foco en la privacidad del título de `evt-004` y en la reutilización
futura de datos.

> Estado del reporte: **PARTIAL — pendiente de review** (documentación escrita por
> `base-docs`; requiere review independiente antes del cierre integral).
