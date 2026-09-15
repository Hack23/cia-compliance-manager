[**CIA Compliance Manager — UML Diagrams v1.1.148**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [components](../README.md) / RadarChart

# Variable: RadarChart

> `const` **RadarChart**: `React.FC`\<`RadarChartProps`\>

Defined in: [components/charts/RadarChart.tsx:64](https://github.com/Hack23/cia-compliance-manager/blob/9190e7633203f992b6ee77a05ebf18cec5926582/src/components/charts/RadarChart.tsx#L64)

Radar chart visualization of the CIA security triad

## Business Perspective

Provides an intuitive visual representation of the security posture
across all three CIA triad dimensions, enabling at-a-glance assessment
of security balance and identifying areas needing improvement. 📊

## Example

```tsx
<RadarChart
  availabilityLevel="High"
  integrityLevel="Moderate"
  confidentialityLevel="Very High"
/>
```
