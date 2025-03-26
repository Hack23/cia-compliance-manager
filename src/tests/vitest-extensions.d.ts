/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Important: Extend the Vitest module directly with the testing-library matchers
declare module "vitest" {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {
    // Core Vitest matchers (explicitly defined to ensure TypeScript recognizes them)
    toBe(expected: any): Assertion<T>;
    toBeCloseTo(expected: number, precision?: number): Assertion<T>;
    toBeDefined(): Assertion<T>;
    toBeFalsy(): Assertion<T>;
    toBeGreaterThan(expected: number): Assertion<T>;
    toBeGreaterThanOrEqual(expected: number): Assertion<T>;
    toBeLessThan(expected: number): Assertion<T>;
    toBeLessThanOrEqual(expected: number): Assertion<T>;
    toBeInstanceOf(expected: any): Assertion<T>;
    toBeNull(): Assertion<T>;
    toBeTruthy(): Assertion<T>;
    toBeUndefined(): Assertion<T>;
    toContain(expected: any): Assertion<T>;
    toContainEqual(expected: any): Assertion<T>;
    toEqual(expected: any): Assertion<T>;
    toHaveLength(expected: number): Assertion<T>;
    toHaveProperty(
      keyPath: string | (string | number)[],
      value?: any
    ): Assertion<T>;
    toMatch(expected: string | RegExp): Assertion<T>;
    toMatchObject(expected: Record<string, any>): Assertion<T>;
    toStrictEqual(expected: any): Assertion<T>;
    toThrow(expected?: string | RegExp | Error): Assertion<T>;
    toThrowError(expected?: string | RegExp | Error): Assertion<T>;
  }

  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<any, void> {}

  interface ExpectStatic {
    extend(matchers: Record<string, unknown>): void;
  }
}

// Add DOM testing mock types
declare global {
  // Add VITEST_COVERAGE property to window
  interface Window {
    VITEST_COVERAGE?: boolean;
  }

  // Add ResizeObserver mock
  class ResizeObserver {
    constructor(callback: ResizeObserverCallback);
    observe(target: Element, options?: ResizeObserverOptions): void;
    unobserve(target: Element): void;
    disconnect(): void;
  }

  interface ResizeObserverCallback {
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
  }

  interface ResizeObserverSize {
    readonly inlineSize: number;
    readonly blockSize: number;
  }

  // IntersectionObserver types
  class IntersectionObserver {
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

  interface IntersectionObserverCallback {
    (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ): void;
  }
}

// Helper utility functions for testing
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
    if (
      typeof message === "string" &&
      (message.includes("canvas") ||
        message.includes("Canvas") ||
        message.includes("Chart"))
    ) {
      return;
    }
    console.info("Filtered console error:", message);
  });
}
