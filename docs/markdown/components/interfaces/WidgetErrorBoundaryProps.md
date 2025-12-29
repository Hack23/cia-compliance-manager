[**CIA Compliance Manager Documentation v1.1.3**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / WidgetErrorBoundaryProps

# Interface: WidgetErrorBoundaryProps

Defined in: [types/componentPropExports.ts:301](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/types/componentPropExports.ts#L301)

## Properties

### children

> **children**: `ReactNode`

Defined in: [types/componentPropExports.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/types/componentPropExports.ts#L305)

Child components to wrap with error boundary

***

### fallback?

> `optional` **fallback**: `ReactNode`

Defined in: [types/componentPropExports.ts:310](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/types/componentPropExports.ts#L310)

Optional custom fallback component to display on error

***

### onError()?

> `optional` **onError**: (`error`, `errorInfo`) => `void`

Defined in: [types/componentPropExports.ts:315](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/types/componentPropExports.ts#L315)

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

Defined in: [types/componentPropExports.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/types/componentPropExports.ts#L325)

Optional test ID for automated testing

***

### widgetName?

> `optional` **widgetName**: `string`

Defined in: [types/componentPropExports.ts:320](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/types/componentPropExports.ts#L320)

Optional widget name for error messages
