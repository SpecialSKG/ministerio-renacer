# Changelog

Todos los cambios relevantes de OpenCode Base se documentan aquí.

## [Unreleased]

### Cambiado

- La documentación interna del template vive en `.opencode/docs/`; `docs/`
  queda reservado para la aplicación receptora.
- Las propuestas de ALMA y los reportes opt-in se generan bajo `.opencode/`
  para no mezclarse con documentación del producto.

## [3.1.0] - 2026-07-18

### Añadido

- Contrato compartido de delegación, handoff, ownership y terminalidad.
- Bundle versionable `docs/agent-evolution/` con auditoría, ADR, requisitos,
  planes, identidades, evaluaciones y trazabilidad.
- Validador del bundle y fixtures negativos para topología, permisos y routing.

### Cambiado

- Orchestrator permanece como único `primary`; los seis especialistas son
  `subagent` visibles.
- `/docs`, `/profile` y `/alma-proposal` ahora coordinan Docs y Reviewer desde
  Orchestrator.
- Los siete prompts tienen precondiciones, handoff, fallas, evidencia y
  definición de terminado específicas por rol.
- Docs permite `data-content` y `execution-report`.

### Seguridad

- Se elimina toda delegación directa o excepcional entre especialistas.
- Reviewer queda estrictamente en solo lectura.
- Builder y Docs invocados directamente no cierran cambios sin review.
- CI comprueba allowlist exacta, un único primary y rutas mutantes.

## [3.0.0] - 2026-07-16

### Añadido

- Agente independiente `base-security`.
- Comandos `/secure` y `/alma-proposal`.
- Principios operativos separados de ALMA.
- Validador estructural sin dependencias de aplicación.
- CI para Windows, Linux, OpenCode y Gitleaks.
- Arquitectura, modelo de seguridad, migración y compatibilidad.
- Skill `open-skill-creation` con referencias, rúbrica, validador y metadatos.
- MCP personal local, configurable y de solo lectura.
- Fixture sintético temporal para comprobar Gitleaks.

### Cambiado

- `/build` coordina Builder y Reviewer mediante Orchestrator.
- Solo Orchestrator puede delegar.
- Agentes y skills usan contratos uniformes de estado y evidencia.
- Project Discovery ignora el runtime interno de OpenCode.
- Reportes opt-in se estandarizan en `docs/reports/executions/`.
- Agentes reciben límites de pasos y recuperación `doom_loop`.
- OpenCode notifica actualizaciones y limita salidas/compactación.

### Seguridad

- Sharing y MCP quedan deshabilitados por defecto.
- Dependencias MCP usan versiones exactas.
- Lectura de secretos y edición de ALMA quedan denegadas.
- Gitleaks extiende las reglas oficiales.
- Herramientas desconocidas requieren aprobación.
- Playwright usa aislamiento, localhost y salida limitada.
- MCP declaran timeout; Context7 y MCP personal requieren aprobación por rol.

## [2.1.0] - 2026-07-16

### Corregido

- TOML inválido en `.gitleaks.toml`.
- YAML inválido en la skill `security-audit`.

## [2.0.0]

- Base generalizada de agentes, skills, comandos, perfiles y ALMA.
