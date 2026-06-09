---
name: tests-playwright
description: Generar y ejecutar tests end-to-end de interfaz con Playwright, simulando un usuario real que abre el navegador, hace clics, rellena formularios y verifica resultados. Se invoca cuando el usuario pide "prueba que la web funciona", "haz un test de la interfaz", "comprueba el flujo de uso", "test end-to-end", o cuando el prompt maestro SDD llega al paso de probar UI dentro de una tarea con interfaz.
---

# Skill: tests-playwright

Eres responsable de generar, ejecutar y mantener tests end-to-end con Playwright. Un test E2E lanza un navegador real, navega por la web del alumno como si fuera un usuario, y verifica que todo funciona de punta a punta. Es la diferencia entre probar una pieza aislada (tests unitarios) y probar el flujo completo del usuario.

## Cuándo aplica esta skill

- **Stack 1** (web HTML+CSS+JS) y **Stack 2** (Next.js): sí, son aplicaciones con interfaz.
- **Stack 3** (Python script): no aplica. Playwright es para web. Si el alumno está en Stack 3, dile que esta skill no se usa en su proyecto.

## Antes de generar nada

1. **Verifica el stack** leyendo CLAUDE.md o detectando archivos. Si es Stack 3, párate y avisa.

2. **Verifica que Playwright está instalado**. Si no:
   ```
   npm install -D @playwright/test
   npx playwright install
   ```
   El segundo comando descarga los navegadores reales (Chromium, Firefox, WebKit). Avisa al alumno: la primera vez tarda varios minutos y baja unos 300 MB.

3. **Crea la configuración base** (`playwright.config.js` en la raíz) si no existe:
   - URL base apuntando al servidor de desarrollo del alumno (`http://localhost:3000` para Next.js, `http://localhost:5500` o similar para web estática servida con un servidor local).
   - Solo Chromium por defecto, para no ralentizar.
   - Carpeta de tests en `tests/e2e/`.

## Qué generar

Por cada criterio de aceptación de la `sdd/spec.md` que implique interacción del usuario, genera un test E2E. Cada test sigue el patrón:

1. **Arrange**: navegar a la página inicial y dejar el estado limpio.
2. **Act**: simular las acciones del usuario (clics, escribir en inputs, navegar).
3. **Assert**: verificar que el resultado esperado está en pantalla.

Ejemplo: si la spec dice *"el usuario puede añadir un hábito escribiendo su nombre y pulsando enter"*, el test:
- Abre `localhost:3000`.
- Escribe "Beber agua" en el input.
- Pulsa enter.
- Verifica que aparece un elemento con texto "Beber agua" en la lista.

## Cómo se nombran

Archivos `.spec.js` o `.spec.ts` dentro de `tests/e2e/`. Un archivo por criterio de aceptación principal o por flujo coherente. Nombres descriptivos en kebab-case: `crear-habito.spec.js`, `marcar-completado.spec.js`, `reset-diario.spec.js`.

## Cómo se ejecutan

```
npx playwright test                    # ejecuta todos los tests sin abrir navegador
npx playwright test --headed           # ejecuta abriendo el navegador (útil para depurar)
npx playwright test crear-habito       # ejecuta solo uno
npx playwright show-report             # ve el informe HTML del último run
```

**Importante**: antes de ejecutar tests, asegúrate de que el servidor de desarrollo del alumno está corriendo en otra terminal (`npm run dev`). Si no, todos los tests fallarán con "página no encontrada".

## Después de generar

1. Arranca el servidor de desarrollo en una terminal aparte si no estaba.
2. Ejecuta los tests.
3. Si pasan en verde, dile al alumno qué flujos has cubierto.
4. Si alguno falla, párate. Enseña la captura de pantalla o el log del fallo. Propón corrección. No sigas con código nuevo hasta que estén en verde.

## Quality gate

Esta skill es uno de los gates obligatorios del flujo SDD cuando el proyecto tiene UI. Dentro del bucle de la Fase 4 del prompt maestro, ningún commit se hace si los tests E2E fallan. Si tras dos intentos no pasan:
- Revisa si el test pide algo que el código aún no implementa: posible bug en el test, no en el código.
- Revisa si el selector que usas (`.boton-enviar`, `text=Guardar`) coincide con lo que hay en el DOM real.
- Propón al alumno mover el test fallido a `tests/e2e/skipped/` con un comentario `// TODO: arreglar`.

## Lo que no haces

- No generas tests que dependan de servicios externos (APIs reales, pasarelas de pago) sin avisar y proponer un mock.
- No haces que el alumno tenga que ejecutar Playwright manualmente cada vez: tú lo orquestas.
- No saltas un test fallido sin que el alumno te lo apruebe explícitamente.
