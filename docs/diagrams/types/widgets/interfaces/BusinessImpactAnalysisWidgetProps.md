[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / BusinessImpactAnalysisWidgetProps

# Interface: BusinessImpactAnalysisWidgetProps

Defined in: [src/types/widgets.ts:195](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L195)

Props for the BusinessImpactAnalysisWidget component

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### activeComponent?

> `optional` **activeComponent**: `"availability"` \| `"integrity"` \| `"confidentiality"`

Defined in: [src/types/widgets.ts:202](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L202)

***

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:196](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L196)

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`availabilityLevel`](WidgetBaseProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L200)

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:198](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L198)

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`confidentialityLevel`](WidgetBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L197)

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`integrityLevel`](WidgetBaseProps.md#integritylevel)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:199](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L199)

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:201](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/types/widgets.ts#L201)

Test ID for component selection in tests

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
