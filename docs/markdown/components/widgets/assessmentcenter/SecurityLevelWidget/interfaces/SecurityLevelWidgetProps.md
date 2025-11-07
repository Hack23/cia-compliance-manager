[**CIA Compliance Manager Documentation v0.8.38**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/assessmentcenter/SecurityLevelWidget](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:16](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L16)

Props for SecurityLevelWidget component

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:20](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L20)

Selected availability level

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:50](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L50)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:30](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L30)

Selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:25](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L25)

Selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L35)

Handler for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L45)

Handler for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:40](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L40)

Handler for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [components/widgets/assessmentcenter/SecurityLevelWidget.tsx:55](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/components/widgets/assessmentcenter/SecurityLevelWidget.tsx#L55)

Optional test ID for testing
