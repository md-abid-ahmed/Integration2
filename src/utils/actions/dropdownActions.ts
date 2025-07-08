import { Page } from '@playwright/test';

/**
 * Selects a dropdown option by its value
 */
export async function selectDropdownByValue(
  page: Page,
  selector: string,
  value: string
): Promise<void> {
  await page.selectOption(selector, value);
}

/**
 * Selects a dropdown option by its visible text
 */
export async function selectDropdownByLabel(
  page: Page,
  selector: string,
  labelText: string
): Promise<void> {
  await page.selectOption(selector, { label: labelText });
}

/**
 * Gets all available options in a dropdown
 */
export async function getDropdownOptions(
  page: Page,
  selector: string
): Promise<string[]> {
  return page.$$eval(
    `${selector} option`,
    (options) => options.map(option => option.textContent?.trim() || '')
  );
}

/**
 * Gets the currently selected option in a dropdown
 */
export async function getSelectedOption(
  page: Page,
  selector: string
): Promise<string> {
  return page.$eval(
    `${selector} option:checked`,
    (option) => option.textContent?.trim() || ''
  );
}

/**
 * Selects multiple options in a multi-select dropdown
 */
export async function selectMultipleOptions(
  page: Page,
  selector: string,
  values: string[]
): Promise<void> {
  await page.selectOption(selector, values);
}

/**
 * Deselects all options in a multi-select dropdown
 */
export async function deselectAllOptions(
  page: Page,
  selector: string
): Promise<void> {
  await page.selectOption(selector, []);
}

/**
 * Gets the number of options in a dropdown
 */
export async function getDropdownOptionCount(
  page: Page,
  selector: string
): Promise<number> {
  return page.$$eval(
    `${selector} option`,
    (options) => options.length
  );
}
