[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost()

> **calculateImplementationCost**: (`level`, `orgSize`, `industry`) => `object`

Defined in: [utils/index.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/utils/index.ts#L54)

Calculate implementation costs for a given security level

## Parameters

### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level

### orgSize

Organization size

`"small"` | `"medium"` | `"large"` | `"enterprise"`

### industry

Industry type

`"financial"` | `"general"` | `"healthcare"` | `"government"` | `"retail"` | `"technology"` | `"manufacturing"`

## Returns

`object`

Object containing capex and opex costs

### capex

> **capex**: `number`

### opex

> **opex**: `number`
