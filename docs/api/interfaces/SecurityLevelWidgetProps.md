[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: src/types/widgets.ts:197

Props for the SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: src/types/widgets.ts:198

***

### className?

> `optional` **className**: `string`

Defined in: src/types/widgets.ts:211

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: src/types/widgets.ts:200

***

### error?

> `optional` **error**: `null` \| `Error`

Defined in: src/types/widgets.ts:215

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: src/types/widgets.ts:199

***

### loading?

> `optional` **loading**: `boolean`

Defined in: src/types/widgets.ts:214

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: src/types/widgets.ts:201

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: src/types/widgets.ts:203

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: src/types/widgets.ts:202

#### Parameters

##### level

`string`

#### Returns

`void`

***

### setAvailability?

> `optional` **setAvailability**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: src/types/widgets.ts:204

***

### setConfidentiality?

> `optional` **setConfidentiality**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: src/types/widgets.ts:208

***

### setIntegrity?

> `optional` **setIntegrity**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: src/types/widgets.ts:207

***

### testId?

> `optional` **testId**: `string`

Defined in: src/types/widgets.ts:212

***

### title?

> `optional` **title**: `string`

Defined in: src/types/widgets.ts:213
