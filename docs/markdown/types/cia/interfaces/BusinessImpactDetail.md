[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [types/cia.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L250)

Business impact detail structure

Provides comprehensive information about the business impact of security incidents
across financial, operational, reputational, and regulatory dimensions.

## Example

```typescript
const impact: BusinessImpactDetail = {
  description: "Major service disruption affecting customer transactions",
  riskLevel: "High Risk",
  annualRevenueLoss: "$500,000 - $2,000,000",
  meanTimeToRecover: "4-8 hours",
  complianceViolations: ["PCI DSS", "SOC 2"],
  financial: {
    description: "Revenue loss from transaction downtime",
    impact: "High",
    annualLoss: "$1,000,000"
  }
};
```

## Properties

### description

> **description**: `string`

Defined in: [types/cia.ts:252](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L252)

Detailed description of the business impact

***

### riskLevel

> **riskLevel**: `string`

Defined in: [types/cia.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L255)

Risk level classification (e.g., "Critical Risk", "High Risk", "Medium Risk")

***

### annualRevenueLoss?

> `optional` **annualRevenueLoss?**: `string`

Defined in: [types/cia.ts:258](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L258)

Estimated annual revenue loss range

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover?**: `string`

Defined in: [types/cia.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L261)

Mean time to recover from the incident

***

### complianceViolations?

> `optional` **complianceViolations?**: `string`[]

Defined in: [types/cia.ts:264](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L264)

List of compliance frameworks that would be violated

***

### financial?

> `optional` **financial?**: `object`

Defined in: [types/cia.ts:267](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L267)

Financial impact details

#### description

> **description**: `string`

Description of financial impact

#### impact

> **impact**: `string`

Impact severity level

#### annualLoss?

> `optional` **annualLoss?**: `string`

Estimated annual loss amount

***

### operational?

> `optional` **operational?**: `object`

Defined in: [types/cia.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L277)

Operational impact details

#### description

> **description**: `string`

Description of operational impact

#### impact

> **impact**: `string`

Impact severity level

#### recoveryTime?

> `optional` **recoveryTime?**: `string`

Time required to recover operations

***

### reputational?

> `optional` **reputational?**: `object`

Defined in: [types/cia.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L287)

Reputational impact details

#### description

> **description**: `string`

Description of reputational impact

#### impact

> **impact**: `string`

Impact severity level

***

### regulatory?

> `optional` **regulatory?**: `object`

Defined in: [types/cia.ts:295](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L295)

Regulatory impact details

#### description

> **description**: `string`

Description of regulatory impact

#### impact

> **impact**: `string`

Impact severity level

#### frameworks?

> `optional` **frameworks?**: `string`[]

List of affected regulatory frameworks

***

### summary?

> `optional` **summary?**: `string`

Defined in: [types/cia.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L305)

Executive summary of the overall impact
