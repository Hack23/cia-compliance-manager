[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [types/widgets](../README.md) / BaseWidgetDetails

# Interface: BaseWidgetDetails

Defined in: [src/types/widgets.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/widgets.tsx#L22)

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

Defined in: [src/types/widgets.tsx:24](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/widgets.tsx#L24)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/widgets.tsx:23](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/widgets.tsx#L23)

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/widgets.tsx:25](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/widgets.tsx#L25)

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [src/types/widgets.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/widgets.tsx#L27)

***

### technical?

> `optional` **technical**: `string`

Defined in: [src/types/widgets.tsx:26](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/widgets.tsx#L26)
