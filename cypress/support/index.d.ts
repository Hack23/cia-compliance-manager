/// <reference types="cypress" />

/**
 * Extended Cypress namespace with our custom commands
 */
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Set security levels for all three CIA components with strong typing
     * 
     * @param availability - The availability security level
     * @param integrity - The integrity security level
     * @param confidentiality - The confidentiality security level
     * @example
     * cy.setSecurityLevels('High', 'Moderate', 'Low');
     */
    setSecurityLevels(
      availability?: string | null,
      integrity?: string | null, 
      confidentiality?: string | null
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Ensure the application is fully loaded before proceeding
     */
    ensureAppLoaded(): Chainable<JQuery<HTMLElement>>;

    /**
     * Find a widget using multiple selector strategies
     * 
     * @param widgetName - Name or identifier of the widget to find
     * @example
     * cy.findWidget('security-level');
     * cy.findWidget('cost-estimation');
     */
    findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Verify content patterns exist on the page
     * 
     * @param contentPatterns - Array of text or RegExp patterns to verify
     * @example
     * cy.verifyContentPresent(['Security', /level/i, 'Compliance']);
     */
    verifyContentPresent(
      contentPatterns: Array<string | RegExp>
    ): Chainable<void>;

    /**
     * Verify a widget contains specific content patterns
     * 
     * @param widgetName - Name or identifier of the widget
     * @param contentPatterns - Content patterns to check for
     * @example
     * cy.verifyWidgetContent('cost', [/estimate/i, 'ROI']);
     */
    verifyWidgetContent(
      widgetName: string,
      contentPatterns: Array<string | RegExp>
    ): Chainable<void>;

    /**
     * Enhanced security level selection with fallbacks
     * 
     * @param category - Which security category to modify
     * @param level - Security level to select
     * @example
     * cy.selectSecurityLevelEnhanced('availability', 'High');
     */
    selectSecurityLevelEnhanced(
      category: "availability" | "integrity" | "confidentiality",
      level: string
    ): Chainable<void>;

    /**
     * Attempts to click a button matching text pattern
     * 
     * @param textOrPattern - Text or pattern to match button content
     * @example
     * cy.tryClickButton('Save');
     * cy.tryClickButton(/submit|save/i);
     */
    tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;

    /**
     * Wait for specific content to appear
     * 
     * @param contentPattern - Text or pattern to wait for
     * @param options - Additional wait options
     * @example
     * cy.waitForContent('Success');
     * cy.waitForContent(/error/i, { timeout: 5000 });
     */
    waitForContent(
      contentPattern: string | RegExp,
      options?: { timeout: number }
    ): Chainable<boolean>;

    /**
     * Makes an element visible for testing
     */
    forceVisible(): Chainable<Subject>;

    /**
     * Takes a screenshot and logs DOM state at failure point
     * 
     * @param testName - Name of the test that failed
     */
    debugFailure(testName: string): void;

    /**
     * Logs information about currently visible elements
     */
    logVisibleElements(): void;

    /**
     * Logs all test IDs in the DOM
     */
    logAllTestIds(): void;

    /**
     * Highlights an element temporarily for debugging
     */
    highlight(): Chainable<Element>;

    /**
     * Measures execution time of a Cypress operation
     * 
     * @param fn - Function to measure
     * @param label - Optional label for the measurement
     */
    measureTime<T>(fn: () => Chainable<T>, label?: string): Chainable<T>;

    /**
     * Initialize performance monitoring for the current test
     */
    initPerformanceMonitoring(): Chainable<void>;
    
    /**
     * Record a performance metric
     * @param operation Name of the operation being measured
     * @param duration Duration of the operation in milliseconds
     * @param category Optional category for the metric
     * @param metadata Optional additional data to store with the metric
     */
    recordPerformanceMetric(
      operation: string,
      duration: number,
      category?: string,
      metadata?: Record<string, any>
    ): Chainable<null>;
    
    /**
     * Measure the execution time of an operation
     * @param fn Function that returns a Chainable to measure
     * @param operationName Name for the operation being measured
     * @param category Optional category for the operation
     */
    measureOperation<T>(
      fn: () => Chainable<T>,
      operationName: string,
      category?: string
    ): Chainable<T>;
    
    /**
     * Generate a performance report for the current test
     */
    generatePerformanceReport(): Chainable<any>;
    
    /**
     * Save current performance metrics to disk
     * @param reason Optional reason for flushing metrics
     */
    flushPerformanceMetrics(reason?: string): Chainable<null>;
    
    /**
     * Create a visual performance report in the browser
     */
    createVisualPerformanceReport(): Chainable<null>;
    
    /**
     * Start measuring time for an operation
     * @param label Name of the operation to measure
     */
    startMeasurement(label: string): Chainable<void>;
    
    /**
     * End time measurement for an operation and record the result
     * @param label Name of the operation being measured
     * @param category Optional category for the operation
     */
    endMeasurement(label: string, category?: string): Chainable<number>;
  }
}
