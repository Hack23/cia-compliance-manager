[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CIABaseWidgetProps

# Interface: CIABaseWidgetProps

Defined in: [types/widgets.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L95)

Base props shared by all CIA-related widgets

This provides a common foundation for all widgets that display
information based on CIA security levels.

## Business Perspective

CIA-related widgets help organizations understand their security posture
from different angles (availability, integrity, confidentiality),
providing consistent assessment and reporting capabilities. 📋

## Extends

- `WidgetBaseProps`

## Extended by

- [`BusinessImpactAnalysisWidgetProps`](BusinessImpactAnalysisWidgetProps.md)
- [`CostEstimationWidgetProps`](CostEstimationWidgetProps.md)
- [`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md)
- [`SecurityResourcesWidgetProps`](SecurityResourcesWidgetProps.md)
- [`TechnicalDetailsWidgetProps`](TechnicalDetailsWidgetProps.md)
- [`ValueCreationWidgetProps`](ValueCreationWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L99)

Availability security level

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

`WidgetBaseProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L109)

Confidentiality security level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L104)

Integrity security level

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

`WidgetBaseProps.securityLevel`

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

`WidgetBaseProps.testId`
