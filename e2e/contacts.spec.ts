import { expect, test } from '@playwright/test';

test.describe('Zarządzanie kontaktami', () => {
  test('dodaje nowy kontakt przez formularz modalny', async ({ page }) => {
    await page.goto('/contacts');

    await page.getByRole('button', { name: /Dodaj/ }).click();
    await page.getByLabel('Imię i nazwisko').fill('Jan Kowalski');
    await page.getByLabel('Adres e-mail').fill('jan.kowalski@example.com');
    await page.getByRole('button', { name: 'Zapisz' }).click();

    await expect(page.getByText('Jan Kowalski')).toBeVisible();
  });

  test('filtruje kontakty po wpisaniu frazy w wyszukiwarce', async ({ page }) => {
    await page.goto('/contacts');
    const searchField = page.getByPlaceholder('Szukaj po nazwie, e-mailu lub organizacji…');
    await searchField.fill('Sarah');

    await expect(page.getByText('Sarah Johnson')).toBeVisible();
    await expect(page.getByText('Michael Chen')).toHaveCount(0);
  });
});
