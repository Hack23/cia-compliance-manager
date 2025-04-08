[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getRiskScoreFromSecurityLevel

# Variable: getRiskScoreFromSecurityLevel()

> **getRiskScoreFromSecurityLevel**: (`level`) => `number`

Defined in: [utils/index.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/utils/index.ts#L93)

Convert security level to a risk score

## Business Perspective

This utility provides a numeric representation of risk based on security level,
which is useful for risk assessment visualizations and calculations. Higher
numbers represent higher risk, allowing business stakeholders to quantify
the potential impact of different security postures. 📊

## Parameters

### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level to convert

## Returns

`number`

Risk score (0-100, with higher values indicating higher risk)

## See

getRiskLevelFromSecurityLevel - For string representation
