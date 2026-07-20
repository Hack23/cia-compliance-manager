[**CIA Compliance Manager — UML Diagrams v1.1.116**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskImpactLabel

# Function: getRiskImpactLabel()

> **getRiskImpactLabel**(`level`): `string`

Defined in: [data/riskImpactData.ts:505](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/data/riskImpactData.ts#L505)

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
