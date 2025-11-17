/**
 * Screenshot analysis utilities for identifying issues and improving test quality
 */

/**
 * Detects common issues in widget layout and content
 * @param widgetName Name of the widget being tested
 * @param $widget jQuery element of the widget
 */
export function detectWidgetIssues(
  _widgetName: string, // Prefix with underscore to indicate intentionally unused
  $widget: JQuery<HTMLElement>
): Cypress.Chainable<{ hasIssues: boolean; issues: string[] }> {
  const issues: string[] = [];

  // Check content overflow
  return cy.wrap($widget).then(($el) => {
    const scrollHeight = ($el[0] as HTMLElement).scrollHeight || 0;
    const clientHeight = ($el[0] as HTMLElement).clientHeight || 0;

    if (scrollHeight > clientHeight + 50) {
      issues.push(
        `Content overflow: Content height (${scrollHeight}px) much larger than visible height (${clientHeight}px)`
      );
    }

    // Look for truncated text
    const ellipsisTexts = $el.find(
      '[style*="text-overflow: ellipsis"], [style*="overflow: hidden"][style*="white-space: nowrap"]'
    );
    if (ellipsisTexts.length > 0) {
      // Fix: Use index parameter in place of unused variable i
      ellipsisTexts.each((index, element) => {
        const $textEl = Cypress.$(element);
        // Use index instead of declaring unused i
        issues.push(
          `Truncated text at index ${index}: "${$textEl
            .text()
            .substring(0, 30)}..."`
        );
      });
    }

    // Check for unusually small widget height
    if (clientHeight < 100 && scrollHeight > 150) {
      issues.push(
        `Widget collapsed: Widget visible height (${clientHeight}px) is too small for content (${scrollHeight}px)`
      );
    }

    // Look for empty content areas
    const contentAreas = $el.find('[class*="content"], [class*="body"]');
    contentAreas.each((index, contentEl) => {
      // Use index instead of i
      const $content = Cypress.$(contentEl);
      if ($content.children().length === 0 && !$content.text().trim()) {
        issues.push(
          `Empty content area at index ${index}: Found empty content container with class ${$content.attr(
            "class"
          )}`
        );
      }
    });

    // Check for hidden widgets
    if ($el.css("display") === "none" || $el.css("visibility") === "hidden") {
      issues.push(
        `Hidden widget: Widget is not visible (display: ${$el.css(
          "display"
        )}, visibility: ${$el.css("visibility")})`
      );
    }

    return {
      hasIssues: issues.length > 0,
      issues,
    };
  });
}

/**
 * Takes screenshot with visual indicators of issues
 * @param widgetName Name of the widget
 * @param $widget jQuery element of the widget
 * @param issues Array of issues found in the widget
 */
export function screenshotWithIssues(
  widgetName: string,
  $widget: JQuery<HTMLElement>,
  issues: string[]
): void {
  if (issues.length === 0) return;

  cy.document().then((doc) => {
    // Create overlay for issue markers
    const overlay = doc.createElement("div");
    overlay.className = "cypress-issue-overlay";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "9999";

    // Create issue markers
    issues.forEach((issue, idx) => {
      const marker = doc.createElement("div");
      marker.style.position = "absolute";
      marker.style.top = `${10 + idx * 30}px`;
      marker.style.left = "10px";
      marker.style.backgroundColor = "rgba(255, 50, 50, 0.9)";
      marker.style.color = "white";
      marker.style.padding = "5px 10px";
      marker.style.borderRadius = "4px";
      marker.style.fontSize = "12px";
      marker.style.fontWeight = "bold";
      marker.style.maxWidth = "90%";
      marker.textContent = `Issue ${idx + 1}: ${issue.substring(0, 40)}${
        issue.length > 40 ? "..." : ""
      }`;

      overlay.appendChild(marker);
    });

    // Append overlay to widget
    const el = $widget[0] as HTMLElement;
    el.style.position = "relative";
    el.appendChild(overlay);

    // Take screenshot with issues highlighted
    cy.wrap($widget).screenshot(`issues-${widgetName}`, { overwrite: true });

    // Remove overlay after screenshot
    el.removeChild(overlay);
  });
}

/**
 * Apply visual fixes to make content more visible
 * @param $widget jQuery element of the widget to fix
 */
export function applyVisualFixes($widget: JQuery<HTMLElement>): void {
  cy.wrap($widget).then(($el) => {
    // Find potentially truncated text
    $el
      .find(
        '[style*="text-overflow: ellipsis"], [style*="overflow: hidden"][style*="white-space: nowrap"]'
      )
      .css("text-overflow", "clip")
      .css("overflow", "visible")
      .css("white-space", "normal");

    // Fix collapsed sections
    $el.find('[style*="height:"][style*="px"]').each((i, el) => {
      const $child = Cypress.$(el);
      const scrollHeight = el.scrollHeight || 0;
      const clientHeight = el.clientHeight || 0;

      if (scrollHeight > clientHeight + 20) {
        $child.css("height", "auto").css("max-height", "none");
      }
    });
  });
}
