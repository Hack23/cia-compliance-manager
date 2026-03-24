[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorContextValue

# Interface: ErrorContextValue

Defined in: [contexts/ErrorContext.tsx:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L61)

Error context value

## Properties

### errors

> **errors**: [`ErrorEntry`](ErrorEntry.md)[]

Defined in: [contexts/ErrorContext.tsx:63](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L63)

List of tracked errors

***

### addError

> **addError**: (`error`, `context?`) => `void`

Defined in: [contexts/ErrorContext.tsx:66](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L66)

Add an error to tracking

#### Parameters

##### error

`Error`

##### context?

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### clearError

> **clearError**: (`id`) => `void`

Defined in: [contexts/ErrorContext.tsx:69](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L69)

Clear a specific error

#### Parameters

##### id

`string`

#### Returns

`void`

***

### clearAllErrors

> **clearAllErrors**: () => `void`

Defined in: [contexts/ErrorContext.tsx:72](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L72)

Clear all errors

#### Returns

`void`

***

### showToast

> **showToast**: (`config`) => `void`

Defined in: [contexts/ErrorContext.tsx:75](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L75)

Show a toast notification

#### Parameters

##### config

[`ToastConfig`](ToastConfig.md)

#### Returns

`void`

***

### hideToast

> **hideToast**: () => `void`

Defined in: [contexts/ErrorContext.tsx:78](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L78)

Hide the current toast

#### Returns

`void`

***

### getLatestError

> **getLatestError**: () => [`ErrorEntry`](ErrorEntry.md) \| `undefined`

Defined in: [contexts/ErrorContext.tsx:81](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/ErrorContext.tsx#L81)

Get the most recent error

#### Returns

[`ErrorEntry`](ErrorEntry.md) \| `undefined`
