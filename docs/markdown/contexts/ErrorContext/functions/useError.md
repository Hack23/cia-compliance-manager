[**CIA Compliance Manager — Markdown Documentation v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / useError

# Function: useError()

> **useError**(): [`ErrorContextValue`](../interfaces/ErrorContextValue.md)

Defined in: [contexts/ErrorContext.tsx:262](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L262)

Custom hook to use error context

## Returns

[`ErrorContextValue`](../interfaces/ErrorContextValue.md)

Error context value

## Throws

Error if used outside ErrorProvider

## Example

```tsx
const { addError, showToast, clearError } = useError();

// Track and display error
try {
  await saveData();
} catch (error) {
  addError(error, { operation: 'save' });
  showToast({
    message: 'Failed to save data',
    retry: () => saveData()
  });
}
```
