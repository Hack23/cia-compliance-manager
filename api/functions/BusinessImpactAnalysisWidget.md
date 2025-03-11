[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / BusinessImpactAnalysisWidget

# Function: BusinessImpactAnalysisWidget()

> **BusinessImpactAnalysisWidget**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

Defined in: [src/components/widgets/BusinessImpactAnalysisWidget.tsx:63](https://github.com/Hack23/cia-compliance-manager/blob/main/src/components/widgets/BusinessImpactAnalysisWidget.tsx#L63)

BusinessImpactAnalysisWidget displays detailed business impact analysis based on the selected
CIA security levels. It fetches data from ciaContentService and presents a comprehensive
breakdown of the business impacts across different categories such as financial, operational,
reputational, regulatory, and strategic.

## Parameters

### props

[`BusinessImpactAnalysisWidgetProps`](../interfaces/BusinessImpactAnalysisWidgetProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Component

## Example

```tsx
<BusinessImpactAnalysisWidget
  availabilityLevel="High"
  integrityLevel="Moderate"
  confidentialityLevel="High"
/>
```
