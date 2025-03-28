/**
 * Type definitions for custom Cypress commands
 * This centralizes all command type definitions to avoid conflicts
 */

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Find security level controls in the application
     */
    findSecurityLevelControls(): Chainable<JQuery<HTMLElement>>;

    /**
     * Check if content is present in the page
     */
    verifyContentPresent(
      content: string | RegExp | Array<string | RegExp>
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Check if body contains specific text
     */
    containsText(text: string): Chainable<void>;

    /**
     * Start performance measurement for a named operation
     */
    startMeasurement(name: string): Chainable<void>;

    /**
     * End performance measurement and log results
     */
    endMeasurement(name: string, category?: string): Chainable<void>;

    /**
     * Set security levels with reliable waiting between selections
     */
    setSecurityLevels(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<void>;

    /**
     * Find a widget by name or ID
     */
    findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Get a widget's text content
     */
    getWidgetContent(widgetId: string): Chainable<string | null>;

    /**
     * Find an element within a widget
     */
    findWidgetElement(
      widgetId: string,
      elementSelector: string
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Force dark mode regardless of theme toggle presence
     */
    forceDarkMode(): Chainable<void>;

    /**
     * Force light mode regardless of theme toggle presence
     */
    forceLightMode(): Chainable<void>;

    /**
     * Toggle theme regardless of button presence
     */
    toggleTheme(): Chainable<void>;

    /**
     * Get element by test ID
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Navigate to a widget on the page
     */
    navigateToWidget(widgetTestId: string): Chainable<void>;

    /**
     * Enhanced version of selectSecurityLevel
     */
    selectSecurityLevelEnhanced(
      category: string,
      level: string
    ): Chainable<void>;

    /**
     * Ensure the app is fully loaded
     */
    ensureAppLoaded(): Chainable<void>;

    /**
     * Mount a component (only in component testing mode)
     */
    mount(component: React.ReactNode, options?: any): Chainable<Element>;
  }
}
