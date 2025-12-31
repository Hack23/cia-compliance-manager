[**CIA Compliance Manager Documentation v1.1.4**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getRiskLevelFromSecurityLevel

# Variable: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**: (`level`) => `string`

Defined in: [utils/index.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/utils/index.ts#L118)

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
