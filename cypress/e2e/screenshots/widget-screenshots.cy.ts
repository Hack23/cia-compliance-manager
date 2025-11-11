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

  // Reduced to only critical widgets to capture - reduces test time significantly
  const essentialWidgets = [
    "security-level",
    "security-summary",
    "compliance-status",
  ];

  // Only run screenshot tests when explicitly enabled or on scheduled runs
  before(function() {
    if (!Cypress.env('CAPTURE_SCREENSHOTS') && Cypress.config('isInteractive')) {
      cy.log('Skipping screenshot tests - set CAPTURE_SCREENSHOTS=true to enable');
      this.skip();
    }
  });

  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(viewportWidth, viewportHeight);
    applyTestStyles();
  });

  it("captures full dashboard grid in light mode only", () => {
    // Set wider viewport to ensure all columns are visible
    cy.viewport(2400, 1200);
    // Ensure grid layout is properly displayed
    cy.get('[data-testid="dashboard-grid"]').should("be.visible");

    // Capture only light mode to reduce test time by 50%
    cy.screenshot("dashboard-grid-light", { capture: "viewport" });
  });

  it("captures essential widgets in light theme only", () => {
    // Capture only light theme to reduce test time - dark theme can be tested separately if needed
    essentialWidgets.forEach((widgetName) => {
      cy.log(`Capturing widget: ${widgetName}`);

      // Simplified capture - just take a single screenshot
      cy.findWidget(widgetName).then(($widget) => {
        if ($widget.length > 0) {
          cy.wrap($widget.first()).screenshot(`widget-${widgetName}-light`, {
            overwrite: true,
          });
        }
      });
    });
  });
});
