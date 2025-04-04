/**
 * DOM testing utilities for CIA Compliance Manager.
 *
 * @packageDocumentation
 */

import { vi } from "vitest";

/**
 * Sets up mocks for DOM APIs that might be needed in tests
 */
export function mockDOMAPIs() {
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock localStorage
  const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
}

/**
 * Checks if a DOM element has a specific CSS class
 * @param element Element to check
 * @param className Class name to check for
 * @returns True if the element has the class
 */
export function hasClass(element: Element, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Checks if an element has a security level class
 * @param element Element to check
 * @param level Security level to check for
 * @returns True if the element has the class
 */
export function checkSecurityLevelColor(
  element: Element,
  level: "none" | "low" | "moderate" | "high" | "very-high"
): boolean {
  return hasClass(element, `security-level-${level}`);
}
