[**CIA Compliance Manager Diagrams v0.8.7**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/cia.ts#L134)

Calculate overall security level from individual component levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Overall security level
