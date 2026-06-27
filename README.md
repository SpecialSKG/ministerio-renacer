# Mejoras OpenCode — Ministerio Renacer

Este paquete contiene archivos sugeridos para fortalecer el proyecto `ministerio-renacer` tomando como referencia la estructura observada en los proyectos externos `deluge` y `angular-docs`.

## Qué incluye

- `docs/04-guia-agentes-skills-mcps.md`
- `docs/11-mejoras-desde-referencias-externas.md`
- `docs/agente-ia/contrato-generacion-poc.md`
- `docs/agente-ia/reglas-inquebrantables.md`
- `docs/agente-ia/checklist-auditoria-poc.md`
- `.opencode/agents/ministerio-planner.md`
- `.opencode/agents/ministerio-builder.md`
- `.opencode/agents/ministerio-reviewer.md`
- `.opencode/agents/ministerio-docs.md`
- `.opencode/skills/` con versiones corregidas de las skills propias.

## Uso recomendado

Copia el contenido del ZIP en la raíz del proyecto.

Antes de copiar, haz commit del estado actual:

```bash
git status
git add .
git commit -m "chore: respaldo antes de integrar mejoras opencode"
```

Luego copia estos archivos y revisa cambios con:

```bash
git diff
```

## Nota

Las skills corregidas eliminan texto residual de PowerShell que quedó dentro de algunos `SKILL.md`.
