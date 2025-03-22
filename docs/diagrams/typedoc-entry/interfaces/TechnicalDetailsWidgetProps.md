[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [typedoc-entry](../README.md) / TechnicalDetailsWidgetProps

# Interface: TechnicalDetailsWidgetProps

Defined in: [types/widgets.ts:358](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L358)

Props for technical details widgets

## Business Perspective

These widgets provide technical teams with implementation details and
guidance for meeting security requirements, translating policy into
actionable technical controls. 🔧

## Extends

- [`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`availabilityLevel`](../../types/interfaces/CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`className`](../../types/interfaces/CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`confidentialityLevel`](../../types/interfaces/CIABaseWidgetProps.md#confidentialitylevel)

***

### implementationDetails?

> `optional` **implementationDetails**: [`TechnicalImplementationDetails`](../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [types/widgets.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L362)

Implementation details for technical guidance

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`integrityLevel`](../../types/interfaces/CIABaseWidgetProps.md#integritylevel)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`securityLevel`](../../types/interfaces/CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`testId`](../../types/interfaces/CIABaseWidgetProps.md#testid)
