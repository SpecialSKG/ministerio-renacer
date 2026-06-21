# Guía de Agentes, Skills y MCPs

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Propósito

Esta guía define cómo organizar y usar las skills, agentes y MCPs dentro del proyecto.

El objetivo es que OpenCode trabaje de forma ordenada, priorizando la POC estática y evitando que skills externas o agentes generales empujen el proyecto hacia una arquitectura demasiado grande antes de tiempo.

---

## 1. Decisión de organización

El proyecto usa dos ubicaciones de skills:

```txt
.agents/skills/
.opencode/agents/skills/
```

Esta separación es intencional.

---

## 2. `.agents/skills/`

Esta carpeta contiene skills externas instaladas desde terminal.

Ejemplos:

- skills instaladas desde `skills.sh`
- skills visuales
- skills de UI
- skills de testing general
- skills de SEO
- skills de documentación externa
- skills reutilizables entre proyectos

Estas skills no pertenecen exclusivamente a `ministerio-renacer`.

### Rol de esta carpeta

```txt
.agents/skills/ = biblioteca externa de apoyo
```

Estas skills pueden ayudar, pero no definen el alcance del proyecto.

---

## 3. `.opencode/agents/skills/`

Esta carpeta contiene skills propias del proyecto.

Skills actuales:

```txt
poc-planner
static-frontend
json-content
poc-qa
```

Estas skills sí pertenecen directamente a `ministerio-renacer`.

### Rol de esta carpeta

```txt
.opencode/agents/skills/ = reglas y comportamiento específico del proyecto
```

Estas skills mandan sobre la POC.

---

## 4. Regla de prioridad

Cuando una skill externa y una skill propia entren en conflicto:

```txt
Gana la skill propia del proyecto.
```

Orden de prioridad:

1. `.opencode/instructions/AGENTS.md`
2. Documentos principales en `docs/`
3. Skills propias en `.opencode/agents/skills/`
4. Skills externas en `.agents/skills/`
5. Supuestos del agente

---

## 5. Flujo de trabajo entre skills propias

Las skills propias no deben fusionarse en una sola. Deben trabajar como una cadena:

```txt
poc-planner
  ↓
static-frontend
  ↓
json-content
  ↓
poc-qa
```

La lógica es:

```txt
poc-planner      → decide qué se hará
static-frontend  → construye la interfaz
json-content     → valida datos y relaciones
poc-qa           → audita antes de marcar listo
```

---

## 6. Skill: `poc-planner`

### Propósito

Planificar sin construir.

### Usar cuando

- Se quiera definir una fase.
- Se quiera dividir una tarea.
- Se quiera revisar alcance.
- Se quiera evitar sobreingeniería.
- Se quiera saber si algo pertenece a POC o etapa moderna.

### Documentos que debe consultar

- `docs/05-prd-requerimientos-producto.md`
- `docs/10-plan-implementacion.md`
- `docs/08-app-flow.md`
- `docs/06-trd-requerimientos-tecnicos.md`

### Resultado esperado

- Objetivo.
- Alcance.
- Archivos afectados.
- Pasos.
- Criterios de aceptación.
- Riesgos.

---

## 7. Skill: `static-frontend`

### Propósito

Construir la POC estática.

### Usar cuando

- Se cree `index.html`.
- Se cree o edite CSS.
- Se cree o edite JavaScript.
- Se rendericen eventos.
- Se rendericen cantos.
- Se implemente navegación.
- Se construya UI responsive.

### Documentos que debe consultar

- `docs/06-trd-requerimientos-tecnicos.md`
- `docs/07-brief-diseno-ui-ux.md`
- `docs/08-app-flow.md`

### Resultado esperado

- Código HTML/CSS/JS funcional.
- Carga de JSON.
- Navegación compatible con hosting estático.
- Interfaz mobile-first.

---

## 8. Skill: `json-content`

### Propósito

Mantener los datos consistentes.

### Usar cuando

- Se creen eventos.
- Se creen cantos.
- Se creen repertorios.
- Se corrijan IDs.
- Se revisen relaciones entre JSON.
- Se prepare migración futura a backend.

### Documentos que debe consultar

- `docs/06-trd-requerimientos-tecnicos.md`
- `docs/09-esquema-backend.md`
- `docs/08-app-flow.md`

### Resultado esperado

- JSON válido.
- IDs únicos.
- Relaciones correctas.
- Fechas y horas consistentes.
- Datos migrables a futuro.

---

## 9. Skill: `poc-qa`

### Propósito

Auditar antes de marcar listo.

### Usar cuando

- Se termine una fase.
- Se vaya a hacer commit.
- Se vaya a desplegar.
- Se detecte un error.
- Se necesite revisar móvil, navegación o accesibilidad.

### Documentos que debe consultar

- `docs/agente-ia/checklist-auditoria-poc.md`
- `docs/06-trd-requerimientos-tecnicos.md`
- `docs/07-brief-diseno-ui-ux.md`
- `docs/08-app-flow.md`

### Resultado esperado

- Veredicto.
- Hallazgos por severidad.
- Recomendaciones.
- Checklist final.

---

## 10. Uso de skills externas

Las skills externas pueden usarse como apoyo.

Ejemplos:

### Para diseño visual

- `frontend-design`
- `web-design-guidelines`
- skills de UI instaladas desde terminal

### Para testing

- `webapp-testing`

### Para SEO

- `seo-audit`

### Para documentación técnica externa

- `github-actions-docs`

Pero ninguna skill externa debe imponer:

- React.
- Angular.
- Next.js.
- Vue.
- Supabase.
- Backend.
- Login.
- Build step.
- PDF.
- Transposición.

Si lo propone, clasificarlo como etapa moderna.

---

## 11. MCP recomendado

## Playwright MCP

Playwright MCP es útil para probar la web en navegador.

Debe usarse para:

- Abrir la web local.
- Revisar errores de consola.
- Probar navegación.
- Validar flujo principal.
- Revisar responsive.
- Probar búsqueda.
- Comprobar estados vacíos.

Servidor local:

```bash
python -m http.server 8080
```

URL:

```txt
http://localhost:8080
```

Flujo mínimo a probar:

```txt
Inicio → Eventos → Detalle de evento → Repertorio → Detalle de canto
```

---

## 12. MCPs no recomendados todavía

No agregar en la POC:

- Supabase MCP.
- GitHub MCP.
- Database MCP.
- Deploy MCP.
- MCPs de backend.
- MCPs de infraestructura.
- Otro MCP de navegador si Playwright ya funciona.

Razón:

La POC no necesita backend, base de datos, autenticación ni despliegue complejo.

---

## 13. Agentes recomendados

El proyecto puede crecer usando agentes por rol.

Agentes sugeridos:

```txt
ministerio-planner
ministerio-builder
ministerio-reviewer
ministerio-docs
```

### `ministerio-planner`

Planifica, no edita.

### `ministerio-builder`

Construye HTML/CSS/JS/JSON.

### `ministerio-reviewer`

Audita calidad y alcance.

### `ministerio-docs`

Mantiene documentación.

---

## 14. Prompts recomendados

### Planificación

```txt
Usa poc-planner.
Revisa el PRD, TRD, AppFlow y Plan de Implementación.
Define la siguiente fase de la POC sin modificar archivos.
Mantén el alcance en HTML, CSS, JS y JSON.
```

### Construcción

```txt
Usa static-frontend y json-content.
Crea el esqueleto funcional de la POC:
index.html, styles.css, app.js, events.json, songs.json y repertoires.json.
No uses framework, backend ni dependencias npm.
```

### Revisión

```txt
Usa poc-qa.
Revisa la POC completa.
Si Playwright MCP está disponible, abre http://localhost:8080 y prueba el flujo:
Inicio → Eventos → Detalle de evento → Repertorio → Detalle de canto.
Entrega hallazgos por severidad.
```

---

## 15. Reglas para crear nuevas skills

Crear una nueva skill solo si:

- Resuelve una tarea repetida.
- Evita errores frecuentes.
- Documenta una convención estable.
- Aporta algo que las cuatro skills actuales no cubren.

No crear una nueva skill solo porque parece interesante.

---

## 16. Posible skill futura

Solo si el proyecto crece y OpenCode se pierde coordinando las cuatro skills, se podría crear:

```txt
ministerio-poc-orchestrator
```

Pero no es necesaria ahora.

Por ahora, mantener cuatro skills propias es suficiente.

---

## 17. Recomendación actual

Mantener esta arquitectura:

```txt
.agents/skills/
  → skills externas de apoyo

.opencode/agents/skills/
  → skills propias que mandan sobre el proyecto
```

Y trabajar con este flujo:

```txt
poc-planner → static-frontend → json-content → poc-qa
```

Después de esta guía, el siguiente paso debe ser construir el esqueleto funcional de la POC.
