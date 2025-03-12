/// <reference types="cypress" />

// Extend the Cypress namespace to include our custom commands
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to select security levels using multiple strategies
     * @param availability - Security level for availability
     * @param integrity - Security level for integrity
     * @param confidentiality - Security level for confidentiality
     * @example cy.setSecurityLevels('High', 'Moderate', 'Low')
     */
    setSecurityLevels(
      availability?: string,
      integrity?: string,
      confidentiality?: string
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to ensure the app has loaded
     * @example cy.ensureAppLoaded()
     */
    ensureAppLoaded(): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to get element by test ID
     * @param selector - The test ID
     * @example cy.getByTestId('app-title')
     */
    getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to navigate to a specific widget
     * @param widgetTestId - The widget test ID
     * @example cy.navigateToWidget('widget-security-summary')
     */
    navigateToWidget(widgetTestId: string): Chainable<void>;

    /**
     * Enhanced security level selection with fallbacks
     * @param category - The security category
     * @param level - The security level
     * @example cy.selectSecurityLevelEnhanced('availability', 'High')
     */
    selectSecurityLevelEnhanced(
      category: "availability" | "integrity" | "confidentiality",
      level: string
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Try to click a button matching text pattern
     * @param textOrPattern - The text or pattern to match
     * @example cy.tryClickButton('Submit')
     */
    tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;

    /**
     * Wait for content to appear
     * @param contentPattern - The content pattern to wait for
     * @param options - Options for waiting
     * @example cy.waitForContent('Security Summary')
     */
    waitForContent(
      contentPattern: string | RegExp,
      options?: { timeout: number }
    ): Chainable<boolean>;

    /**
     * Tab navigation
     * @example cy.get('input').tab()
     */
    tab(): Chainable<JQuery<HTMLElement>>;

    /**
     * Verify widget has specific content
     * @param widgetTestId - The widget test ID
     * @param expectedContent - The expected content
     * @example cy.verifyWidgetWithContent('widget-security-summary', 'Security Level')
     */
    verifyWidgetWithContent(
      widgetTestId: string,
      expectedContent: string
    ): Chainable<void>;

    /**
     * Wait for app stability
     * @param timeout - Timeout in milliseconds
     * @example cy.waitForAppStability()
     */
    waitForAppStability(timeout?: number): Chainable<void>;

    /**
     * Check if element exists
     * @param selector - The selector
     * @example cy.doesExist('[data-testid="app-title"]')
     */
    doesExist(selector?: string): Chainable<boolean>;

    /**
     * Check if page contains any matching text patterns
     * @param patterns - Array of patterns to check
     * @example cy.containsAnyText([/Security/, 'Level'])
     */
    containsAnyText(patterns: Array<RegExp | string>): Chainable<boolean>;

    /**
     * Safe scrollIntoView that properly handles the force option
     * @param options - ScrollIntoViewOptions
     * @example cy.get('.element').safeScrollIntoView()
     */
    safeScrollIntoView(
      options?: ScrollIntoViewOptions
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * List JUnit files in the results directory
     * @example cy.listJunitFiles()
     */
    listJunitFiles(): Chainable<string[]>;

    /**
     * Find a widget using multiple selector strategies with enhanced resilience
     * @param widgetName - Case-insensitive name or partial ID of widget
     * @example cy.findWidget('security-summary')
     */
    findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Verifies content exists using multiple patterns
     * @param contentPatterns - Array of patterns to check
     * @example cy.verifyContentPresent(['Security', /Level/i])
     */
    verifyContentPresent(
      contentPatterns: Array<string | RegExp>
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Enforces element visibility for testing
     * @example cy.get('.element').forceVisible()
     */
    forceVisible(): Chainable<JQuery<HTMLElement>>;

    /**
     * Debug utility to log test performance metrics
     * @param testName - Name of the test
     * @param duration - Duration in milliseconds
     * @example cy.logPerformance('load-test', 1500)
     */
    logPerformance(testName: string, duration: number): Chainable<null>;

    /**
     * Verify text is contained in element
     * @param text - Text to check for
     * @example cy.containsText('Security')
     */
    containsText(text: string): Chainable<void>;

    /**
     * Log current application state
     * @example cy.logCurrentState()
     */
    logCurrentState(): Chainable<void>;

    /**
     * Find security level controls using multiple strategies
     * @example cy.findSecurityLevelControls()
     */
    findSecurityLevelControls(): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom measurement commands for performance testing
     * @example cy.startMeasurement('page-load')
     */
    startMeasurement(name: string): Chainable<void>;

    /**
     * End a performance measurement
     * @example cy.endMeasurement('page-load', 'page-loading')
     */
    endMeasurement(name: string, category?: string): Chainable<void>;
  }
}

// Extend the Window interface to include our custom properties
interface Window {
  consoleErrors?: string[];
  __REACT_APP_STATE__?: any;
}

// Add the AUTWindow interface extension that includes our custom properties
declare namespace Cypress {
  interface AUTWindow extends Window {
    consoleErrors?: string[];
    __REACT_APP_STATE__?: any;
  }
}
