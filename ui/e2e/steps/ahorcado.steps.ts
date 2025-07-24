import { Given, When, Then, After, Before } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import assert from 'assert';

let browser: Browser;
let page: Page;

Given('estoy en la página de inicio', async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('http://localhost:4200');
});

When('la página carga', async () => {
  await page.waitForSelector('h1');
});

Then('debería ver el título {string}', async (titulo: string) => {
  const content = await page.textContent('h1');
  assert.strictEqual(content, titulo);
});

Then('debería ver el input para ingresar letras', async () => {
  await page.waitForSelector('input.input-letra', { state: 'visible', timeout: 10000 });
});

Then('debería ver el botón "Adivinar"', async () => {
  await page.waitForSelector('button:has-text("Adivinar")', { state: 'visible', timeout: 10000 });
});

Then('debería ver el botón "Reiniciar"', async () => {
  await page.waitForSelector('button.reiniciar', { state: 'visible', timeout: 10000 });
});

Then('debería ver los intentos restantes al iniciar el juego', async () => {
  await page.waitForFunction(() => {
    const el = document.querySelector('.intentos');
    return el?.textContent?.includes('Intentos restantes');
  }, { timeout: 10000 });
});

Then('no debería haber letras usadas', async () => {
  const letras = await page.$$eval('.letra-badge', nodes =>
    nodes.map(n => n.textContent?.trim()).filter(Boolean)
  );
  assert.strictEqual(letras.length, 0, `Se encontraron letras usadas al iniciar: ${letras.join(', ')}`);
});


After(async () => {
  if (page) await page.close();
  if (browser) await browser.close();
});
