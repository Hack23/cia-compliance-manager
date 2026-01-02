[**CIA Compliance Manager Documentation v1.1.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / SecurityResourcesWidget

# Variable: SecurityResourcesWidget

> `const` **SecurityResourcesWidget**: `React.FC`\<[`SecurityResourcesWidgetProps`](../../types/interfaces/SecurityResourcesWidgetProps.md)\>

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:82](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L82)

Widget that displays security resources and implementation guides

This component provides security practitioners with relevant resources,
implementation guides, and best practices to help implement appropriate
security controls for the selected security levels. It bridges the gap
between security requirements and practical implementation.

## Features
- Dynamic resource filtering based on security levels
- Categorized display of resources by CIA component
- Support for limiting displayed resources
- Top resources filtering for focused guidance
- Loading and error states
- Accessible and responsive design

## Business Perspective

This widget accelerates security implementation by providing practitioners
with immediately actionable guidance, reducing research time and ensuring
best practices are followed. It improves security ROI by helping teams
implement controls correctly the first time. 📚

## Component

## Example

```tsx
// Basic usage with uniform security levels
<SecurityResourcesWidget
  availabilityLevel="Moderate"
  integrityLevel="Moderate"
  confidentialityLevel="Moderate"
/>

// Advanced usage with custom configuration
<SecurityResourcesWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  maxItems={12}
  showTopResourcesOnly={true}
  className="border-2 border-gray-200 p-md"
  testId="main-security-resources"
/>
```
