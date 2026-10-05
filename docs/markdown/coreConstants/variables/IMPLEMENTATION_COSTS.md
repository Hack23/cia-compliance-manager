[**CIA Compliance Manager — Markdown Documentation v1.1.160**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [coreConstants](../README.md) / IMPLEMENTATION\_COSTS

# Variable: IMPLEMENTATION\_COSTS

> `const` **IMPLEMENTATION\_COSTS**: `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), \{ `developmentEffort`: `string`; `maintenance`: `string`; `expertise`: `string`; \}\>

Defined in: [constants/coreConstants.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/constants/coreConstants.ts#L226)

Implementation cost estimates by security level.

Provides rough estimates for development effort, ongoing maintenance,
and required expertise for each security level. These estimates help
stakeholders understand the resource requirements for implementing
different security postures.

## Example

```typescript
// Display implementation requirements
const level = 'High';
const costs = IMPLEMENTATION_COSTS[level];

console.log(`Development: ${costs.developmentEffort}`); // "1-2 Months"
console.log(`Maintenance: ${costs.maintenance}`);       // "Daily monitoring"
console.log(`Expertise: ${costs.expertise}`);           // "Senior"

// In cost estimation widget
<div>
  <p>Development Effort: {costs.developmentEffort}</p>
  <p>Maintenance: {costs.maintenance}</p>
  <p>Required Expertise: {costs.expertise}</p>
</div>
```
