[**CIA Compliance Manager Documentation v0.8.5**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/assessmentcenter/SecurityLevelWidget](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:16](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L16)

Props for SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:20](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L20)

Selected availability level

***

### className?

> `optional` **className**: `string`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:65](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L65)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:30](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L30)

Selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:25](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L25)

Selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L35)

Handler for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L45)

Handler for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:40](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L40)

Handler for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### setAvailability()?

> `optional` **setAvailability**: (`level`) => `void`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:50](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L50)

Legacy handler for setting availability level

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### setConfidentiality()?

> `optional` **setConfidentiality**: (`level`) => `void`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:60](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L60)

Legacy handler for setting confidentiality level

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### setIntegrity()?

> `optional` **setIntegrity**: (`level`) => `void`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:55](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L55)

Legacy handler for setting integrity level

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx:70](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L70)

Optional test ID for testing
