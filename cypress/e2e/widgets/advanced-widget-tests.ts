import { SECURITY_LEVELS } from "../../support/constants";

/**
 * Advanced widget testing utilities with a focus on security levels
 */

/**
 * Tests a widget with all possible security level combinations to ensure robustness
 * @param widgetName The name or ID of the widget to test
 * @param skipCombinations Optional combinations to skip (as array of [avail, integ, conf])
 */
export function testAllSecurityLevelCombinations(
  widgetName: string,
  skipCombinations: string[][] = []
) {
  it(`handles all security level combinations for ${widgetName} widget`, () => {
    cy.findWidget(widgetName).scrollIntoView();

    const levels = [
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
    ];

    // Track which combinations we've tested
    const testedCombinations: string[] = [];

    // Test each combination
    levels.forEach((avail) => {
      levels.forEach((integ) => {
        levels.forEach((conf) => {
          // Skip if in the skip list
          const skipThis = skipCombinations.some(
            (combo) =>
              combo[0] === avail && combo[1] === integ && combo[2] === conf
          );

          if (skipThis) {
            cy.log(`Skipping combination: ${avail}, ${integ}, ${conf}`);
            return;
          }

          // Set security levels
          cy.setSecurityLevels(avail, integ, conf);
          cy.wait(300); // Ensure UI updates

          // Verify widget still exists and is not broken
          cy.findWidget(widgetName)
            .should("exist")
            .should("be.visible")
            .then(($widget) => {
              // Ensure widget has content
              expect($widget.text().trim().length).to.be.greaterThan(0);
            });

          // Track this combination as tested
          testedCombinations.push(`${avail}-${integ}-${conf}`);
        });
      });
    });

    // Log summary
    cy.log(
      `Successfully tested ${testedCombinations.length} security level combinations`
    );
  });
}

/**
 * Tests that a widget properly handles security level transitions
 * @param widgetName The name or ID of the widget to test
 */
export function testSecurityLevelTransitions(widgetName: string) {
  it(`handles security level transitions smoothly for ${widgetName} widget`, () => {
    cy.findWidget(widgetName).scrollIntoView();

    // Test rapid transitions between security levels
    const transitionSequence = [
      [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
      [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
      [
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.MODERATE,
      ],
      [SECURITY_LEVELS.LOW, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.MODERATE],
    ];

    transitionSequence.forEach(([avail, integ, conf], index) => {
      cy.log(`Testing transition ${index + 1}: ${avail}, ${integ}, ${conf}`);

      // Set security levels
      cy.setSecurityLevels(avail, integ, conf);
      cy.wait(100); // Shorter wait for rapid transitions

      // Verify widget still exists after each transition
      cy.findWidget(widgetName).should("exist");
    });

    // Final verification that widget is still functioning
    cy.findWidget(widgetName)
      .should("be.visible")
      .invoke("text")
      .should("not.be.empty");
  });
}

export default {
  testAllSecurityLevelCombinations,
  testSecurityLevelTransitions,
};
