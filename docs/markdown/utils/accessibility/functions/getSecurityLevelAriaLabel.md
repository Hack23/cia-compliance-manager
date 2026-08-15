[**CIA Compliance Manager — Markdown Documentation v1.1.133**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getSecurityLevelAriaLabel

# Function: getSecurityLevelAriaLabel()

> **getSecurityLevelAriaLabel**(`level`, `component`): `string`

Defined in: [utils/accessibility.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/a3e63053a25f76d3ab18122863c3f4b04ccf4967/src/utils/accessibility.ts#L75)

Create an accessible label for a security level

Generates WCAG-compliant ARIA labels for security level selectors and displays,
ensuring screen readers properly announce the component and its current level.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level (None, Low, Moderate, High, Very High)

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

The CIA component (availability, integrity, confidentiality)

## Returns

`string`

An accessible label string formatted for screen readers

## Example

```typescript
// Availability level label
getSecurityLevelAriaLabel('High', 'availability')
// 'Availability security level: High'

// Integrity level label
getSecurityLevelAriaLabel('Moderate', 'integrity')
// 'Integrity security level: Moderate'

// Confidentiality level label
getSecurityLevelAriaLabel('Very High', 'confidentiality')
// 'Confidentiality security level: Very High'

// Usage in component
<select aria-label={getSecurityLevelAriaLabel(level, 'availability')}>
  {levels.map(l => <option key={l} value={l}>{l}</option>)}
</select>
```
