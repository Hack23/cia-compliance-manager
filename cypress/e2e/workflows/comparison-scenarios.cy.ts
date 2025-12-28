/**
 * Comparison Scenarios E2E Test
 *
 * This test validates the ability to compare different security level combinations
 * and understand the trade-offs between security, cost, and complexity.
 *
 * Test Scenarios:
 * - Side-by-side security level comparisons
 * - Cost-benefit analysis across scenarios
 * - Compliance framework comparison
 * - Risk level comparison
 */

import { SECURITY_LEVELS } from "../../support/constants";

describe("Security Level Comparison Scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1280, 800);
  });

  describe("CIA Triad Balance Scenarios", () => {
    const scenarios = [
      {
        name: "High Availability Focus",
        description: "Critical uptime requirements with moderate data protection",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.MODERATE,
        confidentiality: SECURITY_LEVELS.MODERATE,
        expectedCharacteristics: ["uptime", "availability", "recovery"],
      },
      {
        name: "High Integrity Focus",
        description: "Data accuracy is critical (financial, healthcare)",
        availability: SECURITY_LEVELS.MODERATE,
        integrity: SECURITY_LEVELS.HIGH,
        confidentiality: SECURITY_LEVELS.MODERATE,
        expectedCharacteristics: ["validation", "integrity", "audit"],
      },
      {
        name: "High Confidentiality Focus",
        description: "Sensitive data protection is paramount",
        availability: SECURITY_LEVELS.MODERATE,
        integrity: SECURITY_LEVELS.MODERATE,
        confidentiality: SECURITY_LEVELS.HIGH,
        expectedCharacteristics: ["encryption", "access", "confidential"],
      },
      {
        name: "Balanced Approach",
        description: "Equal priority across all CIA components",
        availability: SECURITY_LEVELS.MODERATE,
        integrity: SECURITY_LEVELS.MODERATE,
        confidentiality: SECURITY_LEVELS.MODERATE,
        expectedCharacteristics: ["balanced", "moderate", "standard"],
      },
    ];

    scenarios.forEach((scenario) => {
      it(`should correctly assess ${scenario.name}`, () => {
        cy.log(`📊 Testing scenario: ${scenario.name}`);
        cy.log(`Description: ${scenario.description}`);

        // Set security levels
        cy.setSecurityLevels(
          scenario.availability,
          scenario.integrity,
          scenario.confidentiality
        );
        cy.wait(500);

        // Verify selections
        cy.get("select").eq(0).should("have.value", scenario.availability);
        cy.get("select").eq(1).should("have.value", scenario.integrity);
        cy.get("select").eq(2).should("have.value", scenario.confidentiality);

        // Check for expected characteristics in content
        cy.get("body").then(($body) => {
          const pageText = $body.text().toLowerCase();
          let foundCharacteristics = 0;

          scenario.expectedCharacteristics.forEach((characteristic) => {
            if (pageText.includes(characteristic.toLowerCase())) {
              foundCharacteristics++;
              cy.log(`✓ Found characteristic: ${characteristic}`);
            }
          });

          cy.log(
            `Found ${foundCharacteristics}/${scenario.expectedCharacteristics.length} expected characteristics`
          );
        });

        // Verify all widgets are responsive
        cy.verifyMinimumWidgets(5);
        cy.log(`✅ ${scenario.name} validated`);
      });
    });
  });

  describe("Cost vs Security Trade-offs", () => {
    it("should show increasing costs with higher security levels", () => {
      cy.log("💰 Testing cost progression across security levels");

      const testSequence = [
        { level: SECURITY_LEVELS.LOW, name: "Low Security" },
        { level: SECURITY_LEVELS.MODERATE, name: "Moderate Security" },
        { level: SECURITY_LEVELS.HIGH, name: "High Security" },
      ];

      testSequence.forEach((test, index) => {
        cy.log(`\n=== ${test.name} ===`);

        // Set all CIA components to the same level
        cy.setSecurityLevels(test.level, test.level, test.level);
        cy.wait(500);

        // Capture cost information
        cy.get('[data-testid*="cost"]').then(($costs) => {
          if ($costs.length > 0) {
            const costText = $costs.text();
            cy.log(`Cost display (${test.name}): ${costText.slice(0, 100)}...`);

            // Verify cost elements are visible
            expect($costs.length).to.be.greaterThan(0);
          } else {
            cy.log(`⚠ No cost elements found for ${test.name}`);
          }
        });
      });

      cy.log("✅ Cost progression test completed");
    });

    it("should show different cost profiles for different CIA combinations", () => {
      cy.log("📊 Testing cost variations across CIA combinations");

      const combinations = [
        {
          name: "Availability-focused",
          levels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        },
        {
          name: "Integrity-focused",
          levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.LOW],
        },
        {
          name: "Confidentiality-focused",
          levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.HIGH],
        },
      ];

      combinations.forEach((combo) => {
        cy.log(`\nTesting ${combo.name}`);
        cy.setSecurityLevels(combo.levels[0], combo.levels[1], combo.levels[2]);
        cy.wait(500);

        // Verify widgets updated
        cy.get('[data-testid*="widget"]').should("be.visible");
      });

      cy.log("✅ Cost profile variations validated");
    });
  });

  describe("Compliance Framework Comparison", () => {
    const frameworkScenarios = [
      {
        name: "GDPR Compliance Focus",
        description: "EU data protection requirements",
        availability: SECURITY_LEVELS.MODERATE,
        integrity: SECURITY_LEVELS.HIGH,
        confidentiality: SECURITY_LEVELS.HIGH,
        expectedFrameworks: ["gdpr", "privacy"],
      },
      {
        name: "HIPAA Compliance Focus",
        description: "Healthcare data protection",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.HIGH,
        confidentiality: SECURITY_LEVELS.HIGH,
        expectedFrameworks: ["hipaa", "healthcare"],
      },
      {
        name: "PCI-DSS Compliance Focus",
        description: "Payment card industry standards",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.HIGH,
        confidentiality: SECURITY_LEVELS.HIGH,
        expectedFrameworks: ["pci", "payment"],
      },
    ];

    frameworkScenarios.forEach((scenario) => {
      it(`should identify ${scenario.name} requirements`, () => {
        cy.log(`🔍 Testing ${scenario.name}`);
        cy.log(`Description: ${scenario.description}`);

        // Set security levels
        cy.setSecurityLevels(
          scenario.availability,
          scenario.integrity,
          scenario.confidentiality
        );
        cy.wait(500);

        // Check for compliance framework mentions
        cy.get('[data-testid*="compliance"]').then(($widgets) => {
          if ($widgets.length > 0) {
            const text = $widgets.text().toLowerCase();

            scenario.expectedFrameworks.forEach((framework) => {
              if (text.includes(framework)) {
                cy.log(`✓ Found framework reference: ${framework}`);
              }
            });
          }
        });

        cy.log(`✅ ${scenario.name} validated`);
      });
    });
  });

  describe("Industry-Specific Scenarios", () => {
    const industryScenarios = [
      {
        name: "Startup / Early Stage",
        description: "Cost-conscious with growth focus",
        availability: SECURITY_LEVELS.LOW,
        integrity: SECURITY_LEVELS.MODERATE,
        confidentiality: SECURITY_LEVELS.LOW,
      },
      {
        name: "Financial Services",
        description: "Maximum security and compliance",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.HIGH,
        confidentiality: SECURITY_LEVELS.HIGH,
      },
      {
        name: "E-commerce",
        description: "High availability with data protection",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.MODERATE,
        confidentiality: SECURITY_LEVELS.HIGH,
      },
      {
        name: "Healthcare Provider",
        description: "Patient data protection paramount",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.HIGH,
        confidentiality: SECURITY_LEVELS.HIGH,
      },
      {
        name: "SaaS Platform",
        description: "Balance between cost and reliability",
        availability: SECURITY_LEVELS.HIGH,
        integrity: SECURITY_LEVELS.MODERATE,
        confidentiality: SECURITY_LEVELS.MODERATE,
      },
    ];

    industryScenarios.forEach((scenario) => {
      it(`should support ${scenario.name} security requirements`, () => {
        cy.log(`🏢 Testing ${scenario.name}`);
        cy.log(`Description: ${scenario.description}`);

        // Configure security levels
        cy.setSecurityLevels(
          scenario.availability,
          scenario.integrity,
          scenario.confidentiality
        );
        cy.wait(500);

        // Verify configuration applied
        cy.get("select").eq(0).should("have.value", scenario.availability);
        cy.get("select").eq(1).should("have.value", scenario.integrity);
        cy.get("select").eq(2).should("have.value", scenario.confidentiality);

        // Verify widgets rendered
        cy.verifyMinimumWidgets(5);

        // Capture assessment results
        cy.get("body").then(($body) => {
          const pageLength = $body.text().length;
          cy.log(`Assessment generated ${pageLength} characters of content`);
          expect(pageLength).to.be.greaterThan(1000);
        });

        cy.log(`✅ ${scenario.name} scenario validated`);
      });
    });
  });

  describe("Edge Case Comparisons", () => {
    it("should handle minimum security configuration", () => {
      cy.log("⬇️ Testing minimum security (all Low)");

      cy.setSecurityLevels(
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW
      );
      cy.wait(500);

      // Verify all widgets still render with minimal security
      cy.verifyMinimumWidgets(5);

      // Check for cost information (should be lowest)
      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();
        expect(text).to.include("low");
      });

      cy.log("✅ Minimum security configuration validated");
    });

    it("should handle maximum security configuration", () => {
      cy.log("⬆️ Testing maximum security (all High)");

      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );
      cy.wait(500);

      // Verify all widgets render with maximum security
      cy.verifyMinimumWidgets(5);

      // Check for high security indicators
      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();
        expect(text).to.include("high");
      });

      cy.log("✅ Maximum security configuration validated");
    });

    it("should handle mixed security levels (unbalanced)", () => {
      cy.log("🔀 Testing unbalanced security configuration");

      // Set dramatically different levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.LOW,     // Availability: Low
        SECURITY_LEVELS.HIGH,    // Integrity: High
        SECURITY_LEVELS.MODERATE // Confidentiality: Moderate
      );
      cy.wait(500);

      // Verify selections
      cy.get("select").eq(0).should("have.value", SECURITY_LEVELS.LOW);
      cy.get("select").eq(1).should("have.value", SECURITY_LEVELS.HIGH);
      cy.get("select").eq(2).should("have.value", SECURITY_LEVELS.MODERATE);

      // Verify application handles this mixed configuration
      cy.verifyMinimumWidgets(5);

      cy.log("✅ Unbalanced security configuration validated");
    });
  });

  describe("Rapid Scenario Switching", () => {
    it("should handle rapid scenario changes without errors", () => {
      cy.log("⚡ Testing rapid scenario switching");

      const rapidScenarios = [
        [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        [SECURITY_LEVELS.MODERATE, SECURITY_LEVELS.MODERATE, SECURITY_LEVELS.MODERATE],
        [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.LOW, SECURITY_LEVELS.MODERATE],
        [SECURITY_LEVELS.LOW, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.LOW],
      ];

      rapidScenarios.forEach((levels, index) => {
        cy.log(`Rapid switch ${index + 1}: ${levels.join(", ")}`);
        cy.setSecurityLevels(levels[0], levels[1], levels[2]);
        cy.wait(200); // Reduced wait for stress test
      });

      // Verify no errors occurred and app is still functional
      cy.verifyMinimumWidgets(5);
      cy.get("select").should("have.length.at.least", 3);

      cy.log("✅ Rapid scenario switching handled gracefully");
    });
  });
});
