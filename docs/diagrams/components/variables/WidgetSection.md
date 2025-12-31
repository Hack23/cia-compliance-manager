[**CIA Compliance Manager Diagrams v1.1.4**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [components](../README.md) / WidgetSection

# Variable: WidgetSection

> `const` **WidgetSection**: `React.FC`\<`WidgetSectionProps`\>

Defined in: [components/common/WidgetSection.tsx:44](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/components/common/WidgetSection.tsx#L44)

Reusable section component for consistent widget layout

## Business Perspective

This component provides a consistent section layout across all widgets,
improving readability and user experience when viewing security assessments.
Standardized sections help users quickly locate relevant information. 📦

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
