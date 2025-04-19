[**CIA Compliance Manager Documentation v0.8.9**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / SecurityImpactWidgetProps

# Interface: SecurityImpactWidgetProps

Defined in: [types/widgets.ts:152](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widgets.ts#L152)

Props for widgets that display security impacts

## Business Perspective

Impact widgets help stakeholders understand the consequences of their
security choices, highlighting how each security level affects the
organization from technical, operational, and business perspectives. 💼

## Extends

- [`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L10)

The selected availability level

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`availabilityLevel`](SecurityWidgetBaseProps.md#availabilitylevel)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widgets.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widgets.ts#L35)

Optional children elements

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`children`](SecurityWidgetBaseProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L45)

Optional CSS class name

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`className`](SecurityWidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L20)

The selected confidentiality level

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`confidentialityLevel`](SecurityWidgetBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L15)

The selected integrity level

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`integrityLevel`](SecurityWidgetBaseProps.md#integritylevel)

***

### level?

> `optional` **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:156](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widgets.ts#L156)

Optional level (for backward compatibility)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onAvailabilityChange`](SecurityWidgetBaseProps.md#onavailabilitychange)

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onConfidentialityChange`](SecurityWidgetBaseProps.md#onconfidentialitychange)

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onIntegrityChange`](SecurityWidgetBaseProps.md#onintegritychange)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/widget-props.ts#L50)

Optional test ID for automated testing

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`testId`](SecurityWidgetBaseProps.md#testid)
