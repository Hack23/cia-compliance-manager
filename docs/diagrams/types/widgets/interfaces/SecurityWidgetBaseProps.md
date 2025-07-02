[**CIA Compliance Manager Diagrams v0.8.18**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityWidgetBaseProps

# Interface: SecurityWidgetBaseProps

Defined in: [types/widgets.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widgets.ts#L49)

Props for security-related widgets

## Business Perspective

These widgets form the foundation of security assessment in the application,
allowing organizations to visualize and manage their security posture
across the CIA triad. 🔒

## Extends

- [`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`BaseWidgetProps`](BaseWidgetProps.md)

## Extended by

- [`SecuritySummaryWidgetProps`](SecuritySummaryWidgetProps.md)
- [`SecurityImpactWidgetProps`](SecurityImpactWidgetProps.md)
- [`BusinessImpactWidgetProps`](BusinessImpactWidgetProps.md)
- [`ComplianceWidgetProps`](ComplianceWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L10)

The selected availability level

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`availabilityLevel`](../../interfaces/WithSecurityLevelProps.md#availabilitylevel)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widgets.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widgets.ts#L35)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L45)

Optional CSS class name

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`className`](BaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L20)

The selected confidentiality level

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`confidentialityLevel`](../../interfaces/WithSecurityLevelProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L15)

The selected integrity level

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`integrityLevel`](../../interfaces/WithSecurityLevelProps.md#integritylevel)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`onAvailabilityChange`](../../interfaces/WithSecurityLevelProps.md#onavailabilitychange)

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`onConfidentialityChange`](../../interfaces/WithSecurityLevelProps.md#onconfidentialitychange)

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`onIntegrityChange`](../../interfaces/WithSecurityLevelProps.md#onintegritychange)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/widget-props.ts#L50)

Optional test ID for automated testing

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`testId`](BaseWidgetProps.md#testid)
