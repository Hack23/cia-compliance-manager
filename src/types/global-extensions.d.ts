import "@testing-library/jest-dom";

// Add global test utility types
declare global {
  namespace Vi {
    interface JestAssertion {
      toBeInTheDocument(): any;
      toHaveTextContent(text: string | RegExp): any;
      toHaveAttribute(name: string, value?: string): any;
      toBeChecked(): any;
      toBeDisabled(): any;
      toBeEnabled(): any;
      toBeRequired(): any;
      toBeValid(): any;
      toBeVisible(): any;
      toContainElement(element: HTMLElement | null): any;
      toContainHTML(htmlText: string): any;
      toHaveClass(...classNames: string[]): any;
      toHaveFocus(): any;
      toHaveFormValues(expectedValues: Record<string, any>): any;
      toHaveStyle(css: string | Record<string, any>): any;
      toHaveValue(value?: string | string[] | number): any;
    }
  }

  // Add window extensions for Cypress
  interface Window {
    Cypress?: any;
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
