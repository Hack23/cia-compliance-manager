[**CIA Compliance Manager — Markdown Documentation v1.1.150**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/types/cia.ts#L338)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/types/cia.ts#L340)

Security level associated with this impact

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/types/cia.ts#L343)

Human-readable description of the impact
