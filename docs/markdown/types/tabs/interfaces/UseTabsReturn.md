[**CIA Compliance Manager — Markdown Documentation v1.1.113**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/tabs](../README.md) / UseTabsReturn

# Interface: UseTabsReturn

Defined in: [types/tabs.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/tabs.ts#L67)

Return type for the useTabs hook

## Properties

### activeTab

> **activeTab**: `string`

Defined in: [types/tabs.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/tabs.ts#L69)

Currently active tab ID

***

### selectTab

> **selectTab**: (`tabId`) => `void`

Defined in: [types/tabs.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/tabs.ts#L72)

Function to select a tab programmatically

#### Parameters

##### tabId

`string`

#### Returns

`void`

***

### handleKeyDown

> **handleKeyDown**: (`event`, `currentTabId`) => `void`

Defined in: [types/tabs.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/tabs.ts#L75)

Keyboard event handler for tab navigation

#### Parameters

##### event

`KeyboardEvent`

##### currentTabId

`string`

#### Returns

`void`

***

### tabRefs

> **tabRefs**: `MutableRefObject`\<`Map`\<`string`, `HTMLButtonElement`\>\>

Defined in: [types/tabs.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/tabs.ts#L78)

Ref map for tab button elements (used for focus management)
