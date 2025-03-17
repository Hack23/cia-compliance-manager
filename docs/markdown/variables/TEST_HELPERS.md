[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [src/constants/testIds.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/constants/testIds.ts#L538)

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
