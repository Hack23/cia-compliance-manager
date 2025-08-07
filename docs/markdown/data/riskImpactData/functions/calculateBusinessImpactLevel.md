[**CIA Compliance Manager Documentation v0.8.22**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `"Critical"` \| `"High"` \| `"Medium"` \| `"Low"` \| `"Minimal"`

Defined in: [data/riskImpactData.ts:364](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/data/riskImpactData.ts#L364)

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
