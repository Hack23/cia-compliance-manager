[**CIA Compliance Manager Documentation v0.8.4**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [src/constants/testIds.ts:513](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/constants/testIds.ts#L513)

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

> **toSecurityLevel**: (`level`) => [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Convert string to SecurityLevel type safely

#### Parameters

##### level

`string`

#### Returns

[`SecurityLevel`](../type-aliases/SecurityLevel.md)
