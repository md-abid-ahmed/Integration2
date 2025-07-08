import { test, expect } from '@playwright/test';
import { UiAutomationHelper } from '../src/utils';

test.describe('GitHub UI Test', () => {
  let uiHelper: UiAutomationHelper;

  test.beforeEach(async ({ page }) => {
    uiHelper = new UiAutomationHelper();
    // Navigate to GitHub
    await page.goto('https://github.com');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should be able to interact with GitHub UI elements', async ({ page }) => {
    // Test 1: Click on the search button (magnifying glass icon)
    try {
      await uiHelper.clickSmartIntent(page, 'search');
      console.log('✅ Successfully clicked on search icon');
      // Type in the search input that appears
      await page.fill('input[placeholder="Search or jump to..."]', 'playwright');
      await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle');
      
      // Verify we're on the search results page
      await expect(page).toHaveURL(/.*q=playwright/);
      
      // Test 2: Click on the GitHub logo to go back home
      await uiHelper.clickSmartIntent(page, 'home');
      console.log('✅ Successfully clicked on home/logo');
      await page.waitForLoadState('networkidle');
      
      // Test 3: Click on the notifications bell
      await uiHelper.clickSmartIntent(page, 'notifications');
      console.log('✅ Successfully clicked on notifications');
      
      // Test 4: Click on the profile menu (user icon)
      await uiHelper.clickSmartIntent(page, 'profile');
      console.log('✅ Successfully clicked on profile');
      
    } catch (error) {
      console.warn('Could not find search icon, trying with a different selector...');
      await page.click('button[aria-label="Search"]');
      await page.fill('input[placeholder="Search icons"]', 'user');
    }

  });

  test('should be able to navigate repository features', async ({ page }) => {
    // Navigate to a repository page
    await page.goto('https://github.com/microsoft/playwright');
    await page.waitForLoadState('networkidle');
    
    // Test 1: Click on the Code tab
    try {
      await uiHelper.clickSmartIntent(page, 'code');
      console.log('✅ Successfully clicked on Code tab');
      await page.waitForLoadState('networkidle');
      
      // Test 2: Click on Issues tab
      await uiHelper.clickSmartIntent(page, 'issues');
      console.log('✅ Successfully clicked on Issues tab');
      await expect(page).toHaveURL(/.*issues/);
      
      // Test 3: Click on Pull requests tab
      await uiHelper.clickSmartIntent(page, 'pull requests');
      console.log('✅ Successfully clicked on Pull requests tab');
      await expect(page).toHaveURL(/.*pulls/);
      
      // Test 4: Click on Actions tab
      await uiHelper.clickSmartIntent(page, 'actions');
      console.log('✅ Successfully clicked on Actions tab');
      await expect(page).toHaveURL(/.*actions/);
      
    } catch (error) {
      console.warn('Navigation test failed:', error);
      throw error;
    }
  });

  test('should handle non-existent intents gracefully', async ({ page }) => {
    // Test with a non-existent intent
    try {
      await uiHelper.clickSmartIntent(page, 'nonexistentintent123');
      // If we get here, the test should fail because the intent doesn't exist
      throw new Error('Should have thrown an error for non-existent intent');
    } catch (error: unknown) {
      // We expect an error for non-existent intents
      const errorMessage = error instanceof Error ? error.message : String(error);
      expect(errorMessage).toContain('No element matched intent');
      console.log('✅ Correctly handled non-existent intent');
    }
  });
});
