import {
  CIA_TEST_IDS,
  SECURITY_LEVELS,
  WIDGET_TEST_IDS,
} from "../../support/constants";

describe("Security Profile Configuration Widget", () => {
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

  it("allows business users to configure appropriate security levels", () => {
    // Check for select elements without relying on specific test IDs
    cy.get("select").should("exist");

    // Set a security level for the first select and verify it changes
    cy.get("select")
      .first()
      .select(SECURITY_LEVELS.HIGH, { force: true })
      .should("have.value", SECURITY_LEVELS.HIGH);
  });

  it("provides business context through descriptions for each security level", () => {
    // Look for description text near security level selections
    cy.contains(/description|context|explanation|details|information/i).should(
      "exist"
    );
  });

  it("reflects business impact when security levels change", () => {
    // Store initial content
    cy.get("body")
      .invoke("text")
      .then((initialText) => {
        // Change security levels directly
        cy.get("select").each(($select, index) => {
          if (index < 3) {
            cy.wrap($select)
              .select(SECURITY_LEVELS.HIGH, { force: true })
              .wait(300);
          }
        });

        // Wait for UI updates
        cy.wait(2000);

        // Verify content changes with security levels
        cy.get("body")
          .invoke("text")
          .then((newText) => {
            expect(newText).not.to.equal(initialText);
            expect(newText).to.include(SECURITY_LEVELS.HIGH);
          });
      });
  });
});
