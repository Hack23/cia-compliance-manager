[**CIA Compliance Manager Diagrams v0.8.20**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / SecurityResource

# Interface: SecurityResource

Defined in: [types/securityResources.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L11)

Security resource interface

## Properties

### category?

> `optional` **category**: `string`

Defined in: [types/securityResources.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L60)

Resource category

***

### complexity?

> `optional` **complexity**: `number`

Defined in: [types/securityResources.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L95)

Implementation complexity (1-5)

***

### component?

> `optional` **component**: `"confidentiality"` \| `"integrity"` \| `"availability"` \| `"general"`

Defined in: [types/securityResources.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L45)

CIA component relevance

***

### components?

> `optional` **components**: `string`[]

Defined in: [types/securityResources.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L75)

Components this resource applies to (multiple possible)

***

### description?

> `optional` **description**: `string`

Defined in: [types/securityResources.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L30)

Resource description

***

### format?

> `optional` **format**: `string`

Defined in: [types/securityResources.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L85)

Format of the resource (e.g., PDF, Website, Video)

***

### id

> **id**: `string`

Defined in: [types/securityResources.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L15)

Resource ID

***

### isPremium?

> `optional` **isPremium**: `boolean`

Defined in: [types/securityResources.ts:100](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L100)

Whether the resource is premium/paid

***

### level?

> `optional` **level**: `string`

Defined in: [types/securityResources.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L50)

Security level relevance

***

### priority?

> `optional` **priority**: `number`

Defined in: [types/securityResources.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L65)

Resource priority/relevance score (0-100)

***

### relevance?

> `optional` **relevance**: `number`

Defined in: [types/securityResources.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L90)

Resource relevance score

***

### relevantLevels?

> `optional` **relevantLevels**: `string`[]

Defined in: [types/securityResources.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L80)

Levels this resource is relevant for

***

### securityLevels?

> `optional` **securityLevels**: `string`[]

Defined in: [types/securityResources.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L70)

Security levels this resource applies to

***

### source?

> `optional` **source**: `string`

Defined in: [types/securityResources.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L55)

Resource source/provider

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types/securityResources.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L40)

Resource tags

***

### title

> **title**: `string`

Defined in: [types/securityResources.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L20)

Resource title

***

### type?

> `optional` **type**: `string`

Defined in: [types/securityResources.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L35)

Resource type or category

***

### url

> **url**: `string`

Defined in: [types/securityResources.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/securityResources.ts#L25)

Resource URL
