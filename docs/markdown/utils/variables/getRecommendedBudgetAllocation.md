[**CIA Compliance Manager Documentation v0.8.23**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getRecommendedBudgetAllocation

# Variable: getRecommendedBudgetAllocation()

> **getRecommendedBudgetAllocation**: (`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Defined in: [utils/index.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/55488ba3ac0003e4435eb3634b6ab6e9b8b05a9b/src/utils/index.ts#L57)

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

### confidentiality

> **confidentiality**: `number`

### integrity

> **integrity**: `number`
