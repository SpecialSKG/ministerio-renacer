# Esquema del BackEnd

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Propósito

Este documento define cómo se entiende el backend del proyecto en dos niveles:

1. **POC estática:** no hay backend real; los archivos JSON actúan como fuente de datos.
2. **Versión moderna:** se plantea un backend gestionado con base de datos, autenticación y roles.

---

## 1. Backend en la POC

La POC no tendrá backend tradicional.

No existen:

- Servidor.
- API.
- Base de datos.
- Login.
- Roles.
- Panel administrativo.
- Escritura desde navegador.

La fuente de verdad son archivos JSON:

```txt
data/
├── events.json
├── songs.json
└── repertoires.json
```

El navegador hace `fetch()` a esos archivos y renderiza la información.

---

## 2. Ventajas de esta decisión

- Menor complejidad.
- Cero costo.
- Compatible con GitHub Pages y Cloudflare Pages.
- Fácil de mantener al inicio.
- Permite validar producto antes de construir infraestructura.
- Evita problemas de seguridad prematuros.

---

## 3. Limitaciones de esta decisión

- No se puede editar desde navegador.
- No hay login.
- No hay roles.
- No hay historial.
- No hay auditoría.
- No hay colaboración multiusuario.
- No hay subida de archivos.
- No hay generación robusta de PDF en servidor.

Estas limitaciones son aceptables en la prueba de concepto.

---

## 4. Esquema de datos POC

## 4.1 `events.json`

```json
[
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
]
```

## 4.2 `songs.json`

```json
[
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
]
```

## 4.3 `repertoires.json`

```json
[
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
]
```

---

## 5. Reglas de integridad POC

Aunque no hay base de datos, deben respetarse reglas:

- Cada `id` debe ser único.
- Cada `event.repertoireId` debe existir en `repertoires.json`.
- Cada `repertoire.eventId` debe existir en `events.json`.
- Cada `repertoire.items[].songId` debe existir en `songs.json`.
- Las fechas deben usar `YYYY-MM-DD`.
- Las horas deben usar `HH:mm`.
- Los estados deben tener valores controlados.
- Los tipos de evento deben ser consistentes.
- Las categorías de cantos deben ser consistentes.

---

## 6. Catálogos sugeridos

### Tipos de evento

```txt
ensayo
misa
rosario
rezo
vigilia
retiro
oratorio
evento-especial
reunion
otro
```

### Formato musical

```txt
acustico
electrico
mixto
sin-definir
```

### Estado de evento

```txt
draft
published
cancelled
pending
```

### Categorías de cantos

```txt
entrada
perdon
gloria
aleluya
ofertorio
santo
cordero
comunion
salida
mariano
adoracion
alabanza
adviento
navidad
cuaresma
pascua
otro
```

---

## 7. Backend futuro recomendado

Para la etapa moderna se recomienda una arquitectura tipo BaaS:

```txt
Frontend
  ↓
Supabase
  ├── Auth
  ├── Postgres
  ├── Row Level Security
  ├── Storage
  └── Edge Functions
```

Alternativas:

- Firebase.
- Neon + API propia.
- Koyeb + API.
- Cloudflare Workers + D1/KV.

Recomendación inicial futura: Supabase, porque el dominio del problema es relacional: eventos, cantos, repertorios, usuarios y roles.

---

## 8. Modelo relacional futuro

## 8.1 `profiles`

Usuarios administrativos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Relación con usuario auth |
| full_name | text | Nombre visible |
| email | text | Correo |
| role | text | admin, editor, viewer |
| status | text | active, inactive |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Fecha de actualización |

## 8.2 `events`

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID interno |
| slug | text | URL legible |
| title | text | Nombre del evento |
| type | text | Tipo de evento |
| date | date | Fecha |
| start_time | time | Hora de inicio |
| meeting_time | time | Hora de reunión |
| place | text | Lugar |
| address | text | Dirección |
| description | text | Descripción |
| dress_code_men | text | Vestimenta hombres |
| dress_code_women | text | Vestimenta mujeres |
| music_format | text | Acústico/eléctrico/mixto |
| status | text | draft/published/cancelled |
| created_by | uuid | Usuario creador |
| created_at | timestamp | Creación |
| updated_at | timestamp | Actualización |

## 8.3 `songs`

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID interno |
| slug | text | URL legible |
| title | text | Título |
| category | text | Categoría litúrgica |
| base_key | text | Tonalidad base |
| lyrics | text | Letra |
| chords | text | Acordes |
| tags | text[] | Etiquetas |
| notes | text | Notas |
| status | text | draft/published |
| source | text | Fuente opcional |
| created_by | uuid | Usuario creador |
| created_at | timestamp | Creación |
| updated_at | timestamp | Actualización |

## 8.4 `repertoires`

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID interno |
| event_id | uuid | Evento asociado |
| title | text | Nombre |
| description | text | Descripción |
| status | text | draft/published |
| created_by | uuid | Usuario creador |
| created_at | timestamp | Creación |
| updated_at | timestamp | Actualización |

## 8.5 `repertoire_items`

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID interno |
| repertoire_id | uuid | Repertorio |
| song_id | uuid | Canto |
| sort_order | integer | Orden |
| role | text | Momento litúrgico |
| selected_key | text | Tonalidad usada |
| notes | text | Notas |
| created_at | timestamp | Creación |

---

## 9. Relaciones futuras

```txt
events 1 ─── 1 repertoires
repertoires 1 ─── N repertoire_items
songs 1 ─── N repertoire_items
profiles 1 ─── N events
profiles 1 ─── N songs
```

---

## 10. Roles futuros

### Público

Puede:

- Ver eventos publicados.
- Ver cantos publicados.
- Ver repertorios publicados.

No puede:

- Crear.
- Editar.
- Eliminar.

### Editor

Puede:

- Crear eventos.
- Editar eventos propios o permitidos.
- Crear cantos.
- Editar cantos.
- Crear repertorios.

No puede:

- Gestionar usuarios.
- Cambiar configuraciones globales.

### Administrador

Puede:

- Todo lo del editor.
- Gestionar usuarios.
- Cambiar roles.
- Eliminar contenido.
- Revisar configuración.

---

## 11. Políticas de seguridad futuras

Concepto de RLS:

- El contenido publicado puede leerse públicamente.
- Solo usuarios autenticados con rol `admin` o `editor` pueden escribir.
- Solo `admin` puede gestionar roles.
- Los borradores solo deben verse por administradores o editores.
- Las operaciones destructivas deben restringirse.

---

## 12. Endpoints o servicios futuros

Si se usa Supabase directamente, muchas operaciones pueden hacerse desde el cliente usando SDK y políticas de seguridad.

Funciones serverless posibles:

### `generate-repertoire-pdf`

Entrada:

```json
{
  "repertoireId": "uuid"
}
```

Salida:

```json
{
  "pdfUrl": "https://..."
}
```

### `transpose-song`

Entrada:

```json
{
  "songId": "uuid",
  "targetKey": "D"
}
```

Salida:

```json
{
  "transposedChords": "..."
}
```

### `import-song`

Entrada:

```json
{
  "title": "string",
  "lyrics": "string",
  "chords": "string"
}
```

Salida:

```json
{
  "songId": "uuid",
  "status": "draft"
}
```

---

## 13. Migración de POC a backend

### Paso 1

Congelar estructura JSON.

### Paso 2

Crear tablas equivalentes.

### Paso 3

Importar eventos.

### Paso 4

Importar cantos.

### Paso 5

Importar repertorios.

### Paso 6

Crear frontend dinámico.

### Paso 7

Agregar auth.

### Paso 8

Crear panel administrativo.

---

## 14. Decisión actual

Para la etapa actual:

- No se construye backend.
- No se instala Supabase.
- No se crean endpoints.
- No se implementa login.
- Los JSON son la fuente de datos.

El backend se documenta para dar dirección futura, no para implementarlo en la primera versión.
