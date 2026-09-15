# Guía de Validación con Usuarios — Fase 9

> Documento operativo para ejecutar la **Fase 9 — Validación con usuarios** del
> roadmap. Fuente: [10-plan-implementacion.md](10-plan-implementacion.md),
> sección 11. Esta guía no modifica el producto: solo prepara, ejecuta y
> registra la prueba con personas reales.

---

## 1. Objetivo y contexto

### Qué se valida

Confirmar si la POC **ayuda realmente** a los usuarios del ministerio: si
encuentran eventos, entienden los repertorios y consultan cantos sin ayuda y
sin necesidad de login. No se evalúa a las personas: se evalúa el sitio.

### Sitio publicado

- URL: <https://specialskg.github.io/ministerio-renacer/>
- Estado actual: rediseñado (sistema claro/oscuro, tipografías Fraunces +
  Karla, landing por secciones, eventos en filas, calendario navegable, cantos
  con buscador, repertorios). Referencia del rediseño:
  [reports/reporte-tecnico-final-rediseno-identidad.md](reports/reporte-tecnico-final-rediseno-identidad.md).

### ⚠️ Nota importante: los datos son ficticios

Los datos actuales en `data/*.json` son **ficticios y de ejemplo**:

- Los eventos tienen fechas de **julio 2026** (p. ej. `2026-07-04`,
  `2026-07-05`, `2026-07-12`).
- La fecha actual es **septiembre 2026**: los eventos de ejemplo ya pasaron.
- Los cantos y repertorios también son de ejemplo.

Esto afecta directamente la tarea "encontrar el próximo evento". Antes de la
prueba, el evaluador o el coordinador debe elegir una de estas opciones:

| Opción | Qué hacer | Cuándo conviene |
|---|---|---|
| **A. Avisar y reformular** | Avisar a los usuarios que los datos son de ejemplo y reformular la tarea como "encontrar el primer evento de la lista" o "encontrar un evento de julio". | Cuando se quiere probar ya, sin tocar datos. |
| **B. Actualizar datos reales** | El coordinador actualiza `data/*.json` con fechas y eventos reales antes de la prueba (requiere editar los JSON; es una decisión del coordinador, no de esta guía). | Cuando se quiere probar con contenido realista. |
| **C. Probar local con fechas nuevas** | Copiar el sitio, actualizar fechas en la copia local y servir con `python -m http.server 8080`; decidir después si se publica. | Cuando se quiere probar "próximo evento" real sin publicar aún. |

**Recomendación:** si el objetivo es validar navegación y comprensión, la
opción A es suficiente y la más rápida. Si el objetivo incluye validar si el
contenido es útil, usar la opción B o C. En cualquier caso, **registrar en la
planilla qué opción se usó**, porque cambia la interpretación de la tarea 1.

---

## 2. Perfil de usuarios sugeridos

| Perfil | Cantidad | Qué observar |
|---|---|---|
| Miembro joven (18–30 años) | 2 | Familiaridad con el celular, rapidez, si usa el buscador, si entiende el repertorio, si nota el tema claro/oscuro |
| Miembro adulto (31+ años) | 2 | Claridad de los textos, tamaño de letra, si encuentra hora y lugar, si se pierde entre vistas, si vuelve atrás |
| Coordinador | 1 | Si encuentra lo que necesita para dirigir, si entiende el repertorio completo, qué datos le faltan |
| Persona externa o poco familiarizada | 1 | Primera impresión, si entiende qué es el sitio, si encuentra eventos sin contexto previo, si se siente perdida |

**Total sugerido: 6 personas.** Si no se consiguen las 6, la prueba sigue
siendo útil con menos, pero los criterios de éxito (sección 7) deben
interpretarse sobre la cantidad real.

---

## 3. Preparación del evaluador

### Checklist antes de la prueba

- [ ] Verificar que la URL publicada abre en el dispositivo que usará el usuario.
- [ ] Decidir y anotar la opción de datos ficticios (A, B o C de la sección 1).
- [ ] Imprimir o tener a mano: esta guía, una planilla por usuario (sección 6) y algo para anotar.
- [ ] Preparar el dispositivo (celular o computadora) con batería e internet.
- [ ] Avisar al usuario que la prueba dura unos 15–20 minutos y que no hay respuestas incorrectas.
- [ ] Pedir permiso verbal para anotar observaciones (no se graba nada sensible).

### Cómo presentar la prueba (sin guiar las respuestas)

Guion sugerido, en tono natural:

> "Te voy a pedir que hagas unas tareas en esta página del ministerio. No hay
> respuestas correctas ni incorrectas: queremos ver cómo la usarías vos de
> forma natural. Si te trabás, decímelo en voz alta. Yo no te voy a ayudar a
> menos que me lo pidas, y si me lo pedís, lo voy a anotar. Al final te hago
> unas preguntas. ¿Listo?"

Reglas de oro del evaluador:

1. **No guiar.** No digas "hacé clic ahí" ni "fijate en el menú". Si el usuario
   pregunta, respondé con otra pregunta: "¿Qué harías en tu casa?" o "¿Dónde
   creés que estaría?".
2. **No corregir durante la prueba.** Si el usuario se equivoca, anotalo y
   seguí. Las correcciones se discuten después.
3. **Registrar hechos, no interpretaciones.** Anotá "tocó el logo y volvió al
   inicio" en vez de "se perdió".
4. **Pedir pensar en voz alta.** "¿Qué estás pensando ahora?" ayuda a entender
   la confusión sin guiar.
5. **Agradecer al final** y aclarar que sus comentarios ayudan a mejorar el
   sitio.

### Qué registrar

- Tiempo aproximado por tarea (rápido / dudó / lento).
- Si pidió ayuda y en qué momento.
- Qué tocó primero (ruta elegida).
- Expresiones de confusión o sorpresa (textuales, entre comillas).
- Comentarios espontáneos (suelen ser los más valiosos).
- Errores de navegación y cómo se recuperó.

---

## 4. Tareas de prueba

Ejecutar en orden. Para cada tarea: leer la instrucción al usuario, observar en
silencio y anotar. El "dato esperado" usa los datos de ejemplo actuales; si se
actualizaron los datos (opción B o C), ajustar el dato esperado.

### Tarea 1 — Encontrar el próximo evento

- **Instrucción:** "Imaginá que querés saber cuál es el próximo evento del
  ministerio. ¿Cómo lo buscarías?"
- **Qué observar:** por dónde empieza (landing, menú, calendario), si duda, si
  pregunta, cuánto tarda.
- **Dato esperado (datos de ejemplo):** el primer evento de la lista es
  "Ensayo de Coro — Semana 1" (2026-07-04). Con datos actualizados, el próximo
  evento real.

### Tarea 2 — Abrir el detalle del evento

- **Instrucción:** "Abrí ese evento para ver más información."
- **Qué observar:** si identifica que el evento es clicable, si logra abrir el
  detalle, si sabe volver a la lista.

### Tarea 3 — Identificar la hora de reunión

- **Instrucción:** "¿A qué hora hay que llegar para la reunión de ese evento?"
- **Qué observar:** si distingue la **hora de reunión** (llegada) de la **hora
  del evento** (inicio). Es un punto donde suele haber confusión.
- **Dato esperado (ejemplo):** hora de reunión 17:30; hora del evento 18:00.

### Tarea 4 — Identificar el lugar

- **Instrucción:** "¿Dónde se realiza ese evento?"
- **Qué observar:** si encuentra el lugar en el detalle sin rebuscar.
- **Dato esperado (ejemplo):** "Sala de Música Principal".

### Tarea 5 — Abrir el repertorio

- **Instrucción:** "¿Qué cantos se van a tocar en ese evento?"
- **Qué observar:** si encuentra el repertorio dentro del detalle, si entiende
  la lista de cantos, si nota el orden.
- **Dato esperado (ejemplo):** el evento "Ensayo de Coro — Semana 1" tiene el
  repertorio "Repertorio Ensayo Julio — Semana 1" con 2 cantos.
- **Nota:** solo ese evento tiene repertorio en los datos de ejemplo. Si el
  usuario elige otro evento, verá el estado "sin repertorio": observar cómo
  reacciona y si lo entiende.

### Tarea 6 — Abrir un canto del repertorio

- **Instrucción:** "Abrí uno de los cantos del repertorio."
- **Qué observar:** si navega al detalle del canto, si lee la letra, si sabe
  volver al repertorio o al evento.

### Tarea 7 — Buscar un canto

- **Instrucción:** "Buscá un canto que hable de comunión."
- **Qué observar:** si usa el buscador de cantos, si escribe bien el término,
  si entiende los resultados y el estado vacío (si no hay coincidencias).
- **Dato esperado (ejemplo):** "Canto de Comunión" (song-002).

### Tarea 8 — Calendario (adicional, si el tiempo alcanza)

- **Instrucción:** "Usá el calendario para ver en qué día de julio hay un
  evento."
- **Qué observar:** si navega entre meses, si entiende los días marcados, si
  abre el detalle desde el calendario.

---

## 5. Preguntas de cierre

Hacer después de las tareas, en conversación. Anotar respuestas textuales.

### Preguntas del roadmap

1. ¿Encontraste lo que buscabas?
2. ¿Qué te confundió?
3. ¿Qué dato faltó?
4. ¿Lo usarías si te lo mandan por WhatsApp?
5. ¿Qué cambiarías?

### Preguntas opcionales (según el tiempo y el perfil)

6. **Tema claro/oscuro:** ¿Notaste el botón para cambiar el tema? ¿Lo usarías?
   ¿Cuál preferís?
7. **Botón volver arriba:** ¿Lo notaste? ¿Te sirvió en páginas largas?
8. **Móvil vs desktop:** ¿En qué dispositivo lo usarías más? ¿Se ve bien en tu
   celular?

---

## 6. Planilla de registro

### Datos del usuario

| Campo | Valor |
|---|---|
| Perfil (joven / adulto / coordinador / externo) | |
| Dispositivo (celular / computadora) | |
| Fecha y hora | |
| Evaluador | |
| Opción de datos ficticios usada (A / B / C) | |

### Registro por tarea

Marca con **S** (sin ayuda), **A** (con ayuda) o **N** (no completada) y anota
observaciones.

| # | Tarea | S / A / N | Notas y observaciones |
|---|---|---|---|
| 1 | Encontrar próximo evento | | |
| 2 | Abrir detalle del evento | | |
| 3 | Identificar hora de reunión | | |
| 4 | Identificar lugar | | |
| 5 | Abrir repertorio | | |
| 6 | Abrir un canto | | |
| 7 | Buscar un canto | | |
| 8 | Calendario (opcional) | | |

### Respuestas de cierre

| Pregunta | Respuesta textual |
|---|---|
| ¿Encontraste lo que buscabas? | |
| ¿Qué te confundió? | |
| ¿Qué dato faltó? | |
| ¿Lo usarías por WhatsApp? | |
| ¿Qué cambiarías? | |
| Tema claro/oscuro (opcional) | |
| Botón volver arriba (opcional) | |
| Móvil vs desktop (opcional) | |

### Tabla resumen consolidada (una fila por usuario)

| Usuario | Perfil | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | ¿Usaría por WhatsApp? | Mejora principal sugerida |
|---|---|---|---|---|---|---|---|---|---|---|---|
| U1 | | | | | | | | | | | |
| U2 | | | | | | | | | | | |
| U3 | | | | | | | | | | | |
| U4 | | | | | | | | | | | |
| U5 | | | | | | | | | | | |
| U6 | | | | | | | | | | | |

---

## 7. Criterios de éxito y cómo interpretar los resultados

### Criterios del roadmap

| Criterio | Cómo medirlo | Éxito |
|---|---|---|
| La mayoría encuentra eventos sin ayuda | Tarea 1 completada con **S** | Al menos 4 de 6 usuarios |
| La mayoría entiende el repertorio | Tarea 5 completada con **S** o **A** (ayuda mínima) | Al menos 4 de 6 usuarios |
| Nadie necesita login para consultar | Ningún usuario menciona login/registro como barrera ni lo pide | 0 menciones como barrera |
| Se detectan mejoras concretas | Mejoras accionables registradas en la sección 8 | Al menos 3 mejoras concretas |

### Cómo interpretar

- **Tarea con mayoría S:** la navegación funciona; no tocar esa parte.
- **Tarea con mayoría A:** hay un punto de fricción; revisar textos, ubicación
  o etiquetas de esa vista.
- **Tarea con mayoría N:** hay un bloqueo real; esa vista necesita rediseño o
  mejor guía antes de la Fase 10.
- **Si nadie menciona login:** se confirma que la POC estática sin login es
  suficiente para consulta pública.
- **Si los usuarios no entienden que los datos son de ejemplo:** la opción A
  no se explicó bien; anotarlo y repetir con la opción B o C.

### Decisión final

Con los 4 criterios cumplidos, la POC "ayuda realmente" y se justifica pasar a
la **Fase 10 — Ajustes posteriores** (textos, orden visual, datos reales,
accesibilidad, optimización) y evaluar si conviene la Etapa 2 (versión
moderna). Si algún criterio falla, primero implementar las mejoras detectadas y
repetir la prueba con los mismos usuarios o un grupo nuevo.

---

## 8. Mejoras detectadas

Consolidar aquí todos los hallazgos de las planillas. Una fila por mejora.

| # | Mejora detectada | Evidencia (usuario / tarea / cita) | Impacto (alto / medio / bajo) | Esfuerzo (alto / medio / bajo) | Decisión (Fase 10 / backlog / descartar) |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

### Cómo decidir qué se implementa

1. **Impacto alto + esfuerzo bajo:** implementar primero en la Fase 10.
2. **Impacto alto + esfuerzo alto:** evaluar con el coordinador; puede pasar a
   backlog de la Etapa 2.
3. **Impacto bajo:** registrar en backlog; no bloquear la Fase 10.
4. **Repetida por varios usuarios:** subir su prioridad, aunque el impacto
   parezca bajo.
5. La decisión final de qué se implementa la toma el coordinador (o Álvaro),
   no el evaluador. Esta guía solo consolida la evidencia.

Recordar que la Fase 10 del roadmap incluye "agregar datos reales": si la
prueba confirma que el contenido de ejemplo confunde, actualizar `data/*.json`
con datos reales es una mejora prioritaria.

---

## 9. Checklist de cierre de la prueba

- [ ] Se completaron las planillas de los 6 usuarios (o la cantidad real).
- [ ] Se registró la opción de datos ficticios usada (A / B / C).
- [ ] Se consolidaron las mejoras en la sección 8.
- [ ] Se evaluaron los 4 criterios de éxito de la sección 7.
- [ ] Se decidió (con el coordinador) qué mejoras pasan a la Fase 10.
- [ ] Se agradeció a los participantes y se les contó qué se hará con sus comentarios.

---

*Documento operativo de la línea base. No modifica código del producto,
`ALMA.md` ni `opencode.json`. Fuente del roadmap:
[10-plan-implementacion.md](10-plan-implementacion.md).*