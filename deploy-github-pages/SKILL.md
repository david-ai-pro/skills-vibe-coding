---
name: deploy-github-pages
description: Publicar una web estática (Stack 1, HTML+CSS+JS) en GitHub Pages con URL pública gratuita. Activa GitHub Pages en el repo del alumno usando gh CLI, configura la rama main como fuente y devuelve la URL final. Se invoca cuando el usuario dice "súbelo a GitHub Pages", "publica la web", "haz que sea pública", "ponla en internet", o automáticamente desde la Fase 5 del prompt maestro SDD cuando el stack es 1 y todos los gates están en verde.
---

# Skill: deploy-github-pages

Eres responsable de llevar la web estática del alumno de su ordenador a una URL pública en internet. GitHub Pages es el servicio gratis de hosting de páginas estáticas que ofrece GitHub. Tu trabajo es configurar Pages, lanzar el primer deploy y dejar el proyecto en modo "cada push actualiza la web".

## Cuándo aplica esta skill

- **Stack 1 (Web HTML+CSS+JS)**: sí, es la skill correcta.
- **Stack 2 (Next.js)**: no aplica directamente. Next.js necesita servidor para funcionar bien. Usa la skill `deploy-vercel`.
- **Stack 3 (Python script)**: no aplica. GitHub Pages es para webs, no para scripts.

> Nota técnica: Next.js puede exportarse a estático (`next export`) y desplegarse en GitHub Pages, pero pierde funcionalidades clave (rutas dinámicas, API routes). Para el módulo asumimos: Stack 2 va a Vercel, punto.

## Precondiciones obligatorias

Antes de hacer deploy, **verifica que estos cuatro gates están en verde**. Si alguno falla, párate:

1. **Auditoría limpia**: la skill `auditoria-seguridad` se ha ejecutado y no hay críticos ni altos.
2. **Tests pasando**: si hay tests Playwright sobre la web, todos en verde.
3. **El repo es público**: GitHub Pages gratis solo funciona en repos públicos (en cuentas con plan Free). Si el alumno tiene el repo privado y no quiere hacerlo público, avísale: tendrá que pagar GitHub Pro o usar otra plataforma.
4. **Index.html en la raíz del repo**: GitHub Pages busca por defecto `index.html` en la raíz. Si está en una subcarpeta, hay que configurar la fuente.

## Setup inicial

A diferencia de Vercel, GitHub Pages no necesita cuenta aparte ni autorizar nada. Si el alumno ya tiene `gh` CLI autenticado (Clase 7), ya está. No hay setup propio de esta skill.

## Flujo del primer deploy

1. **Verifica que el repo es público**:
   - Ejecuta `gh repo view --json visibility` y mira el resultado.
   - Si es `PRIVATE`, pregunta al alumno: ¿lo cambiamos a público? Si dice sí: `gh repo edit --visibility public --accept-visibility-change-consequences`.
   - Si dice que no: párate. GitHub Pages no funcionará. Sugiere `deploy-vercel` como alternativa (Vercel sí permite Stack 1 privado en plan Hobby).

2. **Verifica el archivo index.html**:
   - Si está en la raíz del repo: bien, sigue.
   - Si está en una subcarpeta (`docs/` o similar): pregunta al alumno si prefiere moverlo a raíz o configurar Pages para servir desde esa carpeta. Recomendación: moverlo a raíz si el proyecto es solo una web.

3. **Activa GitHub Pages con gh CLI**:

   ```
   gh api repos/{owner}/{repo}/pages \
     --method POST \
     --field source[branch]=main \
     --field source[path]=/
   ```

   (`{owner}` y `{repo}` se sustituyen automáticamente si el directorio actual es un repo configurado).

4. **Espera al primer build de Pages**:
   - GitHub tarda 1-2 minutos en construir y publicar la página.
   - Ejecuta `gh api repos/{owner}/{repo}/pages/builds/latest --jq .status` para ver el estado. Cuando devuelve `built`, está listo.

5. **Devuelve la URL final**:

   ```
   gh api repos/{owner}/{repo}/pages --jq .html_url
   ```

   Suele tener el formato `https://<usuario>.github.io/<nombre-repo>/`.

6. **Verifica que carga**:
   - Pídele al alumno que abra la URL en el navegador.
   - Si carga la web bien: éxito.
   - Si da 404 al cargar un asset (imagen, CSS): probablemente hay rutas absolutas en el código (`/styles.css` en vez de `./styles.css` o `styles.css`). Invoca `pegar-error` para diagnosticar.

7. **Confirma el modo automático**:
   - Explica al alumno: a partir de ahora, **cada push a la rama `main` con `git-workflow` actualiza la web pública en 1-2 minutos**. No tiene que volver a tocar Pages salvo para cambiar configuración.

## Deploys posteriores (modo automático)

Una vez activado, el flujo es:

```
Alumno: "sube los cambios"
git-workflow: hace commit + push a main
GitHub Pages: detecta el push, reconstruye la web
URL: se actualiza en 1-2 minutos (misma URL, contenido nuevo)
```

No necesitas invocar `deploy-github-pages` cada vez. Solo `git-workflow`.

## Limitaciones de GitHub Pages

Lo que el alumno tiene que saber:

- **Solo contenido estático**. No hay servidor que pueda ejecutar código por petición. Si la web necesita un backend (login real, base de datos), no encaja en GitHub Pages: usa Vercel con Stack 2.
- **No hay variables de entorno**. Si la web necesita una clave de API, esa clave acabaría en el código y la skill `auditoria-seguridad` la bloqueará. Otra razón para no usar Pages con apps con secretos.
- **HTTPS por defecto**, pero la primera vez puede tardar unos minutos en activarse el certificado tras crear el sitio.
- **Repos públicos** en cuentas Free. Si pagas GitHub Pro, también puedes usar Pages con repos privados.

## Cuándo el deploy falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| Error al ejecutar `gh api ... pages` | El repo es privado y la cuenta es Free | Cambiar repo a público o usar Vercel |
| 404 al cargar la URL pública | Pages aún está construyendo | Esperar 2 minutos y refrescar |
| Carga pero sin estilos | Rutas absolutas en CSS/JS | Cambiar `/styles.css` a `styles.css` o `./styles.css` |
| Imágenes rotas | Mismo problema de rutas absolutas | Mismo cambio en `<img src="...">` |
| Página dice "404 - File not found" después de minutos | Falta `index.html` en la raíz | Mover el archivo |

Para diagnosticar fallos visuales: invoca `pegar-error` con la URL de la página y el log de la consola del navegador (F12).

## Integración con el bucle SDD

Esta skill se invoca en la **Fase 5 del prompt maestro SDD** cuando:

- El stack del proyecto es Stack 1.
- Todas las tareas están marcadas como hechas.
- El checklist pre-deploy de `auditoria-seguridad` está limpio.

Si el alumno está en Stack 2, se invoca `deploy-vercel` en su lugar.

## Lo que no haces

- **No saltas precondiciones**: si la auditoría no está limpia o el repo es privado en cuenta Free, te detienes.
- **No cambias la visibilidad del repo sin permiso explícito**: pasar de privado a público es una acción que puede ser irreversible si hay forks. Confirma siempre.
- **No configures dominios personalizados** salvo que el alumno lo pida. Por defecto se usa la URL `*.github.io`.
- **No instalas herramientas de build** (Jekyll, Eleventy). GitHub Pages las soporta pero queda fuera del alcance del módulo.
