[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / CostEstimationWidgetProps

# Interface: CostEstimationWidgetProps

Defined in: [src/types/widgets.tsx:34](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L34)

Props for the CostEstimationWidget component

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: [src/types/widgets.tsx:11](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L11)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`availabilityLevel`](WidgetBaseProps.md#availabilitylevel)

***

### availabilityOptions?

> `optional` **availabilityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/widgets.tsx:50](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L50)

Availability options

***

### capexEstimate

> **capexEstimate**: `string`

Defined in: [src/types/widgets.tsx:40](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L40)

Formatted capital expenditure estimate

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.tsx:14](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L14)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: [src/types/widgets.tsx:13](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L13)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`confidentialityLevel`](WidgetBaseProps.md#confidentialitylevel)

***

### confidentialityOptions?

> `optional` **confidentialityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/widgets.tsx:54](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L54)

Confidentiality options

***

### implementationTime?

> `optional` **implementationTime**: `string`

Defined in: [src/types/widgets.tsx:48](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L48)

Implementation time estimate

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: [src/types/widgets.tsx:12](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L12)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`integrityLevel`](WidgetBaseProps.md#integritylevel)

***

### integrityOptions?

> `optional` **integrityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/widgets.tsx:52](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L52)

Integrity options

***

### isSmallSolution

> **isSmallSolution**: `boolean`

Defined in: [src/types/widgets.tsx:44](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L44)

Whether this is a small solution (affects cost calculations)

***

### opexEstimate

> **opexEstimate**: `string`

Defined in: [src/types/widgets.tsx:42](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L42)

Formatted operational expenditure estimate

***

### roi?

> `optional` **roi**: `string`

Defined in: [src/types/widgets.tsx:46](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L46)

Return on investment estimate

***

### securityLevel?

> `optional` **securityLevel**: `string`

Defined in: [src/types/widgets.tsx:15](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L15)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.tsx:10](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L10)

Test ID for component selection in tests

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)

***

### totalCapex

> **totalCapex**: `number`

Defined in: [src/types/widgets.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L36)

Total capital expenditure as percentage of IT budget

***

### totalOpex

> **totalOpex**: `number`

Defined in: [src/types/widgets.tsx:38](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.tsx#L38)

Total operational expenditure as percentage of IT budget
