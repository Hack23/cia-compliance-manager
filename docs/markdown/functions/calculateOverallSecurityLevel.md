[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [src/types/cia.ts:209](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L209)

Calculate the overall security level based on CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The availability security level

### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The integrity security level

### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The confidentiality security level

## Returns

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

The calculated overall security level
