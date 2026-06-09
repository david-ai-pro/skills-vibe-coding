// Ejemplo de test end-to-end con Playwright.
// Cubre el criterio de aceptación: "el usuario puede añadir un hábito escribiendo
// su nombre y pulsando enter" — app de hábitos, proyecto-modelo de las clases 3, 4 y 5.

import { test, expect } from '@playwright/test';

test.describe('Crear hábito', () => {

  test.beforeEach(async ({ page }) => {
    // Cada test arranca con localStorage limpio.
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('el usuario puede crear un hábito nuevo con enter', async ({ page }) => {
    const input = page.getByPlaceholder('Nuevo hábito');
    await input.fill('Beber agua');
    await input.press('Enter');

    // Verificamos que aparece en la lista.
    const lista = page.getByRole('list', { name: 'Hábitos del día' });
    await expect(lista.getByText('Beber agua')).toBeVisible();
  });

  test('el input se vacía después de crear', async ({ page }) => {
    const input = page.getByPlaceholder('Nuevo hábito');
    await input.fill('Meditar 10 min');
    await input.press('Enter');

    await expect(input).toHaveValue('');
  });

  test('no se crea hábito si el nombre está vacío', async ({ page }) => {
    const input = page.getByPlaceholder('Nuevo hábito');
    await input.press('Enter');

    const items = page.getByRole('listitem');
    await expect(items).toHaveCount(0);
  });

  test('el hábito creado persiste al recargar', async ({ page }) => {
    await page.getByPlaceholder('Nuevo hábito').fill('Leer 20 páginas');
    await page.getByPlaceholder('Nuevo hábito').press('Enter');

    await page.reload();

    await expect(page.getByText('Leer 20 páginas')).toBeVisible();
  });
});
