[**CIA Compliance Manager Diagrams v0.7.0**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [constants](../README.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [constants/testIds.ts:513](https://github.com/Hack23/cia-compliance-manager/blob/5a46a25cd2e09ba091444827f045b3618a447654/src/constants/testIds.ts#L513)

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

> **toSecurityLevel**: (`level`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Convert string to SecurityLevel type safely

#### Parameters

##### level

`string`

#### Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)
