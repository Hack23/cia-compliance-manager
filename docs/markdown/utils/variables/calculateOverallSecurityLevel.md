[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevel

# Variable: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/utils/index.ts#L101)

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
