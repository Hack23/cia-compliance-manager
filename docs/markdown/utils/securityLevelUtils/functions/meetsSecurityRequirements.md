[**CIA Compliance Manager Documentation v0.8.24**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / meetsSecurityRequirements

# Function: meetsSecurityRequirements()

> **meetsSecurityRequirements**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `boolean`

Defined in: [utils/securityLevelUtils.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/8f5d084752ccee354557e96bf8b49239fb671c91/src/utils/securityLevelUtils.ts#L178)

Determine if a given set of security levels meets minimum requirements

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current availability level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current integrity level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current confidentiality level

### minAvailability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Minimum required availability level

### minIntegrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Minimum required integrity level

### minConfidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Minimum required confidentiality level

## Returns

`boolean`

Whether all requirements are met
