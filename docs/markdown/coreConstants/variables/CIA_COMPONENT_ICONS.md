[**CIA Compliance Manager Documentation v1.1.31**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [coreConstants](../README.md) / CIA\_COMPONENT\_ICONS

# Variable: CIA\_COMPONENT\_ICONS

> `const` **CIA\_COMPONENT\_ICONS**: `object`

Defined in: [constants/coreConstants.ts:81](https://github.com/Hack23/cia-compliance-manager/blob/1c8bec6cbe09f80caaef8f0521c4e2e531753f04/src/constants/coreConstants.ts#L81)

CIA component icon constants.

Icons representing the three pillars of the CIA triad: Confidentiality,
Integrity, and Availability. Used in component-specific widgets and
visualizations to provide visual consistency.

## Type Declaration

### AVAILABILITY

> **AVAILABILITY**: `string` = `"⏱️"`

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `string` = `"🔒"`

### INTEGRITY

> **INTEGRITY**: `string` = `"✓"`

## Example

```typescript
// Display CIA component with its icon
const component = 'availability';
const icon = CIA_COMPONENT_ICONS.AVAILABILITY; // "⏱️"

return <div>{icon} {CIA_LABELS.AVAILABILITY}</div>;
// Renders: "⏱️ Availability"
```
