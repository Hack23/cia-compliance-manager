[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateImplementationCost

# Function: calculateImplementationCost()

> **calculateImplementationCost**(`level`, `orgSize`, `industry`): `object`

Defined in: [src/utils/costCalculationUtils.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/utils/costCalculationUtils.ts#L77)

Calculate implementation costs for a given security level

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

### orgSize

Organization size

`"small"` | `"medium"` | `"large"` | `"enterprise"`

### industry

Industry type

`"general"` | `"financial"` | `"healthcare"` | `"government"` | `"retail"` | `"technology"` | `"manufacturing"`

## Returns

`object`

Object containing capex and opex costs

### capex

> **capex**: `number`

### opex

> **opex**: `number`
