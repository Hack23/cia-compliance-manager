[**CIA Compliance Manager — UML Diagrams v1.1.130**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/ErrorContext](../README.md) / ToastConfig

# Interface: ToastConfig

Defined in: [contexts/ErrorContext.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/b7a836960c2f0704ea92d886eb94f0e28258ad80/src/contexts/ErrorContext.tsx#L45)

Toast notification configuration

## Properties

### message

> **message**: `string`

Defined in: [contexts/ErrorContext.tsx:47](https://github.com/Hack23/cia-compliance-manager/blob/b7a836960c2f0704ea92d886eb94f0e28258ad80/src/contexts/ErrorContext.tsx#L47)

Toast message

***

### title?

> `optional` **title?**: `string`

Defined in: [contexts/ErrorContext.tsx:49](https://github.com/Hack23/cia-compliance-manager/blob/b7a836960c2f0704ea92d886eb94f0e28258ad80/src/contexts/ErrorContext.tsx#L49)

Toast title (optional)

***

### autoHideDuration?

> `optional` **autoHideDuration?**: `number`

Defined in: [contexts/ErrorContext.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/b7a836960c2f0704ea92d886eb94f0e28258ad80/src/contexts/ErrorContext.tsx#L51)

Auto-hide duration in milliseconds

***

### position?

> `optional` **position?**: [`ToastPosition`](../../../components/common/ErrorToast/type-aliases/ToastPosition.md)

Defined in: [contexts/ErrorContext.tsx:53](https://github.com/Hack23/cia-compliance-manager/blob/b7a836960c2f0704ea92d886eb94f0e28258ad80/src/contexts/ErrorContext.tsx#L53)

Toast position

***

### retry?

> `optional` **retry?**: () => `void`

Defined in: [contexts/ErrorContext.tsx:55](https://github.com/Hack23/cia-compliance-manager/blob/b7a836960c2f0704ea92d886eb94f0e28258ad80/src/contexts/ErrorContext.tsx#L55)

Retry callback (optional) - aligns with ErrorToast component API

#### Returns

`void`
