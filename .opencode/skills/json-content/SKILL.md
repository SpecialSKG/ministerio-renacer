---
name: json-content
description: Diseña, valida y mantiene los datos JSON de eventos, cantos y repertorios para la POC del Ministerio Renacer.
compatibility: opencode
---

# Skill: JSON Content

## Propósito

Esta skill asegura que los datos de la POC sean limpios, consistentes y migrables a una base de datos futura.

Debe usarse para crear o modificar:

- `data/events.json`
- `data/songs.json`
- `data/repertoires.json`

## Principio

En la POC, los JSON son la fuente de verdad.

No hay:

- Backend.
- Base de datos.
- Panel administrativo.
- Login.
- Escritura desde navegador.

Por eso, los datos deben ser fáciles de leer, mantener y validar manualmente.

## Documentos que debe consultar

1. `docs/06-trd-requerimientos-tecnicos.md`
2. `docs/09-esquema-backend.md`
3. `docs/08-app-flow.md`
4. `docs/05-prd-requerimientos-producto.md`

## Archivos principales

```txt
data/
├── events.json
├── songs.json
└── repertoires.json
```

## Reglas generales

- Usar JSON válido.
- No dejar comas sobrantes.
- Usar IDs únicos.
- Usar IDs legibles.
- Usar fechas en `YYYY-MM-DD`.
- Usar horas en `HH:mm`.
- No inventar datos reales.
- No agregar datos personales sensibles.
- Mantener nombres de campos en inglés técnico simple.
- Mantener valores controlados para tipos, estados y categorías.
- Mantener relaciones verificables entre archivos.

## Modelo de evento

Campos mínimos:

```json
{
  "id": "evt-2026-06-20-ensayo",
  "title": "Ensayo general",
  "type": "ensayo",
  "date": "2026-06-20",
  "time": "19:00",
  "meetingTime": "18:45",
  "place": "Cima 2",
  "description": "Ensayo semanal del ministerio.",
  "dressCodeMen": "",
  "dressCodeWomen": "",
  "musicFormat": "acustico",
  "repertoireId": "rep-2026-06-20",
  "status": "published"
}
```

Campos requeridos:

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

## Modelo de canto

Campos mínimos:

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

Campos requeridos:

- `id`
- `title`
- `lyrics`

Campos recomendados:

- `category`
- `key`
- `chords`
- `tags`
- `notes`

## Modelo de repertorio

Campos mínimos:

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

Campos requeridos:

- `id`
- `eventId`
- `items`

Cada item requiere:

- `songId`
- `order`

Campos recomendados por item:

- `role`
- `key`
- `notes`

## Valores controlados

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

### Estado de evento

```txt
draft
published
cancelled
pending
```

### Formato musical

```txt
acustico
electrico
mixto
sin-definir
```

### Categorías de canto

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

## Reglas de integridad

Antes de marcar datos como listos:

- [ ] Cada evento tiene `id` único.
- [ ] Cada canto tiene `id` único.
- [ ] Cada repertorio tiene `id` único.
- [ ] Cada `event.repertoireId` existe en `repertoires.json`.
- [ ] Cada `repertoire.eventId` existe en `events.json`.
- [ ] Cada `repertoire.items[].songId` existe en `songs.json`.
- [ ] Cada fecha usa `YYYY-MM-DD`.
- [ ] Cada hora usa `HH:mm`.
- [ ] No hay campos inconsistentes por escritura.
- [ ] No hay datos personales sensibles.
- [ ] El JSON pasa validación.

## Comandos de validación

```bash
python -m json.tool data/events.json
python -m json.tool data/songs.json
python -m json.tool data/repertoires.json
```

## Salida recomendada

Cuando revises o crees datos, responde con:

```md
## Datos revisados

...

## Relaciones verificadas

- Eventos → repertorios: ...
- Repertorios → cantos: ...

## Problemas encontrados

...

## Correcciones recomendadas

...

## Veredicto

Listo / Condicional / No listo
```
