[**CIA Compliance Manager Documentation v1.0.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevel

# Variable: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/utils/index.ts#L102)

Calculates the overall security level based on individual CIA components

Computes a composite security level by averaging the numeric values of
availability, integrity, and confidentiality levels, then rounding to
the nearest security level. Provides a single metric for overall security posture.

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

The overall security level (average of the three components, rounded)

## Example

```typescript
// All equal - returns same level
calculateOverallSecurityLevel('High', 'High', 'High')  // 'High'

// Mixed levels - returns average
calculateOverallSecurityLevel('Low', 'Moderate', 'High')  // 'Moderate'
calculateOverallSecurityLevel('None', 'Low', 'Low')       // 'Low'

// Use for system-wide security assessment
const overallLevel = calculateOverallSecurityLevel(
  availabilityLevel,
  integrityLevel,
  confidentialityLevel
);
console.log(`System security level: ${overallLevel}`);
```
