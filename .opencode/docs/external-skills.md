# Skills externas instaladas

Estas skills viven en `.agents/skills/`, se cargan bajo demanda y conservan su
identidad externa. No sustituyen permisos, seguridad ni políticas `special-*`.

| Fuente | Revisión fijada | Licencia | Skills instaladas |
|---|---|---|---|
| [Emil Kowalski](https://github.com/emilkowalski/skills) | `d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7` | MIT | Las 12 skills del paquete |
| [Addy Osmani](https://github.com/addyosmani/agent-skills) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | MIT | `interview-me`, `test-driven-development`, `debugging-and-error-recovery`, `performance-optimization`, `api-and-interface-design` |
| [Interface Design](https://github.com/Dammyjay93/interface-design) | `2f9be3206855bcb2d1d0af262c8bae25cba6658d` | MIT | `interface-design` |

Los avisos de licencia completos están en `.agents/licenses/`. Las revisiones no
se actualizan automáticamente: primero se revisa el diff de upstream, después se
actualiza el hash y se ejecutan los validadores del template.

## Routing

- Las descripciones permiten que OpenCode anuncie y cargue solo la skill
  relevante; los cuerpos completos no entran al contexto por anticipado.
- `special-*` gobierna las reglas internas del proyecto. Las externas aportan
  conocimiento especializado y workflows.
- Las skills explícitas de Emil (`pick-ui-library` y `prototype`) deben usarse
  solo cuando el usuario las solicite, conforme a su propio contrato.
- `review-animations` también permanece explícita. Los tres frontmatters fueron
  adaptados de `disable-model-invocation` a `metadata.opencode/autoinvoke` para
  que OpenCode respete esa intención; es el único parche local al paquete.
- Si dos skills parecen aplicables, elegir la más específica y evitar ejecutar
  workflows duplicados.

## Actualización

No utilizar `@latest` automáticamente. Para actualizar una fuente, registrar su
nuevo commit, revisar licencias y contenido, reemplazar únicamente sus carpetas
y validar referencias, frontmatter y seguridad.
