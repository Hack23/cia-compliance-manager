[**CIA Compliance Manager — UML Diagrams v1.1.109**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/securityResources](../README.md) / SecurityResourceFilter

# Interface: SecurityResourceFilter

Defined in: [types/securityResources.ts:106](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L106)

Filter options for security resources

## Properties

### component?

> `optional` **component?**: `string`

Defined in: [types/securityResources.ts:110](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L110)

Filter by CIA component

***

### securityLevel?

> `optional` **securityLevel?**: `string`

Defined in: [types/securityResources.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L115)

Filter by security level

***

### type?

> `optional` **type?**: `string`

Defined in: [types/securityResources.ts:120](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L120)

Filter by resource type (Documentation, Tool, etc.)

***

### searchQuery?

> `optional` **searchQuery?**: `string`

Defined in: [types/securityResources.ts:125](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L125)

Text search query

***

### tags?

> `optional` **tags?**: `string`[]

Defined in: [types/securityResources.ts:130](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L130)

Filter by tags

***

### includePremium?

> `optional` **includePremium?**: `boolean`

Defined in: [types/securityResources.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L135)

Whether to include premium resources

***

### maxComplexity?

> `optional` **maxComplexity?**: `number`

Defined in: [types/securityResources.ts:140](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L140)

Maximum complexity level (1-5)

***

### minRating?

> `optional` **minRating?**: `number`

Defined in: [types/securityResources.ts:145](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/securityResources.ts#L145)

Minimum rating (0-5)
