/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import {
  SECURITY_LEVELS,
  COST_TEST_IDS,
  TEST_PATTERNS
} from "../../support/constants";
import { testCostUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 800); // Use reasonable viewport size
    cy.ensureAppLoaded();
    
    // Set security levels right away to avoid element not found issues
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
  });

  it("shows cost estimation widget", () => {
    // Find cost widget using enhanced finder with fallback strategies
    cy.findWidget('cost')
      .should('exist')
      .scrollIntoView();
  });

  it("shows cost estimates and values", () => {
    // Verify cost-related content
    cy.verifyContentPresent(TEST_PATTERNS.COST);
  });

  it("shows value creation widget", () => {
    // Find value creation widget
    cy.findWidget('value')
      .should('exist')
      .scrollIntoView();
  });

  it("updates costs when security levels change", () => {
    // Use our reusable test pattern
    testCostUpdatesWithSecurityLevels();
  });

  it("shows ROI estimate", () => {
    // Look for ROI-related content
    cy.verifyContentPresent([
      /roi/i,
      /return/i,
      /investment/i,
      /value/i,
      /benefit/i
    ]);
  });
});
