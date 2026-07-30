[**CIA Compliance Manager — UML Diagrams v1.1.123**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskImpactLabel

# Function: getRiskImpactLabel()

> **getRiskImpactLabel**(`level`): `string`

Defined in: [data/riskImpactData.ts:505](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/data/riskImpactData.ts#L505)

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
