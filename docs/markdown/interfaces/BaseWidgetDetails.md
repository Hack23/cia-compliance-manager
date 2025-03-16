[**CIA Compliance Manager Documentation v0.8.1**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / BaseWidgetDetails

# Interface: BaseWidgetDetails

Defined in: [src/types/widgets.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/types/widgets.ts#L22)

Generic details interface that all specific detail interfaces should extend
This ensures compatibility across different widget implementations

## Extended by

- [`IntegrityDetail`](IntegrityDetail.md)
- [`ConfidentialityDetail`](ConfidentialityDetail.md)
- [`AvailabilityDetail`](AvailabilityDetail.md)

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### businessImpact?

> `optional` **businessImpact**: `string`

Defined in: [src/types/widgets.ts:24](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/types/widgets.ts#L24)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/widgets.ts:23](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/types/widgets.ts#L23)

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/widgets.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/types/widgets.ts#L25)

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [src/types/widgets.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/types/widgets.ts#L27)

***

### technical?

> `optional` **technical**: `string`

Defined in: [src/types/widgets.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/types/widgets.ts#L26)
