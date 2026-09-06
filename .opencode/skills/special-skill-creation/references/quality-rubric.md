# Rúbrica de calidad

Puntuar cada criterio de 0 a 2:

- `0`: ausente o incorrecto;
- `1`: parcial o ambiguo;
- `2`: explícito y verificable.

| Criterio | Evidencia esperada |
|---|---|
| Activación | Casos positivos, negativos y limítrofes distinguibles |
| Alcance | Entradas, exclusiones y bloqueo definidos |
| Portabilidad | Sin dominio, secretos ni rutas accidentales |
| Compatibilidad | Dependencias versionadas aisladas y verificadas |
| Acción | Pasos ordenados con grado de libertad apropiado |
| Seguridad | Límites de confianza y acciones sensibles declarados |
| Contexto | `SKILL.md` conciso y detalle bajo demanda |
| Validación | Script o procedimiento reproducible |
| Salida | Estado, evidencia, riesgos y acción siguiente |
| Descubrimiento | Nombre, carpeta y metadatos coherentes |

## Decisión

- `18–20`: lista para integrar.
- `14–17`: integrar con observaciones documentadas.
- `<14`: revisar antes de publicar.

Un cero en activación, seguridad o validación impide aprobar aunque el total sea
superior.
