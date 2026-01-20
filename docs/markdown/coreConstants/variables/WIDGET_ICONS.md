[**CIA Compliance Manager Documentation v1.1.11**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [coreConstants](../README.md) / WIDGET\_ICONS

# Variable: WIDGET\_ICONS

> `const` **WIDGET\_ICONS**: `object`

Defined in: [constants/coreConstants.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/constants/coreConstants.ts#L47)

Widget icon constants for consistent icon use across the application.

Each widget has a unique emoji icon that visually represents its purpose
in the dashboard. These icons improve user recognition and navigation.

## Type Declaration

### AVAILABILITY\_IMPACT

> **AVAILABILITY\_IMPACT**: `string` = `"⏱️"`

### BUSINESS\_IMPACT

> **BUSINESS\_IMPACT**: `string` = `"💼"`

### CIA\_IMPACT\_SUMMARY

> **CIA\_IMPACT\_SUMMARY**: `string` = `"🧩"`

### COMPLIANCE\_STATUS

> **COMPLIANCE\_STATUS**: `string` = `"⚖️"`

### CONFIDENTIALITY\_IMPACT

> **CONFIDENTIALITY\_IMPACT**: `string` = `"🔒"`

### COST\_ESTIMATION

> **COST\_ESTIMATION**: `string` = `"💲"`

### INTEGRITY\_IMPACT

> **INTEGRITY\_IMPACT**: `string` = `"✓"`

### SECURITY\_LEVEL

> **SECURITY\_LEVEL**: `string` = `"🛡️"`

### SECURITY\_RESOURCES

> **SECURITY\_RESOURCES**: `string` = `"📚"`

### SECURITY\_SUMMARY

> **SECURITY\_SUMMARY**: `string` = `"🔐"`

### SECURITY\_VISUALIZATION

> **SECURITY\_VISUALIZATION**: `string` = `"📊"`

### TECHNICAL\_DETAILS

> **TECHNICAL\_DETAILS**: `string` = `"⚙️"`

### TECHNICAL\_IMPLEMENTATION

> **TECHNICAL\_IMPLEMENTATION**: `string` = `"⚙️"`

### VALUE\_CREATION

> **VALUE\_CREATION**: `string` = `"💰"`

## Example

```typescript
// In widget header
<h2>
  {WIDGET_ICONS.SECURITY_SUMMARY} Security Summary
</h2>

// In navigation menu
const menuItems = [
  { icon: WIDGET_ICONS.COMPLIANCE_STATUS, label: 'Compliance' },
  { icon: WIDGET_ICONS.COST_ESTIMATION, label: 'Cost Analysis' }
];
```
