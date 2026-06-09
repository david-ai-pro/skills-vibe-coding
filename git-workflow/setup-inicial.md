# Setup inicial · git-workflow

Esto se hace **una sola vez por ordenador**. La skill detecta automáticamente si te falta algún paso y te guía. Pero si quieres adelantarte, esto es lo que verás.

---

## Paso 1 · Instalar Git

Git es el sistema de versiones. Sin él, no hay nada que automatizar.

### Windows

1. Descarga el instalador de [git-scm.com/download/win](https://git-scm.com/download/win).
2. Ejecuta el `.exe`. Acepta todas las opciones por defecto (siguiente, siguiente, instalar).
3. Cierra y vuelve a abrir la app de escritorio de Claude.

### Mac

1. Abre el Terminal (o pídele a Claude que abra la terminal integrada).
2. Ejecuta `xcode-select --install`. Aparece un cuadro de diálogo del sistema. Acepta.
3. Espera 5-10 minutos a que descargue las Command Line Tools.

### Verificar

Para confirmar que Git está instalado, pídele a Claude que ejecute `git --version`. Debe responder con un número de versión (algo como `git version 2.46.0`).

---

## Paso 2 · Configurar tu nombre y email en Git

Estos datos quedan grabados en cada commit y son visibles públicamente si subes el repo a GitHub. Usa los mismos que tienes en GitHub.

La skill te pide estos datos la primera vez que vas a hacer commit y los configura sola. Si quieres hacerlo a mano, pídele a Claude:

```
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@ejemplo.com"
```

---

## Paso 3 · Instalar GitHub CLI (gh)

Esto es lo que permite a la skill **crear repositorios en GitHub directamente** sin que tengas que entrar a github.com cada vez.

### Windows

1. Descarga el instalador de [cli.github.com](https://cli.github.com/).
2. Ejecuta el `.msi`. Siguiente, siguiente, instalar.
3. Cierra y vuelve a abrir la app de Claude.

### Mac

1. Si tienes Homebrew: `brew install gh`.
2. Si no, descarga el instalador `.pkg` de [cli.github.com](https://cli.github.com/).

### Verificar

Pídele a Claude que ejecute `gh --version`. Debe responder con un número.

---

## Paso 4 · Conectar gh con tu cuenta de GitHub

Este es el paso crítico. Solo se hace una vez por ordenador.

1. **Crea cuenta en GitHub** si no tienes. En [github.com](https://github.com), regístrate con tu email. Es gratis.
2. En la app de Claude, pídele que ejecute `gh auth login`.
3. Claude te pregunta varias cosas en la terminal. Estas son las respuestas:
   - **What account do you want to log into?** → GitHub.com
   - **What is your preferred protocol for Git operations?** → HTTPS
   - **Authenticate Git with your GitHub credentials?** → Y (yes)
   - **How would you like to authenticate GitHub CLI?** → **Login with a web browser** (el más fácil)
4. Aparece un código de 8 caracteres (algo como `XXXX-XXXX`) y se abre tu navegador en una página de GitHub.
5. **Copia ese código y pégalo en la página de GitHub**. Autoriza.
6. Vuelves a la app de Claude. Si todo fue bien, dice `✓ Logged in to github.com`.

### Verificar

Pídele a Claude que ejecute `gh auth status`. Debe responder algo como:

```
github.com
  ✓ Logged in to github.com account tu-usuario
  - Active account: true
```

---

## Listo

Con estos cuatro pasos hechos, la skill `git-workflow` puede:

- Crear repositorios en GitHub directamente.
- Hacer push y pull sin pedirte contraseña cada vez.
- Configurar el repo remoto automáticamente.

A partir de aquí, le hablas en castellano a Claude (*"guarda esto"*, *"sube esto a internet"*, *"crea el repo"*) y la skill traduce a los comandos correctos. No vuelves a tocar la terminal.

---

## Resolución de problemas comunes

### "git no se reconoce como comando"

Git no está instalado o no se reconoce. Vuelve al Paso 1, instálalo y **cierra y reabre la app de Claude** (es el paso que más se olvida).

### "gh no se reconoce como comando"

Lo mismo pero con GitHub CLI. Vuelve al Paso 3.

### "Permission denied (publickey)" al hacer push

Esto pasa si en el Paso 4 elegiste SSH en vez de HTTPS. Vuelve a ejecutar `gh auth login` y elige **HTTPS** esta vez.

### "remote: Repository not found"

El repo remoto no existe. Si te lo pasa al hacer push, probablemente nunca se creó. Pídele a Claude *"crea el repo en GitHub"* y empieza desde ahí.
