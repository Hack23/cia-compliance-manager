[**CIA Compliance Manager Diagrams v1.1.18**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getSecurityLevelAriaLabel

# Variable: getSecurityLevelAriaLabel()

> **getSecurityLevelAriaLabel**: (`level`, `component`) => `string`

Defined in: [utils/index.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/utils/index.ts#L37)

Create an accessible label for a security level

Generates WCAG-compliant ARIA labels for security level selectors and displays,
ensuring screen readers properly announce the component and its current level.

## Parameters

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

The security level (None, Low, Moderate, High, Very High)

### component

The CIA component (availability, integrity, confidentiality)

`"confidentiality"` | `"integrity"` | `"availability"`

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
