[**CIA Compliance Manager Diagrams v1.1.11**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / meetsComplianceRequirements

# Function: meetsComplianceRequirements()

> **meetsComplianceRequirements**(`level`, `framework`): `boolean`

Defined in: [utils/securityLevelUtils.ts:590](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/utils/securityLevelUtils.ts#L590)

Determine if a security level meets compliance requirements for a specific framework

Validates that a security level meets the minimum requirements defined for
common compliance frameworks (SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, GDPR, CCPA).
Returns true if the level meets or exceeds the framework's minimum requirement.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to validate

### framework

`string`

Compliance framework name (e.g., 'SOC2', 'PCI-DSS', 'HIPAA')

## Returns

`boolean`

true if the security level meets the framework's minimum requirements

## Example

```typescript
meetsComplianceRequirements('High', 'PCI-DSS')     // true (PCI-DSS requires High)
meetsComplianceRequirements('Moderate', 'PCI-DSS') // false (needs High)
meetsComplianceRequirements('Moderate', 'SOC2')    // true (SOC2 requires Moderate)
meetsComplianceRequirements('High', 'GDPR')        // true (exceeds Moderate requirement)

// Validate against multiple frameworks
const frameworks = ['SOC2', 'ISO27001', 'GDPR'];
const allMet = frameworks.every(f => 
  meetsComplianceRequirements(currentLevel, f)
);
```
