[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [src/types/widgets.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L197)

Props for the SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: [src/types/widgets.ts:198](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L198)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L211)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: [src/types/widgets.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L200)

***

### error?

> `optional` **error**: `null` \| `Error`

Defined in: [src/types/widgets.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L215)

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: [src/types/widgets.ts:199](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L199)

***

### loading?

> `optional` **loading**: `boolean`

Defined in: [src/types/widgets.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L214)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:201](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L201)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L203)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:202](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L202)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### setAvailability?

> `optional` **setAvailability**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:204](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L204)

***

### setConfidentiality?

> `optional` **setConfidentiality**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L208)

***

### setIntegrity?

> `optional` **setIntegrity**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L207)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L212)

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/widgets.ts:213](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L213)
