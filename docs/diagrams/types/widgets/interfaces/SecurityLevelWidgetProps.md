[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [src/types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L208)

Props for the SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: [src/types/widgets.ts:209](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L209)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L222)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: [src/types/widgets.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L211)

***

### error?

> `optional` **error**: `null` \| `Error`

Defined in: [src/types/widgets.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L226)

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: [src/types/widgets.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L210)

***

### loading?

> `optional` **loading**: `boolean`

Defined in: [src/types/widgets.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L225)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L212)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L214)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:213](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L213)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### setAvailability?

> `optional` **setAvailability**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L215)

***

### setConfidentiality?

> `optional` **setConfidentiality**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L219)

***

### setIntegrity?

> `optional` **setIntegrity**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L218)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L223)

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/widgets.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/widgets.ts#L224)
