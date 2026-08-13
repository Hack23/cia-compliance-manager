[**CIA Compliance Manager — Markdown Documentation v1.1.132**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/serviceUtils](../README.md) / createEmptyCIADetails

# Function: createEmptyCIADetails()

> **createEmptyCIADetails**(): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

Defined in: [utils/serviceUtils.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/utils/serviceUtils.ts#L25)

Creates an empty CIADetails object with default values for all required fields
This helps satisfy type requirements when creating mock/empty objects

## Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

An empty CIADetails object

## Example

```typescript
// Create empty placeholder
const empty = createEmptyCIADetails();

// Use as fallback in service
const details = data?.details ?? createEmptyCIADetails();

// Initialize with partial data
const details = {
  ...createEmptyCIADetails(),
  description: 'Custom description',
  capex: 50000
};
```
