# Enhanced E2E Testing Guide

## Overview

This document describes the enhanced E2E testing infrastructure added after widget refactoring. These improvements provide better test reliability, maintainability, and coverage.

## Critical: Understanding WidgetContainer Test ID Pattern

**Most widgets in this application use the `WidgetContainer` component**, which automatically prefixes all test IDs with `widget-container-`. This is crucial to understand when writing E2E tests.

### How WidgetContainer Affects Test IDs

When a widget uses `WidgetContainer` and passes a `testId` prop:

```typescript
// In the widget component:
<WidgetContainer testId="cost-estimation-widget">
  {/* widget content */}
</WidgetContainer>
```

The actual DOM element will have: `data-testid="widget-container-cost-estimation-widget"`

**NOT**: `data-testid="cost-estimation-widget"`

### Widget Test ID Patterns

| Widget | Default testId | Actual DOM test ID |
|--------|---------------|-------------------|
| SecurityLevelWidget | `security-level-widget` | `widget-container-security-level-widget` |
| CostEstimationWidget | `cost-estimation-widget` | `widget-container-cost-estimation-widget` |
| SecuritySummaryWidget | `security-summary-widget` | `widget-container-security-summary-widget` |
| AvailabilityImpactWidget | `widget-widget-availability-impact` | `widget-container-widget-widget-availability-impact` |
| IntegrityImpactWidget | `widget-integrity-impact` | `widget-container-widget-integrity-impact` |
| ConfidentialityImpactWidget | `widget-confidentiality-impact` | `widget-container-widget-confidentiality-impact` |
| SecurityVisualizationWidget | `security-visualization-widget` | `widget-container-security-visualization-widget` |

**Important**: 
- **Widget selector objects** (e.g., `costEstimationWidget.root`, `securityLevelWidget.root`) exported from `cypress/support/selectors.ts` already include the full, prefixed `data-testid` value (e.g., `widget-container-cost-estimation-widget`).
- **Cypress helper commands** (e.g., `waitForWidget`, `testWidgetError`, `verifyWidgetContent`) expect the widget's base `testId` prop value (e.g., `cost-estimation-widget`) and apply the `widget-container-` prefix internally.
- Always use these centralized selectors and helper commands rather than constructing test IDs manually.

## New Infrastructure

### 1. Centralized Selectors (`cypress/support/selectors.ts`)

**Purpose**: Provide a single source of truth for test selectors that map directly to component test IDs.

**Benefits**:
- No hardcoded test IDs in tests
- Type-safe selectors with TypeScript
- Easy to update if test IDs change
- Consistent selector patterns across all tests

**Usage**:
```typescript
import { costEstimationWidget, securityLevelWidget } from '../../support/selectors';

// Use in tests
cy.get(costEstimationWidget.root).should('be.visible');
cy.get(securityLevelWidget.availabilitySelect).select('High');
```

**Available Selector Objects**:
- `securityLevelWidget` - Security level controls
- `costEstimationWidget` - Cost estimation elements
- `securitySummaryWidget` - Security summary elements
- `valueCreationWidget` - Value creation elements
- `complianceStatusWidget` - Compliance status elements
- `businessImpactWidget` - Business impact elements
- `technicalDetailsWidget` - Technical details elements
- `securityResourcesWidget` - Security resources elements
- `availabilityImpactWidget` - Availability impact elements
- `integrityImpactWidget` - Integrity impact elements
- `confidentialityImpactWidget` - Confidentiality impact elements
- `securityVisualizationWidget` - Radar chart/visualization elements

### 2. Enhanced Custom Commands (`cypress/support/commands.ts`)

**New Commands**:

#### `waitForWidget(testId: string)`
Wait for a widget to finish loading and be visible.

**Note**: Pass the widget's actual testId prop value (e.g., `'cost-estimation-widget'`), not a prefixed version. The command automatically handles the WidgetContainer prefix pattern.

```typescript
cy.waitForWidget('cost-estimation-widget');
```

#### `testWidgetError(testId: string)`
Check for error states in widgets (helpful for validation).

**Note**: Pass the widget's actual testId prop value.

```typescript
cy.testWidgetError('cost-estimation-widget');
```

#### `testTabNavigation(containerSelector: string, tabCount: number)`
Test keyboard navigation for accessible tabs (arrow keys, Home, End).

```typescript
cy.testTabNavigation('[data-testid="security-summary-tabs"]', 4);
```

#### `testResponsiveLayout(viewports: string[])`
Test widget rendering across multiple viewports.

```typescript
cy.testResponsiveLayout(['iphone-x', 'ipad-2', 'macbook-15']);
```

#### `checkA11y()`
Perform basic accessibility checks (ARIA attributes, labels, etc.).

```typescript
cy.checkA11y();
```

#### `verifyWidgetContent(testId: string, expectedContent: string[])`
Verify widget contains expected content.

**Note**: Pass the widget's actual testId prop value.

```typescript
cy.verifyWidgetContent('cost-estimation-widget', ['CAPEX', 'OPEX', 'Total']);
```

## Test Patterns

### 1. Enhanced Widget Tests

**Structure**:
```typescript
describe('Widget Name - Enhanced', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForWidget('actual-widget-testid'); // Use widget's actual testId prop
  });

  describe('Rendering', () => {
    // Test widget displays correctly
  });

  describe('Interactions', () => {
    // Test user interactions
  });

  describe('Error Handling', () => {
    // Test error states
  });

  describe('Loading States', () => {
    // Test loading indicators
  });

  describe('Responsive Design', () => {
    // Test different viewports
  });

  describe('Accessibility', () => {
    // Test accessibility features
  });
});
```

### 2. Tab Navigation Tests

For widgets with tabs:

```typescript
it('should navigate tabs with keyboard', () => {
  cy.get('body').then($body => {
    const hasTabs = $body.find('[role="tab"]').length > 0;
    
    if (hasTabs) {
      cy.get('[role="tab"]').first().focus();
      cy.focused().type('{rightarrow}');
      cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true');
      
      cy.focused().type('{end}');
      cy.get('[role="tab"]').last().should('have.attr', 'aria-selected', 'true');
      
      cy.focused().type('{home}');
      cy.get('[role="tab"]').first().should('have.attr', 'aria-selected', 'true');
    }
  });
});
```

### 3. Responsive Design Tests

```typescript
describe('Responsive Design', () => {
  it('should adapt to mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(500);
    
    cy.get(widgetSelector).should('be.visible');
  });

  it('should adapt to tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(500);
    
    cy.get(widgetSelector).should('be.visible');
  });

  it('should display properly on desktop', () => {
    cy.viewport('macbook-15');
    cy.wait(500);
    
    cy.get(widgetSelector).should('be.visible');
  });
});
```

### 4. Integration Tests

Test all widgets together:

```typescript
describe('All Widgets Integration', () => {
  it('should render all essential widgets', () => {
    widgetNames.forEach(widget => {
      cy.get(widgetSelector(widget)).should('exist');
    });
  });

  it('should update all widgets when security levels change', () => {
    // Change levels
    cy.get(securityLevelWidget.availabilitySelect).select('High');
    
    // Verify widgets updated
    cy.get(securitySummaryWidget.root).should('contain', 'High');
  });
});
```

## Migration Guide

### Updating Existing Tests

1. **Import selectors instead of hardcoding**:
```typescript
// Before: What you see in the DOM
cy.get('[data-testid="widget-container-cost-estimation-widget"]')

// After: Use centralized selectors
import { costEstimationWidget } from '../../support/selectors';
cy.get(costEstimationWidget.root)
```

2. **Use custom commands**:
```typescript
// Before
cy.get('[data-testid="widget-container-cost-estimation-widget"]').should('exist');
cy.get('[data-testid="widget-container-loading-container-cost-estimation-widget"]').should('not.exist');

// After: Pass the widget's actual testId prop value
cy.waitForWidget('cost-estimation-widget');
```

3. **Add responsive tests**:
```typescript
describe('Responsive Design', () => {
  it('should work across viewports', () => {
    cy.testResponsiveLayout(['iphone-x', 'ipad-2', 'macbook-15']);
  });
});
```

4. **Add accessibility tests**:
```typescript
describe('Accessibility', () => {
  it('should pass basic accessibility checks', () => {
    cy.checkA11y();
  });
});
```

## Best Practices

### 1. Use Selectors Consistently
Always import and use selectors from `selectors.ts` rather than hardcoding test IDs.

### 2. Wait Appropriately
Use `cy.waitForWidget()` instead of arbitrary `cy.wait()` calls.

### 3. Test Conditional Elements
Always check if optional elements exist before testing them:

```typescript
cy.get('body').then($body => {
  if ($body.find(selector).length > 0) {
    cy.get(selector).should('be.visible');
  } else {
    cy.log('Element not found (may be conditional)');
  }
});
```

### 4. Test Tab Navigation
For any widget with tabs, test keyboard navigation:

```typescript
cy.testTabNavigation(containerSelector, tabCount);
```

### 5. Test Responsive Layouts
Always test mobile, tablet, and desktop viewports:

```typescript
cy.testResponsiveLayout(['iphone-x', 'ipad-2', 'macbook-15']);
```

### 6. Verify Accessibility
Include basic accessibility checks:

```typescript
cy.checkA11y();
```

## Examples

See these files for complete examples:
- `cypress/e2e/integration/all-widgets.cy.ts` - Comprehensive integration tests
- `cypress/e2e/widgets/businessvalue/cost-estimation-enhanced.cy.ts` - Enhanced widget test
- `cypress/e2e/widgets/assessmentcenter/security-summary-enhanced.cy.ts` - Tab navigation example

## Future Enhancements

### Planned Improvements
1. **cypress-axe Integration**: More comprehensive accessibility testing
2. **Visual Regression**: Screenshot comparison tests
3. **API Mocking**: Mock backend responses for error testing
4. **Component Testing**: Isolated component tests with Cypress

### Adding New Widgets

When adding a new widget:

1. Add selectors to `cypress/support/selectors.ts`:
```typescript
export const newWidget = {
  root: getByTestId(NEW_WIDGET_TEST_IDS.WIDGET),
  element1: getByTestId(NEW_WIDGET_TEST_IDS.ELEMENT1),
  // ...
};
```

2. Add to `allWidgets` object and `widgetNames` array

3. Create enhanced test file following the pattern

4. Add to integration tests

## Troubleshooting

### Widget Not Found
```typescript
// Check if widget exists before testing
cy.get('body').then($body => {
  if ($body.find(selector).length > 0) {
    // Test widget
  } else {
    cy.log('Widget not found, skipping test');
  }
});
```

### Flaky Tests
- Use `cy.waitForWidget()` instead of fixed waits
- Check for loading states to disappear
- Ensure proper wait times between interactions

### Tab Navigation Not Working
- Verify tabs have `role="tab"` attribute
- Check for `aria-selected` attribute
- Ensure tabs are focusable

## Summary

The enhanced E2E testing infrastructure provides:
- ✅ Centralized, type-safe selectors
- ✅ Reusable custom commands
- ✅ Consistent test patterns
- ✅ Better test reliability
- ✅ Improved maintainability
- ✅ Comprehensive integration tests
- ✅ Responsive design validation
- ✅ Basic accessibility checking
- ✅ Tab navigation testing

This foundation makes it easier to write reliable E2E tests and maintain them as the application evolves.
