[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/securityResources](../README.md) / EnhancedSecurityResource

# Interface: EnhancedSecurityResource

Defined in: [types/securityResources.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L176)

Enhanced security resource with additional properties for internal use

## Extends

- [`SecurityResource`](SecurityResource.md)

## Properties

### id

> **id**: `string`

Defined in: [types/securityResources.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L15)

Resource ID

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`id`](SecurityResource.md#id)

***

### title

> **title**: `string`

Defined in: [types/securityResources.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L20)

Resource title

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`title`](SecurityResource.md#title)

***

### url

> **url**: `string`

Defined in: [types/securityResources.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L25)

Resource URL

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`url`](SecurityResource.md#url)

***

### description?

> `optional` **description?**: `string`

Defined in: [types/securityResources.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L30)

Resource description

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`description`](SecurityResource.md#description)

***

### type?

> `optional` **type?**: `string`

Defined in: [types/securityResources.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L35)

Resource type or category

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`type`](SecurityResource.md#type)

***

### tags?

> `optional` **tags?**: `string`[]

Defined in: [types/securityResources.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L40)

Resource tags

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`tags`](SecurityResource.md#tags)

***

### component?

> `optional` **component?**: `"confidentiality"` \| `"integrity"` \| `"availability"` \| `"general"`

Defined in: [types/securityResources.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L45)

CIA component relevance

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`component`](SecurityResource.md#component)

***

### level?

> `optional` **level?**: `string`

Defined in: [types/securityResources.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L50)

Security level relevance

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`level`](SecurityResource.md#level)

***

### source?

> `optional` **source?**: `string`

Defined in: [types/securityResources.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L55)

Resource source/provider

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`source`](SecurityResource.md#source)

***

### category?

> `optional` **category?**: `string`

Defined in: [types/securityResources.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L60)

Resource category

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`category`](SecurityResource.md#category)

***

### priority?

> `optional` **priority?**: `number`

Defined in: [types/securityResources.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L65)

Resource priority/relevance score (0-100)

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`priority`](SecurityResource.md#priority)

***

### securityLevels?

> `optional` **securityLevels?**: `string`[]

Defined in: [types/securityResources.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L70)

Security levels this resource applies to

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`securityLevels`](SecurityResource.md#securitylevels)

***

### components?

> `optional` **components?**: `string`[]

Defined in: [types/securityResources.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L75)

Components this resource applies to (multiple possible)

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`components`](SecurityResource.md#components)

***

### relevantLevels?

> `optional` **relevantLevels?**: `string`[]

Defined in: [types/securityResources.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L80)

Levels this resource is relevant for

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`relevantLevels`](SecurityResource.md#relevantlevels)

***

### format?

> `optional` **format?**: `string`

Defined in: [types/securityResources.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L85)

Format of the resource (e.g., PDF, Website, Video)

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`format`](SecurityResource.md#format)

***

### complexity?

> `optional` **complexity?**: `number`

Defined in: [types/securityResources.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L95)

Implementation complexity (1-5)

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`complexity`](SecurityResource.md#complexity)

***

### isPremium?

> `optional` **isPremium?**: `boolean`

Defined in: [types/securityResources.ts:100](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L100)

Whether the resource is premium/paid

#### Inherited from

[`SecurityResource`](SecurityResource.md).[`isPremium`](SecurityResource.md#ispremium)

***

### relevance?

> `optional` **relevance?**: `number`

Defined in: [types/securityResources.ts:180](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L180)

Relevance score for sorting purposes (0-100)

#### Overrides

[`SecurityResource`](SecurityResource.md).[`relevance`](SecurityResource.md#relevance)

***

### score?

> `optional` **score?**: `number`

Defined in: [types/securityResources.ts:185](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/securityResources.ts#L185)

Computed score based on match criteria
