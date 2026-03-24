[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useComponentDetails](../README.md) / useComponentDetails

# Function: useComponentDetails()

> **useComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `null`

Defined in: [hooks/useComponentDetails.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useComponentDetails.ts#L29)

Custom hook for fetching CIA component details with error handling

## Business Perspective

This hook encapsulates the common pattern of fetching component details
from the CIA content service, providing consistent error handling and
null safety across all widget components. This reduces duplication and
ensures consistent behavior across the application. 🔄

## Parameters

### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

CIA component (availability, integrity, confidentiality)

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level for the component

## Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `null`

Component details or null if unavailable

## Example

```typescript
const details = useComponentDetails('availability', 'High');

if (details) {
  console.log(details.uptime);
}
```
