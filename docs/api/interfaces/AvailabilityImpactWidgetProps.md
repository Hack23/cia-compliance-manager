[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / AvailabilityImpactWidgetProps

# Interface: AvailabilityImpactWidgetProps

Defined in: [src/types/widgets.ts:154](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L154)

Props for the AvailabilityImpactWidget component

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: `string`

Defined in: [src/types/widgets.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L11)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`availabilityLevel`](WidgetBaseProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L14)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: `string`

Defined in: [src/types/widgets.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L13)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`confidentialityLevel`](WidgetBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: `string`

Defined in: [src/types/widgets.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L12)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`integrityLevel`](WidgetBaseProps.md#integritylevel)

***

### options?

> `optional` **options**: `Record`\<`string`, [`CIADetails`](CIADetails.md) \| [`AvailabilityDetail`](AvailabilityDetail.md)\>

Defined in: [src/types/widgets.ts:156](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L156)

Options for each level - optional when using ciaContentService

***

### securityLevel?

> `optional` **securityLevel**: `string`

Defined in: [src/types/widgets.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L15)

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/widgets.ts#L10)

Test ID for component selection in tests

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
