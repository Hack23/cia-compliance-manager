[**CIA Compliance Manager — Markdown Documentation v1.1.128**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [data/riskImpactData.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/data/riskImpactData.ts#L116)

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
