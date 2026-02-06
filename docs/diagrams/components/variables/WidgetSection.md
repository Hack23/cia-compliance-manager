[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [components](../README.md) / WidgetSection

# Variable: WidgetSection

> `const` **WidgetSection**: `React.FC`\<`WidgetSectionProps`\>

Defined in: [components/common/WidgetSection.tsx:46](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/components/common/WidgetSection.tsx#L46)

Reusable section component for consistent widget layout

## Business Perspective

This component provides a consistent section layout across all widgets,
improving readability and user experience when viewing security assessments.
Standardized sections help users quickly locate relevant information. 📦

**DESIGN SYSTEM**: Uses Tailwind classes only - no inline styles.
All spacing via design tokens (p-xs=4px, p-sm=6px, rounded-md=12px)

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
