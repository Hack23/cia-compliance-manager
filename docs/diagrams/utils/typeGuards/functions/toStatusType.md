[**CIA Compliance Manager — UML Diagrams v1.1.116**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback?`): [`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:942](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/utils/typeGuards.ts#L942)

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
