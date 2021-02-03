const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
    const text = generateText('Luiza', 26);
    expect(text).toBe('Luiza (26 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Luiza', 26);
    expect(text).toBe('Luiza (26 years old)');
});

test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///C:/Projetos/testing-01-starting-setup/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Ricardo');
    await page.click('input#age');
    await page.type('input#age', '30');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Ricardo (30 years old)');
}, 10000);