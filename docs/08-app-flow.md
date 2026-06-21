# AppFlow — Flujos de la Aplicación

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Propósito

Este documento describe cómo se moverán los usuarios dentro de la plataforma, tanto en la POC estática como en la versión moderna futura.

---

## 1. Principio general de flujo

La aplicación debe permitir tres acciones rápidas:

1. Ver el próximo evento.
2. Ver el repertorio de ese evento.
3. Abrir un canto y leer letra/acordes.

Todo lo demás es secundario en la POC.

---

## 2. Mapa general de navegación POC

```txt
Inicio
├── Próximos eventos
│   └── Detalle de evento
│       └── Repertorio
│           └── Detalle de canto
├── Cantos
│   └── Detalle de canto
└── Contacto / información
```

---

## 3. Rutas sugeridas

Si se usa hash routing:

```txt
#/inicio
#/eventos
#/evento/:id
#/cantos
#/canto/:id
```

Ejemplos:

```txt
#/evento/evt-2026-06-20-ensayo
#/canto/song-cada-vez
```

---

## 4. Flujo de visitante público

### Objetivo

Conocer el ministerio o consultar información general.

### Flujo

```txt
Usuario abre enlace
  ↓
Landing page
  ↓
Lee información básica
  ↓
Elige:
  ├── Ver eventos
  ├── Ver cantos
  └── Contacto
```

### Criterios

- No requiere login.
- No requiere explicación.
- La primera pantalla debe mostrar accesos claros.

---

## 5. Flujo de miembro que busca evento

### Objetivo

Saber cuándo y dónde debe asistir.

### Flujo

```txt
Usuario abre enlace compartido por WhatsApp
  ↓
Inicio o sección Eventos
  ↓
Ve lista de próximos eventos
  ↓
Selecciona evento
  ↓
Lee detalle:
  ├── Fecha
  ├── Hora
  ├── Hora de reunión
  ├── Lugar
  ├── Vestimenta
  ├── Modalidad musical
  └── Notas
```

### Resultado esperado

El usuario sabe qué debe hacer sin preguntarle a otra persona.

### Puntos críticos

- Fecha y hora deben ser muy visibles.
- Hora de reunión no debe confundirse con hora de inicio.
- Lugar debe estar claro.
- Si hay repertorio, debe verse dentro del mismo detalle.

---

## 6. Flujo de miembro que busca repertorio

### Objetivo

Ver qué cantos se usarán en un evento.

### Flujo

```txt
Lista de eventos
  ↓
Detalle de evento
  ↓
Bloque de repertorio
  ↓
Lista ordenada de cantos
  ↓
Selecciona canto
  ↓
Detalle de canto
```

### Información mostrada

En el detalle del evento:

- Orden del canto.
- Título.
- Categoría o momento.
- Tonalidad usada, si existe.
- Nota breve, si aplica.

En el detalle del canto:

- Letra.
- Acordes.
- Tonalidad base.
- Notas.

### Puntos críticos

- El orden debe ser claro.
- El enlace al canto debe ser fácil de tocar.
- Debe existir botón para volver al evento.

---

## 7. Flujo de usuario que busca canto

### Objetivo

Encontrar una letra o acordes específicos.

### Flujo

```txt
Inicio
  ↓
Cantos
  ↓
Buscador
  ↓
Resultados filtrados
  ↓
Detalle de canto
```

### Criterios

- Buscar por título.
- En fase posterior, buscar por categoría o etiqueta.
- Mostrar estado vacío si no hay resultados.

---

## 8. Flujo de mantenimiento en POC

En la prueba de concepto no hay panel de administración.

### Actor

Responsable técnico o editor con acceso al repositorio.

### Flujo

```txt
Abrir proyecto local
  ↓
Editar data/events.json, data/songs.json o data/repertoires.json
  ↓
Validar JSON
  ↓
Probar localmente con servidor estático
  ↓
Revisar en navegador
  ↓
Commit
  ↓
Push
  ↓
Deploy automático o manual
```

### Validaciones necesarias

- JSON válido.
- IDs únicos.
- Fechas correctas.
- Repertorios enlazados correctamente.
- Cantos existentes.
- No hay errores de consola.
- La web carga en móvil.

---

## 9. Flujo de despliegue POC

```txt
Cambios en archivos
  ↓
Commit en Git
  ↓
Push a GitHub
  ↓
GitHub Pages o Cloudflare Pages
  ↓
Sitio actualizado
  ↓
Compartir enlace por WhatsApp
```

---

## 10. Flujo futuro de administrador

Este flujo pertenece a la etapa moderna.

```txt
Administrador abre sitio
  ↓
Inicia sesión
  ↓
Panel administrativo
  ↓
Elige acción:
  ├── Crear evento
  ├── Editar evento
  ├── Crear canto
  ├── Editar canto
  ├── Crear repertorio
  └── Generar PDF
```

---

## 11. Flujo futuro para crear evento

```txt
Login admin/editor
  ↓
Panel
  ↓
Nuevo evento
  ↓
Completar:
  ├── Título
  ├── Tipo
  ├── Fecha
  ├── Hora de inicio
  ├── Hora de reunión
  ├── Lugar
  ├── Vestimenta
  ├── Modalidad musical
  └── Notas
  ↓
Guardar como borrador
  ↓
Agregar repertorio
  ↓
Publicar evento
```

---

## 12. Flujo futuro para construir repertorio

```txt
Evento creado
  ↓
Abrir constructor de repertorio
  ↓
Buscar canto
  ↓
Agregar canto
  ↓
Definir orden
  ↓
Definir tonalidad usada
  ↓
Agregar notas
  ↓
Guardar
  ↓
Publicar repertorio
  ↓
Generar PDF opcional
```

---

## 13. Flujo futuro para PDF

```txt
Evento con repertorio publicado
  ↓
Administrador selecciona Generar PDF
  ↓
Sistema crea plantilla
  ↓
Incluye:
  ├── Datos del evento
  ├── Lista de cantos
  ├── Letras
  ├── Acordes
  └── Notas
  ↓
Descargar PDF
```

---

## 14. Flujo futuro para transposición

```txt
Detalle de canto o repertorio
  ↓
Seleccionar nueva tonalidad
  ↓
Sistema detecta acordes
  ↓
Calcula nueva tonalidad
  ↓
Muestra versión transpuesta
  ↓
Guarda tonalidad usada en repertorio
```

Condición previa:

- Los acordes deben estar normalizados.

---

## 15. Flujos de error

### Evento no encontrado

```txt
Usuario abre #/evento/id-inexistente
  ↓
Sistema no encuentra evento
  ↓
Muestra mensaje:
"Este evento no está disponible."
  ↓
Botón: Volver a eventos
```

### Canto no encontrado

```txt
Usuario abre #/canto/id-inexistente
  ↓
Sistema no encuentra canto
  ↓
Muestra mensaje:
"Este canto no está disponible."
  ↓
Botón: Volver a cantos
```

### JSON no carga

```txt
App inicia
  ↓
Fetch falla
  ↓
Sistema muestra error amigable
  ↓
Indica revisar archivos de datos
```

### Repertorio sin cantos

```txt
Detalle de evento
  ↓
No hay repertorio
  ↓
Muestra:
"Este evento aún no tiene repertorio asignado."
```

---

## 16. AppFlow mínimo para construir primero

El primer flujo implementable debe ser:

```txt
Inicio
  ↓
Eventos
  ↓
Detalle de evento
  ↓
Canto del repertorio
  ↓
Detalle de canto
```

Ese flujo valida el corazón del producto.

---

## 17. Criterios de aceptación de flujo

- El usuario nunca queda atrapado sin botón de volver.
- El detalle de evento muestra información práctica antes del repertorio.
- Los cantos son accesibles desde eventos y desde la biblioteca.
- Los errores no rompen la pantalla.
- La navegación funciona en hosting estático.
- Las URLs pueden compartirse.
