describe('SecuritySummary Widget Deep HTML/CSS Inspection', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.wait(2000); // Wait for full render
  });

  it('Deep inspect SecuritySummary widget structure and all computed CSS', () => {
    cy.get('[data-testid="widget-security-summary"]').should('exist').then(($widget) => {
      // 1. Get widget container computed styles
      const widgetStyles = window.getComputedStyle($widget[0]);
      const widgetData = {
        tagName: $widget[0].tagName,
        classes: $widget[0].className,
        computedStyles: {
          display: widgetStyles.display,
          flexDirection: widgetStyles.flexDirection,
          padding: widgetStyles.padding,
          margin: widgetStyles.margin,
          height: widgetStyles.height,
          minHeight: widgetStyles.minHeight,
          maxHeight: widgetStyles.maxHeight,
          overflow: widgetStyles.overflow,
        },
        innerHTML: $widget[0].innerHTML.substring(0, 500),
      };

      cy.log('WIDGET CONTAINER DATA:', JSON.stringify(widgetData, null, 2));

      // 2. Deep inspect tab list
      cy.get('[data-testid="widget-security-summary"] [role="tablist"]').then(($tablist) => {
        const tablistStyles = window.getComputedStyle($tablist[0]);
        const tablistData = {
          tagName: $tablist[0].tagName,
          classes: $tablist[0].className,
          computedStyles: {
            display: tablistStyles.display,
            flexDirection: tablistStyles.flexDirection,
            flexWrap: tablistStyles.flexWrap,
            gap: tablistStyles.gap,
            padding: tablistStyles.padding,
            margin: tablistStyles.margin,
            overflowX: tablistStyles.overflowX,
            width: tablistStyles.width,
          },
          boundingRect: $tablist[0].getBoundingClientRect(),
        };

        writeFileSync(
          join(dumpDir, '02-tablist-computed-styles.json'),
          JSON.stringify(tablistData, null, 2)
        );

        // Get all CSS rules affecting tablist
        const allRules: any[] = [];
        for (const sheet of Array.from(document.styleSheets)) {
          try {
            const rules = Array.from(sheet.cssRules || []);
            rules.forEach((rule: any) => {
              if (rule.selectorText && $tablist[0].matches(rule.selectorText)) {
                allRules.push({
                  selector: rule.selectorText,
                  cssText: rule.cssText,
                  specificity: rule.selectorText.split(/\s+/).length,
                });
              }
            });
          } catch (e) {
            // Cross-origin or protected stylesheet
          }
        }

        writeFileSync(
          join(dumpDir, '03-tablist-matching-css-rules.json'),
          JSON.stringify(allRules, null, 2)
        );
      });

      // 3. Inspect each individual tab button
      cy.get('[data-testid="widget-security-summary"] [role="tab"]').each(($tab, index) => {
        const tabStyles = window.getComputedStyle($tab[0]);
        const tabData = {
          index,
          text: $tab.text(),
          classes: $tab[0].className,
          ariaSelected: $tab.attr('aria-selected'),
          computedStyles: {
            display: tabStyles.display,
            padding: tabStyles.padding,
            margin: tabStyles.margin,
            fontSize: tabStyles.fontSize,
            fontWeight: tabStyles.fontWeight,
            border: tabStyles.border,
            backgroundColor: tabStyles.backgroundColor,
            color: tabStyles.color,
          },
          boundingRect: $tab[0].getBoundingClientRect(),
        };

        writeFileSync(
          join(dumpDir, `04-tab-button-${index}.json`),
          JSON.stringify(tabData, null, 2)
        );
      });

      // 4. Inspect Overview tab panel (the one with radar chart)
      cy.get('[data-testid="widget-security-summary"] [role="tabpanel"]:visible').first().then(($panel) => {
        const panelStyles = window.getComputedStyle($panel[0]);
        const panelData = {
          tagName: $panel[0].tagName,
          classes: $panel[0].className,
          computedStyles: {
            display: panelStyles.display,
            padding: panelStyles.padding,
            paddingTop: panelStyles.paddingTop,
            paddingBottom: panelStyles.paddingBottom,
            paddingLeft: panelStyles.paddingLeft,
            paddingRight: panelStyles.paddingRight,
            margin: panelStyles.margin,
            height: panelStyles.height,
            overflow: panelStyles.overflow,
          },
          boundingRect: $panel[0].getBoundingClientRect(),
          children: Array.from($panel[0].children).map((child: any) => ({
            tagName: child.tagName,
            className: child.className,
            offsetHeight: child.offsetHeight,
          })),
        };

        writeFileSync(
          join(dumpDir, '05-overview-tabpanel.json'),
          JSON.stringify(panelData, null, 2)
        );
      });

      // 5. Deep inspect radar chart container
      cy.get('[data-testid="widget-security-summary"] .radar-chart-container').then(($chart) => {
        const chartStyles = window.getComputedStyle($chart[0]);
        const chartData = {
          tagName: $chart[0].tagName,
          classes: $chart[0].className,
          computedStyles: {
            display: chartStyles.display,
            height: chartStyles.height,
            maxHeight: chartStyles.maxHeight,
            minHeight: chartStyles.minHeight,
            width: chartStyles.width,
            padding: chartStyles.padding,
            margin: chartStyles.margin,
            overflow: chartStyles.overflow,
          },
          boundingRect: $chart[0].getBoundingClientRect(),
          canvas: {
            exists: $chart.find('canvas').length > 0,
            width: $chart.find('canvas').attr('width'),
            height: $chart.find('canvas').attr('height'),
            actualHeight: $chart.find('canvas')[0]?.offsetHeight,
          },
        };

        writeFileSync(
          join(dumpDir, '06-radar-chart-container.json'),
          JSON.stringify(chartData, null, 2)
        );
      });

      // 6. Inspect all direct children of Overview tab panel
      cy.get('[data-testid="widget-security-summary"] [role="tabpanel"]:visible').first().children().each(($child, index) => {
        const childStyles = window.getComputedStyle($child[0]);
        const childData = {
          index,
          tagName: $child[0].tagName,
          classes: $child[0].className,
          computedStyles: {
            display: childStyles.display,
            padding: childStyles.padding,
            margin: childStyles.margin,
            marginTop: childStyles.marginTop,
            marginBottom: childStyles.marginBottom,
            height: childStyles.height,
          },
          boundingRect: $child[0].getBoundingClientRect(),
          textContent: $child.text().substring(0, 100),
        };

        writeFileSync(
          join(dumpDir, `07-tabpanel-child-${index}.json`),
          JSON.stringify(childData, null, 2)
        );
      });

      // 7. Calculate total empty space
      cy.get('[data-testid="widget-security-summary"] [role="tabpanel"]:visible').first().then(($panel) => {
        const children = Array.from($panel[0].children);
        const totalHeight = $panel[0].offsetHeight;
        const childrenHeight = children.reduce((sum: number, child: any) => sum + child.offsetHeight, 0);
        const emptySpace = totalHeight - childrenHeight;

        const spaceAnalysis = {
          totalPanelHeight: totalHeight,
          totalChildrenHeight: childrenHeight,
          emptySpace,
          emptySpacePercentage: ((emptySpace / totalHeight) * 100).toFixed(2) + '%',
          childCount: children.length,
          averageChildHeight: (childrenHeight / children.length).toFixed(2),
        };

        writeFileSync(
          join(dumpDir, '08-empty-space-analysis.json'),
          JSON.stringify(spaceAnalysis, null, 2)
        );
      });

      // 8. Capture full SecuritySummary HTML
      cy.get('[data-testid="widget-security-summary"]').then(($widget) => {
        writeFileSync(
          join(dumpDir, '09-full-widget-html.html'),
          $widget[0].outerHTML
        );
      });

      // 9. Get inline styles from all elements
      cy.get('[data-testid="widget-security-summary"] *').then(($elements) => {
        const inlineStyles: any[] = [];
        $elements.each((index, el) => {
          const style = el.getAttribute('style');
          if (style) {
            inlineStyles.push({
              tagName: el.tagName,
              className: el.className,
              inlineStyle: style,
            });
          }
        });

        writeFileSync(
          join(dumpDir, '10-inline-styles.json'),
          JSON.stringify(inlineStyles, null, 2)
        );
      });
    });
  });

  it('Capture actual rendered screenshot for comparison', () => {
    cy.get('[data-testid="widget-security-summary"]').should('be.visible');
    cy.screenshot('security-summary-actual-render', {
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
  });
});
