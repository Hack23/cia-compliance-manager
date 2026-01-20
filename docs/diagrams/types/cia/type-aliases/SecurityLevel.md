[**CIA Compliance Manager Diagrams v1.1.11**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / SecurityLevel

# Type Alias: SecurityLevel

> **SecurityLevel** = `"None"` \| `"Low"` \| `"Moderate"` \| `"High"` \| `"Very High"`

Defined in: [types/cia.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/cia.ts#L38)

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
