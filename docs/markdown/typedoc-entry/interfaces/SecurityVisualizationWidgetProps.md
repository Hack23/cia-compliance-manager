[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [typedoc-entry](../README.md) / SecurityVisualizationWidgetProps

# Interface: SecurityVisualizationWidgetProps

Defined in: [types/widgets.ts:394](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L394)

Props for security visualization widgets

## Business Perspective

Visualization widgets help stakeholders understand complex security
concepts through intuitive charts and graphs, making security posture
more accessible to non-technical audiences. 📈

## Extends

- [`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`availabilityLevel`](../../types/interfaces/CIABaseWidgetProps.md#availabilitylevel)

***

### chartType?

> `optional` **chartType**: `"radar"` \| `"bar"` \| `"gauge"`

Defined in: [types/widgets.ts:398](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L398)

Type of chart to display

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`className`](../../types/interfaces/CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`confidentialityLevel`](../../types/interfaces/CIABaseWidgetProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`integrityLevel`](../../types/interfaces/CIABaseWidgetProps.md#integritylevel)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`securityLevel`](../../types/interfaces/CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`testId`](../../types/interfaces/CIABaseWidgetProps.md#testid)
