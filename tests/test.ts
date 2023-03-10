import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await expect(page.getByRole('heading', { name: 'El Ambrosia', exact: true })).toBeVisible();
});
