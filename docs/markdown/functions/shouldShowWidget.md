[**CIA Compliance Manager Documentation v0.8.3**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / shouldShowWidget

# Function: shouldShowWidget()

> **shouldShowWidget**(`widgetConfig`, `securityLevels`): `boolean`

Defined in: [src/utils/widgetHelpers.tsx:294](https://github.com/Hack23/cia-compliance-manager/blob/368d5a1330a94df78d48c65d28962bd0f7cab363/src/utils/widgetHelpers.tsx#L294)

Determine if a widget should be shown based on configuration and security levels

## Parameters

### widgetConfig

[`WidgetConfig`](../interfaces/WidgetConfig.md)

Widget configuration

### securityLevels

`Record`\<`string`, `unknown`\>

Current security levels

## Returns

`boolean`

True if widget should be visible, false otherwise
