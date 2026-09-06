---
description: Ayuda a completar o actualizar el perfil del proyecto.
agent: base-orchestrator
---

Coordina la revisión del proyecto y delega la actualización del perfil a
`base-docs`, seguida de `base-reviewer`. Ignora el runtime interno de
`.opencode/`, usa solo hechos verificables, deja desconocidos como pendientes y
cambia `status` a `configured` únicamente cuando el perfil sea utilizable. No
modifiques código productivo.

Contexto adicional:

$ARGUMENTS
