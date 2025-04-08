[**CIA Compliance Manager Diagrams v0.8.6**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [types/widgets.ts:564](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L564)

Props for the Integrity Impact Widget

## Business Perspective

This widget helps stakeholders understand how integrity settings
affect data accuracy, validation processes, and information trustworthiness. 🔐

## Extends

- `ComponentImpactBaseProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

`ComponentImpactBaseProps.availabilityLevel`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

`ComponentImpactBaseProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

`ComponentImpactBaseProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

`ComponentImpactBaseProps.integrityLevel`

***

### level?

> `optional` **level**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:531](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L531)

Security level (for backward compatibility)

#### Inherited from

`ComponentImpactBaseProps.level`

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:536](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L536)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

`ComponentImpactBaseProps.onLevelChange`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

`ComponentImpactBaseProps.securityLevel`

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

`ComponentImpactBaseProps.testId`
