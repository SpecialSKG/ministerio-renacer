---
name: special-frontend-quality
description: Crea, refactoriza, revisa o audita frontend con reglas contextuales de HTML, CSS, JavaScript, accesibilidad, compatibilidad y QA; SEO solo aplica a superficies públicas indexables.
compatibility: opencode
metadata:
  source: FRONTEND_QUALITY_STANDARD-v1.0
---

# Skill: Frontend Quality

## Activar cuando

- La tarea crea o modifica páginas, componentes, estilos, interacción o HTML email.
- Se solicita revisar, auditar o refactorizar un frontend.

## No activar cuando

- La tarea no toca una superficie frontend.
- Solo se busca dirección visual: usar `interface-design` o una skill de Emil.
- Solo se investiga una regresión de rendimiento o seguridad: usar la especialista
  correspondiente, salvo que también haya que evaluar la integración frontend.

## Contexto primero

Antes de aplicar reglas, determinar con evidencia:

- tipo de producto y si la superficie es pública e indexable;
- web, aplicación autenticada, componente, prototipo o HTML email;
- stack, convenciones, design system y componentes existentes;
- navegadores, clientes de correo y restricciones de compatibilidad;
- comandos reales de build, lint, typecheck y pruebas;
- alcance autorizado: implementación, refactorización, revisión o auditoría.

Si el perfil no declara nivel, usar `STANDARD contextual`: aplicar calidad de
producción solo donde corresponda y documentar los supuestos relevantes.

## Clasificación de reglas

- `REQUIRED`: obligación aplicable al contexto; una excepción se documenta.
- `DEFAULT`: preferencia normal que puede sustituirse con una razón mejor.
- `AVOID`: señal de riesgo; requiere justificación, no rechazo mecánico.
- `CONDITIONAL`: solo se activa por una necesidad o señal concreta.
- `AUDIT`: inspeccionar y reportar; no corregir automáticamente.

## Routing de referencias

Leer solo las referencias necesarias:

| Señal | Referencia |
|---|---|
| Markup, páginas o componentes | [HTML](references/html.md) |
| JavaScript o TypeScript | [JavaScript](references/javascript.md) |
| Layout, responsive o estilos | [CSS](references/css.md) |
| Cualquier interfaz o contenido interactivo | [Accesibilidad](references/accessibility.md) |
| Página pública indexable o solicitud SEO explícita | [SEO](references/seo.md) |
| Requisito, regresión o auditoría de rendimiento | [Rendimiento](references/performance.md) |
| DOM no confiable, secretos cliente, dependencias o política web | [Seguridad](references/security.md) |
| Correo o notificación HTML | [HTML email](references/html-email.md) |

Para HTML email, `html-email.md` sustituye las preferencias web incompatibles.
No cargar SEO ni modernizar tablas, CSS inline o fallbacks por costumbre.

SEO no se activa para dashboards privados, paneles administrativos,
aplicaciones autenticadas no indexables, herramientas internas, componentes
aislados, email o prototipos sin publicación. Tampoco se exigen por defecto
canonical, sitemap, robots, Open Graph, structured data o `llms.txt`.

## Modo operativo

- Implementación: leer [implementation.md](checklists/implementation.md) y las
  referencias del código afectado.
- Auditoría: no editar; usar [audit.md](checklists/audit.md) y reportar evidencia,
  severidad, confianza y autorización necesaria.
- Revisión: inspeccionar el diff real con [review.md](checklists/review.md) y
  separar regresiones introducidas de deuda previa.

## Coordinación

Esta skill gobierna calidad técnica frontend. Combinar como máximo con una
especialista adicional cuando aporte una capacidad distinta:

- `interface-design` o Emil: dirección visual, craft o movimiento;
- `test-driven-development`: ciclo test-first;
- `performance-optimization`: medición y optimización especializada;
- `special-security-audit`: auditoría integral de riesgo;
- `special-code-review`: veredicto independiente sobre el diff.

No repetir dos workflows equivalentes. Las políticas `special-*` prevalecen
sobre recomendaciones externas y ninguna skill autoriza dependencias, MCP o
servicios.

## Límites

- Preservar comportamiento salvo cambio funcional explícito.
- Buscar componentes, utilidades, tokens y dependencias existentes antes de crear.
- No inventar rutas, contenido, testimonios, métricas, datos legales o de negocio.
- No introducir framework, dependencia, tracking, SEO masivo o arquitectura sin
  justificación y autorización.
- No ocultar síntomas con excepciones vacías, `overflow: hidden`, z-index
  arbitrario o `!important` repetitivo.
- Una auditoría no concede permiso para corregir.

## Salida

Estado, contexto y nivel aplicado, referencias cargadas, cambios o hallazgos,
evidencia, verificaciones ejecutadas/no ejecutadas, supuestos y siguiente acción.
