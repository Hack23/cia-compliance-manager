[**CIA Compliance Manager — Markdown Documentation v1.1.121**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / AvailabilityImpact

# Interface: AvailabilityImpact

Defined in: [types/cia.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/types/cia.ts#L362)

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

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/types/cia.ts#L340)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/types/cia.ts#L343)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### uptime

> **uptime**: `string`

Defined in: [types/cia.ts:364](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/types/cia.ts#L364)

Expected uptime percentage (e.g., "99.9%", "99.99%")

***

### recoveryTime

> **recoveryTime**: `string`

Defined in: [types/cia.ts:367](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/types/cia.ts#L367)

Maximum acceptable recovery time (e.g., "< 1 hour", "< 15 minutes")
