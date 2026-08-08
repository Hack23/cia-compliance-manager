[**CIA Compliance Manager — UML Diagrams v1.1.129**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/widgetHelpers](../README.md) / sanitizeWidgetId

# Function: sanitizeWidgetId()

> **sanitizeWidgetId**(`id`): `string`

Defined in: [utils/widgetHelpers.ts:145](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/utils/widgetHelpers.ts#L145)

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
