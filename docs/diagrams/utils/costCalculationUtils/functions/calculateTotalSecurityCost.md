[**CIA Compliance Manager Diagrams v0.8.40**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateTotalSecurityCost

# Function: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize`, `industry`): `object`

Defined in: [utils/costCalculationUtils.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/utils/costCalculationUtils.ts#L116)

Calculate total security costs across all CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### orgSize

[`OrganizationSize`](../type-aliases/OrganizationSize.md) = `"medium"`

### industry

[`Industry`](../type-aliases/Industry.md) = `"general"`

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
