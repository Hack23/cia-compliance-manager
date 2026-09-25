[**CIA Compliance Manager — Markdown Documentation v1.1.153**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / sanitizeWidgetId

# Variable: sanitizeWidgetId

> **sanitizeWidgetId**: (`id`) => `string`

Defined in: [utils/index.ts:137](https://github.com/Hack23/cia-compliance-manager/blob/aae220a35b85217ac74b619cb9128300e38ff3a0/src/utils/index.ts#L137)

Sanitize widget ID to ensure valid HTML/CSS identifiers

Removes special characters and replaces them with hyphens to create
valid HTML element IDs and CSS class names. Essential for dynamic
widget generation and proper DOM manipulation.

## Parameters

### id

`string`

Widget identifier string to sanitize

## Returns

`string`

Sanitized ID safe for use in HTML/CSS

## Example

```typescript
sanitizeWidgetId('my-widget')        // 'my-widget'
sanitizeWidgetId('My Widget!')       // 'My-Widget-'
sanitizeWidgetId('widget#123')       // 'widget-123'
sanitizeWidgetId('test@example.com') // 'test-example-com'

// Usage in components
const widgetId = sanitizeWidgetId(userInput);
<div id={widgetId} className={`widget-${widgetId}`}>
  {content}
</div>
```
