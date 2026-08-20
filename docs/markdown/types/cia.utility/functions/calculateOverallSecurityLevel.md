[**CIA Compliance Manager — Markdown Documentation v1.1.135**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia.utility](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/cia.utility.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/types/cia.utility.ts#L65)

Calculate overall security level based on component levels

## Business Perspective

This function provides organizations with a consolidated view of their 
security posture across all three components of the CIA triad.
It helps in strategic decision-making and resource allocation. 💼

## Parameters

### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Overall security level
