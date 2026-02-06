[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [coreConstants](../README.md) / WIDGET\_TITLES

# Variable: WIDGET\_TITLES

> `const` **WIDGET\_TITLES**: `object`

Defined in: [constants/coreConstants.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/constants/coreConstants.ts#L182)

Widget title constants for consistent naming.

Standard titles for all dashboard widgets. Using these constants ensures
consistent naming across the application and simplifies localization
efforts if needed in the future.

## Type Declaration

### AVAILABILITY\_IMPACT

> **AVAILABILITY\_IMPACT**: `string` = `"Availability Impact"`

### BUSINESS\_IMPACT

> **BUSINESS\_IMPACT**: `string` = `"Business Impact Analysis"`

### CIA\_IMPACT\_SUMMARY

> **CIA\_IMPACT\_SUMMARY**: `string` = `"CIA Impact Summary"`

### COMPLIANCE\_STATUS

> **COMPLIANCE\_STATUS**: `string` = `"Compliance Status"`

### CONFIDENTIALITY\_IMPACT

> **CONFIDENTIALITY\_IMPACT**: `string` = `"Confidentiality Impact"`

### COST\_ESTIMATION

> **COST\_ESTIMATION**: `string` = `"Cost Estimation"`

### INTEGRITY\_IMPACT

> **INTEGRITY\_IMPACT**: `string` = `"Integrity Impact"`

### SECURITY\_LEVEL

> **SECURITY\_LEVEL**: `string` = `"Security Level Selection"`

### SECURITY\_PROFILE

> **SECURITY\_PROFILE**: `string` = `"CIA Security Profile"`

### SECURITY\_RESOURCES

> **SECURITY\_RESOURCES**: `string` = `"Security Resources"`

### SECURITY\_SUMMARY

> **SECURITY\_SUMMARY**: `string` = `"Security Summary"`

### SECURITY\_VISUALIZATION

> **SECURITY\_VISUALIZATION**: `string` = `"Security Visualization"`

### TECHNICAL\_DETAILS

> **TECHNICAL\_DETAILS**: `string` = `"Technical Details"`

### TECHNICAL\_IMPLEMENTATION

> **TECHNICAL\_IMPLEMENTATION**: `string` = `"Technical Implementation"`

### VALUE\_CREATION

> **VALUE\_CREATION**: `string` = `"Business Value & ROI"`

## Example

```typescript
// In widget header
<WidgetHeader title={WIDGET_TITLES.COMPLIANCE_STATUS} />

// In navigation
const widgets = [
  { id: 'compliance', title: WIDGET_TITLES.COMPLIANCE_STATUS },
  { id: 'cost', title: WIDGET_TITLES.COST_ESTIMATION }
];
```
