import "./commands";
import { mount } from "cypress/react";
import "@testing-library/cypress/add-commands";
import { TEST_IDS } from "../../src/constants/testIds";

import {
  verifySecurityLevelAffectsContent,
  testTabNavigation,
  testAccessibility,
} from "./test-patterns";
// Or use the default export:
// import testPatterns from "./test-patterns";

Cypress.on("uncaught:exception", (err) => {
  console.log("Uncaught exception:", err);

  // Check for "require is not defined" errors and provide actionable feedback
  if (err && err.message && err.message.includes("require is not defined")) {
    console.error(`
      ERROR: "require is not defined" detected. 
      This is a Node.js function not available in browsers.
      Solution: Replace require() with ES module imports in your test files.
      Example: Change "const x = require('y')" to "import x from 'y'"
    `);
  }

  // Prevent test failure on uncaught exceptions for more graceful debugging
  return false;
});

// Fix type for mount command
// Use an explicit type assertion to avoid TypeScript errors
Cypress.Commands.add("mount", mount as unknown as Cypress.CommandFn<"mount">);

Cypress.Commands.add("checkTheme", (isDark: boolean): void => {
  if (isDark) {
    cy.get("#root").should("have.class", "dark");
    cy.get(`[data-testid="${TEST_IDS.THEME_TOGGLE}"]`).should(
      "contain.text",
      "Light Mode"
    );
  } else {
    cy.get("#root").should("not.have.class", "dark");
    cy.get(`[data-testid="${TEST_IDS.THEME_TOGGLE}"]`).should(
      "contain.text",
      "Dark Mode"
    );
  }
});

Cypress.Commands.add(
  "safeSelect",
  { prevSubject: "element" },
  (subject, value, options = {}) => {
    cy.wrap(subject).scrollIntoView();
    cy.wait(200);
    return cy.wrap(subject).select(value, { force: true, ...options });
  }
);

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

Cypress.Commands.add("ensureAppLoaded", () => {
  cy.get("body", { timeout: 10000 }).should("not.be.empty");
  cy.contains("CIA Compliance Manager", { timeout: 5000 }).should("be.visible");
});

Cypress.config("defaultCommandTimeout", 10000);

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const parentTitle = runnable?.parent?.title || "Unknown";
    const testTitle = test?.title || "Unknown";

    cy.screenshot(`${parentTitle} -- ${testTitle} -- debug-failure`, {
      capture: "fullPage",
    });

    cy.document().then((doc) => {
      console.log("HTML at failure:", doc.documentElement.outerHTML);
    });

    try {
      const win = window as any;
      if (
        win.Cypress &&
        typeof win.Cypress === "object" &&
        "reactComponentState" in win.Cypress
      ) {
        console.log("React component state:", win.Cypress.reactComponentState);
      }
    } catch (e) {
      console.log("Could not access React component state:", e);
    }
  }
});

before(() => {
  cy.document().then((document) => {
    const style = document.createElement("style");
    style.innerHTML = `
      .cypress-testing * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add("cypress-testing");
  });
});

before(() => {
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
});

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

Cypress.Commands.add("containsText", (text: string): void => {
  cy.get("body").invoke("text").should("include", text);
});

Cypress.Commands.add("logCurrentState", (): void => {
  cy.log("------ Current App State ------");
  cy.get("select").then(($selects) => {
    $selects.each((i, el) => {
      cy.log(`${el.id || "unknown select"}: ${el.value}`);
    });
  });
});

Cypress.Commands.add("selectSafe", (selector: string, value: string): void => {
  cy.get(selector, { timeout: 5000 })
    .should("exist")
    .scrollIntoView()
    .wait(100)
    .select(value, { force: true });
});

Cypress.Commands.add("logElementDetails", (selector: string): void => {
  cy.get(selector).then(($el) => {
    cy.log(`Element ${selector}:`);
    cy.log(`- Visible: ${$el.is(":visible")}`);
    cy.log(`- Disabled: ${$el.is(":disabled")}`);
    cy.log(`- Classes: ${$el.attr("class")}`);
    cy.log(`- Width x Height: ${$el.width()} x ${$el.height()}`);

    const offset = $el.offset();
    if (offset) {
      cy.log(`- Position: (${offset.left}, ${offset.top})`);
    }
  });
});

before(() => {
  cy.task("resetJunitResults");
});

before(() => {
  // Create results directory using Cypress task instead of direct fs access
  cy.task("ensureDir", "cypress/results").then((result) => {
    console.log(`Results directory status: ${result}`);
  });
});

import "cypress-wait-until";
import "cypress-real-events";

Cypress.Commands.add("navigateToWidget", (widgetTestId) => {
  cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
    .scrollIntoView()
    .should("be.visible");
});

before(() => {
  Cypress.Commands.overwrite(
    "scrollIntoView",
    function (originalFn, subject, options?) {
      const el = subject as unknown as JQuery<HTMLElement>;
      const fn = originalFn as unknown as (
        subj: JQuery<HTMLElement>,
        opts?: Partial<Cypress.ScrollIntoViewOptions>
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      if (el && el.length > 1) {
        return fn.call(this, el.first(), options);
      }
      return fn.call(this, el, options);
    }
  );

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
});

Cypress.config("retries", {
  runMode: 1,
  openMode: 0,
});

beforeEach(() => {
  if (Cypress.config("viewportWidth") === 0) {
    cy.viewport(1280, 800);
  }
});

// Force viewport size for all tests
beforeEach(() => {
  // Set viewport explicitly in each test's beforeEach
  cy.viewport(3840, 2160);
});

// Add JUnit file verification after all tests complete
after(() => {
  cy.task("listJunitFiles").then((result: unknown) => {
    // Type assertion for the result
    const files = result as string[];

    if (Array.isArray(files) && files.length > 0) {
      console.log(
        `Found ${files.length} JUnit XML files in the results directory`
      );
      files.forEach((file) => console.log(`  - ${file}`));

      // Verify JUnit file integrity by checking basic XML structure
      if (typeof files[0] === "string") {
        cy.task("readFile", { path: files[0] }).then((fileResult: unknown) => {
          const typedFileResult = fileResult as { content: string };
          if (
            typedFileResult.content &&
            typedFileResult.content.includes("<testsuite")
          ) {
            console.log("JUnit XML format appears valid");
          } else {
            console.warn(
              "⚠️ JUnit XML may have format issues - check report content"
            );
          }
        });
      }
    } else {
      console.warn(
        "⚠️ No JUnit XML files found! Reporting may not be working correctly."
      );
    }
  });

  // Log final test status
  cy.log(`Test run completed at ${new Date().toISOString()}`);
});

interface LoadAttributes {
  window?: Window;
  document?: Document;
  [key: string]: any;
}

Cypress.on("window:load", (attributes: LoadAttributes) => {
  // Your window load handling logic here
});

// Enhanced error handling for test failures
Cypress.on("fail", (error, runnable) => {
  // Log test failure with enhanced debug information
  cy.log(`Test failed: ${runnable.title}`);

  // Take screenshots with more descriptive names
  const testPath = Cypress.spec.relative.replace(/\.cy\.ts$/, "");
  const screenshotName = `${testPath}/${runnable.title.replace(
    /\s+/g,
    "-"
  )}-failure`;

  cy.screenshot(screenshotName, { capture: "viewport" });

  // Log more details about the error
  cy.log(`Error name: ${error.name}`);
  cy.log(`Error message: ${error.message}`);

  // For visibility issues, try to debug the element structure
  if (
    error.message.includes("not visible") ||
    error.message.includes("not found")
  ) {
    cy.log("Element visibility issue detected. Adding debug information...");
    cy.logVisibleElements();
    cy.logAllTestIds();
  }

  // Log important DOM information
  cy.document().then((doc) => {
    cy.log(`Page title: ${doc.title}`);
    cy.log(`Body classes: ${doc.body.className}`);
    cy.log(
      `Number of [data-testid] elements: ${
        doc.querySelectorAll("[data-testid]").length
      }`
    );
    cy.log(`URL at failure: ${doc.location.href}`);

    // Check for any error messages in the DOM
    const errorElements = doc.querySelectorAll(
      '.error, [role="alert"], [class*="error"]'
    );
    if (errorElements.length > 0) {
      cy.log(`Found ${errorElements.length} error elements in the DOM`);
      Array.from(errorElements).forEach((el, i) => {
        cy.log(`Error element ${i + 1}: ${el.textContent?.trim()}`);
      });
    }
  });

  // Check for console errors - Fix TypeScript error by ensuring consoleErrors exists
  cy.window().then((win: Cypress.AUTWindow) => {
    // Initialize consoleErrors if it doesn't exist
    if (!win.consoleErrors) {
      win.consoleErrors = [];
    }

    // Now it's safe to use the consoleErrors
    if (win.consoleErrors && win.consoleErrors.length > 0) {
      cy.log(`Found ${win.consoleErrors.length} console errors:`);
      win.consoleErrors.forEach((err: string, i: number) => {
        cy.log(`Console error ${i + 1}: ${err}`);
      });
    }
  });

  // Throw the original error to fail the test
  throw error;
});

// Enhanced setup for all tests
before(() => {
  // Capture console errors
  cy.window().then((win) => {
    win.consoleErrors = [];
    const originalError = win.console.error;
    win.console.error = (...args) => {
      win.consoleErrors.push(args.join(" "));
      originalError.apply(win.console, args);
    };
  });

  // Ensure test results directory exists and is ready
  cy.task("writeFile", {
    path: "cypress/results/test-setup-verification.txt",
    content: `Test setup verified at ${new Date().toISOString()}`,
  });

  // Reset JUnit results at the start of test run
  cy.task("resetJunitResults");
});
