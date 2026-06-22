# Informe para crear una POC fácil en HTML, CSS y JavaScript para la plataforma del ministerio de música

## Resumen ejecutivo

La versión “fácil” y realista de esta plataforma **sí es viable** como POC puramente estática en **HTML/CSS/JS**, sin backend y sin hosting pagado, siempre que el alcance se mantenga pequeño: **sitio público**, **datos en JSON estático**, **navegación simple**, **lista y detalle de eventos**, **lista y detalle de cantos**, y **edición manual local de archivos JSON** por parte del administrador. Esa arquitectura encaja de forma natural en servicios de static hosting como **GitHub Pages**, **Cloudflare Pages** y **Vercel**, que publican archivos HTML/CSS/JS directamente desde un repositorio; además, Cloudflare Pages y Vercel permiten escalar después hacia funciones serverless sin cambiar el frontend completo. 

La recomendación práctica para esta POC es: **una sola aplicación estática, mobile-first, con rutas por hash o query string, sin login, sin panel web de administración, sin PDF, sin transposición y sin edición desde navegador**. El “admin” en esta etapa debe ser simplemente **editar `events.json` y `songs.json` localmente y volver a publicar**. Eso minimiza complejidad, evita problemas de autenticación y permite validar si la gente realmente consulta eventos y repertorios antes de invertir en una versión moderna con base de datos y roles. 

Entre los despliegues gratis, **Cloudflare Pages** ofrece hoy el mejor equilibrio para esta POC: soporta sitios estáticos sin framework, tiene **preview deployments** por rama o pull request, y las solicitudes a assets estáticos son **gratis e ilimitadas**; GitHub Pages es la opción más simple si todo seguirá siendo estático y el flujo será muy manual; Vercel también funciona técnicamente muy bien, pero su plan Hobby está orientado a **uso personal y no comercial**, por lo que conviene tratarlo como opción secundaria para esta POC institucional/comunitaria. 

## Alcance de la POC y MVP mínimo

### Objetivo exacto de la POC

El objetivo de la POC no es “crear la plataforma final”, sino **probar si un sitio web simple centraliza mejor la información del ministerio** que WhatsApp y enlaces dispersos. La POC debe responder tres preguntas concretas: si los usuarios encuentran el próximo evento rápido, si entienden el repertorio asociado a cada evento, y si el administrador puede actualizar el contenido sin depender de infraestructura compleja. Como la base será estática, la solución debe aprovechar carga de datos por `fetch()` desde JSON y una arquitectura de cliente liviana. 

### Qué incluir y qué excluir

| Incluir en la POC | Prioridad | Excluir en la POC | Motivo |
|---|---:|---|---|
| Landing simple del ministerio | Alta | Login | Requiere auth y gestión de sesiones |
| Lista pública de eventos | Alta | Panel de administración web | Implica backend o persistencia en cliente |
| Detalle de evento con repertorio | Alta | Edición desde navegador | Riesgo de pérdida de datos y complejidad |
| Lista pública de cantos | Alta | Subida de archivos | Requiere storage y permisos |
| Detalle de canto | Alta | PDF | Añade librerías y formato |
| Búsqueda simple por texto | Media | Transposición automática | Requiere parser de acordes consistente |
| Diseño responsive y accesible | Alta | Roles múltiples | No aporta al aprendizaje inicial |
| Edición local de JSON por el administrador | Alta | Integración con Google Calendar | Se deja para fase moderna |

La POC debe ser **de solo lectura para el público**. El mantenimiento en esta etapa se hace editando JSON localmente y desplegando de nuevo. Ese enfoque es coherente con static hosting puro y evita introducir componentes dinámicos antes de validar valor real. 

### Requisitos funcionales y no funcionales mínimos con criterios de aceptación

| Tipo | Requisito MVP | Criterio de aceptación |
|---|---|---|
| Funcional | Mostrar landing con información básica del ministerio | Se visualiza correctamente en móvil y escritorio; menú navega a secciones sin errores |
| Funcional | Cargar eventos desde `data/events.json` | Si el JSON existe y es válido, la lista se renderiza sin recargar toda la página |
| Funcional | Mostrar detalle de evento | Al seleccionar un evento se ven fecha, hora, lugar, tipo, vestimenta y repertorio |
| Funcional | Cargar cantos desde `data/songs.json` | La lista muestra título y categoría; el detalle enseña letra/acordes en texto |
| Funcional | Vincular evento con repertorio | Cada evento puede listar IDs de cantos y el detalle debe resolverlos |
| Funcional | Búsqueda simple | Buscar por texto filtra eventos o cantos por nombre |
| No funcional | Sitio estático deployable gratis | Debe publicarse sin backend en GitHub Pages, Cloudflare Pages o Vercel |
| No funcional | Mobile-first | Navegación usable en pantallas pequeñas, sin desbordes horizontales |
| No funcional | Accesibilidad básica | Estructura semántica, etiquetas asociadas a inputs, landmarks y teclado funcional |
| No funcional | Rendimiento razonable | Sin dependencias pesadas; primera carga rápida con JSON liviano |
| No funcional | Mantenibilidad | Un tercero puede actualizar datos leyendo `README.md` y editando JSON |

La parte de accesibilidad no debe tratarse como opcional. W3C recomienda basarse en WCAG 2.x como estándar internacional, y para una POC basta exigir prácticas base: semántica HTML, landmarks, navegación por teclado, contraste suficiente y formularios con `label`. WAI además advierte que las revisiones rápidas son útiles, pero no sustituyen una evaluación más profunda; para este proyecto eso significa que el equipo debe hacer un “mínimo accesible” desde el inicio, aunque la auditoría formal venga después. 

## Arquitectura técnica propuesta y opciones de despliegue

### Propuesta técnica para la POC

La arquitectura recomendada es **vanilla HTML/CSS/JS**, sin framework y sin build obligatorio. La interfaz pública vive en un solo `index.html`; el estado se resuelve en el cliente; los datos vienen de `data/events.json` y `data/songs.json`; y la navegación se maneja con **hash routing** o query params para evitar complicaciones de reescritura en hosts estáticos. Ese patrón encaja especialmente bien con GitHub Pages, que publica archivos estáticos directamente desde el repositorio, y también con Cloudflare Pages, que soporta despliegue de HTML estático “tal cual”. 

Una estructura razonable de carpetas para esta POC es la siguiente:

- `index.html`
- `styles.css`
- `app.js`
- `data/events.json`
- `data/songs.json`
- `assets/` para imágenes o íconos livianos
- `README.md` con instrucciones de edición y despliegue

Para el manejo de datos, la recomendación principal es **JSON estático**. Según MDN, `fetch()` permite recuperar JSON de forma asíncrona y convertirlo con `response.json()`, mientras que `localStorage` sirve para guardar datos pequeños y simples; por eso, para esta primera etapa, `localStorage` solo debería usarse para recordar filtros, vista activa o último evento visto, y no para persistencia editorial. Si luego el proyecto necesita escritura desde navegador, login o colaboración multiusuario, ahí sí conviene pasar a un backend simple o a una BaaS como Supabase. 

### JSON estático versus backend simple

| Opción | Cuándo usarla | Ventajas | Límites |
|---|---|---|---|
| JSON estático | POC inicial | Simplicidad máxima, cero backend, deploy gratis universal | Sin edición online, sin auth, sin logs |
| `localStorage` auxiliar | Recordar filtros/estado | Muy simple, persistencia entre sesiones | Solo datos pequeños por navegador |
| Backend simple o BaaS | Fase moderna | Edición web, auth, roles, archivos, historial | Más costo técnico y operativo |

La decisión correcta para la POC es **JSON estático + edición local**. No es “una solución provisional pobre”; es el punto más eficiente para validar uso real con el menor costo técnico. MDN distingue claramente el almacenamiento simple del navegador del uso de bases de datos más estructuradas como IndexedDB, y esa separación ayuda a no sobrediseñar esta primera versión. 

### Librerías y herramientas recomendadas

Para la POC, lo más recomendable es **cero dependencias obligatorias**. HTML semántico, CSS propio con variables y layout responsive, y JavaScript modular simple bastan. Si quieres una ayuda mínima, puede añadirse Prettier para formato y ESLint básico para consistencia, pero no se justifica un framework UI. La meta es reducir superficie de error y facilitar despliegue en static hosting. El rendimiento también se beneficia de mantener bajas las solicitudes y el tamaño transferido. 

### Despliegue gratis comparativo

| Plataforma | Encaje con esta POC | Fortalezas | Contras para esta POC | Veredicto |
|---|---|---|---|---|
| GitHub Pages | Muy alto | Muy simple; sirve HTML/CSS/JS directo; gratuito en repos públicos | Menos cómodo para previews; URL de proyecto incluye `/repo`; no añade backend real | Excelente si todo será manual |
| Cloudflare Pages | Muy alto | Soporta static HTML; previews por rama/PR; assets estáticos gratis e ilimitados; Functions para crecer | Si luego usas Functions, entras al modelo Workers y sus cuotas | Mejor equilibrio general |
| Vercel | Alto | Muy buena DX; CI/CD integrado; previews; Functions listas para crecer | Hobby enfocado a uso personal/no comercial; más orientado a stacks modernos | Muy bueno técnicamente, con cautela de plan |

La síntesis oficial respaldada por documentación es clara: GitHub Pages es **static hosting** puro desde repositorio y puede usar dominio propio; Cloudflare Pages soporta **cualquier sitio HTML estático**, ofrece **preview deployments** y mantiene las solicitudes a assets estáticos **gratis e ilimitadas**; y Vercel asigna dominio `*.vercel.app`, integra CI/CD y previews, pero su Hobby plan está documentado para **personal projects** y bajo reglas de **non-commercial, personal use only**. 

**Recomendación práctica:** si el objetivo es una POC pública, simple y sin backend, empieza en **Cloudflare Pages**. Si quieres el camino más manual y transparente posible, usa **GitHub Pages**. Deja **Vercel** como tercera opción para el momento en que migres a una versión moderna basada en framework. 

### Plantillas de archivos iniciales y campos JSON

**`events.json`** debería contener una colección de eventos con, como mínimo, estos campos:

| Campo | Tipo | Obligatorio | Ejemplo |
|---|---|---:|---|
| `id` | string | Sí | `evt-2026-06-28-ensayo` |
| `title` | string | Sí | `Ensayo general` |
| `type` | string | Sí | `ensayo` |
| `date` | string ISO | Sí | `2026-06-28` |
| `startTime` | string | Sí | `15:00` |
| `meetingTime` | string | No | `14:15` |
| `location` | string | Sí | `Salón parroquial` |
| `address` | string | No | `Col. X, San Salvador` |
| `dressCodeMen` | string | No | `Camisa blanca, pantalón negro` |
| `dressCodeWomen` | string | No | `Blusa blanca, falda negra` |
| `format` | string | No | `acústico` |
| `notes` | string | No | `Llegar afinados y con atril` |
| `songIds` | string[] | No | `["song-cada-vez","song-ven-senor"]` |

**`songs.json`** debería contener la biblioteca musical mínima:

| Campo | Tipo | Obligatorio | Ejemplo |
|---|---|---:|---|
| `id` | string | Sí | `song-cada-vez` |
| `title` | string | Sí | `Cada vez` |
| `category` | string | No | `comunión` |
| `key` | string | No | `G` |
| `author` | string | No | `Tradicional` |
| `source` | string | No | `carga-manual` |
| `lyrics` | string | Sí | `Cada vez que te recibo...` |
| `chords` | string | No | `[G]Cada vez que te [D]recibo...` |
| `tags` | string[] | No | `["adoración","lento"]` |
| `notes` | string | No | `Versión corta` |

### Snippets y comandos mínimos

```bash
# Vista local mínima para probar fetch() y rutas de archivos
python -m http.server 8080
# luego abrir http://localhost:8080
```

```js
// app.js: cargar eventos desde JSON estático
async function loadEvents() {
  const res = await fetch('./data/events.json');
  if (!res.ok) throw new Error(`Error ${res.status} al cargar eventos`);
  return res.json();
}
```

```js
// app.js: renderizar lista de eventos
function renderEvents(events, container) {
  container.innerHTML = events.map(evt => `
    <article class="card">
      <h3><a href="#/evento/${evt.id}">${evt.title}</a></h3>
      <p>${evt.date} · ${evt.startTime} · ${evt.location}</p>
      <p>${evt.type}</p>
    </article>
  `).join('');
}
```

MDN recomienda comprobar `response.ok` antes de consumir JSON, porque `fetch()` no rechaza automáticamente en todos los errores HTTP. Ese patrón es suficiente para esta POC.

## Skills técnicas, roles y entregables iterativos

### Skills necesarias y nivel recomendado

| Skill | Nivel | Para qué se necesita |
|---|---|---|
| HTML semántico | Intermedio | Estructura accesible, landmarks, formularios correctos |
| CSS responsive | Intermedio | Maquetación mobile-first, rejillas simples, estados de foco |
| JavaScript DOM + Fetch | Intermedio | Cargar JSON, filtrar, renderizar vistas |
| Git y GitHub | Básico–Intermedio | Versionado, ramas, PR, despliegue |
| Diseño UI básico | Básico–Intermedio | Jerarquía visual, espaciado, legibilidad |
| Accesibilidad web | Básico–Intermedio | Navegación por teclado, contraste, labels, `aria-current` |
| Pruebas manuales | Básico | Checklist, regresión visual, flujos clave |
| Lighthouse | Básico | Auditoría rápida de performance y accesibilidad |
| Documentación técnica | Básico | README, guía de edición de JSON |
| CI/CD básico | Básico | Auto-deploy y chequeos mínimos |

WCAG 2.2 sigue siendo la referencia más sólida para accesibilidad web; W3C anima a usar la versión más reciente, y MDN/web.dev subrayan el valor de HTML semántico, landmarks y etiquetas correctamente asociadas. Para formularios o filtros, `label` y tamaño táctil adecuado son mínimos prácticos; web.dev recomienda targets de al menos **48 px** para evitar toques accidentales. 

### MCPs y entregables iterativos

| MCP | Descripción | Prioridad | Estimación |
|---|---|---:|---:|
| Shell inicial | Repositorio, estructura de carpetas, index vacío, estilos base, datos de ejemplo | Alta | 2–4 h |
| Landing usable | Header, hero, secciones básicas, footer, navegación ancla | Alta | 4–6 h |
| Eventos | Lista de eventos + detalle de evento + repertorio asociado | Alta | 6–10 h |
| Cantos | Lista de cantos + búsqueda simple + detalle de canto | Alta | 6–10 h |
| Pulido responsive | Mobile-first, corrección de layout, estados focus/hover, contraste | Alta | 4–6 h |
| QA y release POC | Checklist manual, Lighthouse, README de actualización y despliegue | Alta | 4–6 h |

**Tiempo total realista:** entre **26 y 42 horas**. En modalidad hobby, eso equivale a **4–7 días de trabajo parcial**.

### Roles/agentes para un equipo OpenCode

| Rol | Responsabilidades | ¿Puede una sola persona cubrirlo? |
|---|---|---|
| Desarrollador frontend | HTML/CSS/JS, rutas simples, carga JSON, render UI | Sí |
| Diseñador UI | Wireframes, tokens visuales, jerarquía, legibilidad móvil | Sí |
| QA | Checklist funcional, regresión, accesibilidad básica, validación de contenido | Sí |
| Gestor de proyecto | Alcance, prioridades, corte del MVP, control de cambios | Sí |
| Mantenedor | Actualizar JSON, publicar, corregir contenidos, documentar | Sí |

Para esta POC, **una sola persona puede cubrir todos los roles**, pero lo ideal es que al menos haya una segunda persona como QA/editor de contenido. GitHub Flow encaja bien con equipos pequeños: una rama por cambio, pull request para revisión, merge a la rama principal y despliegue automático. 

## UX/UI, wireframes textuales y flujo de trabajo mínimo

### Wireframes textuales recomendados

**Landing**
- Header con logo/nombre, menú: Inicio, Eventos, Cantos, Contacto.
- Hero con frase corta y CTA: “Próximos eventos” y “Ver cantos”.
- Sección “Quiénes somos”.
- Sección “Cómo nos organizamos”.
- Mini lista de próximos 3 eventos.
- Footer con contacto y redes.

**Lista de eventos**
- Título de página.
- Buscador simple por título/tipo.
- Filtro por tipo: ensayo, misa, retiro.
- Cards con fecha, hora, lugar, tipo.
- CTA “Ver detalle”.

**Detalle de evento**
- Encabezado con nombre del evento.
- Fecha/hora/lugar.
- Hora de reunión.
- Vestimenta hombres/mujeres.
- Formato: acústico o eléctrico.
- Notas.
- Repertorio asociado como lista ordenada de cantos.

**Lista de cantos**
- Búsqueda por nombre, categoría o tag.
- Listado simple.
- Acceso a detalle.

**Detalle de canto**
- Título.
- Categoría y tono.
- Letra.
- Acordes en bloque monoespaciado.
- Notas.

**Admin simple por edición local**
- No pantalla web.
- Flujo documental: editar JSON, validar formato, probar local, commit, push, deploy.

### Recomendaciones UX/UI y accesibilidad

La POC debe ser **mobile-first** porque el consumo principal será desde teléfono. web.dev resume el enfoque responsive como adaptar el layout al dispositivo y a las capacidades del usuario; para esta POC eso implica columna única en móvil, tarjetas compactas, tipografía legible y navegación fija o simple.

En accesibilidad, conviene usar HTML semántico antes que ARIA “por decoración”. MDN recomienda preferir `<nav>` sobre `role="navigation"` y `<main>` sobre `role="main"`; además, en interfaces donde cambia la vista actual, `aria-current` ayuda a comunicar qué sección está activa. Para filtros o formularios, cada control debe tener `label`, y los botones deben ser táctilmente cómodos, idealmente de al menos 48 px. 

### Flujo de trabajo y pipeline mínimo

El pipeline mínimo recomendado es:

| Etapa | Mínimo práctico |
|---|---|
| Versionado | Git + GitHub |
| Ramas | `main` estable + ramas cortas por feature/fix |
| Reviews | Pull request, aunque sea auto-review con checklist |
| CI/CD | Auto-deploy por push a `main` |
| Calidad | Lighthouse manual + checklist manual |
| Documentación | README y guía breve de edición de JSON |

GitHub documenta GitHub Flow con ramas separadas, pull requests y merge una vez aprobado. También documenta GitHub Actions como plataforma de CI/CD para correr pruebas o desplegar cuando hay push o merge. En Cloudflare Pages y Vercel, el CI/CD puede quedar incluso más simple, porque ambos se integran con Git y generan despliegues automáticos y previews por rama o PR. 

## Pruebas, validación, riesgos y transición a versión moderna

### Plan de pruebas y validación con usuarios

La POC debe validarse con **5 a 8 usuarios reales** del ministerio, idealmente mezclando edades y familiaridad digital. No hace falta laboratorio formal; sí hace falta observar tareas concretas y registrar tiempos y errores. WAI propone “easy checks” como primer filtro útil, y Lighthouse permite auditar rápidamente accesibilidad, rendimiento y buenas prácticas desde Chrome DevTools o CLI. 

**Tareas a medir**
- Encontrar el próximo ensayo.
- Abrir el detalle del evento.
- Identificar hora de reunión y vestimenta.
- Abrir el canto 1 del repertorio.
- Usar la búsqueda para localizar un canto conocido.
- Completar el flujo en móvil sin ayuda.

**Métricas mínimas**
- Tiempo para encontrar el próximo evento.
- Porcentaje de tareas completadas sin ayuda.
- Errores de navegación observados.
- Dudas repetidas sobre términos o botones.
- Satisfacción rápida de 1 a 5.

**Checklist de aceptación**
- El usuario encuentra un evento en menos de 30–45 segundos.
- El detalle de evento se entiende sin explicación externa.
- La búsqueda de cantos devuelve resultados útiles.
- No hay texto cortado ni scroll horizontal en móvil.
- El sitio funciona con teclado básico y foco visible.
- Lighthouse no muestra bloqueadores graves de accesibilidad o best practices.

### Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Querer meter demasiadas funciones | Alto | Congelar alcance del MVP |
| JSON mal formateado | Medio | Validar antes de subir; usar ejemplos fijos |
| Rutas rotas en static hosting | Medio | Usar hash routing o query params |
| Contenido poco mantenido | Alto | README de actualización y responsable único |
| Mala experiencia móvil | Alto | Diseñar mobile-first y probar en Android real |
| Accesibilidad pobre | Medio | Semántica HTML, labels, foco visible, checklist |
| Dependencia de una sola persona | Medio | Documentar y dejar flujo de publicación simple |
| Escoger host equivocado | Bajo–Medio | Para POC, priorizar Cloudflare Pages o GitHub Pages |

Un riesgo específico de GitHub Pages es que los **project sites** viven en una ruta tipo `/<repositorio>`, lo que vuelve más delicados los paths absolutos; por eso conviene usar rutas relativas y no depender de router con History API en esta primera fase. También debe recordarse que GitHub Pages es público y no debe usarse para transacciones sensibles. 

### Siguientes pasos para pasar a versión moderna

La transición razonable después de validar la POC es esta:

1. **Mover datos a Supabase**: tablas para `events`, `songs` y relación de repertorios.  
2. **Agregar Auth** para administradores y editores.  
3. **Mantener frontend estático o migrar a framework** según necesidad.  
4. **Añadir funciones serverless** para PDF, importación o lógica de repertorio.  
5. **Crear panel web** de administración.  
6. **Agregar historial y versionado** de repertorios.  

Supabase ofrece Auth y Edge Functions, y puede ser un paso natural cuando el ministerio necesite edición web, permisos o colaboración. Cloudflare Pages Functions y Vercel Functions también permiten añadir lógica server-side sin abandonar el despliegue actual. 

La mejor secuencia, en términos prácticos, es:

- **POC estática** en Cloudflare Pages o GitHub Pages.
- **Validación con usuarios** durante 2–3 semanas.
- **Corrección de contenido y navegación**.
- **Decisión de inversión técnica** solo si la POC demuestra uso real.

Ese orden reduce riesgo, evita “matar” el proyecto por sobrearquitectura y deja una base limpia para crecer. 