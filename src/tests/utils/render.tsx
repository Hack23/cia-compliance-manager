/**
 * React component rendering utilities for testing.
 *
 * This file provides specialized render functions for CIA Compliance Manager
 * components with appropriate context providers.
 *
 * @packageDocumentation
 */

import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import { createSecurityLevelProps } from "./security";

// Import missing react-router-dom or create a mock if not needed
// Mocking BrowserRouter for testing
const BrowserRouter = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

/**
 * Renders a component with Router context
 * @param ui Component to render
 * @param options Render options
 * @returns Testing-library render result
 */
export function renderWithRouter(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(ui, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    ...options,
  });
}

/**
 * Renders a component with security context
 * @param ui Component to render
 * @param securityLevels Security levels to inject
 * @param options Render options
 * @returns Testing-library render result
 */
export function renderWithSecurityContext(
  ui: React.ReactElement,
  securityLevels?: {
    availabilityLevel?: SecurityLevel;
    integrityLevel?: SecurityLevel;
    confidentialityLevel?: SecurityLevel;
  },
  options?: RenderOptions
) {
  const securityContext = createSecurityLevelProps(
    securityLevels?.availabilityLevel,
    securityLevels?.integrityLevel,
    securityLevels?.confidentialityLevel
  );

  // Mock the security context hook
  vi.mock("../../hooks/useSecurityLevelState", () => ({
    __esModule: true,
    useSecurityLevelState: () => securityContext,
  }));

  return render(ui, options);
}

/**
 * Renders a component with theme context
 * @param ui Component to render
 * @param theme Theme to use
 * @param options Render options
 * @returns Testing-library render result
 */
export function renderWithTheme(
  ui: React.ReactElement,
  theme: "light" | "dark" = "light",
  options?: RenderOptions
) {
  // Mock the theme context hook
  vi.mock("../../hooks/useTheme", () => ({
    __esModule: true,
    useTheme: () => ({
      theme,
      toggleTheme: vi.fn(),
    }),
  }));

  return render(ui, options);
}
