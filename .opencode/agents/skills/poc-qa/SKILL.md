---
name: poc-qa
description: Audita la POC del Ministerio Renacer antes de marcar tareas como terminadas. Revisa alcance, HTML, CSS, JS, JSON, navegación, accesibilidad básica y experiencia móvil.
compatibility: opencode
---

# Skill: POC QA

## Propósito

Esta skill sirve para revisar la POC antes de considerar una tarea como terminada.

Debe usarse para auditar:

- Alcance.
- Código.
- Datos JSON.
- Navegación.
- Experiencia móvil.
- Accesibilidad básica.
- Errores de consola.
- Compatibilidad con hosting estático.

## Documentos que debe consultar

1. `docs/agente-ia/checklist-auditoria-poc.md`
2. `docs/06-trd-requerimientos-tecnicos.md`
3. `docs/07-brief-diseno-ui-ux.md`
4. `docs/08-app-flow.md`
5. `docs/10-plan-implementacion.md`

## Regla principal

La revisión debe ser directa.

No marques algo como listo si:

- rompe el alcance de la POC;
- requiere backend sin necesidad;
- usa framework no autorizado;
- falla en móvil;
- no carga JSON;
- rompe navegación;
- tiene errores de consola;
- no tiene estados de error mínimos.

## Niveles de severidad

### Crítico

Bloquea la POC.

Ejemplos:

- La web no carga.
- Los JSON no cargan.
- La navegación principal no funciona.
- Hay errores de consola que impiden uso.
- Se introdujo backend/framework sin autorización.

### Alto

Debe corregirse antes de publicar.

Ejemplos:

- El detalle de evento falla.
- El repertorio no resuelve cantos.
- La vista móvil es difícil de usar.
- El buscador no funciona.
- Hay IDs rotos.

### Medio

Puede corregirse antes o justo después de publicar.

Ejemplos:

- Espaciado mejorable.
- Texto poco claro.
- Falta algún estado vacío.
- Falta microcopy.

### Bajo

Mejora deseable.

Ejemplos:

- Pulido visual.
- Mejoras menores de SEO.
- Mejora de orden en documentación.

## Checklist de alcance

- [ ] No se agregó backend.
- [ ] No se agregó login.
- [ ] No se agregó framework.
- [ ] No se agregó Supabase/Firebase.
- [ ] No se agregó PDF.
- [ ] No se agregó transposición.
- [ ] No se instalaron dependencias innecesarias.
- [ ] La solución funciona como sitio estático.

## Checklist funcional

- [ ] Landing visible.
- [ ] Lista de eventos visible.
- [ ] Detalle de evento visible.
- [ ] Lista de cantos visible.
- [ ] Detalle de canto visible.
- [ ] Repertorio visible dentro del evento.
- [ ] Buscador de cantos funciona.
- [ ] Botones de volver funcionan.
- [ ] Estados vacíos funcionan.
- [ ] Estados de error son entendibles.

## Checklist técnico

- [ ] No hay errores de consola en flujo normal.
- [ ] `events.json` carga.
- [ ] `songs.json` carga.
- [ ] `repertoires.json` carga.
- [ ] IDs relacionados existen.
- [ ] Fechas y horas tienen formato correcto.
- [ ] Rutas relativas funcionan.
- [ ] Funciona con servidor local.

## Checklist UX / accesibilidad

- [ ] Mobile-first.
- [ ] No hay scroll horizontal.
- [ ] Texto legible.
- [ ] Botones fáciles de tocar.
- [ ] Foco visible.
- [ ] Buen contraste.
- [ ] Imágenes con `alt`.
- [ ] Encabezados ordenados.
- [ ] Enlaces y botones tienen textos claros.
- [ ] No depende solo del color.

## Uso de Playwright MCP

Si Playwright MCP está disponible, usarlo para:

- Abrir `http://localhost:8080`.
- Revisar carga inicial.
- Navegar a eventos.
- Abrir evento.
- Abrir canto desde repertorio.
- Probar buscador.
- Revisar consola.
- Probar viewport móvil.

## Salida recomendada

```md
## Veredicto

Listo / Condicional / No listo

## Diagnóstico general

...

## Hallazgos

### Críticos

- ...

### Altos

- ...

### Medios

- ...

### Bajos

- ...

## Evidencia

...

## Recomendaciones

...

## Checklist final

- [ ] ...
```

## Criterio final

Solo responder `Listo` cuando el flujo principal funcione:

```txt
Inicio → Eventos → Detalle de evento → Repertorio → Detalle de canto
```
