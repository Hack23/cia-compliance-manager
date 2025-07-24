[**CIA Compliance Manager Diagrams v0.8.20**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [types/widgets.ts:581](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L581)

Props for the Integrity Impact Widget

## Business Perspective

This widget helps stakeholders understand how integrity settings
affect data accuracy, validation processes, and information trustworthiness. 🔐

## Extends

- [`ComponentImpactBaseProps`](ComponentImpactBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L528)

Availability security level

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`availabilityLevel`](ComponentImpactBaseProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L543)

CSS class name

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`className`](ComponentImpactBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L538)

Confidentiality security level

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`confidentialityLevel`](ComponentImpactBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L533)

Integrity security level

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`integrityLevel`](ComponentImpactBaseProps.md#integritylevel)

***

### level?

> `optional` **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L523)

Security level (used for backward compatibility)

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`level`](ComponentImpactBaseProps.md#level)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:553](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L553)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`onLevelChange`](ComponentImpactBaseProps.md#onlevelchange)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L548)

Test ID for testing

#### Inherited from

[`ComponentImpactBaseProps`](ComponentImpactBaseProps.md).[`testId`](ComponentImpactBaseProps.md#testid)
