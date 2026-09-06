# Personal Project MCP

Servidor MCP local, de solo lectura y adaptable mediante configuración. Expone
contexto curado, listado, lectura y búsqueda sobre rutas explícitamente
autorizadas.

## Preparación

```powershell
cd tools/personal-mcp
npm install
npm run check
npm run smoke
```

## Adaptación a otro proyecto

1. Copiar `config/project.example.json` como `config/project.local.json`.
2. Definir propósito, instrucciones, `allowedPaths` y `deniedPatterns`.
3. Mantener límites pequeños y evitar secretos, bases locales y `.git`.
4. Apuntar `PERSONAL_MCP_ROOT` a la raíz del proyecto.
5. Apuntar `PERSONAL_MCP_CONFIG` al perfil local.
6. Habilitar el servidor y su permiso solo después del smoke test.

La configuración local está ignorada por Git. El servidor no ejecuta comandos,
no escribe archivos y no realiza solicitudes de red.

## Extensión

Agregar una herramienta únicamente cuando no pueda expresarse mediante el
perfil. Toda extensión debe:

- validar entrada con un esquema;
- empezar como solo lectura;
- resolver rutas dentro de `PERSONAL_MCP_ROOT`;
- limitar tamaño y cantidad de salida;
- devolver errores redactados;
- incorporar un caso permitido y uno denegado al smoke test.
