[**CIA Compliance Manager Documentation v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskImpactLabel

# Function: getRiskImpactLabel()

> **getRiskImpactLabel**(`level`): `string`

Defined in: [data/riskImpactData.ts:510](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/data/riskImpactData.ts#L510)

Get risk impact level label

Converts a risk level into a human-readable description of the business
impact and required response.

## Parameters

### level

`string`

Risk level to get label for

## Returns

`string`

Human-readable description of the risk impact level

## Example

```typescript
getRiskImpactLabel("Critical") // Returns "Severe business impact requiring immediate action"
getRiskImpactLabel("Low") // Returns "Minor business impact to be addressed in normal operations"
getRiskImpactLabel("Unknown") // Returns "Impact level not defined"
```
