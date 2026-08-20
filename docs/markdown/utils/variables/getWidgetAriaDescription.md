[**CIA Compliance Manager — Markdown Documentation v1.1.135**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getWidgetAriaDescription

# Variable: getWidgetAriaDescription

> **getWidgetAriaDescription**: (`widgetType`, `description?`) => `string`

Defined in: [utils/index.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/utils/index.ts#L32)

Create an accessible description for a widget

Generates descriptive ARIA descriptions for widgets to provide context
to screen reader users about the widget's purpose and content.

## Parameters

### widgetType

`string`

Type of widget (e.g., 'Security Metrics', 'Risk Analysis')

### description?

`string`

Optional additional description

## Returns

`string`

An accessible description string

## Example

```typescript
// Without additional description
getWidgetAriaDescription('Security Metrics')
// 'Security Metrics widget'

// With additional description
getWidgetAriaDescription('Risk Analysis', 'Shows current risk levels')
// 'Risk Analysis widget. Shows current risk levels'

getWidgetAriaDescription('Cost Estimation', 'CAPEX and OPEX breakdown')
// 'Cost Estimation widget. CAPEX and OPEX breakdown'

// Usage in component
<div 
  role="region"
  aria-label={widgetTitle}
  aria-describedby="widget-desc"
>
  <span id="widget-desc" className="sr-only">
    {getWidgetAriaDescription(widgetType, description)}
  </span>
  {widgetContent}
</div>
```
