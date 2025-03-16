[**CIA Compliance Manager Documentation v0.8.2**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / HydrateOptions

# Interface: ~~HydrateOptions\<Q, Container, BaseElement\>~~

Defined in: node\_modules/@testing-library/react/types/index.d.ts:73

## Deprecated

## Extends

- [`BaseRenderOptions`](../type-aliases/BaseRenderOptions.md)\<`Q`, `Container`, `BaseElement`\>

## Type Parameters

• **Q** *extends* [`Queries`](Queries.md)

• **Container** *extends* `HydrateableContainer`

• **BaseElement** *extends* `HydrateableContainer` = `Container`

## Properties

### ~~baseElement?~~

> `optional` **baseElement**: `BaseElement`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:108

Defaults to the container if the container is specified. Otherwise `document.body` is used for the default. This is used as
 the base element for the queries as well as what is printed when you use `debug()`.

#### See

https://testing-library.com/docs/react-testing-library/api/#baseelement

#### Inherited from

`BaseRenderOptions.baseElement`

***

### ~~container?~~

> `optional` **container**: `Container`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:101

By default, React Testing Library will create a div and append that div to the document.body. Your React component will be rendered in the created div. If you provide your own HTMLElement container via this option,
 it will not be appended to the document.body automatically.

 For example: If you are unit testing a `<tbody>` element, it cannot be a child of a div. In this case, you can
 specify a table as the render container.

#### See

https://testing-library.com/docs/react-testing-library/api/#container

#### Inherited from

`BaseRenderOptions.container`

***

### ~~hydrate~~

> **hydrate**: `true`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:84

If `hydrate` is set to `true`, then it will render with `ReactDOM.hydrate`. This may be useful if you are using server-side
 rendering and use ReactDOM.hydrate to mount your components.

#### See

https://testing-library.com/docs/react-testing-library/api/#hydrate)

#### Overrides

`BaseRenderOptions.hydrate`

***

### ~~legacyRoot?~~

> `optional` **legacyRoot**: `boolean`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:121

Only works if used with React 18.
Set to `true` if you want to force synchronous `ReactDOM.render`.
Otherwise `render` will default to concurrent React if available.

#### Inherited from

`BaseRenderOptions.legacyRoot`

***

### ~~onCaughtError?~~

> `optional` **onCaughtError**: `undefined`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:129

Only supported in React 19.
Callback called when React catches an error in an Error Boundary.
Called with the error caught by the Error Boundary, and an `errorInfo` object containing the `componentStack`.

#### See

[createRoot#options](https://react.dev/reference/react-dom/client/createRoot#parameters)

#### Inherited from

`BaseRenderOptions.onCaughtError`

***

### ~~onRecoverableError()?~~

> `optional` **onRecoverableError**: (`error`, `errorInfo`) => `void`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:141

Callback called when React automatically recovers from errors.
Called with an error React throws, and an `errorInfo` object containing the `componentStack`.
Some recoverable errors may include the original error cause as `error.cause`.

#### Parameters

##### error

`unknown`

##### errorInfo

`ErrorInfo`

#### Returns

`void`

#### See

[createRoot#options](https://react.dev/reference/react-dom/client/createRoot#parameters)

#### Inherited from

`BaseRenderOptions.onRecoverableError`

***

### ~~onUncaughtError?~~

> `optional` **onUncaughtError**: `undefined`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:145

Not supported at the moment

#### Inherited from

`BaseRenderOptions.onUncaughtError`

***

### ~~queries?~~

> `optional` **queries**: `Q`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:151

Queries to bind. Overrides the default set from DOM Testing Library unless merged.

#### See

https://testing-library.com/docs/react-testing-library/api/#queries

#### Inherited from

`BaseRenderOptions.queries`

***

### ~~wrapper?~~

> `optional` **wrapper**: `JSXElementConstructor`\<\{ `children`: `ReactNode`; \}\>

Defined in: node\_modules/@testing-library/react/types/index.d.ts:158

Pass a React Component as the wrapper option to have it rendered around the inner element. This is most useful for creating
 reusable custom render functions for common data providers. See setup for examples.

#### See

https://testing-library.com/docs/react-testing-library/api/#wrapper

#### Inherited from

`BaseRenderOptions.wrapper`
