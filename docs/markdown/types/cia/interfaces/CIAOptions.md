[**CIA Compliance Manager — Markdown Documentation v1.1.111**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / CIAOptions

# Interface: CIAOptions

Defined in: [types/cia.ts:474](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/types/cia.ts#L474)

Available options for each CIA pillar

Defines the set of security levels that can be selected for each
CIA component. Typically includes all five security levels.

## Example

```typescript
const options: CIAOptions = {
  availability: ['None', 'Low', 'Moderate', 'High', 'Very High'],
  integrity: ['None', 'Low', 'Moderate', 'High', 'Very High'],
  confidentiality: ['None', 'Low', 'Moderate', 'High', 'Very High']
};
```

## Properties

### availability

> **availability**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)[]

Defined in: [types/cia.ts:476](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/types/cia.ts#L476)

Available security level options for availability

***

### integrity

> **integrity**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)[]

Defined in: [types/cia.ts:479](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/types/cia.ts#L479)

Available security level options for integrity

***

### confidentiality

> **confidentiality**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)[]

Defined in: [types/cia.ts:482](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/types/cia.ts#L482)

Available security level options for confidentiality
