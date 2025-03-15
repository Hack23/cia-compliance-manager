[**CIA Compliance Manager Diagrams v0.8.0**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/utils/widgetHelpers](../README.md) / shouldShowWidget

# Function: shouldShowWidget()

> **shouldShowWidget**(`widgetConfig`, `securityLevels`): `boolean`

Defined in: [src/components/widgets/utils/widgetHelpers.tsx:297](https://github.com/Hack23/cia-compliance-manager/blob/ab84d120f6a49e6faf7bc7924811e0da9b635211/src/components/widgets/utils/widgetHelpers.tsx#L297)

Determine if a widget should be shown based on configuration and security levels

## Parameters

### widgetConfig

[`WidgetConfig`](../../../../../types/widget/interfaces/WidgetConfig.md)

Widget configuration

### securityLevels

`Record`\<`string`, `unknown`\>

Current security levels

## Returns

`boolean`

True if widget should be visible, false otherwise
