# Cypress Test Selectors

Centralized test ID selectors for all widgets in the CIA Compliance Manager.

## Overview

This file provides type-safe, centralized selectors that map directly to the test IDs defined in `src/constants/testIds.ts`. This ensures consistency between component test IDs and E2E test selectors.

## Usage

### Basic Usage

```typescript
import { costEstimationWidget, securityLevelWidget } from './support/selectors';

describe('My Test', () => {
  it('should find widget elements', () => {
    // Use predefined selectors
    cy.get(costEstimationWidget.root).should('be.visible');
    cy.get(costEstimationWidget.capex).should('contain', '$');
    cy.get(securityLevelWidget.availabilitySelect).select('High');
  });
});
```

### Available Widgets

All widget selectors follow a consistent structure:

```typescript
{
  root: string;           // Main widget container
  // ... widget-specific elements
}
```

#### Assessment Center Widgets
- `securityLevelWidget` - Security level selection controls
- `securitySummaryWidget` - Security posture summary
- `businessImpactWidget` - Business impact analysis

#### Business Value Widgets
- `costEstimationWidget` - Cost estimation (CAPEX/OPEX)
- `valueCreationWidget` - Value creation and ROI
- `complianceStatusWidget` - Compliance framework status

#### Impact Analysis Widgets
- `availabilityImpactWidget` - Availability impact details
- `integrityImpactWidget` - Integrity impact details
- `confidentialityImpactWidget` - Confidentiality impact details

#### Implementation Widgets
- `technicalDetailsWidget` - Technical implementation details
- `securityResourcesWidget` - Security resources and guidance
- `securityVisualizationWidget` - Security visualization (radar chart)

### Helper Functions

#### `getByTestId(testId: string)`
Create a test ID selector.

```typescript
getByTestId('my-element')  // Returns: '[data-testid="my-element"]'
```

#### `widgetSelector(widgetName: string)`
Create a widget container selector.

```typescript
widgetSelector('cost-estimation')  // Returns: '[data-testid="widget-cost-estimation"]'
```

#### `widgetState`
Common widget state selectors.

```typescript
widgetState.loading('cost-estimation')  // Returns: '[data-testid="cost-estimation-loading"]'
widgetState.error('cost-estimation')    // Returns: '[data-testid="cost-estimation-error"]'
widgetState.content('cost-estimation')  // Returns: '[data-testid="cost-estimation-content"]'
```

### Widget Iteration

#### `allWidgets`
Object containing all widget selectors for iteration:

```typescript
import { allWidgets } from './support/selectors';

// Iterate through all widgets
Object.entries(allWidgets).forEach(([name, selectors]) => {
  cy.get(selectors.root).should('exist');
});
```

#### `allWidgets`
Object containing all widget selectors for iteration:

```typescript
import { allWidgets } from './support/selectors';

// Use specific widget selectors from allWidgets
Object.values(allWidgets).forEach(widget => {
  cy.get(widget.root).should('be.visible');
});
```

**Note**: The `widgetSelector()` helper function is deprecated for WidgetContainer-based widgets. Use specific widget selector objects instead.

## Examples

### Testing a Single Widget

```typescript
import { costEstimationWidget } from '../../support/selectors';

describe('Cost Estimation Widget', () => {
  it('should display cost elements', () => {
    cy.visit('/');
    cy.get(costEstimationWidget.root).should('be.visible');
    cy.get(costEstimationWidget.capex).should('exist');
    cy.get(costEstimationWidget.opex).should('exist');
    cy.get(costEstimationWidget.total).should('exist');
  });
});
```

### Testing Multiple Widgets

```typescript
import { allWidgets } from '../../support/selectors';

describe('All Widgets', () => {
  it('should render all widgets', () => {
    cy.visit('/');
    
    // Use specific widget selectors that account for WidgetContainer prefix
    Object.values(allWidgets).forEach(widget => {
      cy.get(widget.root).should('exist');
    });
  });
});
```

### Testing Widget Interactions

```typescript
import { securityLevelWidget, costEstimationWidget } from '../../support/selectors';

describe('Widget Interactions', () => {
  it('should update cost when security level changes', () => {
    cy.visit('/');
    
    // Change security level
    cy.get(securityLevelWidget.availabilitySelect).select('High');
    
    // Verify cost widget updates
    cy.get(costEstimationWidget.total)
      .should('not.contain', '$0');
  });
});
```

## Maintenance

### Adding New Selectors

When a new widget is added:

1. Import its test IDs from `src/constants/testIds.ts`
2. Create a selector object following the naming pattern
3. Add to `allWidgets` object
4. Add to `widgetNames` array
5. Export the new selector object

Example:

```typescript
import { NEW_WIDGET_TEST_IDS } from '../../src/constants/testIds';

export const newWidget = {
  root: getByTestId(NEW_WIDGET_TEST_IDS.WIDGET),
  element1: getByTestId(NEW_WIDGET_TEST_IDS.ELEMENT1),
  element2: getByTestId(NEW_WIDGET_TEST_IDS.ELEMENT2),
};

// Add to allWidgets
export const allWidgets = {
  // ... existing widgets
  'new-widget': newWidget,
};

// Add to widgetNames
export const widgetNames = [
  // ... existing names
  'new-widget',
] as const;
```

### Updating Selectors

When test IDs change in components:

1. Update the corresponding test ID constant in `src/constants/testIds.ts`
2. The selectors in this file will automatically use the new IDs
3. No changes needed in individual test files

This centralized approach ensures all tests stay in sync with component test IDs.

## Benefits

### Type Safety
TypeScript provides autocomplete and type checking for all selectors.

### Consistency
All tests use the same selectors, reducing duplication and errors.

### Maintainability
Single source of truth for test selectors. Update in one place.

### Discoverability
Easy to find available selectors for any widget.

### Refactoring Support
If test IDs change, update once and all tests stay working.

## Related Files

- `src/constants/testIds.ts` - Source of truth for test IDs
- `cypress/support/commands.ts` - Custom commands that use these selectors
- `docs/E2E-TESTING-GUIDE.md` - Complete E2E testing guide
- `cypress/e2e/integration/all-widgets.cy.ts` - Example integration test

## See Also

- [Enhanced E2E Testing Guide](../docs/E2E-TESTING-GUIDE.md)
- [E2E Test Plan](../docs/E2ETestPlan.md)
- [Widget Testing Template](./widget-testing-template.ts)
