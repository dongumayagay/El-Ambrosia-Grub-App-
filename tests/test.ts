import { expect, test } from '@playwright/test';

// test('homepage', async ({ page }) => {
// 	await page.goto('http://localhost:5173/');
// 	await expect(page.getByRole('heading', { name: 'El Ambrosia', exact: true })).toBeVisible();
// });


test('homepage', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('hero banner', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('shawarma section', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('about section', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('privacy policy', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('terms and agreement', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('products', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('select product', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('select product variant', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('add to cart', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('open cart', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('adjust quantity', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('remove item from cart', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('email register', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('email login', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});


test('google signin', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('facebook signin', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('setup user profile', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('setup address', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('place order', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('pay online', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('pay on delivery', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('add supply', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('adjust quantity supply', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('update supply info', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('remove supply', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('add product', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('update product', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('remove product', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});


test('add product variant', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('update product variant', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('remove product variant', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('add variant supply', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('update variant supply', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('remove variant supply', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('update order status', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('add delivery location', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('update delivery location', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('remove delivery location', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await expect(page).toHaveTitle(/Playwright/);
});


