[**CIA Compliance Manager Diagrams v1.0.4**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskImpactLabel

# Function: getRiskImpactLabel()

> **getRiskImpactLabel**(`level`): `string`

Defined in: [data/riskImpactData.ts:510](https://github.com/Hack23/cia-compliance-manager/blob/0b7da06a2d009cc9cac58e6400d72865b757f5d4/src/data/riskImpactData.ts#L510)

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
