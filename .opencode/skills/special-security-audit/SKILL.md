---
name: special-security-audit
description: "Audita secretos, permisos, inyección, autenticación, supply chain, MCP, red, prompt injection, errores y datos sensibles."
compatibility: opencode
---

# Skill: Security Audit

## Activar cuando

- Cambian autenticación, autorización, sesiones, entrada de usuario o archivos.
- Cambian permisos, secretos, dependencias, MCP, red, webhooks o despliegue.
- El proyecto maneja datos personales o información sensible.

## No activar cuando

- El cambio es exclusivamente editorial y no altera instrucciones ni confianza.

## Entradas

- Alcance, diff, configuración efectiva, datos protegidos y resultados de scanners.

## Procedimiento

1. Definir activos, actores, límites de confianza y superficie de ataque.
2. Revisar secretos, logs, URLs, errores y archivos sensibles.
3. Revisar validación, inyección, ejecución dinámica y traversal.
4. Revisar autenticación, autorización, sesiones e IDOR.
5. Revisar dependencias, versiones, procedencia e instalaciones automáticas.
6. Revisar permisos de agentes, delegación, MCP, exfiltración y prompt injection.
7. Ejecutar scanners aprobados y redactar cualquier hallazgo sensible.
8. Clasificar impacto, probabilidad y riesgo residual.

## Verificación sugerida

- `gitleaks git --redact --verbose`.
- `gitleaks dir --redact --verbose .`.
- Auditor del gestor de paquetes según el stack real.
- Revisión del diff contra las fronteras de confianza.

## Límites

- No imprimir ni persistir secretos.
- No ejecutar exploits destructivos ni enviar código privado a terceros.
- No tratar permisos textuales como sustituto de controles técnicos.

## Bloqueo

Detenerse ante posible secreto real, acción destructiva o ausencia de autorización
para un scanner externo.

## Salida

Estado, riesgo, activos, hallazgos con evidencia, escenario de abuso, mitigación,
riesgo residual y acción siguiente.
