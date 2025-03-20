# Security Level Standardization

## Overview

This document outlines the standardized approach to security levels in the CIA Compliance Manager application. All widgets and components that deal with security levels now use a consistent representation and default values.

## Default Security Level

The default security level throughout the application is now set to **"Moderate"** for all CIA triad components:

- Availability: Moderate
- Integrity: Moderate
- Confidentiality: Moderate

This provides a realistic starting point for security assessments, rather than the previous default of "None" which represented an unsecured state.

## Implementation Details

### Component Props

All widgets that accept security levels use a consistent props interface:

```typescript
interface WithSecurityLevelProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  
  // Optional handlers for changes
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
}
```

### State Management

For components that need to maintain local state synchronized with incoming props, we use either:

1. The `withSecurityLevelState` Higher-Order Component (HOC)
2. The `useSecurityLevelSync` hook

Both approaches ensure proper synchronization between prop changes and local state.

### Widget Registry

The widget registry now consistently applies the "Moderate" security level as the default for all registered widgets.

## Benefits

This standardization provides:

1. **Consistent User Experience**: Users see a realistic security baseline when first interacting with the application.
2. **Reduced Development Errors**: Standardized props and state management reduce bugs related to security level handling.
3. **Simplified Testing**: Tests can rely on a standard security level without having to specify it for each test case.
4. **Better Risk Assessment**: Starting from a moderate baseline better represents real-world security postures.

## Migration Guide

When creating new widgets that deal with security levels:

1. Use the `SecurityWidgetProps` type from `types/widget-props.ts` for props
2. Apply the `withSecurityLevelState` HOC for state management or use the `useSecurityLevelSync` hook
3. Use the standardized components like `SecurityLevelBadge` for UI representation
4. Ensure proper prop drilling of all security levels, not just the primary one for the widget
5. Always handle prop changes correctly by synchronizing local state
