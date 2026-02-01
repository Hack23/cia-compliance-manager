[**CIA Compliance Manager Documentation v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / meetsSecurityRequirements

# Function: meetsSecurityRequirements()

> **meetsSecurityRequirements**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `boolean`

Defined in: [utils/securityLevelUtils.ts:295](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/utils/securityLevelUtils.ts#L295)

Determine if a given set of security levels meets minimum requirements

Validates that current security levels meet or exceed specified minimum
requirements for all three CIA components. Returns true only if ALL
requirements are met. Essential for compliance checking and gap analysis.

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current confidentiality security level

### minAvailability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Minimum required availability level

### minIntegrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Minimum required integrity level

### minConfidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Minimum required confidentiality level

## Returns

`boolean`

true if all current levels meet or exceed minimum requirements

## Example

```typescript
// All requirements met
meetsSecurityRequirements(
  'High', 'High', 'High',      // Current levels
  'Moderate', 'Moderate', 'Moderate'  // Required levels
)  // true

// One requirement not met
meetsSecurityRequirements(
  'Low', 'High', 'High',       // Current levels (availability too low)
  'Moderate', 'Moderate', 'Moderate'  // Required levels
)  // false

// Use for compliance validation
const compliant = meetsSecurityRequirements(
  currentAvailability, currentIntegrity, currentConfidentiality,
  'High', 'High', 'Moderate'
);
if (!compliant) {
  console.log('Security levels do not meet requirements');
}
```
