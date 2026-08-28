[**CIA Compliance Manager — UML Diagrams v1.1.140**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / SecurityVisualizationWidgetProps

# Type Alias: SecurityVisualizationWidgetProps

> **SecurityVisualizationWidgetProps** = [`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md)

Defined in: [types/widget-props.ts:762](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/widget-props.ts#L762)

Props for SecurityVisualizationWidget component

Visualizes security posture with interactive charts based on
CIA component security levels.

## Example

```typescript
<SecurityVisualizationWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
/>
```
