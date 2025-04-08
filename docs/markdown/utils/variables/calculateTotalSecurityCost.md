[**CIA Compliance Manager Documentation v0.8.7**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateTotalSecurityCost

# Variable: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize`, `industry`) => `object`

Defined in: [utils/index.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/utils/index.ts#L55)

Calculate total security costs across all CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### orgSize

`OrganizationSize` = `"medium"`

### industry

`Industry` = `"general"`

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
