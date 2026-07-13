# Ministerio Renacer

Static POC website for a music ministry. Vanilla HTML/CSS/JS, no backend.

## Entrypoints

- `index.html` — main shell
- `assets/css/styles.css` — all styles (CSS variables, mobile-first)
- `assets/js/app.js` — all JS
- `data/*.json` — events, songs, repertoires

## Constraints

- No build step. Open `index.html` directly or serve any static server.
- No frameworks, no bundler, no npm, no backend, no login, no database, no PDF.
- Spanish-first naming and content.
- JSON in `data/` is the single source of truth. Dates `YYYY-MM-DD`, times `HH:mm`, no trailing commas.

## Reference docs (`docs/`)

Consult these before major work:

| File | When to read |
|---|---|
| `docs/05-prd-requerimientos-producto.md` | Product requirements |
| `docs/06-trd-requerimientos-tecnicos.md` | Technical requirements |
| `docs/07-brief-diseno-ui-ux.md` | Design brief |
| `docs/08-app-flow.md` | App navigation flow |
| `docs/04-guia-agentes-skills-mcps.md` | Agent/skill/MCP setup |
| `docs/09-esquema-backend.md` | Future backend architecture |
| `docs/10-plan-implementacion.md` | Implementation plan |

## Sub-agents (`.opencode/agents/`)

| Agent | Edits | Use for |
|---|---|---|
| `ministerio-planner` | None (read-only) | Scoping, breaking ideas into tasks |
| `ministerio-researcher` | None (read-only) | Researching external docs, APIs, patterns |
| `ministerio-builder` | `index.html`, `assets/`, `data/*.json`, docs | Building/modifying pages |
| `ministerio-reviewer` | `docs/reports/*audit*.md` (ask) | QA before marking done |
| `ministerio-docs` | `docs/**`, `README.md` (ask) | Maintaining documentation |

## Project skills (`.opencode/skills/`)

- `static-frontend` — build HTML/CSS/JS pages
- `json-content` — maintain event/song/repertoire JSON data
- `poc-planner` — break work into phases
- `poc-qa` — QA checklist (console errors, JSON loading, mobile, contrast, alt text, songId resolution, no horizontal scroll, no sensitive data)

External skills in `.agents/skills/` (design, testing, SEO, animations). Listed in `skills-lock.json`.

## Testing

- `webapp-testing` skill (Playwright via MCP) for browser checks.

## Local server

```bash
python -m http.server 8080
# → http://localhost:8080
```

## Deployment

Static hosting — GitHub Pages or Cloudflare Pages. No build, just push.
