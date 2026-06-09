# Ejemplo de informe que genera la skill

Este es un ejemplo realista de lo que Claude te entrega después de invocar la skill `auditoria-seguridad` sobre una tarea recién implementada. Sirve para que sepas qué esperar.

---

## Auditoría de seguridad — 2026-06-15 18:42

**Alcance**: archivos modificados en la última tarea (Task 4 — Integrar API de OpenAI para autocompletar hábitos).

### CRÍTICOS (1)

- **`app/lib/openai.js:8`** — Hay una API key de OpenAI hardcodeada directamente en el archivo (`const apiKey = "sk-proj-xxx...";`).
  Esto es público en cuanto subas el proyecto. Cualquiera que vea el código tendrá acceso a tu cuenta y a tu crédito de OpenAI.

  **Solución**:
  1. Mueve la clave a un archivo `.env.local` en la raíz del proyecto:
     ```
     OPENAI_API_KEY=sk-proj-xxx...
     ```
  2. En el código, léela con `process.env.OPENAI_API_KEY`.
  3. Verifica que `.env.local` está en `.gitignore` (debería estarlo en la plantilla del Stack 2).
  4. **Si ya hiciste commit antes**: rota la clave en el dashboard de OpenAI. La anterior queda comprometida aunque la borres del código.

### ALTOS (1)

- **`app/components/HabitForm.jsx:23`** — El input del usuario se pasa directamente a `fetch()` sin validación previa.
  Riesgo: si el usuario escribe algo malicioso o muy largo, puede romper la petición o (en el peor caso) ser usado para ataques contra la API.

  **Solución**: añade validación antes del `fetch`:
  ```js
  if (!nombre.trim() || nombre.length > 100) return;
  ```

### MEDIOS (1)

- **`app/lib/openai.js:15`** — Hay un `console.log(response)` que en algunos casos imprime la respuesta completa de la API, incluyendo el token de uso. No es crítico porque solo se ve en la consola del navegador, pero conviene limpiar antes de publicar.

  **Solución**: elimina el `console.log` o sustitúyelo por `console.log("Respuesta recibida")` sin el objeto.

### BAJOS / INFORMATIVOS (0)

(Sin hallazgos en este nivel.)

### Dependencias

- **npm audit (Stack 2)**: 2 vulnerabilidades encontradas.
  - 1 **high** en `lodash@4.17.20` (transitiva de `next@14.1.0`). Solución: `npm audit fix` actualiza a `4.17.21` que es compatible.
  - 1 **moderate** en `@babel/traverse@7.20.0`. Solución: `npm audit fix`. Aprobada por ti antes para no romper nada.

### Recomendación

**No continúes con el commit.** Hay 1 crítico y 1 alto que bloquean. Resuelve la API key (la más urgente) y la validación del input antes de seguir. El medio puedes posponerlo si quieres, pero no esperes mucho.

Cuando esté arreglado, vuelve a invocar la auditoría: si sale verde, te doy luz para hacer commit con la skill `git-workflow`.
