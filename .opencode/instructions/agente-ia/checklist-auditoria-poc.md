# Checklist de auditoría para la POC

## Estructura

- [ ] Existe `index.html`.
- [ ] Existe `assets/css/styles.css`.
- [ ] Existe `assets/js/app.js`.
- [ ] Existe `data/events.json`.
- [ ] Existe `data/songs.json`.
- [ ] Existe `data/repertoires.json`.
- [ ] Existe `README.md`.

## HTML

- [ ] Usa `header`.
- [ ] Usa `main`.
- [ ] Usa `section`.
- [ ] Usa `nav`.
- [ ] Usa `footer`.
- [ ] Tiene título de página.
- [ ] Tiene meta description.
- [ ] Las imágenes tienen `alt`.

## CSS

- [ ] Mobile-first.
- [ ] Sin scroll horizontal.
- [ ] Botones con buen tamaño.
- [ ] Contraste suficiente.
- [ ] Variables CSS.
- [ ] Estados hover/focus visibles.

## JavaScript

- [ ] Carga JSON con manejo de error.
- [ ] No hay errores de consola.
- [ ] Renderiza eventos.
- [ ] Renderiza cantos.
- [ ] Resuelve repertorios.
- [ ] Maneja estados vacíos.
- [ ] Navegación funciona.

## JSON

- [ ] JSON válido.
- [ ] IDs únicos.
- [ ] Fechas `YYYY-MM-DD`.
- [ ] Horas `HH:mm`.
- [ ] `repertoireId` existe.
- [ ] `songId` existe.

## UX

- [ ] Se encuentra el próximo evento rápido.
- [ ] Se entiende la hora de reunión.
- [ ] El repertorio se muestra en orden.
- [ ] Se puede abrir un canto.
- [ ] El buscador es claro.
- [ ] Se puede volver sin perderse.

## Publicación

- [ ] Funciona con servidor local.
- [ ] Funciona en hosting estático.
- [ ] Usa rutas relativas.
- [ ] Se puede compartir por WhatsApp.
