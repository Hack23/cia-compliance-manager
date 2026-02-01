[**CIA Compliance Manager Diagrams v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityResourcesWidgetProps

# Interface: SecurityResourcesWidgetProps

Defined in: [types/widgets.ts:398](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L398)

Props for security resources widgets

## Business Perspective

These widgets provide resources and guidance for implementing security
controls, supporting security practitioners with practical implementation
advice and best practices. 📚

## Extends

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L87)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`availabilityLevel`](CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`className`](CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L97)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`confidentialityLevel`](CIABaseWidgetProps.md#confidentialitylevel)

***

### filter?

> `optional` **filter**: `string`

Defined in: [types/widgets.ts:402](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L402)

Optional filter for resources

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L92)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`integrityLevel`](CIABaseWidgetProps.md#integritylevel)

***

### maxItems?

> `optional` **maxItems**: `number`

Defined in: [types/widgets.ts:407](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L407)

Maximum number of items to display

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`securityLevel`](CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`testId`](CIABaseWidgetProps.md#testid)
