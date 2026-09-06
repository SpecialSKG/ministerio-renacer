# Checklist de revisión

Revisar el diff real contra objetivo y aceptación; no certificar un plan.

- [ ] Alcance autorizado cubierto sin cambios funcionales silenciosos.
- [ ] Regresiones introducidas separadas de deuda previa.
- [ ] Patrones/componentes existentes reutilizados antes de crear otros.
- [ ] Semántica, teclado, foco, estados y errores preservados.
- [ ] Compatibilidad web/email y responsive no degradados.
- [ ] Datos no confiables, sinks DOM, secretos y dependencias revisados.
- [ ] Tests prueban comportamiento y no fueron silenciados.
- [ ] Rendimiento/SEO evaluados solo cuando el diff o contexto los hace relevantes.
- [ ] Validaciones reportadas coinciden con comandos realmente ejecutados.
- [ ] Hallazgos citan evidencia y severidad proporcional.

Veredicto: `APPROVED`, `APPROVED_WITH_NOTES` o `CHANGES_REQUESTED`, seguido de
hallazgos ordenados por severidad, verificaciones y riesgo residual.
