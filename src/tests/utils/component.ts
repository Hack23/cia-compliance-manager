/**
 * Component testing utilities for CIA Compliance Manager.
 *
 * This file provides utilities for testing React components,
 * including specialized testing helpers for CIA-specific components.
 *
 * @packageDocumentation
 */

import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";

/**
 * Creates test props for a widget component
 * @param testId Optional test ID for the component
 * @returns Basic widget props
 */
export function createWidgetProps(testId?: string) {
  return {
    testId,
    className: "test-widget-class",
  };
}

/**
 * Creates test props with security level selectors
 * @param levels Security levels to set
 * @returns Props with security level selectors
 */
export function createSecurityLevelSelectorProps(levels?: {
  availability?: SecurityLevel;
  integrity?: SecurityLevel;
  confidentiality?: SecurityLevel;
}) {
  return {
    availabilityLevel: levels?.availability || "Moderate",
    integrityLevel: levels?.integrity || "Moderate",
    confidentialityLevel: levels?.confidentiality || "Moderate",
    onAvailabilityChange: vi.fn(),
    onIntegrityChange: vi.fn(),
    onConfidentialityChange: vi.fn(),
  };
}

/**
 * Creates test ID locator function
 * @param prefix Prefix for test IDs
 * @returns Function to create test IDs with the given prefix
 */
export function createTestIdLocator(prefix: string) {
  return (id: string) => `${prefix}-${id}`;
}

/**
 * Checks if a component has the expected test ID attribute
 * @param component Component to check
 * @param expectedTestId Expected test ID
 * @returns True if the component has the expected test ID
 */
export function hasTestId(component: Element, expectedTestId: string): boolean {
  return component.getAttribute("data-testid") === expectedTestId;
}

/**
 * Creates test click handlers for interactive components
 * @returns Object with click handlers
 */
export function createTestClickHandlers() {
  return {
    onClick: vi.fn(),
    onSelect: vi.fn(),
    onToggle: vi.fn(),
    onAction: vi.fn(),
  };
}
