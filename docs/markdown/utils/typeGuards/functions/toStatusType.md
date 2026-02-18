[**CIA Compliance Manager Documentation v1.1.20**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback?`): [`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:963](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/utils/typeGuards.ts#L963)

Safely converts a string to a StatusType, with fallback

## Parameters

### value

`unknown`

The value to convert

### fallback?

[`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md) = `"neutral"`

The fallback value (defaults to "neutral")

## Returns

[`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

A valid StatusType
