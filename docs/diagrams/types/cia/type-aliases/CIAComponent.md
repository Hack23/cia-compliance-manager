[**CIA Compliance Manager — UML Diagrams v1.1.165**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / CIAComponent

# Type Alias: CIAComponent

> **CIAComponent** = `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/cia.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/1212b27dca9a90ca35b6865ea7beb24b601ee2c3/src/types/cia.ts#L221)

CIA triad components representing different security aspects

- **confidentiality**: Data privacy and access control (who can see the data)
- **integrity**: Data accuracy and consistency (ensuring data is not tampered with)
- **availability**: System uptime and accessibility (ensuring the system is accessible when needed)

## Example

```typescript
const component: CIAComponent = 'availability';
// Use to configure security level for availability
```
