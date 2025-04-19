[**CIA Compliance Manager Diagrams v0.8.9**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateTotalSecurityCost

# Variable: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize`, `industry`) => `object`

Defined in: [utils/index.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/utils/index.ts#L55)

Calculate total security costs across all CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### orgSize

[`OrganizationSize`](../costCalculationUtils/type-aliases/OrganizationSize.md) = `"medium"`

### industry

[`Industry`](../costCalculationUtils/type-aliases/Industry.md) = `"general"`

## Returns

`object`

### availabilityCost

> **availabilityCost**: `CostResult`

### confidentialityCost

> **confidentialityCost**: `CostResult`

### integrityCost

> **integrityCost**: `CostResult`

### totalCapex

> **totalCapex**: `number`

### totalCost

> **totalCost**: `number`

### totalOpex

> **totalOpex**: `number`
