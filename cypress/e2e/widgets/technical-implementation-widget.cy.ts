import { SECURITY_LEVELS } from "../../support/constants";

describe("Technical Implementation Widget", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Set security levels high to ensure we get detailed implementation information
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for data to load
    cy.wait(500);
  });

  it("provides detailed technical guidance for implementation", () => {
    // Get the widget container and use first() to ensure one element
    cy.get(".widget")
      .first()
      .within(() => {
        // Look for technical guidance content
        cy.contains(
          /technical details|implementation|security controls/i
        ).should("exist");

        // Verify technical content includes recommended practices
        cy.get("body").then(($body) => {
          const contentText = $body.text().toLowerCase();
          // Look for common security implementation terms
          expect(
            contentText.includes("monitoring") ||
              contentText.includes("backup") ||
              contentText.includes("encryption") ||
              contentText.includes("authentication")
          ).to.be.true;
        });
      });
  });

  it("adapts guidance to different security levels", () => {
    // First check with low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // Store technical content with low security
    let lowLevelContent = "";
    cy.get(".widget")
      .first()
      .invoke("text")
      .then((text) => {
        lowLevelContent = text;

        // Now switch to high security
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500);

        // Verify content changes with security level
        cy.get(".widget")
          .first()
          .invoke("text")
          .should("not.eq", lowLevelContent);
      });
  });

  it("provides technical details useful for implementation planning", () => {
    cy.get(".widget")
      .first()
      .within(() => {
        // Look for implementation steps or details
        cy.contains(/steps|procedure|implementation|configuration/i).should(
          "exist"
        );
      });
  });
});
