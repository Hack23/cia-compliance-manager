[**CIA Compliance Manager Diagrams v1.1.17**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [components](../README.md) / WidgetErrorBoundaryProps

# Interface: WidgetErrorBoundaryProps

Defined in: [types/componentPropExports.ts:372](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/componentPropExports.ts#L372)

## Properties

### children

> **children**: `ReactNode`

Defined in: [types/componentPropExports.ts:376](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/componentPropExports.ts#L376)

Child components to wrap with error boundary

***

### fallback?

> `optional` **fallback**: `ReactNode`

Defined in: [types/componentPropExports.ts:381](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/componentPropExports.ts#L381)

Optional custom fallback component to display on error

***

### onError()?

> `optional` **onError**: (`error`, `errorInfo`) => `void`

Defined in: [types/componentPropExports.ts:386](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/componentPropExports.ts#L386)

Optional callback when an error is caught

#### Parameters

##### error

`Error`

##### errorInfo

`ErrorInfo`

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/componentPropExports.ts:396](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/componentPropExports.ts#L396)

Optional test ID for automated testing

***

### widgetName?

> `optional` **widgetName**: `string`

Defined in: [types/componentPropExports.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/componentPropExports.ts#L391)

Optional widget name for error messages
