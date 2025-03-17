[**CIA Compliance Manager Diagrams v0.8.2**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [constants/testIds](../README.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [src/constants/testIds.ts:513](https://github.com/Hack23/cia-compliance-manager/blob/423c5d261c747ade8ca2550e176aa05168b5a31e/src/constants/testIds.ts#L513)

Test helpers for working with security levels and related data

## Type declaration

### getValuePointsForLevel()

> **getValuePointsForLevel**: (`level`) => `undefined` \| `string`[]

Type-safe way to get value points for a security level

#### Parameters

##### level

`string`

#### Returns

`undefined` \| `string`[]

### toSecurityLevel()

> **toSecurityLevel**: (`level`) => [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Convert string to SecurityLevel type safely

#### Parameters

##### level

`string`

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)
