[**CIA Compliance Manager — UML Diagrams v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/widgetHelpers](../README.md) / sanitizeWidgetId

# Function: sanitizeWidgetId()

> **sanitizeWidgetId**(`id`): `string`

Defined in: [utils/widgetHelpers.ts:145](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/utils/widgetHelpers.ts#L145)

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
