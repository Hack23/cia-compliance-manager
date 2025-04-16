/**
 * Widget Screenshot Generator for UI/UX improvements
 *
 * Focused on capturing light & dark theme screenshots of each widget
 */
import {
  captureFullDashboardGrid,
  captureSimpleWidgetThemes,
} from "../../support/screenshot-utils";
import { applyTestStyles } from "../../support/test-styles";

describe("Widget UI/UX Screenshots", () => {
  // Set a larger viewport to see widgets clearly
  const viewportWidth = 1920;
  const viewportHeight = 1080;

  // Essential widgets to capture in different themes
  const essentialWidgets = [
    "security-level",
    "business-impact",
    "security-summary",
    "compliance-status",
    "technical-details",
    "security-visualization",
    "value-creation",
  ];

  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(viewportWidth, viewportHeight);
    applyTestStyles();
  });

  it("captures full dashboard grid with widgets in light and dark mode", () => {
    // Set wider viewport to ensure all columns are visible
    cy.viewport(2400, 1200);
    // Ensure grid layout is properly displayed
    cy.get('[data-testid="dashboard-grid"]').should("be.visible");

    // Capture optimized grid screenshots only (no HTML)
    captureFullDashboardGrid("dashboard-grid");
  });

  it("captures essential widgets in both light and dark themes", () => {
    // For each essential widget, capture both light and dark themes
    essentialWidgets.forEach((widgetName) => {
      cy.log(`Capturing themes for widget: ${widgetName}`);

      // Use the simplified capture function
      captureSimpleWidgetThemes(widgetName);
    });
  });
});
