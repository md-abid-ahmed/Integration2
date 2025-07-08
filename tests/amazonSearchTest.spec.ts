import { test } from '@playwright/test';
import { UiAutomationHelper } from '../src/utils';

test('search for pants on Amazon', async ({ page }) => {
    const uiHelper = new UiAutomationHelper();

    // Go to Amazon
    await page.goto('https://www.amazon.com');
    console.log('✅ Navigated to Amazon');

    // Wait for the search input to be visible
    const searchInput = page.locator('input[placeholder="Search Amazon"]');
    await searchInput.waitFor({ state: 'visible' });

    // Type "pant" into the search input
    await searchInput.fill('pant');
    console.log('✅ Typed "pant" into search box');

    // Click the search submit button using our helper
    console.log('Attempting to click search button...');
    await uiHelper.clickSmartIntent(page, 'sumit');
    console.log('✅ Clicked search button');

    // Wait for search results to load
    await page.waitForSelector('[data-component-type="s-search-results"]');
    console.log('✅ Search results loaded');

    // Wait a moment to see the results
    await page.waitForTimeout(2000);
});
