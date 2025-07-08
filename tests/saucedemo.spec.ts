// import { test, Page } from '@playwright/test';
// import { clickButton, clickButtonByText } from '../src/utils/actions/buttonClickActions';
// import { fillInput } from '../src/utils/actions/inputActions';
// import { 
//   assertElementVisible, 
//   assertTextEquals, 
//   assertTextContains 
// } from '../src/utils/assertions';
// import { waitForSelector } from '../src/utils/waiting';

// // Test data
// const testData = {
//   username: 'standard_user',
//   password: 'secret_sauce',
//   firstName: 'John',
//   lastName: 'Doe',
//   postalCode: '12345'
// };

// // Selectors
// const SELECTORS = {
//   USERNAME: '#user-name',
//   PASSWORD: '#password',
//   LOGIN_BUTTON: '#login-button',
//   INVENTORY_CONTAINER: '.inventory_container',
//   ADD_TO_CART_BACKPACK: '[data-test="add-to-cart-sauce-labs-backpack"]',
//   SHOPPING_CART_BADGE: '.shopping_cart_badge',
//   SHOPPING_CART_LINK: '.shopping_cart_link',
//   CHECKOUT_BUTTON: '[data-test="checkout"]',
//   FIRST_NAME: '[data-test="firstName"]',
//   LAST_NAME: '[data-test="lastName"]',
//   POSTAL_CODE: '[data-test="postalCode"]',
//   CONTINUE_BUTTON: '[data-test="continue"]',
//   FINISH_BUTTON: '[data-test="finish"]',
//   COMPLETE_HEADER: '.complete-header',
//   COMPLETE_TEXT: '.complete-text'
// };

// test.describe('Sauce Demo E2E Test', () => {
//   let page: Page;

//   test.beforeAll(async ({ browser }) => {
//     // Launch browser and create a new page
//     page = await browser.newPage();
//     await page.goto('https://www.saucedemo.com/');
//   });

//   test('should login, add backpack to cart, and complete checkout', async () => {
//     // 1. Login
//     await fillInput(page, SELECTORS.USERNAME, testData.username);
//     await fillInput(page, SELECTORS.PASSWORD, testData.password);
//     await clickButton(page, SELECTORS.LOGIN_BUTTON);

//     // Verify login success by checking inventory container is visible
//     await waitForSelector(page, SELECTORS.INVENTORY_CONTAINER);
//     await assertElementVisible(page, SELECTORS.INVENTORY_CONTAINER);

//     // 2. Add backpack to cart
//     await clickButton(page, SELECTORS.ADD_TO_CART_BACKPACK);

//     // Verify item is added to cart
//     await assertTextEquals(page, SELECTORS.SHOPPING_CART_BADGE, '1');

//     // 3. Go to cart
//     await clickButton(page, SELECTORS.SHOPPING_CART_LINK);

//     // 4. Go to checkout
//     await clickButton(page, SELECTORS.CHECKOUT_BUTTON);

//     // 5. Fill checkout information
//     await fillInput(page, SELECTORS.FIRST_NAME, testData.firstName);
//     await fillInput(page, SELECTORS.LAST_NAME, testData.lastName);
//     await fillInput(page, SELECTORS.POSTAL_CODE, testData.postalCode);
//     await clickButton(page, SELECTORS.CONTINUE_BUTTON);

//     // 6. Finish checkout
//     await clickButton(page, SELECTORS.FINISH_BUTTON);

//     // 7. Verify order completion
//     await assertTextEquals(page, SELECTORS.COMPLETE_HEADER, 'Thank you for your order!');
//     await assertTextContains(page, SELECTORS.COMPLETE_TEXT, 'Your order has been dispatched');
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });
// });
