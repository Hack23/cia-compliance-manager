[**CIA Compliance Manager — UML Diagrams v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorProvider

# Variable: ErrorProvider

> `const` **ErrorProvider**: `React.FC`\<[`ErrorProviderProps`](../interfaces/ErrorProviderProps.md)\>

Defined in: [contexts/ErrorContext.tsx:133](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L133)

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
