import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';
import type { RunOptions } from 'axe-core';

// Extend Vitest matchers to include axe matchers
expect.extend(matchers);

/**
 * Run accessibility tests on a container element
 * 
 * @param container - DOM element to test
 * @param testName - Optional name for better error messages
 * @returns Promise that resolves when tests pass
 * 
 * @example
 * const { container } = render(<MyWidget />);
 * await testAccessibility(container, 'MyWidget');
 */
export async function testAccessibility(
  container: Element,
  testName?: string
): Promise<void> {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  
  if (testName && results.violations.length > 0) {
    console.error(`Accessibility violations in ${testName}:`, results.violations);
  }
}

/**
 * Run accessibility tests with custom configuration
 * 
 * @param container - DOM element to test
 * @param options - Axe configuration options
 * @returns Promise that resolves when tests pass
 * 
 * @example
 * await testAccessibilityWithOptions(container, {
 *   rules: {
 *     'color-contrast': { enabled: false } // Disable specific rule
 *   }
 * });
 */
export async function testAccessibilityWithOptions(
  container: Element,
  options: RunOptions
): Promise<void> {
  const results = await axe(container, options);
  expect(results).toHaveNoViolations();
}

/**
 * Standard accessibility test suite for widgets
 * Tests common accessibility requirements
 * 
 * @param getContainer - Function that returns the container element
 * @param widgetName - Name of the widget for error messages
 * 
 * @example
 * describe('Accessibility', () => {
 *   createAccessibilityTestSuite(
 *     () => render(<MyWidget />).container,
 *     'MyWidget'
 *   );
 * });
 */
export function createAccessibilityTestSuite(
  getContainer: () => Element,
  widgetName: string
) {
  return {
    testNoViolations: async () => {
      const container = getContainer();
      await testAccessibility(container, widgetName);
    },
    
    testAriaLabels: (expectedLabels: string[]) => {
      const container = getContainer();
      expectedLabels.forEach(label => {
        const element = container.querySelector(`[aria-label="${label}"]`);
        expect(element).toBeTruthy();
      });
    },
    
    testKeyboardNavigation: (testId: string) => {
      const element = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
      expect(element).toBeTruthy();
      
      // Test that element is focusable (has tabIndex or is naturally focusable)
      const isFocusable = 
        element.tabIndex >= 0 || 
        ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
      
      expect(isFocusable).toBe(true);
    }
  };
}

/**
 * Check if an element has proper ARIA attributes
 * 
 * @param testId - Test ID of the element
 * @param expectedAttributes - Object with expected ARIA attributes
 * 
 * @example
 * expectAriaAttributes('my-button', {
 *   'aria-label': 'Close dialog',
 *   'aria-expanded': 'false'
 * });
 */
export function expectAriaAttributes(
  testId: string,
  expectedAttributes: Record<string, string>
) {
  const element = document.querySelector(`[data-testid="${testId}"]`);
  expect(element).toBeTruthy();
  
  Object.entries(expectedAttributes).forEach(([attr, value]) => {
    expect(element?.getAttribute(attr)).toBe(value);
  });
}

/**
 * Check if an element has a proper accessible name
 * Uses ARIA label, title, or text content
 * 
 * @param testId - Test ID of the element
 */
export function expectAccessibleName(testId: string) {
  const element = document.querySelector(`[data-testid="${testId}"]`);
  expect(element).toBeTruthy();
  
  const hasAccessibleName = 
    element?.getAttribute('aria-label') ||
    element?.getAttribute('aria-labelledby') ||
    element?.getAttribute('title') ||
    element?.textContent?.trim();
  
  expect(hasAccessibleName).toBeTruthy();
}

/**
 * Export axe for direct use in tests
 */
export { axe };
