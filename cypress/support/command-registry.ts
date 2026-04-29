/**
 * Central registry for all custom Cypress commands
 * This helps avoid circular dependencies and duplicate registrations
 */
import {
  analyzeWidgets,
  debugFailedTest,
  logAllTestIds,
  logVisibleElements,
} from "./debug-helpers";
import { applyTestTheme, setupTestEnvironment } from "./global-test-setup";
import {
  captureAllWidgetsSimple,
  captureFullPageModes,
  captureWidgetThemes,
} from "./screenshot-utils";
import { applyTestStyles, forceDarkMode, forceLightMode } from "./test-styles";
import { analyzeAndDocumentWidgets } from "./widget-analyzer";
import { findWidgetFlexibly } from "./widget-testing-template";

// Type augmentations for the custom commands registered below.
// Keep these collocated with the registrations so the implementations and the
// `Cypress.Commands.add` call signatures stay in sync without `any` casts.
declare global {
  namespace Cypress {
    interface Chainable {
      /** Apply test-only stylesheet overrides (see ./test-styles). */
      applyTestStyles(): Chainable<void>;
      /**
       * Find a widget using a series of fallback selectors.
       * @param widgetId Widget id or partial test id
       */
      findWidgetFlexibly(widgetId: string): Chainable<JQuery<HTMLElement>>;
      /** Analyze and document widgets present in the DOM. */
      analyzeWidgetTestIds(): Chainable<void>;
      /**
       * Capture screenshots of a widget across light/dark themes.
       * @param widgetName Widget name used to label captures
       */
      captureWidgetThemes(widgetName: string): Chainable<void>;
      /**
       * Capture full-page screenshots in light/dark modes.
       * @param pageName Page name used to label captures
       */
      captureFullPageModes(pageName: string): Chainable<void>;
      /** Capture screenshots of all widgets in a single pass. */
      captureAllWidgets(): Chainable<void>;
      /** Set up the global Cypress test environment. */
      setupTestEnvironment(): Chainable<void>;
      /**
       * Apply a specific theme to the test environment.
       * @param theme "light" or "dark"
       */
      applyTestTheme(theme: "light" | "dark"): Chainable<void>;
      /** Log a confirmation that custom commands were registered. */
      logRegisteredCommands(): Chainable<void>;
    }
  }
}

// Register all commands in one place
function registerAllCommands(): void {
  // Debug helpers - these have proper types already
  Cypress.Commands.add("debugFailedTest", debugFailedTest);
  Cypress.Commands.add("analyzeWidgets", analyzeWidgets);
  Cypress.Commands.add("logVisibleElements", logVisibleElements);
  Cypress.Commands.add("logAllTestIds", logAllTestIds);

  // Use a type-safe approach with correct return types
  // These commands must return Chainable<void> instead of null
  Cypress.Commands.add("applyTestStyles", () => {
    applyTestStyles();
    // No explicit return needed as it will implicitly return void
  });

  Cypress.Commands.add("forceDarkMode", () => {
    forceDarkMode();
    // No explicit return needed as it will implicitly return void
  });

  Cypress.Commands.add("forceLightMode", () => {
    forceLightMode();
    // No explicit return needed as it will implicitly return void
  });

  // Custom commands typed via the `declare global` block above; registered
  // through the standard `Cypress.Commands.add` API without `any` casts.
  Cypress.Commands.add("findWidgetFlexibly", (widgetId: string) => {
    return findWidgetFlexibly(widgetId);
  });

  Cypress.Commands.add("analyzeWidgetTestIds", () => {
    analyzeAndDocumentWidgets();
  });

  Cypress.Commands.add("captureWidgetThemes", (widgetName: string) => {
    captureWidgetThemes(widgetName);
  });

  Cypress.Commands.add("captureFullPageModes", (pageName: string) => {
    captureFullPageModes(pageName);
  });

  Cypress.Commands.add("captureAllWidgets", () => {
    captureAllWidgetsSimple();
  });

  Cypress.Commands.add("setupTestEnvironment", () => {
    setupTestEnvironment();
  });

  Cypress.Commands.add("applyTestTheme", (theme: "light" | "dark") => {
    applyTestTheme(theme);
  });

  Cypress.Commands.add("logRegisteredCommands", () => {
    // Don't access internal _commands property
    cy.log("Custom commands registered successfully");
  });
}

// Call this function to register all commands
registerAllCommands();
