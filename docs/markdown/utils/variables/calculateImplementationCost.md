[**CIA Compliance Manager — Markdown Documentation v1.1.142**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost

> **calculateImplementationCost**: (`securityLevel`, `orgSize`, `industry`) => [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

Defined in: [utils/index.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/utils/index.ts#L71)

Calculate implementation cost based on security level

## Parameters

### securityLevel

`string`

### orgSize?

[`OrganizationSize`](../costCalculationUtils/type-aliases/OrganizationSize.md) = `"medium"`

### industry?

[`Industry`](../costCalculationUtils/type-aliases/Industry.md) = `"general"`

## Returns

[`CostResult`](../costCalculationUtils/interfaces/CostResult.md)
