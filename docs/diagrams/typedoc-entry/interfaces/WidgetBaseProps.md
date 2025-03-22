[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [typedoc-entry](../README.md) / WidgetBaseProps

# Interface: WidgetBaseProps

Defined in: [types/widgets.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L64)

Base props for all widgets

## Business Perspective

All widgets in the application share these core properties, enabling
consistent styling, testing, and interactive capabilities. This creates
a unified dashboard experience for security officers and executives. 🎨

## Extended by

- [`ComplianceStatusWidgetProps`](../../types/interfaces/ComplianceStatusWidgetProps.md)
- [`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L68)

Optional CSS class name

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widgets.ts#L73)

Optional test ID for testing
