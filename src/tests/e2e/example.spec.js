const { test, expect } = require('@playwright/test');

test('homepage has expected sections', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('text=O mnie')).toBeVisible();
  await expect(page.locator('text=Doświadczenie')).toBeVisible();
  await expect(page.locator('text=Edukacja')).toBeVisible();
  await expect(page.locator('text=Publikacje')).toBeVisible();
  await expect(page.locator('text=Usługi')).toBeVisible();
  await expect(page.locator('text=Kontakt')).toBeVisible();
});
