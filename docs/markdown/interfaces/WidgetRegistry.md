[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / WidgetRegistry

# Interface: WidgetRegistry

Defined in: [src/utils/widgetRegistry.tsx:86](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L86)

Widget Registry interface defining the API for working with widgets

## Methods

### get()

> **get**\<`T`\>(`id`): `undefined` \| [`WidgetDefinition`](WidgetDefinition.md)\<`T`\>

Defined in: [src/utils/widgetRegistry.tsx:88](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L88)

#### Type Parameters

• **T**

#### Parameters

##### id

`string`

#### Returns

`undefined` \| [`WidgetDefinition`](WidgetDefinition.md)\<`T`\>

***

### getAll()

> **getAll**(): [`WidgetDefinition`](WidgetDefinition.md)\<`any`\>[]

Defined in: [src/utils/widgetRegistry.tsx:89](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L89)

#### Returns

[`WidgetDefinition`](WidgetDefinition.md)\<`any`\>[]

***

### register()

> **register**\<`T`\>(`definition`): `void`

Defined in: [src/utils/widgetRegistry.tsx:87](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L87)

#### Type Parameters

• **T**

#### Parameters

##### definition

[`WidgetDefinition`](WidgetDefinition.md)\<`T`\>

#### Returns

`void`

***

### renderWidget()

> **renderWidget**\<`T`\>(`id`, `props`?): `ReactNode`

Defined in: [src/utils/widgetRegistry.tsx:90](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L90)

#### Type Parameters

• **T**

#### Parameters

##### id

`string`

##### props?

`Partial`\<`T`\>

#### Returns

`ReactNode`

***

### renderWidgets()

> **renderWidgets**(`filter`?, `props`?): `ReactNode`[]

Defined in: [src/utils/widgetRegistry.tsx:91](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L91)

#### Parameters

##### filter?

(`widget`) => `boolean`

##### props?

`Record`\<`string`, `any`\>

#### Returns

`ReactNode`[]
