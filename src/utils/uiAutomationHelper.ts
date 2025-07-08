import { Page, Locator } from 'playwright';
import stringSimilarity from 'string-similarity';

type ClickOptions = {
  threshold?: number;
  timeout?: number; 
  visibleOnly?: boolean;
};

export class UiAutomationHelper {
  private synonyms: Record<string, string[]> = {
    // Navigation
    back: ['back', 'return', '←', '🔙', 'previous', '◀️', '⬅️'],
    next: ['next', 'forward', '→', '➡️', 'continue', '▶️', '⏭️'],
    home: ['home', 'house', '🏠', 'main', 'dashboard'],
    close: ['close', 'x', '×', 'exit', '❌', '✖️', 'cancel'],
    
    // Common actions
    view: ['view', 'eye', '👁️', 'preview', 'see', 'show'],
    edit: ['edit', 'pencil', '✏️', 'modify', 'update', 'change'],
    delete: ['delete', 'remove', 'trash', '🗑️', 'bin', 'discard'],
    submit: ['submit', 'save', 'confirm', 'done', '✓', '✅', '✔️'],
    cancel: ['cancel', 'close', 'stop', '✖️', '❌', 'exit'],
    
    // File operations
    download: ['download', '⬇️', 'save as', 'export', '💾'],
    upload: ['upload', 'import', 'attach', '📤', 'cloud-upload'],
    
    // Common UI elements
    menu: ['menu', '☰', 'hamburger', 'navigation', '≡'],
    search: ['search', '🔍', 'find', 'lookup', 'magnify'],
    settings: ['settings', '⚙️', 'gear', 'preferences', 'cog'],
    profile: ['profile', 'account', 'user', '👤', 'avatar'],
    
    // Media controls
    play: ['play', '▶️', 'start', 'resume'],
    pause: ['pause', '⏸️', 'stop', 'wait'],
    volume: ['volume', '🔊', 'sound', '🔈', '🔉', '🔇'],
    
    // Common intents
    add: ['add', '+', 'new', 'create', '➕', 'insert'],
    remove: ['remove', '−', 'delete', '➖', 'clear'],
    refresh: ['refresh', 'reload', '↻', '🔄', 'update'],
    
    // Social
    like: ['like', '❤️', 'love', 'favorite', 'thumbs up', '👍'],
    share: ['share', 'send', '📤', 'forward', 'export'],
    comment: ['comment', '💬', 'reply', 'chat', 'message'],
    
    // Directional
    up: ['up', '↑', 'top', 'north', 'ascend'],
    down: ['down', '↓', 'bottom', 'south', 'descend'],
    left: ['left', '←', 'previous', 'west', 'back'],
    right: ['right', '→', 'next', 'east', 'forward']
  };

  /**
   * Expands a keyword into an array of possible synonyms
   */
  private expandIntent(keyword: string): string[] {
    const lower = keyword.toLowerCase().trim();
    const result = new Set<string>();
    
    // Add the original keyword
    result.add(lower);
    
    let bestMatch = '';
    let bestScore = 0.5; // Minimum threshold for fuzzy matching
    
    // First pass: exact matches
    for (const [main, list] of Object.entries(this.synonyms)) {
      // Check for direct match in the list
      if (list.includes(lower)) {
        list.forEach(term => result.add(term));
        result.add(main);
        return Array.from(result);  // Return early for exact matches
      }
      
      
      for (const term of list) {
        const score = stringSimilarity.compareTwoStrings(lower, term.toLowerCase());
        if (score > bestScore) {
          bestScore = score;
          bestMatch = main;
        }
      }
    }
    
    
    if (bestMatch) {
      this.synonyms[bestMatch].forEach(term => result.add(term));
      result.add(bestMatch);
      console.log(`🔍 Fuzzy matched "${lower}" to "${bestMatch}" with score ${bestScore.toFixed(2)}`);
    }
    
    return Array.from(result);
  }

  /**
   * Gets all relevant text from an element and its attributes
   */
  private async getElementTexts(element: Locator): Promise<string[]> {
    return await element.evaluate((el) => {
      const texts: string[] = [];
      
      // Get text content
      const textContent = el.textContent?.trim();
      if (textContent) texts.push(textContent);
      
      // Get attribute values
      const attributes = [
        'title', 'aria-label', 'alt', 'placeholder', 
        'value', 'data-tooltip', 'name', 'id', 'data-testid',
        'data-test', 'data-qa', 'data-cy', 'data-icon'
      ];
      
      for (const attr of attributes) {
        const value = el.getAttribute(attr);
        if (value) texts.push(value);
      }
      
      // Get class names
      const classNames = el.className.split(/\s+/).filter(Boolean);
      texts.push(...classNames);
      
      // Get data-* attributes
      const dataAttrs = Array.from(el.attributes)
        .filter(attr => attr.name.startsWith('data-'))
        .map(attr => attr.value);
      texts.push(...dataAttrs);
      
      // For SVG elements, get the aria-label or title
      if (el.tagName.toLowerCase() === 'svg') {
        const ariaLabel = el.getAttribute('aria-label');
        const title = el.querySelector('title')?.textContent;
        if (ariaLabel) texts.push(ariaLabel);
        if (title) texts.push(title);
      }
      
      return texts;
    });
  }

  /**
   * Gets the clickable ancestor of an element
   */
  private async getClickableElement(element: Locator): Promise<Locator> {
    return await element.evaluateHandle((node) => {
      // Check if the element itself is clickable
      const isClickable = (el: Element): boolean => {
        const tag = el.tagName.toLowerCase();
        const role = el.getAttribute('role');
        const hasClickHandler = 
          el.hasAttribute('onclick') ||
          el.hasAttribute('onmousedown') ||
          el.hasAttribute('onmouseup');
        
        return (
          tag === 'button' ||
          tag === 'a' ||
          role === 'button' ||
          role === 'link' ||
          hasClickHandler ||
          (tag === 'input' && ['button', 'submit', 'reset'].includes(el.getAttribute('type') || '')) ||
          tag === 'label' ||
          (el as HTMLElement).onclick !== null
        );
      };
      
      // If the element itself is clickable, return it
      if (isClickable(node)) return node;
      
      // Otherwise, find the closest clickable ancestor
      let current: Element | null = node;
      while (current) {
        if (isClickable(current)) {
          return current;
        }
        current = current.parentElement;
      }
      
      // If no clickable ancestor found, return the original element
      return node;
    }) as unknown as Locator;
  }

  /**
   * Clicks an element based on intent
   */
  /**
   * Parses a string like "7th view" into {row: 7, action: 'view'}
   */
  private parseTableIntent(intent: string): {row: number; action: string} | null {
    const match = intent.match(/^(\d+)(?:st|nd|rd|th)?\s*(.*)$/i);
    if (!match) return null;
    
    const row = parseInt(match[1], 10);
    const action = match[2].trim() || 'view'; 
    
    return {row, action};
  }

  /**
   * Finds a table row by its position and action
   */
  private async findTableRow(
    page: Page, 
    rowNum: number, 
    action: string,
    visibleOnly: boolean
  ): Promise<Locator | null> {
    // Try to find all rows in the table
    const rows = page.locator('tr, [role="row"]');
    const rowCount = await rows.count();
    
    // Adjust for 0-based index (1st row is index 0)
    const targetIndex = rowNum - 1;
    
    if (targetIndex < 0 || targetIndex >= rowCount) {
      console.log(`❌ Row ${rowNum} is out of bounds (1-${rowCount})`);
      return null;
    }
    
    // Get the target row
    const targetRow = rows.nth(targetIndex);
    
    // If no specific action requested, return the row itself
    if (!action) return targetRow;
    
    // Look for action buttons within the row
    const actionElements = targetRow.locator('button, a, [role="button"], [onclick]');
    const count = await actionElements.count();
    
    let bestMatch: Locator | null = null;
    let bestScore = 0;
    const searchTerms = this.expandIntent(action);
    
    for (let i = 0; i < count; i++) {
      const el = actionElements.nth(i);
      
      // Skip if we only want visible elements and this one isn't visible
      if (visibleOnly && !(await el.isVisible().catch(() => false))) continue;
      
      // Get all possible text representations of this element
      const texts = await this.getElementTexts(el);
      const fullText = texts.join(' ').toLowerCase();
      
      // Check against each search term
      for (const term of searchTerms) {
        const score = stringSimilarity.compareTwoStrings(fullText, term.toLowerCase());
        const isExactMatch = fullText.includes(term.toLowerCase());
        const finalScore = isExactMatch ? 1.0 : score;
        
        if (finalScore > bestScore) {
          bestScore = finalScore;
          bestMatch = el;
        }
      }
    }
    
    return bestMatch || targetRow; // Fallback to the row itself if no action button found
  }

  async clickSmartIntent(
    page: Page, 
    intent: string, 
    options: ClickOptions = {}
  ): Promise<void> {
    const {
      threshold = 0.3, 
      timeout = 5000,  
      visibleOnly = true
    } = options;
    
    
    const tableIntent = this.parseTableIntent(intent);
    if (tableIntent) {
      console.log(`🔍 Looking for row ${tableIntent.row} with action '${tableIntent.action}'`);
      const rowElement = await this.findTableRow(page, tableIntent.row, tableIntent.action, visibleOnly);
      if (rowElement) {
        try {
          await rowElement.scrollIntoViewIfNeeded();
          await rowElement.click({ timeout: 2000 });
          console.log(`✅ Clicked row ${tableIntent.row} ${tableIntent.action ? `(${tableIntent.action})` : ''}`);
          return;
        } catch (error) {
          console.error(`❌ Failed to click table row: ${error}`);
          throw new Error(`Could not click row ${tableIntent.row}${tableIntent.action ? ` (${tableIntent.action})` : ''}`);
        }
      }
    }
    
    console.log(`🔍 Searching for element with intent: "${intent}"`);
    const searchTerms = this.expandIntent(intent);
    
    // Priority selectors (most specific to least specific)
    const selectors = [
      // Interactive elements
      'button',
      'a',
      '[role="button"]',
      '[role="link"]',
      'input[type="button"]',
      'input[type="submit"]',
      'label',
      
      // Common icon containers
      'svg',
      'i',
      'img',
      
      // Elements with common attributes
      '[aria-label]',
      '[title]',
      '[alt]',
      '[data-testid]',
      '[data-icon]',
      '[data-test]',
      '[data-qa]',
      '[data-cy]',
      
      // Generic interactive elements
      '[onclick]',
      '[onmousedown]',
      '[onmouseup]',
      
      // Fallback to all elements
      '*'
    ];

    let bestMatch: Locator | null = null;
    let bestScore = 0;
    let bestMatchText = '';
    let bestSelector = '';

    const startTime = Date.now();
    
    // Keep trying until timeout
    while (Date.now() - startTime < timeout) {
      for (const selector of selectors) {
        try {
          const elements = page.locator(selector);
          const count = await elements.count().catch(() => 0);

          for (let i = 0; i < count; i++) {
            try {
              const el = elements.nth(i);
              
              // Skip if we only want visible elements and this one isn't visible
              if (visibleOnly && !(await el.isVisible().catch(() => false))) continue;
              
              // Get all possible text representations of this element
              const texts = await this.getElementTexts(el);
              const fullText = texts.join(' ').toLowerCase();
              
              // Skip if no text content
              if (!fullText.trim()) continue;

              // Check against each search term
              for (const term of searchTerms) {
                // Skip empty terms
                if (!term.trim()) continue;
                
                // Calculate similarity score
                const similarity = stringSimilarity.compareTwoStrings(
                  fullText, 
                  term.toLowerCase()
                );
                
                // Boost score for exact matches
                const isExactMatch = fullText.includes(term.toLowerCase());
                const score = isExactMatch ? 1.0 : similarity;

                // Update best match if this is better
                if (score > bestScore && score >= threshold) {
                  bestScore = score;
                  bestMatch = await this.getClickableElement(el);
                  bestMatchText = fullText;
                  bestSelector = selector;
                  
                  // If we have a perfect match, use it immediately
                  if (score === 1.0) break;
                }
              }
              
              // If we found a perfect match, break early
              if (bestScore === 1.0) break;
              
            } catch (error) {
              // Ignore errors with individual elements
              continue;
            }
          }
          
          // If we found a perfect match, break early
          if (bestScore === 1.0) break;
          
        } catch (error) {
          // Ignore errors with selectors
          continue;
        }
      }
      
      // If we found a good enough match, use it
      if (bestScore >= threshold) break;
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // If we found a match, click it
    if (bestMatch) {
      try {
        await bestMatch.scrollIntoViewIfNeeded();
        await bestMatch.click({ timeout: 2000 });
        console.log(`✅ Clicked "${intent}" (${bestScore.toFixed(2)}): "${bestMatchText}" (${bestSelector})`);
        return;
      } catch (error) {
        console.error(`❌ Failed to click element: ${error}`);
        throw new Error(`Found but could not click element for intent: "${intent}"`);
      }
    }

    // No match found
    const errorMessage = `❌ Could not find element for intent: "${intent}"`;
    console.error(errorMessage);
    
    // Take a screenshot for debugging
    try {
      await page.screenshot({ path: `error-${intent.toLowerCase().replace(/\s+/g, '-')}.png` });
    } catch (e) {
      console.error('Failed to take screenshot:', e);
    }
    
    throw new Error(errorMessage);
  }
}
