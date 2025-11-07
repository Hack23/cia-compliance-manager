[**CIA Compliance Manager Documentation v0.8.38**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [constants](../README.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [constants/testIds.ts:160](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/constants/testIds.ts#L160)

Test helpers for finding and matching elements

## Type Declaration

### findByText()

> **findByText**: (`text`) => `Node` \| `null`

Find an element by text

#### Parameters

##### text

`string`

#### Returns

`Node` \| `null`

### getValuePointsForLevel()

> **getValuePointsForLevel**: (`_level`) => `string`[]

Get value points for a security level

#### Parameters

##### \_level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

### matchTextAndClass()

> **matchTextAndClass**: (`text`, `className`) => (`content`, `element`) => `boolean`

Match an element by text and class

#### Parameters

##### text

`string`

##### className

`string`

#### Returns

> (`content`, `element`): `boolean`

##### Parameters

###### content

`string`

###### element

`Element`

##### Returns

`boolean`

### toSecurityLevel()

> **toSecurityLevel**: (`level`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Convert string to SecurityLevel type safely

#### Parameters

##### level

`string`

#### Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)
