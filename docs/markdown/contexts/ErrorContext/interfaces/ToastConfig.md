[**CIA Compliance Manager — Markdown Documentation v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / ToastConfig

# Interface: ToastConfig

Defined in: [contexts/ErrorContext.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L45)

Toast notification configuration

## Properties

### message

> **message**: `string`

Defined in: [contexts/ErrorContext.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L47)

Toast message

***

### title?

> `optional` **title?**: `string`

Defined in: [contexts/ErrorContext.tsx:49](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L49)

Toast title (optional)

***

### autoHideDuration?

> `optional` **autoHideDuration?**: `number`

Defined in: [contexts/ErrorContext.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L51)

Auto-hide duration in milliseconds

***

### position?

> `optional` **position?**: [`ToastPosition`](../../../components/common/ErrorToast/type-aliases/ToastPosition.md)

Defined in: [contexts/ErrorContext.tsx:53](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L53)

Toast position

***

### retry?

> `optional` **retry?**: () => `void`

Defined in: [contexts/ErrorContext.tsx:55](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/contexts/ErrorContext.tsx#L55)

Retry callback (optional) - aligns with ErrorToast component API

#### Returns

`void`
