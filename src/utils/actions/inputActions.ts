import { Page } from '@playwright/test';

/**
 * Fills an input field with the specified value
 */
export async function fillInput(page: Page, selector: string, value: string): Promise<void> {
  await page.fill(selector, value);
}

/**
 * Clears the value of an input field
 */
export async function clearInput(page: Page, selector: string): Promise<void> {
  await page.fill(selector, '');
}

/**
 * Types text into an input field with a delay between keystrokes
 */
export async function typeSlowly(
  page: Page, 
  selector: string, 
  value: string, 
  delayMs = 100
): Promise<void> {
  await page.click(selector);
  for (const char of value) {
    await page.keyboard.type(char, { delay: delayMs });
  }
}

/**
 * Presses the Enter key
 */
export async function pressEnter(page: Page): Promise<void> {
  await page.keyboard.press('Enter');
}

/**
 * Presses the Tab key
 */
export async function pressTab(page: Page): Promise<void> {
  await page.keyboard.press('Tab');
}
