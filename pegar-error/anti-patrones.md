# Los 4 anti-patrones del vibe coder novato cuando algo falla

Errores típicos al reaccionar mal a un fallo. Reconocerlos es la mitad del camino. La skill `pegar-error` te corrige cuando caes en alguno.

---

## 1 · Cambiar diez cosas a la vez

**Síntoma**: algo se rompe, le pides a Claude que arregle, Claude propone un cambio, tú aceptas. No funciona. Le pides que pruebe otra cosa, otro cambio. No funciona. Y otro. Y otro. Quince minutos después llevas modificados ocho archivos y no sabes qué hacía cada cambio.

**Por qué es malo**: aunque al final algo arregle el problema, **no sabes qué fue lo que lo arregló**. La próxima vez que aparezca un fallo parecido, vuelves a estar perdido. Y peor: a menudo los cambios acumulados introducen *nuevos* problemas que no tenías antes.

**Qué hacer en su lugar**: un solo cambio cada vez. Pruebas. Si no funciona, **deshaces ese cambio antes de probar el siguiente**. La skill te obliga a esto: solo propone una hipótesis por iteración.

---

## 2 · Pegar el síntoma, no el error

**Síntoma**: le dices a Claude *"no funciona, ayúdame"* o *"se ha roto, mira a ver qué pasa"* sin más información. Claude empieza a abrir archivos al azar buscando algo que pueda fallar.

**Por qué es malo**: sin el mensaje de error concreto, Claude está jugando a las adivinanzas. Y como Claude es muy capaz, va a *encontrar* "algo que podría estar mal" aunque no sea el problema real. Te lo cambia. Sigues con el problema original. Empiezas a perseguir fantasmas.

**Qué hacer en su lugar**: la skill te pide explícitamente el mensaje de error real antes de tocar nada. En el navegador: F12 → pestaña Consola → copiar el texto en rojo. En la terminal: el bloque de líneas que aparece justo después de ejecutar lo que falla, completo, incluyendo la traza.

---

## 3 · No leer lo que dice el error

**Síntoma**: aparece un mensaje en rojo. Tú lo miras dos segundos, ves que tiene palabras técnicas, decides que es "incomprensible" y se lo pegas a Claude sin más.

**Por qué es malo**: la mayoría de los errores te dicen exactamente qué está mal y dónde. *"Cannot read properties of undefined (reading 'name') at HabitForm.jsx:23"* significa: en la línea 23 de HabitForm.jsx estás intentando leer una propiedad llamada `name` de algo que no existe todavía. **El error es una respuesta, no un acertijo**.

**Qué hacer en su lugar**: lee el error de izquierda a derecha. Si una palabra no la entiendes, pídele a Claude que te la traduzca: *"qué significa 'undefined' aquí"*. Vas a aprender mucho más leyendo errores que evitándolos.

---

## 4 · No revertir cuando empeora

**Síntoma**: llevas treinta minutos arreglando un problema. Cada cambio mejora un poco y empeora otra cosa. Ahora tienes tres errores donde antes había uno. Sigues adelante porque "estoy cerca".

**Por qué es malo**: el coste de seguir adelante crece exponencialmente. Cada nuevo cambio se construye sobre la inestabilidad del anterior. En algún momento, vas a llegar a un punto donde es más rápido borrar todo lo que has hecho que entender qué pasa.

**Qué hacer en su lugar**: si tras **tres iteraciones** sin mejora clara la cosa va a peor, **párate y vuelve al último commit estable**. La skill te lo propone: invoca `git-workflow` para deshacer todos los cambios sin guardar. Pierdes 20-30 minutos pero recuperas la cordura. Empiezas de nuevo con el cerebro fresco, captura limpia y un solo cambio.

---

## La regla de oro

Si te encuentras pensando *"no entiendo nada de lo que está pasando"*: **párate**. Esa frase es la señal de que has caído en uno de los cuatro patrones. Volver al último commit estable y respirar dos minutos te ahorra horas.

La skill `pegar-error` existe precisamente para que no llegues a ese punto. Pero si llegas, deshazlo y vuelve atrás. No es debilidad. Es disciplina.
