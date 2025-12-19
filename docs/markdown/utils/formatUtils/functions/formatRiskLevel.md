[**CIA Compliance Manager Documentation v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatRiskLevel

# Function: formatRiskLevel()

> **formatRiskLevel**(`riskLevel`): `string`

Defined in: [utils/formatUtils.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/utils/formatUtils.ts#L188)

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
