[**CIA Compliance Manager Documentation v1.1.26**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [coreConstants](../README.md) / SECURITY\_LEVEL\_COLORS

# Variable: SECURITY\_LEVEL\_COLORS

> `const` **SECURITY\_LEVEL\_COLORS**: `object`

Defined in: [constants/coreConstants.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/constants/coreConstants.ts#L129)

Security level color scheme mapping.

Color palette for representing security levels visually. Colors progress
from red (None) through orange/yellow (Low/Moderate) to green/blue
(High/Very High), providing intuitive visual feedback on security posture.

## Type Declaration

### HIGH

> **HIGH**: `string` = `"#2ecc71"`

### LOW

> **LOW**: `string` = `"#f39c12"`

### MODERATE

> **MODERATE**: `string` = `"#f1c40f"`

### NONE

> **NONE**: `string` = `"#e74c3c"`

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
