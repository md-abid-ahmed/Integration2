import { Page, BrowserContext } from '@playwright/test';

/**
 * Navigates to a specific URL
 * @param page - The Playwright Page object
 * @param url - The URL to navigate to
 */
export async function goToUrl(page: Page, url: string): Promise<void> {
  await page.goto(url);
}

/**
 * Opens a new tab and navigates to the specified URL
 * @param context - The Playwright BrowserContext
 * @param url - The URL to navigate to in the new tab
 * @returns The new Page object
 */
export async function openNewTab(context: BrowserContext, url: string): Promise<Page> {
  const page = await context.newPage();
  await page.goto(url);
  return page;
}

/**
 * Switches to a tab by its index
 * @param context - The Playwright BrowserContext
 * @param index - The zero-based index of the tab to switch to
 * @returns The Page object of the tab
 */

/**
 * Switches to a tab by its index
 * @param context - The Playwright BrowserContext
 * @param index - The zero-based index of the tab to switch to
 * @returns The Page object of the tab
 */
export async function switchToTabByIndex(context: BrowserContext, index: number): Promise<Page> {
  const pages = context.pages();
  if (index >= pages.length) {
    throw new Error(`Tab index ${index} is out of bounds. Only ${pages.length} tabs exist.`);
  }
  const page = pages[index];
  await page.bringToFront();
  return page;
}

/**
 * Closes the current tab
 * @param page - The Playwright Page object of the tab to close
 */
export async function closeTab(page: Page): Promise<void> {
  await page.close();
}

/**
 * Refreshes the current page
 * @param page - The Playwright Page object
 */
export async function refreshPage(page: Page): Promise<void> {
  await page.reload();
}

/**
 * Goes back to the previous page in browser history
 * @param page - The Playwright Page object
 */
export async function goBack(page: Page): Promise<void> {
  await page.goBack();
}

/**
 * Goes forward to the next page in browser history
 * @param page - The Playwright Page object
 */
export async function goForward(page: Page): Promise<void> {
  await page.goForward();
}

/**
 * Gets the current page URL
 * @param page - The Playwright Page object
 * @returns The current URL as a string
 */
export async function getCurrentUrl(page: Page): Promise<string> {
  return page.url();
}

/**
 * Gets the current page title
 * @param page - The Playwright Page object
 * @returns The page title as a string
 */
export async function getPageTitle(page: Page): Promise<string> {
  return page.title();
}

/**
 * Waits for a new page to be created (e.g., when clicking a link that opens in a new tab)
 * @param context - The Playwright BrowserContext
 * @param action - The action that will trigger the new page
 * @returns The new Page object
 */
export async function waitForNewPage(
  context: BrowserContext,
  action: () => Promise<void>
): Promise<Page> {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    action()
  ]);
  return newPage;
}

/**
 * Waits for a new tab to be created and loaded
 * @param context - The Playwright BrowserContext
 * @param action - The action that will trigger the new tab
 * @returns The new Page object
 */
export async function waitForNewTab(
  context: BrowserContext,
  action: () => Promise<void>
): Promise<Page> {
  const page = await waitForNewPage(context, action);
  await page.waitForLoadState('load');
  return page;
}
