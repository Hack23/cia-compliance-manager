import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import {
  testSecurityLevelChanges,
  testWidgetTabSwitching,
} from "./widget-test-helper";

describe("Technical Details Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("technical-details");

  // Basic existence test
  verifyWidgetExists("technical-details");

  // Test security level changes affect widget content
  it("updates technical details when security levels change", () => {
    testSecurityLevelChanges("technical-details");
  });

  // Test tab navigation if present
  it("switches between CIA tabs if present", () => {
    cy.findWidget("technical-details").scrollIntoView();

    // Check if tabs exist and test switching between them
    cy.findWidget("technical-details").then(($widget) => {
      // Look for tab elements
      const hasTabs =
        $widget.find(
          '[role="tab"], button:contains("Availability"), button:contains("Integrity")'
        ).length > 0;

      if (hasTabs) {
        testWidgetTabSwitching("technical-details", [
          /availability/i,
          /integrity/i,
          /confidentiality/i,
        ]);
      } else {
        cy.log("No tabs found in technical details widget - skipping tab test");
      }
    });
  });

  // Test implementation steps display
  it("displays implementation steps for selected security levels", () => {
    cy.findWidget("technical-details").scrollIntoView();

    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check for implementation steps or instructions
    cy.findWidget("technical-details").within(() => {
      cy.contains(/implementation|step|instructions|how to|procedure/i).should(
        "exist"
      );

      // Look for numbered steps or bullets
      cy.get("ol li, ul li, [data-testid*='step'], [class*='step']").should(
        "have.length.at.least",
        1
      );
    });
  });

  // Test technical recommendations are security-level appropriate
  it("provides security-appropriate technical recommendations", () => {
    cy.findWidget("technical-details").scrollIntoView();

    // Change to high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check for advanced technical terms
    cy.findWidget("technical-details").within(() => {
      // These terms should appear in high security technical details
      cy.contains(
        /encryption|authentication|authorization|audit|monitoring|redundancy/i
      ).should("exist");
    });

    // Change to low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Check for basic technical terms instead
    cy.findWidget("technical-details").within(() => {
      // These terms should appear in basic technical details
      cy.contains(/password|backup|update|patch|basic/i).should("exist");
    });
  });
});
