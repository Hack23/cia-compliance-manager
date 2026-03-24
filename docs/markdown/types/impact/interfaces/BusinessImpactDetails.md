[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/impact](../README.md) / BusinessImpactDetails

# Interface: BusinessImpactDetails

Defined in: [types/impact.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L14)

Enhanced interface for business impact details

## Properties

### summary

> **summary**: `string`

Defined in: [types/impact.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L18)

Overall summary of business impact

***

### financial

> **financial**: `object`

Defined in: [types/impact.ts:23](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L23)

Financial impact details

#### riskLevel

> **riskLevel**: `string`

Risk level of financial impact

#### description

> **description**: `string`

Description of financial impact

#### annualRevenueLoss?

> `optional` **annualRevenueLoss?**: `string`

Estimated annual revenue loss

***

### operational

> **operational**: `object`

Defined in: [types/impact.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L41)

Operational impact details

#### riskLevel

> **riskLevel**: `string`

Risk level of operational impact

#### description

> **description**: `string`

Description of operational impact

#### meanTimeToRecover?

> `optional` **meanTimeToRecover?**: `string`

Mean time to recover from incidents

***

### reputational?

> `optional` **reputational?**: `object`

Defined in: [types/impact.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L59)

Reputational impact details

#### riskLevel

> **riskLevel**: `string`

Risk level of reputational impact

#### description

> **description**: `string`

Description of reputational impact

***

### regulatory?

> `optional` **regulatory?**: `object`

Defined in: [types/impact.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L73)

Regulatory impact details

#### riskLevel

> **riskLevel**: `string`

Risk level of regulatory impact

#### description

> **description**: `string`

Description of regulatory impact

#### complianceViolations?

> `optional` **complianceViolations?**: `string`[]

List of potential compliance violations

***

### strategic?

> `optional` **strategic?**: `object`

Defined in: [types/impact.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/impact.ts#L91)

Strategic impact details

#### riskLevel

> **riskLevel**: `string`

Risk level of strategic impact

#### description

> **description**: `string`

Description of strategic impact

#### competitiveAdvantage?

> `optional` **competitiveAdvantage?**: `string`

Competitive advantage implications
