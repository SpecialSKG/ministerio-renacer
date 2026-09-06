# Accesibilidad

La accesibilidad acompaña la implementación; no es un parche final.

## REQUIRED

- Semántica y nombre accesible correctos para controles.
- Operación por teclado, orden lógico y foco visible.
- Labels, instrucciones y errores asociados en formularios.
- Estado comunicado en componentes dinámicos cuando no sea implícito.
- Alternativas textuales adecuadas y contenido comprensible con zoom/reflow.
- Contraste suficiente conforme al nivel aplicable del proyecto.
- Movimiento no esencial reducido según preferencias del usuario.

## DEFAULT

- HTML nativo antes de ARIA.
- Primitives accesibles existentes antes de recrear dialog, combobox, tabs,
  menu, tooltip o patrones con gestión compleja de foco.
- Estados default, hover, active, focus, disabled, loading, empty y error donde
  sean relevantes.
- Áreas táctiles cómodas; evaluar tamaño y separación según WCAG y contexto, no
  imponer un número de diseño como regla universal.
- Validación automática más verificación manual de teclado y flujo crítico.

## AVOID

- Quitar outlines sin reemplazo visible.
- `role="button"` sobre un elemento neutro cuando puede usarse `button`.
- ARIA redundante, focus traps incompletos o overlays sin retorno de foco.
- Comunicar información exclusivamente por color, posición o movimiento.
- Declarar conformidad basándose solo en Lighthouse/axe u otro scanner.

## Verificación

1. Recorrer el flujo afectado solo con teclado.
2. Inspeccionar árbol accesible y nombres/estados.
3. Probar errores, contenido largo, zoom y reduced motion.
4. Ejecutar herramientas existentes sin instalar nuevas por inferencia.
5. Registrar límites de pruebas con lector de pantalla o navegadores no disponibles.

Fuente de actualización: [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/).
