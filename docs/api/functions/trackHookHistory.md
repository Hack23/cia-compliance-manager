[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / trackHookHistory

# Function: trackHookHistory()

> **trackHookHistory**\<`TProps`, `TState`\>(`useHookFn`, `initialProps`?): `object`

Defined in: [src/tests/testUtils/hookTestUtils.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testUtils/hookTestUtils.tsx#L47)

Tracks the history of states in a stateful hook

## Type Parameters

• **TProps**

• **TState**

## Parameters

### useHookFn

(`props`?) => `TState`

The hook function to track

### initialProps?

`TProps`

Initial props to pass to the hook

## Returns

`object`

An object with the current result and state history

### history

> **history**: `TState`[]

### rerender()

> **rerender**: (`newProps`?) => `void`

#### Parameters

##### newProps?

`TProps`

#### Returns

`void`

### unmount()

> **unmount**: () => `void` = `renderResult.unmount`

#### Returns

`void`
