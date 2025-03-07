[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [types/componentProps](../README.md) / BusinessImpactAnalysisWidgetProps

# Interface: BusinessImpactAnalysisWidgetProps

Defined in: src/types/componentProps.ts:192

Props for the BusinessImpactAnalysisWidget component that displays business impact analysis.

## Properties

### category

> **category**: `"Availability"` \| `"Integrity"` \| `"Confidentiality"`

Defined in: src/types/componentProps.ts:194

Category (Availability, Integrity, Confidentiality)

***

### level

> **level**: `string`

Defined in: src/types/componentProps.ts:196

Security level

***

### options?

> `optional` **options**: `Record`\<`string`, [`CIADetails`](../../cia/interfaces/CIADetails.md)\>

Defined in: src/types/componentProps.ts:198

Security level options

***

### testId?

> `optional` **testId**: `string`

Defined in: src/types/componentProps.ts:200

Optional test ID for component selection in tests
