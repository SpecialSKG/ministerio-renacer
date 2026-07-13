# Guía de paletas de color para sitio web  
## Ministerio de Alabanza Nuevo Renacer

Este documento reúne paletas de color recomendadas para construir un sitio web visualmente coherente con el logo del **Ministerio de Alabanza Nuevo Renacer**, incluyendo opciones institucionales, modernas, elegantes, juveniles y pastel.

La idea principal no es usar todos los colores del logo al mismo tiempo, sino construir una identidad visual más limpia a partir de ellos.

---

# 1. Principio general de identidad visual

El logo utiliza colores fuertes:

- Azul profundo
- Dorado / amarillo
- Verde
- Rojo
- Blanco
- Negro

Estos colores funcionan bien en el logo porque están contenidos dentro de una composición circular. Sin embargo, en un sitio web pueden verse pesados si todos se usan al mismo nivel.

## Recomendación principal

Para una web limpia, profesional y fiel al logo:

```text
Base principal: azul + blanco + gris claro
Acento principal: dorado
Acentos secundarios: verde y rojo
Texto: negro o gris oscuro
```

Esto permite que el sitio conserve identidad sin saturar visualmente.

---

# 2. Colores base derivados del logo

| Color | HEX aproximado | Uso recomendado |
|---|---:|---|
| Azul institucional | `#063E9B` | Menú, encabezados, botones principales, footer |
| Dorado principal | `#FAE109` | Acentos, títulos especiales, líneas, iconos |
| Verde secundario | `#06873D` | Estados positivos, secciones de comunidad, detalles |
| Rojo de alerta | `#E61D1E` | Fechas importantes, avisos, alertas, llamados de atención |
| Blanco | `#FFFFFF` | Fondo principal, tarjetas, espacios limpios |
| Gris claro | `#F5F7FA` | Fondo secundario, bloques suaves |
| Texto oscuro | `#111827` | Texto principal |
| Texto secundario | `#4B5563` | Descripciones, subtítulos, notas |

---

# 3. Paleta recomendada principal para sitio web

Esta es la paleta más recomendable para construir el sitio completo.

```text
Fondo principal:    #FFFFFF
Fondo secundario:   #F5F7FA
Color principal:    #063E9B
Color acento:       #FAE109
Texto principal:    #111827
Texto secundario:   #4B5563
Pastel de apoyo:    #EAF4FF
```

## Uso recomendado

| Elemento del sitio | Color sugerido |
|---|---:|
| Fondo general | `#FFFFFF` |
| Secciones alternas | `#F5F7FA` |
| Header / navegación | `#063E9B` |
| Botón principal | `#063E9B` |
| Botón secundario | `#FAE109` |
| Títulos principales | `#063E9B` o `#111827` |
| Texto de párrafo | `#111827` |
| Texto secundario | `#4B5563` |
| Tarjetas suaves | `#EAF4FF` |
| Detalles decorativos | `#FAE109` |

## CSS recomendado

```css
:root {
  --color-primary: #063E9B;
  --color-accent: #FAE109;

  --color-background: #FFFFFF;
  --color-surface: #F5F7FA;
  --color-soft: #EAF4FF;

  --color-text: #111827;
  --color-text-muted: #4B5563;

  --color-success: #06873D;
  --color-danger: #E61D1E;
}
```

## Explicación

Esta estructura permite que el sitio se vea moderno, legible y ordenado. El azul mantiene la identidad institucional, el dorado funciona como acento visual, y los fondos claros permiten que el contenido respire.

Es la opción más segura para una página web con secciones como:

- Inicio
- Historia del ministerio
- Horarios
- Eventos
- Galería
- Integrantes
- Contacto
- Publicaciones o avisos

---

# 4. Paleta institucional web

Ideal para una web formal y claramente conectada con el logo.

```text
Azul principal:     #063E9B
Dorado acento:      #FAE109
Blanco fondo:       #FFFFFF
Gris claro:         #F4F6FA
Texto oscuro:       #1A1A1A
```

## CSS

```css
:root {
  --color-primary: #063E9B;
  --color-accent: #FAE109;
  --color-background: #FFFFFF;
  --color-surface: #F4F6FA;
  --color-text: #1A1A1A;
}
```

## Dónde usarla

- Página de inicio
- Header
- Footer
- Botones principales
- Sección de misión y visión
- Comunicados oficiales

## Recomendación de diseño

Usar el azul en bloques sólidos, el blanco para lectura y el dorado solo para acentos.

Ejemplo:

```text
Header: azul
Texto del header: blanco
Botón principal: dorado con texto oscuro
Fondo general: blanco
Tarjetas: gris claro
```

---

# 5. Paleta moderna limpia

Buena para una web actual, ordenada y fácil de leer.

```text
Blanco:             #FFFFFF
Gris fondo:         #F5F7FA
Azul profesional:   #174EA6
Dorado acento:      #F2C94C
Texto oscuro:       #111827
```

## CSS

```css
:root {
  --color-primary: #174EA6;
  --color-accent: #F2C94C;
  --color-background: #FFFFFF;
  --color-surface: #F5F7FA;
  --color-text: #111827;
}
```

## Dónde usarla

- Sitio web principal
- Página de noticias
- Calendario de eventos
- Publicaciones informativas
- Galería ordenada

## Explicación

Es menos saturada que la paleta directamente extraída del logo. El azul se siente más digital y moderno, mientras que el dorado se mantiene como detalle de identidad.

Es buena si se quiere una página que se vea más profesional que decorativa.

---

# 6. Paleta elegante ministerial

Ideal para una estética más sobria, espiritual y ceremonial.

```text
Azul noche:         #031F4F
Dorado sobrio:      #C9A227
Marfil:             #F8F5E9
Gris profundo:      #202020
Verde oliva suave:  #6B7A3A
```

## CSS

```css
:root {
  --color-primary: #031F4F;
  --color-accent: #C9A227;
  --color-background: #F8F5E9;
  --color-surface: #FFFFFF;
  --color-text: #202020;
  --color-secondary: #6B7A3A;
}
```

## Dónde usarla

- Vigilias
- Adoración
- Secciones de oración
- Eventos solemnes
- Comunicados importantes
- Frases bíblicas
- Página de historia del ministerio

## Explicación

Esta paleta convierte los colores del logo en una versión más madura. El dorado pierde intensidad y se vuelve más elegante. El azul noche funciona muy bien para fondos profundos y secciones de alto impacto.

---

# 7. Paleta neutral con acento dorado

Muy buena para una web sobria donde el logo sea el elemento más colorido.

```text
Blanco hueso:       #FAF8F2
Gris claro:         #EFEDE7
Azul oscuro:        #102A43
Dorado:             #D6A928
Texto carbón:       #222222
```

## CSS

```css
:root {
  --color-primary: #102A43;
  --color-accent: #D6A928;
  --color-background: #FAF8F2;
  --color-surface: #EFEDE7;
  --color-text: #222222;
}
```

## Dónde usarla

- Sitios con estilo editorial
- Página de presentación
- Secciones de reflexión
- Blog o artículos
- Biografías
- Testimonios

## Explicación

Esta opción es muy recomendable si se busca una página tranquila, clara y con buen gusto. El logo destaca más porque el entorno visual no compite con él.

---

# 8. Paleta pastel celeste y dorado

Ideal para una web amable, espiritual, tranquila y moderna.

```text
Celeste muy claro:  #EAF4FF
Azul suave:         #7BAFE8
Dorado suave:       #F6D86B
Blanco cálido:      #FFFDF7
Texto azul oscuro:  #18324A
```

## CSS

```css
:root {
  --color-primary: #7BAFE8;
  --color-accent: #F6D86B;
  --color-background: #FFFDF7;
  --color-surface: #EAF4FF;
  --color-text: #18324A;
}
```

## Dónde usarla

- Bienvenida
- Cumpleaños
- Mensajes de felicitación
- Frases bíblicas
- Secciones de integrantes
- Tarjetas de contenido

## Explicación

Esta paleta es muy útil cuando se quiere suavizar la identidad del logo. Sigue relacionada con el azul y el dorado, pero de una manera más ligera.

Funciona bien para secciones humanas, cercanas y familiares.

---

# 9. Paleta pastel cálida

Buena para transmitir cercanía, comunidad y ambiente familiar.

```text
Crema claro:        #FFF6E8
Durazno pastel:     #FFD8B5
Amarillo suave:     #FFF0A8
Azul grisáceo:      #6D8EAD
Texto café oscuro:  #3A2A1A
```

## CSS

```css
:root {
  --color-primary: #6D8EAD;
  --color-accent: #FFD8B5;
  --color-background: #FFF6E8;
  --color-surface: #FFFFFF;
  --color-text: #3A2A1A;
}
```

## Dónde usarla

- Publicaciones de cumpleaños
- Secciones familiares
- Testimonios
- Mensajes comunitarios
- Tarjetas de agradecimiento
- Eventos internos

## Explicación

Esta paleta se siente más humana y menos institucional. Es adecuada cuando el objetivo es comunicar calidez, gratitud o celebración sin saturar la vista.

---

# 10. Paleta pastel verde y celeste

Buena para transmitir paz, servicio y comunidad.

```text
Verde menta claro:  #E3F7EC
Celeste suave:      #DCEEFF
Verde medio:        #6CBF84
Azul gris oscuro:   #31556F
Texto oscuro:       #1F2D2B
```

## CSS

```css
:root {
  --color-primary: #31556F;
  --color-accent: #6CBF84;
  --color-background: #F8FFFB;
  --color-surface: #E3F7EC;
  --color-text: #1F2D2B;
}
```

## Dónde usarla

- Página de misión
- Página de servicio
- Integrantes del ministerio
- Secciones de acompañamiento
- Invitaciones a participar
- Contenido reflexivo

## Explicación

El verde suavizado conecta con una idea de crecimiento, servicio y paz. Es una buena variante para no depender siempre del azul y dorado.

---

# 11. Paleta pastel lavanda y dorado

Variante más delicada, útil para secciones visualmente suaves.

```text
Lavanda claro:      #EFE7FF
Azul lavanda:       #A7B7E8
Dorado suave:       #F4D35E
Blanco cálido:      #FFFDF8
Texto violeta gris: #2F2A3D
```

## CSS

```css
:root {
  --color-primary: #A7B7E8;
  --color-accent: #F4D35E;
  --color-background: #FFFDF8;
  --color-surface: #EFE7FF;
  --color-text: #2F2A3D;
}
```

## Dónde usarla

- Tarjetas de oración
- Reflexiones
- Cumpleaños
- Mensajes especiales
- Publicaciones suaves

## Explicación

No sale directamente del logo, pero puede convivir bien si el dorado se mantiene como acento. Es una paleta más delicada y puede ayudar a variar el sitio sin romper la identidad general.

---

# 12. Paleta pastel coral y celeste

Variante alegre y moderna para publicaciones visuales.

```text
Coral pastel:       #FFD6D1
Celeste suave:      #DDF3FF
Amarillo crema:     #FFF2B8
Azul medio:         #4F7CAC
Texto gris oscuro:  #2A2A2A
```

## CSS

```css
:root {
  --color-primary: #4F7CAC;
  --color-accent: #FFD6D1;
  --color-background: #FFFFFF;
  --color-surface: #DDF3FF;
  --color-soft: #FFF2B8;
  --color-text: #2A2A2A;
}
```

## Dónde usarla

- Celebraciones
- Fechas especiales
- Cumpleaños
- Posts de redes conectados al sitio
- Secciones destacadas

## Explicación

Es más alegre que la paleta pastel celeste, pero sigue siendo más suave que usar rojo y amarillo intensos. Conviene usarla por secciones, no como identidad principal del sitio.

---

# 13. Paleta juvenil y vibrante

Buena si el sitio quiere sentirse más dinámico, musical y activo.

```text
Azul fuerte:        #063E9B
Amarillo vivo:      #FAE109
Rojo coral:         #F25F5C
Celeste claro:      #DFF3FF
Texto oscuro:       #161616
```

## CSS

```css
:root {
  --color-primary: #063E9B;
  --color-accent: #FAE109;
  --color-secondary: #F25F5C;
  --color-background: #DFF3FF;
  --color-text: #161616;
}
```

## Dónde usarla

- Eventos musicales
- Invitaciones a ensayos
- Actividades juveniles
- Banners de alto impacto
- Secciones de novedades

## Precaución

Esta paleta puede verse saturada si se usa en todo el sitio. Es mejor usarla en banners, tarjetas destacadas o publicaciones específicas.

---

# 14. Paleta para modo oscuro

Puede usarse como variante nocturna del sitio.

```text
Fondo oscuro:       #07111F
Superficie oscura:  #0F1F35
Azul acento:        #4D8DFF
Dorado suave:       #F2C94C
Texto claro:        #F8FAFC
Texto secundario:   #CBD5E1
```

## CSS

```css
:root.dark {
  --color-primary: #4D8DFF;
  --color-accent: #F2C94C;
  --color-background: #07111F;
  --color-surface: #0F1F35;
  --color-text: #F8FAFC;
  --color-text-muted: #CBD5E1;
}
```

## Dónde usarla

- Modo oscuro opcional
- Página de adoración
- Secciones nocturnas
- Galerías con fotos
- Eventos especiales

## Explicación

Un modo oscuro no debería usar negro puro en todo. Es mejor trabajar con azules oscuros, porque se sienten más relacionados con el logo y son más agradables para leer.

---

# 15. Paleta para eventos y avisos

Pensada para comunicar fechas, horarios y llamados de atención.

```text
Azul base:          #063E9B
Dorado:             #FAE109
Rojo aviso:         #E61D1E
Fondo claro:        #FFFFFF
Gris texto:         #303030
```

## CSS

```css
:root {
  --event-primary: #063E9B;
  --event-accent: #FAE109;
  --event-danger: #E61D1E;
  --event-background: #FFFFFF;
  --event-text: #303030;
}
```

## Dónde usarla

- Horarios semanales
- Ensayos
- Eventos
- Cambios de ubicación
- Avisos urgentes
- Fechas importantes

## Recomendación

Usar rojo solo cuando algo realmente necesita atención. Si todo está en rojo, nada destaca.

---

# 16. Paleta para cumpleaños y felicitaciones

Pensada para diseños suaves, personales y cálidos.

```text
Fondo crema:        #FFF8EC
Dorado pastel:      #F6D86B
Celeste pastel:     #DDEBFF
Durazno suave:      #FFD8B5
Texto cálido:       #3A2A1A
```

## CSS

```css
:root {
  --birthday-background: #FFF8EC;
  --birthday-accent: #F6D86B;
  --birthday-soft-blue: #DDEBFF;
  --birthday-soft-peach: #FFD8B5;
  --birthday-text: #3A2A1A;
}
```

## Dónde usarla

- Página de cumpleaños
- Tarjetas de felicitación
- Mensajes personalizados
- Publicaciones internas
- Galería de celebraciones

---

# 17. Paleta para galería y multimedia

Pensada para que las fotos destaquen.

```text
Fondo principal:    #FFFFFF
Fondo galería:      #F3F4F6
Texto oscuro:       #111827
Azul enlace:        #063E9B
Dorado detalle:     #D6A928
```

## CSS

```css
:root {
  --gallery-background: #FFFFFF;
  --gallery-surface: #F3F4F6;
  --gallery-text: #111827;
  --gallery-link: #063E9B;
  --gallery-accent: #D6A928;
}
```

## Recomendación

Para galerías, lo mejor es evitar fondos muy fuertes. Las fotos ya tienen color, por eso conviene usar blanco, gris claro y detalles discretos.

---

# 18. Distribución recomendada por secciones del sitio

## Inicio

Paleta recomendada:

```text
#FFFFFF
#F5F7FA
#063E9B
#FAE109
#111827
```

Uso:
- Hero con fondo claro o azul.
- Botón principal azul.
- Botón secundario dorado.
- Logo visible sobre fondo limpio.

## Sobre nosotros

Paleta recomendada:

```text
#FAF8F2
#102A43
#D6A928
#222222
```

Uso:
- Fondo blanco hueso.
- Títulos azul oscuro.
- Detalles dorados.

## Horarios y ensayos

Paleta recomendada:

```text
#063E9B
#FAE109
#FFFFFF
#F5F7FA
#111827
```

Uso:
- Tarjetas con días.
- Horarios destacados en azul.
- Fecha o lugar con acento dorado.

## Eventos

Paleta recomendada:

```text
#063E9B
#FAE109
#E61D1E
#FFFFFF
#303030
```

Uso:
- Azul para estructura.
- Dorado para destacar fecha.
- Rojo solo para avisos importantes.

## Cumpleaños

Paleta recomendada:

```text
#FFF8EC
#F6D86B
#DDEBFF
#FFD8B5
#3A2A1A
```

Uso:
- Fondos claros.
- Detalles pastel.
- Tipografía cálida y legible.

## Galería

Paleta recomendada:

```text
#FFFFFF
#F3F4F6
#111827
#063E9B
#D6A928
```

Uso:
- Fondo neutro.
- Fotos como protagonistas.
- Detalles mínimos.

## Contacto

Paleta recomendada:

```text
#FFFFFF
#F5F7FA
#063E9B
#FAE109
#111827
```

Uso:
- Formulario simple.
- Botón principal azul.
- Iconos o separadores dorados.

---

# 19. Sistema de botones recomendado

## Botón principal

```css
.btn-primary {
  background: #063E9B;
  color: #FFFFFF;
  border: 1px solid #063E9B;
}
```

Uso:
- “Ver horarios”
- “Contactar”
- “Conocer más”
- “Ver eventos”

## Botón secundario

```css
.btn-secondary {
  background: #FAE109;
  color: #111827;
  border: 1px solid #FAE109;
}
```

Uso:
- “Ver galería”
- “Leer más”
- “Compartir”

## Botón outline

```css
.btn-outline {
  background: transparent;
  color: #063E9B;
  border: 2px solid #063E9B;
}
```

Uso:
- Acciones secundarias
- Enlaces internos
- Alternativas visuales

## Botón de alerta

```css
.btn-danger {
  background: #E61D1E;
  color: #FFFFFF;
  border: 1px solid #E61D1E;
}
```

Uso:
- Solo para avisos urgentes o acciones muy importantes.

---

# 20. Sistema de tarjetas recomendado

## Tarjeta estándar

```css
.card {
  background: #FFFFFF;
  color: #111827;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
}
```

## Tarjeta suave

```css
.card-soft {
  background: #EAF4FF;
  color: #18324A;
  border-radius: 16px;
}
```

## Tarjeta destacada

```css
.card-featured {
  background: #063E9B;
  color: #FFFFFF;
  border-radius: 16px;
}
```

## Tarjeta de celebración

```css
.card-celebration {
  background: #FFF8EC;
  color: #3A2A1A;
  border: 1px solid #F6D86B;
  border-radius: 16px;
}
```

---

# 21. Reglas de contraste y legibilidad

## Combinaciones recomendadas

| Fondo | Texto recomendado |
|---|---|
| `#FFFFFF` | `#111827` |
| `#F5F7FA` | `#111827` |
| `#063E9B` | `#FFFFFF` |
| `#031F4F` | `#F8F5E9` |
| `#FAE109` | `#111827` |
| `#EAF4FF` | `#18324A` |
| `#FFF8EC` | `#3A2A1A` |

## Combinaciones a evitar

| Evitar | Motivo |
|---|---|
| Amarillo sobre blanco | Bajo contraste |
| Dorado claro sobre crema | Puede perderse visualmente |
| Rojo sobre verde | Cansado y difícil de leer |
| Texto largo en dorado | Mala lectura |
| Mucho rojo en una página | Se siente como alerta permanente |
| Azul fuerte + rojo fuerte + amarillo fuerte en grandes bloques | Saturación visual |

---

# 22. Regla 60 / 30 / 10

Para mantener equilibrio visual:

```text
60% color base
30% color secundario
10% color de acento
```

## Ejemplo para web principal

```text
60% blanco / gris claro
30% azul institucional
10% dorado
```

## Ejemplo para cumpleaños

```text
60% crema claro
30% celeste pastel
10% dorado o durazno
```

## Ejemplo para evento solemne

```text
60% azul noche
30% marfil
10% dorado sobrio
```

---

# 23. Variables CSS completas recomendadas

Este sistema puede usarse como base para un proyecto web real.

```css
:root {
  /* Identidad principal */
  --color-primary: #063E9B;
  --color-primary-dark: #031F4F;
  --color-primary-soft: #EAF4FF;

  /* Acentos */
  --color-accent: #FAE109;
  --color-accent-soft: #F6D86B;
  --color-accent-muted: #D6A928;

  /* Fondos */
  --color-background: #FFFFFF;
  --color-surface: #F5F7FA;
  --color-surface-warm: #FAF8F2;
  --color-surface-pastel: #FFF8EC;

  /* Texto */
  --color-text: #111827;
  --color-text-muted: #4B5563;
  --color-text-light: #FFFFFF;

  /* Estados */
  --color-success: #06873D;
  --color-danger: #E61D1E;
  --color-warning: #F2C94C;

  /* Bordes */
  --color-border: #E5E7EB;
}
```

---

# 24. Variante con Tailwind CSS

Si el sitio se desarrolla con Tailwind, se pueden registrar colores personalizados de esta forma:

```js
theme: {
  extend: {
    colors: {
      nr: {
        blue: '#063E9B',
        blueDark: '#031F4F',
        blueSoft: '#EAF4FF',
        gold: '#FAE109',
        goldSoft: '#F6D86B',
        green: '#06873D',
        red: '#E61D1E',
        surface: '#F5F7FA',
        text: '#111827',
        muted: '#4B5563',
      }
    }
  }
}
```

## Ejemplo de uso

```html
<section class="bg-nr-surface text-nr-text">
  <h1 class="text-nr-blue">Ministerio de Alabanza Nuevo Renacer</h1>
  <a class="bg-nr-blue text-white">Ver horarios</a>
  <a class="bg-nr-gold text-nr-text">Conocer más</a>
</section>
```

---

# 25. Recomendación para diseño UI

## Header

Opción segura:

```text
Fondo: #063E9B
Texto: #FFFFFF
Acento activo: #FAE109
```

Opción limpia:

```text
Fondo: #FFFFFF
Texto: #111827
Logo visible
Línea inferior: #F5F7FA
Botón destacado: #063E9B
```

## Hero principal

Opción institucional:

```text
Fondo: degradado suave entre #063E9B y #031F4F
Texto: #FFFFFF
Acento: #FAE109
```

Opción clara:

```text
Fondo: #FFFFFF
Bloque suave: #EAF4FF
Título: #063E9B
Botón: #063E9B
```

## Footer

Opción recomendada:

```text
Fondo: #031F4F
Texto: #F8FAFC
Texto secundario: #CBD5E1
Acento: #FAE109
```

---

# 26. Recomendación final

Para construir el sitio completo, la opción más segura es:

```text
#FFFFFF
#F5F7FA
#063E9B
#FAE109
#111827
#4B5563
#EAF4FF
```

Esta combinación permite:

- Mantener relación directa con el logo.
- Tener buena legibilidad.
- Usar colores pastel sin perder identidad.
- Crear secciones formales y celebrativas dentro del mismo sitio.
- Evitar saturación visual.
- Hacer que el logo destaque correctamente.

## Uso práctico recomendado

```text
Sitio principal:
Blanco + gris claro + azul institucional + dorado

Secciones suaves:
Pastel celeste + blanco cálido + dorado suave

Celebraciones:
Crema + durazno + celeste pastel + dorado

Eventos solemnes:
Azul noche + marfil + dorado sobrio

Alertas o avisos:
Rojo únicamente como acento puntual
```

---

# 27. Paletas listas para copiar en Coolors

## Principal web

```text
#FFFFFF
#F5F7FA
#063E9B
#FAE109
#111827
```

## Institucional

```text
#063E9B
#FAE109
#FFFFFF
#F4F6FA
#1A1A1A
```

## Moderna limpia

```text
#FFFFFF
#F5F7FA
#174EA6
#F2C94C
#111827
```

## Elegante ministerial

```text
#031F4F
#C9A227
#F8F5E9
#202020
#6B7A3A
```

## Neutral con dorado

```text
#FAF8F2
#EFEDE7
#102A43
#D6A928
#222222
```

## Pastel celeste y dorado

```text
#EAF4FF
#7BAFE8
#F6D86B
#FFFDF7
#18324A
```

## Pastel cálida

```text
#FFF6E8
#FFD8B5
#FFF0A8
#6D8EAD
#3A2A1A
```

## Pastel verde y celeste

```text
#E3F7EC
#DCEEFF
#6CBF84
#31556F
#1F2D2B
```

## Pastel lavanda y dorado

```text
#EFE7FF
#A7B7E8
#F4D35E
#FFFDF8
#2F2A3D
```

## Pastel coral y celeste

```text
#FFD6D1
#DDF3FF
#FFF2B8
#4F7CAC
#2A2A2A
```

## Juvenil vibrante

```text
#063E9B
#FAE109
#F25F5C
#DFF3FF
#161616
```

## Modo oscuro

```text
#07111F
#0F1F35
#4D8DFF
#F2C94C
#F8FAFC
```

---

# 28. Conclusión

La identidad visual del sitio debe apoyarse principalmente en el azul y el dorado del logo, pero no debe depender únicamente de colores intensos. Para una web más profesional, los fondos blancos, grises claros y tonos pastel ayudan a mejorar la lectura y dan más espacio al contenido.

La mejor estrategia es tener una paleta base para todo el sitio y varias paletas secundarias para secciones específicas.

## Paleta base recomendada

```text
#FFFFFF
#F5F7FA
#063E9B
#FAE109
#111827
```

## Paletas secundarias recomendadas

```text
Pastel celeste y dorado
Pastel cálida
Elegante ministerial
Neutral con dorado
Modo oscuro
```

Con esta estructura, el sitio puede verse institucional, moderno, espiritual y cercano sin perder coherencia visual.
