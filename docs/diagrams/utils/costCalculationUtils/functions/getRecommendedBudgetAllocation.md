[**CIA Compliance Manager — UML Diagrams v1.1.142**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / getRecommendedBudgetAllocation

# Function: getRecommendedBudgetAllocation()

> **getRecommendedBudgetAllocation**(`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [utils/costCalculationUtils.ts:196](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/utils/costCalculationUtils.ts#L196)

Get recommended budget allocation based on security levels

## Parameters

### totalBudget

`number`

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`object`

### availability

> **availability**: `number`

### integrity

> **integrity**: `number`

### confidentiality

> **confidentiality**: `number`
