[**CIA Compliance Manager — UML Diagrams v1.1.135**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getSecurityLevelAriaLabel

# Function: getSecurityLevelAriaLabel()

> **getSecurityLevelAriaLabel**(`level`, `component`): `string`

Defined in: [utils/accessibility.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/utils/accessibility.ts#L75)

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
