[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/resourceUtils](../README.md) / getPersonnelRequirements

# Function: getPersonnelRequirements()

> **getPersonnelRequirements**(`level`): `string`

Defined in: [utils/resourceUtils.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/utils/resourceUtils.ts#L51)

Calculates personnel requirements (FTE) for a given security level

Maps security levels to Full-Time Equivalent (FTE) staffing requirements
based on industry standards for security operations.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

## Returns

`string`

Personnel requirements as a formatted string (e.g., "0.5 FTE")

## Example

```typescript
// Calculate FTE for different security levels
getPersonnelRequirements('None');        // "0.1 FTE" (minimal oversight)
getPersonnelRequirements('Low');         // "0.25 FTE" (part-time)
getPersonnelRequirements('Moderate');    // "0.5 FTE" (half-time)
getPersonnelRequirements('High');        // "1 FTE" (full-time)
getPersonnelRequirements('Very High');   // "2 FTE" (dedicated team)

// Use in budget planning
const level = 'High';
const fte = getPersonnelRequirements(level);
const annualCost = parseFloat(fte) * 150000; // Assume $150k per FTE
console.log(`Annual staffing cost for ${level}: $${annualCost.toLocaleString()}`);
// Output: "Annual staffing cost for High: $150,000"
```
