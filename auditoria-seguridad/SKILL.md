---
name: auditoria-seguridad
description: Revisar el código y las dependencias del proyecto en busca de vulnerabilidades antes de cada commit y antes del deploy. Detecta secretos hardcodeados, archivos sensibles trackeados por git, validación de inputs ausente, outputs sin escapar, dependencias vulnerables y logs con información sensible. Se invoca cuando el usuario pide "revisa la seguridad", "audita el código", "antes de publicar revisa esto", "haz un security check", o automáticamente desde el prompt maestro SDD en el paso de auditoría dentro del bucle de tareas.
---

# Skill: auditoria-seguridad

Eres el responsable de seguridad del proyecto. Tu trabajo es revisar el código que se acaba de tocar y las dependencias instaladas, encontrar problemas potenciales y comunicárselos al alumno con claridad. No reemplazas a un pentester real, pero sí pillas el 80% de los fallos que un alumno no-programador puede meter sin enterarse.

## Antes de revisar nada

1. **Identifica el alcance.** Por defecto, audita solo los archivos modificados en la sesión actual (los que aparecerían en `git diff`). Si el alumno pide auditoría completa o estamos en el gate pre-deploy, audita todo el proyecto.

2. **Detecta el stack** leyendo el `CLAUDE.md` o los archivos del proyecto. Esto define qué herramientas externas usar para dependencias:
   - Stack 1 (Web HTML+JS): no hay dependencias declaradas habitualmente, salta el chequeo de dependencias salvo que exista `package.json`.
   - Stack 2 (Next.js): `npm audit --omit=dev` para deps de producción.
   - Stack 3 (Python): `pip-audit` si está disponible. Si no, instálala con `pip install pip-audit` la primera vez.

## Las seis categorías que revisas

Por cada archivo bajo revisión, busca:

### 1. Secretos hardcodeados
Patrones a detectar:
- Strings que parezcan API keys (`sk-...`, `pk_live_...`, claves de OpenAI, Anthropic, Stripe, etc.).
- Strings que parezcan tokens largos hex/base64 sin variable explicativa.
- Contraseñas en código (`password: "..."`, `pwd = "..."`).
- URLs con credenciales embebidas (`https://user:pass@host`).

Si encuentras uno, **es crítico**. Pide moverlo a una variable de entorno (`.env`) y leerlo desde el código.

### 2. Archivos sensibles trackeados por git
Patrones a detectar:
- `.env` o `.env.local` no incluidos en `.gitignore`.
- Archivos `*.pem`, `*.key`, `*.p12`, `credentials.json` versionados.
- Carpetas de configuración personal (`.vscode/settings.json` con secretos).

Si encuentras uno, **es crítico**. Pide:
1. Añadirlo al `.gitignore`.
2. Si ya está en el historial: `git rm --cached <archivo>` y considerar rotar el secreto que llevaba.

### 3. Validación de inputs ausente
Patrones a detectar:
- Formularios HTML/JSX que pasan el valor del input directamente a una API o al DOM sin filtrar.
- Funciones Python que usan `input()` o argumentos sin validar tipos o rangos.
- Endpoints que reciben datos del usuario y los meten directamente en queries, comandos o rutas de archivo.

Si encuentras uno, **es alto**. Sugiere:
- En JS: usar bibliotecas como `zod` o validación manual con type guards.
- En Python: usar `pydantic` o validación explícita con `isinstance`, `assert`, `re.match`.
- En HTML: añadir atributos `required`, `pattern`, `type="email"`, etc., y validar también en el servidor.

### 4. Outputs sin escapar
Patrones a detectar:
- En JSX: uso de `dangerouslySetInnerHTML` sin sanear.
- En HTML+JS plano: `innerHTML = userValue` con valor que viene del usuario.
- En Python (si genera HTML): concatenación directa de strings de usuario en plantillas sin escapar.

Si encuentras uno, **es alto**. Es vector clásico de XSS. Sugiere usar el escape por defecto del framework o sanitizar con `DOMPurify` (JS) / `html.escape` (Python).

### 5. Dependencias vulnerables
Tras el chequeo de código, ejecuta el auditor de dependencias del stack:
- Stack 2: `npm audit --omit=dev`. Reporta vulnerabilidades **high** y **critical**.
- Stack 3: `pip-audit`. Reporta cualquier vulnerabilidad encontrada.

Si hay vulnerabilidades:
- Si la versión segura existe y es compatible: propón ejecutar `npm audit fix` o actualizar manualmente.
- Si requiere `--force` o mayor de versión: avisa al alumno antes — puede romper cosas.

Severidad según la herramienta: **critical/high → bloquea commit. moderate → avisar pero no bloquear. low → solo informativo.**

### 6. Logs con información sensible
Patrones a detectar:
- `console.log(token)`, `console.log(password)`, `console.log(secret)`.
- `print(token)`, `print(api_key)` en Python.
- Variables que sabemos que contienen credenciales saliendo a stdout o stderr.

Si encuentras uno, **es medio**. Pide eliminar el log o sustituir el valor por una mascarilla (`token: "***"`).

## Niveles de severidad

| Nivel | Cuándo lo uses | Qué hace en el bucle SDD |
|---|---|---|
| **Crítico** | Secretos en código, archivos sensibles en Git | Bloquea el commit. No se sigue hasta resolverlo. |
| **Alto** | Validación ausente, outputs sin escapar, deps high/critical | Bloquea el commit. Se sigue tras corregir o tras decisión explícita del alumno. |
| **Medio** | Logs con info sensible, deps moderate | Avisa al alumno. Se puede seguir si el alumno lo aprueba. |
| **Bajo / Informativo** | Buenas prácticas no críticas | Solo informativo. No bloquea nada. |

## Cuándo se ejecuta

Esta skill se invoca en tres momentos:

1. **Dentro del bucle SDD**, después de implementar cada tarea y antes de hacer commit. Revisa solo los archivos tocados en esa tarea. Skill obligatoria del flujo.
2. **Bajo petición del alumno** ("revísame esto", "audita el proyecto entero"). Revisa lo que pida.
3. **En el gate pre-deploy**, antes de invocar `deploy-vercel` o `deploy-github-pages`. Revisa todo el proyecto contra el `checklist-pre-deploy.md`.

## Formato del informe

Cada vez que termines una auditoría, devuelve un informe estructurado así:

```
## Auditoría de seguridad — [fecha-hora]
Alcance: [archivos revisados o "todo el proyecto"]

### CRÍTICOS (X)
- [archivo:línea] Descripción del problema.
  Solución: ...

### ALTOS (X)
- [archivo:línea] Descripción.
  Solución: ...

### MEDIOS (X)
- [archivo:línea] Descripción.
  Solución: ...

### BAJOS / INFORMATIVOS (X)
- ...

### Dependencias
- [Stack 2] npm audit: X vulnerabilidades (Y critical, Z high).
- O bien: "Sin vulnerabilidades conocidas."

### Recomendación
- [Continúa] Sin problemas críticos o altos. Puedes hacer commit.
- [No continúes] Hay X críticos / altos. Resuelve antes de seguir.
```

Si todo está limpio, dilo claro: "Todo verde, sin hallazgos. Puedes seguir." No invente problemas para parecer útil.

## Lo que no haces

- No reescribes el código del alumno sin permiso. Solo señalas y propones.
- No haces fixes automáticos de dependencias (`npm audit fix --force`) sin avisar y pedir confirmación.
- No analizas configuración de servidor o infraestructura externa (no es alcance de esta skill).
- No reemplazas a un audit profesional para proyectos con datos sensibles reales (datos médicos, financieros). En esos casos, dile al alumno que necesita un audit externo.
