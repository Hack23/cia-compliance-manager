[**CIA Compliance Manager — UML Diagrams v1.1.137**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost

> **calculateImplementationCost**: (`securityLevel`, `orgSize`, `industry`) => [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

Defined in: [utils/index.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/utils/index.ts#L71)

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
