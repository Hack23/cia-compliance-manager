import "@testing-library/jest-dom";

// Add global test utility types
declare global {
  namespace Vi {
    interface JestAssertion {
      toBeInTheDocument(): Vi.JestAssertion;
      toHaveTextContent(text: string | RegExp): Vi.JestAssertion;
      toHaveAttribute(name: string, value?: string): Vi.JestAssertion;
      toBeChecked(): Vi.JestAssertion;
      toBeDisabled(): Vi.JestAssertion;
      toBeEnabled(): Vi.JestAssertion;
      toBeRequired(): Vi.JestAssertion;
      toBeValid(): Vi.JestAssertion;
      toBeVisible(): Vi.JestAssertion;
      toContainElement(element: HTMLElement | null): Vi.JestAssertion;
      toContainHTML(htmlText: string): Vi.JestAssertion;
      toHaveClass(...classNames: string[]): Vi.JestAssertion;
      toHaveFocus(): Vi.JestAssertion;
      toHaveFormValues(expectedValues: Record<string, unknown>): Vi.JestAssertion;
      toHaveStyle(css: string | Record<string, unknown>): Vi.JestAssertion;
      toHaveValue(value?: string | string[] | number): Vi.JestAssertion;
    }
  }

  // Add window extensions for Cypress
  interface Window {
    Cypress?: typeof Cypress;
    consoleErrors?: string[];
    cypressPerformanceMetrics?: {
      records: Array<{
        name: string;
        duration: number;
        category: string;
        timestamp: number;
      }>;
      startTime: number;
    };
  }
}

export {};
