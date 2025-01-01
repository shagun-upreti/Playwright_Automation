const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
const fakePayLoadOrders={data:[],message:"No Orders"};
 
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");


  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66c61fdaae2afd4c0b54a17c",
   async route=>
    {
        //intercepting the response
       const response= await page.request.fetch(route.request());
       let body= JSON.stringify(fakePayLoadOrders);
       route.fulfill({
        response,
        body,

       });
    });
  
 
 

  await page.locator("button[routerlink*='myorders']").click();
  await page.pause();
  await page.locator("tbody").waitFor();
  const rows= await page.locator("tbody tr");
 
 
});
 
