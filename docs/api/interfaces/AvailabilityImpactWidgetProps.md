[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / AvailabilityImpactWidgetProps

# Interface: AvailabilityImpactWidgetProps

Defined in: src/types/widgets.ts:154

Props for the AvailabilityImpactWidget component

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: src/types/widgets.ts:11

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`availabilityLevel`](WidgetBaseProps.md#availabilitylevel)

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

### integrityLevel

> **integrityLevel**: `string`

Defined in: src/types/widgets.ts:12

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`integrityLevel`](WidgetBaseProps.md#integritylevel)

***

### options?

> `optional` **options**: `Record`\<`string`, [`CIADetails`](CIADetails.md) \| [`AvailabilityDetail`](AvailabilityDetail.md)\>

Defined in: src/types/widgets.ts:156

Options for each level - optional when using ciaContentService

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
