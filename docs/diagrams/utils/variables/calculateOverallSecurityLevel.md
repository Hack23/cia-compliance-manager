[**CIA Compliance Manager Diagrams v0.8.8**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevel

# Variable: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/utils/index.ts#L101)

Calculates the overall security level based on individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability level

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity level

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality level

## Returns

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

The overall security level
