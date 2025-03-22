[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getRiskScoreFromSecurityLevel

# Variable: getRiskScoreFromSecurityLevel()

> **getRiskScoreFromSecurityLevel**: (`level`) => `number`

Defined in: [src/utils/index.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/utils/index.ts#L91)

Convert security level to a risk score

## Business Perspective

This utility provides a numeric representation of risk based on security level,
which is useful for risk assessment visualizations and calculations. Higher
numbers represent higher risk, allowing business stakeholders to quantify
the potential impact of different security postures. 📊

## Parameters

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Security level to convert

## Returns

`number`

Risk score (0-100, with higher values indicating higher risk)

## See

getRiskLevelFromSecurityLevel - For string representation
