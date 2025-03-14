import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest } from "./base-widget-tests";

describe("Security Dashboard Widget", () => {
  // Setup test environment
  setupWidgetTest("dashboard-grid");

  // Basic existence test
  it("displays dashboard grid with multiple widgets", () => {
    cy.get(`[data-testid="dashboard-grid"]`).should("exist").scrollIntoView();

    // Check that essential widgets are present
    const essentialWidgets = [
      "security-level",
      "security-summary",
      "cost-estimation",
    ];

    // Fail fast if any essential widget is missing
    essentialWidgets.forEach((widgetId) => {
      cy.findWidget(widgetId).should("exist");
    });
  });

  // Test security level responsiveness across the dashboard
  it("updates all widgets when security levels change", () => {
    // Set initial security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Wait for changes to propagate
    cy.wait(500);

    // Capture the content of several widgets
    const widgetsToCheck = [
      "security-summary",
      "business-impact",
      "cost-estimation",
    ];

    // Store initial content
    widgetsToCheck.forEach((widget) => {
      cy.findWidget(widget).invoke("text").as(`${widget}InitialContent`);
    });

    // Change to high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for changes to propagate
    cy.wait(500);

    // Verify all widgets updated
    widgetsToCheck.forEach((widget) => {
      cy.get(`@${widget}InitialContent`).then((initialContent) => {
        cy.findWidget(widget).invoke("text").should("not.eq", initialContent);
      });
    });
  });

  // Test widget layout responsiveness
  it("maintains proper widget layout with different security profiles", () => {
    // Test different security profiles and verify the layout
    const securityProfiles = [
      {
        name: "Low Security",
        levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        minWidgetCount: 3,
      },
      {
        name: "High Security",
        levels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
        ],
        minWidgetCount: 5,
      },
      {
        name: "Mixed Security",
        levels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.LOW,
        ],
        minWidgetCount: 4,
      },
    ];

    // Test each profile
    securityProfiles.forEach((profile) => {
      cy.log(`Testing ${profile.name} profile`);

      // Set security levels
      cy.setSecurityLevels(...profile.levels);
      cy.wait(500);

      // Verify minimum widget count
      cy.get('[data-testid^="widget-"]').should(
        "have.length.at.least",
        profile.minWidgetCount
      );

      // Verify no layout-breaking styles
      cy.get('[data-testid^="widget-"]').each(($widget) => {
        // Check for visible overflow or collapsed height
        cy.wrap($widget)
          .should("be.visible")
          .invoke("height")
          .should("be.gt", 0);
      });
    });
  });
});
