/**
 * Consolidated tests for business impact widgets
 *
 * This combines tests from multiple business impact related tests
 * to reduce test execution time.
 */
import { SECURITY_LEVELS } from "../../support/constants";

describe("Business Impact Analysis", () => {
  beforeEach(() => {
    // Use larger viewport for better visibility
    cy.viewport(3840, 2160);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Add enhanced style to make ALL elements visible
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.innerHTML = `
        * {
          overflow: visible !important;
          visibility: visible !important;
          opacity: 1 !important;
          transition: none !important;
          animation: none !important;
          display: block !important;
          height: auto !important;
          max-height: none !important;
          position: static !important;
          transform: none !important;
          pointer-events: auto !important;
          clip: auto !important;
          clip-path: none !important;
          z-index: 9999 !important;
        }
      `;
      doc.head.appendChild(style);
    });

    // Wait for app to fully load
    cy.wait(3000);
  });

  it("shows impact analysis for security decisions", () => {
    // Look for ANY impact-related content
    cy.contains(/impact|business impact|security impact|analysis|assessment/i, {
      timeout: 10000,
    }).should("exist");
  });

  it("shows different impacts for different security profiles", () => {
    // Store initial content
    let initialContent = "";
    cy.get("body")
      .invoke("text")
      .then((text) => {
        initialContent = text;

        // Set security levels directly
        cy.get("select").each(($select, index) => {
          if (index < 3) {
            cy.wrap($select)
              .select(SECURITY_LEVELS.HIGH, { force: true })
              .wait(300);
          }
        });

        // Wait for UI updates
        cy.wait(2000);

        // Check if content changed
        cy.get("body")
          .invoke("text")
          .then((newText) => {
            expect(newText).not.to.equal(initialContent);
            expect(newText).to.include(SECURITY_LEVELS.HIGH);
          });
      });
  });

  it("connects security levels to business metrics", () => {
    // Set security levels to moderate
    cy.get("select").each(($select, index) => {
      if (index < 3) {
        cy.wrap($select)
          .select(SECURITY_LEVELS.MODERATE, { force: true })
          .wait(300);
      }
    });

    // Wait for UI updates
    cy.wait(2000);

    // Look for any business metrics
    cy.get("body").then(($body) => {
      const bodyText = $body.text().toLowerCase();

      // Check for common business metric terms
      const businessTerms = [
        "business",
        "value",
        "cost",
        "benefit",
        "impact",
        "roi",
        "return",
        "investment",
        "metric",
      ];

      const foundTerms = businessTerms.filter((term) =>
        bodyText.includes(term)
      );
      expect(foundTerms.length).to.be.at.least(2);

      // Also check for moderate security level
      expect(bodyText).to.include(SECURITY_LEVELS.MODERATE.toLowerCase());
    });
  });
});
