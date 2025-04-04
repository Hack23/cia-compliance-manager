[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getRecommendedBudgetAllocation

# Variable: getRecommendedBudgetAllocation()

> **getRecommendedBudgetAllocation**: (`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Defined in: [utils/index.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/utils/index.ts#L57)

Get recommended budget allocation based on security levels

## Parameters

### totalBudget

`number`

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

## Returns

`object`

### availability

> **availability**: `number`

### confidentiality

> **confidentiality**: `number`

### integrity

> **integrity**: `number`
