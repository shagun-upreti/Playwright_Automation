import { test, expect } from "playwright/test"
const { LoginPage } = require('../pageobjects/LoginPage');


test('Client App login', async ({ page }) => {
    test.setTimeout(90000);
    const username = "anshika@gmail.com";
    const password = "Iamking@000";
    const productname = "IPHONE 13 PRO";
    const product = page.locator(".card-body");
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    loginPage.validLogin(username, password);
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await product.count();
    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator("b").textContent() === productname) {

            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("//button[text()='Checkout']").click();
    await page.locator("div row").first().waitFor();
    await page.locator("text=CVV Code  ").fill("533");
    await page.locator("text=Name on Card ").fill("Divya");
    await page.locator("input[name='coupon']").fill("Divya");
}
)