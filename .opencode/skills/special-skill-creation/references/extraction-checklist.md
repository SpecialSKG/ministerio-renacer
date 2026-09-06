# Lista de extracción

Usar únicamente los apartados relacionados con la skill solicitada.

## Evidencia mínima

- Dos o más ejemplos consistentes, o una fuente normativa explícita.
- Archivos y rutas que demuestran el patrón.
- Comandos reales de verificación.
- Excepciones conocidas y deuda que no debe replicarse.

## Aspectos observables

| Área | Preguntas |
|---|---|
| Arquitectura | ¿Qué responsabilidades y fronteras se repiten? |
| Datos | ¿Cómo se validan, transforman y protegen? |
| Nombres | ¿Qué convenciones son consistentes y cuáles accidentales? |
| Errores | ¿Cómo se clasifican, propagan y presentan? |
| Pruebas | ¿Qué comportamiento se verifica y con qué alcance? |
| Seguridad | ¿Qué entradas no son confiables y qué acciones requieren aprobación? |
| Compatibilidad | ¿Qué depende de runtime, framework, protocolo o versión? |

## Clasificación

Para cada hallazgo registrar:

- `portable`: patrón estable que puede convertirse en instrucción;
- `versionado`: requiere referencia o condición de compatibilidad;
- `dominio`: pertenece al perfil o a una skill de negocio separada;
- `accidental`: no debe propagarse;
- `incierto`: necesita confirmación humana.

## Señales de sobreajuste

- Ejemplos con nombres reales del negocio.
- Rutas o comandos que solo existen en un repositorio.
- Reglas derivadas de un único archivo sin fuente normativa.
- Prescripción de capas que no participan en la tarea.
- Prohibiciones de versiones que impiden documentar compatibilidad real.
