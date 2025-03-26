/**
 * Centralized screenshot utilities to reduce duplicate screenshots
 * and ensure consistent screenshot capture across tests
 */

/**
 * Capture a widget in two different states (low and high security)
 * @param widgetName Name of the widget to capture
 */
export function captureWidgetStates(widgetName: string): void {
  // Set low security for first state
  cy.setSecurityLevels("Low", "Low", "Low");
  cy.wait(1000);

  // Find widget and take screenshot
  cy.findWidget(widgetName)
    .should("exist")
    .scrollIntoView()
    .screenshot(`widget-${widgetName}-low-security`, {
      padding: 20,
      overwrite: true,
    });

  // Set high security for second state
  cy.setSecurityLevels("High", "High", "High");
  cy.wait(1000);

  // Find widget and take screenshot
  cy.findWidget(widgetName)
    .should("exist")
    .scrollIntoView()
    .screenshot(`widget-${widgetName}-high-security`, {
      padding: 20,
      overwrite: true,
    });
}

/**
 * Capture full page screenshots in both light and dark modes
 * @param pageName Name of the page to capture
 */
export function captureFullPageModes(pageName: string): void {
  // Light mode screenshot
  cy.forceLightMode();
  cy.wait(500);
  cy.screenshot(`${pageName}-light-mode`, {
    capture: "fullPage",
    overwrite: true,
  });

  // Dark mode screenshot
  cy.forceDarkMode();
  cy.wait(500);
  cy.screenshot(`${pageName}-dark-mode`, {
    capture: "fullPage",
    overwrite: true,
  });
}

/**
 * Create baseline screenshots of all widgets in current state
 */
export function captureAllWidgets(): void {
  // Use DOM analysis to find widgets
  cy.get('[data-testid^="widget-"], [class*="widget-container"]').each(
    ($widget, index) => {
      const testId = $widget.attr("data-testid") || `unknown-widget-${index}`;
      const simpleName = testId
        .replace("widget-container-widget-", "")
        .replace("widget-container-", "")
        .replace("widget-", "");

      // Only take screenshot if widget is visible
      if ($widget.is(":visible")) {
        cy.wrap($widget).scrollIntoView().screenshot(`widget-${simpleName}`, {
          padding: 20,
          overwrite: true,
        });
      }
    }
  );
}
