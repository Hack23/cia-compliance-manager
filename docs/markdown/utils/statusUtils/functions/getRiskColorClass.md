[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/statusUtils](../README.md) / getRiskColorClass

# Function: getRiskColorClass()

> **getRiskColorClass**(`risk`): `string`

Defined in: [utils/statusUtils.ts:81](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/utils/statusUtils.ts#L81)

Gets the appropriate Tailwind CSS color class for a risk level

Provides Tailwind CSS color classes for risk level text styling with
dark mode support. Colors semantically represent risk severity using
industry-standard color conventions.

## Parameters

### risk

`string`

The risk level string (e.g., "Low Risk", "Critical Risk")

## Returns

`string`

Tailwind CSS class string for text color with dark mode support

## Example

```typescript
getRiskColorClass('Low Risk')      // 'text-green-600 dark:text-green-400'
getRiskColorClass('Medium Risk')   // 'text-yellow-600 dark:text-yellow-400'
getRiskColorClass('High Risk')     // 'text-orange-600 dark:text-orange-400'
getRiskColorClass('Critical Risk') // 'text-red-600 dark:text-red-400'
getRiskColorClass('Unknown')       // 'text-gray-600 dark:text-gray-400'

// Usage in component
<span className={getRiskColorClass(riskLevel)}>
  Risk Level: {riskLevel}
</span>
```
