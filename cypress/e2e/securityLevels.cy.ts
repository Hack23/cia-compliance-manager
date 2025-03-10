import {
  SECURITY_LEVELS,
  CIA_LABELS,
  SELECTORS,
  TEST_COMMANDS,
  getTestSelector,
  TEST_IDS,
  WIDGET_TEST_IDS,
  CIA_TEST_IDS,
} from "../support/constants";

describe("Security Level Selection", () => {
  beforeEach(() => {
    // Use larger viewport for this test
    cy.viewport(3840, 2160);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Make sure security widget is visible before testing
    // Use correct test ID from the table
    cy.get(`[data-testid="${WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET}"]`)
      .should("be.visible")
      .scrollIntoView()
      .wait(500);
  });

  it("should display correct CIA labels", () => {
    // Use correct test IDs from the table
    cy.get(`[data-testid="${WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET}"]`).within(
      () => {
        cy.contains(CIA_LABELS.AVAILABILITY).should("be.visible");
        cy.contains(CIA_LABELS.INTEGRITY).should("be.visible");
        cy.contains(CIA_LABELS.CONFIDENTIALITY).should("be.visible");
      }
    );
  });

  it("can set security levels using application constants", () => {
    // Make sure selectors are visible first
    // Use correct test IDs from CIA_TEST_IDS
    cy.get(`[data-testid="${CIA_TEST_IDS.AVAILABILITY_SELECT}"]`)
      .scrollIntoView()
      .should("be.visible");

    // Uses the constants from the application code with force option
    cy.get(`[data-testid="${CIA_TEST_IDS.AVAILABILITY_SELECT}"]`).select(
      SECURITY_LEVELS.HIGH,
      { force: true }
    );

    cy.get(getTestSelector(TEST_IDS.INTEGRITY_SELECT)).select(
      SECURITY_LEVELS.MODERATE,
      { force: true }
    );

    cy.get(getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT)).select(
      SECURITY_LEVELS.LOW,
      { force: true }
    );

    // Short wait to ensure UI updates
    cy.wait(500);

    // Verify selections were made correctly
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );

    cy.get(getTestSelector(TEST_IDS.INTEGRITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );

    cy.get(getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
  });
});
