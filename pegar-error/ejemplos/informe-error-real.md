# Ejemplo real · informe de error estructurado

Cómo se ve en la práctica un informe que genera la skill `pegar-error` tras capturar bien la información. Este es un caso típico de la app de hábitos (proyecto-modelo del módulo).

---

## Conversación que genera el informe

```
Tú: la app no carga, me sale pantalla blanca

Claude (skill pegar-error): Antes de tocar nada, necesito información.
Cuatro preguntas:

1. ¿Qué intentabas hacer cuando empezó a fallar?
2. ¿Qué esperabas que pasara?
3. ¿Qué pasó en realidad?
4. ¿Has cambiado algo recientemente?

Tú:
1. Recargar la app después de añadir la funcionalidad de filtrar hábitos.
2. Que apareciera la lista normal con un nuevo desplegable arriba.
3. Pantalla en blanco, no aparece nada.
4. Aprobé un cambio en HabitList.jsx y en app/page.jsx hace 10 minutos.

Claude: Ahora abre F12 en el navegador, pestaña Consola, y cópiame
todo el texto en rojo que veas. Es esencial.

Tú:
TypeError: Cannot read properties of undefined (reading 'filter')
  at HabitList (HabitList.jsx:18:24)
  at renderWithHooks (react-dom.development.js:14985:18)
  at mountIndeterminateComponent (react-dom.development.js:17811:13)
  ...

Claude: Perfecto, con esto ya puedo trabajar. Te dejo el informe:
```

---

## Informe generado

```
## Informe de error — 2026-06-15 22:41

### Qué intentaba hacer el alumno
Recargar la app después de añadir la funcionalidad de filtrar hábitos
por categoría.

### Resultado esperado
La lista de hábitos visible con un nuevo desplegable arriba para
filtrar por categoría.

### Resultado real
Pantalla en blanco al cargar la página. No se renderiza ningún
componente.

### Mensaje de error
TypeError: Cannot read properties of undefined (reading 'filter')
  at HabitList (HabitList.jsx:18:24)
  at renderWithHooks (react-dom.development.js:14985:18)
  ...

### Contexto reciente
Último cambio aprobado (hace 10 min): modificación de HabitList.jsx
y app/page.jsx para añadir el filtrado por categoría.
Último commit estable: "Añadir validación de input de nombre" (de
hace 47 minutos).

### Hipótesis iniciales
1. **Más probable**: en HabitList.jsx línea 18 se está llamando a
   `.filter()` sobre algo que llega como `undefined`. Probablemente
   el componente recibe una prop que en la nueva versión no se está
   pasando desde app/page.jsx. (95% de los TypeError sobre 'filter'
   son esto).
2. **Menos probable**: el array de hábitos se está leyendo de
   localStorage justo cuando aún no existe, y el filtro se aplica
   sobre `undefined` en lugar de array vacío.

### Próximo paso propuesto
Abrir HabitList.jsx y mirar qué prop espera en la línea 18. Luego
ir a app/page.jsx y verificar que esa prop se está pasando. Hipótesis
1 primero, un solo cambio.
```

---

## Cómo continúa la conversación

```
Tú: dale, prueba la hipótesis 1

Claude:
[Abre HabitList.jsx línea 18]

Lo veo. La línea es:
   const visibles = habitos.filter(h => h.categoria === filtro);

El componente espera la prop "habitos" pero en app/page.jsx, tras
el último cambio, le estás pasando "items" en su lugar:

   <HabitList items={listaCompleta} filtro={categoriaSeleccionada} />

Dos opciones:
A) Cambiar la prop en app/page.jsx para llamarla "habitos".
B) Cambiar el componente para que reciba "items".

¿Cuál prefieres? La A es menos cambio. La B es más coherente con el
resto del proyecto si por algún motivo "items" tiene más sentido.

Tú: la A, menos cambio

Claude:
[Aplica el cambio en app/page.jsx]

Listo. Refresca el navegador y dime si carga.

Tú: ya va, perfecto

Claude: Bien. La causa: el cambio anterior renombró la prop al
modificar el componente, pero no se actualizó el llamador. Es un
clásico de los cambios que tocan dos archivos.

¿Hacemos commit con git-workflow? Sugiero el mensaje:
"Corregir nombre de prop en HabitList para evitar undefined al filtrar".
```

---

## Lo que NO habría pasado sin la skill

Sin estructurar:

- *"No carga"* → Claude empieza a abrir archivos buscando algo. Mira primero `app/page.jsx`, no ve nada obvio, va a `storage.js`, sugiere un cambio "por si acaso". El alumno acepta. Ahora hay dos cambios mezclados. La app sigue sin cargar. Sigue cambiando cosas. Treinta minutos después, el alumno se rinde o termina con un proyecto distinto al que tenía.

Con la skill:

- Cuatro preguntas → error real capturado → hipótesis con base → un cambio → arreglado en cinco minutos.
