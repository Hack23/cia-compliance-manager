[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / parseRiskLevel

# Variable: parseRiskLevel()

> **parseRiskLevel**: (`level`) => `number`

Defined in: [utils/index.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/utils/index.ts#L96)

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
