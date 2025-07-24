[**CIA Compliance Manager Diagrams v0.8.20**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevel

# Variable: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/utils/index.ts#L101)

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
