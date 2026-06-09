# Setup inicial · deploy-vercel

Esto se hace **una sola vez por persona**, no por proyecto. Toma 5 minutos en el navegador.

---

## Paso 1 · Crear cuenta de Vercel

1. Ve a [vercel.com/signup](https://vercel.com/signup) en tu navegador.
2. Elige **"Continue with GitHub"**. Es lo más simple porque ya tienes cuenta de GitHub del módulo (Clase 7).
3. Vercel te lleva a GitHub para autorizar. Acepta.
4. Vercel te pide un nombre de cuenta gratuita. Acepta el que te sugiere (suele ser tu usuario de GitHub).
5. Elige el plan **"Hobby"** (gratis para siempre, sin tarjeta).

Ya tienes cuenta de Vercel conectada a tu GitHub.

---

## Paso 2 · Autorizar Vercel para acceder a tus repos

Esto es el paso clave. Permite a Vercel ver tus repositorios para poder importarlos al hacer deploy.

1. Cuando entras la primera vez al dashboard de Vercel, te pide instalar la **GitHub App** de Vercel.
2. Tienes dos opciones:
   - **"All repositories"**: Vercel puede ver todos tus repos públicos y privados. Más cómodo pero menos privado.
   - **"Only select repositories"**: eliges qué repos puede ver Vercel. Más controlado.

   **Recomendado**: empieza con "Only select repositories" y elige solo el repo de tu proyecto. Si más adelante quieres añadir otro, vuelves a esta pantalla y lo añades.

3. Confirma la instalación. Vercel ya puede ver el repo elegido.

---

## Paso 3 · Importar el repo del proyecto

Esto sí se hace **por cada proyecto nuevo**, pero la cuenta y la conexión ya están listas.

1. Ve a [vercel.com/new](https://vercel.com/new).
2. Verás el repo que autorizaste en el Paso 2. Pulsa "Import".
3. Vercel detecta que es Next.js y te muestra una pantalla de configuración:
   - **Project Name**: déjalo como está o cambia si quieres.
   - **Framework Preset**: Next.js (autodetectado).
   - **Root Directory**: déjalo por defecto.
   - **Build Settings**: déjalos por defecto.
   - **Environment Variables**: si tu app necesita claves (OpenAI, etc.), las añades aquí ahora. Si no, salta este paso.
4. Pulsa **"Deploy"**.

El primer deploy tarda 1-3 minutos. Vercel te enseña el log en tiempo real. Cuando termina, te da una URL del tipo `tu-proyecto-xxx.vercel.app`.

Esa URL ya es pública. Cualquiera con el enlace puede entrar.

---

## Listo

Con estos tres pasos hechos por primera vez, la skill `deploy-vercel` puede:

- Saber que tienes cuenta de Vercel conectada.
- Saber qué proyectos están importados.
- Orientarte cuando hagas el siguiente deploy en otro proyecto.

A partir de aquí, cada **push a `main`** desde la skill `git-workflow` dispara un nuevo deploy automáticamente. No vuelves a tocar el navegador salvo que necesites cambiar variables de entorno o configuración avanzada.

---

## Resolución de problemas comunes

### "El repo no aparece en la lista de Vercel"

Pasó algo con la autorización del Paso 2. Ve a [github.com/settings/installations](https://github.com/settings/installations) en tu cuenta de GitHub, busca "Vercel" en la lista de apps instaladas, abre la configuración y añade el repo a la lista de "Repository access".

### "Build error: Cannot find module 'next'"

El proyecto no tiene `package.json` o no incluye Next.js como dependencia. Vuelve al proyecto en tu ordenador, ejecuta `npm install` en la terminal y haz commit + push de los archivos resultantes. Vercel detecta el push y vuelve a intentar el build.

### "Pantalla blanca al cargar la URL pública"

La app compiló bien pero falta una variable de entorno crítica (probablemente una API key). Vuelve al Project en Vercel → Settings → Environment Variables, añade lo que falte, y haz un redeploy del último (o un push nuevo desde `git-workflow`).

### "Quiero deshacer un deploy que rompió la app"

En el dashboard de Vercel, en la pestaña "Deployments", encuentra el último deploy que funcionaba. En el menú "..." de ese deploy, elige "Promote to Production". Tu URL vuelve a ese estado al instante.
