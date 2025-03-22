[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / parseRiskLevel

# Variable: parseRiskLevel()

> **parseRiskLevel**: (`level`) => `number`

Defined in: [src/utils/index.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/utils/index.ts#L94)

Parses risk level string to numeric value for calculations

## Business Perspective

This function standardizes risk levels into quantifiable values that
can be used for risk calculations, comparison, and aggregation in
business impact analysis and reporting. ⚠️

## Parameters

### level

Risk level as string

`undefined` | `null` | `string`

## Returns

`number`

Risk level as number (0-4, where 4 is highest risk)
