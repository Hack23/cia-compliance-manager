[**CIA Compliance Manager — Markdown Documentation v1.1.148**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [coreConstants](../README.md) / CIA\_LABELS

# Variable: CIA\_LABELS

> `const` **CIA\_LABELS**: `object`

Defined in: [constants/coreConstants.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/9190e7633203f992b6ee77a05ebf18cec5926582/src/constants/coreConstants.ts#L104)

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
