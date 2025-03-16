[**CIA Compliance Manager Diagrams v0.8.4**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [src/types/widgets.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L206)

Props for the SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: [src/types/widgets.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L207)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L220)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: [src/types/widgets.ts:209](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L209)

***

### error?

> `optional` **error**: `null` \| `Error`

Defined in: [src/types/widgets.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L224)

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: [src/types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L208)

***

### loading?

> `optional` **loading**: `boolean`

Defined in: [src/types/widgets.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L223)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L210)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L212)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L211)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### setAvailability?

> `optional` **setAvailability**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:213](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L213)

***

### setConfidentiality?

> `optional` **setConfidentiality**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L217)

***

### setIntegrity?

> `optional` **setIntegrity**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L216)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L221)

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/widgets.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/widgets.ts#L222)
