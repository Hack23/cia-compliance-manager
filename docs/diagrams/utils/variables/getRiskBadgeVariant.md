[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getRiskBadgeVariant

# Variable: getRiskBadgeVariant()

> **getRiskBadgeVariant**: (`riskLevel`) => [`StatusType`](../../typedoc-entry/type-aliases/StatusType.md)

Defined in: [utils/index.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/utils/index.ts#L91)

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
