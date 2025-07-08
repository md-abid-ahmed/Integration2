import { Page } from '@playwright/test';

/**
 * Clicks an element using the specified selector
 */
export async function clickButton(page: Page, selector: string): Promise<void> {
  await page.click(selector);
}

/**
 * Clicks a button by its visible text
 */
export async function clickButtonByText(page: Page, text: string): Promise<void> {
  await page.click(`text="${text}"`);
}

/**
 * Clicks an element by its data-testid attribute
 */
export async function clickElementByTestId(page: Page, testId: string): Promise<void> {
  await page.click(`[data-testid="${testId}"]`);
}

/**
 * Double-clicks an element
 */
export async function doubleClick(page: Page, selector: string): Promise<void> {
  await page.dblclick(selector);
}

/**
 * Right-clicks an element
 */
export async function rightClick(page: Page, selector: string): Promise<void> {
  await page.click(selector, { button: 'right' });
}

/**
 * Clicks an element and waits for navigation to complete
 */
export async function clickAndWaitForNavigation(
  page: Page, 
  selector: string, 
  options: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' } = {}
): Promise<void> {
  await Promise.all([
    page.waitForNavigation(options),
    page.click(selector)
  ]);
}

/**
 * Clicks an element and waits for a specific URL
 */
export async function clickAndWaitForUrl(
  page: Page, 
  selector: string, 
  url: string | RegExp,
  options: { timeout?: number } = {}
): Promise<void> {
  await Promise.all([
    page.waitForURL(url, options),
    page.click(selector)
  ]);
}

/**
 * Clicks an element and waits for a specific response
 */
export async function clickAndWaitForResponse(
  page: Page,
  selector: string,
  urlOrPredicate: string | RegExp | ((response: any) => boolean | Promise<boolean>),
  options: { timeout?: number } = {}
): Promise<void> {
  await Promise.all([
    page.waitForResponse(urlOrPredicate, options),
    page.click(selector)
  ]);
}
