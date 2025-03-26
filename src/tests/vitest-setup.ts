/**
 * Global Vitest setup file
 * This file runs before all tests to set up the testing environment
 */
import "@testing-library/jest-dom"; // This adds the matchers to Vitest's expect
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";

// Add all jest-dom matchers to Vitest
// No need for typecasting here, just directly extend
expect.extend(matchers);

// Set up common mocks that all tests might need
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock canvas
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

// Mock intersection observer
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Vitest specific globals
(window as any).VITEST_COVERAGE = true;

// Import necessary setup utilities
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

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
