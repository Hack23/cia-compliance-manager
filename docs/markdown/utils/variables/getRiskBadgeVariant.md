[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getRiskBadgeVariant

# Variable: getRiskBadgeVariant()

> **getRiskBadgeVariant**: (`riskLevel`) => [`StatusType`](../../typedoc-entry/type-aliases/StatusType.md)

Defined in: [utils/index.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/utils/index.ts#L89)

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

[`StatusType`](../../typedoc-entry/type-aliases/StatusType.md)

Badge variant name for styling
