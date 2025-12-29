[**CIA Compliance Manager Diagrams v1.1.2**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/assessmentcenter/SecurityLevelWidget](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L22)

Props for SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:26](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L26)

Selected availability level

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:56](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L56)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L36)

Selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L31)

Selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:41](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L41)

Handler for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L51)

Handler for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:46](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L46)

Handler for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:61](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L61)

Optional test ID for testing
