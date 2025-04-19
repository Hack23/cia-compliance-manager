[**CIA Compliance Manager Documentation v0.8.10**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / meetsSecurityRequirements

# Function: meetsSecurityRequirements()

> **meetsSecurityRequirements**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `boolean`

Defined in: [utils/securityLevelUtils.ts:158](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/utils/securityLevelUtils.ts#L158)

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
