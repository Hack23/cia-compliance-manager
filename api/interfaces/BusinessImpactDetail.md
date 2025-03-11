[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [src/types/cia.tsx:44](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L44)

Business impact analysis interface for tracking security implications

## Example

```ts
const financialImpact: BusinessImpactDetail = {
  description: "Revenue loss from service interruption",
  riskLevel: "High",
  annualRevenueLoss: "$2.5M"
};
```

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

Defined in: [src/types/cia.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L47)

***

### competitiveAdvantage?

> `optional` **competitiveAdvantage**: `object`

Defined in: [src/types/cia.tsx:55](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L55)

#### description

> **description**: `string`

#### value

> **value**: `string`

***

### complianceViolations?

> `optional` **complianceViolations**: `string`[]

Defined in: [src/types/cia.tsx:50](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L50)

***

### customerImpact?

> `optional` **customerImpact**: `string`

Defined in: [src/types/cia.tsx:52](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L52)

***

### description

> **description**: `string`

Defined in: [src/types/cia.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L45)

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

Defined in: [src/types/cia.tsx:48](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L48)

***

### operationalImpact?

> `optional` **operationalImpact**: `string`

Defined in: [src/types/cia.tsx:53](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L53)

***

### recoveryTime?

> `optional` **recoveryTime**: `string`

Defined in: [src/types/cia.tsx:49](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L49)

***

### reputationDamage?

> `optional` **reputationDamage**: `string`

Defined in: [src/types/cia.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L51)

***

### riskLevel?

> `optional` **riskLevel**: `string`

Defined in: [src/types/cia.tsx:46](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L46)

***

### strategicImpact?

> `optional` **strategicImpact**: `string`

Defined in: [src/types/cia.tsx:54](https://github.com/Hack23/cia-compliance-manager/blob/main/src/types/cia.tsx#L54)
