[**CIA Compliance Manager — UML Diagrams v1.1.142**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback?`): [`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:942](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/utils/typeGuards.ts#L942)

Safely converts a string to a StatusType, with fallback

## Parameters

### value

`unknown`

The value to convert

### fallback?

[`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md) = `"neutral"`

The fallback value (defaults to "neutral")

## Returns

[`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

A valid StatusType
