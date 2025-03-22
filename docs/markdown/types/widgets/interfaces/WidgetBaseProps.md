[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / WidgetBaseProps

# Interface: WidgetBaseProps

Defined in: [src/types/widgets.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L83)

Base props for all widgets

## Extended by

- [`SecuritySummaryWidgetProps`](SecuritySummaryWidgetProps.md)
- [`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md)
- [`BusinessImpactAnalysisWidgetProps`](BusinessImpactAnalysisWidgetProps.md)
- [`ComplianceStatusWidgetProps`](ComplianceStatusWidgetProps.md)
- [`ValueCreationWidgetProps`](ValueCreationWidgetProps.md)
- [`CostEstimationWidgetProps`](CostEstimationWidgetProps.md)
- [`TechnicalDetailsWidgetProps`](TechnicalDetailsWidgetProps.md)
- [`CIAImpactSummaryWidgetProps`](CIAImpactSummaryWidgetProps.md)
- [`SecurityVisualizationWidgetProps`](SecurityVisualizationWidgetProps.md)
- [`SecurityResourcesWidgetProps`](SecurityResourcesWidgetProps.md)
- [`SecurityComponentProps`](SecurityComponentProps.md)
- [`SecurityLevelSelectorProps`](SecurityLevelSelectorProps.md)
- [`ComponentImpactWidgetProps`](ComponentImpactWidgetProps.md)
- [`AvailabilityImpactWidgetProps`](AvailabilityImpactWidgetProps.md)
- [`IntegrityImpactWidgetProps`](IntegrityImpactWidgetProps.md)
- [`ConfidentialityImpactWidgetProps`](ConfidentialityImpactWidgetProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L87)

Optional CSS class name

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L97)

Optional security level for widgets that only need one level

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L92)

Optional test ID for testing
