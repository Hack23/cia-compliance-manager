[**CIA Compliance Manager — UML Diagrams v1.1.132**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/cia.ts#L338)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/cia.ts#L340)

Security level associated with this impact

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/cia.ts#L343)

Human-readable description of the impact
