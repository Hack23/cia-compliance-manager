[**CIA Compliance Manager — UML Diagrams v1.1.127**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/ErrorMessage](../README.md) / ErrorMessageProps

# Interface: ErrorMessageProps

Defined in: [components/common/ErrorMessage.tsx:6](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/components/common/ErrorMessage.tsx#L6)

Props for ErrorMessage component

## Properties

### title?

> `optional` **title?**: `string`

Defined in: [components/common/ErrorMessage.tsx:11](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/components/common/ErrorMessage.tsx#L11)

Error title

#### Default

```ts
'Error'
```

***

### message

> **message**: `string`

Defined in: [components/common/ErrorMessage.tsx:16](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/components/common/ErrorMessage.tsx#L16)

Error message to display

***

### retry?

> `optional` **retry?**: () => `void`

Defined in: [components/common/ErrorMessage.tsx:21](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/components/common/ErrorMessage.tsx#L21)

Optional retry callback function

#### Returns

`void`

***

### testId?

> `optional` **testId?**: `string`

Defined in: [components/common/ErrorMessage.tsx:26](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/components/common/ErrorMessage.tsx#L26)

Optional test ID for automated testing

***

### className?

> `optional` **className?**: `string`

Defined in: [components/common/ErrorMessage.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/components/common/ErrorMessage.tsx#L31)

Optional CSS class name
