---
status: configured
profile_version: 1
---

# Perfil del proyecto — Ministerio Renacer

Perfil configurado a partir de hechos verificados en el repositorio (producto
absorbido a la raíz) y en la documentación de `docs/`. Los agentes `base-*` y
las skills `special-*` de la línea base OpenCode gobiernan la operación; este
perfil aporta únicamente el contexto de dominio del producto.

## Identidad

- Nombre del proyecto: Ministerio Renacer
- Tipo de proyecto: web estática / POC
- Objetivo principal: plataforma pública de consulta de eventos, cantos y
  repertorios de un ministerio de música
- Usuarios principales: miembros del ministerio, feligreses y público general
- Estado: POC (Etapa 1 del plan; Fase 3 completada — ver "Estado del proyecto")

## Estado del proyecto

- Etapa actual: Etapa 1 — prueba de concepto estática (HTML/CSS/JS + JSON),
  según `docs/10-plan-implementacion.md`.
- Fase 3 — Eventos: completada (lista de eventos, detalle `#/evento/:id`,
  hash routing). Las vistas de landing (`#/inicio`, `#/nosotros`,
  `#/organizacion`, `#/contacto`) funcionan; `#/cantos` sigue siendo
  placeholder de landing hasta Fase 4. "Ver repertorio" es placeholder hasta
  Fase 5.
- Siguiente hito (solo si el usuario lo pide): Fase 4 — Cantos (biblioteca +
  buscador + detalle de canto). Las Fases 4-10 están fuera de alcance.
- Deuda técnica conocida (backlog, no resolver sin autorización):
  - Favicon: 404 en consola porque `index.html` no declara icono y el
    navegador pide `/favicon.ico` en la raíz; los iconos reales viven en
    `assets/img/` (`favicon.ico`, `favicon-512x512.png`).
  - Contraste WCAG AA insuficiente: badge `.event-date` blanco/sage 2.53:1
    (MEDIA) y texto hero blanco/sage 3.6:1 (BAJA), ambos en
    `assets/css/styles.css`. Evidencia: `docs/reports/reporte-tecnico-final-fase3-eventos.md`.

## Stack

- Lenguaje principal: HTML5, CSS3, JavaScript vanilla (ES6+, sin módulos ni
  bundler)
- Framework o librería principal: ninguno (prohibido en POC)
- Gestor de paquetes: ninguno (no hay `package.json` del producto; el runtime
  interno de `.opencode/` no cuenta como stack productivo)
- Base de datos: ninguna; los datos viven en `data/*.json` como fuente única
  de verdad
- Hosting / despliegue: estático. GitHub Pages preparado mediante workflow
  manual (`.github/workflows/pages.yml`), aún NO publicado
- Herramientas de diseño o UI: CSS variables, diseño mobile-first, paleta
  Sage + Durazno; Google Fonts DM Sans + Outfit cargadas por CDN desde
  `index.html` (única dependencia externa en runtime)
- Librerías críticas y versiones: 0 dependencias npm en el producto

## Comandos

- Instalar dependencias: no aplica (producto sin npm ni build)
- Ejecutar local: `python -m http.server 8080` y abrir
  `http://localhost:8080` (comando documentado en `docs/02-plan-poc-html-css-js.md`
  y `docs/10-plan-implementacion.md`; sirve cualquier servidor estático, no
  hay build step)
- Tests: no hay suite automatizada del producto; revisión manual + consola
  del navegador; Playwright MCP cuando esté habilitado
- Lint: no aplica al producto
- Build: no aplica (no hay build step)
- Formateo: no aplica al producto
- Despliegue: GitHub Actions manual — `.github/workflows/pages.yml`
  (`workflow_dispatch`); no ejecutado, requiere decisión del usuario
- Validación de infraestructura OpenCode (tras cambios en `.opencode/` o
  perfiles): `node scripts/validate-template.mjs` y
  `node scripts/test-agent-fixtures.mjs`

## Estructura importante

```txt
ministerio-renacer/            # raíz del repo = producto + línea base
├── index.html                 # shell principal (español, hash routing)
├── assets/
│   ├── css/styles.css         # todos los estilos
│   ├── js/app.js              # todo el JS (rutas, fetch, render)
│   └── img/                   # LogoNuevoRenacer.png, favicon-512x512.png, favicon.ico
├── data/                      # fuente única de verdad del contenido
│   ├── events.json            # eventos (fechas YYYY-MM-DD, horas HH:mm)
│   ├── songs.json             # cantos
│   └── repertoires.json       # repertorios (referencia songId)
├── docs/                      # documentación absorbida (00-10 + reports/)
├── .opencode/                 # infraestructura OpenCode base (no es producto)
├── .agents/skills/            # skills externas auditadas (no es producto)
├── Proyecto Actual/           # respaldo local del proyecto previo; gitignored
└── scripts/                   # validación estructural de la línea base
```

## Fuentes de verdad

- Requisitos (PRD): `docs/05-prd-requerimientos-producto.md`
- Requerimientos técnicos (TRD): `docs/06-trd-requerimientos-tecnicos.md`
- Diseño / UI: `docs/07-brief-diseno-ui-ux.md`
- Flujo / navegación: `docs/08-app-flow.md`
- Plan / roadmap por fases: `docs/10-plan-implementacion.md`
- Datos: `data/*.json` (fuente única de verdad del contenido; relaciones:
  `events.repertoireId` → `repertoires.id` → `songs.songId`)
- Contexto y resumen: `docs/00-concepto-general.md`,
  `docs/02-plan-poc-html-css-js.md`, `docs/03-resumen-ejecutivo.md`
- Histórico operativo (NO vigente como regla): `docs/04-guia-agentes-skills-mcps.md`
  describe agentes `ministerio-*` y skills `poc-*`/`static-frontend`/
  `json-content` del proyecto previo; fueron reemplazados por la línea base
  `base-*` + `special-*`. Consultar solo como contexto.
- Referencia futura NO implementada en la POC: `docs/01-viabilidad-tecnica.md`
  y `docs/09-esquema-backend.md` (arquitectura moderna Next.js/React +
  Supabase / backend; no construir ahora).
- Documentación externa (Context7): no aplica al stack vanilla del producto;
  usar solo para infraestructura OpenCode o skills externas.

## Restricciones

- No usar: React, Angular, Vue, Next.js, Vite, Tailwind o Bootstrap
  obligatorios; tampoco backend, login, base de datos, Supabase, Firebase,
  PDF ni transposición de acordes (alcance POC).
- No implementar ahora: Fases 4-10 del roadmap (`docs/10-plan-implementacion.md`);
  GitHub Pages permanece preparado y sin publicar.
- No modificar: `ALMA.md` (prohibido por política), `opencode.json` raíz
  (decisión del usuario), código del producto (`index.html`, `assets/`,
  `data/`) por agentes de documentación, ni `.github/workflows/pages.yml`.
- No borrar: `Proyecto Actual/` (respaldo local no versionado).
- Requiere aprobación antes de: instalar dependencias, cambios de
  arquitectura, borrar archivos, activar/ejecutar el despliegue de Pages,
  commit y push, o reabrir decisiones ya tomadas (git sobre línea base, sin
  agentes de dominio).
- Convenciones de nombres: IDs técnicos en inglés simple (`evt-001`,
  `rep-001`, `songId`); fechas `YYYY-MM-DD`; horas `HH:mm`; contenido visible
  en español primero; JSON sin comas finales.
- Convenciones de commits: formato convencional `tipo(alcance): descripción`
  (histórico del proyecto previo); nuevos commits solo sobre la línea base y
  con autorización explícita.
- Compatibilidad mínima: navegadores modernos, hosting estático, sin build.

## Calidad esperada

- Criterios de aceptación: sin errores de consola en flujo normal (backlog
  conocido: favicon 404); navegación funcional entre todas las vistas;
  mobile-first sin scroll horizontal; JSON válido con relaciones verificables
  entre eventos, repertorios y cantos; estados vacíos y de error claros.
- Navegadores/entornos objetivo: navegadores modernos (Chrome, Edge, Safari,
  Firefox); servidor local o hosting estático.
- Requisitos de accesibilidad: HTML semántico, `alt` en imágenes, skip link,
  foco visible, contraste suficiente (backlog: dos contrastes por debajo de
  WCAG AA — ver "Estado del proyecto").
- Requisitos de seguridad: sin secretos ni credenciales en el repo; no
  incluir datos personales reales del ministerio; Gitleaks al estar
  disponible (ver `.opencode/docs/security-model.md`).
- Requisitos de rendimiento: sitio estático ligero; sin scroll horizontal en
  móvil.
- Prueba mínima antes de terminar: servir localmente y revisar consola;
  tras cambios de perfil o infraestructura OpenCode, ejecutar
  `node scripts/validate-template.mjs` y
  `node scripts/test-agent-fixtures.mjs`.

## Datos sensibles

- Dónde podrían existir secretos: `.env`, llaves y credenciales (protegidos
  por la política de seguridad base); el producto no maneja secretos.
- Archivos que nunca deben compartirse: `.env*`, `*.pem`, `*.key`,
  credenciales; `Proyecto Actual/` está gitignored como respaldo local y no
  debe versionarse.
- Datos personales que deben protegerse: no incluir datos personales reales
  de miembros del ministerio ni inventar eventos reales sin autorización del
  usuario. Los datos actuales en `data/*.json` son ficticios/ejemplo y deben
  seguir siéndolo hasta que el usuario decida lo contrario.

## Flujo de trabajo preferido

- Planificar antes de construir: sí
- Investigar con Context7 cuando haya librerías/APIs: no aplica al stack
  vanilla; permitido para documentación de infraestructura o skills externas
- Commits automáticos: no; solo con solicitud explícita del usuario
- Documentar decisiones: sí
- Auditoría obligatoria antes de finalizar: sí (Reviewer independiente;
  Security cuando aplique autenticación, red o datos sensibles)
