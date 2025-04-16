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
import { deprecatedTestFiles } from "./test-cleanup";
import { applyTestStyles, forceDarkMode, forceLightMode } from "./test-styles";
import { analyzeAndDocumentWidgets } from "./widget-analyzer";
import { findWidgetFlexibly } from "./widget-testing-template";

// Register all commands in one place
export function registerAllCommands(): void {
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

  // We need to cast these commands that aren't in the Chainable interface
  // by using as any while ensuring types are properly defined in command-types.d.ts
  (Cypress.Commands as any).add("findWidgetFlexibly", (widgetId: string) => {
    return findWidgetFlexibly(widgetId);
  });

  (Cypress.Commands as any).add("analyzeWidgetTestIds", () => {
    analyzeAndDocumentWidgets();
    // Return implicitly
  });

  (Cypress.Commands as any).add("captureWidgetThemes", (widgetName: string) => {
    captureWidgetThemes(widgetName);
    // Return implicitly
  });

  (Cypress.Commands as any).add("captureFullPageModes", (pageName: string) => {
    captureFullPageModes(pageName);
    // Return implicitly
  });

  (Cypress.Commands as any).add("captureAllWidgets", () => {
    captureAllWidgetsSimple();
    // Return implicitly
  });

  (Cypress.Commands as any).add("setupTestEnvironment", () => {
    setupTestEnvironment();
    // Return implicitly
  });

  (Cypress.Commands as any).add("applyTestTheme", (theme: "light" | "dark") => {
    applyTestTheme(theme);
    // Return implicitly
  });

  // Standard commands that are in the interface
  Cypress.Commands.add("checkForDeprecatedTests", () => {
    cy.log(`Deprecated test files to check: ${deprecatedTestFiles.join(", ")}`);
    // No explicit return needed
  });

  Cypress.Commands.add("findUnconvertedWidgetTests", () => {
    cy.log("Checking for unconverted tests...");
    // No explicit return needed
  });

  // Use cast for custom commands not in the interface
  (Cypress.Commands as any).add("logRegisteredCommands", () => {
    // Don't access internal _commands property
    cy.log("Custom commands registered successfully");
    // Return implicitly
  });
}

// Call this function to register all commands
registerAllCommands();
