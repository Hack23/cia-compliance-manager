[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / IntegrityImpactWidget

# Function: IntegrityImpactWidget()

> **IntegrityImpactWidget**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

Defined in: [src/components/widgets/IntegrityImpactWidget.tsx:57](https://github.com/Hack23/cia-compliance-manager/blob/main/src/components/widgets/IntegrityImpactWidget.tsx#L57)

IntegrityImpactWidget displays impacts and recommendations related to data integrity
based on the selected security level. It uses ciaContentService to fetch all relevant data.

## Parameters

### props

[`IntegrityImpactWidgetProps`](../interfaces/IntegrityImpactWidgetProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Component

## Example

```tsx
<IntegrityImpactWidget
  integrityLevel="High"
  availabilityLevel="Moderate"
  confidentialityLevel="High"
/>
```
