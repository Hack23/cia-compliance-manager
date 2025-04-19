[**CIA Compliance Manager Diagrams v0.8.10**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/impactanalysis/ConfidentialityImpactWidget](../README.md) / ConfidentialityImpactWidgetProps

# Interface: ConfidentialityImpactWidgetProps

Defined in: [components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx:14](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/components/widgets/impactanalysis/ConfidentialityImpactWidget.tsx#L14)

Props for the Confidentiality Impact Widget

## Extends

- [`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L528)

Availability security level

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`availabilityLevel`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L543)

CSS class name

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`className`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L538)

Confidentiality security level

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`confidentialityLevel`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L533)

Integrity security level

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`integrityLevel`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#integritylevel)

***

### level?

> `optional` **level**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L523)

Security level (used for backward compatibility)

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`level`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#level)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:553](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L553)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`onLevelChange`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#onlevelchange)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/types/widgets.ts#L548)

Test ID for testing

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`testId`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#testid)
