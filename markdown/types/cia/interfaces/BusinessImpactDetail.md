[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [types/cia](../README.md) / BusinessImpactDetail

# Interface: BusinessImpactDetail

Defined in: [src/types/cia.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L44)

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

\[`key`: `string`\]: `any`

## Properties

### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

Defined in: [src/types/cia.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L47)

***

### competitiveAdvantage?

> `optional` **competitiveAdvantage**: `object`

Defined in: [src/types/cia.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L55)

#### description

> **description**: `string`

#### value

> **value**: `string`

***

### complianceViolations?

> `optional` **complianceViolations**: `string`[]

Defined in: [src/types/cia.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L50)

***

### customerImpact?

> `optional` **customerImpact**: `string`

Defined in: [src/types/cia.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L52)

***

### description

> **description**: `string`

Defined in: [src/types/cia.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L45)

***

### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

Defined in: [src/types/cia.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L48)

***

### operationalImpact?

> `optional` **operationalImpact**: `string`

Defined in: [src/types/cia.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L53)

***

### recoveryTime?

> `optional` **recoveryTime**: `string`

Defined in: [src/types/cia.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L49)

***

### reputationDamage?

> `optional` **reputationDamage**: `string`

Defined in: [src/types/cia.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L51)

***

### riskLevel?

> `optional` **riskLevel**: `string`

Defined in: [src/types/cia.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L46)

***

### strategicImpact?

> `optional` **strategicImpact**: `string`

Defined in: [src/types/cia.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L54)
