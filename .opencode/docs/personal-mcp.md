# MCP personal reutilizable

## Propósito

`tools/personal-mcp/` es una base local para ofrecer a los agentes conocimiento
curado de cada proyecto sin abrir escritura, shell o red. Usa transporte stdio,
el SDK oficial estable y un perfil JSON intercambiable.

## Capacidades

| Herramienta | Función | Efecto |
|---|---|---|
| `personal_project_context` | Propósito e instrucciones curadas | Solo lectura de configuración |
| `personal_list_project_files` | Archivos que pasan allowlist y denylist | Solo metadatos |
| `personal_read_project_file` | Contenido textual limitado | Solo lectura |
| `personal_search_project_text` | Búsqueda literal limitada | Solo lectura |

OpenCode antepone automáticamente `personal_` al nombre registrado por el
servidor.

## Fronteras de seguridad

- `PERSONAL_MCP_ROOT` fija la única raíz válida.
- Las rutas deben coincidir con `allowedPaths` y no con `deniedPatterns`.
- Se resuelven rutas reales para impedir escape mediante `..` o symlinks.
- Se rechazan archivos binarios, extensiones no autorizadas y archivos grandes.
- Listado y búsqueda tienen límites de resultados.
- No existen herramientas de escritura, ejecución de comandos o red.
- El MCP empieza deshabilitado y `personal_*` está denegado globalmente.

Estas defensas reducen superficie, pero el perfil sigue siendo una decisión de
confianza. No autorices rutas amplias como `**` sin denylist y revisión.

## Adaptación por proyecto

1. Copiar:

   ```powershell
   Copy-Item tools/personal-mcp/config/project.example.json `
     tools/personal-mcp/config/project.local.json
   ```

2. Ajustar:

   - `projectName` y `purpose`;
   - instrucciones estables del proyecto;
   - rutas mínimas en `allowedPaths`;
   - secretos y runtimes internos en `deniedPatterns`;
   - extensiones y límites.

3. Cambiar `PERSONAL_MCP_CONFIG` en una configuración local fusionada.
4. Ejecutar:

   ```powershell
   cd tools/personal-mcp
   npm ci
   npm run check
   npm run smoke
   ```

5. Habilitar el MCP y autorizar `personal_*` únicamente para los agentes que lo
   necesiten.

## Evolución

Antes de añadir una nueva herramienta:

1. demostrar que el perfil y las cuatro herramientas actuales no bastan;
2. definir entradas, salida, actores y escenario de abuso;
3. preferir solo lectura;
4. validar esquema y límites;
5. añadir caso permitido, denegado y de escape de ruta al smoke test;
6. pasar Builder → Reviewer → Security;
7. documentar compatibilidad y datos que pueden salir.

Una futura conexión HTTP debe diseñarse como componente separado con
autenticación, autorización, TLS, validación de Host/origen y rate limiting. El
servidor actual no debe exponerse directamente a red.
