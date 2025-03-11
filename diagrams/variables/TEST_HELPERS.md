[**CIA Compliance Manager Diagrams v0.7.0**](../README.md)

***

[CIA Compliance Manager Diagrams](../globals.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [constants/testIds.ts:514](https://github.com/Hack23/cia-compliance-manager/blob/522a8fc6c1388fd56a1baa43ced2d687879fd0c2/src/constants/testIds.ts#L514)

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

> **toSecurityLevel**: (`level`) => `SecurityLevel`

Convert string to SecurityLevel type safely

#### Parameters

##### level

`string`

#### Returns

`SecurityLevel`
