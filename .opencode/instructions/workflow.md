# Flujo general de trabajo

## Ciclo recomendado

```txt
Comprender → Descubrir → Planificar si hace falta → Implementar → Verificar
→ Revisar → Auditar seguridad si aplica → Documentar
```

## 1. Comprender

- Resume el objetivo en una o dos líneas.
- Identifica si el usuario pide explicación, diagnóstico, planificación, implementación, revisión o documentación.
- Si falta información crítica, pregunta. Si la tarea puede avanzar con una suposición segura, declara la suposición.
- Responde directamente las preguntas simples; no delegues por costumbre.

## 2. Descubrir proyecto

Antes de editar:

- Revisa estructura de carpetas.
- Detecta stack por archivos manifiesto.
- Lee documentación relevante.
- Identifica comandos existentes.
- Identifica restricciones del perfil del proyecto.

## 3. Planificar

Para cambios medianos o grandes:

- Divide en pasos pequeños.
- Lista archivos probables.
- Define criterios de aceptación.
- Señala riesgos.
- Evita scope creep.

Si la decisión depende de otra especialidad, devuelve un `handoff_request` al
Orchestrator. No invoques directamente a otro agente.

## 4. Implementar

- Haz cambios mínimos y coherentes con el estilo existente.
- No mezcles refactor grande con feature pequeña.
- No agregues dependencias si no son necesarias.
- Mantén nombres y estructura del proyecto.

## 5. Verificar

- Ejecuta pruebas existentes si son seguras y disponibles.
- Si no hay pruebas, usa verificación razonable: lint, build, revisión estática, carga en navegador, o validación de datos.
- Si no puedes probar, dilo.

## 6. Auditar

- Revisa diffs reales, no solo el plan.
- Busca errores, regresiones, seguridad, accesibilidad, rendimiento y mantenibilidad.
- Clasifica hallazgos por severidad.

Todo cambio de archivos recibe review independiente. Si el cambio toca
autenticación, secretos, permisos, dependencias, MCP, red, entrada no confiable
o datos sensibles, agrega auditoría de `base-security`.

Un rechazo puede volver al builder como máximo dos veces. Después, entrega
estado `BLOCKED` con evidencia y alternativas.

Un agente escritor invocado directamente devuelve `PARTIAL — pendiente de
review` después de modificar archivos. Solo Orchestrator cierra el resultado
integral una vez resueltas las revisiones aplicables.

## 7. Documentar

Documenta solo si aporta valor:

- Decisiones técnicas.
- Nuevos comandos.
- Cambios de arquitectura.
- Guías de uso.
- Limitaciones conocidas.

## Estado de salida

Todo agente devuelve `COMPLETE`, `PARTIAL` o `BLOCKED`, junto con evidencia,
verificación, riesgos y acción siguiente. Los schemas compartidos de delegación,
handoff y resultado viven en `agent-contracts.md`.
