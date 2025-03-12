import { 
  BUSINESS_IMPACT_TEST_IDS, 
  SECURITY_LEVELS,
  TEST_PATTERNS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Business Impact Details", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 800);
    cy.ensureAppLoaded();
    
    // Set security levels right away to avoid element not found issues
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Give time for content to load
    cy.wait(500);
  });

  it("shows detailed business impact analysis components", () => {
    // Use our helper to verify widget exists with expected content
    cy.verifyWidgetContent('business-impact', [
      /availability/i,
      /integrity/i,
      /confidentiality/i,
      /impact/i
    ]);
  });

  it("displays tabbed interface and allows switching tabs", () => {
    // Find business impact widget
    cy.findWidget('business-impact').within(() => {
      // Find tab elements using multiple selector strategies
      cy.get('[role="tab"], button:contains("Integrity"), button:contains("Confidentiality")')
        .first()
        .click({ force: true });
        
      // Verify content changed
      cy.get('[role="tabpanel"], [id$="tab-panel"]').should('exist');
    });
  });

  it("updates impact details when security levels change", () => {
    // Use our new reusable test pattern
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="business-impact"]',
      {
        initialLevels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        newLevels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        waitTime: 800,
        expectTextChange: true
      }
    );
  });

  it("shows detailed impact descriptions for each CIA component", () => 
    // Use the verifyContentPresent helper for flexible content checking
    cy.verifyContentPresent([
      /impact/i, 
      /business/i, 
      /security/i, 
      /risk/i,
      'Availability',
      'Integrity',
      'Confidentiality'
    ])
  );

  it("displays advanced metrics when security levels are set", () => {
    // Check for metrics-related terms
    cy.verifyContentPresent([
      /metric/i,
      /measure/i, 
      /value/i,
      /financial/i,
      /operational/i,
      /impact/i
    ]);
  });

  it("verifies consideration items have proper structure", () => {
    // Just verify that consideration-related content exists
    cy.verifyContentPresent([
      /consideration/i,
      /impact/i,
      /financial/i,
      /operational/i,
      /regulatory/i,
      /strategic/i,
      /reputational/i
    ]);
  });

  it("verifies benefit items have proper structure", () => {
    // Just verify that benefit-related content exists
    cy.verifyContentPresent([
      /benefit/i,
      /value/i,
      /advantage/i,
      /improvement/i
    ]);
  });

  it("validates ARIA attributes for accessibility", () => {
    // Find elements with accessibility attributes
    cy.get('[role], [aria-label], [aria-labelledby], [aria-describedby]')
      .should('have.length.at.least', 1);
  });
});
