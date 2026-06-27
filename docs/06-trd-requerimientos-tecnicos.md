# TRD — Documento de Requerimientos Técnicos

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Propósito

Este documento define los requerimientos técnicos de la plataforma, separando claramente la **Etapa 1: prueba de concepto estática** y la **Etapa 2: versión moderna con backend**.

La intención es evitar sobreingeniería en la primera versión, pero dejar una base suficientemente ordenada para migrar después a una arquitectura más completa.

---

## 1. Alcance técnico

### Etapa 1 — POC estática

La primera versión será una web estática construida con:

- HTML.
- CSS.
- JavaScript puro.
- Archivos JSON.
- Hosting estático gratuito.

No tendrá:

- Framework.
- Build step.
- Backend.
- Base de datos.
- Login.
- API propia.
- Panel administrativo.
- Dependencias obligatorias de npm.

### Etapa 2 — Versión moderna

La segunda etapa podrá incorporar:

- Frontend moderno.
- Base de datos.
- Autenticación.
- Roles.
- Panel administrativo.
- Backend ligero.
- Storage.
- Funciones serverless.
- Generación de PDF.
- Transposición de acordes.

---

## 2. Arquitectura técnica de la POC

```txt
Usuario
  ↓
Navegador
  ↓
Sitio estático
  ↓
HTML + CSS + JS
  ↓
Archivos JSON locales
  ↓
GitHub Pages / Cloudflare Pages
```

La POC no guarda datos desde el navegador. Toda actualización de contenido se hace modificando archivos JSON en el repositorio.

---

## 3. Estructura de carpetas recomendada

```txt
ministerio-renacer/
├── index.html
├── README.md
├── opencode.json
├── skills-lock.json
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── img/
├── data/
│   ├── events.json
│   ├── songs.json
│   └── repertoires.json
├── docs/
│   ├── 00-concepto-general.md
│   ├── 01-viabilidad-tecnica.md
│   ├── 02-plan-poc-html-css-js.md
│   ├── 03-resumen-ejecutivo.md
│   ├── 05-prd-requerimientos-producto.md
│   ├── 06-trd-requerimientos-tecnicos.md
│   ├── 07-brief-diseno-ui-ux.md
│   ├── 08-app-flow.md
│   ├── 09-esquema-backend.md
│   └── 10-plan-implementacion.md
└── .opencode/
    ├── agents/
    │   └── skills/
    └── instructions/
        └── AGENTS.md
```

---

## 4. Archivos principales

### `index.html`

Responsable de:

- Estructura base.
- Landmarks HTML.
- Contenedor principal de vistas.
- Enlaces a CSS y JS.
- Metadatos básicos SEO.
- Carga inicial de la aplicación.

### `assets/css/styles.css`

Responsable de:

- Variables CSS.
- Estilos base.
- Layout mobile-first.
- Componentes visuales.
- Cards.
- Botones.
- Estados vacíos.
- Responsive design.

### `assets/js/app.js`

Responsable de:

- Cargar JSON con `fetch`.
- Manejar navegación simple.
- Renderizar vistas.
- Filtrar eventos y cantos.
- Mostrar detalles.
- Manejar estados de error.

### `data/events.json`

Fuente de datos de eventos.

### `data/songs.json`

Fuente de datos de cantos.

### `data/repertoires.json`

Fuente de datos de repertorios básicos.

---

## 5. Navegación

La POC debe usar navegación simple compatible con hosting estático.

Opciones recomendadas:

1. Navegación por hash:

```txt
#/inicio
#/eventos
#/evento/evt-001
#/cantos
#/canto/song-001
```

2. Navegación por secciones en una sola página:

```txt
#inicio
#eventos
#cantos
#contacto
```

Recomendación: usar hash routing ligero si se necesita detalle individual de evento o canto. Evitar History API al inicio para no requerir configuración de rewrites.

---

## 6. Modelo de datos estático

## 6.1 Evento

```json
{
  "id": "evt-2026-06-20-ensayo",
  "title": "Ensayo general",
  "type": "ensayo",
  "date": "2026-06-20",
  "time": "19:00",
  "meetingTime": "18:45",
  "place": "Cima 2",
  "address": "",
  "description": "Ensayo semanal del ministerio.",
  "dressCodeMen": "",
  "dressCodeWomen": "",
  "musicFormat": "acustico",
  "repertoireId": "rep-2026-06-20",
  "status": "published"
}
```

Campos mínimos:

- `id`
- `title`
- `type`
- `date`
- `time`
- `place`
- `status`

Campos recomendados:

- `meetingTime`
- `description`
- `dressCodeMen`
- `dressCodeWomen`
- `musicFormat`
- `repertoireId`

---

## 6.2 Canto

```json
{
  "id": "song-cada-vez",
  "title": "Cada vez",
  "category": "comunion",
  "key": "G",
  "lyrics": "Letra del canto...",
  "chords": "[G]Cada vez que...",
  "tags": ["comunion", "adoracion"],
  "notes": "Versión corta para misa."
}
```

Campos mínimos:

- `id`
- `title`
- `lyrics`

Campos recomendados:

- `category`
- `key`
- `chords`
- `tags`
- `notes`

---

## 6.3 Repertorio

```json
{
  "id": "rep-2026-06-20",
  "eventId": "evt-2026-06-20-ensayo",
  "title": "Repertorio ensayo general",
  "items": [
    {
      "songId": "song-cada-vez",
      "order": 1,
      "role": "entrada",
      "key": "G",
      "notes": "Intro 2 veces"
    }
  ]
}
```

Campos mínimos:

- `id`
- `eventId`
- `items`

---

## 7. Requerimientos funcionales técnicos

### RF-T01 — Carga de datos JSON

El sistema debe cargar los archivos JSON desde la carpeta `data/`.

Criterios:

- Si el JSON carga correctamente, se renderizan eventos y cantos.
- Si el JSON falla, se muestra mensaje de error amigable.
- No debe romper toda la interfaz por un error.

### RF-T02 — Renderizado de eventos

El sistema debe mostrar eventos ordenados por fecha.

Criterios:

- Mostrar título, fecha, hora, lugar y tipo.
- Permitir abrir detalle.
- Manejar estado vacío.

### RF-T03 — Renderizado de cantos

El sistema debe mostrar cantos disponibles.

Criterios:

- Mostrar título, categoría y tonalidad.
- Permitir búsqueda simple.
- Permitir abrir detalle.

### RF-T04 — Relación evento-repertorio

El sistema debe resolver el repertorio asociado a un evento.

Criterios:

- Leer `repertoireId`.
- Buscar repertorio en `repertoires.json`.
- Resolver cada `songId` desde `songs.json`.
- Mostrar los cantos en orden.

### RF-T05 — Navegación interna

El sistema debe permitir navegar entre secciones sin recargar manualmente.

Criterios:

- Usar hash routing o enlaces de ancla.
- Mantener comportamiento simple.
- Permitir volver a la lista.

---

## 8. Requerimientos no funcionales técnicos

### RNF-T01 — Compatibilidad con hosting estático

El proyecto debe poder desplegarse en:

- GitHub Pages.
- Cloudflare Pages.
- Vercel como alternativa.

No debe requerir servidor Node.js para funcionar.

### RNF-T02 — Sin proceso de build

La POC debe funcionar sin compilar.

Comando local recomendado:

```bash
python -m http.server 8080
```

### RNF-T03 — Rendimiento

- Evitar librerías pesadas.
- Optimizar imágenes.
- Mantener JSON razonablemente pequeño.
- Evitar animaciones innecesarias.

### RNF-T04 — Accesibilidad

- Usar `header`, `main`, `section`, `nav`, `footer`.
- Usar botones y enlaces correctamente.
- Mantener foco visible.
- Usar textos alternativos.
- Evitar depender solo del color para comunicar estados.

### RNF-T05 — Mantenibilidad

- Código separado por responsabilidad.
- JSON con estructura consistente.
- Comentarios mínimos útiles.
- README claro.

---

## 9. Configuración de OpenCode

El proyecto puede usar OpenCode como asistente de desarrollo.

Elementos actuales esperados:

- `.opencode/instructions/AGENTS.md`
- `.opencode/skills/`
- `opencode.json`
- `skills-lock.json`

Skills útiles:

- `poc-planner`
- `static-frontend`
- `json-content`
- `poc-qa`
- `frontend-design`
- `web-design-guidelines`
- `webapp-testing`
- `seo-audit`
- `github-actions-docs`

MCP recomendado:

- Playwright MCP para pruebas en navegador.

No se recomienda agregar más MCPs en la POC salvo que exista una necesidad concreta.

---

## 10. Testing técnico

### Pruebas manuales mínimas

- Cargar landing.
- Abrir lista de eventos.
- Abrir detalle de evento.
- Ver repertorio asociado.
- Abrir detalle de canto.
- Buscar un canto.
- Probar en móvil.
- Probar sin conexión de datos externos.
- Revisar consola del navegador.

### Pruebas con Playwright MCP

Validar:

- Carga inicial.
- Clics principales.
- Errores de consola.
- Navegación por enlaces.
- Vista móvil.
- Estados vacíos.

### Validación JSON

Antes de publicar:

- Confirmar que no hay comas sobrantes.
- Confirmar IDs únicos.
- Confirmar que `repertoireId` existe.
- Confirmar que cada `songId` existe.
- Confirmar fechas en formato `YYYY-MM-DD`.
- Confirmar horas en formato `HH:mm`.

---

## 11. Requerimientos de despliegue

### GitHub Pages

Adecuado para:

- Proyecto estático.
- Repositorio público.
- Flujo simple.

Consideraciones:

- Cuidar rutas relativas.
- Evitar paths absolutos que rompan en subcarpeta.
- No usar backend.

### Cloudflare Pages

Adecuado para:

- Proyecto estático.
- Preview deployments.
- Crecimiento futuro con Workers/Pages Functions.

Consideraciones:

- Requiere conectar repo.
- No requiere build si es HTML estático.
- Puede crecer mejor que GitHub Pages.

Recomendación técnica para POC:

- Usar Cloudflare Pages si se desea una ruta más flexible.
- Usar GitHub Pages si se desea simplicidad máxima.

---

## 12. Arquitectura técnica futura

```txt
Usuario público
  ↓
Frontend
  ↓
Supabase
  ├── Auth
  ├── Postgres
  ├── Storage
  └── Edge Functions
```

Posible stack:

- Frontend: React, Next.js, Astro o HTML mejorado.
- Hosting: Cloudflare Pages o Vercel.
- Base de datos: Supabase Postgres.
- Auth: Supabase Auth.
- Backend ligero: Supabase Edge Functions o Cloudflare Workers.
- Storage: Supabase Storage.
- PDF: función serverless o generación cliente.

---

## 13. Seguridad futura

Cuando exista backend, se requerirá:

- Autenticación.
- Roles.
- Políticas de acceso.
- Validación de entradas.
- Prevención de edición no autorizada.
- Logs mínimos.
- Backups.
- Separación de contenido público y privado.

En la POC, el principal control de seguridad es no manejar datos sensibles ni credenciales.

---

## 14. Deuda técnica aceptada en la POC

Se aceptan temporalmente:

- Edición manual de JSON.
- Falta de panel administrativo.
- Falta de base de datos.
- Navegación simple.
- Búsqueda básica.
- Sin PDF.
- Sin transposición.
- Sin historial.

No se acepta:

- Código ilegible.
- Datos desordenados.
- Rutas rotas.
- Interfaz inutilizable en móvil.
- Errores constantes en consola.
- Documentación inexistente.

---

## 15. Criterios de listo técnico

La POC estará técnicamente lista cuando:

- `index.html` carga sin errores.
- CSS responde correctamente en móvil y escritorio.
- JS carga eventos, cantos y repertorios.
- Los JSON están validados.
- El sitio se puede servir localmente.
- El sitio se despliega en hosting estático.
- Existe README de mantenimiento.
- Existe checklist QA completado.
