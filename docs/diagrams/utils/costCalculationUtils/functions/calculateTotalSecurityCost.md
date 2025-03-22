[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateTotalSecurityCost

# Function: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize`, `industry`): `object`

Defined in: [src/utils/costCalculationUtils.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/utils/costCalculationUtils.ts#L118)

Calculate total cost of implementing multiple security controls

## Business Perspective

This function helps organizations understand the combined financial impact
of their security choices across the CIA triad. It provides a consolidated
view for budget planning and approval processes. 💼

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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
