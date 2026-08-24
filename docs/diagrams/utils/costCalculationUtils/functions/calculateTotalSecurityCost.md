[**CIA Compliance Manager — UML Diagrams v1.1.137**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateTotalSecurityCost

# Function: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize?`, `industry?`): `object`

Defined in: [utils/costCalculationUtils.ts:110](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/utils/costCalculationUtils.ts#L110)

Calculate total security costs across all CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### orgSize?

[`OrganizationSize`](../type-aliases/OrganizationSize.md) = `"medium"`

### industry?

[`Industry`](../type-aliases/Industry.md) = `"general"`

## Returns

`object`

### availabilityCost

> **availabilityCost**: [`CostResult`](../interfaces/CostResult.md)

### integrityCost

> **integrityCost**: [`CostResult`](../interfaces/CostResult.md)

### confidentialityCost

> **confidentialityCost**: [`CostResult`](../interfaces/CostResult.md)

### totalCapex

> **totalCapex**: `number`

### totalOpex

> **totalOpex**: `number`

### totalCost

> **totalCost**: `number`
