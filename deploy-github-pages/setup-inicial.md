# Setup inicial · deploy-github-pages

A diferencia de Vercel, GitHub Pages **no necesita cuenta aparte ni autorización adicional**. Si ya hiciste el setup de la Clase 7 (cuenta de GitHub + `gh` CLI autenticado), ya tienes todo.

---

## Lo único que tienes que tener listo

1. ✅ Cuenta de GitHub (Clase 7 paso 4).
2. ✅ `gh` CLI autenticado en tu ordenador (Clase 7 paso 4).
3. **Repo público** en GitHub donde está tu web. Si tu cuenta es Free (la gratis), GitHub Pages **solo funciona con repos públicos**.

Si tu repo es privado y tu cuenta es Free, tienes dos opciones:

- **Cambiar el repo a público** (la skill te ayuda a hacerlo con un comando).
- **Usar Vercel** con la skill `deploy-vercel`. Vercel sí permite Stack 1 en repos privados con plan Hobby gratuito.

---

## Lo que ocurre la primera vez

Cuando le dices a Claude *"publica esto en GitHub Pages"*, la skill:

1. Verifica las precondiciones (auditoría limpia, tests verdes, repo público, `index.html` en raíz).
2. Activa GitHub Pages en tu repo con un comando de `gh` CLI. **No tienes que entrar a la web de GitHub.**
3. Espera al primer build (1-2 min).
4. Te devuelve la URL pública del tipo `https://tu-usuario.github.io/nombre-repo/`.

Esa URL ya es pública. Cualquiera con el enlace puede entrar.

---

## A partir de aquí

Cada vez que la skill `git-workflow` haga un push a `main`, GitHub Pages reconstruye la web en 1-2 minutos. La URL no cambia: el contenido se actualiza.

No tienes que volver a tocar nada salvo:

- **Cambiar a un dominio personalizado** (opcional, requiere comprar dominio aparte).
- **Cambiar la rama o carpeta** desde la que se sirve la web (rara vez).

---

## Resolución de problemas comunes

### "Tu repo es privado, no puedo activar Pages"

Las opciones están arriba: cambiar a público o usar Vercel. Si quieres seguir en Pages y hacer el repo público, la skill ejecuta:

```
gh repo edit --visibility public --accept-visibility-change-consequences
```

Te pide confirmación antes. **Importante**: una vez público, cualquiera puede leer tu código. Asegúrate de que la skill `auditoria-seguridad` está limpia antes de hacer este paso.

### "La URL devuelve 404"

Dos causas posibles:

1. **Pages aún está construyendo el sitio**. La primera vez tarda 1-2 minutos. Espera y refresca.
2. **No hay `index.html` en la raíz del repo**. GitHub Pages busca ese archivo por defecto. Si tu web está en una subcarpeta (`web/`, `docs/`), mueve los archivos a la raíz o configura Pages para servir desde esa subcarpeta.

### "Carga la página pero sin estilos ni imágenes"

Es el problema más común y la causa siempre es la misma: **rutas absolutas** en tu código.

En tu HTML probablemente tienes algo como:

```html
<link rel="stylesheet" href="/styles.css">
<img src="/logo.png">
```

En GitHub Pages, tu sitio no vive en la raíz del dominio (`https://tu-usuario.github.io/`) sino en una subcarpeta (`https://tu-usuario.github.io/nombre-repo/`). Las rutas absolutas con `/` apuntan a la raíz del dominio, no a la del proyecto.

Solución: cambia todas las rutas a relativas:

```html
<link rel="stylesheet" href="styles.css">
<img src="logo.png">
```

O con `./`:

```html
<link rel="stylesheet" href="./styles.css">
<img src="./logo.png">
```

La skill `pegar-error` te ayuda a localizar estas rutas si el problema aparece tras el deploy.

### "Quiero un dominio personalizado (midominio.com)"

Esto es opcional y requiere:

1. Comprar el dominio en un registrador (Namecheap, Google Domains, etc.).
2. Configurar los DNS del dominio para apuntar a GitHub Pages.
3. En tu repo: Settings → Pages → Custom domain.

La skill no cubre este flujo por defecto. Si lo necesitas, pídele a Claude que te guíe específicamente.
