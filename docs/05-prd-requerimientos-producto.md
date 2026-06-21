# PRD — Documento de Requerimientos del Producto

## Proyecto

**Ministerio Renacer — Plataforma web para ministerio de música**

## Estado del documento

- Versión: 1.0
- Tipo: Producto
- Enfoque: Prueba de concepto estática + visión de evolución
- Tecnología objetivo de la primera etapa: HTML, CSS, JavaScript y JSON
- Plataforma objetivo inicial: GitHub Pages o Cloudflare Pages

---

## 1. Resumen del producto

El producto será una plataforma web pública y sencilla para centralizar la información operativa de un ministerio de música de iglesia.

La primera versión será una prueba de concepto estática, sin backend, sin login y sin base de datos. Su objetivo será validar si una web simple puede resolver mejor la organización del grupo que depender únicamente de WhatsApp, mensajes sueltos, archivos dispersos o recordatorios informales.

La plataforma permitirá consultar información básica del ministerio, próximos eventos, ensayos, detalles de cada actividad, biblioteca de cantos y repertorios vinculados a eventos. En una segunda etapa, el producto podrá evolucionar hacia una aplicación moderna con autenticación, roles administrativos, panel de edición, base de datos, generación de PDF y transposición de acordes.

---

## 2. Problema

Actualmente, la información del ministerio puede estar dispersa en múltiples canales:

- Grupos de WhatsApp.
- Mensajes temporales.
- Archivos enviados manualmente.
- Letras de cantos en sitios externos.
- Notas personales de miembros o coordinadores.
- Fechas comunicadas de forma informal.

Esto genera riesgos como:

- Miembros que olvidan ensayos o eventos.
- Confusión sobre hora de reunión, lugar o vestimenta.
- Repertorios enviados tarde o de forma desordenada.
- Dependencia de una sola persona para aclarar información.
- Dificultad para consultar cantos, letras y acordes desde el celular.
- Pérdida de historial sobre eventos y repertorios anteriores.
- Baja claridad para miembros adultos o menos familiarizados con apps nuevas.

---

## 3. Objetivo del producto

Crear una plataforma web simple, accesible y fácil de compartir que funcione como punto central de consulta para el ministerio de música.

El objetivo no es reemplazar WhatsApp desde el inicio, sino complementarlo. WhatsApp seguirá siendo el canal de distribución, pero la web será el lugar donde vive la información ordenada.

---

## 4. Objetivos específicos

### Etapa 1 — Prueba de concepto

- Publicar una web estática gratuita.
- Mostrar información básica del ministerio.
- Mostrar próximos eventos y ensayos.
- Mostrar detalle completo de un evento.
- Mostrar una biblioteca inicial de cantos.
- Permitir consultar letras y acordes sin login.
- Permitir que eventos y cantos se actualicen editando archivos JSON.
- Validar si los miembros consultan la web y la entienden desde celular.

### Etapa 2 — Versión moderna

- Incorporar autenticación solo para administradores y editores.
- Agregar panel de administración.
- Migrar datos a base de datos.
- Crear y editar eventos desde navegador.
- Crear y editar cantos desde navegador.
- Construir repertorios dinámicos.
- Generar PDF de repertorios.
- Agregar transposición de acordes.
- Integrar enlaces para Google Calendar, Google Maps y WhatsApp.

---

## 5. Usuarios objetivo

### Visitante público

Persona que entra al sitio para conocer el ministerio o consultar información general. No necesita cuenta.

Puede ver:

- Landing page.
- Información del ministerio.
- Próximos eventos públicos.
- Cantos publicados.
- Repertorios publicados.

### Miembro del ministerio

Persona que participa en ensayos, misas, rosarios, vigilias, retiros u otros eventos.

Necesita consultar:

- Fecha del evento.
- Hora de inicio.
- Hora de reunión.
- Lugar.
- Vestimenta.
- Tipo de acompañamiento musical.
- Repertorio.
- Letras y acordes.

No debe necesitar login para consultar.

### Administrador / editor futuro

Persona autorizada para modificar contenido.

En la POC no tendrá panel web. Editará archivos JSON manualmente.

En la etapa moderna podrá:

- Crear eventos.
- Editar eventos.
- Publicar o despublicar eventos.
- Crear cantos.
- Editar letras y acordes.
- Asociar cantos a eventos.
- Crear repertorios.
- Generar PDF.

---

## 6. Principios del producto

### 6.1 Consulta sin fricción

La mayoría de usuarios solo necesita consultar información. Por eso, las funciones públicas no deben requerir login.

### 6.2 Mobile-first

El uso principal será desde celular. La interfaz debe priorizar lectura rápida, botones claros, listas limpias y navegación sencilla.

### 6.3 Simplicidad inicial

La primera versión debe evitar backend, login, roles, PDF y transposición. El objetivo es validar utilidad, no construir la plataforma definitiva.

### 6.4 Crecimiento por fases

El producto debe poder evolucionar sin reescribirse completamente. La POC debe organizar sus datos de manera que luego puedan migrarse a una base de datos.

### 6.5 Contenido claro antes que estética compleja

El diseño debe ser ordenado y visualmente agradable, pero la prioridad es que el miembro encuentre la información rápido.

---

## 7. Alcance funcional de la POC

### Incluido

- Landing page.
- Sección de información básica del ministerio.
- Lista de eventos.
- Detalle de evento.
- Lista de cantos.
- Detalle de canto.
- Relación simple evento → repertorio → cantos.
- Datos en JSON.
- Navegación simple.
- Diseño responsive.
- Despliegue estático gratuito.
- Documentación de actualización manual.

### Excluido

- Login.
- Panel de administración.
- Base de datos.
- Backend.
- Roles de usuario.
- Generación de PDF.
- Transposición automática.
- Notificaciones automáticas.
- Confirmación de asistencia.
- Integración real con Google Calendar.
- App móvil.
- Comentarios.
- Gestión de archivos desde navegador.

---

## 8. Funcionalidades principales

## 8.1 Landing page

Debe presentar el ministerio de forma breve.

Debe incluir:

- Nombre del ministerio.
- Breve descripción.
- Propósito o misión.
- Accesos rápidos a eventos y cantos.
- Próximos eventos destacados.
- Contacto o referencia de comunicación.
- Footer básico.

Criterios de aceptación:

- Se carga correctamente en móvil y escritorio.
- Permite acceder rápido a eventos y cantos.
- No requiere login.
- Tiene texto claro y fácil de leer.

---

## 8.2 Lista de eventos

Debe mostrar los próximos eventos o ensayos ordenados por fecha.

Cada tarjeta de evento debe mostrar:

- Título.
- Tipo de evento.
- Fecha.
- Hora.
- Lugar.
- Botón o enlace para ver detalle.

Criterios de aceptación:

- Los eventos se cargan desde `data/events.json`.
- Los eventos pasados pueden ocultarse o mostrarse separados.
- La lista se puede leer cómodamente en celular.
- Si no hay eventos, se muestra un estado vacío claro.

---

## 8.3 Detalle de evento

Debe mostrar la información completa del evento.

Campos deseables:

- Título.
- Tipo de evento.
- Fecha.
- Hora de inicio.
- Hora de reunión.
- Lugar.
- Descripción.
- Vestimenta.
- Modalidad musical: acústico, eléctrico o mixto.
- Notas.
- Repertorio asociado.

Criterios de aceptación:

- El usuario puede entender cuándo, dónde y cómo asistir.
- El repertorio se muestra en orden.
- Cada canto del repertorio puede abrir su detalle.
- El diseño evita saturar visualmente la pantalla.

---

## 8.4 Biblioteca de cantos

Debe permitir consultar cantos cargados en JSON.

Cada canto debe tener:

- Título.
- Categoría.
- Tonalidad base.
- Letra.
- Acordes.
- Notas opcionales.

Criterios de aceptación:

- Los cantos se cargan desde `data/songs.json`.
- Se puede buscar por título.
- El detalle de canto se abre correctamente.
- La letra y acordes son legibles en celular.

---

## 8.5 Repertorio básico

En la POC, el repertorio será una relación simple entre evento y cantos.

Cada evento puede tener una lista de IDs de cantos o un `repertoireId`.

Criterios de aceptación:

- El evento muestra los cantos relacionados.
- El orden del repertorio es respetado.
- El usuario puede abrir cada canto.
- No se necesita un constructor visual todavía.

---

## 9. Requerimientos no funcionales

### Rendimiento

- Carga inicial ligera.
- Sin dependencias pesadas.
- JSON pequeño y fácil de leer.
- Imágenes optimizadas.

### Accesibilidad

- HTML semántico.
- Botones y enlaces claros.
- Buen contraste.
- Navegación por teclado razonable.
- Imágenes con texto alternativo.
- Tamaños de toque cómodos en móvil.

### Mantenibilidad

- Archivos organizados.
- Datos separados del código.
- README con instrucciones.
- Nombres de archivos simples.
- Código entendible.

### Compatibilidad

- Navegadores modernos.
- Android.
- iOS.
- Escritorio.
- Hosting estático.

### Seguridad

- No manejar credenciales en la POC.
- No almacenar datos privados.
- No publicar datos sensibles.
- No incluir `.git/` en archivos comprimidos compartidos.

---

## 10. Métricas de éxito

La POC será exitosa si:

- Está publicada en una URL accesible.
- Un miembro puede encontrar el próximo evento en menos de 45 segundos.
- Un miembro puede abrir el repertorio de un evento sin ayuda.
- Un miembro puede buscar y leer un canto desde el celular.
- La información puede actualizarse editando JSON.
- El sitio se comparte fácilmente por WhatsApp.
- El proyecto no requiere backend ni pago para funcionar.

---

## 11. Riesgos de producto

| Riesgo | Impacto | Mitigación |
|---|---:|---|
| Alcance demasiado grande | Alto | Congelar la POC y dejar funciones avanzadas para fase 2 |
| Baja adopción | Alto | Compartir por WhatsApp y evitar login |
| Datos desactualizados | Alto | Nombrar responsable de mantenimiento |
| Interfaz confusa | Medio | Probar con miembros reales |
| Cargar demasiados cantos al inicio | Medio | Empezar con biblioteca pequeña |
| Copiar contenido sin control | Medio | Cargar manualmente y revisar formato |
| Querer hacer backend antes de validar | Alto | Mantener JSON estático en etapa 1 |

---

## 12. Roadmap de producto

### Fase 0 — Preparación

- Documentación.
- Estructura de carpetas.
- Definición de datos.
- Configuración de OpenCode.
- Skills y MCPs.

### Fase 1 — POC estática

- Landing.
- Eventos.
- Detalle de evento.
- Cantos.
- Detalle de canto.
- Repertorio básico.
- Despliegue.

### Fase 2 — Validación

- Pruebas con usuarios.
- Ajustes de UI.
- Limpieza de contenido.
- Mejoras de accesibilidad.
- Documentación de mantenimiento.

### Fase 3 — Versión moderna

- Supabase o backend equivalente.
- Auth.
- Roles.
- Panel admin.
- CRUD de eventos y cantos.
- Repertorios dinámicos.

### Fase 4 — Funciones avanzadas

- PDF.
- Transposición.
- Google Calendar.
- Historial.
- Estadísticas.
- Mejoras de publicación.

---

## 13. Decisiones de producto actuales

- La POC será pública y sin login.
- La edición será manual vía JSON.
- La web será mobile-first.
- La documentación vivirá en `docs/`.
- Los datos vivirán en `data/`.
- Los archivos principales serán `index.html`, `assets/css/styles.css` y `assets/js/app.js`.
- El backend queda fuera del alcance inicial.
- La etapa moderna se planifica, pero no se construye todavía.

---

## 14. Próximo paso recomendado

Crear el esqueleto funcional mínimo:

- `index.html`
- `assets/css/styles.css`
- `assets/js/app.js`
- `data/events.json`
- `data/songs.json`
- `data/repertoires.json`
- `README.md`

Luego validar que el sitio pueda cargar datos desde JSON y mostrar eventos/cantos en una interfaz simple.
