/// <reference types="cypress" />

/**
 * Comprehensive type definitions for all custom Cypress commands
 */
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to ensure app is loaded before continuing
     * @example cy.ensureAppLoaded()
     */
    ensureAppLoaded(timeoutValue?: number): Chainable<void>;

    /**
     * Set security levels for each component
     * @example cy.setSecurityLevels('High', 'Moderate', 'Low')
     */
    setSecurityLevels(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<void>;

    /**
     * Find widget by name using flexible selectors
     * @example cy.findWidget('business-impact')
     */
    findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Find widget using even more flexible strategies
     * @example cy.findWidgetFlexibly('business-impact')
     */
    findWidgetFlexibly(widgetId: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Verify expected content is present in the page
     * @example cy.verifyContentPresent(['Success', /Error/])
     */
    verifyContentPresent(
      contentPatterns: Array<string | RegExp>
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Check that text content exists in the page
     * @example cy.containsText('Hello, world')
     */
    containsText(text: string): Chainable<void>;

    /**
     * Get element by test ID
     * @example cy.getByTestId('my-element')
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Navigate to a specific widget
     * @example cy.navigateToWidget('widget-business-impact')
     */
    navigateToWidget(widgetTestId: string): Chainable<void>;

    /**
     * Debug a failed test with screenshots and logging
     * @example cy.debugFailedTest('widget-test')
     */
    debugFailedTest(testName: string): Chainable<void>;

    /**
     * Analyze widgets on the page for debugging
     * @example cy.analyzeWidgets()
     */
    analyzeWidgets(): Chainable<void>;

    /**
     * Apply test styles for better screenshots
     * @example cy.applyTestStyles()
     */
    applyTestStyles(): Chainable<void>;

    /**
     * Force dark mode theme
     * @example cy.forceDarkMode()
     */
    forceDarkMode(): Chainable<void>;

    /**
     * Force light mode theme
     * @example cy.forceLightMode()
     */
    forceLightMode(): Chainable<void>;

    /**
     * Check for deprecated test files
     * @example cy.checkForDeprecatedTests()
     */
    checkForDeprecatedTests(): Chainable<void>;

    /**
     * Find widget tests that haven't been converted to use the template
     * @example cy.findUnconvertedWidgetTests()
     */
    findUnconvertedWidgetTests(): Chainable<void>;

    /**
     * Analyze widget test IDs
     * @example cy.analyzeWidgetTestIds()
     */
    analyzeWidgetTestIds(): Chainable<void>;

    /**
     * Capture widget states (screenshots) for different security levels
     * @example cy.captureWidgetStates('business-impact')
     */
    captureWidgetStates(widgetName: string): Chainable<void>;

    /**
     * Capture full page screenshots in different modes
     * @example cy.captureFullPageModes('dashboard')
     */
    captureFullPageModes(pageName: string): Chainable<void>;

    /**
     * Capture screenshots of all widgets on the page
     * @example cy.captureAllWidgets()
     */
    captureAllWidgets(): Chainable<void>;

    /**
     * Set up the test environment (styles, error tracking, etc.)
     * @example cy.setupTestEnvironment()
     */
    setupTestEnvironment(): Chainable<void>;

    /**
     * Apply a specific theme for testing
     * @example cy.applyTestTheme('dark')
     */
    applyTestTheme(theme: "light" | "dark"): Chainable<void>;

    /**
     * Log registered commands for debugging
     * @example cy.logRegisteredCommands()
     */
    logRegisteredCommands(): Chainable<void>;
  }

  // Add window augmentation for our debug properties
  interface AUTWindow {
    consoleErrors?: string[];
    __REACT_APP_STATE__?: unknown;
  }
}
