[**CIA Compliance Manager — Markdown Documentation v1.1.109**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/businessImpact](../README.md) / BusinessImpactDetails

# Interface: BusinessImpactDetails

Defined in: [types/businessImpact.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L272)

Business impact details structure containing impact categories

## Properties

### summary

> **summary**: `string`

Defined in: [types/businessImpact.ts:278](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L278)

Summary of the overall business impact.

Required to align with runtime validation in `isBusinessImpactDetails`.

***

### financial?

> `optional` **financial?**: [`BusinessImpactDetail`](BusinessImpactDetail.md)

Defined in: [types/businessImpact.ts:283](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L283)

Financial impact details

***

### operational?

> `optional` **operational?**: [`BusinessImpactDetail`](BusinessImpactDetail.md)

Defined in: [types/businessImpact.ts:288](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L288)

Operational impact details

***

### reputational?

> `optional` **reputational?**: [`BusinessImpactDetail`](BusinessImpactDetail.md)

Defined in: [types/businessImpact.ts:293](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L293)

Reputational impact details

***

### regulatory?

> `optional` **regulatory?**: [`BusinessImpactDetail`](BusinessImpactDetail.md)

Defined in: [types/businessImpact.ts:298](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L298)

Regulatory impact details

***

### strategic?

> `optional` **strategic?**: [`BusinessImpactDetail`](BusinessImpactDetail.md)

Defined in: [types/businessImpact.ts:303](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/businessImpact.ts#L303)

Strategic impact details
