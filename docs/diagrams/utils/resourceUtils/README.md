[**CIA Compliance Manager — UML Diagrams v1.1.129**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / utils/resourceUtils

# utils/resourceUtils

Resource utilities for calculating personnel and training requirements
based on security levels.

These utilities help organizations plan security resource allocation
by providing standardized calculations for FTE requirements.

## Example

```typescript
import { getPersonnelRequirements } from './resourceUtils';

// Calculate FTE needed for security implementation
const fteHigh = getPersonnelRequirements('High');
console.log('High security requires:', fteHigh); // "1 FTE"

const fteVeryHigh = getPersonnelRequirements('Very High');
console.log('Very High security requires:', fteVeryHigh); // "2 FTE"
```

## Functions

- [getPersonnelRequirements](functions/getPersonnelRequirements.md)
