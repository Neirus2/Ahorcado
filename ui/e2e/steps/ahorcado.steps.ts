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
  await page.waitForFunction(
    (letra) => {
      return Array.from(document.querySelectorAll('.letra-badge'))
        .map(el => el.textContent?.trim())
        .includes(letra);
    },
    letra,
    { timeout: 5000 }
  );
});

Then('debería ver que los intentos restantes son menores a 6', async () => {
  await page.waitForFunction(() => {
    const el = document.querySelector('.intentos');
    if (!el) return false;
    const match = el.textContent?.match(/\d+/);
    return match && parseInt(match[0], 10) < 6;
  }, { timeout: 5000 });
});


After(async () => {
  if (page) await page.close();
  if (browser) await browser.close();
});
