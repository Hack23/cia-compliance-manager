[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / parseRiskLevel

# Variable: parseRiskLevel()

> **parseRiskLevel**: (`level`) => `number`

Defined in: [utils/index.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/utils/index.ts#L94)

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
