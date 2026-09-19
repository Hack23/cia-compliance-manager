[**CIA Compliance Manager — UML Diagrams v1.1.150**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / CostEstimationWidgetProps

# Type Alias: CostEstimationWidgetProps

> **CostEstimationWidgetProps** = [`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md)

Defined in: [types/widget-props.ts:503](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/types/widget-props.ts#L503)

Props for CostEstimationWidget component

Estimates implementation costs for security controls based on
selected security levels across CIA components.

## Example

```typescript
<CostEstimationWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
/>
```
