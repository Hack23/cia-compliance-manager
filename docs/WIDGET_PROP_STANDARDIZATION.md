# Widget Prop Interface Standardization Guide

## Overview

This document describes the standardized widget prop interfaces introduced in v1.0 to ensure consistency, type safety, and maintainability across all widget components in the CIA Compliance Manager.

## Motivation

Prior to standardization, widget prop interfaces exhibited several inconsistencies:
- Some widgets defined props inline vs in type files
- Inconsistent naming conventions (`*Props`, `*Properties`, `I*Props`)
- Duplicate prop definitions across similar widgets
- Missing base prop interface for common widget props
- Inconsistent optional prop handling

The standardization effort addresses these issues while maintaining **zero breaking changes** to existing functionality.

## Base Prop Interfaces

### `BaseWidgetProps`

Foundation for all widget components with standard styling and testing capabilities.

```typescript
interface BaseWidgetProps {
  className?: string;
  testId?: string;
  onError?: (error: Error) => void;
}
```

**Usage:**
```typescript
interface MyCustomWidgetProps extends BaseWidgetProps {
  customProp: string;
}
```

### `AllCIAComponentsProps`

For widgets that display all three CIA components.

```typescript
interface AllCIAComponentsProps extends BaseWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}
```

**Usage:**
```typescript
interface MyComprehensiveWidgetProps extends AllCIAComponentsProps {
  showDetails?: boolean;
}
```

### `CIAComponentWidgetProps`

For widgets that display information for a single CIA component.

```typescript
interface CIAComponentWidgetProps extends BaseWidgetProps {
  component: CIAComponent;
  level: SecurityLevel;
}
```

### `SecurityLevelChangeWidgetProps`

For interactive widgets that allow security level changes.

```typescript
interface SecurityLevelChangeWidgetProps extends CIAComponentWidgetProps {
  onLevelChange: (level: SecurityLevel) => void;
  disabled?: boolean;
}
```

## Standardized Widget Prop Interfaces

### Assessment Center Widgets

#### `SecurityLevelWidgetProps`
```typescript
interface SecurityLevelWidgetProps extends AllCIAComponentsProps {
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
  showDetails?: boolean;
}
```

#### `SecuritySummaryWidgetProps`
```typescript
interface SecuritySummaryWidgetProps extends AllCIAComponentsProps {
  onLevelChange?: (component: CIAComponent, level: SecurityLevel) => void;
  defaultTab?: number;
}
```

#### `BusinessImpactAnalysisWidgetProps`
```typescript
interface BusinessImpactAnalysisWidgetProps extends AllCIAComponentsProps {
  organizationSize?: 'small' | 'medium' | 'large' | 'enterprise';
  industrySector?: string;
}
```

### Business Value Widgets

#### `CostEstimationWidgetProps`
```typescript
interface CostEstimationWidgetProps extends AllCIAComponentsProps {
  showBreakdown?: boolean;
  currency?: string;
  onCostCalculated?: (totalCost: number) => void;
}
```

#### `ComplianceStatusWidgetProps`
```typescript
interface ComplianceStatusWidgetProps extends AllCIAComponentsProps {
  frameworks?: string[];
  showRequirements?: boolean;
  industry?: string;
  region?: string;
}
```

#### `ValueCreationWidgetProps`
```typescript
interface ValueCreationWidgetProps extends AllCIAComponentsProps {
  timePeriod?: number; // in years
}
```

### Impact Analysis Widgets

#### `AvailabilityImpactWidgetProps`
```typescript
interface AvailabilityImpactWidgetProps extends BaseWidgetProps {
  level?: SecurityLevel; // @deprecated
  availabilityLevel: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  showTechnicalDetails?: boolean;
  showExtendedDetails?: boolean;
}
```

#### `IntegrityImpactWidgetProps`
```typescript
interface IntegrityImpactWidgetProps extends BaseWidgetProps {
  level?: SecurityLevel; // @deprecated
  availabilityLevel?: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  showComplianceMapping?: boolean;
  showExtendedDetails?: boolean;
}
```

#### `ConfidentialityImpactWidgetProps`
```typescript
interface ConfidentialityImpactWidgetProps extends BaseWidgetProps {
  level?: SecurityLevel; // @deprecated
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  showDataClassification?: boolean;
  showExtendedDetails?: boolean;
}
```

### Implementation Guide Widgets

#### `TechnicalDetailsWidgetProps`
```typescript
interface TechnicalDetailsWidgetProps extends AllCIAComponentsProps {
  showCodeExamples?: boolean;
}
```

#### `SecurityResourcesWidgetProps`
```typescript
interface SecurityResourcesWidgetProps extends AllCIAComponentsProps {
  category?: 'documentation' | 'tools' | 'frameworks' | 'all';
  filter?: string;
  maxItems?: number;
}
```

#### `SecurityVisualizationWidgetProps`
```typescript
interface SecurityVisualizationWidgetProps extends AllCIAComponentsProps {
  chartType?: 'radar' | 'bar' | 'line' | 'pie' | 'gauge';
  interactive?: boolean;
}
```

## Utility Types

### `CIALevelsOnly`
Extracts only the CIA level props.

```typescript
type CIALevelsOnly = Pick<
  AllCIAComponentsProps,
  'availabilityLevel' | 'integrityLevel' | 'confidentialityLevel'
>;
```

### `PartialCIALevels`
Makes all CIA levels optional.

```typescript
type PartialCIALevels = Partial<CIALevelsOnly>;
```

### `WidgetPropsWithLoading<T>`
Generic interface for widgets that load data asynchronously.

```typescript
interface WidgetPropsWithLoading<T> extends BaseWidgetProps {
  data: T | null;
  loading: boolean;
  error?: Error;
}
```

## Naming Conventions

### Established Pattern
- **Interface naming**: `{ComponentName}Props` (not `I*Props` or `*Properties`)
- **Component naming**: PascalCase (e.g., `SecurityLevelWidget`)
- **Prop naming**: camelCase (e.g., `availabilityLevel`, `onLevelChange`)

### Examples
✅ Good:
```typescript
interface SecurityLevelWidgetProps { /* ... */ }
interface BusinessImpactAnalysisWidgetProps { /* ... */ }
```

❌ Avoid:
```typescript
interface ISecurityLevelProps { /* ... */ }
interface SecurityLevelProperties { /* ... */ }
```

## Backward Compatibility

All standardized interfaces maintain **complete backward compatibility** with existing widget implementations:

1. **Existing interfaces remain valid**: Widget components can continue using their locally-defined prop interfaces
2. **Standardized interfaces are supersets**: They include all required props from existing interfaces plus optional enhancements
3. **No breaking changes**: All existing widget usage patterns continue to work

### Migration Path (Optional)

For new widgets or when refactoring existing ones:

1. Import standardized interface from `widget-props.ts` or `componentPropExports.ts`
2. Use the standardized interface directly or extend it
3. Remove local interface definition if it's redundant

**Before:**
```typescript
// In SecurityLevelWidget.tsx
interface SecurityLevelWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}
```

**After (optional migration):**
```typescript
// In SecurityLevelWidget.tsx
import { SecurityLevelWidgetProps } from '@/types/widget-props';
// Interface now imported, no local definition needed
```

## Best Practices

### 1. Always Use Explicit Types
❌ Avoid:
```typescript
const MyWidget = ({ level, className }) => { /* ... */ }
```

✅ Prefer:
```typescript
const MyWidget: React.FC<MyWidgetProps> = ({ level, className }) => { /* ... */ }
```

### 2. Document All Props with JSDoc
```typescript
interface MyWidgetProps extends BaseWidgetProps {
  /**
   * Security level for the component
   * @default 'Moderate'
   */
  level: SecurityLevel;
  
  /**
   * If true, displays detailed information
   * @default false
   */
  showDetails?: boolean;
}
```

### 3. Use Utility Types for Composition
```typescript
// Extract just the levels
type Levels = CIALevelsOnly;

// Make levels optional
type OptionalLevels = PartialCIALevels;

// Combine with other props
interface MyProps extends BaseWidgetProps, CIALevelsOnly {
  customProp: string;
}
```

### 4. Leverage Base Interfaces
Always extend appropriate base interfaces rather than duplicating common props:

✅ Good:
```typescript
interface MyWidgetProps extends AllCIAComponentsProps {
  customFeature?: boolean;
}
```

❌ Avoid:
```typescript
interface MyWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
  customFeature?: boolean;
}
```

## Type Safety Guidelines

### 1. No `any` Types
Always use explicit types or `unknown` if the type is truly uncertain.

### 2. Strict Optional Props
Use `?` for optional props consistently:
```typescript
interface Props {
  required: string;
  optional?: string;  // Use ?, not | undefined
}
```

### 3. Function Signatures
Always define complete function signatures:
```typescript
interface Props {
  // ❌ Avoid
  onChange?: Function;
  
  // ✅ Prefer
  onChange?: (level: SecurityLevel) => void;
}
```

## Export Pattern

All widget prop interfaces are centrally exported from:
- `src/types/widget-props.ts` (primary source)
- `src/types/componentPropExports.ts` (consolidated exports)

**Usage:**
```typescript
// Direct import
import { SecurityLevelWidgetProps } from '@/types/widget-props';

// Or from consolidated exports
import { SecurityLevelWidgetProps } from '@/types/componentPropExports';
```

## Testing Guidelines

When testing components with standardized props:

```typescript
import { SecurityLevelWidgetProps } from '@/types/widget-props';

describe('SecurityLevelWidget', () => {
  const defaultProps: SecurityLevelWidgetProps = {
    availabilityLevel: 'Moderate',
    integrityLevel: 'High',
    confidentialityLevel: 'Moderate',
    testId: 'test-widget'
  };

  it('renders with default props', () => {
    render(<SecurityLevelWidget {...defaultProps} />);
    expect(screen.getByTestId('test-widget')).toBeInTheDocument();
  });
});
```

## Related Resources

- [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Handbook - JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- Source files:
  - `src/types/widget-props.ts` - Standardized widget prop interfaces
  - `src/types/componentPropExports.ts` - Consolidated prop exports
  - `src/types/cia.ts` - Core CIA triad types
  - `src/types/widgets.ts` - General widget types

## Version History

- **v1.1.3** (2025-12-30): Props implementation standardization
  - ✅ Removed duplicate prop interface definitions from 10 widgets
  - ✅ All 12 standalone widgets now import props from `widget-props.ts`
  - ✅ Updated `SecurityResourcesWidgetProps` to include `limit` and `showTopResourcesOnly`
  - ✅ Verified TypeScript strict mode compliance (no `any` types)
  - ✅ All 2271 tests passing
  - ✅ Zero breaking changes to widget APIs
  - ✅ Tab components appropriately maintain local props

- **v1.0** (2025-11-19): Initial standardization
  - Created base prop interfaces
  - Standardized all widget prop interfaces
  - Added utility types
  - Maintained full backward compatibility

## Implementation Status (v1.1.3)

### ✅ Widgets Using Centralized Props

All standalone widgets have been migrated to use centralized prop definitions:

**Assessment Center (3 standalone widgets):**
- ✅ SecuritySummaryWidget
- ✅ SecurityLevelWidget  
- ✅ BusinessImpactAnalysisWidget
- Note: Tab components (SecurityOverviewTab, SecurityBusinessTab, SecurityComplianceTab, SecurityImplementationTab) use local props as they are internal helper components

**Business Value (3 widgets):**
- ✅ CostEstimationWidget
- ✅ ValueCreationWidget
- ✅ ComplianceStatusWidget

**Impact Analysis (3 widgets):**
- ✅ AvailabilityImpactWidget
- ✅ IntegrityImpactWidget
- ✅ ConfidentialityImpactWidget

**Implementation Guide (3 standalone widgets):**
- ✅ TechnicalDetailsWidget
- ✅ SecurityResourcesWidget
- ✅ SecurityVisualizationWidget
- Note: CIAComponentDetails is a helper component with local props (appropriate)

### Standardization Benefits

1. **Type Safety**: All widgets use strongly-typed interfaces with TypeScript strict mode
2. **Consistency**: Uniform prop naming and structure across all widgets
3. **Maintainability**: Single source of truth for widget prop definitions
4. **Reusability**: Base interfaces can be extended for custom widgets
5. **Documentation**: Centralized JSDoc documentation for all props
6. **Testing**: Consistent prop types make testing easier and more reliable
