[**CIA Compliance Manager Documentation v0.8.20**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRecommendedSecurityLevels

# Function: getRecommendedSecurityLevels()

> **getRecommendedSecurityLevels**(`currentAvailability`, `currentIntegrity`, `currentConfidentiality`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `object`

Defined in: [utils/securityLevelUtils.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/utils/securityLevelUtils.ts#L226)

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
