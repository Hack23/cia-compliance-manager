[**CIA Compliance Manager Diagrams v1.1.31**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/1c8bec6cbe09f80caaef8f0521c4e2e531753f04/src/types/cia.ts#L343)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/1c8bec6cbe09f80caaef8f0521c4e2e531753f04/src/types/cia.ts#L348)

Human-readable description of the impact

***

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/1c8bec6cbe09f80caaef8f0521c4e2e531753f04/src/types/cia.ts#L345)

Security level associated with this impact
