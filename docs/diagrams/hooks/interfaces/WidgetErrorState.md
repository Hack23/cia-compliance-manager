[**CIA Compliance Manager Diagrams v1.1.6**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / WidgetErrorState

# Interface: WidgetErrorState

Defined in: [hooks/useWidgetError.ts:7](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/hooks/useWidgetError.ts#L7)

State interface for widget error management

## Properties

### clearError()

> **clearError**: () => `void`

Defined in: [hooks/useWidgetError.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/hooks/useWidgetError.ts#L21)

Clear the current error state

#### Returns

`void`

***

### error

> **error**: `Error` \| `null`

Defined in: [hooks/useWidgetError.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/hooks/useWidgetError.ts#L11)

The current error, if any

***

### handleError()

> **handleError**: (`error`) => `void`

Defined in: [hooks/useWidgetError.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/hooks/useWidgetError.ts#L31)

Handle an unknown error (automatically converts to Error type)

#### Parameters

##### error

`unknown`

#### Returns

`void`

***

### hasError

> **hasError**: `boolean`

Defined in: [hooks/useWidgetError.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/hooks/useWidgetError.ts#L16)

Whether an error is currently present

***

### setError()

> **setError**: (`error`) => `void`

Defined in: [hooks/useWidgetError.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/hooks/useWidgetError.ts#L26)

Set a specific error

#### Parameters

##### error

`Error`

#### Returns

`void`
