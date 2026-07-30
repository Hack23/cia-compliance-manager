[**CIA Compliance Manager — UML Diagrams v1.1.123**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/WidgetErrorBoundary](../README.md) / WidgetErrorBoundaryProps

# Interface: WidgetErrorBoundaryProps

Defined in: [components/common/WidgetErrorBoundary.tsx:8](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/components/common/WidgetErrorBoundary.tsx#L8)

Props for WidgetErrorBoundary component

## Properties

### children

> **children**: `ReactNode`

Defined in: [components/common/WidgetErrorBoundary.tsx:12](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/components/common/WidgetErrorBoundary.tsx#L12)

Child components to wrap with error boundary

***

### fallback?

> `optional` **fallback?**: `ReactNode`

Defined in: [components/common/WidgetErrorBoundary.tsx:17](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/components/common/WidgetErrorBoundary.tsx#L17)

Optional custom fallback component to display on error

***

### onError?

> `optional` **onError?**: (`error`, `errorInfo`) => `void`

Defined in: [components/common/WidgetErrorBoundary.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/components/common/WidgetErrorBoundary.tsx#L22)

Optional callback when an error is caught

#### Parameters

##### error

`Error`

##### errorInfo

`ErrorInfo`

#### Returns

`void`

***

### widgetName?

> `optional` **widgetName?**: `string`

Defined in: [components/common/WidgetErrorBoundary.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/components/common/WidgetErrorBoundary.tsx#L27)

Optional widget name for error messages

***

### testId?

> `optional` **testId?**: `string`

Defined in: [components/common/WidgetErrorBoundary.tsx:32](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/components/common/WidgetErrorBoundary.tsx#L32)

Optional test ID for automated testing
