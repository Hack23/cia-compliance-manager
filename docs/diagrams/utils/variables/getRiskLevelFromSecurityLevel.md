[**CIA Compliance Manager — UML Diagrams v1.1.134**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getRiskLevelFromSecurityLevel

# Variable: getRiskLevelFromSecurityLevel

> **getRiskLevelFromSecurityLevel**: (`level`) => `string`

Defined in: [utils/index.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/utils/index.ts#L107)

Get risk level string from security level

Maps security levels to corresponding risk levels using inverse relationship:
higher security = lower risk. Essential for risk assessment and reporting.

## Parameters

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

`string`

Risk level string describing the security posture

## Example

```typescript
getRiskLevelFromSecurityLevel('None')       // "Critical Risk"
getRiskLevelFromSecurityLevel('Low')        // "High Risk"
getRiskLevelFromSecurityLevel('Moderate')   // "Medium Risk"
getRiskLevelFromSecurityLevel('High')       // "Low Risk"
getRiskLevelFromSecurityLevel('Very High')  // "Minimal Risk"

// Usage in risk assessment
const securityLevel = getSecurityLevel();
const riskLevel = getRiskLevelFromSecurityLevel(securityLevel);
console.log(`Current risk: ${riskLevel}`);
```
