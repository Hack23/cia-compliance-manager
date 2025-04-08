[**CIA Compliance Manager Diagrams v0.8.7**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / AvailabilityImpactWidgetProps

# Interface: AvailabilityImpactWidgetProps

Defined in: [types/widgets.ts:566](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L566)

Props for the Availability Impact Widget

## Business Perspective

This widget helps stakeholders understand how availability settings
affect uptime, recovery capabilities, and business continuity. ⏱️

## Extends

- `ComponentImpactBaseProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L528)

Availability security level

#### Inherited from

`ComponentImpactBaseProps.availabilityLevel`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L543)

CSS class name

#### Inherited from

`ComponentImpactBaseProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L538)

Confidentiality security level

#### Inherited from

`ComponentImpactBaseProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L533)

Integrity security level

#### Inherited from

`ComponentImpactBaseProps.integrityLevel`

***

### level?

> `optional` **level**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L523)

Security level (used for backward compatibility)

#### Inherited from

`ComponentImpactBaseProps.level`

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:553](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L553)

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

Defined in: [types/widgets.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/widgets.ts#L548)

Test ID for testing

#### Inherited from

`ComponentImpactBaseProps.testId`
