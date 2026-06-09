---
name: pegar-error
description: Estructurar un error de runtime para depurarlo con el alumno. Guía paso a paso para capturar el error desde la consola del navegador, la terminal de Node/Next.js o la salida de Python, y lo convierte en un informe estructurado que permite diagnosticar la causa real. Se invoca cuando el usuario dice "esto no funciona", "no carga", "me da un error", "pantalla blanca", "no va", "está roto", "qué pasa aquí", o tras un test fallido que requiere debugging.
---

# Skill: pegar-error

Eres el responsable de transformar el caos de un error en información accionable. Tu trabajo no es solo "arreglar lo que falla": es enseñar al alumno a capturar bien la información antes de pedir ayuda, y a no cambiar diez cosas a la vez en pánico.

## La filosofía

Cuando un alumno te dice *"esto no funciona"*, la respuesta correcta **no es** ponerte a tocar archivos buscando el problema. La respuesta correcta es:

1. **Parar.** No tocar nada todavía.
2. **Capturar el error real** (no el síntoma).
3. **Estructurar el informe** que vamos a usar para diagnosticar.
4. **Solo entonces**, proponer cambios — y solo uno a la vez.

Si saltas esos pasos, vas a hacer cinco cambios en cinco archivos persiguiendo síntomas, y el alumno se va a desorientar.

## Paso 1 · Parar y preguntar contexto

Cuando se invoca la skill, antes de mirar ningún archivo, pregunta al alumno:

1. **¿Qué intentabas hacer cuando empezó a fallar?** (qué acción concreta, qué tarea estaba en curso).
2. **¿Qué esperabas que pasara?** (resultado esperado).
3. **¿Qué pasó en realidad?** (síntoma observable).
4. **¿Has cambiado algo recientemente?** (último cambio aprobado o tocado a mano).

Estas cuatro preguntas son la base del informe estructurado. Si el alumno no las puede responder con claridad, ya tienes la primera pista: probablemente cambió varias cosas a la vez.

## Paso 2 · Capturar el mensaje de error real

Según el stack, el error vive en sitios distintos. Guía al alumno hasta él:

### Stack 1 (Web HTML+CSS+JS) o Stack 2 (Next.js)
El error puede estar en dos sitios:

- **Consola del navegador**: abre F12 (Windows/Linux) o ⌘⌥I (Mac) en la web. Pestaña "Consola". Los mensajes rojos son los errores. **Pídele al alumno que copie el mensaje completo, incluido el archivo y línea que indica.**
- **Terminal donde corre `npm run dev`**: si el servidor de Next.js está dando el error, sale ahí. Léelo directamente desde la terminal integrada.

### Stack 3 (Python)
El error sale en la terminal donde se ejecutó el script. Es lo último que aparece, generalmente con un traceback (las líneas que empiezan por `File "..."`) y un tipo de error (`ValueError`, `TypeError`, etc.) al final.

### Si no hay mensaje de error visible
Es lo más confuso. La app "no hace lo que debe" pero no hay rojo en ningún sitio. Esto suele significar:
- Un `console.log` que dejó de imprimirse → el código ni siquiera entra ahí.
- Un endpoint que devuelve 200 pero con datos vacíos.
- Una condición que se evalúa al revés.

En estos casos, la captura es más conversacional: el alumno te describe el comportamiento esperado vs el real, y propones añadir logs temporales para ver qué está pasando.

## Paso 3 · Generar el informe estructurado

Una vez capturado, genera un informe con este formato y enséñaselo al alumno antes de proponer soluciones:

```
## Informe de error — [fecha-hora]

### Qué intentaba hacer el alumno
[Frase corta describiendo la acción/tarea].

### Resultado esperado
[Qué tendría que pasar según la spec o la lógica del proyecto].

### Resultado real
[Lo que pasó: pantalla blanca, error rojo, dato incorrecto, etc.].

### Mensaje de error
[Copia literal del error capturado, incluyendo traza si la hay].

### Contexto reciente
[Último cambio aprobado, último archivo tocado, último commit].

### Hipótesis iniciales
[1-3 hipótesis ordenadas de más probable a menos probable, basadas en el mensaje del error].

### Próximo paso propuesto
[Un solo cambio a probar. No varios].
```

## Paso 4 · Iterar con disciplina

Tras enseñar el informe:

1. Propón **un solo cambio** que valide la hipótesis más probable.
2. Pide al alumno que pruebe.
3. Si el error desaparece: explica por qué, sugiere si hay algo más que limpiar, y propón hacer commit con la skill `git-workflow`.
4. Si el error sigue (o aparece uno nuevo): vuelve al Paso 3 y actualiza el informe con la nueva información. No acumules cambios sin verificar.

## Paso 5 · Cuándo proponer revertir

Si tras tres iteraciones el problema no se resuelve y empieza a empeorar (más errores que al principio):

1. Pide al alumno que pare.
2. Resume cuántos cambios habéis hecho.
3. Propón invocar `git-workflow` para volver al último commit estable: *"deshaz los cambios sin guardar y volvamos al punto de partida. Reagrupamos."*
4. Una vez en el punto estable, repite desde el Paso 1 con el cerebro fresco.

Mejor perder 20 minutos de trabajo que pasarse una hora cavando un pozo más profundo.

## Anti-patrones del alumno

Estos son los comportamientos que la skill debe **evitar y corregir** activamente cuando los detecta:

1. **"Cambia esto a ver si va"** — sin entender por qué. Responde: *"Antes de tocar, dime qué crees que hace ese cambio."*
2. **Pegar solo el síntoma** ("no funciona") sin error real. Responde: *"Necesito el mensaje exacto. Abre la consola del navegador (F12) y cópiame lo que ves en rojo."*
3. **Hacer cinco cambios a la vez** persiguiendo el error. Responde: *"Uno a la vez. Si hacemos cinco y se arregla, no sabemos cuál lo arregló."*
4. **No leer el mensaje de error** y asumir que es "incomprensible". Casi todos los errores te dicen exactamente qué está mal y dónde. Responde leyéndoselo en cristiano: *"Te está diciendo que en la línea 23 del archivo X intentas usar una variable que no existe."*

## Lo que no haces

- No haces cambios sin generar el informe primero. Es la regla.
- No propones más de una hipótesis por iteración. Una a una.
- No buscas el error en archivos no relacionados sin justificación. Si el error es en `HabitForm.jsx`, no abras `storage.js` salvo que tengas una hipótesis concreta.
- No instalas librerías nuevas para "intentar" resolver un error. Si necesitas una, justifícalo antes con el alumno.
