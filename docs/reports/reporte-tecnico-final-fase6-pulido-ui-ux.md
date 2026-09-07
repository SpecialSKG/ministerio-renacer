# Reporte Técnico Final — Fase 6: Pulido UI/UX

> **Generado:** 2026-09-06
> **Proyecto:** Ministerio Renacer
> **Stack:** HTML/CSS/JS/JSON estático
> **Iteración:** 1 de 1
> **Veredicto final:** APROBADO (con observaciones bajas documentadas)

## Resumen del ciclo

Se ejecutó la Fase 6 del roadmap ([`../10-plan-implementacion.md`](../10-plan-implementacion.md)):
pulido de UI/UX sobre el commit `97553a3` (Fase 4 — Cantos + flujo de repertorio +
elevación ya commiteados). Se aplicaron 9 grupos de cambios en 3 archivos del producto
(`index.html`, `assets/css/styles.css`, `assets/js/app.js`) y, por pedido explícito del
usuario, se agregó un botón flotante "volver arriba".

| Iteración | Veredicto | Fallas |
|-----------|-----------|--------|
| 1 | APROBADO | Ninguna bloqueante; 3 observaciones bajas documentadas |

## Contexto

- **Base:** commit `97553a3` — Fase 4 (biblioteca de cantos + buscador + detalle),
  flujo de repertorio y elevación ya commiteados.
- **Alcance:** solo UI/UX y accesibilidad; sin cambios en `data/*.json` ni en la
  arquitectura (sigue siendo HTML/CSS/JS/JSON estático, sin dependencias nuevas).
- **Deuda previa que esta fase resuelve:** ritmo espacial poco marcado en escritorio
  (MEDIA de padding rhythm reportada en [`reporte-tecnico-final-mejora-diseno-visual.md`](reporte-tecnico-final-mejora-diseno-visual.md);
  la diferenciación ya existía parcialmente en el commit base y esta fase la escala)
  y skip link sin estilos CSS (BAJA, reportada desde Fase 1/2).

## Cambios realizados (3 archivos)

| Archivo | Cambio |
|---------|--------|
| `index.html` | Skip link con clase `.skip-link`, botón `#back-to-top` con `aria-label`, SVGs inline en `.event-meta` |
| `assets/css/styles.css` | Tokens de elevación, ritmo espacial, tipografía, header/nav, controles, estados vacíos, `prefers-reduced-motion`, `.skip-link`, `.back-to-top` |
| `assets/js/app.js` | Lógica del botón flotante (scroll listener `passive`, throttle), scroll `instant` bajo reduced-motion, `showEventsError` con `innerHTML` estático |

## Decisiones de diseño (con justificación)

### 1. Profundidad única (elevación)

- **Tokens:** `--elevation-border: 1px solid var(--color-border)` y
  `--elevation-shadow-hover: 0 8px 20px rgba(143, 170, 138, 0.22)`.
- **Cards interactivas** (`event-card`, `song-card`): sombra sin borde.
- **Contenedores estáticos** (`org-card`, `contact-content`, `event-detail-grid/block`,
  `song-detail-card`): borde sin sombra.
- **Justificación:** un solo lenguaje de elevación elimina la ambigüedad sobre qué es
  clickeable: lo interactivo "flota" (sombra), lo estático "se asienta" (borde). Antes
  convivían bordes y sombras sin criterio consistente.

### 2. Ritmo espacial

- `@media (min-width: 768px)`: `.section` → `4rem`, `.section-compact` → `2.5rem`,
  `.section-spacious` → `5rem` (antes: 48px / 32px / 62.4px diferenciados; 32px solo en
  `.section-compact`).
- `--space-card: 1.25rem` aplicado en `.event-card` (padding 16px → 20px).
- **Justificación:** escala el ritmo espacial diferenciado que ya existía en escritorio
  (deuda MEDIA de padding rhythm) y hace más marcada la jerarquía entre secciones; las
  cards ganan respiración interna.

### 3. Tipografía

- `font-smoothing: antialiased` (+ `-moz-osx-font-smoothing: grayscale`) en base.
- `text-wrap: balance` en 6 títulos; `text-wrap: pretty` en 3 párrafos.
- `font-variant-numeric: tabular-nums` en `.event-date .day` y `.detail-value`.
- **Justificación:** títulos sin huérfanas, párrafos con ritmo de línea estable y
  números tabulares alineados (fechas y horas no "bailan" al cambiar de valor).

### 4. Header / navegación

- Gap móvil del nav: 1.5rem → 1rem; header con padding vertical 0.75rem.
- `transition` en los links del nav; hit areas de 48.3px (≥ 44px, WCAG 2.5.8).
- **Justificación:** header móvil más compacto (203px → 187px) sin perder objetivos
  táctiles cómodos; transición suave en hover/focus.

### 5. Controles

- `.btn` radius 6px → 8px (consistente con el radius de los inputs).
- Hover de `btn-primary` con sombra sutil; contraste hover `#C49580`/texto: 5.29:1 (AA).
- **Justificación:** consistencia formal entre botones e inputs; feedback de hover
  accesible y con profundidad perceptible.

### 6. Estados vacíos y errores

- 11 estados vacíos con estructura `h3 + p + acción` (consistente y accionable).
- SVGs inline reemplazan los emojis 🕐 y 📍 en `.event-meta`.
- `showEventsError` usa `innerHTML` estático, sin interpolación de datos.
- **Justificación:** los estados vacíos guían al usuario con una acción concreta; los
  SVGs son consistentes entre plataformas (los emojis varían por sistema); el
  `innerHTML` sin interpolación elimina el riesgo de XSS por construcción.

### 7. `prefers-reduced-motion`

- Media query que anula transiciones, animaciones y `transform` (incluido el hover de
  cards y el botón flotante).
- JS: `window.scrollTo` usa `behavior: 'instant'` cuando el usuario prefiere menos
  movimiento.
- **Justificación:** respeta la preferencia del sistema (WCAG 2.3.3) sin romper
  funcionalidad.

### 8. Skip link

- Regla `.skip-link`: `position: absolute`, `top: -100%`, visible en `:focus-visible`
  (`top: 0`), `z-index: 1000`, fondo `--color-primary-dark` con texto blanco.
- **Justificación:** resuelve la deuda BAJA preexistente (skip link sin estilos desde
  Fase 1/2); verificado en navegador con foco por teclado.

### 9. Botón flotante "volver arriba" (pedido del usuario)

- `button#back-to-top`: `position: fixed`, `bottom/right: 1.5rem`, 48×48px, radius 50%,
  fondo `#4F6B4B` (`--color-primary-dark`), icono blanco con contraste 5.94:1 (AA),
  `aria-label="Volver al inicio de la página"`.
- `hidden` inicial; visible tras `scrollY > 400` (umbral `SCROLL_THRESHOLD = 400`).
- Click → scroll suave al inicio; respeta reduced-motion (`instant`).
- `:focus-visible` con outline blanco (el outline genérico oscuro sería invisible
  sobre el fondo verde oscuro).
- Hover gateado: `@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`
  (evita hovers falsos en táctil y movimiento no deseado); `:active` con `scale(0.97)`.
- **Justificación:** navegación de retorno en páginas largas; objetivo táctil 48×48px
  (≥ 44px, WCAG 2.5.8); no aparece sin scroll; no interfiere con pantallas táctiles.

## Medidas antes / después

| Medida | Antes | Después |
|--------|-------|---------|
| Header móvil (alto) | 203px | 187px |
| `.event-card` padding | 16px | 20px |
| `.btn` border-radius | 6px | 8px |
| `.section` desktop | 48px / 32px / 62.4px diferenciado (32px solo `.section-compact`) | 64px / 40px / 80px diferenciado |
| Nav hit area | — | 48.3px (≥ 44px WCAG 2.5.8) |
| Contraste hover botón primario | — | 5.29:1 (AA) |
| Botón flotante | no existía | 48×48px, contraste 5.94:1 (AA) |

## Verificación

### Playwright (Fase 7 — QA)

- 12 rutas verificadas en viewport 320px, sin scroll horizontal.
- Ruta inválida → redirige a `#/inicio`.
- Reduced-motion: `transition-duration: 1e-05s` y `transform: none` aplicados.
- Botón flotante: visible tras scroll (48×48px), click → `scrollY` 0 y se oculta.
- Foco por teclado llega al botón con outline blanco.
- Manejo de error con JSON 404 simulado: landing y vista de eventos muestran estados
  de error correctos.
- Consola limpia salvo Google Fonts bloqueada por el sandbox de Playwright
  (artefacto del entorno de prueba, no del producto).

### Validadores

- `node scripts/validate-template.mjs` (11 grupos) → exit 0.
- `node scripts/test-agent-fixtures.mjs` → exit 0.
- Ejecutados durante la auditoría de Security; este reporte no pudo re-ejecutarlos
  (sin herramienta de shell disponible en la sesión de documentación).

## Hallazgos de auditoría y su resolución

### Reviewer — COMPLETE

| # | Observación | Severidad | Resolución |
|---|-------------|-----------|------------|
| 1 | `:active` del botón flotante no anulado por reduced-motion | BAJA | Aceptada: respuesta directa a una interacción del usuario, permitida por WCAG (el feedback inmediato no es movimiento decorativo) |
| 2 | Solapamiento potencial botón/footer en 320px | BAJA | Aceptada: cosmético, no bloquea contenido ni interacción |
| 3 | `text-wrap: balance/pretty` requiere navegadores modernos | BAJA | Aceptada: degradación elegante (navegadores antiguos ignoran la propiedad y muestran el texto normal) |

### Security — COMPLETE (riesgo bajo)

- Sin XSS: `innerHTML` estático sin interpolación de datos.
- Listeners únicos, `passive: true` + throttle en scroll.
- Sin secretos ni PII en los cambios.
- Validadores con exit 0.
- Gitleaks no disponible localmente; cubierto por CI.

## Deuda restante (observaciones bajas)

| # | Descripción | Severidad | Archivos |
|---|-------------|-----------|----------|
| 1 | `:active` del botón flotante no anulado por reduced-motion (aceptado) | BAJA | `assets/css/styles.css` |
| 2 | Solapamiento potencial botón/footer en 320px (cosmético) | BAJA | `assets/css/styles.css` |
| 3 | `text-wrap` requiere navegadores modernos (degradación elegante) | BAJA | `assets/css/styles.css` |
| 4 | Deuda preexistente no abordada en esta fase: favicon 404, contraste `.event-date` 2.53:1 (MEDIA) y hero 3.6:1 (BAJA) | MEDIA/BAJA | raíz, `assets/css/styles.css` |

## Checklist UX de Fase 6

| Criterio (plan) | Estado | Evidencia |
|-----------------|--------|-----------|
| Ajustar espaciado | ✅ | Ritmo espacial diferenciado en desktop; `--space-card` 1.25rem |
| Mejorar cards | ✅ | Elevación única (sombra en interactivas, borde en estáticas) |
| Mejorar botones | ✅ | Radius 8px consistente, hover con sombra y contraste AA |
| Ajustar contraste | ✅ | Hover botón 5.29:1; botón flotante 5.94:1 |
| Revisar tipografía | ✅ | `text-wrap` balance/pretty, `tabular-nums`, font-smoothing |
| Mejorar estados vacíos | ✅ | 11 estados con `h3 + p + acción`; SVGs en `.event-meta` |
| Probar responsive | ✅ | 12 rutas en 320px sin scroll horizontal |
| Revisar accesibilidad básica | ✅ | Skip link funcional, reduced-motion, hit areas ≥ 44px |
| Sin scroll horizontal | ✅ | Verificado en 320px |
| Botones fáciles de tocar | ✅ | `min-height: 48px`; nav 48.3px |
| Información principal clara | ✅ | Jerarquía de elevación y ritmo espacial |
| Textos legibles | ✅ | Tipografía suavizada, balance/pretty, números tabulares |

## Veredicto

**APROBADO.** La Fase 6 cumple los criterios de aceptación del plan
([`../10-plan-implementacion.md`](../10-plan-implementacion.md)): sin scroll horizontal,
botones fáciles de tocar, información clara y textos legibles. Las 3 observaciones del
Reviewer son bajas y quedan documentadas como deuda. Security no encontró riesgos.
El botón flotante "volver arriba" (pedido del usuario) quedó implementado y verificado.

> Estado del reporte: **PARTIAL — pendiente de review** (documentación escrita por
> `base-docs`; requiere review independiente antes del cierre integral).