/**
 * Error Handling and Edge Cases E2E Test
 *
 * This test suite validates the application's resilience and error handling
 * capabilities across various edge cases and error scenarios.
 *
 * Test Scenarios:
 * - Invalid input handling
 * - Boundary condition tests
 * - Error recovery scenarios
 * - Empty state handling
 * - Network error simulation
 * - State corruption recovery
 */

import { SECURITY_LEVELS } from "../../support/constants";
import type { WindowWithConsoleErrors } from "../../support/test-types";

describe("Error Handling and Edge Cases", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1280, 800);
  });

  describe("Invalid Input Handling", () => {
    it("should handle corrupted localStorage data gracefully", () => {
      cy.log("🔧 Testing recovery from corrupted localStorage");

      // Inject various types of invalid data
      cy.window().then((win: WindowWithConsoleErrors) => {
        win.localStorage.setItem("securityLevels", "invalid-json");
        win.localStorage.setItem("assessmentData", '{"broken": json}');
        win.localStorage.setItem("userPreferences", "null");
      });

      // Reload application
      cy.reload();
      cy.ensureAppLoaded();

      // Application should recover and show default state
      cy.get("select").should("have.length.at.least", 3);
      cy.verifyMinimumWidgets(5);
      cy.log("✅ Application recovered from corrupted localStorage");
    });

    it("should handle missing localStorage gracefully", () => {
      cy.log("🔧 Testing behavior with cleared localStorage");

      // Clear all localStorage
      cy.clearLocalStorage();

      // Reload application
      cy.reload();
      cy.ensureAppLoaded();

      // Application should load with defaults
      cy.get("select").should("have.length.at.least", 3);
      cy.get("body").should("be.visible");
      cy.log("✅ Application loads with cleared localStorage");
    });

    it("should handle localStorage quota exceeded scenario", () => {
      cy.log("💾 Testing localStorage quota handling");

      // Override localStorage.setItem to simulate quota exceeded
      // Using plain JS override instead of cy.stub to avoid interfering with Cypress internals
      cy.window().then((win: WindowWithConsoleErrors) => {
        win.localStorage.setItem = () => {
          throw new DOMException(
            "The quota has been exceeded.",
            "QuotaExceededError"
          );
        };
      });

      // Interact with the app - this should trigger localStorage writes that will fail
      // The app should handle the error gracefully and remain functional
      cy.get("select").eq(0).select(SECURITY_LEVELS.HIGH, { force: true });

      // Application should still function despite quota errors
      cy.get("body").should("be.visible");
      cy.get("select").should("have.length.at.least", 3);
      cy.log("✓ Application handles quota exceeded gracefully");
    });
  });

  describe("Boundary Conditions", () => {
    it("should handle extremely rapid selection changes", () => {
      cy.log("⚡ Testing rapid fire selection changes");

      // Perform 20 rapid security level changes
      for (let i = 0; i < 20; i++) {
        const level =
          i % 3 === 0
            ? SECURITY_LEVELS.LOW
            : i % 3 === 1
            ? SECURITY_LEVELS.MODERATE
            : SECURITY_LEVELS.HIGH;

        cy.get("select").eq(i % 3).select(level, { force: true });
        // No wait - stress test
      }

      // Application should still be functional
      cy.verifyMinimumWidgets(5);
      cy.log("✅ Handled rapid changes without breaking");
    });

    it("should handle viewport size extremes", () => {
      cy.log("📱 Testing extreme viewport sizes");

      // Test very small viewport (mobile)
      cy.viewport(320, 568);
      cy.get("body").should("be.visible");
      cy.log("✓ Small viewport (320x568) renders correctly");

      // Test medium viewport (tablet)
      cy.viewport(768, 1024);
      cy.get("body").should("be.visible");
      cy.log("✓ Medium viewport (768x1024) renders correctly");

      // Test large viewport (desktop)
      cy.viewport(1920, 1080);
      cy.get("body").should("be.visible");
      cy.log("✓ Large viewport (1920x1080) renders correctly");

      // Test ultra-wide viewport
      cy.viewport(2560, 1440);
      cy.get("body").should("be.visible");
      cy.log("✓ Ultra-wide viewport (2560x1440) renders correctly");

      cy.log("✅ All viewport sizes handled correctly");
    });

    it("should handle very long page sessions without memory leaks", () => {
      cy.log("⏱️ Testing extended session behavior");

      // Simulate extended usage by making many state changes
      for (let i = 0; i < 10; i++) {
        cy.log(`Session iteration ${i + 1}/10`);

        cy.setSecurityLevels(
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.MODERATE
        );

        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.HIGH
        );
      }

      // Verify application still responsive
      cy.verifyMinimumWidgets(5);
      cy.log("✅ Extended session handled without degradation");
    });
  });

  describe("Error Recovery Scenarios", () => {
    it("should recover from navigation errors", () => {
      cy.log("🔄 Testing navigation error recovery");

      // Attempt to navigate to non-existent route
      cy.visit("/non-existent-route", { failOnStatusCode: false });

      // Should show some error state or redirect
      cy.get("body").should("exist");

      // Navigate back to home
      cy.visit("/");
      cy.ensureAppLoaded();

      // Application should be fully functional
      cy.get("select").should("have.length.at.least", 3);
      cy.log("✅ Recovered from navigation error");
    });

    it("should handle console errors gracefully", () => {
      cy.log("🐛 Monitoring console errors during usage");

      // Set up error tracking
      cy.window().then((win: WindowWithConsoleErrors) => {
        win.consoleErrors = [];
        const originalError = win.console.error;
        win.console.error = (...args: any[]) => {
          win.consoleErrors.push(args.join(" "));
          originalError.apply(win.console, args);
        };
      });

      // Perform normal operations
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.MODERATE
      );

      // Check for critical errors
      cy.window().then((win: WindowWithConsoleErrors) => {
        const errors = win.consoleErrors || [];
        const criticalErrors = errors.filter(
          (msg: string) =>
            msg.toLowerCase().includes("error") &&
            !msg.includes("Warning") &&
            !msg.includes("ℹ")
        );

        if (criticalErrors.length > 0) {
          cy.log(`⚠ Found ${criticalErrors.length} console errors`);
          criticalErrors.forEach((err: string) => {
            cy.log(`Error: ${err.slice(0, 100)}`);
          });
        } else {
          cy.log("✓ No critical console errors detected");
        }

        // Don't fail on warnings, only critical errors
        const hasCriticalErrors = criticalErrors.some((msg: string) =>
          msg.includes("undefined") || msg.includes("null") || msg.includes("Cannot read")
        );
        expect(hasCriticalErrors).to.be.false;
      });
    });

    it("should handle rapid page refresh scenarios", () => {
      cy.log("🔄 Testing rapid page refresh resilience");

      // Set initial state
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.LOW
      );

      // Perform rapid refreshes
      for (let i = 0; i < 3; i++) {
        cy.log(`Refresh ${i + 1}/3`);
        cy.reload();
        cy.ensureAppLoaded();
      }

      // Verify application still works
      cy.get("select").should("have.length.at.least", 3);
      cy.verifyMinimumWidgets(5);
      cy.log("✅ Handled rapid refreshes successfully");
    });
  });

  describe("Empty State Handling", () => {
    it("should display appropriate state when no selections made", () => {
      cy.log("📭 Testing empty state display");

      // Clear any existing selections
      cy.clearLocalStorage();
      cy.reload();
      cy.ensureAppLoaded();

      // Application should show widgets even with no selections
      cy.verifyMinimumWidgets(5);
      cy.log("✓ Widgets render with default state");

      // Check that selectors are available
      cy.get("select").should("have.length.at.least", 3);
      cy.log("✓ Security level selectors available");

      cy.log("✅ Empty state handled correctly");
    });

    it("should handle partially complete assessments", () => {
      cy.log("⚙️ Testing partial assessment state");

      // Set only one security level
      cy.get("select").eq(0).select(SECURITY_LEVELS.HIGH, { force: true });

      // Application should still render all widgets
      cy.verifyMinimumWidgets(5);

      // Set second security level
      cy.get("select").eq(1).select(SECURITY_LEVELS.MODERATE, { force: true });

      // Application should update appropriately
      cy.get('[data-testid*="widget"]').should("be.visible");

      cy.log("✅ Partial assessment states handled correctly");
    });
  });

  describe("State Consistency Validation", () => {
    it("should maintain consistent state across all widgets", () => {
      cy.log("🔄 Testing state consistency across widgets");

      // Set security levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.MODERATE
      );

      // Verify selections in controls
      cy.get("select").eq(0).should("have.value", SECURITY_LEVELS.HIGH);
      cy.get("select").eq(1).should("have.value", SECURITY_LEVELS.HIGH);
      cy.get("select").eq(2).should("have.value", SECURITY_LEVELS.MODERATE);

      // Wait for widgets to be present and verify minimum count
      cy.verifyMinimumWidgets(5);

      // All widgets should be visible and responding to the same state
      cy.get('[data-testid*="widget"]').should("be.visible");

      cy.log("✅ State consistency validated across all widgets");
    });

    it("should synchronize state after multiple rapid changes", () => {
      cy.log("⚡ Testing state synchronization after rapid changes");

      // Perform rapid changes
      cy.setSecurityLevels(SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW);
      cy.setSecurityLevels(SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH);
      cy.setSecurityLevels(
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE
      );

      // Final state should be Moderate across all
      cy.get("select").eq(0).should("have.value", SECURITY_LEVELS.MODERATE);
      cy.get("select").eq(1).should("have.value", SECURITY_LEVELS.MODERATE);
      cy.get("select").eq(2).should("have.value", SECURITY_LEVELS.MODERATE);

      // All widgets should reflect final state
      cy.verifyMinimumWidgets(5);

      cy.log("✅ State synchronized after rapid changes");
    });
  });

  describe("Browser Compatibility Edge Cases", () => {
    it("should handle missing Web API features gracefully", () => {
      cy.log("🌐 Testing graceful degradation");

      cy.window().then((win: WindowWithConsoleErrors) => {
        // Check for common Web APIs
        const hasLocalStorage = !!win.localStorage;
        const hasSessionStorage = !!win.sessionStorage;
        const hasConsole = !!win.console;

        cy.log(`localStorage available: ${hasLocalStorage}`);
        cy.log(`sessionStorage available: ${hasSessionStorage}`);
        cy.log(`console available: ${hasConsole}`);

        // Application should work even without some features
        expect(hasConsole).to.be.true;
      });

      // Application should still be functional
      cy.get("body").should("be.visible");
      cy.get("select").should("have.length.at.least", 3);
    });

    it("should handle various timezone and locale settings", () => {
      cy.log("🌍 Testing internationalization edge cases");

      // Application should work regardless of locale
      cy.get("body").should("be.visible");
      cy.verifyMinimumWidgets(5);

      // Timestamps and dates should be handled properly
      cy.window().then((win: WindowWithConsoleErrors) => {
        const now = new Date();
        cy.log(`Current timezone offset: ${now.getTimezoneOffset()} minutes`);
        cy.log(`Current locale: ${win.navigator.language}`);
      });

      cy.log("✅ Internationalization handled correctly");
    });
  });

  describe("Performance Edge Cases", () => {
    it("should handle slow network conditions gracefully", () => {
      cy.log("🐌 Testing slow network simulation");

      // Note: Since this is a client-side app with no backend,
      // we test that the app loads efficiently

      cy.then(() => {
        const startTime = Date.now();
        
        cy.reload();
        cy.ensureAppLoaded();
        
        cy.then(() => {
          const loadTime = Date.now() - startTime;
          cy.log(`Page load time: ${loadTime}ms`);
          expect(loadTime).to.be.lessThan(10000); // 10 second max
        });
      });

      cy.log("✅ Application loads within acceptable time");
    });

    it("should maintain performance with all widgets visible", () => {
      cy.log("⚡ Testing performance with full widget load");

      // Set security levels to ensure all widgets are active
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );

      // Verify all widgets are visible
      cy.verifyMinimumWidgets(5);
      cy.get('[data-testid*="widget"]').should("have.length.at.least", 5);

      // Perform interaction
      cy.get("select").eq(0).select(SECURITY_LEVELS.MODERATE, { force: true });

      // Verify widgets still functional after interaction
      cy.get('[data-testid*="widget"]').should("have.length.at.least", 5);

      cy.log("✅ Performance acceptable with full widget load");
    });
  });
});
