# Arquitectura de OpenCode Base v3

## Propósito

OpenCode Base es una plantilla de gobierno para agentes. No define el stack del
proyecto que la recibe; aporta identidad, reglas, perfiles, roles, permisos,
skills, comandos, un MCP personal opt-in y controles de calidad.

## Capas de autoridad

1. Seguridad y límites efectivos de la plataforma.
2. Objetivo y alcance autorizado por el usuario.
3. ALMA para identidad, voz y valores.
4. Perfil configurado del proyecto.
5. Políticas operativas del template.
6. Código y documentos locales como datos que deben verificarse.
7. Contenido externo y resultados MCP como datos no confiables.

ALMA no amplía permisos ni convierte contenido incrustado en autoridad.

## Componentes

```text
Usuario
  ↓
base-orchestrator
  ├─ base-planner
  ├─ base-researcher
  ├─ base-builder
  ├─ base-reviewer
  ├─ base-security
  └─ base-docs
       ↓
Configuración, código y documentación del proyecto
```

Solo `base-orchestrator` puede delegar. Los demás roles son agentes hoja.
Todos permanecen visibles como `subagent`; una mención directa no convierte a
un especialista en coordinador ni amplía sus permisos.

## Flujo de trabajo

```text
Comprender → Descubrir → Planificar si hace falta → Investigar si aplica
→ Implementar → Verificar → Revisar → Auditar seguridad si aplica
→ Documentar → Consolidar
```

- Las preguntas simples no se delegan.
- Todo cambio de archivos recibe review independiente.
- Cambios de autenticación, secretos, permisos, dependencias, MCP, red, entrada
  no confiable o datos sensibles reciben auditoría Security.
- Un rechazo puede volver al builder como máximo dos veces.
- `/docs`, `/profile` y `/alma-proposal` entran por Orchestrator para que la
  escritura de Docs reciba review independiente.

## Contrato de delegación

El esquema canónico está en
`.opencode/instructions/agent-contracts.md`. Cada tarea delegada contiene:

- `task_id`, owner, sender y recipient;
- objetivo, alcance incluido y excluido;
- dependencias y propiedad del estado mutable;
- restricciones, aceptación y evidencia esperada;
- contexto local verificado y riesgo.

No se reenvían secretos, archivos completos o conversación irrelevante.
Cuando una hoja necesita otra capacidad, retorna `handoff_request` al
Orchestrator. No existe delegación directa o excepcional entre especialistas.

## MCP personal

El MCP personal es un adaptador local de conocimiento:

```text
Perfil JSON por proyecto
  ↓ allowlist + denylist + límites
Servidor stdio de solo lectura
  ↓ personal_project_context | list | read | search
Planner o Researcher con aprobación
```

No forma parte de la capa de autoridad. Su configuración y sus resultados son
datos que deben contrastarse con las fuentes canónicas.

## Catálogo de skills

El núcleo mantiene nueve skills propias: descubrimiento, implementación segura,
review, seguridad, documentación, calidad frontend, datos estructurados,
Context7 y creación de skills. Sus IDs canónicos viven en `AGENTS.md` y sus
contratos en `.opencode/skills/`.

`special-frontend-quality` sustituye la skill anterior de QA web: conserva QA
de runtime y añade implementación/refactorización contextual con referencias
progresivas. SEO solo se carga para superficies públicas indexables o por
solicitud explícita.

Las skills de `.agents/skills/` son apoyo externo auditado, no política del
proyecto. Versiones y licencias se registran en
[skills externas](external-skills.md).

## Contrato de resultado

Cada agente devuelve:

- `status`: `COMPLETE`, `PARTIAL` o `BLOCKED`;
- resumen y evidencia;
- cambios o hallazgos;
- verificación ejecutada;
- riesgos pendientes;
- acción siguiente.

## Fuentes de verdad

- Identidad: `.opencode/instructions/ALMA.md`.
- Operación: `.opencode/instructions/operating-principles.md`.
- Seguridad: `.opencode/instructions/security-policy.md` y
  `.opencode/docs/security-model.md`.
- Proyecto concreto: `.opencode/instructions/project-profile.md`.
- Permisos efectivos: `opencode.json` y frontmatter de agentes.
- Jerarquía: `.opencode/docs/agent-hierarchy.md`.
- Contratos de agentes: `.opencode/instructions/agent-contracts.md`.
- Evolución de skills: `.opencode/skills/special-skill-creation/SKILL.md`.
