[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / UseTabsReturn

# Interface: UseTabsReturn

Defined in: [types/tabs.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/tabs.ts#L67)

Return type for the useTabs hook

## Properties

### activeTab

> **activeTab**: `string`

Defined in: [types/tabs.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/tabs.ts#L69)

Currently active tab ID

***

### handleKeyDown()

> **handleKeyDown**: (`event`, `currentTabId`) => `void`

Defined in: [types/tabs.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/tabs.ts#L75)

Keyboard event handler for tab navigation

#### Parameters

##### event

`KeyboardEvent`

##### currentTabId

`string`

#### Returns

`void`

***

### selectTab()

> **selectTab**: (`tabId`) => `void`

Defined in: [types/tabs.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/tabs.ts#L72)

Function to select a tab programmatically

#### Parameters

##### tabId

`string`

#### Returns

`void`

***

### tabRefs

> **tabRefs**: `MutableRefObject`\<`Map`\<`string`, `HTMLButtonElement`\>\>

Defined in: [types/tabs.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/tabs.ts#L78)

Ref map for tab button elements (used for focus management)
