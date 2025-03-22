[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/impact](../README.md) / BusinessImpactDetails

# Interface: BusinessImpactDetails

Defined in: [src/types/impact.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L14)

Enhanced interface for business impact details

## Properties

### financial

> **financial**: `object`

Defined in: [src/types/impact.ts:23](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L23)

Financial impact details

#### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

Estimated annual revenue loss

#### description

> **description**: `string`

Description of financial impact

#### riskLevel

> **riskLevel**: `string`

Risk level of financial impact

***

### operational

> **operational**: `object`

Defined in: [src/types/impact.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L41)

Operational impact details

#### description

> **description**: `string`

Description of operational impact

#### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

Mean time to recover from incidents

#### riskLevel

> **riskLevel**: `string`

Risk level of operational impact

***

### regulatory?

> `optional` **regulatory**: `object`

Defined in: [src/types/impact.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L73)

Regulatory impact details

#### complianceViolations?

> `optional` **complianceViolations**: `string`[]

List of potential compliance violations

#### description

> **description**: `string`

Description of regulatory impact

#### riskLevel

> **riskLevel**: `string`

Risk level of regulatory impact

***

### reputational?

> `optional` **reputational**: `object`

Defined in: [src/types/impact.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L59)

Reputational impact details

#### description

> **description**: `string`

Description of reputational impact

#### riskLevel

> **riskLevel**: `string`

Risk level of reputational impact

***

### strategic?

> `optional` **strategic**: `object`

Defined in: [src/types/impact.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L91)

Strategic impact details

#### competitiveAdvantage?

> `optional` **competitiveAdvantage**: `string`

Competitive advantage implications

#### description

> **description**: `string`

Description of strategic impact

#### riskLevel

> **riskLevel**: `string`

Risk level of strategic impact

***

### summary

> **summary**: `string`

Defined in: [src/types/impact.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/impact.ts#L18)

Overall summary of business impact
