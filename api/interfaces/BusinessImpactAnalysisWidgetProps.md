[**CIA Compliance Manager API Documentation v0.6.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / BusinessImpactAnalysisWidgetProps

# Interface: BusinessImpactAnalysisWidgetProps

Defined in: [src/types/componentProps.ts:192](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/componentProps.ts#L192)

Props for the BusinessImpactAnalysisWidget component that displays business impact analysis.

## Properties

### category

> **category**: `"Availability"` \| `"Integrity"` \| `"Confidentiality"`

Defined in: [src/types/componentProps.ts:194](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/componentProps.ts#L194)

Category (Availability, Integrity, Confidentiality)

***

### level

> **level**: `string`

Defined in: [src/types/componentProps.ts:196](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/componentProps.ts#L196)

Security level

***

### options?

> `optional` **options**: `Record`\<`string`, [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/componentProps.ts:198](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/componentProps.ts#L198)

Security level options

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/componentProps.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/componentProps.ts#L200)

Optional test ID for component selection in tests
