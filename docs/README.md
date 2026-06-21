# Skills y guía — Ministerio Renacer v2

Este paquete contiene versiones reforzadas de las 4 skills propias del proyecto y una nueva guía de organización.

## Archivos incluidos

```txt
.opencode/agents/skills/poc-planner/SKILL.md
.opencode/agents/skills/static-frontend/SKILL.md
.opencode/agents/skills/json-content/SKILL.md
.opencode/agents/skills/poc-qa/SKILL.md
docs/04-guia-agentes-skills-mcps.md
```

## Concepto

- `.agents/skills/` queda para skills externas instaladas desde terminal.
- `.opencode/agents/skills/` queda para skills propias del proyecto.
- Las skills propias tienen prioridad sobre las externas.

## Integración recomendada

1. Haz commit del estado actual.
2. Copia este paquete en la raíz del proyecto.
3. Revisa cambios con `git diff`.
4. Prueba OpenCode con una tarea pequeña.

## Comando recomendado antes de copiar

```bash
git status
git add .
git commit -m "chore: respaldo antes de actualizar skills propias"
```
