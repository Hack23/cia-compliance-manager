[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / renderStatefulHook

# Function: renderStatefulHook()

> **renderStatefulHook**\<`TProps`, `TState`, `TUpdater`\>(`useStatefulHookFn`, `initialProps`?): `object`

Defined in: [src/tests/testUtils/hookTestUtils.tsx:85](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testUtils/hookTestUtils.tsx#L85)

Tests a hook that uses state

## Type Parameters

• **TProps**

• **TState**

• **TUpdater**

## Parameters

### useStatefulHookFn

(`props`?) => \[`TState`, `TUpdater`\]

Hook that manages state

### initialProps?

`TProps`

Props for the hook

## Returns

`object`

Object with state and updater functions for testing state changes

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

### state

#### Get Signature

> **get** **state**(): `TState`

##### Returns

`TState`

### update

#### Get Signature

> **get** **update**(): `TUpdater`

##### Returns

`TUpdater`
