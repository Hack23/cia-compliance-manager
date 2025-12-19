[**CIA Compliance Manager Documentation v1.0.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / formatBudgetPercentage

# Variable: formatBudgetPercentage()

> **formatBudgetPercentage**: (`value`, `isCapex`) => `string`

Defined in: [utils/index.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/utils/index.ts#L63)

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
