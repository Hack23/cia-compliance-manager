[**CIA Compliance Manager Documentation v1.0.6**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / SecurityLevels

# Interface: SecurityLevels

Defined in: [types/cia.ts:505](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/types/cia.ts#L505)

Selected security levels for each CIA pillar

Represents the currently selected or recommended security levels
for a specific system or application.

## Example

```typescript
const selectedLevels: SecurityLevels = {
  availability: 'High',
  integrity: 'Very High',
  confidentiality: 'Moderate'
};
```

## Properties

### availability

> **availability**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:507](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/types/cia.ts#L507)

Selected availability security level

***

### confidentiality

> **confidentiality**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:513](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/types/cia.ts#L513)

Selected confidentiality security level

***

### integrity

> **integrity**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:510](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/types/cia.ts#L510)

Selected integrity security level
