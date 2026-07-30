[**CIA Compliance Manager — Markdown Documentation v1.1.123**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/cia.ts#L338)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/cia.ts#L340)

Security level associated with this impact

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/cia.ts#L343)

Human-readable description of the impact
