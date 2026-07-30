[**CIA Compliance Manager — UML Diagrams v1.1.123**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getRecommendedSecurityLevels

# Function: getRecommendedSecurityLevels()

> **getRecommendedSecurityLevels**(`currentAvailability`, `currentIntegrity`, `currentConfidentiality`, `minAvailability`, `minIntegrity`, `minConfidentiality`): `object`

Defined in: [utils/securityLevelUtils.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/utils/securityLevelUtils.ts#L362)

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

### integrity

> **integrity**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentiality

> **confidentiality**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)
