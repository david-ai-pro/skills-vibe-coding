---
name: kit-vibe-coder
description: Índice maestro del kit completo de skills del módulo Vibe Coding Profesional. Orienta a Claude sobre qué otras skills hay disponibles en este proyecto, cuándo invocar cada una y cómo se enlazan dentro del flujo SDD. Se invoca cuando el usuario pregunta "qué skills tengo", "qué puedo hacer en este proyecto", "cómo arranco aquí", "ayúdame a planificar", o cuando Claude está perdido sobre por dónde empezar en un proyecto que tiene el kit instalado.
---

# Skill: kit-vibe-coder

Esta es la skill índice del kit completo del módulo **Vibe Coding Profesional** de AIMAX Labs. No es una skill operativa: no genera código ni ejecuta nada por su cuenta. Su trabajo es **orientar al resto del flujo** cuando Claude o el alumno necesitan situarse.

## Cuándo invocar esta skill

- Al **arrancar un proyecto nuevo** con el kit instalado, antes de cualquier otra skill, para confirmar qué herramientas hay disponibles.
- Cuando el alumno **se pierde** y pregunta cosas como *"qué hago ahora"*, *"qué skills tengo"*, *"qué puedo pedirte"*.
- Cuando Claude no sabe por dónde empezar y necesita un mapa del flujo.

## Qué hay en este proyecto

Si esta skill está cargada, el proyecto tiene también disponibles (siempre que se hayan copiado a `.claude/skills/`):

### Skills siempre activas en el bucle SDD

| Skill | Para qué |
|---|---|
| `auditoria-seguridad` | Revisar código antes de cada commit y antes del deploy. Detecta secretos hardcodeados, archivos sensibles, validación ausente, dependencias vulnerables, logs con info sensible. |
| `git-workflow` | Gestionar Git y GitHub conversacionalmente. Init, commits, push, pull, deshacer cambios, crear repos. |

### Skills de testing (Fase 4 del bucle)

| Skill | Para qué |
|---|---|
| `tests-unitarios` | Generar tests unitarios con Vitest (JS) o pytest (Python). Para lógica aislable. |
| `tests-playwright` | Generar tests end-to-end con Playwright. Para UI (Stack 1 y 2). |

### Skills de deploy (Fase 5)

| Skill | Para qué |
|---|---|
| `deploy-vercel` | Publicar apps Next.js (Stack 2) en Vercel con URL pública. |
| `deploy-github-pages` | Publicar webs estáticas (Stack 1) en GitHub Pages con URL pública. |

### Skill reactiva

| Skill | Para qué |
|---|---|
| `pegar-error` | Estructurar un error de runtime para depurarlo. Se invoca cuando algo falla. |

## El flujo completo del módulo

Cuando arranca un proyecto nuevo, el alumno debe:

1. Elegir un stack (1, 2 o 3) basado en lo que construye (web informativa, app interactiva o automatización).
2. Descargar la plantilla de ese stack (repos `stack-1-web-html`, `stack-2-app-nextjs`, `stack-3-automatizacion-python` en GitHub de david-ai-pro).
3. Instalar este kit de skills en `.claude/skills/` del proyecto.
4. Pegar el **prompt maestro SDD** (disponible en Google Drive del módulo) al chat de Claude con plan mode activo.

A partir de ahí, el prompt maestro orquesta automáticamente todas las skills siguiendo SDD:

```
Fase 0 · Entrevista     (Claude pregunta, alumno responde)
        ↓
Fase 1 · CLAUDE.md      (Claude genera el contexto del proyecto)
        ↓
Fase 2 · SDD            (Spec → Plan → Tasks en sdd/)
        ↓
Fase 3 · Skills activas (Claude lista las skills relevantes)
        ↓
Fase 4 · Bucle por tarea:
        Implementar
        → auditoria-seguridad
        → tests-unitarios / tests-playwright
        → git-workflow (commit)
        → marcar task como hecha
        → siguiente task
        ↓
Fase 5 · Cierre:
        → auditoria-seguridad pre-deploy (checklist completo)
        → deploy-vercel o deploy-github-pages
        → URL pública entregada
```

La skill `pegar-error` no aparece en el flujo lineal porque es reactiva: se invoca cuando algo falla en cualquier fase.

## Para Claude · cómo usar este índice

Cuando esta skill se cargue en una sesión:

1. **Lee primero** este SKILL.md para situarte.
2. **Lee también** el archivo `README-maestro.md` que está en esta misma carpeta — contiene la guía orientada al alumno.
3. Si el alumno pide algo que claramente cae en otra skill (por ejemplo, *"haz commit"* → `git-workflow`), invócala directamente sin pasar por aquí.
4. Si el alumno pide algo ambiguo (*"qué hago ahora"*, *"ayúdame a empezar"*), usa esta skill para orientar antes de actuar.
5. **Nunca confíes en que las skills existen**: verifica que la carpeta correspondiente está en `.claude/skills/` antes de invocar. Si falta una skill que el flujo necesita, dile al alumno cómo añadirla.

## Para el alumno · cómo usar este kit

Para una guía clara, lee el archivo [`README-maestro.md`](./README-maestro.md). Ahí está el orden recomendado, los atajos conversacionales y el mapa de problema → skill.
