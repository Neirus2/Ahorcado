import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

Given('estoy en la página de inicio', async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:4200');
});

When('la página carga', async () => {
  // Aquí podemos esperar por elementos si queremos
  await page.waitForSelector('h1');
});

Then('debería ver el título {string}', async (titulo: string) => {
  const content = await page.textContent('h1');
  if (content !== titulo) {
    throw new Error(`Expected "${titulo}" but found "${content}"`);
  }
  await browser.close();
});
