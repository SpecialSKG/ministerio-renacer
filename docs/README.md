# Documentación — Ministerio Renacer

Índice de la documentación absorbida del producto en esta carpeta. La
documentación interna de la línea base OpenCode vive en `.opencode/docs/` y no
se mezcla aquí.

> Convención de estado: **POC** = vigente para la prueba de concepto estática;
> **referencia futura** = NO implementado en la POC (Etapa 2, versión moderna);
> **histórico** = contexto del proyecto previo, no opera como regla vigente.

## Documentos de la POC (vigentes)

| Archivo | Contenido | Estado |
|---|---|---|
| [`00-concepto-general.md`](00-concepto-general.md) | Visión general, módulos del producto, etapas del proyecto | POC |
| [`02-plan-poc-html-css-js.md`](02-plan-poc-html-css-js.md) | Plan canónico de la POC: arquitectura estática HTML/CSS/JS + JSON, decisiones técnicas | POC |
| [`03-resumen-ejecutivo.md`](03-resumen-ejecutivo.md) | Resumen del proyecto, roles, arquitectura POC, entregables | POC |
| [`04-guia-agentes-skills-mcps.md`](04-guia-agentes-skills-mcps.md) | Guía del proyecto previo: agentes `ministerio-*` y skills `poc-*`, `static-frontend`, `json-content` | Histórico — reemplazado por la línea base `base-*` + `special-*` |
| [`05-prd-requerimientos-producto.md`](05-prd-requerimientos-producto.md) | PRD — requerimientos del producto | POC |
| [`06-trd-requerimientos-tecnicos.md`](06-trd-requerimientos-tecnicos.md) | TRD — requerimientos técnicos | POC |
| [`07-brief-diseno-ui-ux.md`](07-brief-diseno-ui-ux.md) | Brief de diseño UI/UX | POC |
| [`08-app-flow.md`](08-app-flow.md) | Flujo de navegación de la aplicación | POC |
| [`10-plan-implementacion.md`](10-plan-implementacion.md) | Plan de implementación por fases y roadmap | POC — fuente del estado por fases |

## Documentos de etapa moderna (referencia futura, NO implementada en la POC)

| Archivo | Contenido |
|---|---|
| [`01-viabilidad-tecnica.md`](01-viabilidad-tecnica.md) | Viabilidad de la versión moderna (Next.js/React + Supabase u otras plataformas) |
| [`09-esquema-backend.md`](09-esquema-backend.md) | Esquema de backend futuro (Etapa 2) |

Estos documentos describen hacia dónde podría evolucionar el producto si se
supera la validación de la POC. No construir nada de ellos en esta etapa.

## Reportes técnicos finales

| Archivo | Contenido |
|---|---|
| [`reports/reporte-tecnico-final-fase1-esqueleto.md`](reports/reporte-tecnico-final-fase1-esqueleto.md) | Fase 1 — Esqueleto funcional |
| [`reports/reporte-tecnico-final-fase2-landing.md`](reports/reporte-tecnico-final-fase2-landing.md) | Fase 2 — Landing page |
| [`reports/reporte-tecnico-final-mejora-diseno-visual.md`](reports/reporte-tecnico-final-mejora-diseno-visual.md) | Mejora de diseño visual |
| [`reports/reporte-tecnico-final-paleta-sage-durazno.md`](reports/reporte-tecnico-final-paleta-sage-durazno.md) | Rediseño de paleta Sage + Durazno |
| [`reports/reporte-tecnico-final-fase3-eventos.md`](reports/reporte-tecnico-final-fase3-eventos.md) | Fase 3 — Eventos (última fase completada; incluye deuda técnica conocida) |

## Iteraciones

| Archivo | Contenido |
|---|---|
| [`reports/iteraciones/2026-06-21_fase1-esqueleto_iter1.md`](reports/iteraciones/2026-06-21_fase1-esqueleto_iter1.md) | Fase 1, iteración 1 |
| [`reports/iteraciones/2026-06-21_fase1-esqueleto_iter2.md`](reports/iteraciones/2026-06-21_fase1-esqueleto_iter2.md) | Fase 1, iteración 2 (corrección) |
| [`reports/iteraciones/2026-06-21_fase2-landing_iter1.md`](reports/iteraciones/2026-06-21_fase2-landing_iter1.md) | Fase 2, iteración 1 |
| [`reports/iteraciones/2026-06-22-rediseno-paleta-sage-durazno_iter1.md`](reports/iteraciones/2026-06-22-rediseno-paleta-sage-durazno_iter1.md) | Rediseño paleta, iteración 1 |
| [`reports/iteraciones/2026-06-27_fase3-eventos.routing.md`](reports/iteraciones/2026-06-27_fase3-eventos.routing.md) | Fase 3, hash routing y vista de detalle |

## Notas

- Las relaciones de datos se verifican contra `data/*.json` en la raíz
  (`events.repertoireId` → `repertoires.id` → `songs.songId`), que es la
  fuente única de verdad del contenido.
- Los documentos `01` y `09` se conservan como referencia futura; la POC es
  estática y no incluye backend, login ni base de datos.
- El documento `04` describe agentes y skills del proyecto previo que ya no
  existen: hoy opera la línea base `base-*` + `special-*`. Úsalo solo como
  contexto histórico.
