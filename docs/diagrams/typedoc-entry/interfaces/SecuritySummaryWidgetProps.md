[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [typedoc-entry](../README.md) / SecuritySummaryWidgetProps

# Interface: SecuritySummaryWidgetProps

Defined in: [types/widgets.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L134)

Props for widgets that display security summaries

This widget displays a summary of the current security posture based on
confidentiality, integrity, and availability security levels. It provides
a consolidated view of the organization's security stance.

## Business Perspective

This component helps security officers quickly visualize the current
security posture across the CIA triad. The security level information
is critical for compliance reporting and risk assessment. 🔒

## Extends

- `SecurityWidgetBaseProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L10)

The selected availability level

#### Inherited from

`SecurityWidgetBaseProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widgets.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L35)

Optional children elements

#### Inherited from

`SecurityWidgetBaseProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L45)

Optional CSS class name

#### Inherited from

`SecurityWidgetBaseProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L20)

The selected confidentiality level

#### Inherited from

`SecurityWidgetBaseProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L15)

The selected integrity level

#### Inherited from

`SecurityWidgetBaseProps.integrityLevel`

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

`SecurityWidgetBaseProps.onAvailabilityChange`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

`SecurityWidgetBaseProps.onConfidentialityChange`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

`SecurityWidgetBaseProps.onIntegrityChange`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:138](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L138)

Optional overall security level

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L50)

Optional test ID for automated testing

#### Inherited from

`SecurityWidgetBaseProps.testId`
