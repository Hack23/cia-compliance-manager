[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityResourceService](../README.md) / EnhancedSecurityResource

# Interface: EnhancedSecurityResource

Defined in: [services/securityResourceService.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/services/securityResourceService.ts#L9)

Security resource interface

## Extends

- [`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md)

## Properties

### relevance

> **relevance**: `number`

Defined in: [services/securityResourceService.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/services/securityResourceService.ts#L10)

Resource relevance score

#### Overrides

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`relevance`](../../../types/securityResources/interfaces/SecurityResource.md#relevance)

***

### score?

> `optional` **score?**: `number`

Defined in: [services/securityResourceService.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/services/securityResourceService.ts#L11)

***

### id

> **id**: `string`

Defined in: [types/securityResources.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L15)

Resource ID

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`id`](../../../types/securityResources/interfaces/SecurityResource.md#id)

***

### title

> **title**: `string`

Defined in: [types/securityResources.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L20)

Resource title

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`title`](../../../types/securityResources/interfaces/SecurityResource.md#title)

***

### url

> **url**: `string`

Defined in: [types/securityResources.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L25)

Resource URL

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`url`](../../../types/securityResources/interfaces/SecurityResource.md#url)

***

### description?

> `optional` **description?**: `string`

Defined in: [types/securityResources.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L30)

Resource description

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`description`](../../../types/securityResources/interfaces/SecurityResource.md#description)

***

### type?

> `optional` **type?**: `string`

Defined in: [types/securityResources.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L35)

Resource type or category

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`type`](../../../types/securityResources/interfaces/SecurityResource.md#type)

***

### tags?

> `optional` **tags?**: `string`[]

Defined in: [types/securityResources.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L40)

Resource tags

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`tags`](../../../types/securityResources/interfaces/SecurityResource.md#tags)

***

### component?

> `optional` **component?**: `"confidentiality"` \| `"integrity"` \| `"availability"` \| `"general"`

Defined in: [types/securityResources.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L45)

CIA component relevance

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`component`](../../../types/securityResources/interfaces/SecurityResource.md#component)

***

### level?

> `optional` **level?**: `string`

Defined in: [types/securityResources.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L50)

Security level relevance

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`level`](../../../types/securityResources/interfaces/SecurityResource.md#level)

***

### source?

> `optional` **source?**: `string`

Defined in: [types/securityResources.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L55)

Resource source/provider

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`source`](../../../types/securityResources/interfaces/SecurityResource.md#source)

***

### category?

> `optional` **category?**: `string`

Defined in: [types/securityResources.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L60)

Resource category

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`category`](../../../types/securityResources/interfaces/SecurityResource.md#category)

***

### priority?

> `optional` **priority?**: `number`

Defined in: [types/securityResources.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L65)

Resource priority/relevance score (0-100)

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`priority`](../../../types/securityResources/interfaces/SecurityResource.md#priority)

***

### securityLevels?

> `optional` **securityLevels?**: `string`[]

Defined in: [types/securityResources.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L70)

Security levels this resource applies to

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`securityLevels`](../../../types/securityResources/interfaces/SecurityResource.md#securitylevels)

***

### components?

> `optional` **components?**: `string`[]

Defined in: [types/securityResources.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L75)

Components this resource applies to (multiple possible)

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`components`](../../../types/securityResources/interfaces/SecurityResource.md#components)

***

### relevantLevels?

> `optional` **relevantLevels?**: `string`[]

Defined in: [types/securityResources.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L80)

Levels this resource is relevant for

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`relevantLevels`](../../../types/securityResources/interfaces/SecurityResource.md#relevantlevels)

***

### format?

> `optional` **format?**: `string`

Defined in: [types/securityResources.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L85)

Format of the resource (e.g., PDF, Website, Video)

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`format`](../../../types/securityResources/interfaces/SecurityResource.md#format)

***

### complexity?

> `optional` **complexity?**: `number`

Defined in: [types/securityResources.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L95)

Implementation complexity (1-5)

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`complexity`](../../../types/securityResources/interfaces/SecurityResource.md#complexity)

***

### isPremium?

> `optional` **isPremium?**: `boolean`

Defined in: [types/securityResources.ts:100](https://github.com/Hack23/cia-compliance-manager/blob/2f22c374961274dfc0698aa873509225b085645b/src/types/securityResources.ts#L100)

Whether the resource is premium/paid

#### Inherited from

[`SecurityResource`](../../../types/securityResources/interfaces/SecurityResource.md).[`isPremium`](../../../types/securityResources/interfaces/SecurityResource.md#ispremium)
