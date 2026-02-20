[**CIA Compliance Manager Documentation v1.1.22**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/83ec4592971af1db133b76cbdcec3934063462f5/src/types/cia.ts#L147)

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
