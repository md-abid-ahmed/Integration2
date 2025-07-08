import { Page, Response, expect } from '@playwright/test';

/**
 * Waits for an element to be present in the DOM and visible
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 */
export async function waitForSelector(
  page: Page,
  selector: string,
  timeout = 30000
): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Waits for an element to contain specific text
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to check
 * @param expected - The expected text content
 * @param timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 */
export async function waitForText(
  page: Page,
  selector: string,
  expected: string | RegExp,
  timeout = 30000
): Promise<void> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await expect(element).toHaveText(expected, { timeout });
}

/**
 * Waits for page navigation to complete
 * @param page - The Playwright Page object
 * @param options - Optional waitForNavigation options
 */
export async function waitForNavigation(
  page: Page,
  options: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' } = {}
): Promise<void> {
  await page.waitForLoadState(options.waitUntil || 'load', { timeout: options.timeout });
}

/**
 * Waits for all network requests to complete
 * @param page - The Playwright Page object
 * @param idleTime - Time in milliseconds to wait for network to be idle (default: 500ms)
 */
export async function waitForNetworkIdle(
  page: Page,
  idleTime = 500
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(idleTime);
}

/**
 * Waits for a specific response URL and status code
 * @param page - The Playwright Page object
 * @param urlSubstring - Part of the URL to wait for
 * @param statusCode - Expected HTTP status code (default: 200)
 * @param timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 * @returns The Response object
 */
export async function waitForResponseUrl(
  page: Page,
  urlSubstring: string,
  statusCode = 200,
  timeout = 30000
): Promise<Response> {
  return page.waitForResponse(
    (response) => 
      response.url().includes(urlSubstring) && 
      response.status() === statusCode,
    { timeout }
  );
}

/**
 * Waits for an element to be hidden or removed from the DOM
 * @param page - The Playwright Page object
 * @param selector - The selector of the element to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 */
export async function waitForElementHidden(
  page: Page,
  selector: string,
  timeout = 30000
): Promise<void> {
  await page.waitForSelector(selector, { state: 'hidden', timeout });
}

/**
 * Waits for a specific amount of time
 * @param ms - Time to wait in milliseconds
 */
export async function wait(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Waits for a function to return a truthy value
 * @param fn - Function to execute repeatedly until it returns a truthy value
 * @param options - Options object
 * @param options.timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 * @param options.interval - Time to wait between retries in milliseconds (default: 500ms)
 * @returns The truthy value returned by the function
 */
export async function waitForFunction<T>(
  fn: () => T | Promise<T>,
  options: { timeout?: number; interval?: number } = {}
): Promise<T> {
  const { timeout = 30000, interval = 500 } = options;
  const startTime = Date.now();
  
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = await Promise.resolve().then(fn);
    if (result) return result;
    
    if (Date.now() - startTime > timeout) {
      throw new Error(`waitForFunction timed out after ${timeout}ms`);
    }
    
    await wait(interval);
  }
}

/**
 * Waits for all images to be loaded on the page
 * @param page - The Playwright Page object
 * @param timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 */
export async function waitForAllImagesLoaded(
  page: Page,
  timeout = 30000
): Promise<void> {
  await page.waitForFunction(
    () => {
      const images = document.getElementsByTagName('img');
      return Array.from(images).every(img => img.complete);
    },
    null,
    { timeout }
  );
}

/**
 * Waits for all animations to complete
 * @param page - The Playwright Page object
 * @param timeout - Maximum time to wait in milliseconds (default: 30 seconds)
 */
export async function waitForAnimations(
  page: Page,
  timeout = 30000
): Promise<void> {
  await page.waitForFunction(
    () => {
      return !document.querySelector('*:not(body):not(html)');
    },
    null,
    { timeout }
  );
}
