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

### Datos reales (septiembre–octubre 2026)

Los datos en `data/*.json` son **reales** y corresponden a septiembre y octubre
de 2026. Fecha base de esta guía: **2026-10-04**.

- Los ensayos del 28, 29 y 30 de septiembre (`evt-001`–`evt-003`) y las misas
  y el encuentro del 2 y 3 de octubre (`evt-004`, `evt-005`) **ya pasaron**.
- El **próximo evento** es **`evt-006` "Novena a San Daniel Comboni"**
  (`2026-10-05`, 18:00, Parroquia San Daniel Comboni).
- Solo **`evt-001`** (pasado) tiene repertorio asociado (`rep-001`,
  "Repertorio Ensayo"); el resto de eventos no tiene `repertoireId`.
- Los eventos reales **no tienen** `meetingTime` (hora de reunión); el campo es
  opcional y hoy no está presente en los datos.
- Los cantos son `song-001` ("Canto de Alabanza") y `song-002` ("Canto de
  Comunión").

Si la prueba se ejecuta en una fecha posterior al 2026-10-04, "el próximo
evento" puede cambiar: registrar la fecha real de la sesión y recalcular el
dato esperado de la tarea 1. Para editar o actualizar los datos, ver
[guia-mantenimiento.md](guia-mantenimiento.md).

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
- [ ] Anotar la fecha real de la sesión (el "próximo evento" depende de la fecha).
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
silencio y anotar. Los "datos esperados" usan los datos reales de `data/*.json`
con fecha base 2026-10-04.

### Tarea 1 — Encontrar el próximo evento

- **Instrucción:** "Imaginá que querés saber cuál es el próximo evento del
  ministerio. ¿Cómo lo buscarías?"
- **Qué observar:** por dónde empieza (landing, menú, calendario), si duda, si
  pregunta, cuánto tarda.
- **Dato esperado:** el próximo evento es `evt-006` "Novena a San Daniel
  Comboni" (2026-10-05, 18:00). Desde el 2026-10-04 ya pasaron los ensayos del
  28–30 de septiembre y las misas/encuentro del 2–3 de octubre; la vista
  `#/eventos` muestra **todos** los eventos publicados ordenados por fecha
  (incluidos los pasados), mientras que "Próximos encuentros" en la landing
  solo muestra de hoy en adelante.

### Tarea 2 — Abrir el detalle del evento

- **Instrucción:** "Abrí ese evento para ver más información."
- **Qué observar:** si identifica que el evento es clicable, si logra abrir el
  detalle, si sabe volver a la lista.

### Tarea 3 — Identificar la hora del evento

- **Instrucción:** "¿A qué hora es ese evento?"
- **Qué observar:** si encuentra la hora en el detalle sin rebuscar, y si
  entiende que es la hora de inicio.
- **Dato esperado:** 18:00 (`evt-006`). Nota: los eventos reales **no tienen**
  `meetingTime` (hora de reunión), por lo que hoy no hay una hora de llegada
  separada; si un evento futuro incorpora ese campo, esta tarea puede pedir
  distinguir ambas.

### Tarea 4 — Identificar el lugar

- **Instrucción:** "¿Dónde se realiza ese evento?"
- **Qué observar:** si encuentra el lugar en el detalle sin rebuscar.
- **Dato esperado:** "Parroquia San Daniel Comboni" (`evt-006`).

### Tarea 5 — Abrir el repertorio

- **Instrucción:** "¿Qué cantos se van a tocar en ese evento?"
- **Qué observar:** primero, cómo reacciona ante el estado "sin repertorio"
  (el próximo evento `evt-006` no tiene `repertoireId`). Luego pedir que abra
  `evt-001` "Ensayo" (2026-09-28) como demo y observar si encuentra la lista de
  cantos y si nota el orden.
- **Dato esperado:** `evt-001` tiene el repertorio `rep-001` "Repertorio
  Ensayo" con 2 cantos (song-001 y song-002, en ese orden).
- **Nota:** `evt-001` es el único evento con repertorio y es pasado; el próximo
  evento (`evt-006`) no tiene repertorio. Registrar si el estado vacío se
  entiende.

### Tarea 6 — Abrir un canto del repertorio

- **Instrucción:** "Abrí uno de los cantos del repertorio."
- **Qué observar:** si navega al detalle del canto, si lee la letra, si sabe
  volver al repertorio o al evento.
- **Nota:** depende de haber abierto `evt-001` en la tarea 5; si no se abrió,
  omitir o marcar N/A.

### Tarea 7 — Buscar un canto

- **Instrucción:** "Buscá un canto que hable de comunión."
- **Qué observar:** si usa el buscador de cantos, si escribe bien el término,
  si entiende los resultados y el estado vacío (si no hay coincidencias).
- **Dato esperado:** "Canto de Comunión" (song-002).

### Tarea 8 — Calendario (adicional, si el tiempo alcanza)

- **Instrucción:** "Usá el calendario para ver en qué días de octubre hay un
  evento."
- **Qué observar:** si navega entre meses, si entiende los días marcados, si
  abre el detalle desde el calendario.
- **Dato esperado:** en octubre de 2026 están marcados los días **2, 3, 5, 8,
  11, 18, 24, 25 y 31**.

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
| Fecha real de la sesión | |

### Registro por tarea

Marca con **S** (sin ayuda), **A** (con ayuda) o **N** (no completada) y anota
observaciones.

| # | Tarea | S / A / N | Notas y observaciones |
|---|---|---|---|
| 1 | Encontrar próximo evento | | |
| 2 | Abrir detalle del evento | | |
| 3 | Identificar hora del evento | | |
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
- **Si el "próximo evento" esperado ya pasó (prueba tardía):** registrar la
  fecha real de la sesión y recalcular el dato esperado de la tarea 1 antes de
  interpretar el resultado.

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

Recordar que la Fase 10 del roadmap incluye ajustes posteriores: como los datos
ya son reales, mantener `data/*.json` al día es una mejora prioritaria (ver
[guia-mantenimiento.md](guia-mantenimiento.md)).

---

## 9. Checklist de cierre de la prueba

- [ ] Se completaron las planillas de los 6 usuarios (o la cantidad real).
- [ ] Se registró la fecha real de la sesión.
- [ ] Se consolidaron las mejoras en la sección 8.
- [ ] Se evaluaron los 4 criterios de éxito de la sección 7.
- [ ] Se decidió (con el coordinador) qué mejoras pasan a la Fase 10.
- [ ] Se agradeció a los participantes y se les contó qué se hará con sus comentarios.

---

*Documento operativo de la línea base. No modifica código del producto,
`ALMA.md` ni `opencode.json`. Fuente del roadmap:
[10-plan-implementacion.md](10-plan-implementacion.md).*