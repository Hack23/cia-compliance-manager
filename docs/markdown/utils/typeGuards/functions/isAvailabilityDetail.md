[**CIA Compliance Manager Documentation v1.1.1**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / isAvailabilityDetail

# Function: isAvailabilityDetail()

> **isAvailabilityDetail**(`obj`): `obj is AvailabilityDetail`

Defined in: [utils/typeGuards.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/utils/typeGuards.ts#L57)

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
