[**CIA Compliance Manager Diagrams v0.8.1**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-utils](../README.md) / RenderResult

# Type Alias: RenderResult\<Q, Container, BaseElement\>

> **RenderResult**\<`Q`, `Container`, `BaseElement`\>: `object` & `{ [P in keyof Q]: BoundFunction<Q[P]> }`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:28

## Type declaration

### asFragment()

> **asFragment**: () => `DocumentFragment`

#### Returns

`DocumentFragment`

### baseElement

> **baseElement**: `BaseElement`

### container

> **container**: `Container`

### debug()

> **debug**: (`baseElement`?, `maxLength`?, `options`?) => `void`

#### Parameters

##### baseElement?

`RendererableContainer` | `HydrateableContainer` | (`RendererableContainer` \| `HydrateableContainer`)[]

##### maxLength?

`number`

##### options?

[`OptionsReceived`](../namespaces/prettyFormat/type-aliases/OptionsReceived.md)

#### Returns

`void`

### rerender()

> **rerender**: (`ui`) => `void`

#### Parameters

##### ui

`React.ReactNode`

#### Returns

`void`

### unmount()

> **unmount**: () => `void`

#### Returns

`void`

## Type Parameters

• **Q** *extends* [`Queries`](../interfaces/Queries.md) = *typeof* [`queries`](../namespaces/queries/README.md)

• **Container** *extends* `RendererableContainer` \| `HydrateableContainer` = `HTMLElement`

• **BaseElement** *extends* `RendererableContainer` \| `HydrateableContainer` = `Container`
