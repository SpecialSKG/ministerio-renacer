# SEO y descubrimiento público

## Puerta de activación

Leer y aplicar esta referencia solo si la superficie es pública e indexable o
el usuario solicita SEO explícitamente. No aplica por defecto a dashboards,
paneles administrativos, aplicaciones autenticadas, herramientas internas,
componentes aislados, HTML email o prototipos sin publicación.

## REQUIRED cuando aplica

- Estado HTTP, URL, indexabilidad y contenido principal coherentes.
- `<title>` descriptivo y heading principal identificable.
- No bloquear accidentalmente crawlers necesarios mediante robots o headers.
- Structured data, reseñas, dirección, precios y datos comerciales deben
  corresponder a contenido real y autorizado; nunca inventarlos.

## DEFAULT

- Meta description específica para páginas relevantes.
- Canonical cuando existe riesgo real de URLs duplicadas o variantes.
- Enlaces HTML rastreables hacia páginas importantes.
- 404 útil para sitios multipágina.
- Sitemap y robots coherentes con la arquitectura y despliegue.
- Open Graph/social preview para contenido que se comparte públicamente.

## CONDITIONAL

- Structured data solo para tipos compatibles con contenido visible verificable.
- `LocalBusiness`, breadcrumbs, FAQ, mapa, CTA, testimonios y páginas de
  agradecimiento dependen del producto y de información proporcionada.
- SSR/SSG/prerender depende de render inicial, indexación, rendimiento y costo.
- `llms.txt` es experimental/informativo; su ausencia no es un fallo SEO.
- Permitir o bloquear crawlers de IA es una decisión de política, no un default.

## AUDIT, no corrección automática

- Varios `h1`, HTML inicial escaso, sourcemaps públicos, falta de canonical,
  social metadata, sitemap, structured data o `llms.txt`.
- Cambios a robots, canonical, tracking, schema o arquitectura de renderizado
  requieren evidencia y autorización antes de editar.

## Evidencia

Separar código observado, respuesta HTTP/render real, inferencia y recomendación.
No presentar una auditoría de laboratorio como resultado de indexación real.

Fuente de actualización: [Google Search Central](https://developers.google.com/search/docs).
