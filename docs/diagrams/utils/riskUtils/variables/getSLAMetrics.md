[**CIA Compliance Manager Diagrams v1.1.26**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getSLAMetrics

# Variable: getSLAMetrics()

> `const` **getSLAMetrics**: (`level`) => `object` = `getDefaultSLAMetrics`

Defined in: [utils/riskUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/utils/riskUtils.ts#L31)

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
