[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/ErrorToast](../README.md) / ErrorToast

# Variable: ErrorToast

> `const` **ErrorToast**: `React.FC`\<[`ErrorToastProps`](../interfaces/ErrorToastProps.md)\>

Defined in: [components/common/ErrorToast.tsx:137](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L137)

Error Toast Component

Displays transient error notifications with auto-dismiss and optional retry.
Designed for errors that don't require blocking the entire UI.

## Example

```tsx
// Basic error toast
<ErrorToast
  message="Failed to save changes"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
/>

// Error toast with title and retry
<ErrorToast
  title="Network Error"
  message="Unable to connect to server"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
  retry={() => retryOperation()}
/>

// Custom position and timeout
<ErrorToast
  message="Operation failed"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
  position="bottom-center"
  autoHideDuration={10000}
/>
```
