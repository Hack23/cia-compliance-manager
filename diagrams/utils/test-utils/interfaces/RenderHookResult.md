[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-utils](../README.md) / RenderHookResult

# Interface: RenderHookResult\<Result, Props\>

Defined in: node\_modules/@testing-library/react/types/index.d.ts:179

## Type Parameters

• **Result**

• **Props**

## Properties

### rerender()

> **rerender**: (`props`?) => `void`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:183

Triggers a re-render. The props will be passed to your renderHook callback.

#### Parameters

##### props?

`Props`

#### Returns

`void`

***

### result

> **result**: `object`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:188

This is a stable reference to the latest value returned by your renderHook
callback

#### current

> **current**: `Result`

The value returned by your renderHook callback

***

### unmount()

> **unmount**: () => `void`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:198

Unmounts the test component. This is useful for when you need to test
any cleanup your useEffects have.

#### Returns

`void`
