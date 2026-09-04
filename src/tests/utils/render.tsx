/**
 * React component rendering utilities for testing.
 *
 * This file provides specialized render functions for CIA Compliance Manager
 * components with appropriate context providers.
 *
 * @packageDocumentation
 */

import {
  fireEvent,
  render,
  RenderOptions,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import { createSecurityLevelProps } from "./security";

type SecurityContext = ReturnType<typeof createSecurityLevelProps>;

const securityContextMock = vi.hoisted(() => ({
  current: undefined as SecurityContext | undefined,
}));

const themeMock = vi.hoisted(() => ({
  current: "light" as "light" | "dark",
}));

vi.mock("../../hooks/useSecurityLevelState", () => ({
  __esModule: true,
  useSecurityLevelState: () => securityContextMock.current,
}));

vi.mock("../../hooks/useTheme", () => ({
  __esModule: true,
  useTheme: () => ({
    theme: themeMock.current,
    toggleTheme: vi.fn(),
  }),
}));

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

  securityContextMock.current = securityContext;

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
  themeMock.current = theme;

  return render(ui, options);
}

/**
 * Renders a component with basic test configuration
 */
export function renderWithTestConfig(ui: React.ReactElement) {
  return render(ui, {
    // Add any global test configuration here
  });
}

// Re-export from @testing-library/react for convenience
export { fireEvent, render, screen, waitFor };
