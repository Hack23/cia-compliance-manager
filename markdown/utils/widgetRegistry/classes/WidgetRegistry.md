[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [utils/widgetRegistry](../README.md) / WidgetRegistry

# Class: WidgetRegistry

Defined in: [src/utils/widgetRegistry.tsx:18](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L18)

## Constructors

### new WidgetRegistry()

> **new WidgetRegistry**(): [`WidgetRegistry`](WidgetRegistry.md)

#### Returns

[`WidgetRegistry`](WidgetRegistry.md)

## Properties

### widgets

> `private` **widgets**: `Map`\<`string`, [`WidgetDefinition`](../interfaces/WidgetDefinition.md)\>

Defined in: [src/utils/widgetRegistry.tsx:19](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L19)

## Methods

### get()

> **get**(`id`): `undefined` \| [`WidgetDefinition`](../interfaces/WidgetDefinition.md)

Defined in: [src/utils/widgetRegistry.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L31)

#### Parameters

##### id

`string`

#### Returns

`undefined` \| [`WidgetDefinition`](../interfaces/WidgetDefinition.md)

***

### getAll()

> **getAll**(): [`WidgetDefinition`](../interfaces/WidgetDefinition.md)[]

Defined in: [src/utils/widgetRegistry.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L36)

#### Returns

[`WidgetDefinition`](../interfaces/WidgetDefinition.md)[]

***

### register()

> **register**(`widgetDef`): `void`

Defined in: [src/utils/widgetRegistry.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L22)

#### Parameters

##### widgetDef

[`WidgetDefinition`](../interfaces/WidgetDefinition.md)

#### Returns

`void`

***

### renderWidget()

> **renderWidget**(`id`, `props`): `ReactNode`

Defined in: [src/utils/widgetRegistry.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L47)

#### Parameters

##### id

`string`

##### props

`any` = `{}`

#### Returns

`ReactNode`

***

### renderWidgets()

> **renderWidgets**(`filter`?, `props`?): `ReactNode`[]

Defined in: [src/utils/widgetRegistry.tsx:67](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/utils/widgetRegistry.tsx#L67)

#### Parameters

##### filter?

(`widget`) => `boolean`

##### props?

`Record`\<`string`, `any`\> = `{}`

#### Returns

`ReactNode`[]
