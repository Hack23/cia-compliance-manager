[**CIA Compliance Manager Diagrams v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / AvailabilityImpact

# Interface: AvailabilityImpact

Defined in: [types/cia.ts:367](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/cia.ts#L367)

Impact associated with the availability of the system

Describes the expected uptime and recovery characteristics
for the selected availability security level.

## Example

```typescript
const impact: AvailabilityImpact = {
  level: 'High',
  description: 'System must be available 99.9% of the time',
  uptime: '99.9%',
  recoveryTime: '< 1 hour'
};
```

## Extends

- [`BaseImpact`](BaseImpact.md)

## Properties

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/cia.ts#L348)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/cia.ts#L345)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)

***

### recoveryTime

> **recoveryTime**: `string`

Defined in: [types/cia.ts:372](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/cia.ts#L372)

Maximum acceptable recovery time (e.g., "< 1 hour", "< 15 minutes")

***

### uptime

> **uptime**: `string`

Defined in: [types/cia.ts:369](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/cia.ts#L369)

Expected uptime percentage (e.g., "99.9%", "99.99%")
