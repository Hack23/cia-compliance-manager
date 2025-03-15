/**
 * Shared type definitions for Cypress tests
 */

export interface WidgetTestOptions {
  skipWidgets?: string[];
  onlyWidgets?: string[];
  timeout?: number;
}

export type SecurityLevel = "Low" | "Moderate" | "High" | string;

export interface SecurityLevels {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

export interface WidgetConfig {
  id: string;
  type: string;
  title?: string;
  size?: string;
  width?: number;
  height?: number;
  visible?: boolean;
  order?: number;
  requiredSecurityLevels?: string[];
  minSecurityLevel?: string | number;
  maxSecurityLevel?: string | number;
}

// Extend Cypress namespace with our custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      // Debug commands
      debugFailure(testName: string): Chainable<null>;
      logVisibleElements(): Chainable<null>;
      logAllTestIds(): Chainable<null>;
      analyzeWidgetsOnPage(): Chainable<null>;
      highlight(): Chainable<JQuery<HTMLElement>>;
      // Add the missing debugFailedTest command
      debugFailedTest(testName: string): Chainable<null>;

      // Widget commands
      findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;
      setSecurityLevels(
        availability?: string,
        integrity?: string,
        confidentiality?: string
      ): Chainable<void>;
      findSecurityLevelControls(): Chainable<JQuery<HTMLElement>>;

      // App commands
      ensureAppLoaded(): Chainable<void>;
      verifyContentPresent(
        patterns: Array<string | RegExp>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
