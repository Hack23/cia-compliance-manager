[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [coreConstants](../README.md) / WIDGET\_TITLES

# Variable: WIDGET\_TITLES

> `const` **WIDGET\_TITLES**: `object`

Defined in: [constants/coreConstants.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/constants/coreConstants.ts#L182)

Widget title constants for consistent naming.

Standard titles for all dashboard widgets. Using these constants ensures
consistent naming across the application and simplifies localization
efforts if needed in the future.

## Type Declaration

### SECURITY\_LEVEL

> **SECURITY\_LEVEL**: `string` = `"Security Level Selection"`

### SECURITY\_SUMMARY

> **SECURITY\_SUMMARY**: `string` = `"Security Summary"`

### SECURITY\_VISUALIZATION

> **SECURITY\_VISUALIZATION**: `string` = `"Security Visualization"`

### COMPLIANCE\_STATUS

> **COMPLIANCE\_STATUS**: `string` = `"Compliance Status"`

### VALUE\_CREATION

> **VALUE\_CREATION**: `string` = `"Business Value & ROI"`

### COST\_ESTIMATION

> **COST\_ESTIMATION**: `string` = `"Cost Estimation"`

### BUSINESS\_IMPACT

> **BUSINESS\_IMPACT**: `string` = `"Business Impact Analysis"`

### TECHNICAL\_IMPLEMENTATION

> **TECHNICAL\_IMPLEMENTATION**: `string` = `"Technical Implementation"`

### SECURITY\_PROFILE

> **SECURITY\_PROFILE**: `string` = `"CIA Security Profile"`

### SECURITY\_RESOURCES

> **SECURITY\_RESOURCES**: `string` = `"Security Resources"`

### AVAILABILITY\_IMPACT

> **AVAILABILITY\_IMPACT**: `string` = `"Availability Impact"`

### INTEGRITY\_IMPACT

> **INTEGRITY\_IMPACT**: `string` = `"Integrity Impact"`

### CONFIDENTIALITY\_IMPACT

> **CONFIDENTIALITY\_IMPACT**: `string` = `"Confidentiality Impact"`

### CIA\_IMPACT\_SUMMARY

> **CIA\_IMPACT\_SUMMARY**: `string` = `"CIA Impact Summary"`

### TECHNICAL\_DETAILS

> **TECHNICAL\_DETAILS**: `string` = `"Technical Details"`

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
