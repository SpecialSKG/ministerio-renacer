# Ministerio Renacer

Static proof-of-concept website for a music ministry. Vanilla HTML/CSS/JS, no framework, no backend.

## Entrypoints

- `index.html` — main page shell
- `assets/css/styles.css` — all styles (CSS variables, mobile-first)
- `assets/js/app.js` — all JS
- `data/*.json` — events, songs, repertoires

## Data

JSON files in `data/` are the source of truth for content. Validated by `json-content` skill. No trailing commas; dates `YYYY-MM-DD`, times `HH:mm`.

## Development

- No build step. Open `index.html` directly or serve with any static server.
- Mobile-first responsive CSS.
- Keep JS vanilla — no frameworks, no bundler, no npm.

## Testing

- `webapp-testing` skill (Playwright via MCP) for browser-level checks.
- `poc-qa` skill provides the QA checklist (console errors, JSON loading, mobile, contrast, alt text).

## Deployment

Static hosting — GitHub Pages or Cloudflare Pages. No build, just push.

## Available Skills (`.opencode/agents/skills/`)

| Skill | Use when |
|---|---|
| `static-frontend` | Building HTML/CSS/JS pages |
| `json-content` | Creating/editing data JSON files |
| `poc-planner` | Scoping work phases |
| `poc-qa` | QA before marking tasks done |
| `frontend-design` | Visual/aesthetic direction |
| `web-design-guidelines` | UI/UX and accessibility review |
| `webapp-testing` | Browser testing with Playwright |
| `seo-audit` | SEO review |
| `github-actions-docs` | CI/CD workflows |
