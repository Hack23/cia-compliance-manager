/**
 * Performance Requirements Testing
 * 
 * This test file enforces specific performance requirements
 * for key operations in the CIA Compliance Manager.
 */
import { 
  SECURITY_LEVELS
} from "../../support/constants";
import performanceReporter from "../../support/performance-reporter";
import { DEFAULT_BASELINE } from "../../support/performance-assertions";

// Define stricter performance requirements
const PERFORMANCE_REQUIREMENTS = {
  // Page load times
  initialPageLoad: 3000, // 3 seconds
  subsequentPageLoad: 1000, // 1 second
  
  // Widget rendering times
  securitySummaryRender: 300, // 300ms
  businessImpactRender: 300, // 300ms
  radarChartRender: 200, // 200ms
  costEstimationRender: 300, // 300ms
  
  // User interactions
  securityLevelChange: 500, // 500ms
  tabSwitch: 150, // 150ms
  
  // Business operations
  complianceCalculation: 200, // 200ms
  costCalculation: 400, // 400ms
  
  // Custom thresholds by category
  categories: {
    'widget-rendering': { warning: 150, error: 400 },
    'user-interaction': { warning: 100, error: 300 },
    'security-level-change': { warning: 200, error: 600 }
  }
};

describe("Performance Requirements", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
    cy.initPerformanceMonitoring();
  });
  
  afterEach(() => {
    // Generate report after each test
    cy.generatePerformanceReport();
    cy.flushPerformanceMetrics();
  });

  it("meets page load performance requirements", () => {
    // Start measuring initial page load
    cy.startMeasurement('initial-page-load');
    
    // Visit page and ensure it's fully loaded
    cy.visit("/").then(() => {
      cy.endMeasurement('initial-page-load', 'navigation').then(duration => {
        // Assert against requirement
        cy.assertPerformance('initial-page-load', duration, {
          warning: PERFORMANCE_REQUIREMENTS.initialPageLoad * 0.7,
          error: PERFORMANCE_REQUIREMENTS.initialPageLoad
        });
      });
    });
    
    // Test navigating between routes or refreshing page
    cy.reload();
    cy.startMeasurement('subsequent-page-load');
    
    cy.get('body').should('be.visible').then(() => {
      cy.endMeasurement('subsequent-page-load', 'navigation').then(duration => {
        cy.assertPerformance('subsequent-page-load', duration, {
          warning: PERFORMANCE_REQUIREMENTS.subsequentPageLoad * 0.7,
          error: PERFORMANCE_REQUIREMENTS.subsequentPageLoad
        });
      });
    });
  });

  it("meets widget rendering performance requirements", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.wait(300);
    
    // Test security summary widget rendering
    cy.startMeasurement('security-summary-render');
    cy.findWidget('security-summary').scrollIntoView();
    cy.endMeasurement('security-summary-render', 'widget-rendering').then(duration => {
      cy.assertPerformance('security-summary-render', duration, {
        warning: PERFORMANCE_REQUIREMENTS.securitySummaryRender * 0.7,
        error: PERFORMANCE_REQUIREMENTS.securitySummaryRender
      });
    });
    
    // Test business impact widget rendering
    cy.startMeasurement('business-impact-render');
    cy.findWidget('business-impact').scrollIntoView();
    cy.endMeasurement('business-impact-render', 'widget-rendering').then(duration => {
      cy.assertPerformance('business-impact-render', duration, {
        warning: PERFORMANCE_REQUIREMENTS.businessImpactRender * 0.7,
        error: PERFORMANCE_REQUIREMENTS.businessImpactRender
      });
    });
    
    // Test radar chart widget rendering
    cy.startMeasurement('radar-chart-render');
    cy.findWidget('radar-chart').scrollIntoView();
    cy.endMeasurement('radar-chart-render', 'widget-rendering').then(duration => {
      cy.assertPerformance('radar-chart-render', duration, {
        warning: PERFORMANCE_REQUIREMENTS.radarChartRender * 0.7,
        error: PERFORMANCE_REQUIREMENTS.radarChartRender
      });
    });
    
    // Test cost estimation widget rendering
    cy.startMeasurement('cost-estimation-render');
    cy.findWidget('cost').scrollIntoView();
    cy.endMeasurement('cost-estimation-render', 'widget-rendering').then(duration => {
      cy.assertPerformance('cost-estimation-render', duration, {
        warning: PERFORMANCE_REQUIREMENTS.costEstimationRender * 0.7,
        error: PERFORMANCE_REQUIREMENTS.costEstimationRender
      });
    });
  });
  
  it("meets security level change performance requirements", () => {
    // Start with low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(300);
    
    // Measure single security level change
    cy.startMeasurement('security-level-change');
    cy.selectSecurityLevelEnhanced('availability', SECURITY_LEVELS.HIGH);
    cy.endMeasurement('security-level-change', 'security-level-change').then(duration => {
      cy.assertPerformance('security-level-change', duration, {
        warning: PERFORMANCE_REQUIREMENTS.securityLevelChange * 0.7,
        error: PERFORMANCE_REQUIREMENTS.securityLevelChange
      });
    });
    
    // Measure changing all security levels together
    cy.startMeasurement('security-levels-change-all');
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.endMeasurement('security-levels-change-all', 'security-level-change').then(duration => {
      cy.assertPerformance('security-levels-change-all', duration, {
        // Allow slightly more time for changing all levels
        warning: PERFORMANCE_REQUIREMENTS.securityLevelChange * 1.5,
        error: PERFORMANCE_REQUIREMENTS.securityLevelChange * 2
      });
    });
  });
  
  it("meets compliance calculation performance requirements", () => {
    // Change security levels and measure compliance calculation time
    cy.startMeasurement('compliance-calculation');
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    // Look for compliance status
    cy.findWidget('compliance').scrollIntoView();
    cy.endMeasurement('compliance-calculation', 'business-calculation').then(duration => {
      cy.assertPerformance('compliance-calculation', duration, {
        warning: PERFORMANCE_REQUIREMENTS.complianceCalculation * 0.7,
        error: PERFORMANCE_REQUIREMENTS.complianceCalculation
      });
    });
  });
  
  it("meets cost calculation performance requirements", () => {
    // Change security levels and measure cost calculation time
    cy.startMeasurement('cost-calculation');
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    // Look for cost calculation display
    cy.findWidget('cost').scrollIntoView();
    cy.endMeasurement('cost-calculation', 'business-calculation').then(duration => {
      cy.assertPerformance('cost-calculation', duration, {
        warning: PERFORMANCE_REQUIREMENTS.costCalculation * 0.7,
        error: PERFORMANCE_REQUIREMENTS.costCalculation
      });
    });
  });
  
  it("meets tab switching performance requirements", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find widgets with tabs
    cy.findWidget('business-impact').then($el => {
      // Check if this widget has tabs
      const hasTabs = $el.find('[role="tab"], button:contains("Availability"), button:contains("Integrity")').length > 0;
      
      if (hasTabs) {
        // Find and click a tab
        cy.get('[role="tab"], button:contains("Availability"), button:contains("Integrity")').eq(1).then($tab => {
          cy.startMeasurement('tab-switch');
          cy.wrap($tab).click({force: true});
          cy.endMeasurement('tab-switch', 'user-interaction').then(duration => {
            cy.assertPerformance('tab-switch', duration, {
              warning: PERFORMANCE_REQUIREMENTS.tabSwitch * 0.7,
              error: PERFORMANCE_REQUIREMENTS.tabSwitch
            });
          });
        });
      } else {
        cy.log('No tabs found to test tab switching performance');
      }
    });
  });
});
