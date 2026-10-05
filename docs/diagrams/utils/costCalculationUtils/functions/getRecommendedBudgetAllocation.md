[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / getRecommendedBudgetAllocation

# Function: getRecommendedBudgetAllocation()

> **getRecommendedBudgetAllocation**(`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [utils/costCalculationUtils.ts:196](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/utils/costCalculationUtils.ts#L196)

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
