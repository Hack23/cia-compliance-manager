[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-helpers](../README.md) / createTypeGuardTests

# Function: createTypeGuardTests()

> **createTypeGuardTests**\<`T`\>(`guardFunction`, `validExample`, `invalidKeys`): `object`

Defined in: [src/utils/test-helpers.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/utils/test-helpers.ts#L55)

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
