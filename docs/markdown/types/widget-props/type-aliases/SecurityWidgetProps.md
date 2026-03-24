[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / SecurityWidgetProps

# Type Alias: SecurityWidgetProps

> **SecurityWidgetProps** = [`WithSecurityLevelProps`](../interfaces/WithSecurityLevelProps.md) & [`CommonWidgetProps`](../interfaces/CommonWidgetProps.md)

Defined in: [types/widget-props.ts:162](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L162)

Combined interface for widgets that use security levels

Merges security level props with common widget props, providing
a complete set of props for security-aware widgets.

## Example

```typescript
const SecurityWidget: React.FC<SecurityWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  onAvailabilityChange,
  className,
  testId
}) => {
  return (
    <div className={className} data-testid={testId}>
      Widget content here
    </div>
  );
};
```
