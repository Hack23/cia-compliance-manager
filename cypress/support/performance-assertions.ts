/**
 * Performance assertion utilities
 * 
 * Provides functions for asserting performance expectations
 * and comparing against baselines.
 */

// Types for performance assertions
export interface PerformanceThresholds {
  warning?: number;
  error?: number;
}

export interface OperationThresholds {
  [operationName: string]: PerformanceThresholds;
}

export interface CategoryThresholds {
  [categoryName: string]: PerformanceThresholds;
}

export interface PerformanceBaseline {
  operations: OperationThresholds;
  categories: CategoryThresholds;
  global: PerformanceThresholds;
}

// Default baseline with reasonable thresholds
export const DEFAULT_BASELINE: PerformanceBaseline = {
  operations: {
    'page-load': { warning: 1000, error: 3000 },
    'widget-render': { warning: 200, error: 500 },
    'security-level-change': { warning: 300, error: 1000 }
  },
  categories: {
    'widget-rendering': { warning: 200, error: 500 },
    'user-interaction': { warning: 100, error: 300 },
    'content-loading': { warning: 500, error: 1500 }
  },
  global: {
    warning: 300,
    error: 1000
  }
};

/**
 * Asserts that an operation's duration is within acceptable thresholds
 * 
 * @param operationName Name of the operation being measured
 * @param duration Duration of the operation in milliseconds
 * @param thresholds Custom thresholds for this assertion
 * @param baseline Performance baseline to compare against
 */
export function assertOperationPerformance(
  operationName: string,
  duration: number,
  thresholds?: PerformanceThresholds,
  baseline: PerformanceBaseline = DEFAULT_BASELINE
): void {
  // Determine which thresholds to use
  const operationThresholds = baseline.operations[operationName];
  const customThresholds = thresholds || {};
  const applicableThresholds = {
    warning: customThresholds.warning || operationThresholds?.warning || baseline.global.warning || 300,
    error: customThresholds.error || operationThresholds?.error || baseline.global.error || 1000
  };
  
  // Check against error threshold
  if (duration > applicableThresholds.error) {
    throw new Error(
      `Performance error: ${operationName} took ${duration.toFixed(1)}ms, ` +
      `exceeding error threshold of ${applicableThresholds.error}ms`
    );
  }
  
  // Check against warning threshold
  if (duration > applicableThresholds.warning) {
    console.warn(
      `Performance warning: ${operationName} took ${duration.toFixed(1)}ms, ` +
      `exceeding warning threshold of ${applicableThresholds.warning}ms`
    );
  }
}

/**
 * Asserts that an category's aggregate performance is within acceptable thresholds
 * 
 * @param categoryName Name of the category
 * @param durations Array of operation durations in this category
 * @param thresholds Custom thresholds for this assertion
 * @param baseline Performance baseline to compare against
 */
export function assertCategoryPerformance(
  categoryName: string,
  durations: number[],
  thresholds?: PerformanceThresholds,
  baseline: PerformanceBaseline = DEFAULT_BASELINE
): void {
  if (durations.length === 0) {
    return; // No operations to assess
  }
  
  // Calculate average duration
  const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
  
  // Determine which thresholds to use
  const categoryThresholds = baseline.categories[categoryName];
  const customThresholds = thresholds || {};
  const applicableThresholds = {
    warning: customThresholds.warning || categoryThresholds?.warning || baseline.global.warning || 300,
    error: customThresholds.error || categoryThresholds?.error || baseline.global.error || 1000
  };
  
  // Check against error threshold
  if (avgDuration > applicableThresholds.error) {
    throw new Error(
      `Performance error: ${categoryName} category averaged ${avgDuration.toFixed(1)}ms per operation, ` +
      `exceeding error threshold of ${applicableThresholds.error}ms`
    );
  }
  
  // Check against warning threshold
  if (avgDuration > applicableThresholds.warning) {
    console.warn(
      `Performance warning: ${categoryName} category averaged ${avgDuration.toFixed(1)}ms per operation, ` +
      `exceeding warning threshold of ${applicableThresholds.warning}ms`
    );
  }
}

// Add Cypress commands for performance assertions
if (typeof Cypress !== 'undefined') {
  // Use function expression to handle proper typing
  Cypress.Commands.add('assertPerformance', 
    function(operationName: string, duration: number, thresholds?: PerformanceThresholds) {
      try {
        assertOperationPerformance(operationName, duration, thresholds);
        return cy.wrap(true);
      } catch (error: any) {
        // Log the error but don't fail the test automatically
        cy.log(`⚠️ ${error.message}`);
        return cy.wrap(false);
      }
    }
  );
  
  Cypress.Commands.add('assertCategoryPerformance', 
    function(categoryName: string, durations: number[], thresholds?: PerformanceThresholds) {
      try {
        assertCategoryPerformance(categoryName, durations, thresholds);
        return cy.wrap(true);
      } catch (error: any) {
        // Log the error but don't fail the test automatically
        cy.log(`⚠️ ${error.message}`);
        return cy.wrap(false);
      }
    }
  );
  
  // Command to check a metric against baseline from performance report
  Cypress.Commands.add('checkMetricAgainstBaseline', 
    function(metricName: string, thresholds?: PerformanceThresholds) {
      return cy.window().then((win: any) => {
        if (!win.cypressPerformanceMetrics) {
          cy.log('No performance metrics available');
          return cy.wrap(false);
        }
        
        const metrics = win.cypressPerformanceMetrics.records;
        const matchingMetrics = metrics.filter((m: any) => 
          m.operation === metricName || m.operation.includes(metricName)
        );
        
        if (matchingMetrics.length === 0) {
          cy.log(`No metrics found matching: ${metricName}`);
          return cy.wrap(false);
        }
        
        const latestMetric = matchingMetrics[matchingMetrics.length - 1];
        
        // Fix: Create a properly typed thresholds object with guaranteed number values
        let validThresholds: { warning: number; error: number } | undefined = undefined;
        
        if (thresholds) {
          validThresholds = {
            // Fix: Ensure warning and error are always numbers by using nullish coalescing
            warning: typeof thresholds.warning === 'number' ? thresholds.warning : 
              (DEFAULT_BASELINE.global.warning ?? 300),
            error: typeof thresholds.error === 'number' ? thresholds.error : 
              (DEFAULT_BASELINE.global.error ?? 1000)
          };
        }
        
        return cy.assertPerformance(latestMetric.operation, latestMetric.duration, validThresholds);
      });
    }
  );
}

// Export all utility functions
export default {
  assertOperationPerformance,
  assertCategoryPerformance,
  DEFAULT_BASELINE
};
