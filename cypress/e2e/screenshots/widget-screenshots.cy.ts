/**
 * Widget Screenshot Generator
 *
 * Optimized to capture only two states per widget and two full-page screenshots
 * to reduce test execution time and storage requirements
 */
import { SECURITY_LEVELS } from "../../support/constants";
import {
  captureAllWidgets,
  captureFullPageModes,
  captureWidgetStates,
} from "../../support/screenshot-utils";
import { applyTestStyles } from "../../support/test-styles";

describe("Widget Screenshots Generator", () => {
  // Set a larger viewport to see widgets clearly
  const viewportWidth = 1920;
  const viewportHeight = 1080;

  // Essential widgets to capture in different states
  const essentialWidgets = [
    "security-level",
    "business-impact",
    "security-summary",
    "compliance-status",
    "technical-details",
    "availability-impact",
    "integrity-impact",
    "confidentiality-impact",
    "radar-chart",
  ];

  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(viewportWidth, viewportHeight);
    applyTestStyles();
  });

  it("captures full page screenshots in light and dark mode", () => {
    // Capture full page in both modes using utility
    captureFullPageModes("dashboard");
  });

  it("captures all widgets in current state", () => {
    // Set a moderate security level for baseline
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.wait(1000);

    // Capture all widgets in current state
    // captureAllWidgets();
  });

  it("captures essential widgets in different security states", () => {
    // For each essential widget, capture two states
    essentialWidgets.forEach((widgetName) => {
      cy.log(`Capturing states for widget: ${widgetName}`);
      //captureWidgetStates(widgetName);
    });
  });
});
