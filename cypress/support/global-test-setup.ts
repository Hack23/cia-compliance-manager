import { applyTestStyles } from "./test-styles";

/**
 * Global setup function for all tests to ensure consistent environment
 */
export function setupTestEnvironment(): void {
  // First visit the page and ensure it loads
  cy.visit("/");
  cy.ensureAppLoaded();

  // Apply test styles for better screenshots and reliability
  applyTestStyles();

  // Set up console error capture with null check
  cy.window().then((win) => {
    // Initialize error array
    win.consoleErrors = win.consoleErrors || [];

    // Patch console.error to capture issues
    const originalError = win.console.error;
    win.console.error = (...args) => {
      // Use non-null assertion since we initialized it above
      win.consoleErrors!.push(args.join(" "));
      originalError.apply(win.console, args);
    };
  });

  // Disable animations and transitions
  cy.document().then((doc) => {
    const style = doc.createElement("style");
    style.textContent = `
      * {
        animation-duration: 0ms !important;
        transition-duration: 0ms !important;
        transition-delay: 0ms !important;
        animation-delay: 0ms !important;
      }
    `;
    doc.head.appendChild(style);

    // Mark body with testing class
    doc.body.classList.add("cypress-testing");
  });

  // Take a screenshot of initial setup
  cy.screenshot("test-environment-setup");

  // Wait for any final rendering
  cy.wait(500);
}

/**
 * Apply a specific theme for testing
 */
export function applyTestTheme(theme: "light" | "dark"): void {
  cy.document().then((doc) => {
    if (theme === "dark") {
      doc.documentElement.classList.add("dark");
      doc.body.classList.add("dark");
    } else {
      doc.documentElement.classList.remove("dark");
      doc.body.classList.remove("dark");
    }

    // Also update localStorage
    localStorage.setItem("darkMode", theme === "dark" ? "true" : "false");

    // Dispatch a theme change event that our component might listen for
    try {
      const event = new CustomEvent("themeChange", {
        detail: { theme },
      });
      window.dispatchEvent(event);
    } catch (e) {
      console.error("Failed to dispatch theme change event", e);
    }
  });

  // Wait for theme to apply
  cy.wait(300);
}
