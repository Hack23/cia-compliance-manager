[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [data/riskImpactData.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/data/riskImpactData.ts#L116)

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
