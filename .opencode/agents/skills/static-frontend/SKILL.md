---
name: static-frontend
description: Construye la interfaz estática de la POC del Ministerio Renacer usando HTML semántico, CSS mobile-first y JavaScript puro con datos JSON.
compatibility: opencode
---

# Skill: Static Frontend

## Propósito

Esta skill guía la construcción de la interfaz pública de la POC usando tecnologías simples y compatibles con hosting estático.

Debe usarse para crear o modificar:

- `index.html`
- `assets/css/styles.css`
- `assets/js/app.js`
- vistas de eventos
- vistas de cantos
- navegación interna
- renderizado de datos JSON
- estados vacíos y errores
- diseño responsive

## Principio técnico

La POC debe funcionar sin framework, sin backend y sin build step.

Tecnologías permitidas:

- HTML.
- CSS.
- JavaScript puro.
- JSON.
- Markdown para documentación.

Evitar:

- React.
- Angular.
- Vue.
- Next.js.
- Vite.
- Tailwind obligatorio.
- Bootstrap obligatorio.
- Node backend.
- Supabase.
- Firebase.
- Dependencias npm innecesarias.

## Documentos que debe consultar

1. `docs/06-trd-requerimientos-tecnicos.md`
2. `docs/07-brief-diseno-ui-ux.md`
3. `docs/08-app-flow.md`
4. `docs/10-plan-implementacion.md`
5. `docs/05-prd-requerimientos-producto.md`

## Estructura esperada

```txt
ministerio-renacer/
├── index.html
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
└── docs/
```

## Reglas HTML

- Usar HTML semántico.
- Usar `header`, `nav`, `main`, `section`, `article`, `footer`.
- Usar encabezados en orden lógico.
- Usar botones para acciones y enlaces para navegación.
- Incluir `alt` en imágenes.
- Incluir `meta viewport`.
- Incluir `meta description`.
- Evitar HTML innecesariamente profundo.

## Reglas CSS

- Diseñar mobile-first.
- Usar variables CSS en `:root`.
- Mantener buena legibilidad.
- Evitar scroll horizontal.
- Crear componentes simples:
  - botones
  - cards
  - badges
  - bloques de detalle
  - estados vacíos
  - mensajes de error
- Mantener foco visible.
- Usar contraste suficiente.
- Evitar animaciones innecesarias.

## Reglas JavaScript

- Usar `fetch()` para cargar JSON.
- Manejar errores de carga.
- Separar datos, render y eventos cuando sea posible.
- No depender de variables globales innecesarias.
- No usar `innerHTML` con contenido no controlado si puede evitarse.
- Resolver relaciones entre eventos, repertorios y cantos.
- Manejar estados vacíos.
- Mantener navegación compatible con hosting estático.

## Navegación recomendada

Usar hash routing simple:

```txt
#/inicio
#/eventos
#/evento/:id
#/cantos
#/canto/:id
```

Si se decide no usar router, usar secciones con anclas:

```txt
#inicio
#eventos
#cantos
```

Evitar History API en POC para no requerir configuración de rewrites.

## Flujo mínimo que debe funcionar

```txt
Inicio
  ↓
Eventos
  ↓
Detalle de evento
  ↓
Repertorio
  ↓
Detalle de canto
```

## Criterios de aceptación

Antes de considerar terminada una implementación frontend:

- [ ] La página abre localmente.
- [ ] No hay errores de consola en flujo normal.
- [ ] El CSS carga correctamente.
- [ ] El JS carga correctamente.
- [ ] Eventos cargan desde JSON.
- [ ] Cantos cargan desde JSON.
- [ ] Repertorios se resuelven correctamente.
- [ ] La navegación funciona.
- [ ] Se ve bien en móvil.
- [ ] No hay scroll horizontal.
- [ ] Hay estados vacíos.
- [ ] Hay manejo básico de errores.
- [ ] Funciona con servidor estático.

## Comando local recomendado

```bash
python -m http.server 8080
```

URL:

```txt
http://localhost:8080
```

## Salida recomendada

Cuando termines una tarea, responde con:

```md
## Cambios realizados

...

## Archivos modificados

...

## Cómo probar

...

## Criterios revisados

- [ ] ...

## Pendientes

...
```
