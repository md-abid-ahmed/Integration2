import { Page } from '@playwright/test';

/**
 * Scrolls to a specific element on the page
 */
export async function scrollToElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Hovers over an element
 */
export async function hoverOverElement(page: Page, selector: string): Promise<void> {
  await page.hover(selector);
}

/**
 * Sets focus on an element
 */
export async function focusElement(page: Page, selector: string): Promise<void> {
  await page.focus(selector);
}

/**
 * Uploads a file to a file input element
 */
export async function uploadFile(
  page: Page,
  selector: string,
  filePath: string
): Promise<void> {
  await page.setInputFiles(selector, filePath);
}

/**
 * Gets the text content of an element
 */
export async function extractText(page: Page, selector: string): Promise<string | null> {
  return page.textContent(selector);
}

/**
 * Gets the value of an attribute from an element
 */
export async function extractAttribute(
  page: Page,
  selector: string,
  attr: string
): Promise<string | null> {
  return page.getAttribute(selector, attr);
}

/**
 * Gets the text content of the clipboard
 */
export async function getClipboardText(page: Page): Promise<string> {
  return page.evaluate(() => navigator.clipboard.readText());
}

/**
 * Copies the value of an input element to the clipboard
 */
export async function copyInputValue(page: Page, selector: string): Promise<void> {
  await page.focus(selector);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Control+C');
}
