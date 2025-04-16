/**
 * Centralized screenshot utilities to reduce duplicate screenshots
 * and ensure consistent screenshot capture across tests
 */

// Custom interface that extends Cypress ScreenshotOptions to include quality
interface EnhancedScreenshotOptions extends Cypress.ScreenshotOptions {
  quality?: number;
}

// Add function to save HTML content
/**
 * Capture and save the HTML content to a file
 * @param name Base filename (without extension)
 * @param selector Optional CSS selector to limit capture (defaults to full page)
 */
export function captureHtmlContent(
  name: string,
  selector: string = "body"
): void {
  cy.get(selector).then(($element) => {
    // Get HTML content
    const html = $element.prop("outerHTML");

    // Create a basic HTML document with the content
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Snapshot - ${name}</title>
  <style>
    /* Preserve some basic styling */
    body { font-family: system-ui, sans-serif; }
    .dark { background-color: #1a1a1a; color: #f5f5f5; }
    [data-testid] { outline: 1px dashed rgba(0,0,0,0.2); }
    .dark [data-testid] { outline: 1px dashed rgba(255,255,255,0.2); }
  </style>
</head>
<body class="${document.body.classList.contains("dark") ? "dark" : ""}">
  ${html}
</body>
</html>`;

    // Use Cypress.task to write the file to disk
    cy.task("writeFile", {
      path: `cypress/snapshots/html/${name}.html`,
      content: fullHtml,
    });

    cy.log(`📄 Captured HTML content: ${name}.html`);
  });
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
 *
 * @param $widget The jQuery element representing the widget
 * @param name Name for the screenshot file
 * @param options Optional screenshot configuration
 */
export function captureWidgetScreenshot(
  $widget: JQuery<HTMLElement>,
  name: string,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    padding?: number;
    clip?: boolean;
    optimize?: boolean;
    viewportAdjust?: boolean;
    centerInViewport?: boolean;
    captureHtml?: boolean;
  } = {}
): void {
  const {
    maxWidth = 800,
    maxHeight = 600,
    padding = 10,
    clip = true,
    optimize = true,
    viewportAdjust = true,
    centerInViewport = true,
    captureHtml = false,
  } = options;

  // Ensure we only have a single element
  if (!$widget || $widget.length === 0) {
    cy.log(`Widget element not found - cannot take screenshot of ${name}`);
    return;
  }

  // Only use the first element if multiple are provided
  const $singleWidget = $widget.length > 1 ? $widget.eq(0) : $widget;

  if (optimize) {
    // Apply optimization to the element
    cy.wrap($singleWidget).then(($el) => {
      $el.css({
        "max-width": `${maxWidth}px`,
        "max-height": `${maxHeight}px`,
        overflow: clip ? "auto" : "visible",
        display: "block",
        visibility: "visible",
        opacity: "1",
        "background-color": $el.css("background-color") || "white",
      });
    });
  }

  // Check if we need to adjust viewport
  if (viewportAdjust) {
    cy.wrap($singleWidget).then(($el) => {
      const el = $el[0];
      const rect = el.getBoundingClientRect();

      cy.window().then((win) => {
        const viewportWidth = win.innerWidth;
        const viewportHeight = win.innerHeight;

        const widgetWidth = rect.width + padding * 2;
        const widgetHeight = rect.height + padding * 2;

        if (widgetWidth > viewportWidth || widgetHeight > viewportHeight) {
          const newWidth = Math.max(viewportWidth, widgetWidth + 50);
          const newHeight = Math.max(viewportHeight, widgetHeight + 50);

          cy.viewport(newWidth, newHeight);
          cy.log(`Adjusted viewport to ${newWidth}x${newHeight} to fit widget`);
          cy.wait(200);
        }
      });
    });
  }

  // Position widget for screenshot
  if (centerInViewport) {
    cy.wrap($singleWidget).scrollIntoView({
      duration: 200,
      offset: { top: -100, left: 0 },
      easing: "linear",
    });
    cy.wait(200);
  } else {
    cy.wrap($singleWidget).scrollIntoView();
    cy.wait(200);
  }

  // Take the screenshot - using the single element
  cy.wrap($singleWidget).screenshot(`widget-${name}`, {
    padding,
    overwrite: true,
    scale: true,
    capture: "viewport",
    blackout: [".cypress-test-blackout"],
    disableTimersAndAnimations: true,
  });

  // Capture HTML content if enabled
  if (captureHtml) {
    cy.wrap($singleWidget).then(($el) => {
      const html = $el.prop("outerHTML");
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Widget HTML Snapshot - ${name}</title>
  <style>
    /* Basic styling preservation */
    body { font-family: system-ui, sans-serif; margin: 20px; }
    .dark { background-color: #1a1a1a; color: #f5f5f5; }
    [data-testid] { outline: 1px dashed rgba(0,0,0,0.2); }
    .dark [data-testid] { outline: 1px dashed rgba(255,255,255,0.2); }
  </style>
</head>
<body class="${document.body.classList.contains("dark") ? "dark" : ""}">
  <h2>Widget: ${name}</h2>
  ${html}
</body>
</html>`;

      cy.task("writeFile", {
        path: `cypress/snapshots/html/widget-${name}.html`,
        content: fullHtml,
      });
    });
  }

  cy.log(`📸 Captured widget screenshot: ${name}`);
}

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
