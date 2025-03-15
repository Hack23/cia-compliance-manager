[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / createTypeGuardTests

# Function: createTypeGuardTests()

> **createTypeGuardTests**\<`T`\>(`guardFunction`, `validExample`, `invalidKeys`): `object`

Defined in: [src/utils/test-helpers.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/main/src/utils/test-helpers.ts#L55)

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
