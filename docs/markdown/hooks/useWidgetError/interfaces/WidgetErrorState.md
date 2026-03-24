[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useWidgetError](../README.md) / WidgetErrorState

# Interface: WidgetErrorState

Defined in: [hooks/useWidgetError.ts:7](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useWidgetError.ts#L7)

State interface for widget error management

## Properties

### error

> **error**: `Error` \| `null`

Defined in: [hooks/useWidgetError.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useWidgetError.ts#L11)

The current error, if any

***

### hasError

> **hasError**: `boolean`

Defined in: [hooks/useWidgetError.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useWidgetError.ts#L16)

Whether an error is currently present

***

### clearError

> **clearError**: () => `void`

Defined in: [hooks/useWidgetError.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useWidgetError.ts#L21)

Clear the current error state

#### Returns

`void`

***

### setError

> **setError**: (`error`) => `void`

Defined in: [hooks/useWidgetError.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useWidgetError.ts#L26)

Set a specific error

#### Parameters

##### error

`Error`

#### Returns

`void`

***

### handleError

> **handleError**: (`error`) => `void`

Defined in: [hooks/useWidgetError.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useWidgetError.ts#L31)

Handle an unknown error (automatically converts to Error type)

#### Parameters

##### error

`unknown`

#### Returns

`void`
