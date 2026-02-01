[**CIA Compliance Manager Diagrams v1.1.15**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / UseTabsOptions

# Interface: UseTabsOptions

Defined in: [types/tabs.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/tabs.ts#L56)

Options for the useTabs hook

## Properties

### initialTab?

> `optional` **initialTab**: `string`

Defined in: [types/tabs.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/tabs.ts#L58)

Initial active tab ID (defaults to first tab if not specified)

***

### onChange()?

> `optional` **onChange**: (`tabId`) => `void`

Defined in: [types/tabs.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/tabs.ts#L61)

Callback when tab changes

#### Parameters

##### tabId

`string`

#### Returns

`void`
