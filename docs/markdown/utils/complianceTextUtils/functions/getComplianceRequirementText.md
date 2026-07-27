[**CIA Compliance Manager — Markdown Documentation v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/complianceTextUtils](../README.md) / getComplianceRequirementText

# Function: getComplianceRequirementText()

> **getComplianceRequirementText**(`component`, `level`): `string`

Defined in: [utils/complianceTextUtils.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/utils/complianceTextUtils.ts#L28)

Gets compliance requirement text for a security component and level

## Parameters

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

The CIA component (confidentiality, integrity, availability)

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

## Returns

`string`

Human-readable compliance requirement description

## Example

```typescript
// Get compliance text for confidentiality
const confText = getComplianceRequirementText('confidentiality', 'High');
console.log(confText); // "Meets stringent compliance standards"

// Check availability compliance
const availText = getComplianceRequirementText('availability', 'Moderate');
console.log(availText); // "Satisfies most compliance needs"

// Display in compliance report
const components = ['confidentiality', 'integrity', 'availability'] as const;
components.forEach(comp => {
  const requirement = getComplianceRequirementText(comp, 'High');
  console.log(`${comp}: ${requirement}`);
});
```
