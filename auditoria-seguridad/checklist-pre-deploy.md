# Checklist pre-deploy

Lo que la skill `auditoria-seguridad` revisa antes de dejarte publicar tu proyecto. Si todo está marcado, puedes subir. Si algo no, **no publiques**: arregla primero.

Esta lista es la versión escrita del gate pre-deploy del prompt maestro SDD. La skill la ejecuta sola en Fase 5 antes de invocar `deploy-vercel` o `deploy-github-pages`.

---

## 1. Secretos y credenciales

- [ ] No hay API keys, tokens ni contraseñas escritos directamente en archivos `.js`, `.jsx`, `.ts`, `.tsx`, `.py`, `.html`, `.css`.
- [ ] Todas las claves sensibles están en variables de entorno (`.env`, `.env.local`).
- [ ] El archivo `.env` está en `.gitignore` y **no se ha subido nunca** al repo.
- [ ] El archivo `.env.example` (si existe) tiene los nombres de variables pero no los valores reales.
- [ ] No hay strings sospechosos tipo `sk-...`, `pk_live_...`, tokens hex largos hardcodeados en código cliente (donde cualquiera puede leerlos en el navegador).

## 2. Archivos sensibles en Git

- [ ] El historial de Git no contiene `.env`, `*.pem`, `*.key`, `credentials.json` ni similares. (Si los hubo: rotar las credenciales que llevaban, no basta con borrar el archivo).
- [ ] `.gitignore` contiene como mínimo: `node_modules/`, `.env*`, `dist/`, `build/`, `.next/`, `__pycache__/`, `venv/`, `.DS_Store`, `Thumbs.db`.
- [ ] No hay carpetas privadas (`/data`, `/uploads`, `/private`) trackeadas si contienen datos reales.

## 3. Validación de inputs

- [ ] Todos los formularios validan los campos antes de enviar (longitud máxima, tipo, formato).
- [ ] Los campos email usan `type="email"`, los numéricos `type="number"`, etc.
- [ ] En el servidor (si existe) se valida de nuevo: nunca confiar solo en la validación del navegador.
- [ ] Si hay subida de archivos: validar tipo MIME, tamaño máximo y nombre saneado.

## 4. Outputs y XSS

- [ ] No se usa `dangerouslySetInnerHTML` en React/Next.js sin sanear el contenido con DOMPurify o equivalente.
- [ ] No se asigna directamente `element.innerHTML = valorDelUsuario` en JS plano.
- [ ] Las variables que vienen del usuario se renderizan con el escape por defecto del framework, no con interpolación cruda en HTML.

## 5. Dependencias

- [ ] `npm audit --omit=dev` (Stack 1/2): cero vulnerabilidades **critical** ni **high**. Las **moderate** y **low** están revisadas y aprobadas.
- [ ] `pip-audit` (Stack 3): cero vulnerabilidades.
- [ ] Las versiones en `package.json` o `requirements.txt` están fijadas (no `^` ni `>=` para dependencias críticas de producción si es posible).

## 6. Logs y mensajes

- [ ] No hay `console.log` ni `print` que saquen tokens, contraseñas, datos de usuarios reales o información sensible.
- [ ] Los mensajes de error que ve el usuario son genéricos: "No se pudo procesar la petición", no "Error 500: connection to db postgres://admin:pass@host failed".
- [ ] En producción, los logs detallados solo se mandan a un sistema interno (no a la consola del navegador).

## 7. Configuración de despliegue

### Si deploy a Vercel (Stack 2)
- [ ] Variables de entorno configuradas en el dashboard de Vercel, no en el código.
- [ ] El proyecto compila sin warnings de seguridad: `npm run build` en local sale limpio.
- [ ] La carpeta `.next/` y `node_modules/` están en `.gitignore` (Vercel los regenera).

### Si deploy a GitHub Pages (Stack 1)
- [ ] El repo es **público** intencionadamente (GitHub Pages gratis solo soporta repos públicos en cuentas free).
- [ ] No hay endpoints ni servicios privados accesibles desde el HTML servido.
- [ ] Los formularios que necesitan backend usan servicios externos (Formspree, Netlify Forms) con sus propias claves.

## 8. Permisos y privacidad

- [ ] Si el proyecto guarda datos de usuarios reales: hay un aviso de privacidad visible.
- [ ] Si usa cookies o localStorage para datos personales: el usuario está informado.
- [ ] Si el proyecto procesa datos sensibles reales (médicos, financieros, identificadores oficiales): **párate aquí**. Esta checklist no es suficiente. Pide un audit profesional.

---

## Veredicto

Si todas las casillas están marcadas → **adelante, puedes publicar**.

Si hay alguna sin marcar → **arréglala antes**. La skill `auditoria-seguridad` te bloqueará el deploy hasta que estén todas verdes.
