[**CIA Compliance Manager Documentation v0.9.2**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/assessmentcenter/SecurityLevelWidget](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:18](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L18)

Props for SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L22)

Selected availability level

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:52](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L52)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:32](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L32)

Selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L27)

Selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:37](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L37)

Handler for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L47)

Handler for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:42](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L42)

Handler for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:57](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L57)

Optional test ID for testing
