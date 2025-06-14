[**CIA Compliance Manager Diagrams v0.8.17**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [constants](../README.md) / TEST\_HELPERS

# Variable: TEST\_HELPERS

> `const` **TEST\_HELPERS**: `object`

Defined in: [constants/testIds.ts:160](https://github.com/Hack23/cia-compliance-manager/blob/6a2219920f4c187f7eafa3e355e36b35c9c19248/src/constants/testIds.ts#L160)

Test helpers for finding and matching elements

## Type declaration

### findByText()

> **findByText**: (`text`) => `null` \| `Node`

Find an element by text

#### Parameters

##### text

`string`

#### Returns

`null` \| `Node`

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
