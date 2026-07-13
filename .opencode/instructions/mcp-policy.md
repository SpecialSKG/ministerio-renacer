# Política de uso de MCP — Ministerio Renacer

## Principio

Los MCP amplían las capacidades del agente. En esta POC solo usamos
Playwright MCP para testing visual. No agregues MCPs de backend,
base de datos, despliegue ni autenticación sin aprobación explícita.

## Playwright

Usa Playwright MCP para probar la interfaz web de la POC:

- Abrir `http://localhost:8080`
- Revisar errores de consola en flujo normal
- Probar navegación: Inicio → Eventos → Detalle de evento → Repertorio → Detalle de canto
- Validar viewport móvil (375px de ancho)
- Probar buscador de cantos
- Comprobar estados vacíos y de error

Antes de usarlo:

1. Levanta el servidor local: `python -m http.server 8080`
2. Confirma que la URL responde antes de lanzar Playwright
3. No automatices acciones destructivas ni envíes datos reales sensibles

## Context7 (no configurado aún)

Si en el futuro se agrega Context7 MCP, úsalo solo para:

- Consultar documentación actualizada de librerías/APIs/patrones CSS o JS
- Verificar versiones y sintaxis específicas

No uses Context7 para:

- Leer código privado del proyecto
- Consultar datos del ministerio
- Sustituir la revisión de archivos locales (`data/*.json`, `docs/`)

## Regla de mínimo contexto

Usa solo el MCP necesario para la tarea actual. No actives herramientas
externas por costumbre.
