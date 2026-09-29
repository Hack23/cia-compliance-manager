[**CIA Compliance Manager — Markdown Documentation v1.1.154**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/LoadingSpinner](../README.md) / LoadingSpinner

# Variable: LoadingSpinner

> `const` **LoadingSpinner**: `React.FC`\<[`LoadingSpinnerProps`](../interfaces/LoadingSpinnerProps.md)\>

Defined in: [components/common/LoadingSpinner.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/42e66b46977944fe728f624a83223bbbb90a81b2/src/components/common/LoadingSpinner.tsx#L51)

Loading spinner component for indicating loading states

## Business Perspective

Provides consistent visual feedback during data loading operations,
improving user experience by clearly indicating that the application
is working on their request. 🔄

## Technical Perspective

Reusable loading indicator component that maintains visual consistency
across all widgets and screens. Uses Tailwind CSS for styling with
support for different sizes.

## Example

```tsx
// Small spinner
<LoadingSpinner size="sm" />

// Default medium spinner
<LoadingSpinner />

// Large spinner with custom test ID
<LoadingSpinner size="lg" testId="widget-loader" />
```
