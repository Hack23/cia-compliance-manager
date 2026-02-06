[**CIA Compliance Manager Diagrams v1.1.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / ValueCreationWidgetProps

# Interface: ValueCreationWidgetProps

Defined in: [types/widgets.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L308)

Props for value creation widgets

## Business Perspective

These widgets help executives understand the business value and ROI of
security investments, supporting budget justification and strategic
planning discussions. 💰

## Extends

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L87)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`availabilityLevel`](CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`className`](CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L97)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`confidentialityLevel`](CIABaseWidgetProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L92)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`integrityLevel`](CIABaseWidgetProps.md#integritylevel)

***

### roi?

> `optional` **roi**: [`ROIEstimate`](../../interfaces/ROIEstimate.md)

Defined in: [types/widgets.ts:317](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L317)

Return on investment estimate

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:312](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L312)

Overall security level

#### Overrides

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`securityLevel`](CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`testId`](CIABaseWidgetProps.md#testid)
