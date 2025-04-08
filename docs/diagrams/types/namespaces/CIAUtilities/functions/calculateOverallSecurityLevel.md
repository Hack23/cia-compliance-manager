[**CIA Compliance Manager Diagrams v0.8.7**](../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../modules.md) / [types](../../../README.md) / [CIAUtilities](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../../../../index/type-aliases/SecurityLevel.md)

Defined in: [types/cia.utility.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/cia.utility.ts#L67)

Calculate overall security level based on component levels

## Business Perspective

This function provides organizations with a consolidated view of their 
security posture across all three components of the CIA triad.
It helps in strategic decision-making and resource allocation. 💼

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../../index/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../../index/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

[`SecurityLevel`](../../../../index/type-aliases/SecurityLevel.md)

Overall security level
