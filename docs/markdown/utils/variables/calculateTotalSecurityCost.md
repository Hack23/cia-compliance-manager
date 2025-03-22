[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateTotalSecurityCost

# Variable: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize`, `industry`) => `object`

Defined in: [utils/index.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/utils/index.ts#L53)

Calculate total cost of implementing multiple security controls

## Business Perspective

This function helps organizations understand the combined financial impact
of their security choices across the CIA triad. It provides a consolidated
view for budget planning and approval processes. 💼

## Parameters

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

### orgSize

Organization size

`"small"` | `"medium"` | `"large"` | `"enterprise"`

### industry

Industry type

`"general"` | `"financial"` | `"healthcare"` | `"government"` | `"retail"` | `"technology"` | `"manufacturing"`

## Returns

`object`

Object containing total costs and breakdown

### availabilityCost

> **availabilityCost**: `object`

#### availabilityCost.capex

> **capex**: `number`

#### availabilityCost.opex

> **opex**: `number`

### confidentialityCost

> **confidentialityCost**: `object`

#### confidentialityCost.capex

> **capex**: `number`

#### confidentialityCost.opex

> **opex**: `number`

### integrityCost

> **integrityCost**: `object`

#### integrityCost.capex

> **capex**: `number`

#### integrityCost.opex

> **opex**: `number`

### totalCapex

> **totalCapex**: `number`

### totalCost

> **totalCost**: `number`

### totalOpex

> **totalOpex**: `number`
