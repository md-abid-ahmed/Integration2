# Playwright TypeScript Test Utilities

A comprehensive collection of utility functions for Playwright test automation, written in TypeScript. This library provides a set of reusable functions that cover 80-90% of common test automation needs.

## Features

- 🖋️ **Form Input & Text Handling** - Fill, clear, and type into form fields
- ✅ **Checkbox/Radio** - Handle checkboxes and radio buttons with ease
- 🔘 **Buttons & Clicks** - Click elements by various selectors
- 📦 **Dropdowns/Selects** - Work with dropdown menus and select elements
- 🎯 **Assertions** - Comprehensive set of assertion helpers
- ⏳ **Waiting** - Smart waiting mechanisms for reliable tests
- 🔄 **Navigation** - Page and tab management
- 🧪 **DOM Interactions** - Hover, scroll, upload files, and more
- 🔒 **Auth/Session** - Common authentication flows

## Installation

1. Install the required dependencies:

```bash
npm install -D @playwright/test typescript
```

## Usage

Import the utility functions as needed in your test files:

```typescript
import { fillInput, clickButton } from './src/utils/actions';
import { assertTextEquals } from './src/utils/assertions';
import { goToUrl } from './src/utils/navigation';
import { waitForSelector } from './src/utils/waiting';

// Example test
async function exampleTest(page) {
  await goToUrl(page, 'https://example.com');
  await fillInput(page, '#username', 'testuser');
  await fillInput(page, '#password', 'password123');
  await clickButton(page, 'button[type="submit"]');
  await waitForSelector(page, '.welcome-message');
  await assertTextEquals(page, '.welcome-message', 'Welcome, testuser!');
}
```

## API Documentation

### Actions (`src/utils/actions.ts`)
- Form input handling (fill, clear, type)
- Checkbox/radio button interactions
- Button clicks and element interactions
- Dropdown/select handling
- File uploads
- Authentication helpers

### Assertions (`src/utils/assertions.ts`)
- Text assertions (equals, contains)
- Visibility checks
- Attribute validations
- Checkbox/radio button states
- URL assertions

### Navigation (`src/utils/navigation.ts`)
- Page navigation
- Tab management
- Page refresh and history
- New tab handling

### Waiting (`src/utils/waiting.ts`)
- Element visibility waiting
- Network idle waiting
- Response waiting
- Custom condition waiting

## Best Practices

1. Always use explicit waits instead of static timeouts when possible
2. Prefer data-testid selectors for better test stability
3. Keep test files focused and small
4. Use page object models for larger test suites
5. Handle test data cleanup in afterEach/afterAll hooks

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
