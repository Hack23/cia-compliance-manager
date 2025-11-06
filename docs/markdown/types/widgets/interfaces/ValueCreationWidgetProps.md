[**CIA Compliance Manager Documentation v0.8.36**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / ValueCreationWidgetProps

# Interface: ValueCreationWidgetProps

Defined in: [types/widgets.ts:320](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L320)

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

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`availabilityLevel`](CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`className`](CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`confidentialityLevel`](CIABaseWidgetProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`integrityLevel`](CIABaseWidgetProps.md#integritylevel)

***

### roi?

> `optional` **roi**: [`ROIEstimate`](../../interfaces/ROIEstimate.md)

Defined in: [types/widgets.ts:329](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L329)

Return on investment estimate

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:324](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L324)

Overall security level

#### Overrides

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`securityLevel`](CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`testId`](CIABaseWidgetProps.md#testid)
