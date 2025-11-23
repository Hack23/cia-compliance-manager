[**CIA Compliance Manager Documentation v1.0.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / CIAOptions

# Interface: CIAOptions

Defined in: [types/cia.ts:479](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/cia.ts#L479)

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

Defined in: [types/cia.ts:481](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/cia.ts#L481)

Available security level options for availability

***

### confidentiality

> **confidentiality**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)[]

Defined in: [types/cia.ts:487](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/cia.ts#L487)

Available security level options for confidentiality

***

### integrity

> **integrity**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)[]

Defined in: [types/cia.ts:484](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/cia.ts#L484)

Available security level options for integrity
