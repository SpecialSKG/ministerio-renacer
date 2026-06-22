# Ministerio Renacer

POC estática para un ministerio de música. HTML/CSS/JS puro, sin framework, sin backend y sin login en etapa 1.

## Entrypoints

- `index.html` — shell principal.
- `assets/css/styles.css` — estilos globales, variables CSS y responsive.
- `assets/js/app.js` — lógica de carga, navegación y render.
- `data/events.json` — eventos.
- `data/songs.json` — cantos.
- `data/repertoires.json` — repertorios.

## Reglas de alcance

- POC = HTML, CSS, JS, JSON y Markdown.
- No agregar React, Angular, Next, Vue, Supabase, Firebase, Node backend, login, PDF o transposición salvo instrucción explícita.
- Si una idea pertenece a la etapa moderna, dilo y no la implementes en la POC.

## Documentación

Leer según la tarea:

- Producto: `docs/05-prd-requerimientos-producto.md`
- Técnica: `docs/06-trd-requerimientos-tecnicos.md`
- Diseño: `docs/07-brief-diseno-ui-ux.md`
- Flujo: `docs/08-app-flow.md`
- Backend futuro: `docs/09-esquema-backend.md`
- Implementación: `docs/10-plan-implementacion.md`
- Agentes/skills/MCPs: `docs/04-guia-agentes-skills-mcps.md`

## Skills

Skills principales:

- `poc-planner`
- `static-frontend`
- `json-content`
- `poc-qa`

Skills de apoyo:

- `frontend-design`
- `web-design-guidelines`
- `webapp-testing`
- `seo-audit`
- `github-actions-docs`

`.opencode/agents/skills/` es la ruta principal. `.agents/skills/` debe tratarse como biblioteca externa de referencia visual.

## MCP

Playwright MCP está habilitado para pruebas de navegador.

Servidor local:

```bash
python -m http.server 8080
```

URL:

```txt
http://localhost:8080
```

## QA mínimo

Antes de marcar listo:

- Sin errores de consola.
- JSON válido.
- Eventos cargan.
- Cantos cargan.
- Repertorios resuelven `songId`.
- Funciona en móvil.
- No hay scroll horizontal.
- Links internos funcionan.
- No hay datos sensibles.
