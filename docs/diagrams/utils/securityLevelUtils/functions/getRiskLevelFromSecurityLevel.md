[**CIA Compliance Manager — UML Diagrams v1.1.136**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [utils/securityLevelUtils.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/5f73d9fe3573629a0de40e142b8deeb23a7ae9b4/src/utils/securityLevelUtils.ts#L193)

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
