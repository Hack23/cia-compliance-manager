[**CIA Compliance Manager Documentation v0.8.0**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / WidgetRegistry

# Interface: WidgetRegistry

Defined in: src/components/widgets/utils/types.ts:31

Widget registry interface

## Methods

### get()

> **get**(`id`): `undefined` \| [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>

Defined in: src/components/widgets/utils/types.ts:33

#### Parameters

##### id

`string`

#### Returns

`undefined` \| [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>

***

### getAll()

> **getAll**(): [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>[]

Defined in: src/components/widgets/utils/types.ts:34

#### Returns

[`WidgetDefinition`](WidgetDefinition.md)\<`any`\>[]

***

### register()

> **register**\<`P`\>(`definition`): `void`

Defined in: src/components/widgets/utils/types.ts:32

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

Defined in: src/components/widgets/utils/types.ts:35

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

Defined in: src/components/widgets/utils/types.ts:36

#### Parameters

##### filter?

(`widget`) => `boolean`

##### props?

`Record`\<`string`, `any`\>

#### Returns

`ReactNode`[]
