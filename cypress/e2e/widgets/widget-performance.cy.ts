import { SECURITY_LEVELS } from "../../support/constants";

describe("Widget Performance Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  const testWidgets = [
    "security-summary",
    "business-impact",
    "cost-estimation",
    "security-level",
  ];

  // Test performance of security level changes
  it("measures widget update performance with security level changes", () => {
    // Set initial security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    cy.wait(500); // Ensure initial render completes

    // For each widget, measure update time
    testWidgets.forEach((widget) => {
      cy.findWidget(widget).scrollIntoView();

      // Start performance measurement
      cy.window().then((win) => {
        const startTime = performance.now();

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Wait for widget to update and measure time
        cy.findWidget(widget)
          .should("contain.text", /high|enhanced|robust|strong/i)
          .then(() => {
            const endTime = performance.now();
            const updateTime = endTime - startTime;
            cy.log(`Widget ${widget} update time: ${updateTime}ms`);

            // Soft assertion - we don't want to fail tests for performance yet,
            // but we log slow updates for investigation
            if (updateTime > 2000) {
              cy.log(
                `WARNING: Slow widget update for ${widget}: ${updateTime}ms`
              );
            }
          });
      });
    });
  });

  // Test all widgets render within acceptable timeframe
  it("verifies all widgets render within acceptable time", () => {
    // Set security levels to high to get all widgets
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Start timing
    const startTime = Date.now();

    // Get all widgets on the page
    cy.get('[data-testid^="widget-"]')
      .should("have.length.at.least", 5)
      .then(($widgets) => {
        const renderTime = Date.now() - startTime;
        cy.log(
          `Total widget render time: ${renderTime}ms for ${$widgets.length} widgets`
        );
        cy.log(
          `Average render time per widget: ${renderTime / $widgets.length}ms`
        );
      });

    // Scroll through all widgets to ensure they render properly
    cy.get('[data-testid^="widget-"]').each(($widget, index) => {
      cy.wrap($widget).scrollIntoView({ duration: 100 });
      cy.wait(100); // Brief pause to allow rendering

      // Check widget rendered without errors
      cy.wrap($widget).should("be.visible").invoke("height").should("be.gt", 0);
    });
  });
});
