[**CIA Compliance Manager Diagrams v0.9.0**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/assessmentcenter/SecurityLevelWidget](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:17](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L17)

Props for SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:21](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L21)

Selected availability level

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L51)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L31)

Selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:26](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L26)

Selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L36)

Handler for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:46](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L46)

Handler for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:41](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L41)

Handler for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:56](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L56)

Optional test ID for testing
