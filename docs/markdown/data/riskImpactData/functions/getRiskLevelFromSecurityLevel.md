[**CIA Compliance Manager Documentation v1.1.24**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [data/riskImpactData.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/data/riskImpactData.ts#L116)

Get risk level from security level

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to convert

## Returns

`string`

Risk level string corresponding to the security level

## Example

```typescript
getRiskLevelFromSecurityLevel("None") // Returns "Critical"
getRiskLevelFromSecurityLevel("Very High") // Returns "Minimal"
```
