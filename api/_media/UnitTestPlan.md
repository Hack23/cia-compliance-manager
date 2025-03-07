# CIA Compliance Manager Unit Test Plan

## Overview of Testing Infrastructure

The project uses Vitest with React Testing Library for component testing. The testing setup is comprehensive with proper configuration for a modern React application.

## TestIDs Structure and Purpose

The project uses a centralized approach to test IDs through the `testIds.ts` file. This creates consistency and prevents hardcoded strings in tests.

### Key features of the testIds.ts structure:

- **Namespaced TestIDs**: Test IDs are organized by component type (e.g., `WIDGET_TEST_IDS`, `APP_TEST_IDS`, `CIA_TEST_IDS`)
- **Dynamic TestID Generation**: Helper functions like `createDynamicTestId` and `createCompoundTestId` enable generating test IDs for repeated components
- **Consistent Naming**: Following patterns like `component-name-purpose` (e.g., `cia-impact-summary-availability-level`)
- **Default Values**: Components often accept a `testId` prop with sensible defaults

```typescript
// Example of how testIds are structured
export const WIDGET_TEST_IDS = {
  VALUE_CREATION_TITLE: "value-creation-title",
  VALUE_CREATION_SUBTITLE: "value-creation-subtitle",
  VALUE_POINTS_LIST: "value-points-list",
  ROI_VALUE: "roi-value",
  ROI_SECTION: "roi-section",
};

// Example of dynamic test ID generators
export const createDynamicTestId = {
  valuePoint: (index: number) => `value-point-${index}`,
  framework: (index: number) => `framework-${index}`,
  option: (level: string) =>
    `option-${level.toLowerCase().replace(/\s+/g, "-")}`,
};
```

## Testing Strategy Overview

The testing strategy follows these core principles:

1. **Component Isolation**: Testing components in isolation with mocked dependencies
2. **Constant-Driven Validation**: Using centralized constants for test validation
3. **Test ID Selection**: Using testid attributes for reliable element selection
4. **Behavior Verification**: Validating component behavior rather than implementation

## Test Categories and Examples

### 1. Component Rendering Tests

Tests that verify components render correctly with different props and states.

| Test Type           | Real Example from Codebase                                                                                                                                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic Rendering     | `it("renders with default props", () => { render(<TechnicalDetailsWidget {...defaultProps} />); expect(screen.getByTestId("technical-details-widget")).toBeInTheDocument(); });`                                                                                                             |
| Prop Variations     | `` it("renders with different security levels", () => { render(<ValueCreationWidget securityLevel={SECURITY_LEVELS.HIGH} />); expect(screen.getByTestId(WIDGET_TEST_IDS.VALUE_CREATION_TITLE)).toHaveTextContent(`${SECURITY_LEVELS.HIGH} Value Creation`); }); ``                           |
| Conditional Content | `it("shows non-compliant status for None security level", () => { render(<ComplianceStatusWidget securityLevel={SECURITY_LEVELS.NONE} />); const statusBadge = screen.getByTestId(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE); expect(statusBadge).toHaveTextContent(/non-compliant/i); });` |

### 2. Component Interaction Tests

Tests that verify user interactions work correctly.

| Test Type         | Real Example from Codebase                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Click Events      | `it("expands technical section when clicked", async () => { const { getByTestId } = render(<TechnicalExpandedWrapper />); await userEvent.click(getByTestId("technical-section-toggle")); expect(getByTestId("technical-details")).toBeInTheDocument(); });`                      |
| Form Interactions | `it("handles changes correctly", () => { render(<Selection {...defaultProps} />); fireEvent.change(screen.getByTestId("availability-select"), { target: { value: "Moderate" } }); expect(defaultProps.onChange).toHaveBeenCalledWith("Moderate"); });`                            |
| Tab Switching     | `it("switches between tabs", async () => { render(<TechnicalDetailsWidget {...defaultProps} />); await userEvent.click(screen.getByTestId("integrity-tab")); expect(screen.getByTestId("technical-description")).toHaveTextContent("No redundancy or monitoring in place."); });` |

### 3. State Management Tests

Tests that verify component state changes correctly.

| Test Type     | Real Example from Codebase                                                                                                                                                                                                                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial State | `it("renders with initial security levels", () => { render(<SecurityLevelSelector initialAvailability={SECURITY_LEVELS.MODERATE} initialIntegrity={SECURITY_LEVELS.HIGH} initialConfidentiality={SECURITY_LEVELS.LOW} />); expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(SECURITY_LEVELS.MODERATE); });` |
| State Updates | `it("updates the radar chart when security levels change", async () => { render(<CIAClassificationApp />); expect(screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)).toHaveTextContent(SECURITY_LEVELS.NONE); });`                                                                                                        |
| Side Effects  | `it("handles updates to initial props", () => { const { rerender } = render(<SecurityLevelSelector initialAvailability="None" />); rerender(<SecurityLevelSelector initialAvailability="High" />); expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue("High"); });`                                           |

### 4. Data Integration Tests

Tests that verify components correctly integrate with data.

| Test Type            | Real Example from Codebase                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Data Display         | `it("calculates costs correctly for mixed security levels", () => { render(<CostEstimationWidget totalCapex={75} totalOpex={45} capexEstimate="$375000" opexEstimate="$90000" isSmallSolution={false} availabilityLevel={SECURITY_LEVELS.MODERATE} integrityLevel={SECURITY_LEVELS.LOW} confidentialityLevel={SECURITY_LEVELS.HIGH} availabilityOptions={mockOptions.availability} integrityOptions={mockOptions.integrity} confidentialityOptions={mockOptions.confidentiality} />); });` |
| Dynamic Content      | `it("displays compliant frameworks", () => { render(<ComplianceStatusWidget securityLevel={SECURITY_LEVELS.HIGH} />); const frameworksList = screen.getByTestId(FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST); expect(frameworksList).toBeInTheDocument(); });`                                                                                                                                                                                                                         |
| Data Transformations | `it("properly combines impact descriptions", () => { render(<CombinedBusinessImpactWidget availability="Moderate" integrity="Moderate" confidentiality="Moderate" availabilityOptions={mockOptions} integrityOptions={mockOptions} confidentialityOptions={mockOptions} />); });`                                                                                                                                                                                                          |

### 5. Visual and Accessibility Tests

Tests that verify UI appearance and accessibility.

| Test Type           | Real Example from Codebase                                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Color/Styling Tests | `it("shows risk levels with appropriate colors", async () => { render(<BusinessImpactAnalysisWidget category="Availability" level="High" options={availabilityOptions} />); });`                                         |
| Accessibility       | `it("maintains label-input association", () => { render(<Selection {...defaultProps} />); const select = screen.getByTestId("availability-select"); expect(select).toHaveAttribute("id", "availability-select"); });`    |
| ARIA Attributes     | `it("toggles between considerations and benefits tabs with correct ARIA attributes", async () => { render(<BusinessImpactAnalysisWidget category="Availability" level="Moderate" options={availabilityOptions} />); });` |

## Best Practices

Based on the codebase analysis, here are the recommended best practices for testing:

1. **Use Test IDs Consistently**: All components should expose test IDs, preferably using constants from `testIds.ts`

2. **Mock External Dependencies**: Use Vitest's mocking capabilities to isolate components from external dependencies

   ```typescript
   vi.mock("../hooks/useCIAOptions", () => ({
     useCIAOptions: () => ({
       availabilityOptions: mockOptions,
       integrityOptions: mockOptions,
       confidentialityOptions: mockOptions,
     }),
   }));
   ```

3. **Leverage Helper Functions**: Use test helper functions for common operations

   ```typescript
   const findImpactSummary = () => {
     return screen.getByTestId(
       BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY
     );
   };
   ```

4. **Test Edge Cases**: Include tests for error states, empty data, and boundary conditions

   ```typescript
   it("handles unknown security level", () => {
     render(<ComplianceStatusWidget securityLevel="Unknown" />);
     const statusBadge = screen.getByTestId(
       FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
     );
     expect(statusBadge).toHaveTextContent(/non-compliant/i);
   });
   ```

5. **Test Conditional Rendering**: Verify components render correctly under different conditions

   ```typescript
   it("shows empty state when no considerations or benefits exist", async () => {
     render(
       <BusinessImpactAnalysisWidget
         category="Availability"
         level="Custom"
         options={{}}
       />
     );
   });
   ```

6. **Group Related Tests**: Use `describe` blocks to organize tests logically

   ```typescript
   describe("Selection Component", () => {
     // Basic rendering tests

     describe("Accessibility", () => {
       // Accessibility-specific tests
     });

     describe("Option Handling", () => {
       // Option-related tests
     });
   });
   ```

These patterns establish a comprehensive and maintainable testing approach that focuses on component behavior while maintaining flexibility as the application evolves.
