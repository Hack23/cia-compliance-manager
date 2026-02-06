[**CIA Compliance Manager Diagrams v1.1.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [utils/securityLevelUtils.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/utils/securityLevelUtils.ts#L193)

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
