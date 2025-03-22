/// <reference types="vitest/globals" />

// This file augments the Vitest types to include Jest DOM matchers

import "@testing-library/jest-dom";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import "vitest";

// Extend the Expect interface
declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends TestingLibraryMatchers<T, JestAssertion<T>> {
      // Additional matchers that aren't included in TestingLibraryMatchers
      toHaveBeenCalled(): JestAssertion<T>;
      toHaveBeenCalledTimes(times: number): JestAssertion<T>;
      toHaveBeenCalledWith(...args: any[]): JestAssertion<T>;
      toBeTruthy(): JestAssertion<T>;
      toBeUndefined(): JestAssertion<T>;
      toBeGreaterThan(number: number): JestAssertion<T>;
      toBeGreaterThanOrEqual(number: number): JestAssertion<T>;
      toBeLessThan(number: number): JestAssertion<T>;
      toBeLessThanOrEqual(number: number): JestAssertion<T>;
      toMatch(pattern: RegExp | string): JestAssertion<T>;
      toEqual(value: any): JestAssertion<T>;
      // Add testing-library matchers
      toBeInTheDocument(): void;
      toBeVisible(): void;
      toHaveClass(className: string): void;
      toHaveTextContent(text: string): void;
      toHaveAttribute(attr: string, value?: string): void;
      toBeDisabled(): void;
      toBeEnabled(): void;
      toBeChecked(): void;
      toHaveValue(value: any): void;
      toContainElement(element: HTMLElement | null): void;
      toContainHTML(htmlText: string): void;
      toHaveStyle(css: Record<string, any>): void;
      toHaveLength(length: number): void;
    }
  }

  interface Window {
    VITEST_COVERAGE?: boolean;
  }
}

// Extend the Vi namespace with testing-library matchers
declare namespace Vi {
  interface Assertion {
    // DOM testing library matchers
    toBeInTheDocument(): void;
    toHaveTextContent(text: string | RegExp): void;
    toBeVisible(): void;
    toBeChecked(): void;
    toHaveFocus(): void;
    toHaveAttribute(attr: string, value?: string): void;
    toContainElement(element: HTMLElement | null): void;
    toContainHTML(html: string): void;
    toBeEnabled(): void;
    toBeDisabled(): void;
    toBeInvalid(): void;
    toBeRequired(): void;
    toHaveClass(...classNames: string[]): void;
    toHaveStyle(css: Record<string, any>): void;
    toHaveValue(value: any): void;
    toBeEmptyDOMElement(): void;

    // Additional matchers for testing
    toMatchSnapshot(): void;
    toBeCalledWith(...args: any[]): void;
    toHaveBeenCalledTimes(count: number): void;
    toHaveBeenCalled(): void;
    toBeGreaterThan(expected: number): void;
    toBeGreaterThanOrEqual(expected: number): void;
    toBeLessThan(expected: number): void;
    toBeLessThanOrEqual(expected: number): void;
  }
}

// Extend global Jest expect
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
}

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

// Define vi namespace explicitly
declare namespace vi {
  const fn: typeof import("vitest").vi.fn;
  const mock: typeof import("vitest").vi.mock;
  const spyOn: typeof import("vitest").vi.spyOn;
  const clearAllMocks: typeof import("vitest").vi.clearAllMocks;
  const resetAllMocks: typeof import("vitest").vi.resetAllMocks;
  const restoreAllMocks: typeof import("vitest").vi.restoreAllMocks;
}

// Mock helper functions for testing
export function mockCanvasContext(): void {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 800, height: 600 },
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fill: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    setLineDash: vi.fn(),
    measureText: vi.fn().mockReturnValue({ width: 50 }),
    fillText: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
  });
}

export function suppressCanvasErrors(): ReturnType<typeof vi.spyOn> {
  return vi.spyOn(console, "error").mockImplementation((message) => {
    // Filter out canvas-related errors but allow other errors to pass through
    if (
      typeof message === "string" &&
      (message.includes("canvas") ||
        message.includes("Canvas") ||
        message.includes("Chart"))
    ) {
      return;
    }
    // Call the original console.error for other messages
    console.info("Filtered console error:", message);
  });
}

/**
 * TypeScript declarations for vitest extensions
 *
 * This file adds TypeScript type definitions for custom matchers and global extensions
 * used in the test environment.
 */

// Import base types from vitest
import "vitest";

// Add type definitions for jest-axe
interface AxeMatchers<R = unknown> {
  /**
   * Checks if the HTML element has no accessibility violations
   */
  toHaveNoViolations(): R;
}

// Extend the existing expect interface
interface CustomMatchers<R = unknown>
  extends AxeMatchers<R>,
    TestingLibraryMatchers<R, void> {}

// Add custom matchers to vitest's Assertion interface
declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}

  // Add our global mocks
  interface ImportMeta {
    vitest: {
      resetModules: () => void;
      mock: (path: string, factory?: () => unknown) => void;
      unmock: (path: string) => void;
      stubEnv: (key: string, value: string) => void;
      unstubEnv: (key: string) => void;
      stubGlobal: (key: string, value: unknown) => void;
      unstubGlobal: (key: string) => void;
    };
  }
}

// Declare global (window) mocks
interface MockElementSize {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

interface ResizeObserverCallback {
  (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: ReadonlyArray<ResizeObserverSize>;
  readonly contentBoxSize: ReadonlyArray<ResizeObserverSize>;
  readonly devicePixelContentBoxSize: ReadonlyArray<ResizeObserverSize>;
}

interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element, options?: ResizeObserverOptions): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

declare class IntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  );

  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
  takeRecords(): IntersectionObserverEntry[];
}
