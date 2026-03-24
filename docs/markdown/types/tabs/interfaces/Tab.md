[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/tabs](../README.md) / Tab

# Interface: Tab

Defined in: [types/tabs.ts:17](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L17)

Individual tab configuration

Represents a single tab in a tab list with its associated content and metadata.

## Properties

### id

> **id**: `string`

Defined in: [types/tabs.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L19)

Unique identifier for the tab

***

### label

> **label**: `string`

Defined in: [types/tabs.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L22)

Display label for the tab

***

### icon?

> `optional` **icon?**: `ReactNode`

Defined in: [types/tabs.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L25)

Optional icon element to display alongside the label

***

### badge?

> `optional` **badge?**: `string` \| `number`

Defined in: [types/tabs.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L28)

Optional badge/count to display (e.g., "3" or "New")

***

### content

> **content**: `ReactNode`

Defined in: [types/tabs.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L31)

Content to display when tab is active

***

### disabled?

> `optional` **disabled?**: `boolean`

Defined in: [types/tabs.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L34)

Optional disabled state

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/tabs.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/tabs.ts#L37)

Optional test ID for testing purposes
