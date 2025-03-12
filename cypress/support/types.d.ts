/// <reference types="cypress" />

declare namespace Cypress {
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

  interface Chainable<Subject = any> {
    /**
     * Custom implementation of scrollIntoView that supports the force option
     * @param options - The options for scrolling into view
     */
    safeScrollIntoView(
      options?: Partial<ScrollIntoViewOptions>
    ): Chainable<Subject>;

    /**
     * Mount a React component in the Cypress test environment
     */
    mount: typeof mount;

    /**
     * Check the current theme state
     * @param isDark Whether the theme should be in dark mode
     */
    checkTheme(isDark: boolean): Chainable<void>;

    /**
     * Safe select wrapper that ensures element is in view
     * @param value The value to select
     * @param options Additional options for the select action
     */
    safeSelect(
      value: string, 
      options?: Partial<Cypress.SelectOptions>
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Sets the CIA triad security levels
     * @param availability The availability security level
     * @param integrity The integrity security level
     * @param confidentiality The confidentiality security level
     */
    setSecurityLevels(
      availability?: string | null,
      integrity?: string | null, 
      confidentiality?: string | null
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Ensures the application is fully loaded before proceeding
     */
    ensureAppLoaded(): Chainable<JQuery<HTMLElement>>;

    /**
     * Sets application state programmatically for testing
     * @param stateChanges Object with state properties to change
     */
    setAppState(stateChanges: Record<string, any>): Chainable<null>;

    /**
     * Checks if body text contains the given text
     * @param text Text to find in the body
     */
    containsText(text: string): Chainable<void>;

    /**
     * Logs the current state of select elements to aid debugging
     */
    logCurrentState(): Chainable<void>;

    /**
     * Safer select implementation with better error handling
     * @param selector Element selector
     * @param value Value to select
     */
    selectSafe(selector: string, value: string): Chainable<void>;

    /**
     * Log details about an element for debugging
     * @param selector Element selector
     */
    logElementDetails(selector: string): Chainable<void>;

    /**
     * Navigate to and make visible a specific widget
     */
    navigateToWidget(testId: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Finds a widget by name using multiple selector strategies
     * @param widgetName Name or identifier of the widget to find
     * @returns Chainable with the found widget element
     */
    findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;

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

    /**
     * Takes a screenshot and logs DOM state at failure point
     * @param testName Name of the test that failed
     */
    debugFailure(testName: string): void;

    /**
     * Logs information about currently visible elements
     */
    logVisibleElements(): void;

    /**
     * Logs all test IDs present in the DOM
     */
    logAllTestIds(): void;

    /**
     * Gets elements by test ID
     */
    getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Enhanced security level selection with fallbacks
     */
    selectSecurityLevelEnhanced(
      category: "availability" | "integrity" | "confidentiality",
      level: string
    ): Chainable<void>;

    /**
     * Attempts to click a button matching text pattern
     */
    tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;

    /**
     * Waits for specific content to appear on the page
     */
    waitForContent(
      contentPattern: string | RegExp,
      options?: { timeout: number }
    ): Chainable<boolean>;

    /**
     * Press tab key and focus next element
     */
    tab(): Chainable<JQuery<HTMLElement>>;

    /**
     * Verifies a widget contains specific content
     */
    verifyWidgetWithContent(
      widgetTestId: string,
      expectedContent: string
    ): Chainable<void>;

    /**
     * Wait for application to stabilize
     */
    waitForAppStability(timeout?: number): Chainable<void>;

    /**
     * Check if an element exists in DOM
     */
    doesExist(selector?: string): Chainable<boolean>;

    /**
     * Check if page contains any matching text patterns
     */
    containsAnyText(patterns: Array<RegExp | string>): Chainable<boolean>;

    /**
     * Start measuring time for an operation
     * @param label Name of the operation to measure
     */
    startMeasurement(label: string): Chainable<void>;

    /**
     * Makes an element visible for testing purposes
     */
    forceVisible(): Chainable<Subject>;

    /**
     * Verifies that page contains at least one specified content pattern
     * @param contentPatterns Array of content patterns to check for
     */
    verifyContentPresent(
      contentPatterns: Array<string | RegExp>
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Log performance metrics for a test
     */
    logPerformance(testName: string, duration: number): Chainable<null>;

    /**
     * Highlights an element temporarily for debugging
     */
    highlight(): Chainable<Subject>;

    /**
     * Measures execution time of a Cypress operation
     */
    measureTime<T>(fn: () => Chainable<T>, label?: string): Chainable<T>;

    /**
     * Dumps application state to console
     */
    dumpAppState(): Chainable<void>;

    /**
     * List JUnit files in the results directory
     */
    listJunitFiles(): Chainable<string[]>;

    /**
     * Assert that an operation's performance meets requirements
     */
    assertPerformance(
      operationName: string,
      duration: number,
      thresholds?: {
        warning: number;
        error: number;
      }
    ): Chainable<boolean>;

    /**
     * Assert that a category's performance meets requirements
     */
    assertCategoryPerformance(
      categoryName: string,
      durations: number[],
      thresholds?: {
        warning: number;
        error: number;
      }
    ): Chainable<boolean>;

    /**
     * Check a metric against baseline
     */
    checkMetricAgainstBaseline(
      metricName: string,
      thresholds?: {
        warning: number;
        error: number;
      }
    ): Chainable<boolean>;
  }
}

// Type for React mount function
declare const mount: (component: React.ReactNode, options?: any) => Cypress.Chainable;

// Custom window interface extension for Redux store
interface Window {
  store?: {
    getState(): unknown;
  };
}
