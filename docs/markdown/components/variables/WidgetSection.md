[**CIA Compliance Manager Documentation v1.1.31**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / WidgetSection

# Variable: WidgetSection

> `const` **WidgetSection**: `React.FC`\<`WidgetSectionProps`\>

Defined in: [components/common/WidgetSection.tsx:46](https://github.com/Hack23/cia-compliance-manager/blob/1c8bec6cbe09f80caaef8f0521c4e2e531753f04/src/components/common/WidgetSection.tsx#L46)

Reusable section component for consistent widget layout

## Business Perspective

This component provides a consistent section layout across all widgets,
improving readability and user experience when viewing security assessments.
Standardized sections help users quickly locate relevant information. 📦

**DESIGN SYSTEM**: Uses Tailwind classes only - no inline styles.
All spacing follows 8px grid system (p-sm=8px minimum)

## Example

```tsx
<WidgetSection
  title="Business Impact"
  subtitle="Financial and operational impact analysis"
  icon="💼"
  testId="business-impact-section"
>
  <p>Section content here</p>
</WidgetSection>
```
