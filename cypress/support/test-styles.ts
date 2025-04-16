/**
 * Provides consistent styling fixes for Cypress tests
 * to ensure widgets display properly in screenshots
 */

/**
 * Apply test styles to improve widget visibility and layout for screenshots
 */
export function applyTestStyles(): void {
  cy.document().then((doc) => {
    // Create style element if it doesn't exist
    let styleEl = doc.getElementById("cypress-test-styles");
    if (!styleEl) {
      styleEl = doc.createElement("style");
      styleEl.id = "cypress-test-styles";
      doc.head.appendChild(styleEl);
    }

    // Add comprehensive styles to fix common issues
    styleEl.textContent = `
      /* Fix widget container styling for screenshots */
      .widget-container,
      [data-testid^="widget-"],
      [class*="widget-container"] {
        max-height: none !important;
        overflow: visible !important;
        margin: 10px !important;
        border: 2px solid rgba(59, 130, 246, 0.5) !important;
        outline: 1px solid rgba(59, 130, 246, 0.3);
        background-color: white !important;
        position: relative !important;
        height: auto !important;
        /* Updated - set reasonable constraints to prevent excessive expansion */
        max-width: 800px !important;
        min-height: 50px !important;
        max-height: 600px !important;
      }
      
      /* Ensure dark mode styling */
      .dark .widget-container,
      .dark [data-testid^="widget-"],
      .dark [class*="widget-container"] {
        background-color: #1e293b !important;
        border-color: #475569 !important;
        color: #e2e8f0 !important;
      }
      
      /* Fix widget content display - updated to constrain size */
      .widget-body, 
      .widget-content,
      [class*="widget-body"],
      [class*="widget-content"] {
        max-height: 550px !important; /* Allow scrolling for very tall content */
        overflow-y: auto !important; /* Show scrollbars only when needed */
        overflow-x: hidden !important;
        height: auto !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }
      
      /* Fix widget header styling */
      .widget-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 0.75rem !important;
        border-bottom: 1px solid rgba(203, 213, 225, 0.5) !important;
        background-color: rgba(248, 250, 252, 0.8) !important;
      }
      
      /* Ensure text is visible */
      p, h1, h2, h3, h4, h5, h6, span, div, li {
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: normal !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
      }
      
      /* Fix scrollbar appearance */
      ::-webkit-scrollbar {
        width: 8px !important;
        height: 8px !important;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: rgba(100, 116, 139, 0.5) !important;
        border-radius: 4px !important;
      }
      
      /* Disable animations and transitions */
      * {
        transition: none !important;
        animation: none !important;
        animation-delay: 0s !important;
        transition-delay: 0s !important;
      }
      
      /* Fix content fitting */
      img, svg {
        max-width: 100% !important;
        height: auto !important;
      }
      
      /* Ensure tabs display properly */
      [role="tab"], 
      .tab, 
      button[class*="tab"] {
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* Fix truncated content */
      [class*="truncate"],
      [class*="ellipsis"] {
        text-overflow: clip !important;
        overflow: visible !important;
        white-space: normal !important;
      }
      
      /* Fix layout issues */
      .grid {
        display: grid !important;
        gap: 1rem !important;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
      }
      
      /* Fixed height containers should have reasonable constraints */
      [style*="height:"], [style*="max-height:"] {
        max-height: 500px !important;
        height: auto !important;
        min-height: 10px !important;
      }
      
      /* Improve chart rendering */
      canvas {
        display: block !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 100px !important;
        max-height: 300px !important;
      }
      
      /* Fix badge styling - common in the widgets */
      [class*="badge"], 
      span[class*="status"],
      [class*="pill"] {
        display: inline-flex !important;
        align-items: center !important;
        padding: 0.25rem 0.5rem !important;
        border-radius: 9999px !important;
        font-size: 0.75rem !important;
        font-weight: 500 !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }
    `;
  });
}

/**
 * Apply optimized test styles for screenshot tests - simplified version
 * that applies only critical fixes for better performance
 */
export function applyScreenshotStyles(): void {
  cy.document().then((doc) => {
    // Create style element if it doesn't exist
    let styleEl = doc.getElementById("cypress-screenshot-styles");
    if (!styleEl) {
      styleEl = doc.createElement("style");
      styleEl.id = "cypress-screenshot-styles";
      doc.head.appendChild(styleEl);
    }

    // Add only the most important styles needed for screenshots
    styleEl.textContent = `
      /* Fix widget container styling for screenshots */
      .widget-container,
      [data-testid^="widget-"],
      [class*="widget-container"] {
        max-height: 600px !important;
        overflow: auto !important;
        margin: 10px !important;
        border: 2px solid rgba(59, 130, 246, 0.5) !important;
        position: relative !important;
        height: auto !important;
        min-height: 50px !important;
        width: auto !important;
        max-width: 800px !important;
      }
      
      /* Fix widget content display */
      .widget-body, 
      .widget-content,
      [class*="widget-body"],
      [class*="widget-content"] {
        max-height: none !important;
        overflow: visible !important;
        height: auto !important;
        display: block !important;
      }
      
      /* Ensure text is visible */
      p, h1, h2, h3, h4, h5, h6, span, div, li {
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: normal !important;
      }
      
      /* Disable animations and transitions */
      * {
        transition: none !important;
        animation: none !important;
      }
      
      /* Fix radar chart specific issues */
      [data-testid*="radar-chart"] canvas,
      [class*="radar-chart"] canvas {
        width: 100% !important;
        max-width: 400px !important;
        height: 300px !important;
        margin: 0 auto;
        display: block;
      }
    `;
  });
}

/**
 * Optimize a specific widget for screenshot
 * @param $widget The widget jQuery element to optimize
 */
export function optimizeWidgetForScreenshot(
  $widget: JQuery<HTMLElement>
): void {
  // Apply direct CSS overrides to the widget element
  cy.wrap($widget)
    .invoke("css", "visibility", "visible")
    .invoke("css", "display", "block")
    .invoke("css", "opacity", "1")
    .invoke("css", "position", "relative")
    .invoke("css", "height", "auto")
    .invoke("css", "min-height", "50px") // Reduced minimum height
    .invoke("css", "max-height", "600px") // Added maximum height
    .invoke("css", "max-width", "800px") // Added maximum width
    .invoke("css", "overflow", "auto"); // Changed to auto instead of visible

  // Fix parent containers too (often needed for proper visibility)
  let $parent = $widget.parent();
  for (let i = 0; i < 5 && $parent.length; i++) {
    cy.wrap($parent)
      .invoke("css", "visibility", "visible")
      .invoke("css", "display", "block")
      .invoke("css", "opacity", "1")
      .invoke("css", "overflow", "visible")
      .invoke("css", "height", "auto")
      .invoke("css", "max-height", "none");
    $parent = $parent.parent();
  }

  // Also fix any content containers inside the widget
  cy.wrap($widget)
    .find('[class*="body"], [class*="content"]')
    .each(($el) => {
      cy.wrap($el)
        .invoke("css", "visibility", "visible")
        .invoke("css", "display", "block")
        .invoke("css", "opacity", "1")
        .invoke("css", "overflow", "visible")
        .invoke("css", "height", "auto")
        .invoke("css", "max-height", "none")
        .invoke("css", "min-height", "20px");
    });
}

/**
 * Force dark mode on the page
 */
export function forceDarkMode(): void {
  cy.document().then((doc) => {
    // Add dark mode class to html element
    doc.documentElement.classList.add("dark");
    doc.body.classList.add("dark");

    // Store preference in local storage
    localStorage.setItem("darkMode", "true");
  });
}

/**
 * Force light mode on the page
 */
export function forceLightMode(): void {
  cy.document().then((doc) => {
    // Remove dark mode class from html element
    doc.documentElement.classList.remove("dark");
    doc.body.classList.remove("dark");

    // Store preference in local storage
    localStorage.setItem("darkMode", "false");
  });
}

/**
 * Apply styles specifically to optimize dashboard grid for screenshots
 * Ensures proper 3x4 layout
 */
export function optimizeDashboardGridForScreenshots(): void {
  cy.document().then((doc) => {
    // Create style element if it doesn't exist
    let styleEl = doc.getElementById("cypress-grid-styles");
    if (!styleEl) {
      styleEl = doc.createElement("style");
      styleEl.id = "cypress-grid-styles";
      doc.head.appendChild(styleEl);
    }

    // Add grid optimization styles
    styleEl.textContent = `
      /* Optimize grid for 3x4 layout */
      [data-testid="dashboard-grid"] {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        grid-auto-rows: minmax(280px, auto) !important;
        gap: 16px !important;
        padding: 16px !important;
        width: calc(100% - 32px) !important;
        max-width: 1920px !important;
        margin: 0 auto !important;
      }
      
      /* Ensure widget containers have consistent sizing */
      [data-testid="dashboard-grid"] > div {
        min-height: 280px !important;
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Ensure header and body have proper sizing */
      .widget-header,
      [data-testid^="widget-"] > div:first-child {
        height: auto !important;
        min-height: 32px !important;
        max-height: 40px !important;
        padding: 4px 12px !important;
      }
      
      /* Ensure content body fills available space */
      .widget-body,
      [data-testid^="widget-"] > div:nth-child(2) {
        flex: 1 1 auto !important;
        overflow: auto !important;
        height: auto !important;
      }
      
      /* Disable animations for cleaner screenshots */
      * {
        animation: none !important;
        transition: none !important;
      }
    `;

    // Force layout recalculation
    doc.body.style.display = "none";
    const _ = doc.body.offsetHeight; // Force reflow
    doc.body.style.display = "";
  });

  // Add command to use this from tests
  // Fix: Use 'as any' to bypass TypeScript checking for the command add operation
  (Cypress.Commands as any).add(
    "optimizeGridLayout",
    optimizeDashboardGridForScreenshots
  );
}

// Declare the optimizeGridLayout command in the global Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Optimize dashboard grid for screenshots
       * Applies styles to ensure proper 3x4 layout
       */
      optimizeGridLayout(): Chainable<void>;
    }
  }
}

// Export the function for direct import
export default {
  applyTestStyles,
  applyScreenshotStyles,
  optimizeWidgetForScreenshot,
  forceDarkMode,
  forceLightMode,
  optimizeDashboardGridForScreenshots,
};
