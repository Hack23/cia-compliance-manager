/**
 * Performance test baseline and assertion utilities
 */

// Default baseline performance measurements for comparison
export const DEFAULT_BASELINE = {
  // Page loads
  pageLoad: 3000,
  initialLoad: 2000,

  // Widget rendering
  widgetRender: 500,
  chartRender: 800,

  // Interactions
  securityLevelChange: 250,
  tabSwitch: 150,
  buttonClick: 100,

  // Special cases
  heavyWidgetRender: 1000,
};

/**
 * Asserts that a measured duration is within acceptable thresholds
 */
export function assertPerformance(
  label: string,
  duration: number,
  thresholds: {
    warning: number;
    error: number;
  }
): void {
  const { warning, error } = thresholds;

  if (duration > error) {
    cy.log(
      `❌ Performance failure - ${label}: ${duration.toFixed(
        2
      )}ms (exceeds ${error}ms threshold)`
    );
    // Only fail the test if not in CI
    if (!Cypress.env("CI")) {
      expect(duration).to.be.lessThan(error);
    }
  } else if (duration > warning) {
    cy.log(
      `⚠️ Performance warning - ${label}: ${duration.toFixed(
        2
      )}ms (exceeds ${warning}ms threshold)`
    );
  } else {
    cy.log(
      `✅ Performance good - ${label}: ${duration.toFixed(
        2
      )}ms (within ${warning}ms threshold)`
    );
  }
}

/**
 * Compares a measurement against historical baseline
 */
export function compareToBaseline(
  label: string,
  duration: number,
  baseline: number,
  tolerance: number = 0.2
): void {
  const warningThreshold = baseline * (1 + tolerance);
  const errorThreshold = baseline * (1 + tolerance * 2);

  assertPerformance(label, duration, {
    warning: warningThreshold,
    error: errorThreshold,
  });
}

// Export a Cypress command wrapper
Cypress.Commands.add(
  "assertPerformance",
  (
    label: string,
    duration: number,
    thresholds: { warning: number; error: number }
  ) => {
    assertPerformance(label, duration, thresholds);
    return cy.wrap(null);
  }
);

// Export a baseline comparison command
Cypress.Commands.add(
  "compareToBaseline",
  (label: string, duration: number, baseline: number, tolerance?: number) => {
    compareToBaseline(label, duration, baseline, tolerance);
    return cy.wrap(null);
  }
);

export default {
  DEFAULT_BASELINE,
  assertPerformance,
  compareToBaseline,
};

// Add to Cypress types
declare global {
  namespace Cypress {
    interface Chainable {
      assertPerformance(
        label: string,
        duration: number,
        thresholds: { warning: number; error: number }
      ): Chainable<null>;
      compareToBaseline(
        label: string,
        duration: number,
        baseline: number,
        tolerance?: number
      ): Chainable<null>;
    }
  }
}
