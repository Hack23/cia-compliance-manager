import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

// Extend Vitest's expect with Jest DOM matchers
expect.extend(matchers);

// This setup file runs before all tests
