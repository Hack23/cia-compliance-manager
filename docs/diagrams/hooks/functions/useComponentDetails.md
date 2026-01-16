[**CIA Compliance Manager Diagrams v1.1.7**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useComponentDetails

# Function: useComponentDetails()

> **useComponentDetails**(`component`, `level`): [`CIADetails`](../../types/interfaces/CIADetails.md) \| `null`

Defined in: [hooks/useComponentDetails.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/6efa8b7e4173b2ed17e0594b4b26c48a1b704d1e/src/hooks/useComponentDetails.ts#L29)

Custom hook for fetching CIA component details with error handling

## Business Perspective

This hook encapsulates the common pattern of fetching component details
from the CIA content service, providing consistent error handling and
null safety across all widget components. This reduces duplication and
ensures consistent behavior across the application. 🔄

## Parameters

### component

[`CIAComponent`](../../types/cia/type-aliases/CIAComponent.md)

CIA component (availability, integrity, confidentiality)

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Security level for the component

## Returns

[`CIADetails`](../../types/interfaces/CIADetails.md) \| `null`

Component details or null if unavailable

## Example

```typescript
const details = useComponentDetails('availability', 'High');

if (details) {
  console.log(details.uptime);
}
```
