[**CIA Compliance Manager — UML Diagrams v1.1.143**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia.utility](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/cia.utility.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia.utility.ts#L65)

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
