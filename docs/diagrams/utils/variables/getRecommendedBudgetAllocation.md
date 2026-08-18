[**CIA Compliance Manager — UML Diagrams v1.1.134**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getRecommendedBudgetAllocation

# Variable: getRecommendedBudgetAllocation

> **getRecommendedBudgetAllocation**: (`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Defined in: [utils/index.ts:74](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/utils/index.ts#L74)

Get recommended budget allocation based on security levels

## Parameters

### totalBudget

`number`

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`object`

### availability

> **availability**: `number`

### integrity

> **integrity**: `number`

### confidentiality

> **confidentiality**: `number`
