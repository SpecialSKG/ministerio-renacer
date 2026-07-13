# Perfil del proyecto — Ministerio Renacer

## Identidad

- **Nombre del proyecto:** Ministerio Renacer
- **Tipo de proyecto:** Web estática / POC
- **Objetivo principal:** Plataforma pública para consultar eventos, cantos y repertorios de un ministerio de música
- **Usuarios principales:** Miembros del ministerio, feligreses, público general
- **Estado:** POC (prueba de concepto estática)

## Stack

- **Lenguaje principal:** HTML, CSS, JavaScript vanilla
- **Framework:** Ninguno (prohibido en POC)
- **Gestor de paquetes:** Ninguno
- **Base de datos:** Ninguna (datos en `data/*.json`)
- **Hosting:** GitHub Pages o Cloudflare Pages (estático)
- **Herramientas de diseño:** CSS variables, mobile-first, diseño propio
- **Dependencias críticas:** 0 (sin npm, sin build)

## Comandos

- **Ejecutar local:** `python -m http.server 8080` → http://localhost:8080
- **Tests:** Revisión manual + Playwright MCP + consola del navegador
- **Build:** No aplica (no hay build step)
- **Despliegue:** Push a GitHub → GitHub Pages o Cloudflare Pages

## Estructura importante

```txt
ministerio-renacer/
├── index.html              # Shell principal
├── assets/
│   ├── css/styles.css      # Todos los estilos
│   ├── js/app.js           # Todo el JS
│   └── img/                # Imágenes
├── data/
│   ├── events.json         # Eventos
│   ├── songs.json          # Cantos
│   └── repertoires.json    # Repertorios
├── docs/                   # Documentación del proyecto
├── reports/                # Reportes de ejecución de agentes
└── .opencode/              # Configuración de agentes OpenCode
```

## Fuentes de verdad

- **Requisitos:** `docs/05-prd-requerimientos-producto.md`
- **Técnicos:** `docs/06-trd-requerimientos-tecnicos.md`
- **Diseño/UI:** `docs/07-brief-diseno-ui-ux.md`
- **Flujo:** `docs/08-app-flow.md`
- **Plan:** `docs/10-plan-implementacion.md`
- **Datos:** `data/*.json` (fuente única de verdad)

## Restricciones

- **No usar:** React, Angular, Vue, Next.js, Vite, Tailwind obligatorio, Bootstrap obligatorio
- **No implementar:** Backend, login, base de datos, Supabase, Firebase, PDF, transposición
- **Requiere aprobación:** Instalaciones npm, cambios de arquitectura, borrar archivos
- **Convenciones de nombres:** IDs en inglés técnico simple, fechas `YYYY-MM-DD`, horas `HH:mm`
- **Convenciones de commits:** Formato convencional `tipo(alcance): descripción`
- **Compatibilidad mínima:** Navegadores modernos, hosting estático

## Skills del proyecto

Skills propias en `.opencode/skills/`:
- `poc-planner` — planificar alcance, fases y criterios
- `static-frontend` — construir HTML/CSS/JS
- `json-content` — mantener datos JSON consistentes
- `poc-qa` — auditar antes de marcar listo

Skills externas en `.agents/skills/` (apoyo, no definen el proyecto).

## Calidad esperada

- Sin errores de consola en flujo normal
- Navegación funcional entre todas las vistas
- Diseño mobile-first, sin scroll horizontal
- Contraste suficiente, imágenes con alt, HTML semántico
- JSON válido con relaciones verificables entre eventos, repertorios y cantos
- Funciona con servidor local y hosting estático

## Datos sensibles

- No incluir datos personales reales del ministerio
- No incluir credenciales, tokens ni secretos
- No inventar eventos reales sin autorización

## Flujo de trabajo preferido

- Planificar antes de construir: sí
- Investigar con Context7: cuando haya APIs/liberías externas
- Commits automáticos: sí (por ministerio-builder)
- Documentar decisiones: sí
- Auditoría obligatoria antes de finalizar: sí (ministerio-reviewer)
