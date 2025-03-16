[**CIA Compliance Manager Documentation v0.8.4**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / widgetEmptyState

# Function: widgetEmptyState()

> **widgetEmptyState**(`isEmpty`, `testId`, `children`?): `null` \| `string` \| `number` \| `bigint` \| `true` \| `Iterable`\<`ReactNode`, `any`, `any`\> \| `Promise`\<`AwaitedReactNode`\> \| `Element`

Defined in: [src/utils/widgetHelpers.tsx:382](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/utils/widgetHelpers.tsx#L382)

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
