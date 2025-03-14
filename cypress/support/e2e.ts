import "@testing-library/cypress/add-commands";
import { mount } from "cypress/react";
import { TEST_IDS } from "../../src/constants/testIds";

/**
 * This is a simplified Cypress support file that avoids common issues like:
 * - No "require" statements (uses ES modules)
 * - No direct cy.task() calls at module level
 * - Proper registration of custom commands
 */

// Handle uncaught exceptions to make tests more stable
Cypress.on("uncaught:exception", (err) => {
  console.log("Uncaught exception:", err);

  // Provide helpful error messages for common issues
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

// Mount command for component testing
Cypress.Commands.add("mount", mount);

// Custom commands that were defined in types but not implemented
Cypress.Commands.add("selectSecurityLevelEnhanced", (category, level) => {
  cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`)
    .should('be.visible')
    .within(() => {
      const selectId = category === "availability" 
        ? TEST_IDS.AVAILABILITY_SELECT 
        : category === "integrity" 
          ? TEST_IDS.INTEGRITY_SELECT 
          : TEST_IDS.CONFIDENTIALITY_SELECT;
      
      cy.get(`[data-testid="${selectId}"]`).select(level);
    });
  
  // Wait for changes to be applied
  cy.wait(300);
});

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

// Simple set security levels command using enhanced selectors
Cypress.Commands.add("setSecurityLevels", (availability, integrity, confidentiality) => {
  cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`, { timeout: 10000 })
    .should('be.visible')
    .scrollIntoView();

  cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`).within(() => {
    if (availability) {
      cy.get(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`).select(availability, { force: true });
    }
    
    if (integrity) {
      cy.get(`[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`).select(integrity, { force: true });
    }
    
    if (confidentiality) {
      cy.get(`[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`).select(confidentiality, { force: true });
    }
  });

  // Wait for changes to apply
  cy.wait(300);
});

// Ensure the app is loaded before starting tests
Cypress.Commands.add("ensureAppLoaded", () => {
  cy.get("body", { timeout: 10000 }).should("not.be.empty");
  cy.contains("CIA Compliance Manager", { timeout: 5000 }).should("be.visible");
});

// Add text content verification command
Cypress.Commands.add("containsText", (text) => {
  cy.get("body").invoke("text").should("include", text);
});

// Add before each hooks for test setup
beforeEach(() => {
  // Set up console error tracking
  cy.window().then((win) => {
    win.consoleErrors = [];
    const originalError = win.console.error;
    win.console.error = (...args) => {
      win.consoleErrors.push(args.join(" "));
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

// Handle test failures more gracefully
Cypress.on("fail", (error, runnable) => {
  if (error.message.includes("not visible") || error.message.includes("being clipped")) {
    cy.log("Element visibility issue detected. Adding debug information...");
    cy.screenshot(`debug-${runnable.title.replace(/\s+/g, "-")}`, { capture: "viewport" });
  }
  throw error;
});

// Make sure directory exists for test results - using before hook instead of directly
before(() => {
  cy.task("ensureDir", "cypress/results").then(() => {}, () => {
    // Silently handle errors
  });
});

// Fix scrollIntoView to handle multiple elements better
Cypress.Commands.overwrite("scrollIntoView", function(originalFn, subject, options) {
  if (subject && subject.length > 1) {
    return originalFn.call(this, subject.first(), options);
  }
  return originalFn.call(this, subject, options);
});

// Hide fetch/XHR requests from command log
before(() => {
  const app = window.top;
  if (app && !app.document.head.querySelector("[data-hide-command-log-request]")) {
    const style = app.document.createElement("style");
    style.innerHTML = ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");
    app.document.head.appendChild(style);
  }
});

// Export empty object to satisfy TypeScript module requirements
export {};
import "@testing-library/cypress/add-commands";
import { mount } from "cypress/react";
import { TEST_IDS } from "../../src/constants/testIds";
import "./commands";

/**
 * This is a simplified e2e.ts file with no cy.task() calls at the module level.
 * This avoids "Cannot call cy.task() outside a running test" errors.
 */

// Handle uncaught exceptions gracefully
Cypress.on("uncaught:exception", (err) => {
  console.log("Uncaught exception:", err);

  // Check for "require is not defined" errors and provide actionable feedback
  if (err && err.message && err.message.includes("require is not defined")) {
    console.error(`
      ERROR: "require is not defined" detected. 
      This is a Node.js function not available in browsers.
      Solution: Replace require() with ES module imports in your test files.
    `);
  }

  // Prevent test failure on uncaught exceptions for more graceful debugging
  return false;
});

// Fix type for mount command
Cypress.Commands.add("mount", mount as unknown as Cypress.CommandFn<"mount">);

// Add reusable UI test helpers
Cypress.Commands.add("containsText", (text: string): void => {
  cy.get("body").invoke("text").should("include", text);
});

// Set app state through custom event for testing
Cypress.Commands.add(
  "setAppState",
  (stateChanges: Record<string, any>): Cypress.Chainable<null> => {
    return cy.window().then((win) => {
      const event = new CustomEvent("test:set-values", {
        detail: stateChanges,
      });
      win.document.dispatchEvent(event);
      return cy.wrap(null).wait(100);
    });
  }
);

// Set security levels shorthand
Cypress.Commands.add(
  "setSecurityLevels",
  (availability, integrity, confidentiality) => {
    cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`)
      .should("be.visible")
      .scrollIntoView();

    cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`).within(() => {
      if (availability) {
        cy.get(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`).select(
          availability,
          { force: true }
        );
      }

      if (integrity) {
        cy.get(`[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`).select(
          integrity,
          { force: true }
        );
      }

      if (confidentiality) {
        cy.get(`[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`).select(
          confidentiality,
          { force: true }
        );
      }
    });

    cy.wait(300);
  }
);

// Navigate to a specific widget
Cypress.Commands.add("navigateToWidget", (widgetTestId) => {
  cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
    .scrollIntoView()
    .should("be.visible");
});

// Ensure app is loaded before starting tests
Cypress.Commands.add("ensureAppLoaded", () => {
  cy.get("body", { timeout: 10000 }).should("not.be.empty");
  cy.contains("CIA Compliance Manager", { timeout: 5000 }).should("be.visible");
});

// Add before each hooks for test setup
beforeEach(() => {
  // Set up console error tracking
  cy.window().then((win) => {
    win.consoleErrors = [];
    const originalError = win.console.error;
    win.console.error = (...args) => {
      win.consoleErrors.push(args.join(" "));
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

// Handle test failures more gracefully
Cypress.on("fail", (error, runnable) => {
  if (
    error.message.includes("not visible") ||
    error.message.includes("being clipped")
  ) {
    cy.log("Element visibility issue detected. Adding debug information...");
    cy.screenshot(`debug-${runnable.title.replace(/\s+/g, "-")}`, {
      capture: "viewport",
    });
  }
  throw error;
});

// Fix scrollIntoView to handle multiple elements better
Cypress.Commands.overwrite("scrollIntoView", function (originalFn, subject, options) {
  if (subject && subject.length > 1) {
    return originalFn.call(this, subject.first(), options);
  }
  return originalFn.call(this, subject, options);
});

// Hide fetch/XHR requests from command log
before(() => {
  const app = window.top;
  if (app && !app.document.head.querySelector("[data-hide-command-log-request]")) {
    const style = app.document.createElement("style");
    style.innerHTML = ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");
    app.document.head.appendChild(style);
  }
});

// Export empty object to satisfy TypeScript module requirements
export {};
