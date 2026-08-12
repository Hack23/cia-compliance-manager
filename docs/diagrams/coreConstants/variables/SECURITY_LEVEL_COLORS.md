[**CIA Compliance Manager — UML Diagrams v1.1.131**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [coreConstants](../README.md) / SECURITY\_LEVEL\_COLORS

# Variable: SECURITY\_LEVEL\_COLORS

> `const` **SECURITY\_LEVEL\_COLORS**: `object`

Defined in: [constants/coreConstants.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/bb9cb6ff8b9ad8246d145529d368cb2eb49471c5/src/constants/coreConstants.ts#L129)

Security level color scheme mapping.

Color palette for representing security levels visually. Colors progress
from red (None) through orange/yellow (Low/Moderate) to green/blue
(High/Very High), providing intuitive visual feedback on security posture.

## Type Declaration

### NONE

> **NONE**: `string` = `"#e74c3c"`

### LOW

> **LOW**: `string` = `"#f39c12"`

### MODERATE

> **MODERATE**: `string` = `"#f1c40f"`

### HIGH

> **HIGH**: `string` = `"#2ecc71"`

### VERY\_HIGH

> **VERY\_HIGH**: `string` = `"#3498db"`

## Example

```typescript
// Apply color based on security level
const level = 'High';
const color = SECURITY_LEVEL_COLORS.HIGH; // "#2ecc71" (green)

// In styled component
<Badge style={{ backgroundColor: color }}>
  {level}
</Badge>
```
