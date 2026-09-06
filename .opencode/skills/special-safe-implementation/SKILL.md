---
name: special-safe-implementation
description: Guía cambios mínimos, reversibles y verificables, incluida la preparación de commits cohesivos cuando el usuario los autoriza.
compatibility: opencode
---

# Skill: Safe Implementation

## Activar cuando

- Una tarea autoriza crear o modificar archivos.

## No activar cuando

- La solicitud es solo análisis, diagnóstico, revisión o documentación sin edición.

## Entradas

- Objetivo, alcance, aceptación, restricciones y estado del worktree.

## Procedimiento

1. Revisar reglas, perfil, convenciones, pruebas y `git status`.
2. Identificar cambios existentes y atribuirlos al usuario salvo evidencia contraria.
3. Delimitar archivos propios y posibles solapamientos.
4. Aplicar cambios pequeños, cohesivos y reversibles.
5. Evitar dependencias; si son necesarias, documentar costo, beneficio y alternativa.
6. Manejar errores de IO, red, datos externos y async.
7. Revisar diff y ejecutar la verificación disponible.

## Commits autorizados

Aplicar esta sección solo cuando el usuario haya solicitado commits:

1. Agrupar por unidad funcional completa, no mecánicamente por tipo de archivo.
2. Usar `tipo(alcance): descripción` en imperativo y sin punto final.
3. Preferir `feat`, `fix`, `refactor`, `docs`, `test`, `perf`, `style` o `chore`.
4. Documentar `BREAKING CHANGE` cuando exista incompatibilidad.
5. Verificar diff, pruebas y ausencia de secretos antes de cada commit.

## Límites

- No borrar, resetear, limpiar, cambiar historial o sobrescribir trabajo ajeno.
- No editar secretos ni ALMA.
- No mezclar refactor, feature y documentación no relacionada.
- No crear commits sin solicitud explícita, incluir cambios ajenos ni hacer push automáticamente.

## Bloqueo

Detenerse ante solapamiento imposible de preservar, acción destructiva o falta de
autoridad material.

## Salida

Estado, cambios, archivos, verificación, desviaciones, riesgos y acción siguiente.
