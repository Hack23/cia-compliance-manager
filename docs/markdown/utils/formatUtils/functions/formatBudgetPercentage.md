[**CIA Compliance Manager Documentation v0.9.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatBudgetPercentage

# Function: formatBudgetPercentage()

> **formatBudgetPercentage**(`value`, `isCapex`): `string`

Defined in: [utils/formatUtils.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/utils/formatUtils.ts#L273)

Format a cost value for budget display

Adds contextual text explaining whether the cost represents capital
expenditure (one-time) or operational expenditure (recurring annual).
Useful in budget presentations and financial reports.

## Parameters

### value

`number`

Cost percentage value (0-1 range, where 0.05 = 5% of IT budget)

### isCapex

`boolean`

Whether this is capital expenditure (vs operational)

## Returns

`string`

Formatted budget string with contextual description

## Example

```typescript
formatBudgetPercentage(0.05, true)   
// "5% of IT budget as one-time capital expenditure"

formatBudgetPercentage(0.03, false)  
// "3% of IT budget as annual operational expenses"

formatBudgetPercentage(0.1, true)    
// "10% of IT budget as one-time capital expenditure"
```
