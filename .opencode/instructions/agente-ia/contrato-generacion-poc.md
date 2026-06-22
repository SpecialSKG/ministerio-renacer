# Contrato de generación para la POC

Cuando un agente genere código, documentación o datos para `ministerio-renacer`, debe cumplir este contrato.

## Entrada mínima esperada

- Objetivo de la tarea.
- Archivos afectados.
- Si pertenece a POC o etapa moderna.
- Criterios de aceptación.
- Restricciones de tecnología.

## Salida obligatoria

1. Resumen de objetivo.
2. Archivos creados o modificados.
3. Supuestos.
4. Cambios realizados o plan propuesto.
5. Cómo probar.
6. Riesgos o pendientes.

## Código permitido en POC

- HTML.
- CSS.
- JavaScript.
- JSON.
- Markdown.

## Código no permitido en POC

- React.
- Next.js.
- Angular.
- Vue.
- Supabase.
- Firebase.
- Node backend.
- Build tools.
- PDF generation.
- Auth.

## Revisión obligatoria

Antes de marcar una tarea como terminada, el agente debe revisar:

- Errores de consola.
- Carga de JSON.
- Navegación.
- Vista móvil.
- Accesibilidad básica.
- Rutas compatibles con hosting estático.
