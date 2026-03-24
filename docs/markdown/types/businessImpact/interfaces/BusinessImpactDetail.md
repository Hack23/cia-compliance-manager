[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/businessImpact](../README.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [types/businessImpact.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L14)

Business impact detail structure

## Properties

### description

> **description**: `string`

Defined in: [types/businessImpact.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L16)

Description of the impact

***

### riskLevel

> **riskLevel**: `string`

Defined in: [types/businessImpact.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L19)

Risk level: "Critical", "High", "Medium", "Low", or "Minimal"

***

### annualRevenueLoss?

> `optional` **annualRevenueLoss?**: `string`

Defined in: [types/businessImpact.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L22)

Estimated annual revenue loss

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover?**: `string`

Defined in: [types/businessImpact.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L25)

Mean time to recover from incidents

***

### complianceViolations?

> `optional` **complianceViolations?**: `string`[]

Defined in: [types/businessImpact.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L28)

Potential compliance violations

***

### operationalImpact?

> `optional` **operationalImpact?**: `string`

Defined in: [types/businessImpact.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L31)

Operational impact description

***

### reputationalImpact?

> `optional` **reputationalImpact?**: `string`

Defined in: [types/businessImpact.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L34)

Reputational impact description

***

### complianceImpact?

> `optional` **complianceImpact?**: `string`

Defined in: [types/businessImpact.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L37)

Compliance impact description

***

### competitiveAdvantage?

> `optional` **competitiveAdvantage?**: `string`

Defined in: [types/businessImpact.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L40)

Value for competitiveAdvantage

***

### financial?

> `optional` **financial?**: `object`

Defined in: [types/businessImpact.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L43)

Financial impact details

#### description

> **description**: `string`

Description of financial impact

#### impact

> **impact**: `string`

Severity of impact

#### annualLoss?

> `optional` **annualLoss?**: `string`

Estimated annual loss

***

### operational?

> `optional` **operational?**: `object`

Defined in: [types/businessImpact.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L55)

Operational impact details

#### description

> **description**: `string`

Description of operational impact

#### impact

> **impact**: `string`

Severity of impact

#### recoveryTime?

> `optional` **recoveryTime?**: `string`

Expected recovery time

***

### reputational?

> `optional` **reputational?**: `object`

Defined in: [types/businessImpact.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L67)

Reputational impact details

#### description

> **description**: `string`

Description of reputational impact

#### impact

> **impact**: `string`

Severity of impact

***

### regulatory?

> `optional` **regulatory?**: `object`

Defined in: [types/businessImpact.ts:76](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L76)

Regulatory impact details

#### description

> **description**: `string`

Description of regulatory impact

#### impact

> **impact**: `string`

Severity of impact

#### frameworks?

> `optional` **frameworks?**: `string`[]

Affected compliance frameworks

***

### summary?

> `optional` **summary?**: `string`

Defined in: [types/businessImpact.ts:88](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/businessImpact.ts#L88)

Summary of overall impact
