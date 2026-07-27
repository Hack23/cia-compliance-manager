[**CIA Compliance Manager — UML Diagrams v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/componentPropExports](../README.md) / WidgetErrorBoundaryProps

# Interface: WidgetErrorBoundaryProps

Defined in: [types/componentPropExports.ts:364](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/types/componentPropExports.ts#L364)

## Properties

### children

> **children**: `ReactNode`

Defined in: [types/componentPropExports.ts:368](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/types/componentPropExports.ts#L368)

Child components to wrap with error boundary

***

### fallback?

> `optional` **fallback?**: `ReactNode`

Defined in: [types/componentPropExports.ts:373](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/types/componentPropExports.ts#L373)

Optional custom fallback component to display on error

***

### onError?

> `optional` **onError?**: (`error`, `errorInfo`) => `void`

Defined in: [types/componentPropExports.ts:378](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/types/componentPropExports.ts#L378)

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

Defined in: [types/componentPropExports.ts:383](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/types/componentPropExports.ts#L383)

Optional widget name for error messages

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/componentPropExports.ts:388](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/types/componentPropExports.ts#L388)

Optional test ID for automated testing
