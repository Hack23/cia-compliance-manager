[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [types/cia-services](../README.md) / BusinessImpactDetails

# Interface: BusinessImpactDetails

Defined in: [src/types/cia-services.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L43)

Enhanced interface for business impact details

## Properties

### financial

> **financial**: `object`

Defined in: [src/types/cia-services.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L45)

#### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### operational

> **operational**: `object`

Defined in: [src/types/cia-services.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L50)

#### description

> **description**: `string`

#### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### regulatory?

> `optional` **regulatory**: `object`

Defined in: [src/types/cia-services.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L64)

#### complianceImpact?

> `optional` **complianceImpact**: `string`

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### reputational?

> `optional` **reputational**: `object`

Defined in: [src/types/cia-services.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L55)

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### strategic?

> `optional` **strategic**: `object`

Defined in: [src/types/cia-services.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L59)

#### competitiveAdvantage?

> `optional` **competitiveAdvantage**: `string`

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### summary

> **summary**: `string`

Defined in: [src/types/cia-services.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia-services.ts#L44)
