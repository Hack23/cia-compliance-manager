[**CIA Compliance Manager Diagrams v0.8.4**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-utils](../README.md) / renderHook

# Function: renderHook()

> **renderHook**\<`Result`, `Props`, `Q`, `Container`, `BaseElement`\>(`render`, `options`?): [`RenderHookResult`](../interfaces/RenderHookResult.md)\<`Result`, `Props`\>

Defined in: node\_modules/@testing-library/react/types/index.d.ts:258

Allows you to render a hook within a test React component without having to
create that component yourself.

## Type Parameters

• **Result**

• **Props**

• **Q** *extends* [`Queries`](../interfaces/Queries.md) = [`queries`](../namespaces/queries/README.md)

• **Container** *extends* `Container` = `HTMLElement`

• **BaseElement** *extends* `Container` = `Container`

## Parameters

### render

(`initialProps`) => `Result`

### options?

[`RenderHookOptions`](../interfaces/RenderHookOptions.md)\<`Props`, `Q`, `Container`, `BaseElement`\>

## Returns

[`RenderHookResult`](../interfaces/RenderHookResult.md)\<`Result`, `Props`\>
