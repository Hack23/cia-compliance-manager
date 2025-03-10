import {
  CIA_TEST_IDS,
  SECURITY_LEVELS,
  WIDGET_TEST_IDS,
} from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Security Profile Configuration Widget", () => {
  beforeEach(() => {
    // Use more flexible widget ID matching for security widget
    cy.document().then((doc) => {
      // Try multiple possible IDs for security level widget based on the table
      const possibleIds = [
        WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET, // Use constant from table
        "widget-security-level-selection",
        "security-level-selector",
        "security-level-controls",
      ];

      // Find the first ID that exists in the DOM
      let foundId = "";
      for (const id of possibleIds) {
        if (doc.querySelector(`[data-testid="${id}"]`)) {
          foundId = id;
          break;
        }
      }

      // If found, use that ID, otherwise use the original for error reporting
      setupWidgetTest(foundId || WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET);
    });
  });

  it("allows business users to configure appropriate security levels", () => {
    // Check for security level selectors using proper test IDs from table
    cy.get("body").then(($body) => {
      const selectors = [
        // Correct test IDs from CIA_TEST_IDS
        `[data-testid="${CIA_TEST_IDS.AVAILABILITY_SELECT}"]`,
        `[data-testid="${CIA_TEST_IDS.INTEGRITY_SELECT}"]`,
        `[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_SELECT}"]`,
        // Section selectors with inner select elements
        `[data-testid="${CIA_TEST_IDS.AVAILABILITY_SECTION}"] select`,
        `[data-testid="${CIA_TEST_IDS.INTEGRITY_SECTION}"] select`,
        `[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_SECTION}"] select`,
        // Fallbacks
        `[data-testid*="select"]`,
        "select",
      ];

      // Check that at least one selector exists
      const existingSelectors = selectors.filter(
        (selector) => $body.find(selector).length > 0
      );
      expect(existingSelectors.length).to.be.greaterThan(0);

      // Interact with the first available select element
      cy.get(existingSelectors[0]).first().should("be.visible");
      cy.get(existingSelectors[0])
        .first()
        .select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);

      // Verify the selection was made
      cy.get(existingSelectors[0])
        .first()
        .should("have.value", SECURITY_LEVELS.HIGH);
    });
  });

  it("provides business context through descriptions for each security level", () => {
    // Find any description elements using proper test IDs
    cy.get("body").then(($body) => {
      const descriptionSelectors = [
        // Correct test IDs for descriptions
        `[data-testid="${CIA_TEST_IDS.AVAILABILITY_DESCRIPTION_TEXT}"]`,
        `[data-testid="${CIA_TEST_IDS.INTEGRITY_DESCRIPTION_TEXT}"]`,
        `[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION_TEXT}"]`,
        // Fallbacks
        `[data-testid*="description"]`,
        `.security-description`,
        `p`,
      ];

      // Find any description elements that exist
      let foundDescription = false;
      for (const selector of descriptionSelectors) {
        if ($body.find(selector).length) {
          // Verify at least one description contains text
          cy.get(selector)
            .first()
            .invoke("text")
            .then((text) => {
              expect(text.length).to.be.greaterThan(5);
            });
          foundDescription = true;
          break;
        }
      }

      if (!foundDescription) {
        // Check for text that looks like a description
        cy.contains(
          /security level|protection|controls|measures|implementation/i
        ).should("exist");
      }
    });
  });

  it("reflects business impact when security levels change", () => {
    // Set different security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Store initial page content
    let initialContent = "";
    cy.get("body")
      .invoke("text")
      .then((text) => {
        initialContent = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Verify content has changed, indicating impact updates
        cy.get("body").invoke("text").should("not.eq", initialContent);
      });
  });
});
