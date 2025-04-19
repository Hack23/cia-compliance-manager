[**CIA Compliance Manager Diagrams v0.8.10**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRecommendedSecurityLevels

# Function: getRecommendedSecurityLevels()

> **getRecommendedSecurityLevels**(`currentAvailability`, `currentIntegrity`, `currentConfidentiality`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `object`

Defined in: [utils/securityLevelUtils.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/utils/securityLevelUtils.ts#L206)

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
