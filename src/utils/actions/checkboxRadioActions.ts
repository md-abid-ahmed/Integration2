import { Page, ElementHandle } from '@playwright/test';

/**
 * Checks a checkbox
 */
export async function checkCheckbox(page: Page, selector: string): Promise<void> {
  await page.check(selector);
}

/**
 * Unchecks a checkbox
 */
export async function uncheckCheckbox(page: Page, selector: string): Promise<void> {
  await page.uncheck(selector);
}

/**
 * Checks if a checkbox is checked
 */
export async function isCheckboxChecked(page: Page, selector: string): Promise<boolean> {
  return page.isChecked(selector);
}

/**
 * Selects a radio button by its associated label text
 */
export async function selectRadioByLabel(
  page: Page,
  groupSelector: string,
  labelText: string
): Promise<void> {
  // Find the radio button by its associated label text
  const radioLocator = page.locator(`${groupSelector} >> text="${labelText}"`);
  await radioLocator.click();
}

/**
 * Toggles a checkbox (checks if unchecked, unchecks if checked)
 */
export async function toggleCheckbox(page: Page, selector: string): Promise<void> {
  const isChecked = await page.isChecked(selector);
  if (isChecked) {
    await page.uncheck(selector);
  } else {
    await page.check(selector);
  }
}

/**
 * Gets all radio buttons in a group
 */
export async function getRadioButtonsInGroup(
  page: Page, 
  groupName: string
) {
  return page.$$(`input[type="radio"][name="${groupName}"]`);
}
