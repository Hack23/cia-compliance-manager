[**CIA Compliance Manager Diagrams v1.0.1**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [utils/securityLevelUtils.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/utils/securityLevelUtils.ts#L193)

Get risk level string from a security level

Maps security levels to corresponding risk levels using an inverse relationship:
higher security levels correlate with lower risk levels. Used for risk assessment
and dashboard visualizations.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to assess

## Returns

`string`

Corresponding risk level: Critical, High, Medium, Low, or Minimal

## Example

```typescript
getRiskLevelFromSecurityLevel('None')        // 'Critical'
getRiskLevelFromSecurityLevel('Low')         // 'High'
getRiskLevelFromSecurityLevel('Moderate')    // 'Medium'
getRiskLevelFromSecurityLevel('High')        // 'Low'
getRiskLevelFromSecurityLevel('Very High')   // 'Minimal'

// Use in risk assessment
const riskLevel = getRiskLevelFromSecurityLevel(currentSecurityLevel);
const riskFormatted = formatRiskLevel(`${riskLevel} Risk`);
```
