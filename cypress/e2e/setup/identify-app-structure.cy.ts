/**
 * Application Structure Identification
 *
 * This test analyzes the current application structure to help
 * update test selectors and identify changes in the application.
 */

describe('Application Structure Identification', () => {
  before(() => {
    cy.visit('/');
    cy.ensureAppLoaded();
  });

  it('identifies current test IDs in the application', () => {
    cy.get('[data-testid]').then($elements => {
      const testIds = Array.from($elements).map(el => el.getAttribute('data-testid'));
      cy.log(`Found ${testIds.length} elements with data-testid attributes`);
      
      // Group test IDs by prefix for better organization
      const testIdGroups = testIds.reduce((acc, id) => {
        if (!id) return acc;
        
        const prefix = id.split('-')[0];
        if (!acc[prefix]) acc[prefix] = [];
        acc[prefix].push(id);
        return acc;
      }, {});
      
      // Log all test ID groups
      cy.log('Test ID groups found in application:');
      Object.entries(testIdGroups).forEach(([prefix, ids]) => {
        cy.log(`Group "${prefix}": ${ids.length} elements`);
        ids.slice(0, 5).forEach(id => cy.log(`  - ${id}`));
        if (ids.length > 5) cy.log(`  - (${ids.length - 5} more...)`);
      });
      
      // Look specifically for security level controls
      const securityControls = testIds.filter(id => 
        id && (id.includes('security') || id.includes('level'))
      );
      
      cy.log('Potential security control test IDs:');
      securityControls.forEach(id => cy.log(`  - ${id}`));
      
      // Check for widget test IDs
      const widgetIds = testIds.filter(id => 
        id && (id.includes('widget') || id.includes('container'))
      );
      
      cy.log('Widget-related test IDs:');
      widgetIds.forEach(id => cy.log(`  - ${id}`));
    });
  });
  
  it('identifies form structure for security level controls', () => {
    // Look for select elements that might be security controls
    cy.get('select').then($selects => {
      cy.log(`Found ${$selects.length} select elements`);
      
      $selects.each((i, el) => {
        const $el = Cypress.$(el);
        const id = $el.attr('id') || 'no-id';
        const name = $el.attr('name') || 'no-name';
        const options = Array.from($el.find('option')).map(opt => opt.textContent);
        const testId = $el.attr('data-testid') || 'no-testid';
        
        cy.log(`Select #${i+1}: id="${id}", name="${name}", data-testid="${testId}"`);
        cy.log(`  Options: ${options.join(', ')}`);
      });
    });
  });
  
  it('creates a test ID map for widget elements', () => {
    // Find all potential widget containers
    cy.get('[data-testid*="widget"], [class*="widget"], [class*="container"]').then($widgets => {
      cy.log(`Found ${$widgets.length} potential widget elements`);
      
      const widgetMap = {};
      
      $widgets.each((i, el) => {
        const $el = Cypress.$(el);
        const testId = $el.attr('data-testid') || 'no-testid';
        const className = $el.attr('class') || 'no-class';
        const heading = $el.find('h1, h2, h3, h4, h5, h6').first().text() || 'no-heading';
        
        widgetMap[`widget-${i+1}`] = {
          testId,
          className,
          heading
        };
        
        cy.log(`Widget #${i+1}: "${heading}"`);
        cy.log(`  data-testid: "${testId}"`);
        cy.log(`  class: "${className}"`);
      });
      
      // Write widget map to console for easy reference
      cy.task('writeFile', {
        path: 'cypress/results/widget-map.json',
        content: JSON.stringify(widgetMap, null, 2)
      });
    });
  });
});
