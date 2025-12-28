[**CIA Compliance Manager Diagrams v1.1.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / TechnicalDetailsResponse

# Interface: TechnicalDetailsResponse

Defined in: [services/securityMetricsService.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/services/securityMetricsService.ts#L45)

Technical details response for security implementation

## Properties

### architecture

> **architecture**: `object`

Defined in: [services/securityMetricsService.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/services/securityMetricsService.ts#L46)

Architecture details including components and optional diagrams

#### components

> **components**: `object`[]

#### description

> **description**: `string`

#### diagrams?

> `optional` **diagrams**: `unknown`[]

***

### implementation

> **implementation**: `object`

Defined in: [services/securityMetricsService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/services/securityMetricsService.ts#L55)

Implementation plan details

#### complexity?

> `optional` **complexity**: `string`

#### keyMilestones

> **keyMilestones**: `string`[]

#### resources

> **resources**: `object`[]

#### steps?

> `optional` **steps**: `string`[]

#### timeline

> **timeline**: `string`

***

### technologies?

> `optional` **technologies**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/services/securityMetricsService.ts#L65)

Technology stack by component (availability, integrity, confidentiality)
