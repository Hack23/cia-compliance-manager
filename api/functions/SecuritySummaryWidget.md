[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / SecuritySummaryWidget

# Function: SecuritySummaryWidget()

> **SecuritySummaryWidget**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

Defined in: [src/components/widgets/SecuritySummaryWidget.tsx:56](https://github.com/Hack23/cia-compliance-manager/blob/main/src/components/widgets/SecuritySummaryWidget.tsx#L56)

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
