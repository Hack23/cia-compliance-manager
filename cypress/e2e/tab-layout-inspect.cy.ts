describe('Tab Layout Deep Inspection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.wait(3000); // Wait for full render
  });

  it('finds and inspects tablist element', () => {
    // Find any element with role="tablist"
    cy.get('[role="tablist"]').first().then(($tablist) => {
      cy.log('Found tablist!');
      
      // Get computed styles
      const element = $tablist[0];
      const computedStyle = window.getComputedStyle(element);
      
      const tablistInfo = {
        html: element.outerHTML.substring(0, 500),
        computedStyles: {
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
          flexWrap: computedStyle.flexWrap,
          gap: computedStyle.gap,
          gridTemplateColumns: computedStyle.gridTemplateColumns,
          gridAutoFlow: computedStyle.gridAutoFlow,
        },
        classes: element.className,
        bounds: element.getBoundingClientRect(),
      };
      
      cy.writeFile('cypress/html-dumps/tablist-deep-inspect.json', tablistInfo);
      cy.log('Tablist Display:', computedStyle.display);
      cy.log('Tablist Flex Direction:', computedStyle.flexDirection);
    });

    // Find all tab buttons
    cy.get('[role="tab"]').then(($tabs) => {
      const tabsInfo = [];
      $tabs.each((index, tab) => {
        const rect = tab.getBoundingClientRect();
        const style = window.getComputedStyle(tab);
        tabsInfo.push({
          index,
          text: tab.textContent,
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          display: style.display,
          float: style.float,
          position: style.position,
        });
      });
      
      cy.writeFile('cypress/html-dumps/tabs-positions.json', tabsInfo);
      
      // Determine if vertical or horizontal
      if (tabsInfo.length >= 2) {
        const topDiff = Math.abs(tabsInfo[0].top - tabsInfo[1].top);
        const leftDiff = Math.abs(tabsInfo[0].left - tabsInfo[1].left);
        
        const layout = {
          isVertical: topDiff > 10 && leftDiff < 10,
          isHorizontal: leftDiff > 10 && topDiff < 10,
          topDiff,
          leftDiff,
        };
        
        cy.writeFile('cypress/html-dumps/tab-layout-determination.json', layout);
        cy.log('Layout:', layout);
      }
    });
    
    // Screenshot the tabs area
    cy.get('[role="tablist"]').first().screenshot('tablist-closeup', { overwrite: true });
  });

  it('finds all CSS rules affecting tablist', () => {
    cy.get('[role="tablist"]').first().then(($tablist) => {
      const element = $tablist[0];
      
      // Get all matched CSS rules
      const matchedRules = [];
      const sheets = Array.from(document.styleSheets);
      
      sheets.forEach((sheet) => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach((rule) => {
            if (rule.selectorText && element.matches(rule.selectorText)) {
              matchedRules.push({
                selector: rule.selectorText,
                display: rule.style.display || null,
                flexDirection: rule.style.flexDirection || null,
                gridAutoFlow: rule.style.gridAutoFlow || null,
              });
            }
          });
        } catch (e) {
          // CORS or other access issues
        }
      });
      
      cy.writeFile('cypress/html-dumps/tablist-matched-css-rules.json', matchedRules);
    });
  });
});
