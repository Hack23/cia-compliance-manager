[**CIA Compliance Manager — UML Diagrams v1.1.126**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / SecurityLevels

# Interface: SecurityLevels

Defined in: [types/cia.ts:500](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/types/cia.ts#L500)

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

Defined in: [types/cia.ts:502](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/types/cia.ts#L502)

Selected availability security level

***

### integrity

> **integrity**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:505](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/types/cia.ts#L505)

Selected integrity security level

***

### confidentiality

> **confidentiality**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:508](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/types/cia.ts#L508)

Selected confidentiality security level
