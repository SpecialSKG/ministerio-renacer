# Mejoras desde referencias externas

## Propósito

Este documento resume qué patrones se pueden aprovechar de los proyectos externos revisados y cómo aplicarlos al proyecto `ministerio-renacer`.

No se deben importar tecnologías ajenas innecesarias. Solo se adoptan patrones de organización.

---

## 1. Hallazgos del proyecto actual

El proyecto `ministerio-renacer` ya tiene una base ordenada:

- Carpeta `docs/` con documentos de producto, técnica, diseño, flujo y plan.
- Carpeta `.opencode/` con instrucciones y skills.
- `opencode.json` con Playwright MCP.
- Separación prevista entre `assets/`, `data/` y documentación.
- Alcance claro: POC estática con HTML/CSS/JS y JSON.

---

## 2. Observaciones a corregir

### 2.1 Archivo con doble extensión

Actualmente existe:

```txt
docs/00-concepto-general.md.md
```

Recomendación:

```txt
docs/00-concepto-general.md
```

### 2.2 Skills propias con texto residual

Algunas skills propias contienen al final texto residual de PowerShell:

```txt
'@ | Set-Content ...
```

Esto debe eliminarse porque puede confundir al agente.

Afecta a:

- `poc-planner`
- `static-frontend`
- `json-content`
- `poc-qa`

### 2.3 Carpetas de skills duplicadas

Existen:

```txt
.agents/skills/
.opencode/agents/skills/
```

Recomendación:

- Mantener `.opencode/agents/skills/` como fuente principal operativa.
- Usar `.agents/skills/` solo como biblioteca externa de referencia visual.
- Documentar esta diferencia en `AGENTS.md`.

### 2.4 ZIP con `.git/`

Cuando compartas el proyecto, excluye `.git/`.

Recomendación:

```gitignore
*.zip
*.rar
*.7z
```

Y al comprimir, omitir `.git/`.

---

## 3. Patrones útiles del proyecto Deluge

El proyecto Deluge aporta un patrón muy útil: agentes especializados por responsabilidad.

Adaptación recomendada:

```txt
ministerio-planner.md
ministerio-builder.md
ministerio-reviewer.md
ministerio-docs.md
```

Beneficio:

- Menos improvisación.
- Mejor control de permisos.
- Mayor claridad sobre quién puede editar.
- Revisión más segura antes de avanzar.

---

## 4. Patrones útiles del proyecto Angular Docs

El proyecto Angular Docs aporta un patrón útil: documentación curada con índice maestro.

Adaptación recomendada:

- Usar `docs/README.md` como índice principal.
- Mantener una lista clara de documentos y cuándo leer cada uno.
- Evitar que los agentes lean todo sin necesidad.
- Indicar qué documento manda en cada tipo de tarea.

Ejemplo:

```txt
Para producto → PRD
Para técnica → TRD
Para navegación → AppFlow
Para diseño → Brief UI/UX
Para ejecución → Plan de implementación
Para agentes → Guía de agentes, skills y MCPs
```

---

## 5. Patrones que no conviene copiar

No conviene copiar de forma literal:

- Estructuras demasiado grandes.
- Skills de animación para todas las tareas.
- Agentes con demasiados permisos.
- Documentación masiva que el agente no necesita leer siempre.
- Dependencias o herramientas ajenas al alcance HTML/CSS/JS.

---

## 6. Mejoras prioritarias

Orden recomendado:

1. Renombrar `00-concepto-general.md.md`.
2. Corregir skills propias.
3. Crear agentes por rol.
4. Crear `04-guia-agentes-skills-mcps.md`.
5. Actualizar `docs/README.md` como índice maestro.
6. Crear esqueleto funcional HTML/CSS/JS.
7. Validar con Playwright MCP.

---

## 7. Veredicto

El proyecto está bien encaminado. Ya tiene más documentación y estructura que la mayoría de POCs personales.

El riesgo principal ahora no es falta de planificación, sino exceso de preparación sin implementación. Después de aplicar estas mejoras, el siguiente paso debe ser crear el primer flujo funcional.
