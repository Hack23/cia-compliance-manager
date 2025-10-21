[**CIA Compliance Manager Diagrams v0.8.33**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / CostEstimationWidgetProps

# Interface: CostEstimationWidgetProps

Defined in: [types/widgets.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L343)

Props for cost estimation widgets

## Business Perspective

Cost estimation widgets help organizations understand the financial
implications of security choices, supporting budget planning and
investment prioritization. 💰

## Extends

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`availabilityLevel`](CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`className`](CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`confidentialityLevel`](CIABaseWidgetProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`integrityLevel`](CIABaseWidgetProps.md#integritylevel)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`securityLevel`](CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`testId`](CIABaseWidgetProps.md#testid)
