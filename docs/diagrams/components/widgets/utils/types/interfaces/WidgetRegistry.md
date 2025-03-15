[**CIA Compliance Manager Diagrams v0.8.0**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/utils/types](../README.md) / WidgetRegistry

# Interface: WidgetRegistry

Defined in: [src/components/widgets/utils/types.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/components/widgets/utils/types.ts#L31)

Widget registry interface

## Methods

### get()

> **get**(`id`): `undefined` \| [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>

Defined in: [src/components/widgets/utils/types.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/components/widgets/utils/types.ts#L33)

#### Parameters

##### id

`string`

#### Returns

`undefined` \| [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>

***

### getAll()

> **getAll**(): [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>[]

Defined in: [src/components/widgets/utils/types.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/components/widgets/utils/types.ts#L34)

#### Returns

[`WidgetDefinition`](WidgetDefinition.md)\<`any`\>[]

***

### register()

> **register**\<`P`\>(`definition`): `void`

Defined in: [src/components/widgets/utils/types.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/components/widgets/utils/types.ts#L32)

#### Type Parameters

• **P**

#### Parameters

##### definition

[`WidgetDefinition`](WidgetDefinition.md)\<`P`\>

#### Returns

`void`

***

### renderWidget()

> **renderWidget**\<`P`\>(`id`, `props`?): `ReactNode`

Defined in: [src/components/widgets/utils/types.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/components/widgets/utils/types.ts#L35)

#### Type Parameters

• **P**

#### Parameters

##### id

`string`

##### props?

`Partial`\<`P`\>

#### Returns

`ReactNode`

***

### renderWidgets()

> **renderWidgets**(`filter`?, `props`?): `ReactNode`[]

Defined in: [src/components/widgets/utils/types.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/components/widgets/utils/types.ts#L36)

#### Parameters

##### filter?

(`widget`) => `boolean`

##### props?

`Record`\<`string`, `any`\>

#### Returns

`ReactNode`[]
