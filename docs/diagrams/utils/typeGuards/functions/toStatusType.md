[**CIA Compliance Manager Diagrams v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback`): [`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:906](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/utils/typeGuards.ts#L906)

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
