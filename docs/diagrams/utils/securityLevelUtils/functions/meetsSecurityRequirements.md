[**CIA Compliance Manager Diagrams v0.8.20**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / meetsSecurityRequirements

# Function: meetsSecurityRequirements()

> **meetsSecurityRequirements**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `boolean`

Defined in: [utils/securityLevelUtils.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/utils/securityLevelUtils.ts#L178)

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
