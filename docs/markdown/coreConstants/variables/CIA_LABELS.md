[**CIA Compliance Manager Documentation v1.1.2**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [coreConstants](../README.md) / CIA\_LABELS

# Variable: CIA\_LABELS

> `const` **CIA\_LABELS**: `object`

Defined in: [constants/coreConstants.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/constants/coreConstants.ts#L104)

CIA component label constants for consistent terminology.

Standard display labels for CIA triad components. Use these labels
throughout the UI to ensure consistent terminology and improve
user recognition.

## Type Declaration

### AVAILABILITY

> **AVAILABILITY**: `string` = `"Availability"`

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `string` = `"Confidentiality"`

### INTEGRITY

> **INTEGRITY**: `string` = `"Integrity"`

## Example

```typescript
// In select dropdown
const options = [
  { value: 'availability', label: CIA_LABELS.AVAILABILITY },
  { value: 'integrity', label: CIA_LABELS.INTEGRITY },
  { value: 'confidentiality', label: CIA_LABELS.CONFIDENTIALITY }
];
```
