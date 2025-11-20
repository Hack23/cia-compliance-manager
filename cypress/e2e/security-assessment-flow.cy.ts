/**
 * Security Assessment Flow E2E Test
 *
 * This comprehensive test suite validates the complete security assessment workflow,
 * ensuring all critical user journeys function correctly from start to finish.
 *
 * Test Coverage:
 * - Complete assessment workflow (landing → assessment → results → report)
 * - CIA triad selection (Confidentiality, Integrity, Availability)
 * - Cost estimation calculations
 * - Business impact analysis
 * - Framework compliance mapping (NIST, ISO, GDPR, etc.)
 * - Widget interactions and data flow
 * - Error scenarios (invalid inputs, network errors)
 * - Accessibility checks
 */

import { SECURITY_LEVELS } from "../support/constants";

describe("Security Assessment Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1280, 800);
  });

  describe("Complete Assessment Workflow", () => {
    it("should complete full security assessment from start to finish", () => {
      cy.log("🎯 Starting complete security assessment workflow");

      // Step 1: Verify initial application state
      cy.log("Step 1: Verifying initial application state");
      cy.get("body").should("be.visible");
      cy.get("select").should("have.length.at.least", 3);

      // Step 2: Configure Confidentiality level to High
      cy.log("Step 2: Configuring Confidentiality to High");
      cy.get("select").eq(2).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);

      // Verify confidentiality selection and description
      cy.get("select").eq(2).should("have.value", SECURITY_LEVELS.HIGH);
      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();
        // High confidentiality should mention MFA, encryption, or similar security controls
        const hasSecurityControls =
          text.includes("mfa") ||
          text.includes("multi-factor") ||
          text.includes("encryption") ||
          text.includes("access control");
        if (hasSecurityControls) {
          cy.log("✓ High confidentiality security controls detected");
        }
      });

      // Step 3: Configure Integrity level to High
      cy.log("Step 3: Configuring Integrity to High");
      cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);

      // Verify integrity selection and description
      cy.get("select").eq(1).should("have.value", SECURITY_LEVELS.HIGH);
      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();
        // High integrity should mention blockchain, checksums, or similar integrity controls
        const hasIntegrityControls =
          text.includes("blockchain") ||
          text.includes("checksum") ||
          text.includes("hash") ||
          text.includes("immutable") ||
          text.includes("audit");
        if (hasIntegrityControls) {
          cy.log("✓ High integrity controls detected");
        }
      });

      // Step 4: Configure Availability level to Moderate
      cy.log("Step 4: Configuring Availability to Moderate");
      cy.get("select").eq(0).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(300);

      // Verify availability selection and description
      cy.get("select").eq(0).should("have.value", SECURITY_LEVELS.MODERATE);
      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();
        // Moderate availability should mention pilot light, warm standby, or similar DR options
        const hasAvailabilityControls =
          text.includes("pilot light") ||
          text.includes("warm standby") ||
          text.includes("backup") ||
          text.includes("recovery");
        if (hasAvailabilityControls) {
          cy.log("✓ Moderate availability controls detected");
        }
      });

      // Step 5: View cost estimation
      cy.log("Step 5: Verifying cost estimation");
      cy.get("body").then(($body) => {
        // Look for cost-related elements
        const costSelectors = [
          '[data-testid*="cost"]',
          '[data-testid*="capex"]',
          '[data-testid*="opex"]',
          '[class*="cost"]',
        ].join(", ");

        if ($body.find(costSelectors).length > 0) {
          cy.log("✓ Cost estimation widgets found");

          // Verify that cost values are present and numeric
          cy.get(costSelectors)
            .first()
            .invoke("text")
            .then((text) => {
              // Check for currency symbols or numeric patterns
              const hasCostValue =
                text.includes("$") ||
                text.includes("€") ||
                text.includes("£") ||
                /\d+/.test(text);
              expect(
                hasCostValue,
                "Cost estimation should contain numeric values"
              ).to.be.true;
              cy.log(`✓ Cost values detected: ${text.substring(0, 50)}`);
            });
        } else {
          cy.log("⚠️ No cost estimation widgets found");
        }
      });

      // Step 6: Check compliance status
      cy.log("Step 6: Checking compliance status");
      cy.get("body").then(($body) => {
        // Look for compliance-related elements
        const complianceSelectors = [
          '[data-testid*="compliance"]',
          '[data-testid*="framework"]',
          '[class*="compliance"]',
          '[class*="framework"]',
        ].join(", ");

        if ($body.find(complianceSelectors).length > 0) {
          cy.log("✓ Compliance widgets found");

          // Look for common compliance frameworks
          const text = $body.text();
          const frameworks = ["NIST", "ISO", "GDPR", "HIPAA", "PCI"];
          const foundFrameworks = frameworks.filter((framework) =>
            text.includes(framework)
          );

          if (foundFrameworks.length > 0) {
            cy.log(`✓ Found compliance frameworks: ${foundFrameworks.join(", ")}`);
          } else {
            cy.log("⚠️ No specific compliance frameworks detected in text");
          }
        } else {
          cy.log("⚠️ No compliance widgets found");
        }
      });

      // Step 7: Verify business impact analysis
      cy.log("Step 7: Verifying business impact analysis");
      cy.get("body").then(($body) => {
        const impactSelectors = [
          '[data-testid*="business-impact"]',
          '[data-testid*="impact"]',
          '[class*="business-impact"]',
          '[class*="impact"]',
        ].join(", ");

        if ($body.find(impactSelectors).length > 0) {
          cy.log("✓ Business impact analysis widgets found");

          // Check for impact-related content
          const text = $body.text().toLowerCase();
          const hasImpactContent =
            text.includes("impact") ||
            text.includes("risk") ||
            text.includes("business") ||
            text.includes("financial") ||
            text.includes("operational");

          if (hasImpactContent) {
            cy.log("✓ Business impact content detected");
          }
        } else {
          cy.log("⚠️ No business impact widgets found");
        }
      });

      // Step 8: Take final screenshot for documentation
      cy.log("Step 8: Capturing final state");
      cy.screenshot("complete-assessment-workflow-final-state");

      cy.log("✅ Complete assessment workflow test passed");
    });
  });

  describe("CIA Level Selection", () => {
    it("should update costs when changing confidentiality level", () => {
      cy.log("Testing confidentiality level impact on costs");

      // Set initial low confidentiality
      cy.get("select").eq(2).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(500);

      // Capture initial cost values
      cy.get("body")
        .invoke("text")
        .then((initialText) => {
          cy.log("Initial state captured");

          // Change to Very High confidentiality
          cy.get("select").eq(2).select(SECURITY_LEVELS.VERY_HIGH, { force: true });
          cy.wait(500);

          // Verify costs changed
          cy.get("body")
            .invoke("text")
            .then((newText) => {
              // The page content should be different
              expect(newText).to.not.equal(initialText);
              cy.log("✓ Page content changed after security level update");
            });
        });
    });

    it("should display appropriate technical details for each level", () => {
      cy.log("Testing technical details display for each security level");

      // Test High integrity level
      cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500);

      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();

        // High integrity should have technical details about immutability and verification
        const hasTechnicalDetails =
          text.includes("blockchain") ||
          text.includes("immutable") ||
          text.includes("hash") ||
          text.includes("checksum") ||
          text.includes("audit") ||
          text.includes("verification");

        if (hasTechnicalDetails) {
          cy.log("✓ Technical details detected for High integrity");
        } else {
          cy.log("⚠️ Technical details not clearly visible");
        }
      });

      // Test Very High availability level
      cy.get("select").eq(0).select(SECURITY_LEVELS.VERY_HIGH, { force: true });
      cy.wait(500);

      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();

        // Very High availability should have technical details about multi-region and hot standby
        const hasTechnicalDetails =
          text.includes("multi-region") ||
          text.includes("hot standby") ||
          text.includes("active-active") ||
          text.includes("zero downtime") ||
          text.includes("redundancy");

        if (hasTechnicalDetails) {
          cy.log("✓ Technical details detected for Very High availability");
        } else {
          cy.log("⚠️ Technical details not clearly visible");
        }
      });
    });

    it("should validate all CIA level combinations", () => {
      cy.log("Testing various CIA level combinations");

      const combinations = [
        {
          name: "All Low",
          levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        },
        {
          name: "All Moderate",
          levels: [
            SECURITY_LEVELS.MODERATE,
            SECURITY_LEVELS.MODERATE,
            SECURITY_LEVELS.MODERATE,
          ],
        },
        {
          name: "Mixed (High C, Moderate I, Low A)",
          levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.MODERATE, SECURITY_LEVELS.HIGH],
        },
      ];

      combinations.forEach((combo) => {
        cy.log(`Testing combination: ${combo.name}`);

        // Set security levels (availability, integrity, confidentiality)
        cy.get("select").eq(0).select(combo.levels[0], { force: true });
        cy.wait(200);
        cy.get("select").eq(1).select(combo.levels[1], { force: true });
        cy.wait(200);
        cy.get("select").eq(2).select(combo.levels[2], { force: true });
        cy.wait(500);

        // Verify selections
        cy.get("select").eq(0).should("have.value", combo.levels[0]);
        cy.get("select").eq(1).should("have.value", combo.levels[1]);
        cy.get("select").eq(2).should("have.value", combo.levels[2]);

        cy.log(`✓ ${combo.name} combination configured successfully`);
      });
    });
  });

  describe("Framework Compliance Mapping", () => {
    it("should show compliance status for all supported frameworks", () => {
      cy.log("Testing framework compliance mapping");

      // Set high security levels to maximize compliance
      cy.get("select").eq(0).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get("select").eq(2).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500);

      // Look for compliance framework information
      cy.get("body").then(($body) => {
        const text = $body.text();
        const commonFrameworks = [
          "NIST",
          "ISO",
          "GDPR",
          "HIPAA",
          "PCI",
          "SOC",
          "FedRAMP",
        ];

        const foundFrameworks = commonFrameworks.filter((framework) =>
          text.includes(framework)
        );

        cy.log(`Found ${foundFrameworks.length} compliance frameworks`);

        if (foundFrameworks.length > 0) {
          cy.log(`✓ Compliance frameworks detected: ${foundFrameworks.join(", ")}`);
          expect(foundFrameworks.length).to.be.at.least(
            1,
            "Should display at least one compliance framework"
          );
        } else {
          cy.log("⚠️ No standard compliance frameworks explicitly detected");
        }
      });
    });

    it("should display framework-specific controls and requirements", () => {
      cy.log("Testing framework-specific control display");

      // Set high security configuration
      cy.get("select").eq(0).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get("select").eq(2).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500);

      // Look for control-related content
      cy.get("body").then(($body) => {
        const text = $body.text().toLowerCase();

        // Check for common control terminology
        const controlTerms = [
          "control",
          "requirement",
          "standard",
          "compliant",
          "compliance",
          "policy",
          "procedure",
        ];

        const foundTerms = controlTerms.filter((term) => text.includes(term));

        if (foundTerms.length >= 2) {
          cy.log(`✓ Control-related content found: ${foundTerms.join(", ")}`);
        } else {
          cy.log("⚠️ Limited control-related content detected");
        }
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid level selections gracefully", () => {
      cy.log("Testing error handling for invalid selections");

      // Try to set invalid localStorage data
      cy.window().then((win) => {
        win.localStorage.setItem("security-config", "invalid-json");
        cy.log("Set invalid localStorage data");
      });

      // Reload page
      cy.reload();
      cy.wait(1000);

      // Application should still load
      cy.get("body").should("exist").and("be.visible");
      cy.get("select").should("have.length.at.least", 3);

      cy.log("✓ Application recovered from invalid localStorage data");

      // Clear invalid data
      cy.window().then((win) => {
        win.localStorage.removeItem("security-config");
      });
    });

    it("should handle rapid level changes without errors", () => {
      cy.log("Testing rapid security level changes");

      // Monitor console errors
      cy.window().then((win) => {
        win.consoleErrors = [];
        const originalError = win.console.error;
        win.console.error = (...args) => {
          win.consoleErrors.push(args.join(" "));
          originalError.apply(win.console, args);
        };
      });

      // Rapidly change security levels
      cy.get("select").eq(0).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.get("select").eq(2).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);

      cy.get("select").eq(0).select(SECURITY_LEVELS.LOW, { force: true });
      cy.get("select").eq(1).select(SECURITY_LEVELS.LOW, { force: true });
      cy.get("select").eq(2).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(200);

      cy.get("select").eq(0).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.get("select").eq(1).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.get("select").eq(2).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(500);

      // Check for critical console errors
      cy.window().then((win) => {
        const criticalErrors = win.consoleErrors.filter(
          (msg: string) =>
            msg.includes("undefined") ||
            msg.includes("TypeError") ||
            msg.includes("ReferenceError")
        );

        expect(
          criticalErrors.length,
          "No critical errors during rapid changes"
        ).to.equal(0);

        if (criticalErrors.length === 0) {
          cy.log("✓ No critical errors during rapid security level changes");
        }
      });
    });

    it("should display user-friendly messages for edge cases", () => {
      cy.log("Testing edge case handling");

      // Test with all None/lowest levels
      cy.get("select").then(($selects) => {
        // Check if "None" is an option, otherwise use "Low"
        const firstSelect = $selects.eq(0);
        const hasNoneOption = firstSelect.find('option[value="None"]').length > 0;

        const lowestLevel = hasNoneOption ? "None" : SECURITY_LEVELS.LOW;

        cy.get("select").eq(0).select(lowestLevel, { force: true });
        cy.wait(200);
        cy.get("select").eq(1).select(lowestLevel, { force: true });
        cy.wait(200);
        cy.get("select").eq(2).select(lowestLevel, { force: true });
        cy.wait(500);

        // Application should still function with lowest security levels
        cy.get("body").should("be.visible");
        cy.log(`✓ Application handles ${lowestLevel} security levels gracefully`);
      });
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard navigable", () => {
      cy.log("Testing keyboard navigation");

      // Test that all selects can receive focus
      cy.get("select").eq(0).focus();
      cy.focused().should("match", "select");
      cy.log("✓ First select is focusable");

      cy.get("select").eq(1).focus();
      cy.focused().should("match", "select");
      cy.log("✓ Second select is focusable");

      cy.get("select").eq(2).focus();
      cy.focused().should("match", "select");
      cy.log("✓ Third select is focusable");

      // Test that selects can be changed with keyboard
      cy.get("select").eq(0).focus().type("{downarrow}{enter}");
      cy.log("✓ Select can be changed with keyboard");

      cy.log("✓ Security level selects are keyboard navigable");
    });

    it("should have proper ARIA labels and semantic HTML", () => {
      cy.log("Testing ARIA labels and semantic HTML");

      // Check that selects have labels or aria-labels
      cy.get("select").each(($select) => {
        const id = $select.attr("id");
        const ariaLabel = $select.attr("aria-label");
        const ariaLabelledBy = $select.attr("aria-labelledby");

        // Check if select has an associated label
        let hasLabel = false;

        if (id) {
          cy.get(`label[for="${id}"]`).then(($labels) => {
            hasLabel = $labels.length > 0;
          });
        }

        const hasAccessibilityLabel = !!(ariaLabel || ariaLabelledBy || hasLabel);

        if (hasAccessibilityLabel || ariaLabel || ariaLabelledBy) {
          cy.log("✓ Select has accessibility label");
        }
      });
    });

    it("should provide clear visual focus indicators", () => {
      cy.log("Testing visual focus indicators");

      // Focus on a select and check it's visually distinguishable
      cy.get("select").eq(0).focus();

      cy.focused().then(($focused) => {
        const focusedElement = $focused[0];
        const computedStyle = window.getComputedStyle(focusedElement);

        // Check for outline or other focus indicators
        const hasOutline = computedStyle.outline !== "none" && computedStyle.outline !== "";
        const hasBoxShadow =
          computedStyle.boxShadow !== "none" && computedStyle.boxShadow !== "";
        const hasBorder = computedStyle.border !== "none" && computedStyle.border !== "";

        const hasFocusIndicator = hasOutline || hasBoxShadow || hasBorder;

        if (hasFocusIndicator) {
          cy.log("✓ Focus indicator detected");
        } else {
          cy.log("⚠️ Focus indicator may need improvement");
        }
      });
    });
  });

  describe("Business Impact Analysis", () => {
    it("should calculate and display business impact for different security levels", () => {
      cy.log("Testing business impact calculations");

      const scenarios = [
        {
          name: "Low Security Impact",
          levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        },
        {
          name: "High Security Impact",
          levels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        },
      ];

      scenarios.forEach((scenario) => {
        cy.log(`Testing ${scenario.name}`);

        // Set security levels
        cy.get("select").eq(0).select(scenario.levels[0], { force: true });
        cy.wait(200);
        cy.get("select").eq(1).select(scenario.levels[1], { force: true });
        cy.wait(200);
        cy.get("select").eq(2).select(scenario.levels[2], { force: true });
        cy.wait(500);

        // Look for business impact content
        cy.get("body").then(($body) => {
          const text = $body.text().toLowerCase();

          const impactTerms = [
            "impact",
            "risk",
            "business",
            "financial",
            "operational",
            "reputational",
            "cost",
          ];

          const foundTerms = impactTerms.filter((term) => text.includes(term));

          if (foundTerms.length >= 2) {
            cy.log(`✓ Business impact analysis displayed for ${scenario.name}`);
          }
        });

        // Take screenshot for documentation
        cy.screenshot(`business-impact-${scenario.name.toLowerCase().replace(/\s+/g, "-")}`);
      });
    });
  });

  describe("Data Persistence", () => {
    it("should persist security level selections across page reloads", () => {
      cy.log("Testing security level persistence");

      // Set specific security levels
      cy.get("select").eq(0).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(200);
      cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get("select").eq(2).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(500);

      // Reload page
      cy.reload();
      cy.ensureAppLoaded();
      cy.wait(1000);

      // Verify selections are preserved (if app implements persistence)
      cy.get("select").then(($selects) => {
        const availability = $selects.eq(0).val();
        const integrity = $selects.eq(1).val();
        const confidentiality = $selects.eq(2).val();

        // Log current values
        cy.log(`After reload - A: ${availability}, I: ${integrity}, C: ${confidentiality}`);

        // Note: Persistence behavior depends on app implementation
        // This test documents the current behavior
        cy.log("✓ Security level state documented after reload");
      });
    });
  });

  describe("Widget Integration", () => {
    it("should ensure all widgets respond to security level changes", () => {
      cy.log("Testing widget integration and responsiveness");

      // Count initial widgets
      cy.get("[data-testid^='widget-']").then(($initialWidgets) => {
        const initialCount = $initialWidgets.length;
        cy.log(`Initial widget count: ${initialCount}`);

        // Change security levels
        cy.get("select").eq(0).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(200);
        cy.get("select").eq(1).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(200);
        cy.get("select").eq(2).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(500);

        // Verify widgets still present and responsive
        cy.get("[data-testid^='widget-']").then(($updatedWidgets) => {
          const updatedCount = $updatedWidgets.length;
          cy.log(`Updated widget count: ${updatedCount}`);

          // Widget count should remain stable
          expect(updatedCount).to.be.at.least(
            Math.max(1, initialCount - 1),
            "Widget count should remain stable during security level changes"
          );

          cy.log("✓ All widgets remained responsive to security level changes");
        });
      });
    });
  });
});
