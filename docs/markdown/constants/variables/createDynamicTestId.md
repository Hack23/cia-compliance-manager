[**CIA Compliance Manager Documentation v0.8.16**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [constants](../README.md) / createDynamicTestId

# Variable: createDynamicTestId

> `const` **createDynamicTestId**: `object`

Defined in: [constants/testIds.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/96f4020424aba8c55d4fe94eddf596babc070968/src/constants/testIds.ts#L27)

Dynamic test ID creation functions for various component types

## Type declaration

### benefitItem()

> **benefitItem**: (`index`) => `string`

Create test ID for a benefit item

#### Parameters

##### index

`number`

#### Returns

`string`

### categorySpecific()

> **categorySpecific**: (`prefix`, `category`) => `string`

Create test ID for a category-specific item

#### Parameters

##### prefix

`string`

Category prefix

##### category

`string`

Category name

#### Returns

`string`

Category-specific test ID

### complianceControl()

> **complianceControl**: (`id`) => `string`

Create test ID for a compliance control

#### Parameters

##### id

`string`

#### Returns

`string`

### complianceFramework()

> **complianceFramework**: (`name`) => `string`

Create test ID for a compliance framework

#### Parameters

##### name

`string`

#### Returns

`string`

### considerationDescription()

> **considerationDescription**: (`index`) => `string`

Create test ID for a consideration description

#### Parameters

##### index

`number`

#### Returns

`string`

### considerationItem()

> **considerationItem**: (`index`) => `string`

Create test ID for a consideration item

#### Parameters

##### index

`number`

#### Returns

`string`

### framework()

> **framework**: (`index`) => `string`

Create test ID for a framework

#### Parameters

##### index

`number`

#### Returns

`string`

### frameworkStatus()

> **frameworkStatus**: (`framework`) => `string`

Create test ID for a framework status

#### Parameters

##### framework

`string`

#### Returns

`string`

### impactItem()

> **impactItem**: (`index`) => `string`

Create test ID for an impact item

#### Parameters

##### index

`number`

#### Returns

`string`

### impactType()

> **impactType**: (`index`) => `string`

Create test ID for an impact type

#### Parameters

##### index

`number`

#### Returns

`string`

### impactTypeKv()

> **impactTypeKv**: (`index`) => `string`

Create test ID for an impact type key-value pair

#### Parameters

##### index

`number`

#### Returns

`string`

### implementationStep()

> **implementationStep**: (`index`) => `string`

Create test ID for an implementation step

#### Parameters

##### index

`number`

#### Returns

`string`

### keyBenefit()

> **keyBenefit**: (`index`) => `string`

Create test ID for a key benefit

#### Parameters

##### index

`number`

#### Returns

`string`

### menuItem()

> **menuItem**: (`index`) => `string`

Create test ID for a menu item

#### Parameters

##### index

`number`

#### Returns

`string`

### option()

> **option**: (`level`) => `string`

Create test ID for an option

#### Parameters

##### level

`string`

#### Returns

`string`

### riskBadge()

> **riskBadge**: (`index`) => `string`

Create test ID for a risk badge

#### Parameters

##### index

`number`

#### Returns

`string`

### securityLevel()

> **securityLevel**: (`level`) => `string`

Create test ID for a security level

#### Parameters

##### level

`string`

#### Returns

`string`

### securityResource()

> **securityResource**: (`index`) => `string`

Create test ID for a security resource

#### Parameters

##### index

`number`

#### Returns

`string`

### techStack()

> **techStack**: (`index`) => `string`

Create test ID for a tech stack

#### Parameters

##### index

`number`

#### Returns

`string`

### valuePoint()

> **valuePoint**: (`index`) => `string`

Create test ID for a value point

#### Parameters

##### index

`number`

#### Returns

`string`

### widgetId()

> **widgetId**: (`id`) => `string`

Create test ID for a widget

#### Parameters

##### id

`string`

#### Returns

`string`
