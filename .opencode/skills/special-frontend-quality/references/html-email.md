# HTML email

Esta referencia sustituye preferencias web incompatibles cuando el artefacto es
un correo, notificación o plantilla procesada por una plataforma de envío.

## Contexto requerido

- Clientes objetivo, especialmente versiones de Outlook.
- Motor de plantillas, variables, sanitización y pipeline de envío.
- Límites de tamaño, CSS soportado, modo oscuro y pruebas disponibles.

## Permitido y frecuente

- Layout con tablas y atributos presentacionales de fallback.
- CSS inline, duplicación controlada y estilos conservadores.
- Condicionales específicos de clientes y estructura repetitiva.
- Anchos definidos y fallbacks que serían indeseables en una aplicación web.

## REQUIRED

- Preservar compatibilidad declarada y comentarios que expliquen fallbacks.
- Texto alternativo, orden de lectura razonable, enlaces válidos y preheader.
- Variables no resueltas, URLs, unsubscribe y datos dinámicos verificados.
- Contenido útil cuando imágenes o estilos no cargan.
- No incluir JavaScript, secretos, endpoints internos o datos reales de prueba.

## No hacer automáticamente

- Reemplazar tablas por Flexbox/Grid.
- Mover todo CSS inline a archivos externos.
- Introducir selectores/funciones modernas sin matriz de soporte.
- Aplicar SEO, canonical, sitemap, structured data o convenciones de SPA.
- Eliminar duplicación o condicionales solo por estética del código.

## Verificación

Probar con el renderer/plataforma y clientes disponibles. Si no existe matriz de
clientes, declarar la limitación y evitar afirmar compatibilidad total.
