[**CIA Compliance Manager Diagrams v1.1.17**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [coreConstants](../README.md) / CIA\_LABELS

# Variable: CIA\_LABELS

> `const` **CIA\_LABELS**: `object`

Defined in: [constants/coreConstants.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/constants/coreConstants.ts#L104)

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
