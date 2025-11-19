[**CIA Compliance Manager Documentation v0.9.1**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/impactanalysis/IntegrityImpactWidget](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [components/widgets/impactanalysis/IntegrityImpactWidget.tsx:20](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L20)

Props for IntegrityImpactWidget component

## Extends

- [`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L528)

Availability security level

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`availabilityLevel`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L543)

CSS class name

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`className`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L538)

Confidentiality security level

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`confidentialityLevel`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L533)

Integrity security level

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`integrityLevel`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#integritylevel)

***

### level?

> `optional` **level**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L523)

Security level (used for backward compatibility)

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`level`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#level)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:553](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L553)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`onLevelChange`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#onlevelchange)

***

### showExtendedDetails?

> `optional` **showExtendedDetails**: `boolean`

Defined in: [components/widgets/impactanalysis/IntegrityImpactWidget.tsx:24](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/impactanalysis/IntegrityImpactWidget.tsx#L24)

Flag to show extended details (optional)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L548)

Test ID for testing

#### Inherited from

[`ComponentImpactBaseProps`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md).[`testId`](../../../../../types/widgets/interfaces/ComponentImpactBaseProps.md#testid)
