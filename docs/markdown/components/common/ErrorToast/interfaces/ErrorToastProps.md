[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/ErrorToast](../README.md) / ErrorToastProps

# Interface: ErrorToastProps

Defined in: [components/common/ErrorToast.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L36)

Props for ErrorToast component

## Properties

### message

> **message**: `string`

Defined in: [components/common/ErrorToast.tsx:40](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L40)

Error message to display

***

### title?

> `optional` **title?**: `string`

Defined in: [components/common/ErrorToast.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L45)

Error title (optional)

***

### isVisible

> **isVisible**: `boolean`

Defined in: [components/common/ErrorToast.tsx:50](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L50)

Whether the toast is visible

***

### onDismiss

> **onDismiss**: () => `void`

Defined in: [components/common/ErrorToast.tsx:55](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L55)

Callback when toast is dismissed

#### Returns

`void`

***

### autoHideDuration?

> `optional` **autoHideDuration?**: `number`

Defined in: [components/common/ErrorToast.tsx:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L61)

Auto-dismiss timeout in milliseconds

#### Default

```ts
5000
```

***

### position?

> `optional` **position?**: [`ToastPosition`](../type-aliases/ToastPosition.md)

Defined in: [components/common/ErrorToast.tsx:67](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L67)

Toast position

#### Default

```ts
'top-right'
```

***

### retry?

> `optional` **retry?**: () => `void`

Defined in: [components/common/ErrorToast.tsx:73](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L73)

Optional retry callback function
Aligns with ErrorMessage component API for consistency

#### Returns

`void`

***

### testId?

> `optional` **testId?**: `string`

Defined in: [components/common/ErrorToast.tsx:78](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/ErrorToast.tsx#L78)

Optional test ID for automated testing
