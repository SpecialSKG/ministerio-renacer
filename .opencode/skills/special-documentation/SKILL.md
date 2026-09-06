---
name: special-documentation
description: Crea documentación verificable y, cuando se autoriza, reportes de ejecución con estado, evidencia y reanudación.
compatibility: opencode
---

# Skill: Documentation

## Activar cuando

- Cambian arquitectura, comandos, integración, perfil o decisiones mantenibles.

## No activar cuando

- El cambio es trivial, temporal o ya está documentado canónicamente.

## Entradas

- Audiencia, hechos, decisiones, comandos verificados y ubicación canónica.

## Procedimiento

1. Distinguir estado actual, decisión, propuesta y pendiente.
2. Enlazar fuentes canónicas en vez de duplicarlas.
3. Incluir comandos solo si existen y fueron verificados.
4. Documentar límites, riesgos y cómo comprobar el comportamiento.
5. Revisar enlaces y coherencia con configuración real.

## Reportes de ejecución

Aplicar esta sección solo cuando el perfil o el usuario exija trazabilidad
persistente:

1. Crear `.opencode/reports/executions/YYYY-MM-DD-slug.md` únicamente con autorización.
2. Registrar cada paso como `COMPLETE`, `PARTIAL` o `BLOCKED`.
3. Registrar archivos, decisiones, desviaciones y pruebas reales sin secretos.
4. Agregar hashes solo cuando existan commits autorizados.
5. Dejar un punto de reanudación concreto cuando permanezca trabajo pendiente.

## Límites

- No inventar datos, comandos, resultados ni secretos.
- No presentar propuestas como implementadas.
- No exigir commits ni crear reportes fuera de `.opencode/reports/`.

## Bloqueo

Si un hecho no puede verificarse, marcarlo como pendiente o supuesto.

## Salida

Estado, documentos o ruta del reporte, motivo, evidencia, verificación y pendientes.
