[**CIA Compliance Manager — Markdown Documentation v1.1.160**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / CostEstimationWidgetProps

# Type Alias: CostEstimationWidgetProps

> **CostEstimationWidgetProps** = [`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md)

Defined in: [types/widget-props.ts:503](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/types/widget-props.ts#L503)

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
