[**CIA Compliance Manager Documentation v1.1.12**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / isAvailabilityDetail

# Function: isAvailabilityDetail()

> **isAvailabilityDetail**(`obj`): `obj is AvailabilityDetail`

Defined in: [utils/typeGuards.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/utils/typeGuards.ts#L57)

Type guard to check if an object is an AvailabilityDetail

## Parameters

### obj

`unknown`

Value to check

## Returns

`obj is AvailabilityDetail`

True if obj is an AvailabilityDetail

## Example

```typescript
const data: unknown = getAvailabilityData();
if (isAvailabilityDetail(data)) {
  console.log(data.uptime); // Safe to access uptime property
  console.log(data.recommendations); // Safe to access array
}
```
