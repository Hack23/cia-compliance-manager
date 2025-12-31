[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [types/cia.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L250)

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

### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

Defined in: [types/cia.ts:258](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L258)

Estimated annual revenue loss range

***

### complianceViolations?

> `optional` **complianceViolations**: `string`[]

Defined in: [types/cia.ts:264](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L264)

List of compliance frameworks that would be violated

***

### description

> **description**: `string`

Defined in: [types/cia.ts:252](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L252)

Detailed description of the business impact

***

### financial?

> `optional` **financial**: `object`

Defined in: [types/cia.ts:267](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L267)

Financial impact details

#### annualLoss?

> `optional` **annualLoss**: `string`

Estimated annual loss amount

#### description

> **description**: `string`

Description of financial impact

#### impact

> **impact**: `string`

Impact severity level

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

Defined in: [types/cia.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L261)

Mean time to recover from the incident

***

### operational?

> `optional` **operational**: `object`

Defined in: [types/cia.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L277)

Operational impact details

#### description

> **description**: `string`

Description of operational impact

#### impact

> **impact**: `string`

Impact severity level

#### recoveryTime?

> `optional` **recoveryTime**: `string`

Time required to recover operations

***

### regulatory?

> `optional` **regulatory**: `object`

Defined in: [types/cia.ts:295](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L295)

Regulatory impact details

#### description

> **description**: `string`

Description of regulatory impact

#### frameworks?

> `optional` **frameworks**: `string`[]

List of affected regulatory frameworks

#### impact

> **impact**: `string`

Impact severity level

***

### reputational?

> `optional` **reputational**: `object`

Defined in: [types/cia.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L287)

Reputational impact details

#### description

> **description**: `string`

Description of reputational impact

#### impact

> **impact**: `string`

Impact severity level

***

### riskLevel

> **riskLevel**: `string`

Defined in: [types/cia.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L255)

Risk level classification (e.g., "Critical Risk", "High Risk", "Medium Risk")

***

### summary?

> `optional` **summary**: `string`

Defined in: [types/cia.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L305)

Executive summary of the overall impact
