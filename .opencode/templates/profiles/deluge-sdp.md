# Perfil de proyecto: Deluge / ServiceDesk Plus On-Premise

Usar solo cuando el repositorio confirme ServiceDesk Plus On-Premise y scripts
Deluge. Antes de completar el perfil, verificar las extensiones usadas por el
proyecto (`.dg`, `.siz` u otra); no asumirlas por esta plantilla.

## Identidad

- Tipo: automatización Deluge.
- Producto y build exactos: pendientes hasta verificación.
- Integración: API v3 mediante `invokeurl`, si los contratos locales lo confirman.

## Fuentes de verdad sugeridas

- Colección Postman local.
- `docs/api/`, `docs/deluge/`, `docs/examples/`, `docs/playbooks/` y
  `docs/troubleshooting/` cuando existan.
- Scripts reales del proyecto.

## Reglas críticas

- No inventar endpoints ni mezclar Cloud con On-Premise.
- Validar `response_status`, no solo HTTP 200.
- Confirmar si `response_status` es `Map` o `List`.
- No mezclar `parameters` y `body` en el mismo `invokeurl`.
- Acciones sensibles requieren `dry_run` o bandera `execute_* = false`.
- No hardcodear tokens, cookies o credenciales.

## Validación

- Crear una skill de dominio `sdp-deluge` con extensiones, build, contratos y
  validaciones verificadas para el proyecto concreto.
