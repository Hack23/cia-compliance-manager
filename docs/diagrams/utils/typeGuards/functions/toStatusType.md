[**CIA Compliance Manager Diagrams v0.8.10**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback`): [`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:937](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/utils/typeGuards.ts#L937)

Safely converts a string to a StatusType, with fallback

## Parameters

### value

`unknown`

The value to convert

### fallback

[`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md) = `"neutral"`

The fallback value (defaults to "neutral")

## Returns

[`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

A valid StatusType
