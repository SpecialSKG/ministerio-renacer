# Ministerio Renacer

Plataforma pública de consulta de eventos, cantos y repertorios de un
ministerio de música. Web estática (POC) en HTML5, CSS3 y JavaScript vanilla,
con los datos en archivos JSON como fuente única de verdad. Sin framework,
sin backend, sin build y sin dependencias npm.

La raíz de este repositorio contiene el **producto** y, además, la
**infraestructura OpenCode** (línea base) que gobierna cómo se trabaja en el
proyecto. Ambas se describen abajo por separado.

## Qué es

Ministerio Renacer es una prueba de concepto para validar la utilidad de una
plataforma pública antes de decidir una versión moderna. Los miembros del
ministerio, feligreses y público general pueden consultar:

- **Landing pública** con presentación, organización y próximos eventos.
- **Eventos** (`#/eventos`): lista desde `data/events.json`, ordenada por
  fecha, con detalle por evento (`#/evento/:id`).
- **Cantos** (`#/cantos`): placeholder de landing hasta la Fase 4 del roadmap.

El estado del proyecto y su roadmap por fases están en
[`docs/10-plan-implementacion.md`](docs/10-plan-implementacion.md). La Fase 3
(Eventos + hash routing) está completada; el siguiente hito sería la Fase 4
(Cantos), fuera de alcance hasta que el usuario lo pida.

## Stack

- **Lenguaje:** HTML5, CSS3, JavaScript vanilla (ES6+, sin módulos ni bundler).
- **Framework:** ninguno (prohibido en la POC).
- **Datos:** `data/*.json` como fuente única de verdad
  (`events.json`, `songs.json`, `repertoires.json`; relación:
  `events.repertoireId` → `repertoires.id` → `songs.songId`).
- **Diseño:** CSS variables, mobile-first, paleta Sage + Durazno; Google Fonts
  DM Sans + Outfit por CDN (única dependencia externa en runtime).
- **Hosting / despliegue:** estático. GitHub Pages preparado, aún no publicado
  (ver [Despliegue](#despliegue-github-pages-preparado-no-publicado)).

## Ejecutar localmente

No hay build ni instalación. Cualquier servidor estático sirve la raíz:

```powershell
python -m http.server 8080
# abrir http://localhost:8080
```

Verificación mínima: abrir en un navegador moderno y revisar la consola.

## Estructura del repositorio

```txt
ministerio-renacer/
├── index.html                 # shell principal (español, hash routing #/ruta)
├── assets/
│   ├── css/styles.css         # todos los estilos
│   ├── js/app.js              # rutas, fetch de JSON y render
│   └── img/                   # LogoNuevoRenacer.png, favicon-512x512.png, favicon.ico
├── data/                      # fuente única de verdad del contenido (JSON)
├── docs/                      # documentación del producto (00-10 + reports/)
├── .opencode/                 # infraestructura OpenCode (no es producto)
├── .agents/skills/            # skills externas auditadas (no es producto)
├── Proyecto Actual/           # respaldo local no versionado (gitignored)
├── scripts/                   # validación estructural de la línea base
├── AGENTS.md                  # reglas base para OpenCode en este repo
└── opencode.json              # configuración de OpenCode (no modificar sin el usuario)
```

La documentación absorbida del producto vive en [`docs/`](docs/README.md), con
índice en `docs/README.md`.

## Documentación del producto

- Requisitos: [`docs/05-prd-requerimientos-producto.md`](docs/05-prd-requerimientos-producto.md)
- Requerimientos técnicos: [`docs/06-trd-requerimientos-tecnicos.md`](docs/06-trd-requerimientos-tecnicos.md)
- Diseño / UI: [`docs/07-brief-diseno-ui-ux.md`](docs/07-brief-diseno-ui-ux.md)
- Flujo / navegación: [`docs/08-app-flow.md`](docs/08-app-flow.md)
- Plan / roadmap: [`docs/10-plan-implementacion.md`](docs/10-plan-implementacion.md)
- Reportes técnicos y de iteración: [`docs/reports/`](docs/reports/)

## Despliegue — GitHub Pages (preparado, no publicado)

El despliegue está **preparado pero no activo**: existe el workflow
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) con disparo
únicamente manual (`workflow_dispatch`); no se activa por push ni schedule.
No se ha ejecutado.

Para publicar cuando el usuario lo autorice:

1. **Ajustes del repositorio en GitHub:** Settings → Pages → Source =
   **GitHub Actions** (no "Deploy from a branch").
2. **Ejecutar el workflow manualmente:** Actions → *Deploy static site to
   GitHub Pages* → Run workflow (rama `main` o la deseada).
3. Verificar la URL pública que GitHub indique en Settings → Pages.

Nota: `Proyecto Actual/` es respaldo local del proyecto previo y está
gitignored; nunca debe versionarse ni incluirse en el despliegue (el workflow
publica la raíz, por lo que ese respaldo debe permanecer fuera del repo o
excluirse explícitamente antes de activar Pages).

---

# Infraestructura OpenCode (línea base)

El repositorio incluye un template reutilizable y seguro para trabajar con
OpenCode: identidad, agentes especializados, skills, comandos, permisos, MCP
opt-in y validación. Esta sección conserva la información esencial; los
detalles viven en `.opencode/docs/`.

## Agentes

| Agente | Modo | Rol | Edita |
|---|---|---|---|
| `@base-orchestrator` | `primary` | Coordina y delega proporcionalmente | No |
| `@base-planner` | `subagent` | Descubre, diagnostica y planifica | No |
| `@base-researcher` | `subagent` | Consulta documentación externa | No |
| `@base-builder` | `subagent` | Implementa y verifica inicialmente | Sí, salvo secretos y ALMA |
| `@base-reviewer` | `subagent` | Audita calidad y regresiones | No |
| `@base-docs` | `subagent` | Mantiene README, perfil y docs | Solo documentación autorizada |
| `@base-security` | `subagent` | Audita amenazas y controles | No |

Solo `base-orchestrator` puede lanzar subagentes y delegar. Un especialista que
necesita otra capacidad devuelve un `handoff_request`; no existe delegación
lateral. La matriz completa está en `.opencode/docs/agent-hierarchy.md`.

## Skills

- **Propias (`special-*`, en `.opencode/skills/`):** descubrimiento,
  implementación segura y commits autorizados, revisión de código, auditoría
  de seguridad, documentación y reportes, calidad frontend contextual, datos
  estructurados, consulta de documentación con Context7 y creación/evolución
  de skills. Detalle en `.opencode/docs/`.
- **Externas auditadas (`.agents/skills/`):** bibliotecas de diseño,
  animación, testing y otras, fijadas por revisión. OpenCode anuncia solo sus
  metadatos y carga el cuerpo al seleccionarlas. Consulta versiones, licencias
  y routing en `.opencode/docs/external-skills.md`.

## Flujo de trabajo y puertas de calidad

```text
Comprender → Descubrir → Planificar → Implementar → Verificar
→ Revisar → Auditar seguridad si aplica → Documentar
```

- Todo cambio de archivos pasa por Reviewer independiente; si toca
  autenticación, secretos, permisos, dependencias, MCP, red, entrada no
  confiable o datos sensibles, pasa también por Security.
- Un especialista que edita archivos al ser invocado directamente devuelve
  `PARTIAL — pendiente de review`; solo Orchestrator cierra el resultado.
- Comandos: `/plan`, `/discover`, `/build`, `/audit`, `/secure`, `/context7`,
  `/docs`, `/profile`, `/alma-proposal` (todos entran por Orchestrator).
- ALMA (`ALMA.md`) define la identidad de Special y no es editable por
  agentes; sus evoluciones se preparan como propuestas en
  `.opencode/proposals/alma/`.

## MCP y sharing

Context7, Playwright y sharing están **deshabilitados por defecto**. Se
habilitan de forma explícita y mínima cuando la tarea lo requiere (ver
`.opencode/docs/` y `mcp-policy`). No se envían secretos ni datos del proyecto
a servicios externos sin autorización.

## Comandos útiles

Validación estructural tras cambios en `.opencode/`, perfiles o agentes:

```powershell
node scripts/validate-template.mjs
node scripts/test-agent-fixtures.mjs
```

Auditoría de secretos cuando Gitleaks esté disponible:

```powershell
gitleaks git --redact --verbose
gitleaks dir --redact --verbose .
```

## Referencias de la línea base

- `.opencode/docs/architecture.md`
- `.opencode/docs/agent-hierarchy.md`
- `.opencode/docs/security-model.md`
- `.opencode/docs/compatibility.md`
- `.opencode/docs/personal-mcp.md`
- `.opencode/docs/external-skills.md`
- `AGENTS.md` — reglas base del proyecto
- `CHANGELOG.md` — cambios del template base
