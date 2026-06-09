---
name: deploy-vercel
description: Publicar una app Next.js (Stack 2) en Vercel con URL pública gratuita. Conecta el repo de GitHub del alumno con Vercel, configura variables de entorno si las hay, dispara el primer deploy y deja el proyecto en modo "cada push a main dispara un nuevo deploy automático". Se invoca cuando el usuario dice "súbelo a Vercel", "publica esto en internet", "haz deploy", "sácalo a producción", o automáticamente desde la Fase 5 del prompt maestro SDD cuando todos los gates están en verde.
---

# Skill: deploy-vercel

Eres responsable de llevar la app Next.js del alumno de su ordenador a una URL pública en internet. Tu trabajo no es solo lanzar el deploy: es asegurarte de que el proyecto está listo para salir y que el alumno entiende qué va a pasar.

## Cuándo aplica esta skill

- **Stack 2 (Next.js)**: sí, es la skill correcta.
- **Stack 1 (Web HTML+JS plano)**: técnicamente también funciona en Vercel, pero usa la skill `deploy-github-pages` por simplicidad. Si el alumno insiste en Vercel para Stack 1, sigue los mismos pasos.
- **Stack 3 (Python script)**: no aplica. Vercel es para webs, no para scripts locales.

## Precondiciones obligatorias

Antes de hacer deploy, **verifica que estos cuatro gates están en verde**. Si alguno falla, párate:

1. **Auditoría limpia**: la skill `auditoria-seguridad` se ha ejecutado sobre todo el proyecto y no hay críticos ni altos.
2. **Tests pasando**: si hay tests unitarios o Playwright, todos en verde.
3. **Build local sin errores**: ejecuta `npm run build` en la terminal integrada. Si falla, el deploy también va a fallar — corrige antes.
4. **Repo en GitHub**: el proyecto tiene un repo remoto y todos los commits importantes están pusheados. Si no, invoca `git-workflow` para hacer el push primero.

## Setup inicial (una sola vez por alumno)

Si es la primera vez que el alumno hace deploy en Vercel, sigue [`setup-inicial.md`](./setup-inicial.md): crear cuenta de Vercel con su GitHub, autorizar Vercel para acceder a los repos. Es un proceso de 5 minutos en navegador.

Si ya lo hizo antes en otro proyecto, salta directo al flujo de deploy.

## Flujo del primer deploy

1. **Verifica setup**: pregunta al alumno si ya tiene cuenta de Vercel conectada a su GitHub. Si dice que no, guíalo por `setup-inicial.md`.

2. **Importa el repo en Vercel**:
   - El alumno entra a [vercel.com/new](https://vercel.com/new) en su navegador.
   - Selecciona el repo del proyecto de la lista (debería aparecer porque autorizó GitHub).
   - Vercel detecta automáticamente que es Next.js y propone configuración por defecto.
   - **Importante**: en este paso aparece un apartado "Environment Variables". Si la app necesita claves de API u otras variables sensibles, añádelas aquí antes de hacer deploy. La skill te recuerda cuáles según lo que vea en el código.

3. **Lanza el deploy inicial**:
   - El alumno pulsa el botón "Deploy" en Vercel.
   - El proceso tarda 1-3 minutos. Vercel muestra el log en tiempo real.
   - Al acabar, Vercel da una URL pública del tipo `tu-proyecto-xxx.vercel.app`.

4. **Verifica que carga**:
   - Pídele al alumno que abra la URL en el navegador.
   - Si la app carga y funciona: éxito. Resume al alumno qué tiene ahora.
   - Si da pantalla blanca o error: invoca la skill `pegar-error` para capturar el log del build en Vercel y diagnosticar.

5. **Confirma el modo automático**:
   - Explica al alumno: a partir de ahora, **cada vez que haga push a la rama `main` con `git-workflow`, Vercel dispara un nuevo deploy automáticamente**. No tiene que volver a entrar a Vercel salvo para cambiar configuración.

## Variables de entorno

Esta es la parte que más tropiezos da. Reglas:

- **Nunca pongas claves sensibles en el código** (la skill `auditoria-seguridad` ya bloquea esto, pero recordatorio).
- En el código las usas como `process.env.NOMBRE_VARIABLE`.
- En Vercel se configuran en **Project → Settings → Environment Variables**.
- Tras añadir o cambiar una variable, **hay que volver a hacer deploy** para que se aplique. Vercel no las aplica retroactivamente al deploy anterior.

Si la app del alumno usa API keys (OpenAI, Stripe, etc.), guíalo:

1. Anota qué variables necesita la app (búscalas en el código con `process.env.`).
2. Llévalo a Settings → Environment Variables del proyecto en Vercel.
3. Por cada variable: nombre exacto y valor.
4. Selecciona "Production", "Preview" y "Development" para que apliquen en todos los entornos.
5. Tras añadirlas, dile que vuelva al Dashboard del proyecto y haga "Redeploy" del último deploy. O simplemente que haga otro push: la skill `git-workflow` puede hacer un commit trivial para disparar el redeploy.

## Deploys posteriores (modo automático)

Una vez configurado, el flujo es:

```
Alumno: "sube los cambios"
git-workflow: hace commit + push a main
Vercel: detecta el push, lanza deploy automático
URL: se actualiza en 1-3 minutos
```

No necesitas invocar `deploy-vercel` cada vez. Solo `git-workflow`. La integración hace el resto.

## Cuándo el deploy falla

Causas típicas y cómo orientar al alumno:

| Síntoma | Causa probable | Solución |
|---|---|---|
| Build error en Vercel | El build local tampoco compila | Ejecutar `npm run build` en local, arreglar errores, push de nuevo |
| Pantalla en blanco al cargar la URL | Variables de entorno no configuradas | Añadirlas en Vercel + redeploy |
| Error 404 en rutas que sí existen | Configuración de rutas Next.js incorrecta | Revisar `app/` y nombres de archivos |
| Funcionaba en localhost pero no en Vercel | URLs hardcodeadas a localhost | Buscar `localhost:3000` en código y usar variables de entorno o rutas relativas |

Para diagnosticar cualquier fallo, invoca `pegar-error` con el log de Vercel como input.

## Integración con el bucle SDD

Esta skill se invoca en la **Fase 5 del prompt maestro SDD**, una vez que todas las tareas de `sdd/tasks.md` están marcadas como hechas y el proyecto cumple el checklist pre-deploy de `auditoria-seguridad`:

1. Verificar las precondiciones (los 4 gates de arriba).
2. Comprobar setup inicial.
3. Ejecutar el flujo de primer deploy o, si ya existe, hacer push para disparar redeploy.
4. Devolver la URL pública al alumno.

## Lo que no haces

- **No saltas precondiciones**: si la auditoría no está limpia, te detienes y avisas al alumno. Esto NO es negociable.
- **No publicas variables sensibles**: las claves van en el dashboard de Vercel, nunca en el código ni en commits.
- **No configures dominios personalizados** salvo que el alumno lo pida explícitamente. Por defecto se queda con la URL `*.vercel.app`. Si lo pide: lo guías por el proceso, pero avísale que requiere comprar dominio aparte.
- **No haces deploy a Production directamente desde la primera vez**: Vercel ya lo hace bien por defecto, no necesitas tocar configuración avanzada.
