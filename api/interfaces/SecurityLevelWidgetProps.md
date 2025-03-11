[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [src/types/widgets.tsx:194](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L194)

Props for the SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: [src/types/widgets.tsx:195](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L195)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.tsx:208](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L208)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: [src/types/widgets.tsx:197](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L197)

***

### error?

> `optional` **error**: `null` \| `Error`

Defined in: [src/types/widgets.tsx:212](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L212)

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: [src/types/widgets.tsx:196](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L196)

***

### loading?

> `optional` **loading**: `boolean`

Defined in: [src/types/widgets.tsx:211](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L211)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/types/widgets.tsx:198](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L198)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/types/widgets.tsx:200](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L200)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/types/widgets.tsx:199](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L199)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### setAvailability?

> `optional` **setAvailability**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.tsx:201](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L201)

***

### setConfidentiality?

> `optional` **setConfidentiality**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.tsx:205](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L205)

***

### setIntegrity?

> `optional` **setIntegrity**: `Dispatch`\<`SetStateAction`\<`string`\>\> \| (`level`) => `void`

Defined in: [src/types/widgets.tsx:204](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L204)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.tsx:209](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L209)

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/widgets.tsx:210](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L210)
