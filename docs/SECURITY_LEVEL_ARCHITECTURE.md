# Security Level Architecture

## Overview

This document details the architecture and implementation patterns for handling security levels in the CIA Compliance Manager application. The application uses a standardized approach to ensure consistent handling of security levels across all components.

## Core Concepts

### 1. Security Level Types

Security levels are represented using a string union type:

```typescript
type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";
```

These levels apply to each component of the CIA triad (Confidentiality, Integrity, Availability) and are used throughout the application to represent security requirements and capabilities.

### 2. Default Values

All security levels default to "Moderate" unless explicitly overridden. This provides a realistic starting point for security assessments and ensures components always have a valid security level.

### 3. Standardized Props

All components that work with security levels use a standardized props interface:

```typescript
interface WithSecurityLevelProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
}
```

## Implementation Patterns

The application provides several implementation patterns for working with security levels:

### 1. Context-Based Global State

For application-wide security level management, use the `SecurityLevelContext`:

```tsx
import { SecurityLevelProvider, useSecurityLevelContext } from '../contexts/SecurityLevelContext';

// In your component:
const { availabilityLevel, setAvailabilityLevel } = useSecurityLevelContext();
```

### 2. HOC for Component State Management

For components that need to manage security level state internally:

```tsx
import withSecurityLevelState from '../hoc/withSecurityLevelState';

// Apply to your component:
export default withSecurityLevelState(MyComponent);
```

### 3. Custom Hooks for Local State

For fine-grained control, use these hooks:

- `useSecurityLevelSync`: Synchronizes component state with incoming props
- `useSecurityLevelState`: Combines global context with component-specific overrides

```tsx
import { useSecurityLevelSync } from '../hooks/useSecurityLevelSync';

// In your component:
const {
  availabilityLevel,
  setAvailabilityLevel
} = useSecurityLevelSync(props);
```

### 4. Utility Functions

The application provides utility functions for working with security levels:

```tsx
import {
  getSecurityLevelValue,
  getSecurityLevelFromValue,
  calculateOverallSecurityLevel
} from '../utils/securityLevelUtils';

// Convert a security level to a numeric value (0-4)
const value = getSecurityLevelValue("High"); // 3

// Calculate an overall security level
const overallLevel = calculateOverallSecurityLevel("High", "Moderate", "Low");
```

## UI Components

For displaying security levels consistently:

```tsx
import SecurityLevelBadge from '../components/common/SecurityLevelBadge';

// In your component:
<SecurityLevelBadge
  category="Availability"
  level={availabilityLevel}
  colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
  textClass="text-blue-800 dark:text-blue-300"
/>
```

## Testing

For testing components that use security levels:

```tsx
import { createSecurityLevelTestProps } from '../test/securityLevelTestUtils';

// Create test props
const props = createSecurityLevelTestProps({
  availabilityLevel: "High",
  testId: "test-widget"
});

// Render with these props
render(<MyComponent {...props} />);
```

## Data Flow Architecture

1. **Top-Down Flow**: Security levels flow from the `CIAClassificationApp` to the `Dashboard` to individual widgets
2. **Bottom-Up Flow**: Changes in widgets flow back up through change handlers to update application state
3. **Context Flow**: Security level context provides a global state that any component can access

## Advanced Patterns

### Hybrid State Management

Some components may need to combine global state with local overrides:

```tsx
// Use the global context
const context = useSecurityLevelContext();

// But allow local overrides
const effectiveLevel = props.availabilityLevel || context.availabilityLevel;
```

### Selective Updates

For performance optimization, components can selectively respond to changes:

```tsx
// Only respond to availability level changes
useEffect(() => {
  // Update component when availability level changes
}, [availabilityLevel]);
```

## Conclusion

By following these patterns consistently, the application maintains a coherent approach to security level management, ensuring components remain in sync and users experience consistent behavior throughout the application.
