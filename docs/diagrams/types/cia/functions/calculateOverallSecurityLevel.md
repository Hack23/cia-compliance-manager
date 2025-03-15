[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [src/types/cia.ts:192](https://github.com/Hack23/cia-compliance-manager/blob/cb6149c89796a3270553cf52dea8f2c5b402dd17/src/types/cia.ts#L192)

Calculate the overall security level based on CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The availability security level

### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The integrity security level

### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The confidentiality security level

## Returns

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The calculated overall security level
