[**CIA Compliance Manager — Markdown Documentation v1.1.114**](../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../modules.md) / colorConstants

# colorConstants

Color constants for security levels and CIA components

This module provides a centralized color system for representing security
levels and CIA triad components. Colors are carefully chosen to provide
intuitive visual feedback and ensure consistency across the application.

## Example

```typescript
import { SECURITY_LEVEL_COLORS, CIA_COMPONENT_COLORS, getSecurityLevelColorPair } from './colorConstants';

// Get colors for a security level
const colors = getSecurityLevelColorPair('High');
console.log(colors.bg);   // "#27ae60" (green)
console.log(colors.text); // "#00e676" (light green)

// Get CIA component colors
const integrityColors = CIA_COMPONENT_COLORS.INTEGRITY;
console.log(integrityColors.PRIMARY); // "#27ae60" (green)
```

## Interfaces

- [SecurityLevelColorPair](interfaces/SecurityLevelColorPair.md)

## Variables

- [SECURITY\_LEVEL\_COLORS](variables/SECURITY_LEVEL_COLORS.md)
- [CIA\_COMPONENT\_COLORS](variables/CIA_COMPONENT_COLORS.md)

## Functions

- [getSecurityLevelColorPair](functions/getSecurityLevelColorPair.md)
- [getCIAComponentColors](functions/getCIAComponentColors.md)
