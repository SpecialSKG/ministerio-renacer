---
name: special-context7-docs
description: Consulta documentación versionada con Context7 usando mínimo contexto, fuentes identificables y sin exponer información sensible.
compatibility: opencode
---

# Skill: Context7 Docs

## Activar cuando

- Una librería, SDK, API, configuración o migración puede haber cambiado.

## No activar cuando

- La respuesta depende del código o negocio local, o Context7 está deshabilitado.

## Entradas

- Tecnología, versión local y pregunta técnica concreta.

## Procedimiento

1. Detectar versión desde manifiestos reales.
2. Resolver el ID oficial de la librería.
3. Consultar solo el tema necesario.
4. Registrar fuente, versión, fecha y límites.
5. Separar hechos documentados de inferencias.

## Límites

- No enviar secretos, archivos completos, datos personales ni lógica privada.
- No sustituir fuentes locales de verdad.

## Bloqueo

Si Context7 está apagado, usar documentación oficial disponible o reportar la
habilitación requerida; no modificar la configuración por cuenta propia.

## Salida

Estado, librería/API, versión, fuente, fecha, hallazgos, límites y recomendación.
