# Rendimiento frontend

## Baseline de implementación

Sin convertir cada tarea en una auditoría, evitar regresiones obvias:

- no enviar dependencias o JavaScript innecesarios;
- reservar dimensiones de imágenes y evitar lazy loading del probable LCP;
- evitar trabajo síncrono pesado, terceros o fuentes nuevas sin justificación;
- conservar code splitting, caching y estrategias existentes;
- revisar layout shift y estados de carga del cambio afectado.

## Activación completa

Aplicar el resto cuando existan requisitos, budgets, regresiones, volumen alto,
una solicitud de auditoría o evidencia de lentitud. Para optimización profunda,
combinar con `performance-optimization`.

## Método

1. Definir métrica, entorno y baseline.
2. Usar datos de campo cuando existan y laboratorio para diagnóstico.
3. Identificar el cuello real antes de cambiar arquitectura.
4. Aplicar la corrección más pequeña que afecte la causa.
5. Medir otra vez y comparar con el baseline.

## Señales

- HTML inicial, CSS crítico y recursos render-blocking.
- Tamaño transferido/parseado, código sin uso y librerías duplicadas.
- Imágenes, fuentes, terceros, hidratación y trabajo del main thread.
- LCP, INP y CLS en percentil 75 cuando el producto los mide.
- Requests rotos, cascadas, caching y latencia de APIs.

## Límites

- Los umbrales de Core Web Vitals son datos versionados: verificar la fuente
  oficial si una decisión depende de sus valores actuales.
- No fijar un presupuesto universal de JS/CSS; definirlo por producto y detectar
  regresiones.
- No perseguir un número de laboratorio sacrificando funcionalidad o accesibilidad.
- No ejecutar load tests contra producción ni enviar datos a servicios externos
  sin autorización.

## Salida

Baseline, método, evidencia, cuello identificado, cambio propuesto/realizado,
comparación posterior y limitaciones de la medición.

Fuente de actualización: [web.dev Web Vitals](https://web.dev/articles/vitals).
