[**CIA Compliance Manager Documentation v1.1.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / MetricCard

# Variable: MetricCard

> `const` **MetricCard**: `React.FC`\<`MetricCardProps`\>

Defined in: [components/common/MetricCard.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/45ff919c9b0da6c872e8e8f6d592563dd8c89b13/src/components/common/MetricCard.tsx#L47)

Reusable card component for displaying key metrics

## Business Perspective

This component presents key security metrics in a consistent,
easy-to-scan format. Standardized metric cards help stakeholders
quickly understand critical security indicators. 📊

## Example

```tsx
<MetricCard
  label="Uptime Target"
  value="99.9"
  unit="%"
  icon="⏱️"
  description="Expected system availability"
  variant="success"
  testId="uptime-metric"
/>
```
