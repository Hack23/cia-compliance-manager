/**
 * Widget Analyzer
 *
 * This utility helps analyze and document widget test IDs and structure
 * to improve test reliability and documentation.
 */

/**
 * Analyze widgets on the page and update data-testid-analysis.md
 */
export function analyzeAndDocumentWidgets(): void {
  cy.document().then((doc) => {
    // Find all elements with data-testid
    const elements = Array.from(doc.querySelectorAll("[data-testid]"));
    const widgetElements = elements.filter((el) => {
      const testId = el.getAttribute("data-testid") || "";
      return testId.includes("widget");
    });

    // Log analysis results
    cy.log(
      `Found ${widgetElements.length} widget elements with data-testid attributes`
    );

    // Create a widget map
    const widgetMap: Record<string, any> = {};

    widgetElements.forEach((el) => {
      const testId = el.getAttribute("data-testid") || "";
      const simplifiedId = testId
        .replace("widget-container-widget-", "")
        .replace("widget-container-", "")
        .replace("widget-", "");

      // Extract content info
      const textContent = el.textContent?.trim().substring(0, 100) || "";
      const childCount = el.children.length;
      const classNames = el.className;

      // Build widget info
      if (!widgetMap[simplifiedId]) {
        widgetMap[simplifiedId] = {
          testIds: [],
          contentSample: textContent,
          childCount,
          classNames,
        };
      }

      widgetMap[simplifiedId].testIds.push(testId);
    });

    // Create documentation
    let markdownContent = "# Widget Test ID Analysis\n\n";
    markdownContent +=
      "This document lists all widget test IDs found in the application and their relationships.\n\n";

    Object.keys(widgetMap)
      .sort()
      .forEach((widgetKey) => {
        const widget = widgetMap[widgetKey];

        markdownContent += `## ${widgetKey}\n\n`;
        markdownContent += `**Test IDs:**\n\n`;
        widget.testIds.forEach((id: string) => {
          markdownContent += `- \`${id}\`\n`;
        });

        markdownContent += `\n**Content Sample:**\n\n`;
        markdownContent += `\`\`\`\n${widget.contentSample}${
          widget.contentSample.length >= 100 ? "..." : ""
        }\n\`\`\`\n\n`;

        markdownContent += `**Structure:**\n\n`;
        markdownContent += `- Child elements: ${widget.childCount}\n`;
        markdownContent += `- Classes: \`${widget.classNames}\`\n\n`;

        markdownContent += "---\n\n";
      });

    // Log the markdown
    cy.log("Generated widget analysis markdown");
    console.log(markdownContent);

    // You would typically write this to a file using a Cypress task,
    // but for simplicity we'll just log it to the console here
  });
}

/**
 * Run this command to log a comprehensive widget analysis to the console
 */
Cypress.Commands.add("analyzeWidgetTestIds", analyzeAndDocumentWidgets);

// Add type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Analyze widgets and generate documentation
       */
      analyzeWidgetTestIds(): Chainable<void>;
    }
  }
}
