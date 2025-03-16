[**CIA Compliance Manager Documentation v0.8.0**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / CostEstimationWidgetProps

# Interface: CostEstimationWidgetProps

Defined in: [src/types/widgets.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L34)

Props for the CostEstimationWidget component

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel?

> `optional` **availabilityLevel**: `string`

Defined in: [src/types/widgets.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L11)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`availabilityLevel`](WidgetBaseProps.md#availabilitylevel)

***

### availabilityOptions?

> `optional` **availabilityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/widgets.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L50)

Availability options

***

### capexEstimate

> **capexEstimate**: `string`

Defined in: [src/types/widgets.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L40)

Formatted capital expenditure estimate

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L14)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel?

> `optional` **confidentialityLevel**: `string`

Defined in: [src/types/widgets.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L13)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`confidentialityLevel`](WidgetBaseProps.md#confidentialitylevel)

***

### confidentialityOptions?

> `optional` **confidentialityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/widgets.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L54)

Confidentiality options

***

### implementationTime?

> `optional` **implementationTime**: `string`

Defined in: [src/types/widgets.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L48)

Implementation time estimate

***

### integrityLevel?

> `optional` **integrityLevel**: `string`

Defined in: [src/types/widgets.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L12)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`integrityLevel`](WidgetBaseProps.md#integritylevel)

***

### integrityOptions?

> `optional` **integrityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/widgets.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L52)

Integrity options

***

### isSmallSolution

> **isSmallSolution**: `boolean`

Defined in: [src/types/widgets.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L44)

Whether this is a small solution (affects cost calculations)

***

### opexEstimate

> **opexEstimate**: `string`

Defined in: [src/types/widgets.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L42)

Formatted operational expenditure estimate

***

### roi?

> `optional` **roi**: `string`

Defined in: [src/types/widgets.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L46)

Return on investment estimate

***

### securityLevel?

> `optional` **securityLevel**: `string`

Defined in: [src/types/widgets.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L15)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L9)

Test ID for component selection in tests

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)

***

### totalCapex

> **totalCapex**: `number`

Defined in: [src/types/widgets.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L36)

Total capital expenditure as percentage of IT budget

***

### totalOpex

> **totalOpex**: `number`

Defined in: [src/types/widgets.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/widgets.ts#L38)

Total operational expenditure as percentage of IT budget
