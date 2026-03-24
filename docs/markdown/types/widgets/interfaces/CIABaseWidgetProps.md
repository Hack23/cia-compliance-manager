[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widgets](../README.md) / CIABaseWidgetProps

# Interface: CIABaseWidgetProps

Defined in: [types/widgets.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L83)

Base props shared by all CIA-related widgets

This provides a common foundation for all widgets that display
information based on CIA security levels.

## Business Perspective

CIA-related widgets help organizations understand their security posture
from different angles (availability, integrity, confidentiality),
providing consistent assessment and reporting capabilities. 📋

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Extended by

- [`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md)
- [`BusinessImpactAnalysisWidgetProps`](BusinessImpactAnalysisWidgetProps.md)
- [`ValueCreationWidgetProps`](ValueCreationWidgetProps.md)
- [`TechnicalDetailsWidgetProps`](TechnicalDetailsWidgetProps.md)
- [`SecurityVisualizationWidgetProps`](SecurityVisualizationWidgetProps.md)
- [`SecurityResourcesWidgetProps`](SecurityResourcesWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)

***

### securityLevel?

> `optional` **securityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L87)

Availability security level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L92)

Integrity security level

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L97)

Confidentiality security level
