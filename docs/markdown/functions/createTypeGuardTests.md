[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / createTypeGuardTests

# Function: createTypeGuardTests()

> **createTypeGuardTests**\<`T`\>(`guardFunction`, `validExample`, `invalidKeys`): `object`

Defined in: [src/utils/test-helpers.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/utils/test-helpers.ts#L55)

Type guard test helper that creates assertion functions for common tests

## Type Parameters

• **T** *extends* `object`

## Parameters

### guardFunction

(`val`) => `boolean`

### validExample

`T`

### invalidKeys

keyof `T`[]

## Returns

`object`

### testInvalidObjects()

> **testInvalidObjects**: () => `void`

#### Returns

`void`

### testValidObject()

> **testValidObject**: () => `void`

#### Returns

`void`
