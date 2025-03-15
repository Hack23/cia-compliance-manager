import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";

describe("Security Profile Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("security-profile");

  // Basic existence test
  verifyWidgetExists("security-profile");

  // Test profile changes with different security levels
  it("displays appropriate security profile for different security levels", () => {
    cy.findWidget("security-profile").scrollIntoView();

    // Test with low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    cy.wait(1000); // Wait for UI updates

    // Capture initial profile content
    cy.findWidget("security-profile").invoke("text").as("lowSecurityContent");

    // Test with high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.wait(1000); // Wait for UI updates

    // Verify profile changed
    cy.findWidget("security-profile")
      .invoke("text")
      .then((highSecurityText) => {
        cy.get("@lowSecurityContent").then((lowSecurityText) => {
          expect(highSecurityText).not.to.equal(lowSecurityText);
        });
      });
  });

  // Test profile details are displayed
  it("shows detailed security profile information", () => {
    cy.findWidget("security-profile").scrollIntoView();

    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    cy.wait(1000); // Wait for UI updates

    // Look for profile-related content
    cy.findWidget("security-profile").within(() => {
      cy.contains(/profile|classification|category|level/i).should("exist");
    });
  });
});
