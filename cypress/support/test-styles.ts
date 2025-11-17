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

// Declare commands in the global Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Apply test styles to fix common widget display issues
       */
      applyTestStyles(): Chainable<void>;
      /**
       * Optimize widget for screenshot
       */
      optimizeWidgetForScreenshot($widget: JQuery<HTMLElement>): Chainable<void>;
      /**
       * Force dark mode on the page
       */
      forceDarkMode(): Chainable<void>;
      /**
       * Force light mode on the page
       */
      forceLightMode(): Chainable<void>;
    }
  }
}