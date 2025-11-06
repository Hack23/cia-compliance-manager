[**CIA Compliance Manager Documentation v0.8.36**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toStatusType

# Function: toStatusType()

> **toStatusType**(`value`, `fallback`): [`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

Defined in: [utils/typeGuards.ts:906](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/utils/typeGuards.ts#L906)

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
