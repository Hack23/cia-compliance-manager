[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / widgetRegistryUtils

# Variable: widgetRegistryUtils

> `const` **widgetRegistryUtils**: `object`

Defined in: [src/utils/widgetRegistry.tsx:398](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/utils/widgetRegistry.tsx#L398)

## Type declaration

### getAllWidgetKeys()

> **getAllWidgetKeys**: () => `string`[]

#### Returns

`string`[]

### getWidget()

> **getWidget**: \<`T`\>(`id`) => `undefined` \| [`WidgetDefinition`](../interfaces/WidgetDefinition.md)\<`T`\>

#### Type Parameters

• **T**

#### Parameters

##### id

`string`

#### Returns

`undefined` \| [`WidgetDefinition`](../interfaces/WidgetDefinition.md)\<`T`\>

### renderWidget()

> **renderWidget**: \<`T`\>(`id`, `props`) => `ReactNode`

#### Type Parameters

• **T**

#### Parameters

##### id

`string`

##### props

`Partial`\<`T`\> = `{}`

#### Returns

`ReactNode`

### renderWidgets()

> **renderWidgets**: (`keys`?, `props`) => `ReactNode`[]

#### Parameters

##### keys?

`string`[]

##### props?

`Record`\<`string`, `any`\> = `{}`

#### Returns

`ReactNode`[]
