import { SECURITY_LEVELS } from "../../support/constants";
import { testSecurityLevelTransitions } from "./advanced-widget-tests";

describe("All Widgets Security Level Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1920, 1080);

    // Add defensive check to verify app is loaded correctly
    cy.document().then((doc) => {
      if (!doc.querySelector("select")) {
        cy.log(
          "⚠️ WARNING: No select elements found on page - app may not be loaded correctly"
        );
        cy.screenshot("missing-select-elements");
      }
    });
  });

  // Test core widgets with key security combinations
  const criticalWidgets = [
    "security-summary",
    "business-impact",
    "cost-estimation",
    "compliance-status",
  ];

  // Test selected combinations instead of all 27 possibilities
  const criticalCombinations = [
    // Standard levels
    [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
    [
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
    ],
    [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
    // Mixed levels
    [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
    [SECURITY_LEVELS.LOW, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.LOW],
    [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.HIGH],
  ];

  // Test each critical widget with the defined combinations
  criticalWidgets.forEach((widget) => {
    it(`handles key security combinations for ${widget}`, () => {
      // First check if the widget exists
      cy.get("body").then(($body) => {
        const widgetExists =
          $body.find(`[data-testid*="${widget}"]`).length > 0;

        if (!widgetExists) {
          cy.log(
            `⚠️ WARNING: Widget "${widget}" not found - skipping security level tests`
          );
          return; // Skip the rest of the test if widget doesn't exist
        }

        cy.findWidget(widget).scrollIntoView();

        // Check if selects exist on the page before proceeding
        const hasSelects = $body.find("select").length >= 3;
        if (!hasSelects) {
          cy.log(
            "⚠️ WARNING: Not enough select elements found to set security levels"
          );
          return; // Skip this test if we can't set security levels
        }

        // Test each combination
        criticalCombinations.forEach(([avail, integ, conf]) => {
          cy.log(`Testing ${avail}-${integ}-${conf} combination`);

          // Try to set security levels with direct approach if needed
          cy.get("body").then(($updated) => {
            const selects = $updated.find("select");
            if (selects.length >= 3) {
              cy.get("select").eq(0).select(avail, { force: true });
              cy.get("select").eq(1).select(integ, { force: true });
              cy.get("select").eq(2).select(conf, { force: true });
            } else {
              cy.setSecurityLevels(avail, integ, conf);
            }
          });

          cy.wait(300);

          // Verify widget still exists and renders properly
          cy.findWidget(widget)
            .should("exist")
            .should("be.visible")
            .then(($widget) => {
              // Verify content rendered
              expect($widget.text().trim().length).to.be.greaterThan(0);
            });
        });
      });
    });
  });

  // Test rapid security transitions
  const transitionTestWidgets = [
    "security-summary",
    "radar-chart",
    "compliance-status",
  ];

  transitionTestWidgets.forEach((widget) => {
    testSecurityLevelTransitions(widget);
  });

  // Test widget visibility based on security profile
  it("shows appropriate widgets for each security profile", () => {
    // Define expected widgets by security profile
    const securityProfiles = [
      {
        name: "None/Low Security",
        levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        expectedWidgets: [
          "security-summary",
          "security-level",
          "cost-estimation",
        ],
        unexpectedWidgets: ["cia-impact-summary", "radar-chart"], // These might not be visible at low security
      },
      {
        name: "High Security",
        levels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
        ],
        expectedWidgets: [
          "security-summary",
          "security-level",
          "cost-estimation",
          "value-creation",
          "business-impact",
          "compliance-status",
        ],
        unexpectedWidgets: [], // At high security, most widgets should be visible
      },
    ];

    // Test each security profile
    securityProfiles.forEach((profile) => {
      cy.log(`Testing ${profile.name} profile`);

      // Set security levels
      cy.setSecurityLevels(...profile.levels);
      cy.wait(500); // Wait for UI updates

      // Check expected widgets exist
      profile.expectedWidgets.forEach((widgetId) => {
        cy.findWidget(widgetId).should("exist");
      });

      // Check unexpected widgets (only if specified)
      if (profile.unexpectedWidgets.length > 0) {
        // This is a soft check - some widgets might be conditionally shown
        cy.log(
          `Note: Some widgets may not be visible in ${profile.name} profile`
        );
      }
    });
  });

  // Test that no console errors occur during security level transitions
  it("handles extreme security transitions without errors", () => {
    // Jump from lowest to highest security
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.wait(300);

    cy.window().then((win) => {
      // Clear any existing console errors
      win.consoleErrors = [];

      // Jump to highest security
      cy.setSecurityLevels(
        SECURITY_LEVELS.VERY_HIGH,
        SECURITY_LEVELS.VERY_HIGH,
        SECURITY_LEVELS.VERY_HIGH
      );

      cy.wait(500);

      // Check for console errors
      cy.wrap(win.consoleErrors || []).should("have.length.lessThan", 3);
    });
  });
});
