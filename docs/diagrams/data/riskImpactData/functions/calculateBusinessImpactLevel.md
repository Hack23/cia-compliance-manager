[**CIA Compliance Manager Diagrams v0.8.18**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `"Critical"` \| `"High"` \| `"Medium"` \| `"Low"` \| `"Minimal"`

Defined in: [data/riskImpactData.ts:364](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/data/riskImpactData.ts#L364)

Calculate the overall business impact level based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`"Critical"` \| `"High"` \| `"Medium"` \| `"Low"` \| `"Minimal"`

Overall business impact level
