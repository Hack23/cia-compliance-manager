[**CIA Compliance Manager Documentation v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`RiskImpactLevel`](../type-aliases/RiskImpactLevel.md)

Defined in: [data/riskImpactData.ts:459](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/data/riskImpactData.ts#L459)

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
