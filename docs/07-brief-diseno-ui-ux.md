# Brief de Diseño UI/UX

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Propósito del brief

Definir la dirección visual y de experiencia de usuario para la prueba de concepto de la plataforma. Este documento servirá como guía antes de maquetar la landing, eventos, cantos y repertorios.

---

## 1. Contexto

El ministerio necesita una web simple para centralizar información que hoy puede estar dispersa. La plataforma debe ser útil para jóvenes y adultos, sin exigir instalación de apps ni login para consultar.

El principal canal de distribución seguirá siendo WhatsApp, pero la web será el lugar donde vive la información ordenada.

---

## 2. Objetivo de diseño

Diseñar una experiencia clara, cálida, sobria y fácil de usar desde celular, donde cualquier miembro pueda encontrar rápidamente:

- Próximo evento.
- Hora de reunión.
- Lugar.
- Vestimenta.
- Repertorio.
- Letras y acordes.

La interfaz debe evitar parecer una aplicación compleja. Debe sentirse como una cartelera digital bien ordenada.

---

## 3. Principios UX

### 3.1 Claridad

La información principal debe entenderse en pocos segundos.

Prioridad visual:

1. Próximos eventos.
2. Detalles del evento.
3. Repertorio.
4. Cantos.
5. Información institucional.

### 3.2 Bajo esfuerzo

El usuario no debe crear cuenta, descargar app ni aprender flujos complejos para consultar.

### 3.3 Mobile-first

La mayoría consultará desde teléfono. El diseño debe pensarse primero para pantallas pequeñas.

### 3.4 Lectura cómoda

Las letras y acordes deben leerse sin esfuerzo. Se deben evitar bloques demasiado comprimidos.

### 3.5 Navegación sencilla

El usuario siempre debe saber dónde está y cómo volver.

### 3.6 Diseño sobrio

El proyecto es para iglesia y ministerio musical. Debe transmitir orden, servicio, comunidad y espiritualidad, sin recargar visualmente.

---

## 4. Usuarios y necesidades

## 4.1 Miembro adulto

Necesita:

- Ver fecha y hora.
- Entender dónde ir.
- Saber cómo vestir.
- Ver el repertorio sin confundirse.
- No tener que usar login.

Riesgo:

- Se pierde si hay demasiados botones, menús o términos técnicos.

Diseño recomendado:

- Botones grandes.
- Textos claros.
- Secciones separadas.
- Poca jerga.

## 4.2 Miembro joven

Necesita:

- Acceso rápido.
- Búsqueda.
- Diseño limpio.
- Enlaces compartibles.

Diseño recomendado:

- Navegación rápida.
- Buscador simple.
- Cards claras.
- Buen responsive.

## 4.3 Coordinador / administrador futuro

Necesita:

- Ver la estructura del contenido.
- Entender qué datos debe mantener.
- En la etapa moderna, editar rápido.

Diseño recomendado para futuro:

- Panel administrativo limpio.
- Formularios guiados.
- Validaciones claras.

---

## 5. Personalidad visual

La interfaz debe sentirse:

- Clara.
- Ordenada.
- Cálida.
- Comunitaria.
- Respetuosa.
- Moderna, pero no excesivamente tecnológica.
- Fácil de leer.

Evitar que se sienta:

- Como dashboard empresarial complejo.
- Como red social.
- Como app saturada.
- Como sitio viejo sin jerarquía.
- Como herramienta solo para programadores.

---

## 6. Estilo visual recomendado

### Colores

Usar una paleta moderada y consistente.

Sugerencia conceptual:

- Color primario: tono cálido o institucional.
- Color secundario: tono neutro.
- Fondo: claro, suave.
- Texto: oscuro con buen contraste.
- Acentos: usar solo para botones, fechas y elementos importantes.

Ejemplo de sistema:

```css
:root {
  --color-bg: #f8f6f2;
  --color-surface: #ffffff;
  --color-text: #252525;
  --color-muted: #666666;
  --color-primary: #7a3e2d;
  --color-primary-dark: #55291f;
  --color-border: #e6ded6;
  --color-accent: #c89b5a;
}
```

Estos colores son solo punto de partida. Pueden ajustarse a los logos del ministerio y parroquia.

### Tipografía

Recomendación:

- Fuente principal sans-serif para lectura clara.
- Evitar tipografías decorativas en textos largos.
- Usar jerarquía fuerte en títulos y fechas.

Tamaños sugeridos:

- Texto base: 16px mínimo.
- Títulos principales: 28–36px en desktop, 24–30px en móvil.
- Títulos de cards: 18–22px.
- Letras de cantos: 16–18px.
- Acordes: monoespaciada o destacada.

### Espaciado

- Usar bastante aire entre secciones.
- Cards separadas.
- Márgenes cómodos en móvil.
- Evitar líneas muy largas en desktop.

---

## 7. Componentes UI

## 7.1 Header

Debe incluir:

- Logo o nombre del ministerio.
- Navegación simple.
- Enlaces: Inicio, Eventos, Cantos, Contacto.

En móvil:

- Puede ser navegación simple por botones.
- Evitar menú complejo si no es necesario.

## 7.2 Hero

Debe incluir:

- Nombre del ministerio.
- Frase breve.
- Dos botones:
  - Ver próximos eventos.
  - Ver cantos.

## 7.3 Card de evento

Debe mostrar:

- Fecha destacada.
- Tipo de evento.
- Título.
- Hora.
- Lugar.
- Botón: Ver detalle.

Jerarquía recomendada:

1. Fecha.
2. Título.
3. Hora y lugar.
4. Tipo.
5. Botón.

## 7.4 Detalle de evento

Debe usar bloques visuales:

- Cuándo.
- Dónde.
- Hora de reunión.
- Vestimenta.
- Modalidad musical.
- Notas.
- Repertorio.

Cada bloque debe tener título corto e información directa.

## 7.5 Lista de cantos

Debe tener:

- Buscador.
- Cards o filas.
- Categoría.
- Tonalidad.
- Botón/ver detalle.

## 7.6 Detalle de canto

Debe priorizar lectura.

Secciones:

- Título.
- Tonalidad.
- Categoría.
- Letra.
- Acordes.
- Notas.

Los acordes deben distinguirse sin romper la lectura.

## 7.7 Estado vacío

Ejemplos:

- “No hay eventos publicados por ahora.”
- “No se encontraron cantos con esa búsqueda.”
- “Este evento aún no tiene repertorio asignado.”

## 7.8 Estados de error

Ejemplos:

- “No se pudo cargar la información. Revisa los archivos de datos.”
- “El canto solicitado no existe.”
- “El evento solicitado no está disponible.”

---

## 8. Estructura de pantallas

## 8.1 Inicio

Objetivo:

- Presentar el ministerio.
- Mostrar accesos principales.
- Destacar próximos eventos.

Secciones:

1. Header.
2. Hero.
3. Próximos eventos.
4. Sobre el ministerio.
5. Accesos rápidos.
6. Contacto.
7. Footer.

## 8.2 Eventos

Objetivo:

- Ver lista de actividades.

Elementos:

- Título.
- Filtro simple por tipo.
- Lista de eventos.
- Estado vacío.

## 8.3 Detalle de evento

Objetivo:

- Resolver dudas prácticas del miembro.

Elementos:

- Título.
- Fecha/hora.
- Lugar.
- Hora de reunión.
- Vestimenta.
- Modalidad musical.
- Repertorio.
- Notas.
- Botón volver.

## 8.4 Cantos

Objetivo:

- Consultar biblioteca musical.

Elementos:

- Buscador.
- Filtro por categoría en fase posterior.
- Lista de cantos.
- Estado vacío.

## 8.5 Detalle de canto

Objetivo:

- Leer letra/acordes cómodamente.

Elementos:

- Título.
- Tonalidad.
- Categoría.
- Letra.
- Acordes.
- Notas.
- Botón volver.

---

## 9. App responsive

### Móvil

- Una columna.
- Botones anchos.
- Cards verticales.
- Tipografía clara.
- Navegación simple.
- Repertorio como lista ordenada.

### Tablet

- Cards en dos columnas si hay espacio.
- Secciones con más aire.

### Desktop

- Contenido centrado.
- Máximo ancho de lectura.
- Cards en grid.
- Detalles en bloques.

---

## 10. Accesibilidad

Requisitos mínimos:

- Contraste suficiente.
- HTML semántico.
- Foco visible.
- Textos de botones descriptivos.
- No depender solo del color.
- `alt` en imágenes.
- `label` en buscadores.
- Buen tamaño de toque.
- Evitar animaciones invasivas.
- Permitir lectura cómoda con zoom.

---

## 11. Microcopy sugerido

Botones:

- Ver próximos eventos.
- Ver cantos.
- Ver detalle.
- Volver a eventos.
- Volver a cantos.
- Abrir canto.
- Compartir evento.

Estados:

- No hay eventos publicados por ahora.
- Este evento aún no tiene repertorio asignado.
- No encontramos cantos con ese nombre.
- Revisa más tarde para nuevas fechas.

Textos de ayuda:

- La información puede actualizarse según coordinación del ministerio.
- Consulta el repertorio antes del ensayo o evento.
- Verifica la hora de reunión del grupo.

---

## 12. Reglas de contenido

- Usar fechas claras.
- Evitar párrafos largos en eventos.
- Separar indicaciones prácticas.
- Mantener nombres de cantos consistentes.
- No publicar datos personales sensibles.
- No poner teléfonos personales sin autorización.
- Evitar depender únicamente de imágenes para comunicar información.

---

## 13. Criterios de éxito UX

La experiencia será aceptable si:

- El usuario encuentra eventos sin explicación.
- El usuario entiende el detalle del evento.
- El usuario puede abrir un canto desde el repertorio.
- El buscador de cantos es fácil de usar.
- La web se puede consultar en celular sin zoom manual.
- Las letras no se ven apretadas.
- Los botones son claros.

---

## 14. Recomendación visual inicial

Crear primero un diseño sobrio y limpio. No empezar con efectos, animaciones o componentes complejos.

Orden recomendado:

1. Maqueta HTML simple.
2. CSS mobile-first.
3. Cards de eventos.
4. Vista de detalle.
5. Lista de cantos.
6. Pulido visual.
7. Revisión de accesibilidad.
8. Ajustes con usuarios reales.
