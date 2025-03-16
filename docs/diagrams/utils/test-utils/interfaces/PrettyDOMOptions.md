[**CIA Compliance Manager Diagrams v0.8.1**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-utils](../README.md) / PrettyDOMOptions

# Interface: PrettyDOMOptions

Defined in: node\_modules/@testing-library/dom/types/pretty-dom.d.ts:3

## Extends

- [`OptionsReceived`](../namespaces/prettyFormat/type-aliases/OptionsReceived.md)

## Properties

### callToJSON?

> `optional` **callToJSON**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:62

#### Inherited from

`prettyFormat.OptionsReceived.callToJSON`

***

### compareKeys?

> `optional` **compareKeys**: [`CompareKeys`](../namespaces/prettyFormat/type-aliases/CompareKeys.md)

Defined in: node\_modules/pretty-format/build/types.d.ts:63

#### Inherited from

`prettyFormat.OptionsReceived.compareKeys`

***

### escapeRegex?

> `optional` **escapeRegex**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:64

#### Inherited from

`prettyFormat.OptionsReceived.escapeRegex`

***

### escapeString?

> `optional` **escapeString**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:65

#### Inherited from

`prettyFormat.OptionsReceived.escapeString`

***

### filterNode()?

> `optional` **filterNode**: (`node`) => `boolean`

Defined in: node\_modules/@testing-library/dom/types/pretty-dom.d.ts:8

Given a `Node` return `false` if you wish to ignore that node in the output.
By default, ignores `<style />`, `<script />` and comment nodes.

#### Parameters

##### node

`Node`

#### Returns

`boolean`

***

### highlight?

> `optional` **highlight**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:66

#### Inherited from

`prettyFormat.OptionsReceived.highlight`

***

### indent?

> `optional` **indent**: `number`

Defined in: node\_modules/pretty-format/build/types.d.ts:67

#### Inherited from

`prettyFormat.OptionsReceived.indent`

***

### maxDepth?

> `optional` **maxDepth**: `number`

Defined in: node\_modules/pretty-format/build/types.d.ts:68

#### Inherited from

`prettyFormat.OptionsReceived.maxDepth`

***

### min?

> `optional` **min**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:69

#### Inherited from

`prettyFormat.OptionsReceived.min`

***

### plugins?

> `optional` **plugins**: [`Plugins`](../namespaces/prettyFormat/type-aliases/Plugins.md)

Defined in: node\_modules/pretty-format/build/types.d.ts:70

#### Inherited from

`prettyFormat.OptionsReceived.plugins`

***

### printBasicPrototype?

> `optional` **printBasicPrototype**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:71

#### Inherited from

`prettyFormat.OptionsReceived.printBasicPrototype`

***

### printFunctionName?

> `optional` **printFunctionName**: `boolean`

Defined in: node\_modules/pretty-format/build/types.d.ts:72

#### Inherited from

`prettyFormat.OptionsReceived.printFunctionName`

***

### theme?

> `optional` **theme**: `ThemeReceived`

Defined in: node\_modules/pretty-format/build/types.d.ts:73

#### Inherited from

`prettyFormat.OptionsReceived.theme`
