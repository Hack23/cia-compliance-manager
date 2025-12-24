[**CIA Compliance Manager Documentation v1.0.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `React.FC`\<`ErrorMessageProps`\>

Defined in: [components/common/ErrorMessage.tsx:67](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/components/common/ErrorMessage.tsx#L67)

Error message component for displaying errors to users

## Business Perspective

Provides clear, actionable error messages to users when operations fail,
maintaining trust and helping users understand what went wrong and how
to proceed. Critical for operational excellence. ⚠️

## Technical Perspective

Reusable error display component with consistent styling and optional
retry functionality. Ensures errors are displayed in a user-friendly
manner across all widgets.

## Example

```tsx
// Simple error message
<ErrorMessage message="Failed to load data" />

// Error with custom title
<ErrorMessage 
  title="Connection Error" 
  message="Unable to reach the server"
/>

// Error with retry button
<ErrorMessage 
  message="Failed to load metrics"
  retry={() => refetchData()}
/>
```
