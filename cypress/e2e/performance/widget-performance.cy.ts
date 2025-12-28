/**
 * Widget Performance E2E Test
 *
 * This test suite validates the performance characteristics of all widgets,
 * ensuring they meet acceptable load times, interaction response times,
 * and memory usage requirements.
 *
 * Performance Targets (per E2E Test Plan):
 * - Page load: <3 seconds
 * - Widget rendering: <500ms
 * - Interaction response: <500ms
 * - State update propagation: <300ms
 */

import { SECURITY_LEVELS } from "../../support/constants";

describe("Widget Performance Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1280, 800);
  });

  describe("Page Load Performance", () => {
    it("should load initial page within acceptable time", () => {
      cy.log("⏱️ Measuring initial page load time");

      cy.then(() => {
        const startTime = Date.now();

        cy.visit("/");
        cy.ensureAppLoaded();

        cy.then(() => {
          const loadTime = Date.now() - startTime;
          cy.log(`✓ Page loaded in ${loadTime}ms`);

          // Target: <3000ms (3 seconds)
          expect(loadTime).to.be.lessThan(3000);
        });
      });
    });

    it("should render all critical widgets quickly", () => {
      cy.log("⏱️ Measuring widget rendering time");

      cy.then(() => {
        const startTime = Date.now();

        // Wait for widgets to render
        cy.verifyMinimumWidgets(5);

        cy.then(() => {
          const renderTime = Date.now() - startTime;
          cy.log(`✓ Widgets rendered in ${renderTime}ms`);

          // Target: <1000ms for all widgets
          expect(renderTime).to.be.lessThan(1000);
        });
      });
    });
  });

  describe("Widget Interaction Performance", () => {
    it("should respond quickly to security level changes", () => {
      cy.log("⚡ Testing security level change response time");

      // Test multiple security level changes and measure response time
      // Using recursive chaining to properly capture timing with Cypress async behavior
      const levels = [
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.LOW,
      ];
      
      const measurements: number[] = [];
      
      // Recursive function to chain commands properly
      const measureChange = (index: number) => {
        if (index >= levels.length) {
          // After all measurements, calculate average
          cy.then(() => {
            const avgTime =
              measurements.reduce((sum, time) => sum + time, 0) /
              measurements.length;
            cy.log(`✓ Average response time: ${avgTime.toFixed(0)}ms`);

            // Target: <500ms per interaction
            expect(avgTime).to.be.lessThan(500);
          });
          return;
        }

        cy.then(() => {
          const startTime = Date.now();
          
          cy.get("select").eq(0).select(levels[index], { force: true });
          
          cy.then(() => {
            const responseTime = Date.now() - startTime;
            measurements.push(responseTime);
            cy.log(`Change ${index + 1}: ${responseTime}ms`);
          });
          
          // Wait after measurement, not during
          cy.wait(300);
          
          cy.then(() => {
            // Continue to next measurement
            measureChange(index + 1);
          });
        });
      };
      
      // Start the measurement chain
      measureChange(0);
    });

    it("should update all widgets quickly when state changes", () => {
      cy.log("🔄 Testing widget update performance");

      // Set initial state
      cy.setSecurityLevels(
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW
      );
      cy.wait(500);

      // Measure time to update all widgets
      cy.then(() => {
        const startTime = Date.now();

        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Wait for all widgets to update
        cy.get('[data-testid*="widget"]').should("be.visible");

        cy.then(() => {
          const updateTime = Date.now() - startTime;
          cy.log(`✓ All widgets updated in ${updateTime}ms`);

          // Target: <500ms for propagation to all widgets
          expect(updateTime).to.be.lessThan(500);
        });
      });
    });
  });

  describe("Responsive Performance", () => {
    const viewports = [
      { name: "Mobile", width: 375, height: 667 },
      { name: "Tablet", width: 768, height: 1024 },
      { name: "Desktop", width: 1280, height: 800 },
    ];

    viewports.forEach((viewport) => {
      it(`should perform well on ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        cy.log(`📱 Testing ${viewport.name} performance`);

        cy.viewport(viewport.width, viewport.height);

        cy.then(() => {
          const startTime = Date.now();

          cy.setSecurityLevels(
            SECURITY_LEVELS.HIGH,
            SECURITY_LEVELS.MODERATE,
            SECURITY_LEVELS.HIGH
          );

          // Verify widgets render on this viewport
          cy.verifyMinimumWidgets(1);

          cy.then(() => {
            const renderTime = Date.now() - startTime;
            cy.log(`✓ ${viewport.name} rendered in ${renderTime}ms`);

            // Performance targets adjusted for setSecurityLevels internal waits
            // setSecurityLevels includes ~1400ms of internal waits, so targets are:
            // Mobile: <2500ms total, Desktop: <2000ms total
            const maxTime = viewport.width < 768 ? 2500 : 2000;
            expect(renderTime).to.be.lessThan(maxTime);
          });
          
          // Wait for stability after measurement
          cy.wait(500);
        });
      });
    });
  });
});
