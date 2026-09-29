[**CIA Compliance Manager — Markdown Documentation v1.1.154**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback?`): [`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:942](https://github.com/Hack23/cia-compliance-manager/blob/42e66b46977944fe728f624a83223bbbb90a81b2/src/utils/typeGuards.ts#L942)

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
