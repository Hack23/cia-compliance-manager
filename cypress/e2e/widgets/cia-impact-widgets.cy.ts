import { SECURITY_LEVELS, TEXT_PATTERNS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

// Test all three CIA impact widgets with similar patterns
[
  {
    name: "Availability Impact",
    id: "availability-impact",
    pattern: TEXT_PATTERNS.AVAILABILITY,
  },
  {
    name: "Integrity Impact",
    id: "integrity-impact",
    pattern: TEXT_PATTERNS.INTEGRITY,
  },
  {
    name: "Confidentiality Impact",
    id: "confidentiality-impact",
    pattern: TEXT_PATTERNS.CONFIDENTIALITY,
  },
].forEach((widget) => {
  describe(`${widget.name} Widget`, () => {
    // Use standard setup for widget tests
    setupWidgetTest(widget.id);

    // Basic existence test
    verifyWidgetExists(widget.id);

    // Test security level changes affect widget content
    it("updates impact assessments when security levels change", () => {
      testSecurityLevelChanges(widget.id);
    });

    // Test impact display with respective high security level
    it(`shows detailed ${widget.name.toLowerCase()} impact with high security`, () => {
      cy.findWidget(widget.id).scrollIntoView();

      // Set security level high for the specific component, others moderate
      const availLevel =
        widget.id === "availability-impact"
          ? SECURITY_LEVELS.HIGH
          : SECURITY_LEVELS.MODERATE;
      const intLevel =
        widget.id === "integrity-impact"
          ? SECURITY_LEVELS.HIGH
          : SECURITY_LEVELS.MODERATE;
      const confLevel =
        widget.id === "confidentiality-impact"
          ? SECURITY_LEVELS.HIGH
          : SECURITY_LEVELS.MODERATE;

      cy.setSecurityLevels(availLevel, intLevel, confLevel);

      // Check for detailed impact assessment
      cy.findWidget(widget.id).within(() => {
        // Check for impact cards or sections
        cy.get(
          `[data-testid*="impact-card"], [class*="impact-card"], [data-testid*="recommendation"]`
        ).should("exist");

        // Check for component-specific text patterns, apply each pattern individually
        if (Array.isArray(widget.pattern)) {
          widget.pattern.forEach((pattern) => {
            cy.contains(pattern).should("exist");
          });
        } else {
          cy.contains(widget.pattern).should("exist");
        }
      });
    });

    // Test recommendation display
    it("displays appropriate recommendations", () => {
      cy.findWidget(widget.id).scrollIntoView();

      // Set all security levels high
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );

      // Check for recommendations
      cy.findWidget(widget.id).within(() => {
        cy.contains(/recommendation|suggest|should|implement|consider/i).should(
          "exist"
        );
      });
    });

    // Test "show more" functionality if available
    it("expands to show more recommendations if available", () => {
      cy.findWidget(widget.id).scrollIntoView();

      // Set moderate security
      cy.setSecurityLevels(
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE
      );

      // Try to find and use "show more" button if it exists
      cy.findWidget(widget.id).then(($widget) => {
        const hasExpandButton =
          $widget.find(
            'button:contains("more"), button:contains("Show"), [data-testid*="show"]'
          ).length > 0;

        if (hasExpandButton) {
          cy.findWidget(widget.id).within(() => {
            cy.contains(/more|show|expand/i).click();

            // Verify more content is visible
            cy.get(
              `[data-testid*="recommendation-3"], [data-testid*="recommendation"]:nth-child(4)`
            ).should("be.visible");
          });
        } else {
          cy.log("No expand button found - skipping expand test");
        }
      });
    });
  });
});
