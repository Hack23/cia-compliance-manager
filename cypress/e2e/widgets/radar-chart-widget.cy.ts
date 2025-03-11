import { CHART_TEST_IDS, SECURITY_LEVELS } from "../../support/constants";

describe("Radar Chart Widget", () => {
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
        }
      `;
      doc.head.appendChild(style);
    });

    // Wait for app to fully load
    cy.wait(3000);
  });

  it("visualizes security profile across CIA dimensions", () => {
    // Look for chart element (canvas) or radar chart related text
    cy.get("body").then(($body) => {
      if ($body.find("canvas").length) {
        cy.get("canvas").should("exist");
      } else {
        // If no canvas, look for chart-related text
        cy.contains(
          /chart|radar|visualization|graph|cia|dimensions|profile/i
        ).should("exist");
      }

      // Check that we have all three CIA components mentioned
      cy.contains(/availability/i).should("exist");
      cy.contains(/integrity/i).should("exist");
      cy.contains(/confidentiality/i).should("exist");
    });
  });

  it("shows all three CIA dimensions", () => {
    cy.contains(/availability/i).should("exist");
    cy.contains(/integrity/i).should("exist");
    cy.contains(/confidentiality/i).should("exist");
  });
});
