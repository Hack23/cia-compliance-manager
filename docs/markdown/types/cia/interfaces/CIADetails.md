[**CIA Compliance Manager Documentation v1.1.19**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L537)

CIA details structure

Comprehensive information about a CIA component's configuration,
including technical details, business impact, and operational metrics.

## Example

```typescript
const details: CIADetails = {
  description: 'High availability configuration with redundancy',
  impact: 'Minimal downtime, fast recovery',
  technical: 'Multi-AZ deployment, auto-scaling, health checks',
  businessImpact: 'Protects revenue from service disruptions',
  uptime: '99.9%',
  mttr: '30 minutes',
  rto: '1 hour',
  rpo: '15 minutes',
  recommendations: ['Implement automated failover', 'Regular DR testing']
};
```

## Properties

### businessImpact?

> `optional` **businessImpact**: `string`

Defined in: [types/cia.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L548)

Business impact and value proposition

***

### description?

> `optional` **description**: `string`

Defined in: [types/cia.ts:539](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L539)

General description of the configuration

***

### impact?

> `optional` **impact**: `string`

Defined in: [types/cia.ts:542](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L542)

Impact statement describing the effect of this configuration

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [types/cia.ts:554](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L554)

Mean Time To Repair - average time to fix issues

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [types/cia.ts:563](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L563)

List of recommendations for improvement

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [types/cia.ts:560](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L560)

Recovery Point Objective - maximum acceptable data loss

***

### rto?

> `optional` **rto**: `string`

Defined in: [types/cia.ts:557](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L557)

Recovery Time Objective - maximum acceptable downtime

***

### technical?

> `optional` **technical**: `string`

Defined in: [types/cia.ts:545](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L545)

Technical implementation details

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [types/cia.ts:551](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L551)

Expected uptime percentage
