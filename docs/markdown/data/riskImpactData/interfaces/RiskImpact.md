[**CIA Compliance Manager Documentation v1.1.1**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / RiskImpact

# Interface: RiskImpact

Defined in: [data/riskImpactData.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L20)

Risk impact structure with comprehensive business impact details

## Properties

### annualLoss?

> `optional` **annualLoss**: `string`

Defined in: [data/riskImpactData.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L28)

Annual financial loss estimate (optional)

***

### competitiveImpact?

> `optional` **competitiveImpact**: `string`

Defined in: [data/riskImpactData.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L34)

Competitive business impact (optional)

***

### description

> **description**: `string`

Defined in: [data/riskImpactData.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L22)

Human-readable description of the risk impact

***

### financialImpact?

> `optional` **financialImpact**: `string`

Defined in: [data/riskImpactData.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L36)

Financial impact details (legacy, optional)

***

### frameworks?

> `optional` **frameworks**: `string`[]

Defined in: [data/riskImpactData.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L32)

Compliance frameworks affected (optional)

***

### impact

> **impact**: `string`

Defined in: [data/riskImpactData.ts:24](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L24)

Overall business impact summary

***

### level

> **level**: [`RiskImpactLevel`](../type-aliases/RiskImpactLevel.md)

Defined in: [data/riskImpactData.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L26)

Impact level classification

***

### operationalImpact?

> `optional` **operationalImpact**: `string`

Defined in: [data/riskImpactData.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L38)

Operational impact details (legacy, optional)

***

### recoveryTime?

> `optional` **recoveryTime**: `string`

Defined in: [data/riskImpactData.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L30)

Time required to recover from incident (optional)

***

### regulatoryImpact?

> `optional` **regulatoryImpact**: `string`

Defined in: [data/riskImpactData.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L42)

Regulatory compliance impact (optional)

***

### reputationalImpact?

> `optional` **reputationalImpact**: `string`

Defined in: [data/riskImpactData.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/data/riskImpactData.ts#L40)

Reputational impact details (optional)
