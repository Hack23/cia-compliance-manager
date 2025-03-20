/**
 * Widget Screenshot Test
 *
 * This test visits the application and captures screenshots of each widget
 * to provide better visual test data for the CIA Compliance Manager.
 */
import { SECURITY_LEVELS } from "../../support/constants";

describe("Widget Screenshots Generator", () => {
  // Set a larger viewport to see widgets clearly
  const viewportWidth = 1920;
  const viewportHeight = 1080;

  // Different security configurations to test
  const securityConfigs = [
    {
      name: "all-none",
      levels: [
        SECURITY_LEVELS.NONE,
        SECURITY_LEVELS.NONE,
        SECURITY_LEVELS.NONE,
      ],
    },
    {
      name: "all-low",
      levels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
    },
    {
      name: "all-moderate",
      levels: [
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE,
      ],
    },
    {
      name: "all-high",
      levels: [
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
      ],
    },
    {
      name: "all-very-high",
      levels: [
        SECURITY_LEVELS.VERY_HIGH,
        SECURITY_LEVELS.VERY_HIGH,
        SECURITY_LEVELS.VERY_HIGH,
      ],
    },
    {
      name: "mixed-levels",
      levels: [
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.LOW,
      ],
    },
  ];

  // Run test for each security configuration
  securityConfigs.forEach((config) => {
    it(`captures widget screenshots with ${config.name} security levels`, () => {
      cy.visit("/");
      cy.ensureAppLoaded();
      cy.viewport(viewportWidth, viewportHeight);

      // Set security levels for this test run
      cy.setSecurityLevels(...config.levels);
      cy.wait(1000); // Wait for UI to update

      // Find all widgets on the page
      cy.get('[data-testid^="widget-"]').then(($widgets) => {
        cy.log(`Found ${$widgets.length} widgets to screenshot`);

        // Add styling to make screenshots clearer
        cy.document().then((doc) => {
          const style = doc.createElement("style");
          style.innerHTML = `
            [data-testid^="widget-"] {
              outline: 2px solid #2196f3 !important;
              margin: 10px !important;
              background-color: white !important;
            }
            .dark [data-testid^="widget-"] {
              background-color: #001c25 !important;
            }
            * {
              transition: none !important;
              animation: none !important;
            }
          `;
          doc.head.appendChild(style);
        });

        // Process each widget
        $widgets.each((i, widget) => {
          const $widget = Cypress.$(widget);
          const testId =
            $widget.attr("data-testid") || `unknown-widget-${i + 1}`;
          const widgetName = testId
            .replace("widget-", "")
            .replace("-container", "");

          // Log which widget we're processing
          cy.log(
            `Taking screenshot of widget: ${widgetName} (${i + 1}/${
              $widgets.length
            })`
          );

          // Scroll to widget with offset to center it
          cy.wrap($widget).scrollIntoView({ offset: { top: -100, left: 0 } });

          // Make widget visible with CSS if needed
          cy.wrap($widget).then(($el) => {
            cy.wrap($el)
              .invoke("css", "visibility", "visible")
              .invoke("css", "opacity", "1")
              .invoke("css", "position", "relative")
              .invoke("css", "display", "block")
              .invoke("css", "overflow", "visible");

            // Adjust height if needed for visibility
            cy.wrap($el)
              .invoke("css", "height", "auto")
              .invoke("css", "min-height", "300px");

            // Force parents to be visible too
            let $parent = $el.parent();
            for (let i = 0; i < 5; i++) {
              // Only go up 5 levels to avoid changing too much
              if ($parent.length) {
                cy.wrap($parent)
                  .invoke("css", "visibility", "visible")
                  .invoke("css", "opacity", "1")
                  .invoke("css", "position", "relative")
                  .invoke("css", "overflow", "visible");
                $parent = $parent.parent();
              }
            }
          });

          // Wait for any possible animations or transitions
          cy.wait(500);

          // Take the screenshot
          cy.wrap($widget).screenshot(`widget-${config.name}-${widgetName}`, {
            capture: "viewport",
            padding: 20,
          });
        });

        // Take a full page screenshot at the end
        cy.screenshot(`full-page-${config.name}`);
      });
    });
  });

  // Take detailed screenshots of each widget with dark mode
  it("captures detailed dark mode widget screenshots", () => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(viewportWidth, viewportHeight);

    // Ensure dark mode is active
    cy.get("body").then(($body) => {
      if (!$body.hasClass("dark")) {
        cy.get('[data-testid="theme-toggle"]').click();
        cy.wait(500);
      }
    });

    // Set high security levels for maximum details
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(1000); // Wait for UI to update

    // Find all widgets
    cy.get('[data-testid^="widget-"]').then(($widgets) => {
      cy.log(`Found ${$widgets.length} widgets to screenshot in dark mode`);

      // Process each widget with more zoomed-in details
      $widgets.each((i, widget) => {
        const $widget = Cypress.$(widget);
        const testId = $widget.attr("data-testid") || `unknown-widget-${i + 1}`;
        const widgetName = testId
          .replace("widget-", "")
          .replace("-container", "");

        // Log which widget we're processing
        cy.log(`Taking detailed screenshot of ${widgetName}`);

        // Scroll to widget and center it
        cy.wrap($widget).scrollIntoView({ offset: { top: -50, left: 0 } });

        // Wait for rendering
        cy.wait(300);

        // Take regular screenshot
        cy.wrap($widget).screenshot(`widget-dark-mode-${widgetName}`, {
          capture: "viewport",
          padding: 10,
        });

        // Find inner contents for more detailed screenshots
        cy.wrap($widget).within(() => {
          // Check for specific widget content sections
          cy.get(
            '.widget-content, [class*="content"], [data-testid*="content"]'
          ).each(($content, j) => {
            // Skip if empty
            if ($content.text().trim().length > 0) {
              cy.wrap($content).scrollIntoView({
                offset: { top: -20, left: 0 },
              });
              cy.wait(200);
              cy.wrap($content).screenshot(
                `widget-dark-mode-${widgetName}-detail-${j + 1}`,
                { capture: "viewport", padding: 5 }
              );
            }
          });
        });
      });
    });
  });
});
