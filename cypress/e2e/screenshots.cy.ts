describe('Widget Container Improvements - Visual Testing', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 10000 });
    cy.wait(2000);
  });

  it('should capture light mode screenshot', () => {
    cy.screenshot('app-light-mode', { 
      capture: 'fullPage',
      overwrite: true 
    });
  });

  it('should capture dark mode screenshot', () => {
    // Find and click the theme toggle button
    cy.contains('button', /Dark|Light/).click();
    cy.wait(1000);
    
    cy.screenshot('app-dark-mode', { 
      capture: 'fullPage',
      overwrite: true 
    });
  });
});
