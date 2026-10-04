# Guía de mantenimiento del sitio

> Documento operativo para mantener el contenido del sitio **editando datos**,
> sin tocar código. La fuente única de verdad del contenido son los archivos
> `data/*.json` en la raíz del repositorio. Esta guía no modifica el producto:
> describe cómo cambiar datos de forma segura y cómo publicarlos.

---

## 1. Principio general

El sitio es una POC estática: la interfaz lee los JSON de `data/` en tiempo de
ejecución. Para agregar, editar o quitar eventos, cantos o repertorios **no se
modifica HTML, CSS ni JavaScript**: se editan los datos.

| Archivo | Contenido |
|---|---|
| `data/events.json` | Eventos (ensayos, misas, novenas, bodas, etc.) |
| `data/songs.json` | Cantos (título, letra, tonalidad, acordes, etiquetas) |
| `data/repertoires.json` | Repertorios y su lista ordenada de cantos |

Reglas de oro:

1. **`data/*.json` es la fuente única de verdad.** La UI no guarda contenido.
2. **No inventes datos reales** ni incluyas datos personales sin autorización
   (ver sección 8).
3. **Valida el JSON antes de publicar** (ver sección 6).
4. **El push no publica.** El despliegue es manual (ver sección 7).

---

## 2. Esquema de `data/events.json`

Array de objetos. Campos:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | string | Sí | Identificador único técnico (p. ej. `evt-001`). |
| `title` | string | Sí | Título visible en español. |
| `type` | string | Sí | Uno de: `ensayo`, `misa`, `encuentro`, `novena`, `horaSanta`, `atol`, `boda`, `tarde`, `vigilia`, `taller`. |
| `date` | string | Sí | Fecha en formato `YYYY-MM-DD`. |
| `time` | string | Sí | Hora de inicio en formato `HH:mm` (24 h). |
| `place` | string | Sí | Lugar del evento (texto visible). |
| `status` | string | Sí | `published` (visible) o `draft` (oculto). Solo `published` se muestra. |
| `meetingTime` | string | No | Hora de reunión/llegada en `HH:mm`. Opcional; si falta, no se muestra. |
| `description` | string | No | Nota breve visible en el detalle. |
| `dressCodeMen` | string | No | Código de vestimenta (hombres). |
| `dressCodeWomen` | string | No | Código de vestimenta (mujeres). |
| `musicFormat` | string | No | Formato musical (p. ej. `acustico`). Opcional/recomendado; la app solo lo muestra si está presente. |
| `repertoireId` | string \| null | Sí | `id` de un repertorio en `repertoires.json`, o `null` si no tiene. |

Ejemplo:

```json
{
  "id": "evt-006",
  "title": "Novena a San Daniel Comboni",
  "type": "novena",
  "date": "2026-10-05",
  "time": "18:00",
  "place": "Parroquia San Daniel Comboni",
  "status": "published",
  "description": "Inicio con el Santo Rosario.",
  "dressCodeMen": "Amarillo",
  "dressCodeWomen": "Amarillo",
  "musicFormat": "acustico",
  "repertoireId": null
}
```

Notas:

- El orden visible lo calcula la app por `date` (con desempate por `id`); no
  hace falta mantener el array ordenado, pero ayuda a leerlo.
- Para **ocultar** un evento sin borrarlo, cambia `status` a `draft`.
- Para **quitar** un evento, elimínalo del array (y revisa que ningún
  repertorio lo referencie; ver sección 5).

---

## 3. Esquema de `data/songs.json`

Array de objetos. Campos:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | string | Sí | Identificador único técnico (p. ej. `song-001`). |
| `title` | string | Sí | Título visible en español. |
| `lyrics` | string | Sí | Letra. Los saltos de línea se escriben como `\n`. |
| `category` | string | Sí | Categoría (p. ej. `alabanza`, `comunion`). Se usa para los filtros. |
| `key` | string | Sí | Tonalidad (p. ej. `C`, `G`). |
| `chords` | string | Sí | Progresión de acordes como texto (p. ej. `C - G - Am - F`). |
| `tags` | string[] | Sí | Etiquetas para el buscador (sin acentos, en minúsculas). |
| `notes` | string | No | Nota de uso (tempo, momento de la misa, etc.). |

Ejemplo:

```json
{
  "id": "song-002",
  "title": "Canto de Comunión",
  "lyrics": "Señor, recíbeme en tu mesa,\nparte el pan, dame tu fortaleza.",
  "category": "comunion",
  "key": "G",
  "chords": "G - Em - C - D",
  "tags": ["comunion", "lento", "reflexivo"],
  "notes": "Tempo lento, después de la consagración."
}
```

Notas:

- Las **categorías** del filtro se derivan de los cantos cargados: si agregas
  una categoría nueva, aparece automáticamente.
- El `id` de un canto se usa en los repertorios; no lo renombres si algún
  repertorio lo referencia.

---

## 4. Esquema de `data/repertoires.json`

Array de objetos. Campos:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | string | Sí | Identificador único técnico (p. ej. `rep-001`). |
| `eventId` | string | Sí | `id` del evento al que pertenece el repertorio. |
| `title` | string | Sí | Título visible del repertorio. |
| `items` | object[] | Sí | Lista ordenada de cantos. |

Cada ítem de `items`:

| Campo | Tipo | Descripción |
|---|---|---|
| `order` | number | Orden dentro del repertorio (1, 2, 3…). |
| `songId` | string | `id` de un canto en `songs.json`. |

Ejemplo:

```json
{
  "id": "rep-001",
  "eventId": "evt-001",
  "title": "Repertorio Ensayo",
  "items": [
    { "order": 1, "songId": "song-001" },
    { "order": 2, "songId": "song-002" }
  ]
}
```

Notas:

- Un evento muestra su repertorio cuando su `repertoireId` apunta a un
  repertorio existente. Si un evento no tiene repertorio, la vista muestra el
  estado "sin repertorio".
- Si un repertorio no tiene un evento asociado, no será visible desde ningún
  evento; define `eventId` de forma coherente.

---

## 5. Relaciones entre archivos

```txt
events.repertoireId  →  repertoires.id
       (en events.json)      (en repertoires.json)
repertoires.eventId  →  events.id
repertoires.items[].songId  →  songs.id
       (en repertoires.json)        (en songs.json)
```

Reglas de integridad:

- Todo `repertoireId` no nulo debe existir en `repertoires.json`.
- Todo `eventId` de un repertorio debe existir en `events.json`.
- Todo `songId` de un repertorio debe existir en `songs.json`.
- No dejes referencias colgantes si borras un canto, un evento o un repertorio.

---

## 6. Cómo validar el JSON

Antes de publicar, comprueba que los archivos son JSON válido. Cualquiera de
estas opciones sirve:

```powershell
# Python
python -m json.tool data/events.json > $null
python -m json.tool data/songs.json > $null
python -m json.tool data/repertoires.json > $null

# Node (sin imprimir el contenido)
node -e "JSON.parse(require('fs').readFileSync('data/events.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('data/songs.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('data/repertoires.json','utf8'))"
```

Un error de sintaxis (coma final, comilla sin cerrar) hace que la app muestre
"no se pudieron cargar los datos". En ese caso, revisa la línea que indique el
error.

Luego sirve el sitio local y revisa la consola del navegador (sección 7).

---

## 7. Cómo servir localmente y cómo publicar

### Servir localmente

No hay build ni instalación. Cualquier servidor estático sobre la raíz sirve:

```powershell
python -m http.server 8080
# abrir http://localhost:8080
```

Verificación mínima: abrir en un navegador moderno y revisar la consola
(no debería haber errores) y que las listas y el calendario muestren los datos
nuevos.

### Publicar (GitHub Pages — manual)

El workflow de Pages es **manual** (`workflow_dispatch`): **el push no
despliega solo**. Para publicar un cambio autorizado:

1. Confirmar que los JSON son válidos y el sitio funciona en local.
2. Confirmar que el commit está en la rama a publicar (normalmente `main`).
3. En GitHub: **Actions → "Deploy static site to GitHub Pages" → Run workflow**
   y elegir la rama.
4. Verificar la URL publicada:
   <https://specialskg.github.io/ministerio-renacer/>.

Detalle del workflow: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml).

Recordatorio: `Proyecto Actual/` es un respaldo local no versionado; no debe
incluirse en el despliegue (el workflow publica la raíz).

---

## 8. Privacidad y datos sensibles

- **No incluir datos personales reales** de miembros del ministerio (nombres,
  teléfonos, direcciones) sin autorización explícita del usuario. Los eventos
  pueden describirse con títulos públicos sin exponer información privada.
- Los datos actuales se consideran reales del ministerio; trátalos con el mismo
  cuidado que cualquier contenido publicado.
- `data/*.json` es la **fuente única de verdad** del contenido; no dupliques
  datos en otros documentos ni en el HTML.
- No incluir secretos, credenciales ni rutas internas en los JSON.

---

## 9. Checklist antes de publicar

- [ ] Los tres JSON de `data/` son válidos (sección 6).
- [ ] Las relaciones entre evento, repertorio y canto son consistentes
      (sección 5).
- [ ] No se incluyeron datos personales sin autorización (sección 8).
- [ ] El sitio se probó en local y la consola no muestra errores (sección 7).
- [ ] El cambio fue autorizado y revisado.
- [ ] Se ejecutó el workflow manual y se verificó la URL publicada.

---

*Documento operativo de la línea base. No modifica código del producto,
`ALMA.md` ni `opencode.json`. Contexto del producto:
[README del proyecto](../README.md) e índice en [README de docs](README.md).
Plan de fases:
[10-plan-implementacion.md](10-plan-implementacion.md).*
