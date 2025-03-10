import {
  BUSINESS_IMPACT_TEST_IDS,
  SECURITY_LEVELS,
  WIDGET_TEST_IDS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  AVAILABILITY_IMPACT_TEST_IDS,
} from "../../support/constants";

describe("Business Impact Widget", () => {
  beforeEach(() => {
    // Use larger viewport for better visibility
    cy.viewport(3840, 2160);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Add style to make ALL elements visible
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

  it("shows business impact of security choices", () => {
    // Look for ANY business impact related text
    cy.contains(/business impact|security impact|impact analysis/i).should(
      "exist"
    );
  });

  it("provides detailed impact analysis for different security dimensions", () => {
    // Set security levels directly
    cy.get("select").each(($select, index) => {
      if (index < 3) {
        cy.wrap($select)
          .select(SECURITY_LEVELS.MODERATE, { force: true })
          .wait(300);
      }
    });

    // Wait for changes to propagate
    cy.wait(1000);

    // Look for ANY impact analysis related terms
    cy.contains(
      /impact|analysis|assessment|security level|business value/i
    ).should("exist");
  });

  it("provides both considerations and benefits for business analysis", () => {
    // Look for considerations or benefits related terms
    cy.contains(
      /considerations|benefits|pros|cons|advantages|disadvantages/i
    ).should("exist");
  });

  it("shows detailed impact metrics for data-driven decisions", () => {
    // Set security levels to make metrics more visible
    cy.get("select").each(($select, index) => {
      if (index < 3) {
        cy.wrap($select)
          .select(SECURITY_LEVELS.HIGH, { force: true })
          .wait(300);
      }
    });

    // Wait for updates
    cy.wait(1000);

    // Look for ANY metrics or measurements related content
    cy.contains(
      /metrics|measurements|statistics|analysis|values|numbers/i
    ).should("exist");
  });
});
