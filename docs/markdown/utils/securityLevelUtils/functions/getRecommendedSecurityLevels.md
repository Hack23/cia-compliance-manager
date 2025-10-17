[**CIA Compliance Manager Documentation v0.8.32**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRecommendedSecurityLevels

# Function: getRecommendedSecurityLevels()

> **getRecommendedSecurityLevels**(`currentAvailability`, `currentIntegrity`, `currentConfidentiality`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `object`

Defined in: [utils/securityLevelUtils.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/utils/securityLevelUtils.ts#L226)

Get a set of recommended security levels that would meet compliance requirements

## Parameters

### currentAvailability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current availability level

### currentIntegrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current integrity level

### currentConfidentiality

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

`object`

Recommended security levels

### availability

> **availability**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentiality

> **confidentiality**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrity

> **integrity**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)
