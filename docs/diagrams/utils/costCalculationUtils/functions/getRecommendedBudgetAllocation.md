[**CIA Compliance Manager Diagrams v1.0.2**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / getRecommendedBudgetAllocation

# Function: getRecommendedBudgetAllocation()

> **getRecommendedBudgetAllocation**(`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [utils/costCalculationUtils.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/utils/costCalculationUtils.ts#L217)

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

### confidentiality

> **confidentiality**: `number`

### integrity

> **integrity**: `number`
