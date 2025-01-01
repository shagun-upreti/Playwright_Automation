const {test, expect} =require("@playwright/test");

test("calender validation", async({page})=>
{
    const monthNumber= "6";
    const date="15";
    const year="2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
})