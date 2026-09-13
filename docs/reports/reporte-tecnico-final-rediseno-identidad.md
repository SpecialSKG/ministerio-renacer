# Reporte Técnico Final — Rediseño de identidad visual

> **Generado:** 2026-09-12
> **Proyecto:** Ministerio Renacer
> **Stack:** HTML/CSS/JS/JSON estático
> **Iteración:** 1 de 1
> **Veredicto final:** APROBADO (con deuda menor documentada)

## Resumen del ciclo

Se rediseñó la identidad visual del sitio principal portando el lenguaje del
prototipo ganador `prototypes/template7/` a la arquitectura del producto
(`index.html`, `assets/css/styles.css`, `assets/js/app.js`). El cambio introduce un
sistema de tema claro/oscuro con persistencia, un nuevo par tipográfico
(Fraunces + Karla), eventos en filas, un calendario mensual navegable como sección
de landing y una landing de una sola página con anclas. Las vistas dinámicas ya
existentes se preservaron y adaptaron al nuevo sistema de tokens. El producto final
versionado no incluye el panel de enlaces de prueba a los prototipos: fue una
utilidad temporal usada durante el desarrollo y quedó fuera de HEAD.

El porte fue aprobado por Reviewer y Security, con QA de contraste, responsive y
validadores estructurales. No se agregaron dependencias ni se modificaron
`data/*.json`, la arquitectura ni la lógica de datos.

| Iteración | Veredicto | Fallas |
|-----------|-----------|--------|
| 1 | APROBADO | Ninguna bloqueante; deuda menor documentada |

## Contexto y decisión

- **Entrevista de intención:** antes de maquetar se aclaró el objetivo del rediseño
  (identidad propia y cálida del ministerio, legibilidad y coherencia entre temas)
  en lugar de asumir una estética desde el inicio.
- **Exploración de prototipos:** se construyeron seis direcciones visuales aisladas
  (`prototypes/template1/` … `prototypes/template6/`) más experimentos
  tipográficos (`prototypes/font-picker/`, `font-finalistas/`, `font-cruzadas/`,
  `font-picker-hibridos/`). Los prototipos viven en `prototypes/`, carpeta
  gitignored: no forma parte del producto y no debe importarse desde él.
- **Fusión T1 + T6:** de la comparación se fusionaron la dirección T1 (base cálida y
  tipografía con carácter) y la dirección T6 (tratamiento oscuro y acentos vivos).
  Esa fusión se consolidó en `template7`, declarado prototipo ganador y portado a la
  arquitectura del producto.
- **Elección tipográfica:** Fraunces para títulos (variable óptica `opsz` y cursivas
  para énfasis) y Karla para cuerpo. Reemplazan al par anterior DM Sans + Outfit,
  que se percibía genérico y no aportaba el carácter editorial buscado.
- **Decisión de tema:** además del tema claro, se adoptó un tema oscuro con identidad
  propia (no un simple inverso), con toggle manual, persistencia y respeto por la
  preferencia del sistema.

## Sistema de tema claro/oscuro

El tema se define con tokens CSS en `assets/css/styles.css`:

- **Tema claro (`:root`):** base beige/crema `#F7F1E6`, superficies claras, tinta
  cálida, terracota `#B05A3A` y oliva `#5B6746`.
- **Tema oscuro (`:root[data-theme="dark"]`):** base navy `#050B20`, tinta clara,
  acento cian `#7FD8E8` y dorado `#E8C07A`.
- Los mismos nombres de token se reutilizan en ambos temas (`--bg`, `--surface`,
  `--ink`, `--grad-a`, `--cal-selected-bg`, etc.), de modo que los componentes no
  duplican estilos por tema.
- **Fallback sin JS:** `@media (prefers-color-scheme: dark)` sobre
  `:root:not([data-theme])` conserva el tema oscuro si JavaScript está desactivado.
- **Persistencia:** la elección se guarda en `localStorage` con la clave `mr-theme`.
- **Anti-flash:** un script inline en el `<head>` de `index.html` resuelve el tema
  (almacenado → preferencia del sistema → claro) y escribe `data-theme` antes del
  render, evitando el destello de tema incorrecto.
- **`theme-color` sincronizado:** el `<meta name="theme-color">` se fija a `#F7F1E6`
  (claro) o `#050B20` (oscuro) tanto en el arranque como al cambiar de tema.
- **Toggle accesible:** `#theme-toggle` expone `aria-pressed` y `aria-label`
  dinámicos ("Cambiar a tema oscuro" / "Cambiar a tema claro").

## Tipografía

- **Fraunces** (`--font-display`, con fallback Georgia / serif) para títulos y
  énfasis, apoyada en su eje óptico (`opsz`) y en cursivas para palabras destacadas
  con degradado.
- **Karla** (`--font-body`, con fallback system-ui / sans-serif) para cuerpo y UI.
- Ambas se sirven localmente desde `assets/fonts/` (self-hosting): seis archivos
  `.woff2` declarados con `@font-face` en `assets/css/styles.css` (latin y
  latin-ext de cada familia, más las itálicas de Fraunces), con
  `font-display: swap`. La licencia SIL OFL 1.1 acompaña a los archivos en
  `assets/fonts/OFL.txt`.
- `index.html` ya no usa `preconnect` ni `<link>` a Google Fonts: el producto no
  tiene dependencias externas en runtime.
- Se retiraron las variables y referencias a DM Sans + Outfit.

## Componentes

- **Header:** marca "Renacer" con glifo SVG y degradado, toggle de tema y navegación
  responsive con menú móvil (Escape cierra y devuelve el foco).
- **Hero:** título con degradado y énfasis en cursiva, subtítulo y CTAs, más capa
  decorativa de aurora con tres orbes (sutil en claro, inmersiva en oscuro) y onda
  SVG inferior.
- **Landing por secciones:** `#/inicio`, `#/nosotros`, `#/organizacion`,
  `#/eventos`, `#/calendario`, `#/cantos` y `#/contacto`, con eyebrows, títulos y
  notas de sección.
- **Eventos próximos en filas:** cada evento se presenta como fila con bloque de
  fecha (día + mes), contenido y flecha, en reemplazo del layout en columnas/cards.
- **Calendario mensual navegable:** grilla con `role="group"`, navegación
  mes anterior/siguiente, título con `role="status"` y `aria-live`, marca de días
  con eventos, selección de día y detalle con `aria-live`.
- **Biblioteca de cantos:** listado con buscador y estados vacíos.
- **Contacto:** CTA de correo con onda decorativa SVG.
- **Footer:** marca, líneas informativas y meta.
- **Botón flotante "volver arriba":** preservado (`#back-to-top`, 48×48px,
  `hidden` inicial, visible tras scroll, respeta reduced-motion).

## Vistas preservadas y adaptadas

| Ruta | Estado | Nota |
|------|--------|------|
| `#/inicio` | Adaptada | Landing por secciones del rediseño |
| `#/nosotros`, `#/organizacion`, `#/contacto` | Adaptadas | Secciones de landing con anclas |
| `#/eventos` | Preservada y adaptada | Lista completa de eventos |
| `#/evento/:id` | Preservada y adaptada | Incluye bloque de repertorio |
| `#/cantos` | Preservada y adaptada | Biblioteca con buscador |
| `#/canto/:id` | Preservada y adaptada | Letra y acordes |
| `#/repertorio/:id` | Preservada y adaptada | Cantos asociados en orden |

El hash routing, el manejo de vista dinámica (`#dynamic-view`) y la lógica de datos
no se alteraron; las vistas solo se ajustaron al nuevo sistema de tokens y
tipografía.

## Panel de enlaces de prueba durante el desarrollo

Durante el desarrollo se usó un panel temporal de enlaces de prueba a los
prototipos. Esa utilidad no forma parte del producto final versionado: el término
"Laboratorio de pruebas" no aparece en HEAD ni en el working tree, por lo que no es
verificable como un retiro de código versionado. El producto final simplemente no
contiene enlaces a prototipos; esto no afecta rutas, datos ni estilos activos.

## Medidas / cambios clave

| Aspecto | Antes | Después |
|---------|-------|---------|
| Tipografía | DM Sans + Outfit | Fraunces + Karla |
| Tema | Solo claro | Sistema claro/oscuro con `data-theme` |
| Persistencia de tema | No existía | `localStorage` con clave `mr-theme` |
| Preferencia del sistema | No aplicaba | `prefers-color-scheme` + fallback sin JS |
| Paleta clara | Sage + Durazno | Beige/crema `#F7F1E6`, terracota, oliva |
| Paleta oscura | No existía | Navy `#050B20`, cian `#7FD8E8`, dorado `#E8C07A` |
| Eventos en landing | Columnas / cards | Filas con fecha día+mes |
| Calendario | No existía | Calendario mensual navegable con detalle |
| Header | Marca sin toggle de tema | Marca + toggle sol/luna |
| `theme-color` | No sincronizado | Sincronizado con el tema resuelto |
| Enlaces de prueba a prototipos | Utilidad temporal de desarrollo | No incluidos en el producto final versionado |

## Verificación

### Reviewer — COMPLETE

- `role="grid"` del calendario corregido a `role="group"`.
- Scroll bajo `prefers-reduced-motion`: la landing usa `behavior: 'auto'`
  (`showLanding`) y el botón flotante usa `behavior: 'instant'`.
- `theme-color` inicial verificado.
- Limpieza de CSS muerto del sistema anterior.
- Vistas dinámicas adaptadas sin romper el flujo.

### Security — COMPLETE (riesgo bajo)

- Sin XSS: se preservó `escapeHTML` en la interpolación de datos.
- `localStorage` validado (solo se aceptan `"dark"`/`"light"`; el resto cae a claro).
- Sin dependencias nuevas ni secretos. La dependencia externa de Google Fonts
  quedó eliminada después del rediseño: las tipografías se sirven localmente
  desde `assets/fonts/` (self-hosting con licencia SIL OFL 1.1).
- Validadores con exit 0 durante la auditoría.

### QA

- **Contraste WCAG AA en ambos temas:** mínimo 4.83:1 en claro y 7.66:1 en oscuro.
  Esto resuelve la deuda previa de contraste (badge `.event-date` 2.53:1 y hero
  3.6:1) reportada en
  [`reporte-tecnico-final-fase3-eventos.md`](reporte-tecnico-final-fase3-eventos.md).
- **Responsive:** 320px y 375px sin scroll horizontal.
- **Accesibilidad preservada:** skip link, `aria-current`, `aria-live` en calendario
  y detalle, foco visible, reduced-motion y estados vacíos.
- **Consola:** sin errores en flujo normal; el favicon ya está declarado en
  `index.html` (`assets/img/favicon.ico` y `apple-touch-icon`), por lo que el 404
  conocido quedó resuelto.

### Validadores

- `node scripts/validate-template.mjs` — exit 0 (comprueba, entre otras cosas, los
  enlaces internos Markdown).
- `node scripts/test-agent-fixtures.mjs` — exit 0.
- **Nota de verificación:** ambos resultados provienen del ciclo de porte aprobado
  por Reviewer y Security. Esta sesión de documentación no dispone de herramienta de
  shell, por lo que no pudo re-ejecutarlos. Los enlaces internos de este reporte se
  verificaron manualmente contra el sistema de archivos.

## Hallazgos y su resolución

| # | Hallazgo | Severidad | Resolución |
|---|----------|-----------|------------|
| 1 | `role="grid"` sin semántica completa en el calendario | MEDIA | Corregido a `role="group"` |
| 2 | Scroll animado bajo reduced-motion | BAJA | Resuelto: la landing usa `behavior: 'auto'` (`showLanding`) y el botón flotante usa `behavior: 'instant'` |
| 3 | `theme-color` no reflejaba el tema inicial | BAJA | Sincronizado en el script anti-flash y en el toggle |
| 4 | CSS muerto del sistema anterior | BAJA | Eliminado |
| 5 | Vistas dinámicas con tokens del diseño previo | MEDIA | Adaptadas al nuevo sistema |

## Deuda restante

> **Resueltas desde la emisión original del reporte** (se conservan aquí para
> trazabilidad):
> - **Self-hosting de tipografías:** Fraunces y Karla se sirven desde
>   `assets/fonts/` (6 `.woff2` + `OFL.txt`, licencia SIL OFL 1.1) y `index.html`
>   ya no enlaza Google Fonts; sin dependencias externas de fuentes en runtime.
>   Evidencia: `index.html`, `assets/css/styles.css`, `assets/fonts/`.
> - **`<h1>` en vistas dinámicas:** `#/eventos`, `#/evento/:id`, `#/cantos`,
>   `#/canto/:id` y `#/repertorio/:id` ya declaran su `<h1>` propio; la landing
>   conserva el suyo en el hero. Evidencia: `assets/js/app.js`.

| # | Descripción | Severidad | Fuente |
|---|-------------|-----------|--------|
| 1 | `:active` del botón flotante no anulado por reduced-motion (aceptado: feedback directo) | BAJA | `reporte-tecnico-final-fase6-pulido-ui-ux.md` |
| 2 | Solapamiento potencial botón/footer en 320px (cosmético) | BAJA | `reporte-tecnico-final-fase6-pulido-ui-ux.md` |
| 3 | `text-wrap` requiere navegadores modernos (degradación elegante) | BAJA | `reporte-tecnico-final-fase6-pulido-ui-ux.md` |
| 4 | Fases 8-10 del roadmap no ejecutadas (despliegue, validación con usuarios, ajustes) | — | [`../10-plan-implementacion.md`](../10-plan-implementacion.md) |
| 5 | Estados vacíos/error de las vistas dinámicas usan `<h3>` en lugar de `<h1>` dentro de `#dynamic-view` (preexistente; cada vista ya declara su `<h1>` de contenido) | BAJA (a11y/SEO) | `assets/js/app.js` |

## Veredicto

**APROBADO.** El rediseño porta la identidad del prototipo ganador a la
arquitectura del producto sin alterar datos, rutas ni dependencias: introduce un
sistema de tema claro/oscuro con persistencia y respeto por la preferencia del
sistema, un nuevo par tipográfico, eventos en filas, un calendario navegable y una
landing por secciones, preservando las vistas dinámicas y la accesibilidad. Reviewer,
Security y QA aprobaron; los contrastes cumplen AA en ambos temas y el favicon quedó
resuelto. La deuda restante es menor y está documentada.

> Estado del reporte: **PARTIAL — pendiente de review** (documentación escrita por
> `base-docs`; requiere review independiente antes del cierre integral).
