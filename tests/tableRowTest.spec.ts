import { test } from '@playwright/test';
import { UiAutomationHelper } from '../src/utils';

// Test data: A simple HTML table with emoji actions
const htmlTable = `
<!DOCTYPE html>
<html>
<head><title>Test Table</title></head>
<body>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Document</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Quarterly Report Q1</td>
        <td>
          <button title="View document">👁️</button>
          <button title="Edit document">✏️</button>
          <button title="Delete document">🗑️</button>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Project Proposal</td>
        <td>
          <button title="View document">👁️</button>
          <button title="Edit document">✏️</button>
          <button title="Delete document">🗑️</button>
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>Meeting Minutes</td>
        <td>
          <button title="View document">👁️</button>
          <button title="Edit document">✏️</button>
          <button title="Delete document">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

test('interact with table rows using emoji actions', async ({ page }) => {
  const uiHelper = new UiAutomationHelper();
  
  // Load our test HTML
  await page.setContent(htmlTable);
  
  // Example 1: Click the view button on the 2nd row
  console.log('Clicking view on 2nd row...');
  await uiHelper.clickSmartIntent(page, '2nd view');
  
  // Example 2: Click the edit button on the 1st row
  console.log('Clicking edit on 1st row...');
  await uiHelper.clickSmartIntent(page, '1st edit');
  
  // Example 3: Click the delete button on the 3rd row
  console.log('Clicking delete on 3rd row...');
  await uiHelper.clickSmartIntent(page, '3rd delete');
  
  // Example 4: Click the entire 2nd row (no action specified)
  console.log('Clicking entire 2nd row...');
  await uiHelper.clickSmartIntent(page, '2');
  
  console.log('✅ All table interactions completed');
});
