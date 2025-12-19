[**CIA Compliance Manager Diagrams v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`RiskImpactLevel`](../type-aliases/RiskImpactLevel.md)

Defined in: [data/riskImpactData.ts:459](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/data/riskImpactData.ts#L459)

Calculate the overall business impact level based on security levels

Uses a weighted algorithm that gives higher priority to confidentiality
when determining the overall business impact across all CIA components.

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

[`RiskImpactLevel`](../type-aliases/RiskImpactLevel.md)

Overall business impact level (Minimal to Critical)

## Example

```typescript
// All Very High security = minimal impact
calculateBusinessImpactLevel("Very High", "Very High", "Very High") // Returns "Minimal"

// All High security = Low impact
calculateBusinessImpactLevel("High", "High", "High") // Returns "Low"

// Mixed levels with confidentiality weighted higher
// Formula: (1 [High] + 2 [Moderate] + 4 [None] * 1.5) / 3.5 = (1 + 2 + 6) / 3.5 = 9 / 3.5 = 2.57 → rounds to 3 ("High")
calculateBusinessImpactLevel("High", "Moderate", "None") // Returns "High"
```
