[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorProvider

# Variable: ErrorProvider

> `const` **ErrorProvider**: `React.FC`\<[`ErrorProviderProps`](../interfaces/ErrorProviderProps.md)\>

Defined in: [contexts/ErrorContext.tsx:133](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L133)

Error Provider Component

Provides error context to child components, managing error state and
toast notifications.

## Example

```tsx
// Wrap application with ErrorProvider
<ErrorProvider>
  <App />
</ErrorProvider>

// Use in components
const { addError, showToast } = useError();

try {
  await fetchData();
} catch (error) {
  addError(error, { component: 'DataFetcher' });
  showToast({
    message: 'Failed to load data',
    retry: () => fetchData()
  });
}
```
