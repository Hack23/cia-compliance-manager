[**CIA Compliance Manager — UML Diagrams v1.1.140**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatRiskLevel

# Variable: formatRiskLevel

> **formatRiskLevel**: (`riskLevel`) => `string`

Defined in: [utils/index.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/utils/index.ts#L87)

Formats a risk level by adding an appropriate emoji icon

Enhances risk level text with visual indicators for quick comprehension
in dashboards and reports. Handles case-insensitive matching.

## Parameters

### riskLevel

`string`

The risk level text to format (case-insensitive)

## Returns

`string`

Risk level with emoji icon prefix

## Example

```typescript
formatRiskLevel('Critical Risk')  // "⚠️ Critical Risk"
formatRiskLevel('High Risk')      // "🔴 High Risk"
formatRiskLevel('Medium Risk')    // "🟠 Medium Risk"
formatRiskLevel('Low Risk')       // "🟡 Low Risk"
formatRiskLevel('Minimal Risk')   // "🟢 Minimal Risk"
formatRiskLevel('No Risk')        // "✅ No Risk"
formatRiskLevel('Unknown')        // "❓ Unknown"

// Case-insensitive
formatRiskLevel('high risk')      // "🔴 high risk"
```
