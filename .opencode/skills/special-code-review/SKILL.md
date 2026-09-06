---
name: special-code-review
description: Revisa cambios reales con evidencia, distingue regresiones de deuda previa y clasifica correctitud, calidad y riesgo.
compatibility: opencode
---

# Skill: Code Review

## Activar cuando

- Hay diff, PR o configuración modificada que debe auditarse.

## No activar cuando

- Solo existe un plan sin cambios reales.

## Entradas

- Objetivo, aceptación, diff, archivos afectados y resultados de pruebas.

## Procedimiento

1. Revisar estado y diff reales.
2. Confirmar que el cambio resuelve el objetivo sin ampliar alcance.
3. Separar regresiones introducidas de deuda preexistente.
4. Evaluar correctitud, errores, compatibilidad, mantenibilidad y pruebas.
5. Revisar seguridad, accesibilidad y rendimiento cuando apliquen.
6. Citar evidencia concreta y clasificar severidad.

## Límites

- No corregir código.
- No aprobar basándose solo en intención o plan.
- No silenciar pruebas fallidas.

## Bloqueo

Si falta el diff o una prueba esencial no puede ejecutarse, emitir `PARTIAL` y
explicar el impacto sobre el veredicto.

## Salida

Estado, veredicto, hallazgos por severidad, evidencia, verificación, riesgos y
acción siguiente.
