[**CIA Compliance Manager — UML Diagrams v1.1.124**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [types/cia.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L245)

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

Defined in: [types/cia.ts:247](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L247)

Detailed description of the business impact

***

### riskLevel

> **riskLevel**: `string`

Defined in: [types/cia.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L250)

Risk level classification (e.g., "Critical Risk", "High Risk", "Medium Risk")

***

### annualRevenueLoss?

> `optional` **annualRevenueLoss?**: `string`

Defined in: [types/cia.ts:253](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L253)

Estimated annual revenue loss range

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover?**: `string`

Defined in: [types/cia.ts:256](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L256)

Mean time to recover from the incident

***

### complianceViolations?

> `optional` **complianceViolations?**: `string`[]

Defined in: [types/cia.ts:259](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L259)

List of compliance frameworks that would be violated

***

### financial?

> `optional` **financial?**: `object`

Defined in: [types/cia.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L262)

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

Defined in: [types/cia.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L272)

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

Defined in: [types/cia.ts:282](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L282)

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

Defined in: [types/cia.ts:290](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L290)

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

Defined in: [types/cia.ts:300](https://github.com/Hack23/cia-compliance-manager/blob/ef7938d5209cc131d632ede3c9addb304b63519c/src/types/cia.ts#L300)

Executive summary of the overall impact
