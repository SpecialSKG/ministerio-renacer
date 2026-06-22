# Fase 1 — Esqueleto funcional mínimo (Iteración 1)

> **Creado:** 2026-06-21
> **Estado:** COMPLETADO

## Objetivo
Crear el esqueleto funcional mínimo de la POC: 6 archivos (index.html, styles.css, app.js, events.json, songs.json, repertoires.json) que carguen sin errores al abrir con un servidor estático.

## Pasos ejecutados

| # | Paso | Estado | Commit |
|---|------|--------|--------|
| 1 | Crear `data/events.json` con 2 eventos de ejemplo | ✅ | 8d68980 |
| 2 | Crear `data/songs.json` con 2 cantos de ejemplo | ✅ | 62a462e |
| 3 | Crear `data/repertoires.json` con 1 repertorio de ejemplo | ✅ | 9b3dedd |
| 4 | Crear `assets/css/styles.css` con variables, reset y layout mobile-first | ✅ | fa1a432 |
| 5 | Crear `index.html` con estructura semántica y conexión a CSS/JS | ✅ | 236b748 |
| 6 | Crear `assets/js/app.js` con carga de JSON mediante fetch y logs | ✅ | 1117933 |
| 7 | Validación local de JSON y servidor | ✅ | cb8bfc4 |

## Incidentes

- **Python no disponible como comando directo** (`python` redirige al stub de Microsoft Store). Se usó `ConvertFrom-Json` de PowerShell para validar los 3 JSON. Todos pasaron la validación.
- **Servidor**: Se inició con la instalación real de Python en `C:\Users\josea\AppData\Local\Python\bin\python.exe -m http.server 8080`. Servidor funcionó correctamente (PID 7584).
- **Commit de validación**: No hubo cambios que committear (JSONs ya eran válidos). Se usó `--allow-empty` para registrar el paso.

## Validaciones realizadas

| Archivo | Resultado |
|---------|-----------|
| `data/events.json` | ✅ VÁLIDO (ConvertFrom-Json) |
| `data/songs.json` | ✅ VÁLIDO (ConvertFrom-Json) |
| `data/repertoires.json` | ✅ VÁLIDO (ConvertFrom-Json) |
| Servidor HTTP (puerto 8080) | ✅ Iniciado correctamente |

## Integridad referencial

| Relación | Estado |
|----------|--------|
| `repertoires[0].eventId` → `events[0].id` (`evt-001`) | ✅ Coincide |
| `repertoires[0].items[0].songId` → `songs[0].id` (`song-001`) | ✅ Coincide |
| `repertoires[0].items[1].songId` → `songs[1].id` (`song-002`) | ✅ Coincide |

## Archivos creados

- `index.html`
- `assets/css/styles.css`
- `assets/js/app.js`
- `data/events.json`
- `data/songs.json`
- `data/repertoires.json`
- `reports/2026-06-21_fase1-esqueleto_iter1.md`
