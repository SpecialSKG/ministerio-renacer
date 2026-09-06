# Seguridad frontend

Esta referencia cubre controles cliente. Autenticación, autorización, sesiones,
datos sensibles, dependencias o una superficie de ataque amplia requieren además
`special-security-audit`.

## REQUIRED

- Considerar público todo valor incorporado al bundle, aunque provenga de `.env`.
- No incluir secretos, tokens administrativos, credenciales o claves privadas.
- Tratar DOM, URL, storage, CMS, API y mensajes externos como datos no confiables.
- Evitar sinks XSS con datos no confiables (`innerHTML`, `outerHTML`,
  `document.write`, URLs ejecutables); usar APIs seguras o sanitización contextual.
- Validar reglas de seguridad e integridad en una frontera confiable; la
  validación del navegador solo mejora UX.
- No exponer detalles sensibles en errores, logs, analytics o sourcemaps.

## DEFAULT

- Revisar dependencias existentes, versión, mantenimiento, licencia, costo de
  bundle y alternativas antes de proponer otra.
- Mantener CSP como defensa en profundidad, adaptada y probada; no copiar una
  política genérica.
- Minimizar datos recolectados y respetar consentimiento/retención del proyecto.
- Validar URLs, navegación, `postMessage`, uploads y contenido embebido según el
  límite de confianza real.

## AUDIT

- `innerHTML` con contenido estático controlado no es vulnerabilidad automática.
- Sourcemaps públicos requieren revisar código, comentarios y rutas expuestas.
- Un aviso de dependencia necesita explotabilidad y alcance, no solo severidad
  del scanner.

## Puertas humanas

Pedir autorización antes de instalar/actualizar dependencias, cambiar CSP,
tracking, analytics, autenticación, permisos o envío de datos. Detenerse ante un
posible secreto real y reportarlo redactado.

Fuentes de actualización: [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
y [OWASP CSP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).
