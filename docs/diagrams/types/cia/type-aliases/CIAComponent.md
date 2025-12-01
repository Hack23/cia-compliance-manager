[**CIA Compliance Manager Diagrams v1.0.1**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / CIAComponent

# Type Alias: CIAComponent

> **CIAComponent** = `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/cia.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/cia.ts#L226)

CIA triad components representing different security aspects

- **confidentiality**: Data privacy and access control (who can see the data)
- **integrity**: Data accuracy and consistency (ensuring data is not tampered with)
- **availability**: System uptime and accessibility (ensuring the system is accessible when needed)

## Example

```typescript
const component: CIAComponent = 'availability';
// Use to configure security level for availability
```
