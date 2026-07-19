[**CIA Compliance Manager — Markdown Documentation v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [constants/testIds](../README.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [constants/testIds.ts:252](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/constants/testIds.ts#L252)

Test helpers for finding and matching elements

## Type Declaration

### matchTextAndClass

> **matchTextAndClass**: (`text`, `className`) => (`content`, `element`) => `boolean`

Match an element by text and class

#### Parameters

##### text

`string`

##### className

`string`

#### Returns

(`content`, `element`) => `boolean`

### findByText

> **findByText**: (`text`) => `Node` \| `null`

Find an element by text

#### Parameters

##### text

`string`

#### Returns

`Node` \| `null`

### toSecurityLevel

> **toSecurityLevel**: (`level`) => [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Convert string to SecurityLevel type safely

#### Parameters

##### level

`string`

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### getValuePointsForLevel

> **getValuePointsForLevel**: (`_level`) => `string`[]

Get value points for a security level

#### Parameters

##### \_level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]
