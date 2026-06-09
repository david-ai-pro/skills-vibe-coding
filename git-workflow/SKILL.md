---
name: git-workflow
description: Gestionar Git y GitHub conversacionalmente para el alumno no-técnico. Cubre init, add, commit, push, pull, ver historial, deshacer cambios sin commit, recuperar archivos de commits antiguos y crear repositorios en GitHub usando gh CLI. Se invoca cuando el usuario pide "guarda esto", "haz commit", "sube esto a internet", "crea el repo en GitHub", "vuelve atrás", "qué cambios he hecho", "recupera el archivo X de ayer", o automáticamente desde el prompt maestro SDD al cerrar cada tarea.
---

# Skill: git-workflow

Eres responsable de toda la gestión de Git y GitHub del alumno. El alumno **no escribe comandos**: tú los ejecutas en la terminal integrada. El alumno habla en castellano natural y tú traduces a la operación de git correspondiente.

## Antes de cualquier operación

1. **Verifica que Git está instalado** ejecutando `git --version`. Si no:
   - Windows: descargar de [git-scm.com](https://git-scm.com/download/win).
   - Mac: viene con Xcode Command Line Tools, instalable con `xcode-select --install`.
   Para al alumno y guíalo antes de seguir.

2. **Verifica que el proyecto es un repositorio Git** mirando si existe la carpeta `.git/`. Si no:
   - Si el alumno acaba de pedir guardar por primera vez: ejecuta `git init` automáticamente y avísale (*"He inicializado el repositorio. A partir de ahora puedo guardar tu progreso en versiones."*).
   - Si pide otra operación que requiere repo: avisa de que aún no está inicializado y propón inicializarlo.

3. **Verifica configuración de usuario** una sola vez por ordenador:
   - `git config --global user.name` y `git config --global user.email`.
   - Si están vacíos, pregúntale al alumno qué nombre y email quiere usar y configúralos. Le explicas que estos datos aparecerán en sus commits y son públicos si sube el repo.

## Operaciones que cubres

### 1. Guardar progreso (add + commit)

Cuando el alumno dice algo como *"guarda lo que hemos hecho"*, *"haz commit"*, *"que esto quede registrado"*:

1. Ejecuta `git status` para ver qué hay sin guardar.
2. Resume al alumno los cambios pendientes: cuántos archivos modificados, cuántos nuevos.
3. Propón un mensaje de commit en castellano natural y descriptivo. **Sin prefijos técnicos** como `feat:`, `fix:` o `chore:`. Ejemplo correcto: *"Añadir sección de testimonios y ajustar estilos del header"*.
4. Pídele confirmación del mensaje (puede cambiarlo).
5. Ejecuta `git add .` y `git commit -m "mensaje"`.
6. Confirma al alumno que se guardó y dile cuántos archivos entraron.

### 2. Subir a GitHub (push)

Cuando el alumno dice *"sube esto a internet"*, *"publica el repo"*, *"manda esto a GitHub"*:

1. Verifica si hay remoto configurado: `git remote -v`.
2. Si no hay remoto, sigue el flujo "Crear repositorio en GitHub" (más abajo).
3. Si ya hay remoto, ejecuta `git push -u origin main` (o la rama actual).
4. Confirma al alumno con la URL pública del repo.

### 3. Crear repositorio en GitHub

Cuando es la primera vez que se sube y no hay remoto:

1. **Verifica que `gh` está instalado y autenticado** con `gh auth status`. Si no:
   - Si no está instalado: dile al alumno que descargue GitHub CLI de [cli.github.com](https://cli.github.com/) (instalador para Windows y Mac).
   - Si no está autenticado: ejecuta `gh auth login` y guía al alumno paso a paso:
     - Elegir GitHub.com (no enterprise).
     - Protocolo HTTPS.
     - Autenticar con navegador web (más sencillo que con token).
     - Confirmar con el código que aparece en pantalla.

2. Pregúntale al alumno:
   - ¿Cómo se llama el repo? (sugiere el nombre de la carpeta del proyecto si no tiene opinión).
   - ¿Público o privado?
   - ¿Una descripción corta?

3. Ejecuta:
   ```
   gh repo create <nombre> --<public|private> --source=. --remote=origin --push --description "<descripcion>"
   ```

4. Confirma al alumno con la URL final.

### 4. Bajar cambios (pull)

Si el alumno trabaja desde varios sitios o colabora con alguien:

1. Cuando dice *"actualiza lo que haya en GitHub"*, *"baja los últimos cambios"*: ejecuta `git pull`.
2. Si hay conflictos: párate, no intentes resolver automáticamente. Explica al alumno qué archivos chocan y propón mirar uno por uno con su ayuda.

### 5. Ver historial

Cuando el alumno dice *"qué cambios he hecho"*, *"enséñame el historial"*, *"qué guardé ayer"*:

1. Ejecuta `git log --oneline -20` para ver los últimos 20 commits.
2. Traduce los mensajes al alumno en lista legible: fecha, mensaje, archivos tocados.

### 6. Deshacer cambios sin guardar

Cuando el alumno dice *"deshaz lo que hemos hecho"*, *"vuelve a antes de tocar esto"* y todavía no se ha hecho commit:

1. Ejecuta `git status` para confirmar qué hay sin guardar.
2. Avisa al alumno: *"Vamos a perder los cambios sin guardar de estos archivos: X, Y, Z. ¿Seguro?"*.
3. Si confirma: `git checkout -- .` (o archivos específicos si solo quiere deshacer algunos).
4. Si hay archivos nuevos sin trackear: `git clean -fd` (también con confirmación previa explícita).

### 7. Recuperar archivo de un commit antiguo

Cuando el alumno dice *"vuelve a la versión de ayer del archivo X"*, *"recupera ese archivo como estaba antes"*:

1. Muestra el historial del archivo: `git log --oneline -10 -- <archivo>`.
2. Pídele al alumno qué versión quiere (le explicas las dos o tres últimas en castellano).
3. Ejecuta `git checkout <hash> -- <archivo>` para sobrescribir el archivo con esa versión.
4. Avisa al alumno: el archivo está restaurado pero todavía no se ha hecho commit. Tiene que decidir si guarda la restauración o vuelve atrás.

### 8. Volver a un commit anterior (manteniendo historial)

Cuando el alumno dice *"vuelve a como estaba en aquel momento"* y se refiere a todo el proyecto:

1. Muestra el historial general.
2. Pídele al alumno qué commit usar.
3. Ejecuta `git revert <hash>` para crear un nuevo commit que deshace los cambios. **Nunca `git reset --hard`** sin permiso explícito; el revert mantiene historial seguro.

### 9. Ver qué hay en un commit concreto

Cuando el alumno dice *"qué cambié en aquel commit"*, *"qué entró en X"*:

1. Ejecuta `git show <hash>` para ver el diff.
2. Resume al alumno: archivos tocados, qué se añadió, qué se quitó, en lenguaje natural.

## Convenciones de mensajes de commit

Los mensajes que generes deben:

- Estar en castellano.
- Empezar por un verbo en infinitivo o gerundio (*"Añadir..."*, *"Corregir..."*, *"Actualizar..."*, *"Eliminar..."*).
- Ser descriptivos pero cortos (entre 5 y 12 palabras).
- No usar prefijos técnicos (feat:, fix:, chore:). Tu audiencia es no-programadora.
- No mencionar IDs de tarea ni jerga interna.

Ejemplos válidos:
- *"Añadir sección de testimonios con tres tarjetas en grid"*
- *"Corregir el botón de envío que no llamaba a la función"*
- *"Mover la clave de OpenAI a variable de entorno"*

## Integración con el bucle SDD

Esta skill es la pieza que cierra cada tarea del prompt maestro SDD. Después de que la tarea pase la skill `auditoria-seguridad` y los tests estén en verde:

1. Generas un mensaje de commit basado en el título de la tarea de `tasks.md` y en los archivos modificados.
2. Pides confirmación rápida al alumno del mensaje.
3. Ejecutas el commit.
4. Marcas la tarea como `[x]` en `sdd/tasks.md`.

No es necesario push después de cada commit. El push se hace cuando el alumno lo pide explícitamente o cuando el flujo llega al deploy.

## Cuándo paras y pides confirmación explícita

- Antes de cualquier operación destructiva (`git checkout --`, `git clean`, `git revert`).
- Antes de la primera creación de repositorio en GitHub (público vs privado).
- Antes de configurar nombre/email global de Git por primera vez.
- Si detectas un conflicto durante pull o merge.
- Si el commit que se va a hacer incluye archivos sospechosos (cualquier cosa que la skill `auditoria-seguridad` haya marcado como crítica).

## Lo que no haces

- **No haces `git push --force`** bajo ninguna circunstancia sin instrucción explícita y repetida del alumno.
- **No haces `git reset --hard`** salvo que el alumno entienda exactamente lo que pierde y lo confirme dos veces.
- **No haces rebase interactivo**: queda fuera del alcance del módulo. Usa revert o pide al alumno volver a hacer la operación.
- **No creas ramas adicionales** salvo que el alumno lo pida explícitamente. Para el flujo del módulo, todo va en `main`.
- **No haces pull requests** automáticamente. Si el alumno colabora con alguien, le explicas que abra la PR en github.com directamente (es más visual para no-técnicos).
- **No tocas el repo de otra gente** ni configuraciones globales del sistema más allá de `user.name` y `user.email`.
