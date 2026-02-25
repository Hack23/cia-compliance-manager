[**CIA Compliance Manager Documentation v1.1.23**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getSLAMetrics

# Variable: getSLAMetrics()

> `const` **getSLAMetrics**: (`level`) => `object` = `getDefaultSLAMetrics`

Defined in: [utils/riskUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/eea5df051b2f33de27cf3c67b4e7f761c2c7959f/src/utils/riskUtils.ts#L31)

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
