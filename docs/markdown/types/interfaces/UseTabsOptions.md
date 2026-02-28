[**CIA Compliance Manager Documentation v1.1.26**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / UseTabsOptions

# Interface: UseTabsOptions

Defined in: [types/tabs.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/types/tabs.ts#L56)

Options for the useTabs hook

## Properties

### initialTab?

> `optional` **initialTab**: `string`

Defined in: [types/tabs.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/types/tabs.ts#L58)

Initial active tab ID (defaults to first tab if not specified)

***

### onChange()?

> `optional` **onChange**: (`tabId`) => `void`

Defined in: [types/tabs.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/types/tabs.ts#L61)

Callback when tab changes

#### Parameters

##### tabId

`string`

#### Returns

`void`
