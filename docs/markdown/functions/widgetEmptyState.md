[**CIA Compliance Manager Documentation v0.8.3**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / widgetEmptyState

# Function: widgetEmptyState()

> **widgetEmptyState**(`isEmpty`, `testId`, `children`?): `null` \| `string` \| `number` \| `bigint` \| `true` \| `Iterable`\<`ReactNode`, `any`, `any`\> \| `Promise`\<`AwaitedReactNode`\> \| `Element`

Defined in: [src/utils/widgetHelpers.tsx:382](https://github.com/Hack23/cia-compliance-manager/blob/368d5a1330a94df78d48c65d28962bd0f7cab363/src/utils/widgetHelpers.tsx#L382)

Render empty state message or children if not empty

## Parameters

### isEmpty

`boolean`

Whether the widget is empty

### testId

`string`

Test ID for the empty state

### children?

`ReactNode`

Children to render if not empty

## Returns

`null` \| `string` \| `number` \| `bigint` \| `true` \| `Iterable`\<`ReactNode`, `any`, `any`\> \| `Promise`\<`AwaitedReactNode`\> \| `Element`

Empty state or children
