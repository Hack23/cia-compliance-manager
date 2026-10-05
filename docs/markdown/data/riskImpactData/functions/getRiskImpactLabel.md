[**CIA Compliance Manager — Markdown Documentation v1.1.158**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskImpactLabel

# Function: getRiskImpactLabel()

> **getRiskImpactLabel**(`level`): `string`

Defined in: [data/riskImpactData.ts:505](https://github.com/Hack23/cia-compliance-manager/blob/65d61d3ef115f9c7c0045d3370762b4013c56a97/src/data/riskImpactData.ts#L505)

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
