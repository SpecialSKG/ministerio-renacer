# Plan de Implementación

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Propósito

Este documento define un plan de ejecución práctico para construir la prueba de concepto y preparar el camino hacia una versión moderna.

La regla principal es no construir todo al mismo tiempo. Primero se valida la utilidad con una web estática simple. Después se decide si vale la pena avanzar hacia backend, auth, roles, PDF y transposición.

---

## 1. Estrategia general

El proyecto se ejecutará en dos grandes etapas:

1. **Etapa 1 — Prueba de concepto estática**
   - HTML, CSS, JavaScript.
   - Datos JSON.
   - Sin backend.
   - Sin login.
   - Despliegue gratuito.

2. **Etapa 2 — Versión moderna**
   - Base de datos.
   - Auth.
   - Roles.
   - Panel administrativo.
   - Repertorios dinámicos.
   - PDF.
   - Transposición.

---

## 2. Fase 0 — Preparación

### Objetivo

Dejar el proyecto listo para comenzar a programar sin improvisar estructura.

### Tareas

- Ordenar carpetas.
- Renombrar documentos en `docs/`.
- Crear `README.md`.
- Revisar `.gitignore`.
- Confirmar `opencode.json`.
- Confirmar skills instaladas.
- Confirmar Playwright MCP.
- Definir estructura de datos JSON.

### Entregables

- Proyecto organizado.
- Documentación base.
- README inicial.
- Carpetas listas.
- Plan aprobado.

### Criterios de salida

- Existe estructura de carpetas limpia.
- La documentación está en `docs/`.
- OpenCode tiene instrucciones claras.
- Se evita incluir `.git/` en ZIPs compartidos.

---

## 3. Fase 1 — Esqueleto funcional

### Objetivo

Crear una web mínima que cargue sin errores.

### Tareas

- Crear `index.html`.
- Crear `assets/css/styles.css`.
- Crear `assets/js/app.js`.
- Crear `data/events.json`.
- Crear `data/songs.json`.
- Crear `data/repertoires.json`.
- Servir localmente con `python -m http.server 8080`.

### Entregables

- Página inicial visible.
- CSS conectado.
- JS conectado.
- JSON de ejemplo.
- Sin errores de consola.

### Criterios de aceptación

- La página abre localmente.
- El CSS se aplica.
- El JS carga.
- No hay errores críticos.

---

## 4. Fase 2 — Landing page

### Objetivo

Crear la página pública de presentación.

### Tareas

- Header.
- Hero.
- Sección de información básica.
- Accesos rápidos.
- Próximos eventos destacados.
- Footer.
- Ajuste responsive inicial.

### Entregables

- Landing navegable.
- Secciones principales.
- Diseño base mobile-first.

### Criterios de aceptación

- El usuario entiende qué es el sitio.
- Hay botones para eventos y cantos.
- Se ve bien en celular.
- No hay saturación visual.

---

## 5. Fase 3 — Eventos

### Objetivo

Mostrar eventos desde JSON.

### Tareas

- Definir estructura final de `events.json`.
- Cargar eventos con `fetch`.
- Renderizar lista de eventos.
- Ordenar por fecha.
- Crear estados vacíos.
- Crear detalle de evento.
- Mostrar fecha, hora, lugar, reunión, vestimenta y notas.

### Entregables

- Lista de eventos.
- Detalle de evento.
- Navegación lista → detalle → volver.

### Criterios de aceptación

- Los eventos se muestran desde JSON.
- El detalle contiene información práctica.
- El usuario puede volver a la lista.
- El flujo funciona en móvil.

---

## 6. Fase 4 — Cantos

### Objetivo

Mostrar biblioteca de cantos desde JSON.

### Tareas

- Definir estructura final de `songs.json`.
- Cargar cantos con `fetch`.
- Renderizar lista de cantos.
- Crear buscador simple.
- Crear detalle de canto.
- Mostrar letra y acordes.
- Agregar estado vacío de búsqueda.

### Entregables

- Lista de cantos.
- Buscador.
- Detalle de canto.

### Criterios de aceptación

- Los cantos cargan desde JSON.
- La búsqueda filtra resultados.
- La letra se lee cómodamente.
- Los acordes no rompen el layout.

---

## 7. Fase 5 — Repertorios básicos

### Objetivo

Relacionar eventos con cantos.

### Tareas

- Crear estructura de `repertoires.json`.
- Asociar evento con repertorio.
- Resolver `songId`.
- Mostrar repertorio en detalle de evento.
- Permitir abrir cada canto.
- Mostrar estado si no hay repertorio.

### Entregables

- Repertorio visible en evento.
- Enlaces a cantos.
- Orden respetado.

### Criterios de aceptación

- Un evento puede mostrar cantos asociados.
- El orden del repertorio es correcto.
- Cada canto abre su detalle.
- No hay errores si falta repertorio.

---

## 8. Fase 6 — Pulido UI/UX

### Objetivo

Mejorar lectura, navegación y experiencia móvil.

### Tareas

- Ajustar espaciado.
- Mejorar cards.
- Mejorar botones.
- Ajustar contraste.
- Revisar tipografía.
- Mejorar estados vacíos.
- Probar responsive.
- Revisar accesibilidad básica.

### Entregables

- UI más limpia.
- Experiencia móvil usable.
- Checklist UX revisado.

### Criterios de aceptación

- No hay scroll horizontal.
- Los botones son fáciles de tocar.
- La información principal está clara.
- Los textos son legibles.

---

## 9. Fase 7 — QA y pruebas

### Objetivo

Detectar errores antes de publicar.

### Tareas

- Probar en Chrome.
- Probar en móvil.
- Probar navegación.
- Probar JSON inválido.
- Probar eventos sin repertorio.
- Probar búsquedas sin resultados.
- Revisar consola.
- Usar Playwright MCP.
- Ejecutar revisión Lighthouse si aplica.

### Entregables

- Checklist QA.
- Lista de bugs.
- Correcciones aplicadas.

### Criterios de aceptación

- No hay errores de consola en flujo normal.
- Los enlaces funcionan.
- Los JSON cargan.
- La app responde en móvil.
- Los estados de error son claros.

---

## 10. Fase 8 — Despliegue

### Objetivo

Publicar la POC en una URL accesible.

### Opción A — GitHub Pages

Tareas:

- Subir código a GitHub.
- Activar Pages.
- Seleccionar rama.
- Verificar URL.
- Probar rutas.

### Opción B — Cloudflare Pages

Tareas:

- Conectar repositorio.
- Configurar build vacío o sin build.
- Publicar.
- Verificar URL `.pages.dev`.
- Probar rutas.

### Entregables

- Sitio publicado.
- URL compartible.
- README actualizado con despliegue.

### Criterios de aceptación

- La web abre desde internet.
- Los JSON cargan correctamente.
- La URL se puede compartir por WhatsApp.
- No se rompe en móvil.

---

## 11. Fase 9 — Validación con usuarios

### Objetivo

Confirmar si la POC ayuda realmente.

### Usuarios sugeridos

- 2 miembros jóvenes.
- 2 miembros adultos.
- 1 coordinador.
- 1 persona externa o poco familiarizada.

### Tareas de prueba

- Encontrar próximo evento.
- Abrir detalle.
- Identificar hora de reunión.
- Identificar lugar.
- Abrir repertorio.
- Abrir un canto.
- Buscar un canto.

### Preguntas

- ¿Encontraste lo que buscabas?
- ¿Qué te confundió?
- ¿Qué dato faltó?
- ¿Lo usarías si te lo mandan por WhatsApp?
- ¿Qué cambiarías?

### Criterios de éxito

- La mayoría encuentra eventos sin ayuda.
- La mayoría entiende el repertorio.
- Nadie necesita login para consultar.
- Se detectan mejoras concretas.

---

## 12. Fase 10 — Ajustes posteriores

### Objetivo

Mejorar la POC sin convertirla todavía en app compleja.

### Tareas

- Ajustar textos.
- Ajustar orden visual.
- Agregar datos reales.
- Mejorar accesibilidad.
- Optimizar imágenes.
- Documentar mantenimiento.
- Decidir si pasa a etapa moderna.

---

## 13. Backlog fase 2

Cuando la POC esté validada:

- Base de datos.
- Auth.
- Roles.
- Panel admin.
- CRUD de eventos.
- CRUD de cantos.
- Constructor de repertorios.
- PDF.
- Transposición.
- Google Calendar.
- Historial.

---

## 14. Orden recomendado de commits

```txt
chore: estructura inicial del proyecto
docs: agregar documentación base
feat: crear landing inicial
feat: cargar eventos desde json
feat: agregar detalle de evento
feat: cargar cantos desde json
feat: agregar detalle de canto
feat: relacionar repertorios con eventos
style: pulir diseño responsive
test: revisar flujo principal con playwright
docs: actualizar readme de uso y despliegue
```

---

## 15. Comandos útiles

Servidor local:

```bash
python -m http.server 8080
```

Git básico:

```bash
git status
git add .
git commit -m "feat: crear estructura inicial"
git push
```

Validación rápida:

```bash
python -m json.tool data/events.json
python -m json.tool data/songs.json
python -m json.tool data/repertoires.json
```

---

## 16. Riesgos de implementación

| Riesgo | Impacto | Mitigación |
|---|---:|---|
| Empezar con diseño demasiado complejo | Alto | Maquetar simple primero |
| Agregar backend antes de validar | Alto | Mantener POC estática |
| JSON mal escrito | Medio | Validar antes de commit |
| Falta de contenido real | Medio | Usar datos de ejemplo, luego datos reales |
| Mala experiencia móvil | Alto | Probar en celular desde fase 2 |
| Proyecto se vuelve largo | Alto | Cerrar alcance de POC |
| No documentar mantenimiento | Medio | Crear README claro |

---

## 17. Definición de terminado de la POC

La POC se considera terminada cuando:

- Está publicada.
- Tiene landing.
- Tiene eventos desde JSON.
- Tiene detalle de evento.
- Tiene cantos desde JSON.
- Tiene detalle de canto.
- Tiene repertorios básicos.
- Se ve bien en móvil.
- Tiene README.
- Puede mantenerse editando JSON.
- Se puede compartir por WhatsApp.

---

## 18. Recomendación final

No seguir agregando documentos antes de crear el esqueleto funcional. Con estos documentos, el proyecto ya tiene peso suficiente para iniciar construcción.

El siguiente paso debe ser programar la base mínima y validar el flujo principal:

```txt
Inicio → Evento → Repertorio → Canto
```
