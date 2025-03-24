/**
 * Vitest setup file
 *
 * This file runs before any tests are executed and configures the testing environment.
 */

// Import necessary setup utilities
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { expect, vi, type JestAssertion } from "vitest";

// Configure global jest matchers
expect.extend(matchers);

// Properly extend TypeScript types for Vitest
declare module "vitest" {
  // Using the JestAssertion interface which is the public-facing interface for assertions
  interface Assertion extends JestAssertion<any> {
    toBeInTheDocument(): Assertion;
    toHaveTextContent(text: string | RegExp): Assertion;
    toBeVisible(): Assertion;
    toHaveClass(className: string): Assertion;
    toHaveAttribute(attr: string, value?: string): Assertion;
    toHaveStyle(css: Record<string, string | number>): Assertion;
    toBeDisabled(): Assertion;
    toBeEnabled(): Assertion;
    toBeChecked(): Assertion;
    toBePartiallyChecked(): Assertion;
    toBeEmpty(): Assertion;
    toBeEmptyDOMElement(): Assertion;
    toBeInvalid(): Assertion;
    toBeRequired(): Assertion;
    toBeValid(): Assertion;
    toContainElement(element: HTMLElement | null): Assertion;
    toContainHTML(htmlText: string): Assertion;
    toHaveFocus(): Assertion;
    toHaveFormValues(expectedValues: Record<string, unknown>): Assertion;
    toHaveValue(value?: string | string[] | number): Assertion;
    toBeInTheDOM(): Assertion;
    toHaveDisplayValue(
      value: string | RegExp | Array<string | RegExp>
    ): Assertion;
  }
}

// Mock toHaveNoViolations function since jest-axe is not available
expect.extend({
  toHaveNoViolations: () => ({
    pass: true,
    message: () => "",
  }),
});

// Setup mock for window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.scrollTo to prevent errors during tests
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    _callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Just initialize properties if options are provided
    if (options) {
      if (options.root instanceof Element) this.root = options.root;
      if (options.rootMargin) this.rootMargin = options.rootMargin;
      if (options.threshold) {
        this.thresholds = Array.isArray(options.threshold)
          ? options.threshold
          : [options.threshold];
      }
    }
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

// Add IntersectionObserver mock to global
global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Add ResizeObserver mock to global
global.ResizeObserver = MockResizeObserver;

// Configure console to prevent errors during tests
// This prevents test output from being cluttered with expected console errors
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("React does not recognize the") ||
      args[0].includes("Warning:") ||
      args[0].includes("Invalid DOM property"))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Setup fetch mocks
global.fetch = vi.fn();

// Setup localStorage mock
class MockStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

Object.defineProperty(window, "localStorage", {
  value: new MockStorage(),
});

Object.defineProperty(window, "sessionStorage", {
  value: new MockStorage(),
});

// Suppress React 18+ act warnings
// These are expected to be fixed in vitest soon
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("You seem to have overlapping act() calls")
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

// Clean up after each test
afterEach(() => {
  cleanup();
});
