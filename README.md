# Skills Vibe Coding Profesional

Repositorio oficial de las skills del módulo **Vibe Coding Profesional** de AIMAX Labs.

Una *skill* de Claude Code es un manual de instrucciones reutilizable que Claude lee cuando le pides una tarea concreta. Por ejemplo: "genera tests para esto" invoca la skill `tests-unitarios`, y Claude ya sabe exactamente qué herramienta usar, dónde guardar los archivos y cómo ejecutar las pruebas — sin que tengas que explicárselo cada vez.

---

## Qué hay dentro

Este repo se va completando clase a clase. La estructura final, al acabar el módulo, será esta:

| Carpeta | Para qué sirve | Clase del módulo |
|---|---|---|
| `tests-unitarios/` | Generar y ejecutar tests unitarios sobre la lógica del proyecto. | 5 |
| `tests-playwright/` | Generar y ejecutar tests end-to-end de la interfaz. | 5 |
| `auditoria-seguridad/` | Revisar el código en busca de fallos críticos antes de cada commit. | 6 |
| `git-workflow/` | Hacer commits y gestionar ramas conversacionalmente. | 7 |
| `pegar-error/` | Formatear un error de runtime para depurarlo con Claude. | 8 |
| `deploy-vercel/` | Publicar una app Next.js en Vercel. | 9 |
| `deploy-github-pages/` | Publicar una web estática en GitHub Pages. | 9 |
| `kit-vibe-coder/` | Compilación final del flujo completo. | 10 |

---

## Cómo se instala una skill

Cada carpeta de este repo es una skill independiente. Para usar una en tu proyecto:

1. **Descarga este repo** (botón verde `Code → Download ZIP`) o clónalo con git.
2. En tu proyecto, crea una carpeta llamada `.claude/skills/` (si no existe).
3. **Copia la carpeta de la skill** que quieras usar dentro de `.claude/skills/`.
4. Al abrir el proyecto con la app de escritorio de Claude, la skill se carga sola. Cuando le pidas algo que coincida con su descripción, Claude la invoca.

Ejemplo de estructura final dentro de tu proyecto:

```
tu-proyecto/
├── .claude/
│   └── skills/
│       ├── tests-unitarios/
│       ├── auditoria-seguridad/
│       └── git-workflow/
├── CLAUDE.md
└── (resto de tu proyecto)
```

Si prefieres tener las skills disponibles **en todos tus proyectos** sin copiarlas a cada uno, ponlas en `~/.claude/skills/` (Mac/Linux) o `C:\Users\TuNombre\.claude\skills\` (Windows). Es la versión global.

---

## Cómo se invoca una skill

No tienes que llamarla por su nombre exacto. Cada skill tiene una descripción que Claude lee, y la activa sola cuando detecta que tu petición encaja. Ejemplos:

| Tú escribes... | Claude invoca la skill... |
|---|---|
| *"genera tests para esta función"* | `tests-unitarios` |
| *"prueba que el botón de enviar funciona"* | `tests-playwright` |
| *"revisa este código antes de hacer commit"* | `auditoria-seguridad` |
| *"haz commit con lo que hemos cambiado"* | `git-workflow` |
| *"esto está fallando, mira el error"* | `pegar-error` |
| *"súbelo a Vercel"* | `deploy-vercel` |

También se invocan en automático cuando el **prompt maestro SDD** (Clase 3 del módulo) está activo y atraviesa cada tarea con sus quality gates.

---

## Licencia

MIT. Úsalas, modifícalas, compártelas. Si publicas algo construido con este flujo, una mención a AIMAX Labs siempre es bienvenida.

---

Hecho con vibe coding profesional · [AIMAX Labs](https://github.com/david-ai-pro) · [@david_ai_pro](https://instagram.com/david_ai_pro)
