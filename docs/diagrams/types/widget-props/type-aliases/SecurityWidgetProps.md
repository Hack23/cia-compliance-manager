[**CIA Compliance Manager — UML Diagrams v1.1.114**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / SecurityWidgetProps

# Type Alias: SecurityWidgetProps

> **SecurityWidgetProps** = [`WithSecurityLevelProps`](../interfaces/WithSecurityLevelProps.md) & [`CommonWidgetProps`](../interfaces/CommonWidgetProps.md)

Defined in: [types/widget-props.ts:162](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L162)

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
