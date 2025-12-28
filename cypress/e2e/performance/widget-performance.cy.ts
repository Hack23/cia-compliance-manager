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

      const startTime = Date.now();

      cy.visit("/");
      cy.ensureAppLoaded();

      cy.then(() => {
        const loadTime = Date.now() - startTime;
        cy.log(\`✓ Page loaded in \${loadTime}ms\`);

        // Target: <3000ms (3 seconds)
        expect(loadTime).to.be.lessThan(3000);
      });
    });

    it("should render all critical widgets quickly", () => {
      cy.log("⏱️ Measuring widget rendering time");

      const startTime = Date.now();

      // Wait for widgets to render
      cy.get('[data-testid*="widget"]').should("have.length.at.least", 5);

      cy.then(() => {
        const renderTime = Date.now() - startTime;
        cy.log(\`✓ Widgets rendered in \${renderTime}ms\`);

        // Target: <1000ms for all widgets
        expect(renderTime).to.be.lessThan(1000);
      });
    });
  });

  describe("Widget Interaction Performance", () => {
    it("should respond quickly to security level changes", () => {
      cy.log("⚡ Testing security level change response time");

      const measurements: number[] = [];

      // Test 5 security level changes and measure each
      for (let i = 0; i < 5; i++) {
        const level =
          i % 3 === 0
            ? SECURITY_LEVELS.LOW
            : i % 3 === 1
            ? SECURITY_LEVELS.MODERATE
            : SECURITY_LEVELS.HIGH;

        const startTime = Date.now();

        cy.get("select").eq(0).select(level, { force: true });
        cy.wait(300);

        cy.then(() => {
          const responseTime = Date.now() - startTime;
          measurements.push(responseTime);
          cy.log(\`Change \${i + 1}: \${responseTime}ms\`);
        });
      }

      cy.then(() => {
        const avgTime =
          measurements.reduce((sum, time) => sum + time, 0) /
          measurements.length;
        cy.log(\`✓ Average response time: \${avgTime.toFixed(0)}ms\`);

        // Target: <500ms per interaction
        expect(avgTime).to.be.lessThan(500);
      });
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
        cy.log(\`✓ All widgets updated in \${updateTime}ms\`);

        // Target: <500ms for propagation to all widgets
        expect(updateTime).to.be.lessThan(500);
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
      it(\`should perform well on \${viewport.name} (\${viewport.width}x\${viewport.height})\`, () => {
        cy.log(\`📱 Testing \${viewport.name} performance\`);

        cy.viewport(viewport.width, viewport.height);

        const startTime = Date.now();

        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500);

        // Verify widgets render on this viewport
        cy.get('[data-testid*="widget"]').should("have.length.at.least", 1);

        cy.then(() => {
          const renderTime = Date.now() - startTime;
          cy.log(\`✓ \${viewport.name} rendered in \${renderTime}ms\`);

          // Performance targets may be slightly higher for mobile
          const maxTime = viewport.width < 768 ? 1500 : 1000;
          expect(renderTime).to.be.lessThan(maxTime);
        });
      });
    });
  });
});
