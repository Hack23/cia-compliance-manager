[**CIA Compliance Manager Diagrams v1.1.3**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRecommendedSecurityLevels

# Function: getRecommendedSecurityLevels()

> **getRecommendedSecurityLevels**(`currentAvailability`, `currentIntegrity`, `currentConfidentiality`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `object`

Defined in: [utils/securityLevelUtils.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/utils/securityLevelUtils.ts#L362)

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
