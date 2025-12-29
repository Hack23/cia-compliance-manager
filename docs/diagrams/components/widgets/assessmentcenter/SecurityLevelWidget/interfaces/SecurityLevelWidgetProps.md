[**CIA Compliance Manager Diagrams v1.1.3**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/assessmentcenter/SecurityLevelWidget](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:23](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L23)

Props for SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L27)

Selected availability level

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:57](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L57)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:37](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L37)

Selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:32](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L32)

Selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:42](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L42)

Handler for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:52](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L52)

Handler for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L47)

Handler for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:62](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L62)

Optional test ID for testing
