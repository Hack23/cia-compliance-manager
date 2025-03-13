[**CIA Compliance Manager API Documentation v0.7.0**](../../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../../modules.md) / [components/widgets/SecuritySummaryWidget](../README.md) / default

# Function: default()

> **default**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

Defined in: [src/components/widgets/SecuritySummaryWidget.tsx:64](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/components/widgets/SecuritySummaryWidget.tsx#L64)

SecuritySummaryWidget displays a comprehensive summary of the current security profile
including CIA levels, technical details, business impacts, and recommendations.
It uses ciaContentService to fetch all needed information.

## Parameters

### props

[`SecuritySummaryWidgetProps`](../interfaces/SecuritySummaryWidgetProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Component

## Example

```tsx
<SecuritySummaryWidget
  securityLevel="High"
  availabilityLevel="High"
  integrityLevel="Moderate"
  confidentialityLevel="High"
/>
```
