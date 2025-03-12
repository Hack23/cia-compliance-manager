/**
 * Performance baseline configuration
 * 
 * This file defines the expected performance baselines for different operations
 * in the application. These values should be adjusted based on real-world measurements
 * and performance goals.
 */

import { PerformanceBaseline } from '../support/performance-assertions';

/**
 * Development environment performance baseline
 * More lenient thresholds for development machines
 */
export const DEV_BASELINE: PerformanceBaseline = {
  operations: {
    // Page navigation
    'page-load': { warning: 2000, error: 5000 },
    'initial-page-load': { warning: 2500, error: 6000 },
    'subsequent-page-load': { warning: 1200, error: 3000 },
    
    // Security level operations
    'security-level-change': { warning: 400, error: 1000 },
    'security-levels-change-all': { warning: 700, error: 1500 },
    
    // Widget rendering
    'security-summary-render': { warning: 400, error: 800 },
    'business-impact-render': { warning: 400, error: 800 },
    'radar-chart-render': { warning: 300, error: 600 },
    'cost-estimation-render': { warning: 400, error: 800 },
    'compliance-status-render': { warning: 300, error: 600 },
    'technical-details-render': { warning: 300, error: 600 },
    
    // Business calculations
    'compliance-calculation': { warning: 300, error: 800 },
    'cost-calculation': { warning: 500, error: 1200 },
    
    // User interactions
    'tab-switch': { warning: 200, error: 500 },
    'select-change': { warning: 300, error: 700 },
  },
  categories: {
    // Categories group related operations
    'navigation': { warning: 1800, error: 4000 },
    'widget-rendering': { warning: 300, error: 700 },
    'security-level-change': { warning: 300, error: 800 },
    'user-interaction': { warning: 250, error: 600 },
    'business-calculation': { warning: 400, error: 1000 },
    'content-loading': { warning: 500, error: 1200 },
  },
  // Default thresholds for operations not explicitly specified
  global: {
    warning: 500,
    error: 1500
  }
};

/**
 * Production environment performance baseline
 * Stricter thresholds for production environment
 */
export const PROD_BASELINE: PerformanceBaseline = {
  operations: {
    // Page navigation
    'page-load': { warning: 1200, error: 3000 },
    'initial-page-load': { warning: 1500, error: 4000 },
    'subsequent-page-load': { warning: 800, error: 2000 },
    
    // Security level operations
    'security-level-change': { warning: 250, error: 600 },
    'security-levels-change-all': { warning: 500, error: 1000 },
    
    // Widget rendering
    'security-summary-render': { warning: 250, error: 500 },
    'business-impact-render': { warning: 250, error: 500 },
    'radar-chart-render': { warning: 200, error: 400 },
    'cost-estimation-render': { warning: 250, error: 500 },
    'compliance-status-render': { warning: 200, error: 400 },
    'technical-details-render': { warning: 200, error: 400 },
    
    // Business calculations
    'compliance-calculation': { warning: 200, error: 500 },
    'cost-calculation': { warning: 300, error: 800 },
    
    // User interactions
    'tab-switch': { warning: 150, error: 300 },
    'select-change': { warning: 200, error: 400 },
  },
  categories: {
    // Categories group related operations
    'navigation': { warning: 1000, error: 2500 },
    'widget-rendering': { warning: 200, error: 500 },
    'security-level-change': { warning: 200, error: 500 },
    'user-interaction': { warning: 150, error: 350 },
    'business-calculation': { warning: 300, error: 700 },
    'content-loading': { warning: 350, error: 800 },
  },
  // Default thresholds for operations not explicitly specified
  global: {
    warning: 300,
    error: 800
  }
};

/**
 * CI environment performance baseline
 * Adjusted thresholds for CI environments which often have limited resources
 */
export const CI_BASELINE: PerformanceBaseline = {
  operations: {
    // Page navigation
    'page-load': { warning: 3000, error: 7000 },
    'initial-page-load': { warning: 3500, error: 8000 },
    'subsequent-page-load': { warning: 1500, error: 4000 },
    
    // Security level operations
    'security-level-change': { warning: 600, error: 1500 },
    'security-levels-change-all': { warning: 1000, error: 2500 },
    
    // Widget rendering
    'security-summary-render': { warning: 600, error: 1200 },
    'business-impact-render': { warning: 600, error: 1200 },
    'radar-chart-render': { warning: 500, error: 1000 },
    'cost-estimation-render': { warning: 600, error: 1200 },
    'compliance-status-render': { warning: 500, error: 1000 },
    'technical-details-render': { warning: 500, error: 1000 },
    
    // Business calculations
    'compliance-calculation': { warning: 700, error: 1500 },
    'cost-calculation': { warning: 800, error: 1800 },
    
    // User interactions
    'tab-switch': { warning: 400, error: 800 },
    'select-change': { warning: 500, error: 1000 },
  },
  categories: {
    // Categories group related operations
    'navigation': { warning: 3000, error: 7000 },
    'widget-rendering': { warning: 600, error: 1200 },
    'security-level-change': { warning: 600, error: 1500 },
    'user-interaction': { warning: 500, error: 1000 },
    'business-calculation': { warning: 700, error: 1500 },
    'content-loading': { warning: 800, error: 2000 },
  },
  // Default thresholds for operations not explicitly specified
  global: {
    warning: 800,
    error: 2000
  }
};

/**
 * Get the appropriate baseline based on environment
 */
export function getPerformanceBaseline(): PerformanceBaseline {
  // Check for CI environment
  if (Cypress.env('CI')) {
    return CI_BASELINE;
  }
  
  // Check for production mode
  if (Cypress.env('PROD') || Cypress.env('PRODUCTION')) {
    return PROD_BASELINE;
  }
  
  // Default to development baseline
  return DEV_BASELINE;
}

export default getPerformanceBaseline;
