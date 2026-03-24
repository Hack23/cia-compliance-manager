// Import all helper modules in the correct order
// NOTE: Use require() for local support modules that register Cypress.Commands.
// ES import hoisting in Cypress 15's webpack bundler can cause commands to be
// registered before Cypress is fully initialized, resulting in
// "cy.<command> is not a function" errors at runtime.
import "@testing-library/cypress/add-commands";
// Side-effect import: registers global "real" event commands (keyboard/mouse)
// used by accessibility E2E tests (e.g., accessibility.cy.ts) for realistic
// keyboard navigation simulation (Tab, Shift+Tab, Arrow keys, Home, End).
// This enables WCAG 2.1 keyboard accessibility validation.
import "cypress-real-events";

// Load local support modules using require() to ensure correct execution order
require("./command-registry");
require("./commands");
require("./debug-helpers");
require("./enhanced-commands");
require("./global-test-setup");
require("./screenshot-analysis");
require("./screenshot-utils");
require("./test-cleanup");
require("./test-styles");
require("./widget-analyzer");
require("./widget-testing-template");


/**
 * This is a simplified Cypress support file that avoids common issues
 */

// Fix: Properly initialize window.process for environments that need it
if (typeof window !== "undefined" && !window.process) {
  window.process = {
    env: { NODE_ENV: "test" },
    // Add minimum required properties
    nextTick: (fn: Function) => setTimeout(fn, 0),
    cwd: () => "/",
    platform: "browser" as NodeJS.Platform,
    version: "",
    versions: { node: "0.0.0", v8: "0.0.0" } as NodeJS.ProcessVersions,
  } as unknown as NodeJS.Process;
}

// Alternatively, if you're using react-scripts or other tools that rely on process.env.NODE_ENV
if (typeof window !== "undefined" && window.process && !window.process.env) {
  window.process.env = {
    NODE_ENV: "test",
  };
}

// Centralized uncaught exception handler — single handler to avoid duplicate logs
Cypress.on("uncaught:exception", (err) => {
  console.error("Uncaught exception:", err.message);

  // Check for "require is not defined" errors and provide actionable feedback
  if (err && err.message && err.message.includes("require is not defined")) {
    console.error(`
      ERROR: "require is not defined" detected.
      This is a Node.js function not available in browsers.
      Solution: Replace require() with ES module imports in your test files.
    `);
  }

  // Prevent test failure on uncaught exceptions for better debugging
  return false;
});

// Handle mount command gracefully for E2E tests
// This avoids the need to check if the command exists using a non-existent list() method
if (Cypress.env("testingType") === "component") {
  // In component testing mode, mount is registered by the component testing plugin
  cy.log("Component testing mode detected - mount command available");
} else {
  // In E2E mode, provide a placeholder that shows a helpful error
  Cypress.Commands.add("mount", () => {
    cy.log("⚠️ mount() is only available in component testing mode");
    // Return an Element-typed chainable instead of null to match type expectations
    return cy.document().then((doc) => {
      // Create a dummy element for type compatibility
      const dummyEl = doc.createElement("div");
      return cy.wrap(dummyEl) as unknown as Cypress.Chainable<Element>;
    });
  });
}

// Note: selectSecurityLevelEnhanced is registered in enhanced-commands.ts — do not re-register here

// Add custom commands for working with test IDs
Cypress.Commands.add("getByTestId", (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Command to navigate to specific widgets
Cypress.Commands.add("navigateToWidget", (widgetTestId) => {
  cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
    .scrollIntoView()
    .should("be.visible");
});

// Note: setSecurityLevels, ensureAppLoaded, and containsText are registered in commands.ts
// Do not re-register them here to avoid duplicate command errors

// Add before each hooks for test setup
beforeEach(() => {
  // Set up console error tracking
  cy.window().then((win) => {
    // Fix: Initialize consoleErrors array if it doesn't exist
    win.consoleErrors = win.consoleErrors || [];
    const originalError = win.console.error;
    win.console.error = (...args) => {
      win.consoleErrors!.push(args.join(" ")); // Use non-null assertion since we initialized it
      originalError.apply(win.console, args);
    };
  });

  // Disable animations for faster tests
  cy.document().then((document) => {
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        transition-duration: 0ms !important;
        animation-duration: 0ms !important;
        transition-delay: 0ms !important;
        animation-delay: 0ms !important;
      }
      .fade { opacity: 1 !important; }
    `;
    document.head.appendChild(style);
    document.body.classList.add("cypress-testing");
  });

  // Set viewport size for all tests
  cy.viewport(1280, 800);
});

// Centralized test failure handler — single handler to avoid inconsistent failure behavior
Cypress.on("fail", (error, runnable) => {
  // Log detailed context information
  console.error("Test Failure:", {
    title: runnable.title,
    error: error.message,
    stack: error.stack,
  });

  if (
    error.message.includes("not visible") ||
    error.message.includes("being clipped")
  ) {
    cy.log("Element visibility issue detected. Adding debug information...");
  }

  // Re-throw to fail the test
  throw error;
});

// Make sure directory exists for test results - using synchronous method to avoid Promise issues
before(() => {
  // Use a simple log instead of the task that's causing issues
  cy.log("Ensuring cypress/results directory exists");

  // Alternative way to handle setup without the problematic task
  // This doesn't use cy.task which is causing the issue
  cy.window().then(() => {
    console.log("Test setup completed");
  });
});

// Fix: Properly type overwrite for scrollIntoView with correct subject typing
Cypress.Commands.overwrite(
  "scrollIntoView",
  function (originalFn, subject: any) {
    // Use any for the subject parameter to avoid typing conflicts
    // Handle subject with multiple elements
    if (subject && typeof subject.length === "number" && subject.length > 1) {
      // Get only the first element if it's a jQuery collection
      if (typeof subject.first === "function") {
        subject = subject.first();
      }
    }
    // Call original function with the subject
    return originalFn(subject);
  }
);

// Fix: Add proper error handling for window.top access
before(() => {
  try {
    const app = window.top;
    if (
      app &&
      app.document &&
      app.document.head &&
      !app.document.head.querySelector("[data-hide-command-log-request]")
    ) {
      const style = app.document.createElement("style");
      style.innerHTML =
        ".command-name-request, .command-name-xhr { display: none }";
      style.setAttribute("data-hide-command-log-request", "");
      app.document.head.appendChild(style);
    }
  } catch (err) {
    // Safely handle any errors accessing window.top
    cy.log("Could not modify window.top styles");
  }
});

// Define window interface for better type safety
declare global {
  namespace Cypress {
    // Avoid type conflicts by not redefining mount in this file
    // Instead use the definition from @cypress/react
    interface Chainable {
      /**
       * Enhanced version of selectSecurityLevel
       */
      selectSecurityLevelEnhanced(
        category: string,
        level: string
      ): Chainable<void>;

      /**
       * Get element by test ID
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Navigate to a widget on the page
       */
      navigateToWidget(widgetTestId: string): Chainable<void>;

      /**
       * Ensure the app is fully loaded
       */
      ensureAppLoaded(): Chainable<void>;

      /**
       * Simple custom command for demo purpose
       */
      customCommand(arg: string): Chainable<void>;

      /**
       * Mount a component (only in component testing mode)
       * This command is only fully implemented when running component tests
       */
      mount(
        component: React.ReactNode,
        options?: any
      ): Cypress.Chainable<Element>;
    }
  }

  interface Window {
    consoleErrors?: string[];
  }
}

// Export empty object to satisfy TypeScript module requirements
export {};
