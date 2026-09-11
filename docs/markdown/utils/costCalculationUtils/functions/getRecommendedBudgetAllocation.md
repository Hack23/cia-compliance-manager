[**CIA Compliance Manager — Markdown Documentation v1.1.146**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/costCalculationUtils](../README.md) / getRecommendedBudgetAllocation

# Function: getRecommendedBudgetAllocation()

> **getRecommendedBudgetAllocation**(`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [utils/costCalculationUtils.ts:196](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/utils/costCalculationUtils.ts#L196)

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
