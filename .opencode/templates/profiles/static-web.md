# Perfil de proyecto: Web estática

Plantilla sugerida únicamente cuando el repositorio confirma HTML, CSS y
JavaScript sin framework.

## Identidad

- Tipo: web estática.
- Backend: no asumir; agregarlo solo por solicitud explícita.

## Comandos posibles

- Servidor local opcional, si Python está disponible:
  `python -m http.server 8080`.
- Build y gestor de paquetes: no aplican salvo configuración existente.
- Tests: revisión manual o Playwright cuando esté habilitado.

## Restricciones

- No agregar framework, bundler, backend, login, base de datos o pagos sin
  justificación y autorización.
- Mantener el formato de datos existente y validar JSON cuando aplique.

## QA mínimo

- Carga y navegación sin errores críticos.
- Consola limpia en el flujo principal.
- Vista móvil sin overflow inesperado.
- Foco visible, texto legible e imágenes con `alt` apropiado.
