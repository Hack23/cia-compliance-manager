[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/statusUtils](../README.md) / getStatusVariant

# Function: getStatusVariant()

> **getStatusVariant**(`level`): [`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

Defined in: [utils/statusUtils.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/utils/statusUtils.ts#L47)

Converts a risk level string to a status badge variant

Maps security levels to appropriate badge variants for consistent
visual representation. Uses color-coded variants that align with
security posture intuition (green=secure, red=insecure).

## Parameters

### level

`string`

The risk level string (e.g., "Low Risk", "High Risk")

## Returns

[`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

The corresponding StatusType for the badge

## Example

```typescript
getStatusVariant('none')       // 'error' (red - critical)
getStatusVariant('low')        // 'warning' (yellow)
getStatusVariant('moderate')   // 'info' (blue)
getStatusVariant('high')       // 'success' (green)
getStatusVariant('very high')  // 'purple' (premium)
getStatusVariant('unknown')    // 'neutral' (gray)

// Usage in component
<StatusBadge variant={getStatusVariant(securityLevel)}>
  {securityLevel}
</StatusBadge>
```
