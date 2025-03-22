[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityWidgetBaseProps

# Interface: SecurityWidgetBaseProps

Defined in: [src/types/widgets.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L33)

Props for security-related widgets

## Extends

- [`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`BaseWidgetProps`](BaseWidgetProps.md)

## Extended by

- [`SecuritySummaryWidgetProps`](SecuritySummaryWidgetProps.md)
- [`SecurityImpactWidgetProps`](SecurityImpactWidgetProps.md)
- [`BusinessImpactWidgetProps`](BusinessImpactWidgetProps.md)
- [`ComplianceWidgetProps`](ComplianceWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L10)

The selected availability level

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`availabilityLevel`](../../widget-props/interfaces/WithSecurityLevelProps.md#availabilitylevel)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [src/types/widgets.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L27)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widget-props.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L45)

Optional CSS class name

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`className`](BaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L20)

The selected confidentiality level

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`confidentialityLevel`](../../widget-props/interfaces/WithSecurityLevelProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L15)

The selected integrity level

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`integrityLevel`](../../widget-props/interfaces/WithSecurityLevelProps.md#integritylevel)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`onAvailabilityChange`](../../widget-props/interfaces/WithSecurityLevelProps.md#onavailabilitychange)

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`onConfidentialityChange`](../../widget-props/interfaces/WithSecurityLevelProps.md#onconfidentialitychange)

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`onIntegrityChange`](../../widget-props/interfaces/WithSecurityLevelProps.md#onintegritychange)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widget-props.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L50)

Optional test ID for automated testing

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`testId`](BaseWidgetProps.md#testid)
