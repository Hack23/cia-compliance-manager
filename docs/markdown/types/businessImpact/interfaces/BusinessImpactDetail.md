[**CIA Compliance Manager Documentation v0.8.33**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/businessImpact](../README.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [types/businessImpact.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L14)

Business impact detail structure

## Properties

### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

Defined in: [types/businessImpact.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L22)

Estimated annual revenue loss

***

### competitiveAdvantage?

> `optional` **competitiveAdvantage**: `string`

Defined in: [types/businessImpact.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L40)

Value for competitiveAdvantage

***

### complianceImpact?

> `optional` **complianceImpact**: `string`

Defined in: [types/businessImpact.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L37)

Compliance impact description

***

### complianceViolations?

> `optional` **complianceViolations**: `string`[]

Defined in: [types/businessImpact.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L28)

Potential compliance violations

***

### description

> **description**: `string`

Defined in: [types/businessImpact.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L16)

Description of the impact

***

### financial?

> `optional` **financial**: `object`

Defined in: [types/businessImpact.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L43)

Financial impact details

#### annualLoss?

> `optional` **annualLoss**: `string`

Estimated annual loss

#### description

> **description**: `string`

Description of financial impact

#### impact

> **impact**: `string`

Severity of impact

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

Defined in: [types/businessImpact.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L25)

Mean time to recover from incidents

***

### operational?

> `optional` **operational**: `object`

Defined in: [types/businessImpact.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L55)

Operational impact details

#### description

> **description**: `string`

Description of operational impact

#### impact

> **impact**: `string`

Severity of impact

#### recoveryTime?

> `optional` **recoveryTime**: `string`

Expected recovery time

***

### operationalImpact?

> `optional` **operationalImpact**: `string`

Defined in: [types/businessImpact.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L31)

Operational impact description

***

### regulatory?

> `optional` **regulatory**: `object`

Defined in: [types/businessImpact.ts:76](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L76)

Regulatory impact details

#### description

> **description**: `string`

Description of regulatory impact

#### frameworks?

> `optional` **frameworks**: `string`[]

Affected compliance frameworks

#### impact

> **impact**: `string`

Severity of impact

***

### reputational?

> `optional` **reputational**: `object`

Defined in: [types/businessImpact.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L67)

Reputational impact details

#### description

> **description**: `string`

Description of reputational impact

#### impact

> **impact**: `string`

Severity of impact

***

### reputationalImpact?

> `optional` **reputationalImpact**: `string`

Defined in: [types/businessImpact.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L34)

Reputational impact description

***

### riskLevel

> **riskLevel**: `string`

Defined in: [types/businessImpact.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L19)

Risk level: "Critical", "High", "Medium", "Low", or "Minimal"

***

### summary?

> `optional` **summary**: `string`

Defined in: [types/businessImpact.ts:88](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/businessImpact.ts#L88)

Summary of overall impact
