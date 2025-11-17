/**
 * Centralized screenshot utilities to reduce duplicate screenshots
 * and ensure consistent screenshot capture across tests
 */

// Custom interface that extends Cypress ScreenshotOptions to include quality
interface EnhancedScreenshotOptions extends Cypress.ScreenshotOptions {
  quality?: number;
}

/**
 * Apply screenshot-specific styles without affecting the main application
 */
export function applyScreenshotStyles(): void {
  cy.document().then((doc) => {
    const styleElement = doc.createElement("style");
    styleElement.id = "cypress-screenshot-styles";
    styleElement.textContent = `
      /* Stabilize animations for screenshots */
      * {
        animation-duration: 0ms !important;
        transition-duration: 0ms !important;
        animation-delay: 0ms !important;
        transition-delay: 0ms !important;
      }
      
      /* Ensure consistent widget heights in screenshots */
      [data-testid^="widget-"] {
        min-height: 300px;
        height: auto !important;
        max-height: none !important;
      }
      
      /* Make sure content is fully visible */
      .widget-body {
        overflow: visible !important;
        max-height: none !important;
      }
      
      /* Fix radar chart specifically for screenshots */
      .radar-chart-container canvas {
        max-height: 250px;
        max-width: 100%;
        height: auto !important;
        width: auto !important;
        display: block !important;
        margin: 0 auto !important;
      }
      
      /* Ensure text is visible in screenshots */
      [data-testid^="widget-"] .widget-body {
        color: var(--text-color) !important;
      }
      
      /* Fix positioning for screenshots */
      .fixed {
        position: absolute !important;
      }
    `;
    doc.head.appendChild(styleElement);
  });
}

/**
 * Capture full page screenshots in both light and dark modes
 * @param pageName Name of the page to capture
 * @param captureHtml Whether to capture HTML content (default: false)
 */
export function captureFullPageModes(
  pageName: string,
  captureHtml: boolean = false
): void {
  // Light mode screenshot
  cy.forceLightMode();
  cy.wait(500);
  cy.screenshot(`${pageName}-light`, {
    capture: "fullPage",
    overwrite: true,
  });
  if (captureHtml) captureHtmlContent(`${pageName}-light-mode`);

  // Dark mode screenshot
  cy.forceDarkMode();
  cy.wait(500);
  cy.screenshot(`${pageName}-dark`, {
    capture: "fullPage",
    overwrite: true,
  });
  if (captureHtml) captureHtmlContent(`${pageName}-dark-mode`);
}

/**
 * Capture full dashboard with all widget columns visible
 * @param pageName Name for the screenshot
 * @param captureHtml Whether to capture HTML content (default: false)
 */
export function captureFullDashboardGrid(
  pageName: string,
  captureHtml: boolean = false
): void {
  // First ensure enough width to show all columns - minimum 2000px width
  cy.viewport(2400, 1200); // Wider viewport to show all columns
  cy.wait(500);

  // Fix grid layout to ensure proper row heights
  cy.document().then((doc) => {
    const style = doc.createElement("style");
    style.textContent = `
      [data-testid="dashboard-grid"] {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 16px !important;
        padding: 16px !important;
      }
      
      @media (min-width: 1200px) {
        [data-testid="dashboard-grid"] {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      }
      
      [data-testid="dashboard-grid"] > div {
        min-height: 280px !important;
      }
    `;
    doc.head.appendChild(style);
  });

  // Get the grid to ensure it's visible
  cy.get('[data-testid="dashboard-grid"]')
    .scrollIntoView()
    .should("be.visible");

  // Light mode with all columns
  cy.forceLightMode();
  cy.wait(500);
  cy.screenshot(`${pageName}-light`, {
    capture: "viewport",
    overwrite: true,
    scale: true,
    quality: 90,
    blackout: [".cypress-test-blackout"],
  } as EnhancedScreenshotOptions);
  if (captureHtml)
    captureHtmlContent(`${pageName}-light`, '[data-testid="dashboard-grid"]');

  // Dark mode with all columns
  cy.forceDarkMode();
  cy.wait(500);
  cy.screenshot(`${pageName}-dark`, {
    capture: "viewport",
    overwrite: true,
    scale: true,
    quality: 90,
    blackout: [".cypress-test-blackout"],
  } as EnhancedScreenshotOptions);
  if (captureHtml)
    captureHtmlContent(`${pageName}-dark`, '[data-testid="dashboard-grid"]');
}

/**
 * Capture widget in light and dark modes
 * @param widgetName Name of the widget to capture
 * @param captureHtml Whether to capture HTML content (default: false)
 */
export function captureWidgetThemes(
  widgetName: string,
  captureHtml: boolean = false
): void {
  // Set a consistent security level
  cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
  cy.wait(500);

  // Find widget - using findWidget() which should return a single element
  cy.findWidget(widgetName)
    .should("exist")
    .then(($widget) => {
      if ($widget.length === 0) {
        cy.log(`Widget not found: ${widgetName}`);
        return;
      }

      // Make sure we're only dealing with the first element if multiple found
      const $singleWidget = $widget.eq(0);

      // Capture light mode
      cy.forceLightMode();
      cy.wait(300);
      captureWidgetScreenshot($singleWidget, `${widgetName}-light`);
      if (captureHtml) {
        cy.wrap($singleWidget).then(($el) => {
          captureHtmlContent(
            `widget-${widgetName}-light`,
            `[data-testid*="${widgetName}"]`
          );
        });
      }

      // Capture dark mode
      cy.forceDarkMode();
      cy.wait(300);
      captureWidgetScreenshot($singleWidget, `${widgetName}-dark`);
      if (captureHtml) {
        cy.wrap($singleWidget).then(($el) => {
          captureHtmlContent(
            `widget-${widgetName}-dark`,
            `[data-testid*="${widgetName}"]`
          );
        });
      }
    });
}

/**
 * Capture a well-sized and properly clipped screenshot of a widget

/**
 * Simplified function to capture a single widget screenshot in both themes
 * @param widgetName Name of the widget
 */
export function captureSimpleWidgetThemes(widgetName: string): void {
  // First find the widget
  cy.findWidget(widgetName).then(($widget) => {
    if ($widget.length === 0) {
      cy.log(`Widget not found: ${widgetName}`);
      return;
    }

    // Only use first element if multiple found
    const $singleWidget = $widget.eq(0);

    // Light mode
    cy.forceLightMode();
    cy.wait(300);
    cy.wrap($singleWidget)
      .scrollIntoView()
      .screenshot(`${widgetName}-light`, { padding: 10 });

    // Dark mode
    cy.forceDarkMode();
    cy.wait(300);
    cy.wrap($singleWidget)
      .scrollIntoView()
      .screenshot(`${widgetName}-dark`, { padding: 10 });
  });
}

/**
 * Capture all widgets with simplified light/dark mode screenshots
 */
export function captureAllWidgetsSimple(): void {
  // Use DOM analysis to find widgets
  cy.get('[data-testid^="widget-"], [data-testid*="-widget"]').each(
    ($widget, index) => {
      // Only process visible widgets and skip after the first 12 to avoid too many screenshots
      if ($widget.is(":visible") && index < 12) {
        const testId = $widget.attr("data-testid") || `unknown-widget-${index}`;
        const simpleName = testId
          .replace("widget-container-widget-", "")
          .replace("widget-container-", "")
          .replace("widget-", "");

        // Take light and dark screenshots of this widget
        captureSimpleWidgetThemes(simpleName);
      }
    }
  );
}
