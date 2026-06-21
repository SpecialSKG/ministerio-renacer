# Proyecto: Plataforma web para Ministerio de Música

## 1. Resumen general

Este documento define el concepto general, alcance inicial, temario y visión del proyecto de una plataforma web para apoyar la organización de un ministerio de música de iglesia.

La idea nace de una necesidad práctica: el grupo no cuenta con un lugar centralizado donde consultar eventos, ensayos, compromisos, repertorios, letras de cantos, acordes, indicaciones de vestimenta, horarios de reunión y detalles importantes para cada participación.

El proyecto no busca iniciar como una aplicación compleja. Se plantea en dos etapas principales:

1. **Etapa 1: Prueba de concepto / ruta mínima**
   - Validar si la idea realmente ayuda.
   - Crear una versión sencilla, funcional y desplegada gratis.
   - Priorizar consulta pública de información, eventos y cantos.
   - Evitar sobrecargar el sistema con funciones avanzadas desde el inicio.

2. **Etapa 2: Versión moderna y escalable**
   - Incorporar base de datos, autenticación, administración, roles, repertorios, PDF y mejoras funcionales.
   - Evolucionar hacia una herramienta interna más completa para el ministerio.
   - Mantener la consulta pública simple, pero con administración privada para usuarios autorizados.

La filosofía del proyecto es: **primero validar utilidad, luego escalar con orden**.

---

## 2. Problema a resolver

Actualmente, la información del ministerio puede estar dispersa en conversaciones de WhatsApp, mensajes sueltos, archivos compartidos, hojas de canto, recuerdos personales o avisos informales.

Esto puede generar problemas como:

- Fechas olvidadas o mal comunicadas.
- Ensayos sin claridad de hora o lugar.
- Eventos sin detalles completos.
- Repertorios enviados tarde o de forma desordenada.
- Dificultad para encontrar letras y acordes.
- Dependencia de una o dos personas para responder información repetida.
- Adultos o miembros menos tecnológicos que pueden confundirse con demasiadas aplicaciones.
- Falta de historial sobre qué cantos se usaron en eventos anteriores.

La solución busca centralizar la información en una web sencilla, accesible desde celular y sin exigir login a todos los miembros.

---

## 3. Objetivo del proyecto

Crear una plataforma web que permita:

- Presentar información general del ministerio.
- Consultar próximos eventos y ensayos.
- Ver detalles completos de cada evento.
- Consultar una biblioteca de cantos.
- Asociar cantos a eventos específicos.
- Construir repertorios ordenados.
- Facilitar la generación o descarga de repertorios en PDF en fases posteriores.
- Permitir que solo administradores o editores puedan modificar información.
- Mantener la mayor parte del contenido visible para cualquier persona, sin barreras innecesarias.

---

## 4. Principios de diseño del producto

El proyecto debe seguir estos principios:

### 4.1 Simplicidad antes que complejidad

La primera versión debe ser pequeña, entendible y terminable. No se debe intentar construir todo el sistema definitivo desde el inicio.

### 4.2 Consulta pública sin fricción

La mayoría de usuarios solo necesita ver información. Por eso, no deben iniciar sesión para consultar:

- Landing page.
- Calendario.
- Eventos.
- Cantos.
- Repertorios publicados.

### 4.3 Administración restringida

El login debe existir solo para personas encargadas:

- Administrador.
- Editor.
- Posiblemente colaborador en una fase futura.

Los miembros normales no necesitan cuenta.

### 4.4 Mobile-first

El uso principal probablemente será desde teléfono. La interfaz debe ser clara, rápida y cómoda en pantalla pequeña.

### 4.5 Crecimiento por fases

Cada fase debe aportar valor real por sí misma. No se debe depender de una versión “perfecta” para que el proyecto sea útil.

---

## 5. Usuarios del sistema

### 5.1 Visitante público

Persona que entra al sitio para conocer el ministerio o consultar información general.

Puede ver:

- Información del grupo.
- Horarios generales.
- Próximos eventos publicados.
- Cantos publicados.
- Repertorios públicos.

No puede editar nada.

### 5.2 Miembro del ministerio

Persona que participa en ensayos, eventos o celebraciones.

Puede ver:

- Calendario.
- Detalles de eventos.
- Hora de reunión.
- Lugar.
- Vestimenta.
- Tipo de participación.
- Cantos asignados.
- Repertorio del evento.

No necesita login en la primera versión.

### 5.3 Editor

Persona autorizada para agregar o modificar información.

Puede:

- Crear eventos.
- Editar eventos.
- Agregar cantos.
- Editar letras y acordes.
- Construir repertorios.
- Publicar o despublicar contenido.

### 5.4 Administrador

Persona con control total del sistema.

Puede:

- Gestionar usuarios autorizados.
- Crear y editar contenido.
- Revisar configuraciones.
- Corregir datos.
- Gestionar roles.
- Supervisar publicación de eventos y cantos.

---

## 6. Módulos principales del proyecto

## 6.1 Landing page pública

La landing será la página de presentación del ministerio.

Debe incluir, de forma simple:

- Nombre del ministerio.
- Breve descripción.
- Propósito o misión.
- Horarios generales de ensayo.
- Sección de próximos eventos.
- Enlaces rápidos:
  - Ver calendario.
  - Ver cantos.
  - Contacto.
  - Redes sociales, si existen.
- Información básica de ubicación o parroquia, si aplica.

La landing puede ser una sola página con secciones, usando navegación por anclas para evitar enrutamiento innecesario.

---

## 6.2 Calendario y eventos

El calendario es uno de los núcleos principales del sistema.

En la primera versión puede ser una lista de eventos ordenada por fecha, sin necesidad de construir un calendario visual complejo tipo Google Calendar.

Cada evento puede tener:

- Título.
- Tipo de evento:
  - Ensayo.
  - Misa.
  - Rosario.
  - Rezo.
  - Vigilia.
  - Retiro.
  - Oratorio.
  - Evento especial.
  - Reunión.
- Fecha.
- Hora de inicio.
- Hora de reunión del grupo.
- Lugar.
- Indicaciones de salida o punto de encuentro.
- Descripción.
- Vestimenta para hombres.
- Vestimenta para mujeres.
- Modalidad musical:
  - Acústico.
  - Eléctrico.
  - Mixto.
- Responsable o coordinador.
- Estado:
  - Borrador.
  - Publicado.
  - Cancelado.
  - Pendiente de confirmar.
- Repertorio asociado.

En fases futuras puede incluirse un botón para agregar el evento a Google Calendar.

---

## 6.3 Detalle de evento

Cada evento debe tener una página propia o vista individual.

Esta vista debe ser clara y útil para un miembro que entra desde el celular antes de un ensayo o evento.

Debe mostrar:

- Nombre del evento.
- Fecha y hora.
- Lugar.
- Hora de reunión.
- Descripción.
- Indicaciones importantes.
- Vestimenta.
- Tipo de acompañamiento musical.
- Lista de cantos asignados.
- Enlace al repertorio.
- Botón para compartir.
- Botón para agregar a calendario, en fases posteriores.

Esta pantalla es una de las más importantes del proyecto.

---

## 6.4 Biblioteca de cantos

La biblioteca de cantos permitirá digitalizar y consultar letras, acordes y datos musicales.

Cada canto puede tener:

- Título.
- Letra.
- Acordes.
- Tonalidad base.
- Categoría:
  - Entrada.
  - Perdón.
  - Gloria.
  - Aleluya.
  - Ofertorio.
  - Santo.
  - Cordero.
  - Comunión.
  - Salida.
  - Mariano.
  - Adoración.
  - Alabanza.
  - Cuaresma.
  - Adviento.
  - Navidad.
  - Pascua.
  - Otro.
- Etiquetas.
- Fuente o referencia, si aplica.
- Observaciones.
- Estado:
  - Borrador.
  - Publicado.
- Fecha de creación.
- Última actualización.

La biblioteca debe tener buscador. En fases futuras puede incluir filtros por categoría, tonalidad o uso litúrgico.

---

## 6.5 Detalle de canto

Cada canto debe tener su propia vista.

Debe mostrar:

- Título.
- Tonalidad.
- Letra.
- Acordes.
- Categoría.
- Notas.
- Opciones futuras:
  - Cambiar tonalidad.
  - Copiar letra.
  - Descargar como PDF.
  - Agregar a repertorio.

En la primera etapa puede ser una vista solo de lectura.

---

## 6.6 Repertorios

El repertorio es el vínculo entre eventos y cantos.

Un repertorio permite tomar varios cantos de la biblioteca y ordenarlos para un evento específico.

Ejemplo:

1. Canto de entrada.
2. Perdón.
3. Gloria.
4. Aleluya.
5. Ofertorio.
6. Santo.
7. Cordero.
8. Comunión.
9. Salida.

Cada elemento del repertorio puede tener:

- Canto asociado.
- Orden.
- Tonalidad para ese evento.
- Nota específica.
- Indicación musical:
  - Intro.
  - Repeticiones.
  - Subida de tono.
  - Solo voz.
  - Solo guitarra.
  - Versión corta.
  - Versión completa.

En la primera etapa puede manejarse como una lista simple. En fases posteriores puede convertirse en un constructor visual de repertorios.

---

## 6.7 Constructor de repertorio

Este módulo pertenece a una fase posterior.

Funcionaría como un “carrito musical” o “constructor de repertorio”, donde el administrador/editor pueda:

- Buscar cantos.
- Agregarlos a un evento.
- Reordenarlos.
- Cambiar tonalidad por canto.
- Añadir notas.
- Guardar el repertorio.
- Generar un enlace público.
- Exportar a PDF.

Este módulo representa una de las funciones diferenciales del sistema.

---

## 6.8 Generación de PDF

La exportación a PDF debe considerarse una función de segunda etapa, no del primer MVP.

El PDF podría incluir:

- Nombre del evento.
- Fecha.
- Lugar.
- Hora de reunión.
- Indicaciones.
- Lista ordenada de cantos.
- Letras y acordes.
- Tonalidad de cada canto.
- Notas musicales.
- Logo o identidad visual del ministerio.

En la primera implementación puede ser un PDF básico. Más adelante puede evolucionar a plantillas mejor diseñadas.

---

## 6.9 Transposición de acordes

La transposición de tonalidad es viable, pero debe tratarse con cuidado.

Para funcionar bien, los acordes deben tener un formato consistente.

Ejemplos de acordes que el sistema debe poder reconocer en fases futuras:

- C
- D
- E
- F
- G
- A
- B
- Do
- Re
- Mi
- Fa
- Sol
- La
- Si
- F#m
- Bb
- G/B
- Csus4
- Dm7
- A7

Riesgo principal: si los cantos se copian desde diferentes fuentes sin normalizar, el transpositor puede fallar.

Por eso, antes de implementar esta función, se debe definir un formato estándar para escribir letras y acordes.

---

## 7. Etapas del proyecto

# Etapa 1: Prueba de concepto / ruta mínima

## Objetivo

Validar que la idea funciona y que realmente puede servir al ministerio sin invertir dinero ni construir demasiado.

## Alcance recomendado

La primera etapa debe incluir:

- Landing simple.
- Lista de eventos.
- Detalle de evento.
- Lista de cantos.
- Detalle de canto.
- Contenido cargado manualmente o desde archivos simples.
- Despliegue gratuito.
- Sin login.
- Sin base de datos compleja.
- Sin PDF.
- Sin transposición.
- Sin panel administrativo avanzado.

## Posible enfoque técnico

Opciones viables:

- GitHub Pages.
- Cloudflare Pages.
- Archivos Markdown o JSON.
- Sitio estático con HTML, CSS y JavaScript.
- Alternativamente React o Astro si se desea una estructura más ordenada.

## Ventajas

- Bajo costo.
- Fácil de desplegar.
- Menos fricción.
- Permite probar diseño y navegación.
- Permite mostrar una demo real al grupo.
- Reduce el riesgo de abandonar el proyecto por complejidad.

## Limitaciones

- Para editar contenido hay que modificar archivos.
- No hay administración visual.
- No hay usuarios ni roles.
- No hay base de datos real.
- No es la versión definitiva.

## Resultado esperado

Una web pública funcional que permita decir:

“Ya existe un lugar donde consultar próximos eventos y cantos.”

---

# Etapa 2: Versión moderna y escalable

## Objetivo

Convertir la prueba de concepto en una herramienta más real, con datos dinámicos, administración privada y crecimiento ordenado.

## Alcance recomendado

La segunda etapa puede incluir:

- Frontend moderno.
- Base de datos.
- Autenticación.
- Roles.
- Panel de administración.
- CRUD de eventos.
- CRUD de cantos.
- Repertorios por evento.
- Publicación/despublicación de contenido.
- Generación básica de PDF.
- Vista pública de repertorio.
- Posible integración con Google Calendar.

## Posible stack recomendado

Una ruta moderna y práctica sería:

- Frontend: React, Next.js o Astro.
- Hosting frontend: Cloudflare Pages o Vercel.
- Base de datos: Supabase.
- Auth: Supabase Auth.
- Backend ligero: Supabase Edge Functions o Cloudflare Workers.
- Storage: Supabase Storage.
- PDF básico: generación desde cliente o función ligera.

## Ventajas

- Login solo para administradores y editores.
- Base de datos real.
- Mejor seguridad.
- Mejor mantenimiento.
- Menos necesidad de backend tradicional.
- Escalable para el tamaño del ministerio.
- Permite crecer sin rehacer todo desde cero.

## Limitaciones

- Requiere más aprendizaje técnico.
- Requiere diseñar bien la base de datos.
- Requiere cuidar permisos y seguridad.
- Algunas funciones avanzadas pueden exigir servicios pagos más adelante.
- La generación avanzada de PDF puede necesitar infraestructura adicional.

---

## 8. Arquitecturas consideradas

## 8.1 Ruta mínima

```txt
Usuario
  ↓
Sitio estático
  ↓
GitHub Pages / Cloudflare Pages
  ↓
Contenido en Markdown / JSON
```

Adecuada para:

- Prueba de concepto.
- Landing.
- Eventos públicos simples.
- Cantos públicos simples.
- Validar navegación e idea general.

No adecuada para:

- Login.
- Administración visual.
- Roles.
- Edición desde navegador.
- Repertorios dinámicos avanzados.

---

## 8.2 Ruta moderna sin backend tradicional

```txt
Usuario público
  ↓
Frontend en Cloudflare Pages o Vercel
  ↓
Supabase
  ├── Base de datos
  ├── Auth
  ├── Storage
  └── Edge Functions
```

Adecuada para:

- Sistema real del ministerio.
- Panel admin.
- Roles.
- Eventos dinámicos.
- Cantos dinámicos.
- Repertorios.
- PDF básico.
- Crecimiento moderado.

---

## 8.3 Ruta tipo Heroku moderna

```txt
Usuario
  ↓
Frontend en Cloudflare Pages
  ↓
Backend/API en Koyeb
  ↓
Base de datos en Supabase / Neon / Koyeb DB
```

Adecuada para:

- Backend tradicional.
- API propia.
- Procesos más pesados.
- Generación de PDFs complejos.
- Mayor control técnico.

No recomendada como primera opción para el MVP, porque agrega más piezas que mantener.

---

## 9. Comparación conceptual de rutas

| Ruta | Dificultad | Costo inicial | Escalabilidad | Ideal para |
|---|---:|---:|---:|---|
| GitHub Pages / Cloudflare Pages estático | Baja | $0 | Baja-media | Prueba de concepto |
| Cloudflare Pages + Supabase | Media | $0 | Media-alta | Versión moderna ligera |
| Vercel + Supabase | Media | $0 | Media-alta | Desarrollo cómodo con React/Next |
| Cloudflare Pages + Koyeb + DB | Media-alta | $0 limitado | Alta | Backend/API más tradicional |
| VPS propio | Alta | Bajo-medio | Alta | Control total, pero más mantenimiento |

---

## 10. Funciones fuera de alcance para el inicio

Para evitar que el proyecto se vuelva demasiado grande, la primera etapa no debe incluir:

- Login.
- Roles.
- Panel de administración.
- PDF automático.
- Transposición automática.
- Constructor visual de repertorio.
- Integración directa con Google Calendar.
- Notificaciones automáticas.
- Confirmación de asistencia.
- Estadísticas.
- App móvil.
- Sistema de comentarios.
- Gestión compleja de usuarios.

Estas funciones pueden entrar después, cuando ya exista una base funcional.

---

## 11. Riesgos principales

## 11.1 Alcance demasiado grande

El riesgo más alto es intentar construir todo desde el inicio.

Mitigación:

- Dividir en fases.
- Terminar una versión simple primero.
- Evitar funciones avanzadas hasta validar la utilidad.

## 11.2 Baja adopción del grupo

Algunos miembros podrían no usar la web si sienten que es complicada.

Mitigación:

- No pedir login para consultar.
- Crear enlaces claros.
- Compartir por WhatsApp.
- Diseñar para celular.
- Mantener textos simples.

## 11.3 Mantenimiento del contenido

Si nadie actualiza eventos o cantos, el sistema pierde valor.

Mitigación:

- Nombrar uno o dos responsables.
- Mantener el flujo de edición simple.
- Empezar con pocos datos bien cargados.

## 11.4 Formato inconsistente de cantos

Si las letras y acordes se cargan sin orden, funciones como transposición o PDF fallarán.

Mitigación:

- Definir una plantilla de canto.
- Normalizar acordes.
- Revisar antes de publicar.

## 11.5 Dependencia de plataformas gratuitas

Los planes gratuitos pueden cambiar o tener límites.

Mitigación:

- Usar servicios conocidos.
- Mantener backups.
- Evitar amarrarse a funciones demasiado específicas.
- Tener una ruta de migración.

---

## 12. Datos relevantes que deberían manejarse

## 12.1 Evento

Campos sugeridos:

- id
- slug
- título
- tipo de evento
- fecha
- hora de inicio
- hora de reunión
- lugar
- descripción
- vestimenta hombres
- vestimenta mujeres
- modalidad musical
- responsable
- estado
- repertorio asociado
- fecha de creación
- fecha de actualización

## 12.2 Canto

Campos sugeridos:

- id
- slug
- título
- letra
- acordes
- tonalidad base
- categoría
- etiquetas
- fuente
- observaciones
- estado
- fecha de creación
- fecha de actualización

## 12.3 Repertorio

Campos sugeridos:

- id
- evento_id
- título
- descripción
- estado
- fecha de creación
- fecha de actualización

## 12.4 Canto dentro de repertorio

Campos sugeridos:

- repertorio_id
- canto_id
- orden
- tonalidad usada
- notas
- indicaciones musicales

## 12.5 Usuario administrativo

Campos sugeridos:

- id
- nombre
- email
- rol
- estado
- fecha de creación

---

## 13. Temario de trabajo futuro

Este es el temario sugerido para continuar el proyecto en orden.

## 13.1 Definición de identidad y contenido

- Nombre del proyecto.
- Nombre del ministerio.
- Logo.
- Paleta de colores.
- Tipografía.
- Estilo visual.
- Tono de comunicación.
- Secciones de la landing.
- Información pública inicial.

## 13.2 Diseño y experiencia de usuario

- Mapa del sitio.
- Wireframes.
- Diseño mobile-first.
- Diseño de landing.
- Diseño de lista de eventos.
- Diseño de detalle de evento.
- Diseño de biblioteca de cantos.
- Diseño de detalle de canto.
- Diseño del panel admin.
- Diseño del constructor de repertorio.

## 13.3 Maquetación

- Estructura HTML.
- Estilos CSS.
- Componentes reutilizables.
- Navegación.
- Responsividad.
- Estados vacíos.
- Estados de carga.
- Accesibilidad básica.

## 13.4 Prueba de concepto

- Crear estructura del proyecto.
- Crear contenido de prueba.
- Crear landing.
- Crear lista de eventos.
- Crear detalle de evento.
- Crear lista de cantos.
- Crear detalle de canto.
- Desplegar en plataforma gratuita.
- Compartir demo.

## 13.5 Versión dinámica

- Elegir stack definitivo.
- Crear base de datos.
- Definir tablas.
- Conectar frontend con backend.
- Crear panel admin.
- Crear autenticación.
- Aplicar roles.
- Crear CRUD de eventos.
- Crear CRUD de cantos.

## 13.6 Repertorios

- Asociar cantos a eventos.
- Ordenar cantos.
- Guardar tonalidad por canto.
- Crear vista pública de repertorio.
- Crear link compartible.
- Preparar exportación.

## 13.7 PDF y exportación

- Definir plantilla PDF.
- Generar PDF básico.
- Descargar repertorio.
- Incluir logo.
- Incluir datos del evento.
- Incluir letras y acordes.
- Probar impresión desde celular y computadora.

## 13.8 Transposición

- Definir formato de acordes.
- Crear parser de acordes.
- Probar tonos mayores y menores.
- Probar sostenidos y bemoles.
- Aplicar transposición por canto.
- Guardar tonalidad usada en repertorio.
- Validar con músicos.

## 13.9 Integraciones futuras

- Botón para agregar a Google Calendar.
- Enlaces a Google Maps.
- Compartir por WhatsApp.
- Notificaciones manuales o automáticas.
- Confirmación de asistencia.
- Historial de eventos.
- Estadísticas de cantos usados.

---

## 14. Recomendación de ejecución

La recomendación general es no iniciar directamente con la versión moderna completa.

El orden recomendado es:

1. Crear una prueba de concepto estática.
2. Validar estructura, contenido y navegación.
3. Mostrar una demo funcional.
4. Ajustar diseño y flujo.
5. Luego migrar a una arquitectura moderna con base de datos y auth.
6. Implementar repertorios.
7. Agregar PDF.
8. Agregar transposición.
9. Evaluar integraciones avanzadas.

---

## 15. Criterios para considerar exitosa la primera etapa

La prueba de concepto será exitosa si logra:

- Estar publicada gratis.
- Ser visible desde celular.
- Mostrar información básica del ministerio.
- Mostrar próximos eventos.
- Mostrar detalles de al menos algunos eventos.
- Mostrar una biblioteca inicial de cantos.
- Permitir consultar letras sin login.
- Ser fácil de compartir por WhatsApp.
- Servir como base para decidir si vale la pena construir la segunda etapa.

---

## 16. Decisión estratégica actual

La decisión tomada para este momento es trabajar en dos etapas:

### Etapa 1

Prueba de concepto simple, probablemente estática, con despliegue gratuito.

### Etapa 2

Versión moderna, más completa, usando una arquitectura con frontend desplegado en plataforma gratuita y backend/base de datos gestionada.

Esta decisión reduce riesgo, evita sobrecarga técnica y permite avanzar de forma ordenada.

---

## 17. Próximo paso

El siguiente paso natural es trabajar en:

1. Diseño visual.
2. Maquetación.
3. Estructura de carpetas.
4. Contenido inicial.
5. Plan de ejecución por fases.

Antes de escribir código avanzado, conviene definir cómo se verá y cómo navegará la primera prueba de concepto.
