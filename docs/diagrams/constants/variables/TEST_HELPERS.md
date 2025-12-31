[**CIA Compliance Manager Diagrams v1.1.4**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [constants](../README.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [constants/testIds.ts:280](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/constants/testIds.ts#L280)

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
