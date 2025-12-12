[**CIA Compliance Manager Diagrams v1.0.3**](../README.md)

***

[CIA Compliance Manager Diagrams](../modules.md) / hooks

# hooks

# React Hooks Module

This module exports all custom hooks used throughout the CIA Compliance Manager.

## Business Perspective
Custom hooks encapsulate business logic and security assessment functionality,
enabling consistent behavior across the application. 🔄

## Technical Perspective
Centralized hook exports simplify imports and promote hook reuse.

## Interfaces

- [MetricFormatters](interfaces/MetricFormatters.md)
- [MetricFormattingOptions](interfaces/MetricFormattingOptions.md)
- [SecurityLevelState](interfaces/SecurityLevelState.md)
- [ServiceDataState](interfaces/ServiceDataState.md)
- [UseSecurityLevelStateReturn](interfaces/UseSecurityLevelStateReturn.md)

## Type Aliases

- [Breakpoint](type-aliases/Breakpoint.md)

## Functions

- [useBusinessImpact](functions/useBusinessImpact.md)
- [useComponentDetails](functions/useComponentDetails.md)
- [useFormattedMetrics](functions/useFormattedMetrics.md)
- [useLocalStorage](functions/useLocalStorage.md)
- [useResponsiveBreakpoint](functions/useResponsiveBreakpoint.md)
- [useSecurityLevelState](functions/useSecurityLevelState.md)
- [useServiceData](functions/useServiceData.md)

## References

### useCIAContentService

Re-exports [useCIAContentService](useCIAContentService/functions/useCIAContentService.md)

***

### useCIAOptions

Re-exports [useCIAOptions](useCIAOptions/functions/useCIAOptions.md)

***

### useComplianceService

Re-exports [useComplianceService](useComplianceService/functions/useComplianceService.md)

***

### useSecurityMetricsService

Re-exports [useSecurityMetricsService](useSecurityMetricsService/functions/useSecurityMetricsService.md)
