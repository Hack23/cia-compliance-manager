[**CIA Compliance Manager Diagrams v0.8.5**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/impactanalysis/IntegrityImpactWidget](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:12](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L12)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L22)

The selected availability level
(for combined impact analysis)

***

### className?

> `optional` **className**: `string`

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:38](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L38)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:28](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L28)

The selected confidentiality level
(for combined impact analysis)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:16](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L16)

The selected integrity level

***

### level?

> `optional` **level**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L33)

For legacy support

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:48](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L48)

Optional level change handler

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx:43](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L43)

Optional test ID for testing
