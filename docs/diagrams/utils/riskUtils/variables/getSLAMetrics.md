[**CIA Compliance Manager Diagrams v1.1.3**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getSLAMetrics

# Variable: getSLAMetrics()

> `const` **getSLAMetrics**: (`level`) => `object` = `getDefaultSLAMetrics`

Defined in: [utils/riskUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/utils/riskUtils.ts#L31)

Get default SLA metrics for a security level

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

`object`

SLA metrics object

### mttr

> **mttr**: `string`

### rpo

> **rpo**: `string`

### rto

> **rto**: `string`

### sla

> **sla**: `string`

### uptime

> **uptime**: `string`
