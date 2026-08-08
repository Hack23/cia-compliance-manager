[**CIA Compliance Manager — Markdown Documentation v1.1.129**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / SecurityProfile

# Interface: SecurityProfile

Defined in: [types/cia.ts:319](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/types/cia.ts#L319)

Security profile containing all security levels

Represents a complete security configuration for a system,
including individual CIA component levels and an overall security level.

## Example

```typescript
const profile: SecurityProfile = {
  availabilityLevel: 'High',
  integrityLevel: 'Very High',
  confidentialityLevel: 'High',
  securityLevel: 'Very High' // Calculated from highest component level
};
```

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:321](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/types/cia.ts#L321)

Security level for system availability

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:324](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/types/cia.ts#L324)

Security level for data integrity

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:327](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/types/cia.ts#L327)

Security level for data confidentiality

***

### securityLevel

> **securityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/types/cia.ts#L330)

Overall security level (typically the highest of the three components)
