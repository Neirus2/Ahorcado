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

When('ingreso la letra {string} y hago clic en Adivinar', async (letra: string) => {
  await page.fill('input.input-letra', letra);
  await page.click('button:has-text("Adivinar")');
  await page.waitForTimeout(500); // Espera corta para actualizar el DOM
});

Then('debería ver la letra {string} en la lista de letras usadas', async (letra: string) => {
  const letras = await page.$$eval('.letra-badge', nodes => nodes.map(n => n.textContent?.trim()));
  assert(letras.includes(letra), `La letra ${letra} no está en la lista de letras usadas`);
});

Then('debería ver que los intentos restantes son menores a 6', async () => {
  const intentosText = await page.textContent('.intentos');
  const intentosRestantes = parseInt(intentosText?.match(/\d+/)?.[0] || '6', 10);
  assert(intentosRestantes < 6, 'Los intentos restantes no se actualizaron correctamente');
});

After(async () => {
  if (page) await page.close();
  if (browser) await browser.close();
});
