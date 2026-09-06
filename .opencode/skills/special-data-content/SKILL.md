---
name: special-data-content
description: Valida JSON, YAML, CSV y Markdown estructurado, incluyendo formato, esquemas, relaciones, privacidad y evidencia de verificación.
compatibility: opencode
---

# Skill: Data Content

## Activar cuando

- Se crean o modifican JSON, YAML, CSV o Markdown estructurado.

## No activar cuando

- El archivo es prosa sin estructura o relaciones de datos.

## Entradas

- Archivos, esquema o convenciones, relaciones y restricciones de privacidad.

## Procedimiento

1. Validar sintaxis y codificación.
2. Preservar campos, encabezados y orden cuando sean contrato.
3. Verificar IDs, referencias, fechas y valores permitidos.
4. Revisar datos personales, secretos y ejemplos inventados.
5. Ejecutar el parser o validador disponible y registrar el comando.

## Límites

- No inventar datos reales ni cambiar esquemas sin solicitud.
- No incluir secretos o PII sin autorización.

## Bloqueo

Si falta el esquema o hay relaciones ambiguas, preservar la forma existente y
declarar la incertidumbre.

## Salida

Estado, archivos, validaciones, relaciones comprobadas, fallos y acción siguiente.
