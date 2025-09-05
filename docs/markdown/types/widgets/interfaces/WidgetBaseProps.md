[**CIA Compliance Manager Documentation v0.8.26**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / WidgetBaseProps

# Interface: WidgetBaseProps

Defined in: [types/widgets.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/168f1311621722afef33b264085d8ac99d4a3213/src/types/widgets.ts#L64)

Base props for all widgets

## Business Perspective

All widgets in the application share these core properties, enabling
consistent styling, testing, and interactive capabilities. This creates
a unified dashboard experience for security officers and executives. 🎨

## Extended by

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)
- [`ComplianceStatusWidgetProps`](ComplianceStatusWidgetProps.md)
- [`SecurityComponentProps`](SecurityComponentProps.md)
- [`SecurityLevelSelectorProps`](SecurityLevelSelectorProps.md)
- [`ComponentImpactWidgetProps`](ComponentImpactWidgetProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/168f1311621722afef33b264085d8ac99d4a3213/src/types/widgets.ts#L68)

Optional CSS class name

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/168f1311621722afef33b264085d8ac99d4a3213/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/168f1311621722afef33b264085d8ac99d4a3213/src/types/widgets.ts#L73)

Optional test ID for testing
