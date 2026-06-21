# Reglas inquebrantables para agentes — Ministerio Renacer

Estas reglas aplican cuando un agente trabaje en la POC del proyecto.

## Alcance

- No usar frameworks en la etapa 1.
- No agregar backend en la etapa 1.
- No agregar Supabase en la etapa 1.
- No agregar login en la etapa 1.
- No agregar PDF en la etapa 1.
- No agregar transposición en la etapa 1.
- No instalar dependencias sin justificarlo.

## Código

- Usar HTML semántico.
- Usar CSS mobile-first.
- Usar JavaScript puro.
- Cargar datos desde `data/*.json`.
- Mantener rutas compatibles con hosting estático.
- Evitar lógica innecesariamente compleja.

## Datos

- No inventar eventos reales.
- No inventar datos personales.
- No publicar teléfonos, correos o direcciones personales sin autorización.
- Usar IDs únicos.
- Validar JSON antes de marcar listo.
- Fechas en `YYYY-MM-DD`.
- Horas en `HH:mm`.

## Documentación

- Actualizar docs solo si aporta contexto real.
- No duplicar documentos.
- No crear archivos largos si una nota corta basta.
- Mantener `docs/README.md` como índice principal.

## Seguridad

- No incluir credenciales.
- No incluir tokens.
- No exponer información privada del ministerio.
- No incluir `.git/` en ZIPs compartidos.

## Frase obligatoria cuando se proponga algo fuera del alcance

```txt
Esto pertenece a la etapa moderna, no a la POC estática.
```
