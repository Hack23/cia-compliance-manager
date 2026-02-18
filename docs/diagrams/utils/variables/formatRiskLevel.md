[**CIA Compliance Manager Diagrams v1.1.20**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / formatRiskLevel

# Variable: formatRiskLevel()

> **formatRiskLevel**: (`riskLevel`) => `string`

Defined in: [utils/index.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/utils/index.ts#L96)

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
