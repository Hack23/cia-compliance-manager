[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / TechnicalDetailsResponse

# Interface: TechnicalDetailsResponse

Defined in: [services/securityMetricsService.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/services/securityMetricsService.ts#L45)

Technical details response for security implementation

## Properties

### architecture

> **architecture**: `object`

Defined in: [services/securityMetricsService.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/services/securityMetricsService.ts#L46)

Architecture details including components and optional diagrams

#### description

> **description**: `string`

#### components

> **components**: `object`[]

#### diagrams?

> `optional` **diagrams?**: `unknown`[]

***

### implementation

> **implementation**: `object`

Defined in: [services/securityMetricsService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/services/securityMetricsService.ts#L55)

Implementation plan details

#### steps?

> `optional` **steps?**: `string`[]

#### timeline

> **timeline**: `string`

#### keyMilestones

> **keyMilestones**: `string`[]

#### resources

> **resources**: `object`[]

#### complexity?

> `optional` **complexity?**: `string`

***

### technologies?

> `optional` **technologies?**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/services/securityMetricsService.ts#L65)

Technology stack by component (availability, integrity, confidentiality)
