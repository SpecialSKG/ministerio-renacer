---
name: special-skill-creation
description: "Analiza, crea o evoluciona Agent Skills a partir de patrones comprobados de un proyecto. Usar cuando se solicite convertir convenciones, arquitectura, procesos o conocimiento repetible en una skill portable para OpenCode, Codex u otro host compatible, o cuando deba auditarse y vitaminizarse una skill existente."
---

# Crear y evolucionar Agent Skills

Convertir evidencia del proyecto en instrucciones reutilizables sin copiar
accidentalmente su dominio, secretos o deuda técnica.

## Entradas

- Objetivo y ejemplos de solicitudes que deben activar la skill.
- Plataforma destino y ruta de descubrimiento.
- Proyecto o artefactos que contienen los patrones a extraer.
- Restricciones de seguridad, compatibilidad y validación.

Si falta la plataforma, inferirla desde la estructura existente y declarar el
supuesto antes de crear archivos.

## Procedimiento

1. Leer reglas, perfil y skills existentes antes de proponer nombre o ruta.
2. Reunir ejemplos positivos, negativos y limítrofes del disparador.
3. Inspeccionar solo las capas relacionadas con el objetivo; no convertir toda
   la arquitectura del proyecto en una skill.
4. Separar:
   - convenciones repetidas y verificadas;
   - decisiones específicas del dominio;
   - comportamiento dependiente de versión;
   - deuda o excepciones que no deben propagarse.
5. Diseñar el mínimo contenido reusable:
   - `SKILL.md` para activación y flujo esencial;
   - `references/` para detalle consultado bajo demanda;
   - `scripts/` para validaciones deterministas repetibles;
   - `assets/` solo para artefactos usados en la salida.
6. Elegir un nombre kebab-case menor de 64 caracteres y comprobar colisiones.
7. Escribir frontmatter con solo `name` y `description`. Incluir en
   `description` qué hace y cuándo debe activarse.
8. Redactar el cuerpo en forma imperativa, con entradas, procedimiento, límites,
   salida y bloqueo. Mantenerlo por debajo de 500 líneas.
9. Guardar la skill en la ruta canónica del host:
   - OpenCode del proyecto: `.opencode/skills/<nombre>/`;
   - Codex compartido: la ruta de skills configurada por el entorno;
   - otra plataforma: confirmar su mecanismo de descubrimiento.
10. Ejecutar `node scripts/validate-skill.mjs <ruta-skill>` desde esta skill o el
    validador oficial del host. Ejecutar además el validador del repositorio.
11. Evaluar la skill con la rúbrica y al menos un escenario representativo.
12. Registrar fuentes, supuestos, compatibilidad y cobertura faltante.

## Lecturas condicionales

- Leer [extraction-checklist.md](references/extraction-checklist.md) al extraer
  patrones desde un proyecto existente.
- Leer [quality-rubric.md](references/quality-rubric.md) antes del cierre o al
  auditar una skill existente.

## Límites

- No leer ni incorporar secretos, credenciales, datos personales o código
  privado innecesario.
- No convertir una única ocurrencia en convención sin declararla como supuesto.
- No copiar nombres de negocio, URLs internas o rutas accidentales a una skill
  portable.
- No ocultar dependencias de versión: aislarlas en compatibilidad o referencias
  y verificar la versión real.
- No instalar herramientas, sobrescribir skills ni modificar rutas globales sin
  autorización.
- No crear documentación auxiliar que no participe en la ejecución de la skill.

## Bloqueo

Devolver `BLOCKED` cuando no exista evidencia suficiente, la plataforma destino
sea indeterminable, haya una colisión no resoluble o validar requiera acceso no
autorizado. Indicar la evidencia o decisión mínima necesaria para continuar.

## Salida

```md
## Estado
COMPLETE | PARTIAL | BLOCKED

## Skill
- Nombre, ubicación, plataforma y disparadores

## Evidencia extraída
- Convenciones, exclusiones y decisiones de compatibilidad

## Recursos y cambios
- SKILL.md, referencias, scripts o assets

## Validación
- Comandos, escenarios, resultado y cobertura

## Riesgos y acción siguiente
- ...
```
