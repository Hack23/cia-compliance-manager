[**CIA Compliance Manager Documentation v0.8.8**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [types/widgets.ts:581](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L581)

Props for the Integrity Impact Widget

## Business Perspective

This widget helps stakeholders understand how integrity settings
affect data accuracy, validation processes, and information trustworthiness. 🔐

## Extends

- `ComponentImpactBaseProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L528)

Availability security level

#### Inherited from

`ComponentImpactBaseProps.availabilityLevel`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L543)

CSS class name

#### Inherited from

`ComponentImpactBaseProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L538)

Confidentiality security level

#### Inherited from

`ComponentImpactBaseProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L533)

Integrity security level

#### Inherited from

`ComponentImpactBaseProps.integrityLevel`

***

### level?

> `optional` **level**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L523)

Security level (used for backward compatibility)

#### Inherited from

`ComponentImpactBaseProps.level`

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:553](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L553)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

`ComponentImpactBaseProps.onLevelChange`

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L548)

Test ID for testing

#### Inherited from

`ComponentImpactBaseProps.testId`
