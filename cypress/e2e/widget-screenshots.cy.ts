/**
 * Widget Screenshot Test
 * Takes screenshots of all widgets in light and dark modes for visual verification
 */

describe('Widget Screenshots for CSS Verification', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174');
    cy.wait(2000); // Wait for app to fully load
  });

  it('should capture Security Summary Widget in light mode', () => {
    cy.get('[data-testid="widget-security-summary"]').should('be.visible');
    cy.screenshot('01-security-summary-light', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('should capture Security Summary Widget tabs in light mode', () => {
    // Overview tab
    cy.get('[data-testid="security-summary-widget-tab-overview"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('02-security-summary-overview-light', {
      overwrite: true
    });

    // Business tab
    cy.get('[data-testid="security-summary-widget-tab-business"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('03-security-summary-business-light', {
      overwrite: true
    });

    // Implementation tab
    cy.get('[data-testid="security-summary-widget-tab-implementation"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('04-security-summary-implementation-light', {
      overwrite: true
    });

    // Compliance tab
    cy.get('[data-testid="security-summary-widget-tab-compliance"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('05-security-summary-compliance-light', {
      overwrite: true
    });
  });

  it('should capture all widgets in light mode', () => {
    cy.screenshot('06-all-widgets-light', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('should capture Security Summary Widget in dark mode', () => {
    // Toggle to dark mode
    cy.get('button').contains(/theme|dark|light/i).click();
    cy.wait(1000);

    cy.get('[data-testid="widget-security-summary"]').should('be.visible');
    cy.screenshot('07-security-summary-dark', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('should capture Security Summary Widget tabs in dark mode', () => {
    // Toggle to dark mode
    cy.get('button').contains(/theme|dark|light/i).click();
    cy.wait(1000);

    // Overview tab
    cy.get('[data-testid="security-summary-widget-tab-overview"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('08-security-summary-overview-dark', {
      overwrite: true
    });

    // Business tab
    cy.get('[data-testid="security-summary-widget-tab-business"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('09-security-summary-business-dark', {
      overwrite: true
    });

    // Implementation tab
    cy.get('[data-testid="security-summary-widget-tab-implementation"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('10-security-summary-implementation-dark', {
      overwrite: true
    });

    // Compliance tab
    cy.get('[data-testid="security-summary-widget-tab-compliance"]').click();
    cy.wait(500);
    cy.get('[data-testid="widget-security-summary"]').screenshot('11-security-summary-compliance-dark', {
      overwrite: true
    });
  });

  it('should capture all widgets in dark mode', () => {
    // Toggle to dark mode
    cy.get('button').contains(/theme|dark|light/i).click();
    cy.wait(1000);

    cy.screenshot('12-all-widgets-dark', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('should capture other key widgets in light mode', () => {
    // Security Level Widget
    cy.get('[data-testid="widget-security-level"]').should('be.visible');
    cy.get('[data-testid="widget-security-level"]').screenshot('13-security-level-light', {
      overwrite: true
    });

    // Business Impact Widget (if visible)
    cy.get('[data-testid="widget-business-impact"]').should('be.visible');
    cy.get('[data-testid="widget-business-impact"]').screenshot('14-business-impact-light', {
      overwrite: true
    });

    // Cost Estimation Widget (if visible)
    cy.get('[data-testid="widget-cost-estimation"]').should('be.visible');
    cy.get('[data-testid="widget-cost-estimation"]').screenshot('15-cost-estimation-light', {
      overwrite: true
    });
  });

  it('should capture other key widgets in dark mode', () => {
    // Toggle to dark mode
    cy.get('button').contains(/theme|dark|light/i).click();
    cy.wait(1000);

    // Security Level Widget
    cy.get('[data-testid="widget-security-level"]').should('be.visible');
    cy.get('[data-testid="widget-security-level"]').screenshot('16-security-level-dark', {
      overwrite: true
    });

    // Business Impact Widget (if visible)
    cy.get('[data-testid="widget-business-impact"]').should('be.visible');
    cy.get('[data-testid="widget-business-impact"]').screenshot('17-business-impact-dark', {
      overwrite: true
    });

    // Cost Estimation Widget (if visible)
    cy.get('[data-testid="widget-cost-estimation"]').should('be.visible');
    cy.get('[data-testid="widget-cost-estimation"]').screenshot('18-cost-estimation-dark', {
      overwrite: true
    });
  });
});
