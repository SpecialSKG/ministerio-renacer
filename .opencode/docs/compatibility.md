# Compatibilidad verificada

> Última revisión: 2026-09-06

| Componente | Versión fijada | Uso |
|---|---:|---|
| OpenCode (`opencode-ai`) | `1.17.20` | Smoke test bloqueante en CI |
| Node.js | `22` | Validador y CI |
| Playwright MCP | `0.0.78` | MCP local opt-in |
| Context7 MCP local | `3.2.3` | Ejemplo alternativo opt-in |
| Gitleaks Action | `2.3.9` / SHA fijado | Escaneo de historial |
| Gitleaks CLI | `8.30.1` / SHA-256 verificado | Fixture sintético en CI |
| MCP TypeScript SDK | `1.29.0` | MCP personal estable por stdio |
| Zod | `4.4.3` | Validación de entradas y salidas MCP |

## Política de actualización

- Las versiones operativas nunca usan etiquetas móviles.
- Dependabot propone cambios de GitHub Actions.
- Un job programado consulta la versión estable actual de OpenCode y ejecuta un
  smoke test no bloqueante.
- Toda actualización debe pasar validador, Gitleaks y carga de configuración.
- Si una versión rompe compatibilidad, documentar el límite antes de cambiar la
  versión bloqueante.

## Alcance de la verificación

- JSON y contratos internos: validador local.
- Configuración nativa: validada localmente con OpenCode `1.17.20` mediante
  `opencode debug config` y configurada también como job de CI. En el sandbox
  local se aislaron `XDG_CONFIG_HOME`, `XDG_DATA_HOME`, `XDG_CACHE_HOME` y
  `XDG_STATE_HOME` en el directorio temporal para evitar acceso a perfiles
  personales.
- `opencode.json` no lleva claves custom: el schema estricto de OpenCode
  `1.17.20` rechaza `mcpExceptions` como clave top-level. La marca de
  excepción MCP vive en `.opencode/policy/mcp-exceptions.json`, que opencode
  ignora por diseño y que `scripts/validate-template.mjs` lee como política.
- Windows y Linux: matriz del job estructural.
- Agentes: un primary, seis subagents, nueve comandos y permisos efectivos
  confirmados en la carga.
- Conducta LLM: fuera del alcance de esta verificación local hasta autorización
  explícita del proveedor externo.
- MCP: configuración validada; ningún servidor arranca por defecto.
- MCP personal: `npm run check` y `npm run smoke`, incluida denegación de `.env`.
