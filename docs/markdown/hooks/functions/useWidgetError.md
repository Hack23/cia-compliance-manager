[**CIA Compliance Manager Documentation v1.1.12**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useWidgetError

# Function: useWidgetError()

> **useWidgetError**(`widgetName`): [`WidgetErrorState`](../interfaces/WidgetErrorState.md)

Defined in: [hooks/useWidgetError.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/hooks/useWidgetError.ts#L80)

Custom hook for consistent widget error handling

## Business Perspective

Provides standardized error management across all widgets, ensuring
consistent user experience and reliable error reporting for operational
monitoring and debugging. 🛡️

## Technical Perspective

Encapsulates error state management with automatic logging and type-safe
error handling. Provides a consistent API for setting, clearing, and
handling errors across all widget components.

## Parameters

### widgetName

`string`

Name of the widget for logging and error context

## Returns

[`WidgetErrorState`](../interfaces/WidgetErrorState.md)

Error state management interface

## Example

```tsx
const MyWidget: React.FC<Props> = ({ data }) => {
  const { error, hasError, handleError, clearError } = useWidgetError('MyWidget');
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    clearError();
    
    try {
      const result = await fetchData();
      // Process result...
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasError) {
    return <ErrorMessage message={error?.message} retry={loadData} />;
  }

  return <div>Widget content</div>;
};
```
