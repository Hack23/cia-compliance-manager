[**CIA Compliance Manager Diagrams v0.8.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/6a2219920f4c187f7eafa3e355e36b35c9c19248/src/types/cia.ts#L134)

Calculate overall security level from individual component levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Overall security level
