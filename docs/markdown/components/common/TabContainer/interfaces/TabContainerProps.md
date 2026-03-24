[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/TabContainer](../README.md) / TabContainerProps

# Interface: TabContainerProps

Defined in: [components/common/TabContainer.tsx:19](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L19)

Props for TabContainer component

## Properties

### tabs

> **tabs**: [`Tab`](../../../../types/tabs/interfaces/Tab.md)[]

Defined in: [components/common/TabContainer.tsx:21](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L21)

Array of tabs to render

***

### initialTab?

> `optional` **initialTab?**: `string`

Defined in: [components/common/TabContainer.tsx:24](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L24)

Initial active tab ID (defaults to first tab)

***

### onChange?

> `optional` **onChange?**: (`tabId`) => `void`

Defined in: [components/common/TabContainer.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L27)

Callback when tab changes

#### Parameters

##### tabId

`string`

#### Returns

`void`

***

### className?

> `optional` **className?**: `string`

Defined in: [components/common/TabContainer.tsx:30](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L30)

Optional CSS class for additional styling

***

### testId?

> `optional` **testId?**: `string`

Defined in: [components/common/TabContainer.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L33)

Test ID for testing purposes
