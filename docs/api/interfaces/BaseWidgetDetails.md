[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / BaseWidgetDetails

# Interface: BaseWidgetDetails

Defined in: src/types/widgets.ts:22

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

Defined in: src/types/widgets.ts:24

***

### description?

> `optional` **description**: `string`

Defined in: src/types/widgets.ts:23

***

### impact?

> `optional` **impact**: `string`

Defined in: src/types/widgets.ts:25

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: src/types/widgets.ts:27

***

### technical?

> `optional` **technical**: `string`

Defined in: src/types/widgets.ts:26
