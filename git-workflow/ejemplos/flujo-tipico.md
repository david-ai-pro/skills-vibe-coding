# Flujo típico de uso · ejemplos de conversación

Cómo se siente trabajar con `git-workflow` en el día a día. El alumno no escribe ningún comando: habla en castellano, la skill ejecuta.

---

## Caso 1 · Primera vez en el proyecto

```
Tú: guarda lo que hemos hecho hoy

Claude (skill git-workflow): No veo que este proyecto sea aún un repositorio
de Git. Lo voy a inicializar para empezar a guardar versiones.
[ejecuta: git init]

Listo. Ahora dime: ¿qué nombre y email quieres que aparezca en tus commits?
Aparecerán públicamente si subes el repo a GitHub.

Tú: David Hermoso, davidhermoso@aimax.com

Claude: Configurado.
[ejecuta: git config --global user.name "David Hermoso"
          git config --global user.email "davidhermoso@aimax.com"]

He revisado los cambios. Vas a guardar 7 archivos nuevos (toda la
plantilla de Stack 2). Propongo este mensaje de commit:

  "Configurar plantilla inicial del proyecto"

¿Te vale o lo cambias?

Tú: vale así

Claude: Hecho.
[ejecuta: git add .
          git commit -m "Configurar plantilla inicial del proyecto"]

Guardado. Tienes 1 commit en tu historial. Si quieres, te ayudo
a subir el proyecto a GitHub.
```

---

## Caso 2 · Subir el repo a GitHub la primera vez

```
Tú: sí, sube esto a GitHub

Claude: Necesito que estés autenticado en GitHub CLI primero.
Voy a comprobar.
[ejecuta: gh auth status]

No estás autenticado. Sigue estos pasos en la terminal que voy
a abrir:

1. Va a aparecer una pregunta sobre dónde quieres entrar.
   Responde "GitHub.com".
2. Protocolo: elige HTTPS.
3. Cuando pregunte cómo autenticarte, elige "Login with a web browser".
4. Te dará un código de 8 caracteres. Cópialo.
5. Se abre el navegador en una página de GitHub. Pega el código.

[ejecuta: gh auth login y guía al alumno paso a paso]

¿Listo? ¿Te dice "Logged in to github.com" en la terminal?

Tú: sí

Claude: Perfecto. Ahora, dos cosas:
- ¿Cómo quieres llamar al repo? Te sugiero: "app-habitos-david".
- ¿Lo quieres público (cualquiera lo ve) o privado (solo tú)?

Tú: app-habitos-david y privado de momento

Claude: Marchando.
[ejecuta: gh repo create app-habitos-david --private --source=. --remote=origin --push]

Listo. Tu repo está en:
https://github.com/david-ai-pro/app-habitos-david

Lo he configurado como remoto y he subido el commit. A partir de
ahora, cuando me digas "sube los cambios", lo hago sin más pasos.
```

---

## Caso 3 · Deshacer algo que se rompió

```
Tú: he tocado el archivo de estilos y la web se ve fatal,
quiero volver a como estaba

Claude (skill git-workflow): Voy a revisar qué tienes sin guardar.
[ejecuta: git status]

Tienes modificado solo el archivo "app/globals.css". El último
commit es de hace 23 minutos ("Ajustar paleta de colores del header").

Lo que voy a hacer: descartar todos los cambios en globals.css y
dejarlo como estaba en el último commit. Esto borra el trabajo que
has hecho ahí en los últimos 23 minutos. ¿Confirmas?

Tú: sí, confirmado

Claude: Hecho.
[ejecuta: git checkout -- app/globals.css]

El archivo está restaurado. Refresca la pestaña del navegador para
verlo como estaba.
```

---

## Caso 4 · Volver a la versión de ayer de un archivo concreto

```
Tú: el archivo de la página principal estaba mejor ayer,
recupéralo

Claude (skill git-workflow): Veo el historial de ese archivo.
[ejecuta: git log --oneline -10 -- app/page.jsx]

Aquí tienes las cinco últimas versiones:

  1. [hoy 16:30]   "Añadir filtro de hábitos por categoría"
  2. [hoy 14:12]   "Cambiar layout a grid de 3 columnas"
  3. [ayer 19:45]  "Refactor del componente HabitList"
  4. [ayer 17:20]  "Añadir validación de input de nombre"
  5. [ayer 11:08]  "Versión inicial de la página principal"

¿Cuál quieres recuperar? Si es "ayer", probablemente sea la 3 o la 4.

Tú: la 4

Claude: Hecho.
[ejecuta: git checkout <hash-de-la-4> -- app/page.jsx]

El archivo app/page.jsx está como estaba ayer a las 17:20. Todavía
no he hecho commit: si quieres conservar esta versión, dímelo y
guardo. Si prefieres volver a lo que tenías ahora, ejecuto un
checkout para restaurarlo.
```

---

## Caso 5 · Cerrar tarea del bucle SDD (commit automático)

Este es el flujo cuando el prompt maestro está activo y se acaba de cerrar una tarea con tests verdes y auditoría limpia:

```
Claude (Fase 4 del prompt maestro):
- ✓ Task 3 implementada: componente HabitForm con input + botón.
- ✓ auditoria-seguridad: sin hallazgos.
- ✓ tests-playwright: 4 tests en verde.

Toca commit. Propongo este mensaje:

  "Añadir formulario de creación de hábitos con validación
   básica de longitud"

¿Lo apruebas o lo cambias?

Tú: bien

Claude (skill git-workflow):
[ejecuta: git add .
          git commit -m "Añadir formulario de creación de hábitos..."]

Commit hecho (4 archivos). Marco la Task 3 como completada en
sdd/tasks.md y paso a la Task 4.
```
