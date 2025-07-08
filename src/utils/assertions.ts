import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Asserts that the text content of an element exactly matches the expected value
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 * @param expected - The expected text content
 */
export async function assertTextEquals(page: Page, selector: string, expected: string): Promise<void> {
  await expect(page.locator(selector)).toHaveText(expected);
}

/**
 * Asserts that an element's text content contains the expected partial text
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 * @param partialText - The expected partial text
 */
export async function assertTextContains(page: Page, selector: string, partialText: string): Promise<void> {
  await expect(page.locator(selector)).toContainText(partialText);
}

/**
 * Asserts that an element is visible on the page
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 */
export async function assertElementVisible(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeVisible();
}

/**
 * Asserts that an element is not visible on the page
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 */
export async function assertElementNotVisible(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeHidden();
}

/**
 * Asserts that an element has a specific attribute with a specific value
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 * @param attr - The attribute name to check
 * @param expected - The expected attribute value
 */
export async function assertAttributeEquals(
  page: Page,
  selector: string,
  attr: string,
  expected: string | RegExp
): Promise<void> {
  await expect(page.locator(selector)).toHaveAttribute(attr, expected);
}

/**
 * Asserts that an element exists in the DOM (may be hidden)
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 */
export async function assertElementExists(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(1);
}

/**
 * Asserts that an element does not exist in the DOM
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 */
export async function assertElementNotExists(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(0);
}

/**
 * Asserts that the current URL matches the expected URL
 * @param page - The Playwright Page object
 * @param expectedUrl - The expected URL (can be a string or regex)
 */
export async function assertUrl(page: Page, expectedUrl: string | RegExp): Promise<void> {
  await expect(page).toHaveURL(expectedUrl);
}

/**
 * Asserts that an element has a specific CSS class
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 * @param className - The expected CSS class name
 */
export async function assertHasClass(page: Page, selector: string, className: string): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toHaveClass(new RegExp(`\\b${className}\\b`));
}

/**
 * Asserts that a checkbox is checked
 * @param page - The Playwright Page object
 * @param selector - The selector of the checkbox element
 */
export async function assertCheckboxIsChecked(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeChecked();
}

/**
 * Asserts that a checkbox is not checked
 * @param page - The Playwright Page object
 * @param selector - The selector of the checkbox element
 */
export async function assertCheckboxIsNotChecked(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).not.toBeChecked();
}
