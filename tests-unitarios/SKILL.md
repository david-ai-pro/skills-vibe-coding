---
name: tests-unitarios
description: Generar y ejecutar tests unitarios automáticos sobre la lógica del proyecto, detectando el stack y usando la herramienta adecuada (Vitest para JS/Next.js, pytest para Python). Se invoca cuando el usuario pide "genera tests", "haz tests para esto", "prueba esta función", "cubre esto con tests", o cuando el prompt maestro SDD llega al paso de generar tests dentro de una tarea.
---

# Skill: tests-unitarios

Eres responsable de generar, ejecutar y mantener tests unitarios para el proyecto del alumno. Un test unitario prueba una pieza pequeña de lógica de forma aislada (una función, un componente, un módulo) y verifica que se comporta como debe.

## Antes de generar nada

1. **Detecta el stack del proyecto** leyendo el archivo CLAUDE.md de la raíz o, si no existe, mirando los archivos:
   - Si hay `package.json` con Next.js → usa **Vitest** + React Testing Library.
   - Si hay `package.json` sin framework → usa **Vitest** puro.
   - Si hay `main.py` o `requirements.txt` → usa **pytest**.
   - Si es solo HTML/CSS/JS plano → propón al alumno **Vitest** para la parte de JS si tiene lógica; si es solo presentacional, dile que tests unitarios no aplican y propón saltar a tests Playwright.

2. **Verifica que la herramienta está instalada**. Si no:
   - Vitest: `npm install -D vitest @vitest/ui` y, si hay React, `npm install -D @testing-library/react @testing-library/jest-dom jsdom`.
   - pytest: con el entorno virtual activado, `pip install pytest` y añadirlo a `requirements.txt`.

3. **Crea la carpeta de tests si no existe**:
   - JS/Next.js: `tests/` en la raíz, o tests junto al archivo con sufijo `.test.js` / `.test.jsx`.
   - Python: `tests/` en la raíz.

## Qué generar

Por cada pieza de lógica relevante:

- **Test del caso feliz**: la pieza funciona con entradas normales.
- **Test de casos límite**: entradas vacías, valores extremos, fallos esperados.
- **Test de errores**: la pieza falla de forma controlada cuando debe fallar.

No tests triviales. No tests que solo verifican que un componente se renderiza sin mirar nada útil. Cada test debe poder fallar por una razón real.

## Cómo se nombran

| Stack | Patrón |
|---|---|
| Next.js / JS | `nombre-de-la-pieza.test.js` o `.test.jsx` |
| Python | `test_nombre_de_la_pieza.py` |

## Cómo se ejecutan

| Stack | Comando |
|---|---|
| Vitest | `npm run test` (añade `"test": "vitest"` al `package.json` si no existe) |
| pytest | `pytest` (con el entorno virtual activado) |

## Después de generar

1. Ejecuta los tests automáticamente.
2. Si todos pasan en verde, dile al alumno qué has cubierto y cuántos tests son.
3. Si alguno falla, **párate**, enseña el fallo concreto al alumno y propón cómo arreglarlo. No sigas adelante con código nuevo hasta que estén en verde.

## Quality gate

Esta skill es uno de los gates obligatorios del flujo SDD. Cuando se invoca dentro del bucle de la Fase 4 del prompt maestro, ningún commit se hace hasta que los tests pasan en verde. Si tras dos intentos no pasan, comunica al alumno el bloqueo y propón:
- Simplificar el test (si está pidiendo demasiado).
- Simplificar la pieza de código (si tiene demasiada responsabilidad).
- Mover el test a `tests/skipped/` con un comentario `# TODO: arreglar` y avisar al alumno explícitamente.

## Lo que no haces

- No generas tests que dependen de servicios externos (APIs, bases de datos remotas) sin avisar.
- No tocas código de producción dentro de esta skill: solo creas o modificas archivos de tests.
- No saltas un test fallido sin que el alumno te lo apruebe explícitamente.
