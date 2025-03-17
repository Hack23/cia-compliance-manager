[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-helpers](../README.md) / createTypeGuardTests

# Function: createTypeGuardTests()

> **createTypeGuardTests**\<`T`\>(`guardFunction`, `validExample`, `invalidKeys`): `object`

Defined in: [src/utils/test-helpers.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/test-helpers.ts#L55)

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
