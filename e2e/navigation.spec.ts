import { expect, test } from '@playwright/test';

test.describe('Nawigacja główna', () => {
  test('wyświetla pulpit po wejściu na stronę główną', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Pulpit');
  });

  test('pozwala przejść do widoku kontaktów z menu bocznego', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Kontakty' }).click();
    await expect(page).toHaveURL(/\/contacts$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Kontakty');
  });

  test('otwiera i zamyka menu mobilne na małym ekranie', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Otwórz menu nawigacyjne' }).click();
    await expect(page.getByRole('dialog', { name: 'Menu nawigacyjne' })).toBeVisible();
    await page.getByRole('button', { name: 'Zamknij menu nawigacyjne' }).click();
    await expect(page.getByRole('dialog', { name: 'Menu nawigacyjne' })).toBeHidden();
  });
});
