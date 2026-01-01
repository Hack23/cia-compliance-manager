# Widget Test Consistency Update - Implementation Guide

## ✅ Completed (2/20 widgets)

### Updated Widgets:
1. **CostEstimationWidget** - 46 tests passing
2. **ValueCreationWidget** - 9 tests passing, 1 skipped

## 📋 Remaining Widgets (18/20)

### Business Value Widgets (1):
- [ ] `src/components/widgets/businessvalue/ComplianceStatusWidget.test.tsx`
  - Test ID constant: `COMPLIANCE_STATUS_WIDGET_IDS`
  - Expected patterns: compliance status, framework checks, gap analysis

### Impact Analysis Widgets (4):
- [ ] `src/components/widgets/impactanalysis/AvailabilityImpactWidget.test.tsx`
  - Test ID constant: `AVAILABILITY_IMPACT_WIDGET_IDS`
  - Expected patterns: uptime metrics, RTO/RPO, business continuity

- [ ] `src/components/widgets/impactanalysis/IntegrityImpactWidget.test.tsx`
  - Test ID constant: `INTEGRITY_IMPACT_WIDGET_IDS`
  - Expected patterns: data validation, audit trails, verification

- [ ] `src/components/widgets/impactanalysis/ConfidentialityImpactWidget.test.tsx`
  - Test ID constant: `CONFIDENTIALITY_IMPACT_WIDGET_IDS`
  - Expected patterns: encryption, access control, data classification

- [ ] `src/components/widgets/impactanalysis/ImpactWidget.test.tsx`
  - Test ID constant: Check testIds.ts for appropriate constant
  - Expected patterns: combined impact analysis, risk assessment

### Assessment Center Widgets (7):
- [ ] `src/components/widgets/assessmentcenter/SecuritySummaryWidget.test.tsx`
  - Test ID constant: `SECURITY_SUMMARY_WIDGET_IDS`
  - Expected patterns: overall security level, CIA ratings, recommendations

- [ ] `src/components/widgets/assessmentcenter/SecurityLevelWidget.test.tsx`
  - Test ID constant: `SECURITY_LEVEL_WIDGET_IDS`
  - Expected patterns: level selection, CIA components, indicators

- [ ] `src/components/widgets/assessmentcenter/BusinessImpactAnalysisWidget.test.tsx`
  - Test ID constant: `BUSINESS_IMPACT_WIDGET_IDS`
  - Expected patterns: impact categories, financial/operational/regulatory impacts

- [ ] `src/components/widgets/assessmentcenter/SecurityImplementationTab.test.tsx`
  - Test ID constant: Check testIds.ts
  - Expected patterns: implementation steps, technical details

- [ ] `src/components/widgets/assessmentcenter/SecurityBusinessTab.test.tsx`
  - Test ID constant: Check testIds.ts
  - Expected patterns: business considerations, ROI, value creation

- [ ] `src/components/widgets/assessmentcenter/SecurityComplianceTab.test.tsx`
  - Test ID constant: Check testIds.ts
  - Expected patterns: compliance status, frameworks, requirements

- [ ] `src/components/widgets/assessmentcenter/SecurityOverviewTab.test.tsx`
  - Test ID constant: Check testIds.ts
  - Expected patterns: overview summary, key metrics, highlights

### Implementation Guide Widgets (5):
- [ ] `src/components/widgets/implementationguide/SecurityResourcesWidget.test.tsx`
  - Test ID constant: `SECURITY_RESOURCES_WIDGET_IDS`
  - Expected patterns: resource lists, categories, links

- [ ] `src/components/widgets/implementationguide/SecurityVisualizationWidget.test.tsx`
  - Test ID constant: `SECURITY_VISUALIZATION_WIDGET_IDS`
  - Expected patterns: charts, radar diagrams, visual representations

- [ ] `src/components/widgets/implementationguide/SecurityVisualizationWidget.enhanced.test.tsx`
  - Test ID constant: `SECURITY_VISUALIZATION_WIDGET_IDS`
  - Expected patterns: enhanced visualizations, interactive elements

- [ ] `src/components/widgets/implementationguide/CIAComponentDetails.test.tsx`
  - Test ID constant: Check testIds.ts
  - Expected patterns: CIA component details, technical specs

- [ ] `src/components/widgets/implementationguide/TechnicalDetailsWidget.test.tsx`
  - Test ID constant: `TECHNICAL_DETAILS_WIDGET_IDS`
  - Expected patterns: implementation steps, code examples, configurations

### Other (1):
- [ ] `src/components/widgets/__tests__/widget-error-boundaries.test.tsx`
  - Test ID constant: N/A (error boundary tests)
  - Expected patterns: error handling, error recovery, fallback UI

## 🔧 Implementation Steps for Each Widget

### 1. Update Imports
```typescript
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WIDGET_NAME_IDS } from "../../../constants/testIds";
import { mockWidgetProps, mockHighSecurityProps, mockLowSecurityProps } from "../../../utils/testUtils";
import WidgetName from "./WidgetName";
```

### 2. Update Default Props
```typescript
describe("WidgetName", () => {
  const defaultProps = {
    ...mockWidgetProps,
    testId: WIDGET_NAME_IDS.root,
  };
```

### 3. Organize Tests with Describe Blocks
```typescript
  describe('Rendering', () => {
    it("should render with required props", () => { /* ... */ });
    it('should apply custom className', () => { /* ... */ });
    it('should use custom testId', () => { /* ... */ });
  });

  describe('Data Display', () => {
    // Widget-specific content tests
  });

  describe('Accessibility', () => {
    it('should render with proper ARIA attributes', () => {
      render(<WidgetName {...defaultProps} />);
      
      const widgetContainer = screen.getByTestId(`widget-container-${WIDGET_NAME_IDS.root}`);
      expect(widgetContainer).toBeInTheDocument();
      
      // Verify basic accessibility attributes
      expect(widgetContainer).toHaveAttribute('role', 'region');
      expect(widgetContainer).toHaveAttribute('aria-label');
    });
  });

  describe('Edge Cases', () => {
    it("should handle None security level", () => { /* ... */ });
    it("should handle Very High security level", () => { /* ... */ });
    it("should handle mixed security levels", () => { /* ... */ });
  });
});
```

### 4. Replace Hardcoded Test IDs
- Search for hardcoded strings like `"widget-something"` or `'widget-something'`
- Replace with constants from `testIds.ts`: `WIDGET_NAME_IDS.root`
- Use appropriate sub-properties: `.section()`, `.button()`, `.value()`, etc.

### 5. Run Tests
```bash
npm run test -- src/components/widgets/path/to/Widget.test.tsx --run
```

### 6. Handle Accessibility Issues
If accessibility tests fail:
- Document the issue in a comment
- Use `.skip()` to skip the test temporarily
- Create a follow-up issue for component fixes
- Example:
```typescript
it.skip('should have no accessibility violations - KNOWN ISSUE: heading-order', async () => {
  // Known issue: Component needs heading structure fix
  await testAccessibility(container, 'WidgetName');
});
```

## 🧪 Test Utilities Available

### Mock Data
- `mockWidgetProps` - Standard Moderate security levels
- `mockLowSecurityProps` - All Low security levels
- `mockHighSecurityProps` - All High security levels
- `mockVeryHighSecurityProps` - All Very High security levels
- `mockMixedSecurityProps` - Mixed security levels

### Helper Functions
- `renderWidget(ui, options)` - Custom render with providers
- `waitForWidgetLoad(testId)` - Wait for loading to complete
- `waitForWidgetContent(testId)` - Wait for content to appear
- `waitForWidgetError(testId)` - Wait for error state
- `expectCustomClassName(testId, className)` - Check className
- `expectCustomTestId(testId)` - Check custom testId

### Accessibility Testing
**Note:** Automated accessibility testing with axe-core has been removed due to license compliance requirements.

**Current Approach:**
- Focus on basic ARIA and semantic validation within each widget test file
- Prefer `getByRole` (with the `name` option) and other accessible queries over test ID-based queries when possible
- Assert key ARIA attributes directly (e.g., `role`, `aria-label`, `aria-labelledby`, `aria-describedby`) using standard Jest DOM matchers
- Document notable accessibility findings in test descriptions

## 📊 Progress Tracking

### Current Status:
- **Completed:** 2/20 widgets (10%)
- **Remaining:** 18/20 widgets (90%)
- **Test Results:** 2407 passing, 2 skipped
- **Test Execution Time:** 59 seconds

### Success Criteria:
- [ ] All 20 widget tests use test ID constants (currently 10%)
- [ ] All widgets have accessibility tests (currently 10%)
- [ ] All widgets follow AAA pattern (currently 10%)
- [ ] Test coverage ≥ 80% line, 70% branch (needs verification)
- [ ] Test execution time < 60 seconds ✅
- [ ] Zero hardcoded test ID strings (20% complete)

## 🎯 Next Widget to Update

**Recommended Order (Simplest First):**
1. ComplianceStatusWidget - Similar to ValueCreationWidget
2. SecurityLevelWidget - Core widget, well-tested
3. SecuritySummaryWidget - Comprehensive but straightforward
4. Impact widgets (Availability, Integrity, Confidentiality) - Similar patterns
5. Technical widgets - More complex, tackle later

## 📝 Notes

- Always run the full test suite after updates: `npm run test --run`
- Check test execution time stays under 60 seconds
- Document any new accessibility issues discovered
- Keep test descriptions clear and following AAA pattern
- Use TypeScript strict mode - no `any` types
- Reuse test utilities - don't create new mocks unnecessarily

## 🔗 References

- Test utilities: `src/utils/testUtils.tsx`
- Accessibility checks: use manual testing and approved tools (automated accessibility test utilities have been removed)
- Test ID constants: `src/constants/testIds.ts`
- Example widgets: 
  - `src/components/widgets/businessvalue/CostEstimationWidget.test.tsx` (45 tests)
  - `src/components/widgets/businessvalue/ValueCreationWidget.test.tsx` (9 tests)
