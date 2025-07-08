import { test } from '@playwright/test';
import { UiAutomationHelper } from '../src/utils';

test('test navigation with text links', async ({ page }) => {
  const uiHelper = new UiAutomationHelper();

  // Go to the website and wait for it to be fully loaded
  await page.goto('https://takeuforward.org/');
  await page.waitForLoadState('networkidle');

  // Add a small delay to ensure all elements are rendered
  await page.waitForTimeout(2000);

  // Take a screenshot for debugging
  await page.screenshot({ path: 'before-click.png' });


  // 1. Click "Resources" button
  console.log('Attempting to click Resources...');

  // First try with direct selector since we know the exact structure
  // const resourcesButton = page.locator('button:has-text("Resources")').first();

  //   console.log('Found Resources button with direct selector');
  //   await resourcesButton.click();
  // }
  //  else {
  // Fall back to smart intent if direct selector fails
  console.log('Trying with smart intent...');
  await uiHelper.clickSmartIntent(page, 'Resources', {
    
  });


  console.log('✅ Clicked on Resources');
  await page.waitForTimeout(55000);


});