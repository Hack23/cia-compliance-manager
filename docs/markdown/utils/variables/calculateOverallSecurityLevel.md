[**CIA Compliance Manager Documentation v0.8.23**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevel

# Variable: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/55488ba3ac0003e4435eb3634b6ab6e9b8b05a9b/src/utils/index.ts#L101)

Calculates the overall security level based on individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability level

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity level

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality level

## Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

The overall security level
