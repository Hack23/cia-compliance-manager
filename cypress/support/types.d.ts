/// <reference types="cypress" />

// Include reference to the enhanced-commands file
/// <reference path="./enhanced-commands.ts" />

// Define widget name type for better intellisense and type checking
type WidgetName =
  // Main widget container IDs from updated analysis
  | "widget-container-widget-security-level"
  | "widget-container-widget-business-impact"
  | "widget-container-widget-security-summary"
  | "widget-container-widget-cost-estimation"
  | "widget-container-widget-value-creation"
  | "widget-container-widget-compliance-status"
  | "widget-container-widget-technical-details"
  | "widget-container-widget-availability-impact"
  | "widget-container-widget-integrity-impact"
  | "widget-container-widget-confidentiality-impact"
  | "widget-container-widget-security-resources"
  | "widget-container-widget-security-visualization"
  | "widget-container-cia-impact-summary"

  // Widget root elements (without the container prefix)
  | "widget-security-level-selection"
  | "widget-security-summary"
  | "widget-business-impact"
  | "widget-technical-details"
  | "widget-cost-estimation"
  | "widget-value-creation"
  | "widget-compliance-status"
  | "widget-radar-chart"
  | "widget-availability-impact-container"
  | "widget-integrity-impact-container"
  | "widget-confidentiality-impact-container"
  | "widget-security-resources-container"
  | "cia-impact-summary-widget"

  // Simplified search terms (for search flexibility)
  | "security-level"
  | "security-summary"
  | "business-impact"
  | "technical-details"
  | "cost-estimation"
  | "value-creation"
  | "compliance-status"
  | "radar-chart"
  | "availability-impact"
  | "integrity-impact"
  | "confidentiality-impact"
  | "security-resources"
  | "cia-impact-summary"
  | string; // Allow for other widget names too

// Performance record interface for metrics tracking
interface PerformanceRecord {
  operation: string;
  duration: number;
  timestamp: number;
  category?: string;
}

// Extend Window to include our custom properties
interface Window {
  store?: {
    getState(): unknown;
  };
  consoleErrors?: string[];
  __REACT_APP_STATE__?: any;
  cypressPerformanceMetrics?: {
    records: PerformanceRecord[];
    startTime: number;
  };
}

// Enhanced scroll options
interface ScrollIntoViewOptions extends ScrollIntoViewOptionsBase {
  /**
   * Whether to force the action even if element is hidden, disabled etc.
   * @default false
   */
  force?: boolean;

  /**
   * Duration for scrolling animation
   */
  duration?: number;
}

// Type for React mount function
declare const mount: (
  component: React.ReactNode,
  options?: any
) => Cypress.Chainable;

// Consolidated Cypress namespace extensions
declare namespace Cypress {
  // Extend AUTWindow for consistent typing
  interface AUTWindow extends Window {
    consoleErrors: string[]; // Defined as non-optional to avoid null checks
    __REACT_APP_STATE__?: any;
  }

  // Consolidated interface for all custom commands
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

    // Mount React component
    mount: typeof mount;

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
    findWidget(widgetName: WidgetName): Chainable<JQuery<HTMLElement>>;

    /**
     * Find security level controls using multiple strategies
     * @example cy.findSecurityLevelControls()
     */
    findSecurityLevelControls(): Chainable<JQuery<HTMLElement>>;

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
     * Debug utilities
     */
    debugFailure(testName: string): void;
    logVisibleElements(): void;
    logAllTestIds(): void;
    highlight(): Chainable<Element>;
    measureTime<T>(fn: () => Chainable<T>, label?: string): Chainable<T>;
    dumpAppState(): Chainable<void>;
    logAppState(): Chainable<null>;
    logWidgetStructure(): Chainable<null>;
    debugSecurityControls(): Chainable<null>;
    analyzeWidgetsOnPage(): Chainable<null>;

    /**
     * Performance measurement commands
     */
    startMeasurement(name: string): Chainable<void>;
    endMeasurement(name: string, category?: string): Chainable<number>;
    generatePerformanceReport(): Chainable<void>;
    collectPerformanceMetrics(
      operationName: string,
      category?: string
    ): Chainable<Subject>;
    setAppState(stateChanges: Record<string, any>): Chainable<null>;
  }
}

// Cypress type augmentation for custom commands
/// <reference types="cypress" />

// We keep all type declarations here to avoid duplicates
declare namespace Cypress {
  interface Chainable {
    // Core test helpers
    ensureAppLoaded(timeout?: number): Chainable<void>;
    setSecurityLevels(
      availability?: string,
      integrity?: string,
      confidentiality?: string
    ): Chainable<void>;

    // Widget finding and verification
    findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;
    findWidgetFlexibly(widgetId: string): Chainable<JQuery<HTMLElement>>;
    verifyContentPresent(
      contentPatterns: Array<string | RegExp>
    ): Chainable<JQuery<HTMLElement>>;
    containsText(text: string): Chainable<void>;

    // Debug helpers
    debugFailedTest(testName: string): Chainable<void>;
    analyzeWidgets(): Chainable<void>;
    logVisibleElements(): Chainable<void>;
    logAllTestIds(): Chainable<void>;

    // UI helpers
    applyTestStyles(): Chainable<null>;
    forceDarkMode(): Chainable<void>;
    forceLightMode(): Chainable<void>;
    toggleTheme(): Chainable<void>;

    // Enhanced widget testing
    findWidgetEnhanced(
      widgetNameOrPattern: string | RegExp
    ): Chainable<JQuery<HTMLElement>>;
    waitForStableContent(
      selector: string,
      options?: { timeout?: number; pollInterval?: number }
    ): Chainable<void>;
    optimizeForScreenshot(): Chainable<JQuery<HTMLElement>>;
    screenshotWidget(name: string): Chainable<JQuery<HTMLElement>>;
    analyzeWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;
    fixVisualIssues(): Chainable<JQuery<HTMLElement>>;

    // Template system commands
    checkForDeprecatedTests(): Chainable<void>;
    findUnconvertedWidgetTests(): Chainable<void>;
    analyzeWidgetTestIds(): Chainable<void>;
  }

  // Add window augmentation for our debug properties
  interface AUTWindow {
    consoleErrors?: string[];
    __REACT_APP_STATE__?: unknown;
  }
}
