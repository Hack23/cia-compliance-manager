[**CIA Compliance Manager — UML Diagrams v1.1.135**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [coreConstants](../README.md) / CIA\_LABELS

# Variable: CIA\_LABELS

> `const` **CIA\_LABELS**: `object`

Defined in: [constants/coreConstants.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/constants/coreConstants.ts#L104)

CIA component label constants for consistent terminology.

Standard display labels for CIA triad components. Use these labels
throughout the UI to ensure consistent terminology and improve
user recognition.

## Type Declaration

### AVAILABILITY

> **AVAILABILITY**: `string` = `"Availability"`

### INTEGRITY

> **INTEGRITY**: `string` = `"Integrity"`

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `string` = `"Confidentiality"`

## Example

```typescript
// In select dropdown
const options = [
  { value: 'availability', label: CIA_LABELS.AVAILABILITY },
  { value: 'integrity', label: CIA_LABELS.INTEGRITY },
  { value: 'confidentiality', label: CIA_LABELS.CONFIDENTIALITY }
];
```
