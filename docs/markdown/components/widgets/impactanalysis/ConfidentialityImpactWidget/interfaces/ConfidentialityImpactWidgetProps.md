[**CIA Compliance Manager Documentation v0.8.5**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/impactanalysis/ConfidentialityImpactWidget](../README.md) / ConfidentialityImpactWidgetProps

# Interface: ConfidentialityImpactWidgetProps

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:14](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L14)

Props for the ConfidentialityImpactWidget

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:24](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L24)

The selected availability level
(for combined impact analysis)

***

### className?

> `optional` **className**: `string`

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L35)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L18)

The selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:30](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L30)

The selected integrity level
(for combined impact analysis)

***

### level?

> `optional` **level**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L45)

For legacy support

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:50](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L50)

Optional level change handler

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:40](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L40)

Optional test ID for testing
