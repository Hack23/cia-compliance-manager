[**CIA Compliance Manager Diagrams v1.1.13**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [coreConstants](../README.md) / SECURITY\_LEVEL\_COLORS

# Variable: SECURITY\_LEVEL\_COLORS

> `const` **SECURITY\_LEVEL\_COLORS**: `object`

Defined in: [constants/coreConstants.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/constants/coreConstants.ts#L129)

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
