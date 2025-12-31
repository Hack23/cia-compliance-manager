[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L343)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L348)

Human-readable description of the impact

***

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/cia.ts#L345)

Security level associated with this impact
