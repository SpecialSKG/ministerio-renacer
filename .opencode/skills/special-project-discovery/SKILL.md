---
name: special-project-discovery
description: Detecta tipo de proyecto, stack real, estructura, comandos, restricciones y riesgos sin confundir el runtime interno de OpenCode con el producto.
compatibility: opencode
---

# Skill: Project Discovery

## Activar cuando

- El proyecto es desconocido, reutilizable o tiene el perfil sin configurar.
- Hay que diagnosticar, planificar o verificar convenciones antes de editar.

## No activar cuando

- El contexto ya está verificado y la tarea es una respuesta simple.

## Entradas

- Objetivo, raíz del worktree y perfil existente.

## Procedimiento

1. Leer `AGENTS.md`, perfil, README, contribución y documentación relevante.
2. Buscar manifiestos, código, pruebas, scripts y configuración.
3. Excluir de la inferencia de stack:
   - `.opencode/node_modules/**`;
   - `.opencode/package.json` y locks generados por OpenCode;
   - `node_modules`, vendor, builds, cachés y entornos virtuales.
4. Distinguir stack productivo de herramientas auxiliares.
5. Extraer comandos reales; no inventarlos.
6. Identificar restricciones, fuentes de verdad y skills de dominio.
7. Recomendar una plantilla de perfil solo cuando las señales sean suficientes.

## Límites

- No modificar archivos.
- No asumir web, Node, Python o framework por la solicitud del usuario.
- No tratar una dependencia de herramientas como stack del producto.

## Bloqueo

Si hay dos stacks plausibles sin evidencia suficiente, declarar la ambigüedad y
pedir solo la decisión que cambie el plan.

## Salida

```md
## Estado
COMPLETE | PARTIAL | BLOCKED

## Contexto detectado
- Tipo, stack, gestor, comandos y carpetas clave

## Evidencia
- ...

## Riesgos y supuestos
- ...

## Perfil sugerido y acción siguiente
- ...
```
