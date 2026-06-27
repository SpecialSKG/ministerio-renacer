---
name: poc-planner
description: Planifica tareas para la POC estática del Ministerio Renacer. Úsala para dividir alcance, definir fases, evitar sobreingeniería y separar claramente POC de etapa moderna.
compatibility: opencode
---

# Skill: POC Planner

## Propósito

Esta skill ayuda a planificar tareas del proyecto **Ministerio Renacer** sin inflar el alcance.

Debe usarse cuando se necesite:

- Dividir una idea grande en pasos pequeños.
- Definir qué entra y qué no entra en la POC.
- Preparar una fase de implementación.
- Revisar si una solicitud pertenece a POC o etapa moderna.
- Crear criterios de aceptación antes de construir.

## Contexto del proyecto

El proyecto es una plataforma web para un ministerio de música de iglesia.

La etapa actual es una **prueba de concepto estática** usando:

- HTML.
- CSS.
- JavaScript puro.
- JSON.
- Markdown.
- Hosting estático gratuito.

La POC debe permitir consultar:

- Información básica del ministerio.
- Próximos eventos.
- Detalle de evento.
- Cantos.
- Detalle de canto.
- Repertorio básico asociado a eventos.

## Documentos que debe consultar

Cuando planifiques, prioriza estos documentos:

1. `docs/05-prd-requerimientos-producto.md`
2. `docs/10-plan-implementacion.md`
3. `docs/08-app-flow.md`
4. `docs/06-trd-requerimientos-tecnicos.md`
5. `docs/04-guia-agentes-skills-mcps.md`

Si hay conflicto entre documentos, reporta el conflicto antes de avanzar.

## Qué SÍ pertenece a la POC

- Landing pública.
- Lista de eventos.
- Detalle de evento.
- Lista de cantos.
- Detalle de canto.
- Repertorio básico desde JSON.
- Buscador simple de cantos.
- Diseño mobile-first.
- Accesibilidad básica.
- Pruebas con Playwright MCP.
- Despliegue en GitHub Pages o Cloudflare Pages.

## Qué NO pertenece a la POC

Estas funciones pertenecen a etapa moderna salvo instrucción explícita:

- Login.
- Roles.
- Backend.
- Supabase.
- Firebase.
- Base de datos.
- Panel de administración.
- Generación de PDF.
- Transposición automática.
- Notificaciones.
- Confirmación de asistencia.
- App móvil.
- Frameworks como React, Angular, Vue o Next.js.
- Build step obligatorio.
- Dependencias npm innecesarias.

Frase obligatoria cuando algo esté fuera de alcance:

> Esto pertenece a la etapa moderna, no a la POC estática.

## Flujo recomendado

Cuando recibas una tarea:

1. Identifica el objetivo.
2. Clasifica si pertenece a POC o etapa moderna.
3. Define archivos afectados.
4. Divide en pasos pequeños.
5. Define criterios de aceptación.
6. Señala riesgos.
7. Propón el siguiente paso.

## Salida recomendada

```md
## Objetivo

...

## Clasificación

POC / Etapa moderna / Mixto

## Alcance

### Incluye

...

### No incluye

...

## Archivos afectados

...

## Plan de trabajo

1. ...
2. ...
3. ...

## Criterios de aceptación

- [ ] ...
- [ ] ...

## Riesgos

...

## Siguiente paso recomendado

...
```

## Reglas de calidad

- No proponer más de una fase grande a la vez.
- No convertir una tarea pequeña en arquitectura completa.
- No recomendar backend si JSON estático resuelve la etapa actual.
- No instalar dependencias sin justificación.
- No ignorar documentación existente.
- No inventar datos reales del ministerio.
