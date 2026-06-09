// Ejemplo de test unitario para JavaScript / Next.js usando Vitest.
// Prueba la lógica de guardado y lectura en localStorage de la app de hábitos
// (proyecto-modelo usado en la Clase 4 SDD).

import { describe, it, expect, beforeEach } from 'vitest';
import { leerHabitos, guardarHabitos } from '../app/lib/storage';

describe('storage de hábitos', () => {

  beforeEach(() => {
    // Cada test arranca con localStorage vacío.
    localStorage.clear();
  });

  it('lee un array vacío cuando no hay nada guardado', () => {
    expect(leerHabitos()).toEqual([]);
  });

  it('guarda y lee un hábito correctamente', () => {
    const habitos = [{ id: 1, nombre: 'Beber agua', hechoHoy: false }];
    guardarHabitos(habitos);
    expect(leerHabitos()).toEqual(habitos);
  });

  it('sobrescribe cuando se vuelve a guardar', () => {
    guardarHabitos([{ id: 1, nombre: 'Antiguo', hechoHoy: false }]);
    guardarHabitos([{ id: 2, nombre: 'Nuevo', hechoHoy: true }]);
    expect(leerHabitos()).toEqual([{ id: 2, nombre: 'Nuevo', hechoHoy: true }]);
  });

  it('devuelve array vacío si lo guardado está corrupto', () => {
    localStorage.setItem('habitos-aimax', 'esto no es JSON válido');
    expect(leerHabitos()).toEqual([]);
  });
});
