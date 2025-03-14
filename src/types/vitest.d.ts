/// <reference types="vitest" />
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with Jest-DOM matchers
interface CustomMatchers<R = unknown>
  extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export {};
