# Kit Vibe Coder · guía para el alumno

Bienvenido. Si estás leyendo esto, ya tienes el kit completo instalado en tu proyecto. Esto es lo que puedes hacer a partir de aquí.

---

## Las 8 skills que tienes ahora

| Skill | Para qué la usas | Cuándo se activa sola |
|---|---|---|
| `auditoria-seguridad` | Revisa tu código antes de cada commit y antes de publicar. | Antes de cada commit (auto) y bajo petición ("audita esto"). |
| `tests-unitarios` | Genera tests que prueban funciones aisladas. | "Haz tests para esto" o desde el bucle SDD. |
| `tests-playwright` | Genera tests que prueban el flujo del usuario en navegador. | "Prueba que la web funciona" o desde el bucle SDD. |
| `git-workflow` | Gestiona Git y GitHub sin tocar comandos. | "Guarda esto", "sube a GitHub", "vuelve atrás". |
| `pegar-error` | Estructura un error para depurarlo contigo. | "No funciona", "tengo un error", "pantalla blanca". |
| `deploy-vercel` | Publica apps Next.js en Vercel. | "Súbelo a Vercel" o desde el bucle SDD (Stack 2). |
| `deploy-github-pages` | Publica webs estáticas en GitHub Pages. | "Súbelo a Pages" o desde el bucle SDD (Stack 1). |
| `kit-vibe-coder` | Te orienta cuando no sabes qué hacer. | "Qué puedo hacer aquí", "ayúdame a empezar". |

---

## El atajo conversacional

Si estás perdido, dile a Claude alguna de estas frases. Es lo único que necesitas recordar:

| Lo que dices | Lo que pasa |
|---|---|
| *"qué skills tengo en este proyecto"* | `kit-vibe-coder` te lista todo lo disponible. |
| *"vamos a arrancar un proyecto"* | Te recuerda pegar el prompt maestro SDD. |
| *"guarda esto"* | `git-workflow` hace commit. |
| *"sube esto a internet"* | `deploy-vercel` o `deploy-github-pages` según tu stack. |
| *"revísame la seguridad"* | `auditoria-seguridad` audita el código. |
| *"haz tests"* | `tests-unitarios` o `tests-playwright` los generan. |
| *"no funciona"* | `pegar-error` estructura el problema antes de tocar nada. |
| *"vuelve atrás"* | `git-workflow` deshace cambios. |

---

## Si arrancas un proyecto nuevo

El flujo recomendado, siempre:

### 1. Elige tu stack

| Si construyes... | Usa Stack... | Plantilla en... |
|---|---|---|
| Una web informativa, portfolio, landing | 1 (HTML+CSS+JS) | `github.com/david-ai-pro/stack-1-web-html` |
| Una aplicación con usuarios, formularios, datos | 2 (Next.js) | `github.com/david-ai-pro/stack-2-app-nextjs` |
| Una automatización local (organizar archivos, scripts) | 3 (Python) | `github.com/david-ai-pro/stack-3-automatizacion-python` |

### 2. Descarga la plantilla

Code → Download ZIP. Descomprime donde quieras tener tu proyecto.

### 3. Abre el proyecto con la app de Claude

Archivo → Abrir carpeta → seleccionar la del proyecto.

### 4. Instala el kit de skills

Pégale a Claude el prompt de instalación de skills (lo tienes en el HTML de la Clase 10). En 30 segundos están las 8 skills en `.claude/skills/` de tu proyecto.

### 5. Activa plan mode y pega el prompt maestro SDD

Está en Google Drive (link en el HTML de la Clase 3 del módulo). Lo pegas en el chat. Claude empieza la entrevista. A partir de ahí, sigue el flujo. El método se ejecuta solo.

---

## Cuando estés bloqueado

| Bloqueo | Qué hacer |
|---|---|
| *"No sé qué construir"* | Pequeño y útil. Algo que tú mismo necesitarías mañana. Reglas: una sola funcionalidad principal, sin login, sin DB remota. |
| *"Tengo un error y no entiendo nada"* | Para. Di *"pegar-error"*. Sigue el proceso. No cambies cosas en pánico. |
| *"Llevo una hora intentando y empeora"* | Para. Di *"vuelve al último commit estable"*. Reagrupa. |
| *"No sé qué stack usar"* | Lee la matriz de la Clase 2. Si dudas: la cosa más simple que cumpla tu idea. |
| *"Claude se inventa cosas que no le pedí"* | Plan mode. Siempre. Especialmente en las primeras tareas de un proyecto. |

---

## Lo que NO necesitas saber

Después de este módulo te sientes como un programador. **No lo eres todavía**, y eso está bien. Lo que has aprendido es a usar Claude como copiloto serio. La parte que no necesitas dominar:

- Cómo funciona React por dentro.
- Cómo escribir tests a mano.
- Cómo gestionar dependencias de npm.
- Sintaxis avanzada de Git.
- DNS, certificados SSL, configuración de servidor.

Cuando lo necesites, Claude te lo explica en el momento. Tú decides qué construir y revisas que lo construido tiene sentido. Esa es tu parte. La otra es de él.

---

## Si te animas a aprender de verdad

Después del módulo, si quieres dar el siguiente paso:

- **HTML, CSS y JavaScript** — los fundamentos web. MDN Web Docs es gratis y muy bueno.
- **Cómo funciona React** — si te enganchaste a Stack 2, el tutorial oficial de React.dev es claro.
- **Python** — Automate the Boring Stuff (libro gratuito online) si Stack 3 te gustó.
- **Git de verdad** — el libro "Pro Git" gratuito en git-scm.com.

No es obligatorio. Vibe coding funciona perfectamente sin profundizar. Pero si quieres entender más, ahí tienes el siguiente nivel.

---

Hecho con vibe coding profesional · [AIMAX Labs](https://github.com/david-ai-pro) · [@david_ai_pro](https://instagram.com/david_ai_pro)
