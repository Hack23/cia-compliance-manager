[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / renderHook

# Function: renderHook()

> **renderHook**\<`TProps`, `TResult`\>(`useHookFn`, `initialProps`?): `object`

Defined in: [src/tests/testUtils/hookTestUtils.tsx:10](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testUtils/hookTestUtils.tsx#L10)

Renders a hook with the specified props and returns the result

## Type Parameters

• **TProps**

• **TResult**

## Parameters

### useHookFn

(`props`?) => `TResult`

The hook function to test

### initialProps?

`TProps`

Initial props to pass to the hook

## Returns

`object`

An object with the hook result and methods to rerender or unmount

### rerender()

> **rerender**: (`newProps`?) => `void`

#### Parameters

##### newProps?

`TProps`

#### Returns

`void`

### result

> **result**: `object`

#### result.current

##### Get Signature

> **get** **current**(): `TResult`

Defined in: [src/tests/testUtils/hookTestUtils.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testUtils/hookTestUtils.tsx#L29)

###### Returns

`TResult`

### unmount()

> **unmount**: () => `void` = `renderResult.unmount`

#### Returns

`void`
