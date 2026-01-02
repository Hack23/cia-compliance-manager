[**CIA Compliance Manager Documentation v1.1.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / MetricCard

# Variable: MetricCard

> `const` **MetricCard**: `React.FC`\<`MetricCardProps`\>

Defined in: [components/common/MetricCard.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/components/common/MetricCard.tsx#L47)

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
