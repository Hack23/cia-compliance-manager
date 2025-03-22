[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/businessImpact](../README.md) / BusinessImpactDetails

# Interface: BusinessImpactDetails

Defined in: [src/types/businessImpact.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L49)

Detailed business impact structure

## Business Perspective

This structure represents comprehensive business impact analysis
across multiple dimensions such as financial, operational, and regulatory
concerns, enabling CISOs to present security impacts in business terms. 💼

## Properties

### financial?

> `optional` **financial**: `object`

Defined in: [src/types/businessImpact.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L51)

#### annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### operational?

> `optional` **operational**: `object`

Defined in: [src/types/businessImpact.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L56)

#### description

> **description**: `string`

#### meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### regulatory?

> `optional` **regulatory**: `object`

Defined in: [src/types/businessImpact.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L69)

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### reputational?

> `optional` **reputational**: `object`

Defined in: [src/types/businessImpact.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L61)

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### strategic?

> `optional` **strategic**: `object`

Defined in: [src/types/businessImpact.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L65)

#### description

> **description**: `string`

#### riskLevel

> **riskLevel**: `string`

***

### summary

> **summary**: `string`

Defined in: [src/types/businessImpact.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/businessImpact.ts#L50)
