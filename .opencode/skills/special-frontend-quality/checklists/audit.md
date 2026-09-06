# Checklist de auditoría

Una auditoría es de solo lectura salvo autorización posterior independiente.

## Cobertura contextual

- [ ] Tipo de proyecto, audiencia, indexabilidad y compatibilidad.
- [ ] Arquitectura y convenciones existentes.
- [ ] HTML/DOM, JavaScript, CSS y accesibilidad relevantes.
- [ ] Estados de interfaz, responsive, consola y network.
- [ ] Rendimiento solo con evidencia/medición apropiada.
- [ ] SEO solo si la superficie es pública indexable.
- [ ] Seguridad cliente y dependencias; escalación cuando corresponda.
- [ ] HTML email evaluado con reglas de clientes, no de página web.

## Formato de hallazgo

```text
[CRITICAL|HIGH|MEDIUM|LOW|INFO] Título
Categoría: REQUIRED | DEFAULT | AVOID | CONDITIONAL | AUDIT
Evidencia: archivo/línea/estado reproducible
Impacto: consecuencia observable
Recomendación: corrección mínima
Confianza: alta | media | baja
Cambio automático: no | requiere aprobación
```

Separar hechos, inferencias y recomendaciones. No inflar severidad por ausencia
de dark mode, `llms.txt`, canonical, schema, sourcemaps privados o múltiples H1
sin contexto.
