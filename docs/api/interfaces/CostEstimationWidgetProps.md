[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / CostEstimationWidgetProps

# Interface: CostEstimationWidgetProps

Defined in: src/types/widgets.ts:34

Props for the CostEstimationWidget component

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: src/types/widgets.ts:11

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`availabilityLevel`](WidgetBaseProps.md#availabilitylevel)

***

### availabilityOptions?

> `optional` **availabilityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: src/types/widgets.ts:50

Availability options

***

### capexEstimate

> **capexEstimate**: `string`

Defined in: src/types/widgets.ts:40

Formatted capital expenditure estimate

***

### className?

> `optional` **className**: `string`

Defined in: src/types/widgets.ts:14

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: src/types/widgets.ts:13

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`confidentialityLevel`](WidgetBaseProps.md#confidentialitylevel)

***

### confidentialityOptions?

> `optional` **confidentialityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: src/types/widgets.ts:54

Confidentiality options

***

### implementationTime?

> `optional` **implementationTime**: `string`

Defined in: src/types/widgets.ts:48

Implementation time estimate

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: src/types/widgets.ts:12

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`integrityLevel`](WidgetBaseProps.md#integritylevel)

***

### integrityOptions?

> `optional` **integrityOptions**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: src/types/widgets.ts:52

Integrity options

***

### isSmallSolution

> **isSmallSolution**: `boolean`

Defined in: src/types/widgets.ts:44

Whether this is a small solution (affects cost calculations)

***

### opexEstimate

> **opexEstimate**: `string`

Defined in: src/types/widgets.ts:42

Formatted operational expenditure estimate

***

### roi?

> `optional` **roi**: `string`

Defined in: src/types/widgets.ts:46

Return on investment estimate

***

### securityLevel?

> `optional` **securityLevel**: `string`

Defined in: src/types/widgets.ts:15

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: src/types/widgets.ts:10

Test ID for component selection in tests

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)

***

### totalCapex

> **totalCapex**: `number`

Defined in: src/types/widgets.ts:36

Total capital expenditure as percentage of IT budget

***

### totalOpex

> **totalOpex**: `number`

Defined in: src/types/widgets.ts:38

Total operational expenditure as percentage of IT budget
