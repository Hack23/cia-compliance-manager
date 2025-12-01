[**CIA Compliance Manager Diagrams v1.0.1**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [components](../README.md) / LoadingSpinner

# Variable: LoadingSpinner

> `const` **LoadingSpinner**: `React.FC`\<`LoadingSpinnerProps`\>

Defined in: [components/common/LoadingSpinner.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/components/common/LoadingSpinner.tsx#L51)

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
