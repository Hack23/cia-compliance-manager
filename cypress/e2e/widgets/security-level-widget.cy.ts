import { CIA_TEST_IDS, SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";

describe("Security Level Widget", () => {
  setupWidgetTest("security-level");

  verifyWidgetExists("security-level");

  it("allows setting all CIA security components", () => {
    // Find security level controls
    cy.findSecurityLevelControls().should("exist").scrollIntoView();

    // Set specific levels for each component and verify
    const testLevels = [
      {
        component: "availability",
        level: SECURITY_LEVELS.HIGH,
        selectId: CIA_TEST_IDS.AVAILABILITY_SELECT,
      },
      {
        component: "integrity",
        level: SECURITY_LEVELS.MODERATE,
        selectId: CIA_TEST_IDS.INTEGRITY_SELECT,
      },
      {
        component: "confidentiality",
        level: SECURITY_LEVELS.LOW,
        selectId: CIA_TEST_IDS.CONFIDENTIALITY_SELECT,
      },
    ];

    // Set each level and verify immediately - fail fast if any set fails
    testLevels.forEach(({ component, level, selectId }) => {
      // Find the select for this component using the explicit ID
      cy.get(`[data-testid="${selectId}"]`)
        .should("exist")
        .select(level, { force: true });

      // Verify the selection worked (fail fast)
      cy.get(`[data-testid="${selectId}"]`).should("have.value", level);
    });
  });

  it("shows proper descriptions for each security level", () => {
    cy.findSecurityLevelControls().scrollIntoView();

    // Set all to high security and verify descriptions
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.wait(300);

    // Verify descriptions mention "high" security
    cy.findWidget("security-level").within(() => {
      cy.get(`[data-testid*="description"], [class*="description"]`).should(
        "contain",
        /high|strong|robust|enhanced/i
      );
    });

    // Now set to low and verify descriptions change
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    cy.wait(300);

    // Verify descriptions mention "low" security
    cy.findWidget("security-level").within(() => {
      cy.get(`[data-testid*="description"], [class*="description"]`).should(
        "contain",
        /low|basic|minimal|standard/i
      );
    });
  });

  it("displays visual indicators for different security levels", () => {
    cy.findSecurityLevelControls().scrollIntoView();

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    cy.wait(300);

    // Check for visual indicators - should be different for each level
    cy.findWidget("security-level").within(() => {
      // Look for indicator elements - could be color bars, icons, badges
      cy.get(
        `[data-testid*="indicator"], [data-testid*="color"], [class*="indicator"], [class*="level-badge"]`
      ).should("have.length.at.least", 3);
    });
  });
});
