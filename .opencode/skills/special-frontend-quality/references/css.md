# CSS y sistema visual

## REQUIRED

- Preservar compatibilidad declarada, legibilidad, zoom, foco y contenido largo.
- Respetar `prefers-reduced-motion` en movimiento no esencial.
- No ocultar contenido o fallos de layout para aparentar corrección.

## DEFAULT

- Seguir el sistema de diseño, componentes y convención de estilos existentes.
- Elegir Grid, Flexbox, flujo normal, media o container queries según la frontera
  real del layout.
- Crear custom properties para decisiones reutilizables: color, spacing,
  tipografía, radio, elevación y capas; no para cada literal.
- Usar breakpoints guiados por contenido, no por una lista fija de dispositivos.
- Probar viewport pequeño, móvil, tablet, laptop y desktop ancho cuando el
  alcance justifique una matriz completa; revisar también zoom y texto largo.
- Nombrar capas y z-index por intención; mantener una escala pequeña.

## AVOID

- `!important` repetitivo, IDs para styling, especificidad creciente y cadenas
  profundas de selectores.
- Valores mágicos repetidos, z-index arbitrarios y alturas fijas con texto.
- `transition: all`, animaciones permanentes o propiedades costosas sin medir.
- Layout que depende innecesariamente de posición absoluta o márgenes negativos.
- Crear otro sistema visual cuando ya existe uno.

## CONDITIONAL

- `clamp`, `min`, `max`, `:has` y container queries se usan si simplifican y la
  matriz de navegadores los admite.
- Dark mode, temas, PWA y fuentes externas requieren un requisito del producto.
- Extraer componente/token ante reutilización real, no en la primera aparición.
- Para dirección visual y movimiento especializado, combinar con una sola skill
  de diseño; esta referencia conserva calidad técnica y compatibilidad.

## Evidencia

Verificar estilos computados y UI renderizada en los estados/anchos afectados.
Una revisión textual de clases no prueba responsive, foco o ausencia de overflow.

Fuente de actualización: [MDN CSS](https://developer.mozilla.org/docs/Web/CSS).
