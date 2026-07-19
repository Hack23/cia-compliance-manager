[**CIA Compliance Manager — Markdown Documentation v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia.ts:532](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L532)

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

### description?

> `optional` **description?**: `string`

Defined in: [types/cia.ts:534](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L534)

General description of the configuration

***

### impact?

> `optional` **impact?**: `string`

Defined in: [types/cia.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L537)

Impact statement describing the effect of this configuration

***

### technical?

> `optional` **technical?**: `string`

Defined in: [types/cia.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L540)

Technical implementation details

***

### businessImpact?

> `optional` **businessImpact?**: `string`

Defined in: [types/cia.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L543)

Business impact and value proposition

***

### uptime?

> `optional` **uptime?**: `string`

Defined in: [types/cia.ts:546](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L546)

Expected uptime percentage

***

### mttr?

> `optional` **mttr?**: `string`

Defined in: [types/cia.ts:549](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L549)

Mean Time To Repair - average time to fix issues

***

### rto?

> `optional` **rto?**: `string`

Defined in: [types/cia.ts:552](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L552)

Recovery Time Objective - maximum acceptable downtime

***

### rpo?

> `optional` **rpo?**: `string`

Defined in: [types/cia.ts:555](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L555)

Recovery Point Objective - maximum acceptable data loss

***

### recommendations?

> `optional` **recommendations?**: `string`[]

Defined in: [types/cia.ts:558](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/cia.ts#L558)

List of recommendations for improvement
