[**CIA Compliance Manager — UML Diagrams v1.1.134**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / SecurityLevel

# Type Alias: SecurityLevel

> **SecurityLevel** = `"None"` \| `"Low"` \| `"Moderate"` \| `"High"` \| `"Very High"`

Defined in: [types/cia.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/types/cia.ts#L38)

Security levels available for CIA triad components

Each level represents increasing security controls and associated costs:
- **None**: No security controls (not recommended for production)
- **Low**: Basic security controls for low-risk systems
- **Moderate**: Standard controls for typical business systems (recommended baseline)
- **High**: Enhanced controls for sensitive systems
- **Very High**: Maximum controls for critical systems

## Example

```typescript
const level: SecurityLevel = 'Moderate';
const criticalLevel: SecurityLevel = 'Very High';
```
