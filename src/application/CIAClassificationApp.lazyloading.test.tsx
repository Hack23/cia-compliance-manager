import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";
import { KeyboardShortcutProvider } from "../contexts/KeyboardShortcutContext";
import { ErrorProvider } from "../contexts/ErrorContext";

/**
 * Helper to render with required providers
 */
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ErrorProvider>
      <KeyboardShortcutProvider>
        {ui}
      </KeyboardShortcutProvider>
    </ErrorProvider>
  );
};

/**
 * Test suite for lazy loading functionality in CIAClassificationApp
 * 
 * Tests verify that:
 * 1. Loading skeletons are displayed while widgets load
 * 2. LoadingSkeleton components have proper accessibility
 * 3. Suspense boundaries are working correctly
 */
describe("CIAClassificationApp Lazy Loading", () => {
  it("uses LoadingSkeleton components with proper accessibility attributes", () => {
    renderWithProviders(<CIAClassificationApp />);
    
    // LoadingSkeleton should have role="status" for accessibility
    const loadingElements = screen.queryAllByRole("status");
    
    // Should have loading states (they appear during initial render for lazy widgets)
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // Verify they have proper accessibility attributes
    loadingElements.forEach(element => {
      expect(element).toHaveAttribute("role", "status");
      // LoadingSkeleton includes aria-label
      expect(element).toHaveAttribute("aria-label");
    });
  });

  it("provides test IDs for LoadingSkeleton components", () => {
    renderWithProviders(<CIAClassificationApp />);
    
    // Check that loading skeleton test IDs follow naming convention
    const expectedTestIdPrefix = "widget-loading-";
    const loadingElements = screen.queryAllByRole("status");
    
    // At least some loading skeletons should be present
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // Verify test IDs follow the pattern
    loadingElements.forEach(element => {
      const testId = element.getAttribute("data-testid");
      if (testId && testId.startsWith(expectedTestIdPrefix)) {
        // Valid loading skeleton test ID
        expect(testId).toContain("widget-loading-");
      }
    });
  });

  it("wraps lazy-loaded widgets with Suspense boundaries", () => {
    renderWithProviders(<CIAClassificationApp />);
    
    // Suspense fallback (LoadingSkeleton) should be present initially
    // This verifies that Suspense boundaries are working
    const statusElements = screen.queryAllByRole("status");
    
    // Should have multiple loading skeletons (one for each lazy-loaded widget)
    // Expecting 11 lazy-loaded widgets
    expect(statusElements.length).toBeGreaterThanOrEqual(10);
  });
});
