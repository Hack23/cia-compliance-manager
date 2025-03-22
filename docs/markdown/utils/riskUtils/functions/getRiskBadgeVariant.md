[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getRiskBadgeVariant

# Function: getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): [`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

Defined in: [src/utils/riskUtils.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/utils/riskUtils.ts#L50)

Get badge variant based on risk level

## Business Perspective

This utility helps visualize risk levels consistently across the application,
enabling users to quickly identify the severity of risks through color-coded
badges. The visual consistency reinforces risk communication standards. 📊

## Parameters

### riskLevel

String representing the risk level

`undefined` | `string`

## Returns

[`StatusType`](../../../components/common/StatusBadge/type-aliases/StatusType.md)

Badge variant name for styling
