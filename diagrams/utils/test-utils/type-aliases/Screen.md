[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-utils](../README.md) / Screen

# Type Alias: Screen\<Q\>

> **Screen**\<`Q`\>: [`BoundFunctions`](BoundFunctions.md)\<`Q`\> & `object`

Defined in: node\_modules/@testing-library/dom/types/screen.d.ts:5

## Type declaration

### debug()

> **debug**: (`element`?, `maxLength`?, `options`?) => `void`

Convenience function for `pretty-dom` which also allows an array
of elements

#### Parameters

##### element?

(`Element` \| `HTMLDocument`)[] | `Element` | `HTMLDocument`

##### maxLength?

`number`

##### options?

[`OptionsReceived`](../namespaces/prettyFormat/type-aliases/OptionsReceived.md)

#### Returns

`void`

### logTestingPlaygroundURL()

> **logTestingPlaygroundURL**: (`element`?) => `string`

Convenience function for `Testing Playground` which logs and returns the URL that
can be opened in a browser

#### Parameters

##### element?

`Element` | `HTMLDocument`

#### Returns

`string`

## Type Parameters

• **Q** *extends* [`Queries`](../interfaces/Queries.md) = *typeof* [`queries`](../namespaces/queries/README.md)
