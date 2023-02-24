import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	console.log(page.url())
	await expect(page.getByRole('heading', { name: 'El Ambrosia' })).toBeVisible();
});
