[**CIA Compliance Manager Documentation v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:146](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/utils/securityLevelUtils.ts#L146)

Calculates the overall security level based on individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality level

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The overall security level
