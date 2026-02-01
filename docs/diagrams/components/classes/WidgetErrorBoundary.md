[**CIA Compliance Manager Diagrams v1.1.15**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [components](../README.md) / WidgetErrorBoundary

# Class: WidgetErrorBoundary

Defined in: [components/common/WidgetErrorBoundary.tsx:90](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/components/common/WidgetErrorBoundary.tsx#L90)

Error boundary component for wrapping widgets

## Business Perspective

Prevents widget failures from crashing the entire application, ensuring
users can continue working even when individual components encounter errors.
Critical for maintaining operational continuity and user trust. 🛡️

## Technical Perspective

React Error Boundary that catches JavaScript errors in child components,
logs them, and displays a fallback UI. Implements the error boundary
lifecycle methods to gracefully handle rendering errors.

Per React best practices, error boundaries catch errors during:
- Rendering
- Lifecycle methods
- Constructors of child components

They do NOT catch errors in:
- Event handlers (use try-catch)
- Asynchronous code (use try-catch)
- Server-side rendering
- Errors in the error boundary itself

## Example

```tsx
// Basic usage
<WidgetErrorBoundary>
  <SecurityMetricsWidget />
</WidgetErrorBoundary>

// With custom fallback
<WidgetErrorBoundary fallback={<CustomErrorUI />}>
  <ComplianceWidget />
</WidgetErrorBoundary>

// With error callback and widget name
<WidgetErrorBoundary 
  widgetName="Security Metrics"
  onError={(error, info) => logError(error, info)}
>
  <SecurityMetricsWidget />
</WidgetErrorBoundary>
```

## Extends

- `Component`\<`WidgetErrorBoundaryProps`, `WidgetErrorBoundaryState`\>

## Constructors

### Constructor

> **new WidgetErrorBoundary**(`props`): `WidgetErrorBoundary`

Defined in: [components/common/WidgetErrorBoundary.tsx:94](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/components/common/WidgetErrorBoundary.tsx#L94)

#### Parameters

##### props

`WidgetErrorBoundaryProps`

#### Returns

`WidgetErrorBoundary`

#### Overrides

`Component< WidgetErrorBoundaryProps, WidgetErrorBoundaryState >.constructor`

## Methods

### componentDidCatch()

> **componentDidCatch**(`error`, `errorInfo`): `void`

Defined in: [components/common/WidgetErrorBoundary.tsx:109](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/components/common/WidgetErrorBoundary.tsx#L109)

Log error information and call optional callback

#### Parameters

##### error

`Error`

##### errorInfo

`ErrorInfo`

#### Returns

`void`

#### Overrides

`Component.componentDidCatch`

***

### getDerivedStateFromError()

> `static` **getDerivedStateFromError**(`error`): `WidgetErrorBoundaryState`

Defined in: [components/common/WidgetErrorBoundary.tsx:102](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/components/common/WidgetErrorBoundary.tsx#L102)

Update state when an error is caught

#### Parameters

##### error

`Error`

#### Returns

`WidgetErrorBoundaryState`

***

### render()

> **render**(): `ReactNode`

Defined in: [components/common/WidgetErrorBoundary.tsx:131](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/components/common/WidgetErrorBoundary.tsx#L131)

#### Returns

`ReactNode`

#### Overrides

`Component.render`
