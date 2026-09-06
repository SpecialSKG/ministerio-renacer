# HTML

Aplicar a páginas, vistas, componentes y plantillas web. Para correo, usar
`html-email.md` como contrato principal.

## REQUIRED

- Preservar significado, comportamiento, navegación y contratos existentes.
- Usar controles nativos: un enlace navega y un botón ejecuta una acción.
- Dar nombre accesible a controles y asociación explícita a campos y errores.
- Declarar `lang` en documentos HTML completos.
- Proporcionar `alt` útil a imágenes informativas y `alt=""` a decorativas.
- Mantener un `main` identificable y una jerarquía de encabezados comprensible.
- Tratar contenido externo o de usuario como no confiable.

## DEFAULT

- Elegir elementos por significado (`header`, `nav`, `main`, `section`,
  `article`, `aside`, `footer`) sin reemplazar `div` mecánicamente.
- Dar encabezado identificable a una `section` temática.
- Usar `label`, `name`, tipo y `autocomplete` apropiados en formularios.
- Reservar dimensiones de imágenes y usar `srcset`/`sizes` cuando aporten valor.
- Mantener navegación y contenido esencial utilizables con mejora progresiva
  cuando el producto lo requiera.

## AVOID

- `div` o `a href="#"` como control cuando existe un elemento nativo.
- ARIA redundante o usado para compensar semántica incorrecta.
- Placeholder como único label.
- Cambiar varios `h1` o ausencia de `h1` sin comprender estructura y framework.
- `loading="lazy"` indiscriminado en la imagen que probablemente sea LCP.

## CONDITIONAL

- SSR, SSG o prerender dependen de indexabilidad, rendimiento y arquitectura.
- Structured data, social metadata y canonical pertenecen a `seo.md`.
- Componentes complejos requieren un primitive accesible existente o la
  implementación completa de teclado, foco, estado y ARIA.

## Evidencia

Revisar DOM renderizado, árbol accesible, enlaces reales, estados del formulario
y comportamiento con teclado; no inferir calidad solo desde JSX o templates.

Fuente de actualización: [MDN HTML](https://developer.mozilla.org/docs/Web/HTML).
