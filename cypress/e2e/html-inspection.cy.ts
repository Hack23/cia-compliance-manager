describe('Deep HTML Inspection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.wait(2000); // Wait for app to fully load
  });

  it('captures SecuritySummary widget HTML structure', () => {
    // Find the SecuritySummary widget
    cy.get('[data-testid="widget-security-summary"]').should('exist');
    
    // Get the actual HTML structure
    cy.get('[data-testid="widget-security-summary"]').then(($widget) => {
      const html = $widget.prop('outerHTML');
      cy.writeFile('cypress/html-dumps/security-summary-widget.html', html);
      cy.log('Widget HTML saved');
      
      // Log computed styles for key elements
      const tablist = $widget.find('[role="tablist"]');
      if (tablist.length > 0) {
        const computedStyle = window.getComputedStyle(tablist[0]);
        cy.writeFile('cypress/html-dumps/tablist-computed-styles.json', {
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
          flexWrap: computedStyle.flexWrap,
          gap: computedStyle.gap,
          justifyContent: computedStyle.justifyContent,
          alignItems: computedStyle.alignItems,
        });
        cy.log('Tablist computed styles:', {
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
        });
      }
      
      // Check if tabs are indeed vertical or horizontal
      const tabs = $widget.find('[role="tab"]');
      if (tabs.length > 1) {
        const tab1Rect = tabs[0].getBoundingClientRect();
        const tab2Rect = tabs[1].getBoundingClientRect();
        
        const isHorizontal = Math.abs(tab1Rect.top - tab2Rect.top) < 5;
        const isVertical = Math.abs(tab1Rect.left - tab2Rect.left) < 5;
        
        cy.log('Tab layout analysis:', {
          isHorizontal,
          isVertical,
          tab1Top: tab1Rect.top,
          tab2Top: tab2Rect.top,
          tab1Left: tab1Rect.left,
          tab2Left: tab2Rect.left,
        });
        
        cy.writeFile('cypress/html-dumps/tab-layout-analysis.json', {
          isHorizontal,
          isVertical,
          tab1: { top: tab1Rect.top, left: tab1Rect.left, width: tab1Rect.width, height: tab1Rect.height },
          tab2: { top: tab2Rect.top, left: tab2Rect.left, width: tab2Rect.width, height: tab2Rect.height },
        });
      }
      
      // Capture radar chart container
      const radarContainer = $widget.find('.h-56, .h-\\[300px\\]');
      if (radarContainer.length > 0) {
        const radarStyle = window.getComputedStyle(radarContainer[0]);
        cy.writeFile('cypress/html-dumps/radar-container-styles.json', {
          height: radarStyle.height,
          minHeight: radarStyle.minHeight,
          maxHeight: radarStyle.maxHeight,
          padding: radarStyle.padding,
        });
      }
    });
    
    // Take screenshot
    cy.screenshot('security-summary-widget-full', { capture: 'viewport' });
  });

  it('inspects all widget containers', () => {
    cy.get('[data-testid^="widget-"]').each(($widget, index) => {
      const testId = $widget.attr('data-testid');
      cy.log(`Inspecting widget: ${testId}`);
      
      // Get computed styles for widget container
      const computedStyle = window.getComputedStyle($widget[0]);
      const metrics = {
        testId,
        width: computedStyle.width,
        height: computedStyle.height,
        minHeight: computedStyle.minHeight,
        maxHeight: computedStyle.maxHeight,
        padding: computedStyle.padding,
        margin: computedStyle.margin,
        display: computedStyle.display,
        flex: computedStyle.flex,
      };
      
      cy.writeFile(`cypress/html-dumps/widget-${index}-${testId}.json`, metrics);
    });
  });

  it('inspects tab content padding layers', () => {
    // Click on SecuritySummary widget overview tab
    cy.get('[data-testid="widget-security-summary"]').should('exist');
    cy.get('[data-testid="widget-security-summary-tab-overview"]').click();
    cy.wait(500);
    
    // Get all nested divs and their padding
    cy.get('[data-testid="widget-security-summary"] [role="tabpanel"]').then(($tabpanel) => {
      const paddingLayers = [];
      
      function inspectElement(element: HTMLElement, depth: number) {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        
        paddingLayers.push({
          depth,
          tagName: element.tagName,
          className: element.className,
          padding: style.padding,
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
          margin: style.margin,
          width: rect.width,
          height: rect.height,
        });
        
        // Only inspect direct children, not all descendants
        if (depth < 3) {
          Array.from(element.children).forEach((child) => {
            inspectElement(child as HTMLElement, depth + 1);
          });
        }
      }
      
      inspectElement($tabpanel[0], 0);
      cy.writeFile('cypress/html-dumps/tab-panel-padding-layers.json', paddingLayers);
    });
  });
});
