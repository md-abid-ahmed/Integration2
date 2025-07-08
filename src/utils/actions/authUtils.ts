import { Page } from '@playwright/test';

/**
 * Logs in a user with the provided credentials
 */
export async function loginUser(
  page: Page,
  username: string,
  password: string,
  loginButtonSelector: string = 'button[type="submit"]',
  usernameSelector: string = '#username',
  passwordSelector: string = '#password'
): Promise<void> {
  await page.fill(usernameSelector, username);
  await page.fill(passwordSelector, password);
  await page.click(loginButtonSelector);
}

/**
 * Logs out the current user
 */
export async function logout(
  page: Page,
  logoutButtonSelector: string = '#logout'
): Promise<void> {
  await page.click(logoutButtonSelector);
}

/**
 * Checks if the user is logged in by looking for a specific element
 */
export async function isLoggedIn(
  page: Page,
  testSelector: string = '.user-menu'
): Promise<boolean> {
  try {
    await page.waitForSelector(testSelector, { timeout: 2000 });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Gets the current authentication token from local storage
 */
export async function getAuthToken(
  page: Page,
  key: string = 'authToken'
): Promise<string | null> {
  return page.evaluate((storageKey) => {
    return localStorage.getItem(storageKey);
  }, key);
}

/**
 * Sets an authentication token in local storage
 */
export async function setAuthToken(
  page: Page,
  token: string,
  key: string = 'authToken'
): Promise<void> {
  await page.evaluate(
    ({ storageKey, tokenValue }) => {
      localStorage.setItem(storageKey, tokenValue);
    },
    { storageKey: key, tokenValue: token }
  );
}
