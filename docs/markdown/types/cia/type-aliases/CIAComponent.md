[**CIA Compliance Manager — Markdown Documentation v1.1.132**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / CIAComponent

# Type Alias: CIAComponent

> **CIAComponent** = `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/cia.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/cia.ts#L221)

CIA triad components representing different security aspects

- **confidentiality**: Data privacy and access control (who can see the data)
- **integrity**: Data accuracy and consistency (ensuring data is not tampered with)
- **availability**: System uptime and accessibility (ensuring the system is accessible when needed)

## Example

```typescript
const component: CIAComponent = 'availability';
// Use to configure security level for availability
```
