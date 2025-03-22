[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost()

> **calculateImplementationCost**: (`level`, `orgSize`, `industry`) => `object`

Defined in: [utils/index.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/utils/index.ts#L52)

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

`"general"` | `"financial"` | `"healthcare"` | `"government"` | `"retail"` | `"technology"` | `"manufacturing"`

## Returns

`object`

Object containing capex and opex costs

### capex

> **capex**: `number`

### opex

> **opex**: `number`
