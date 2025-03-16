[**CIA Compliance Manager Diagrams v0.8.1**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/utils/widgetHelpers](../README.md) / shouldShowWidget

# Function: shouldShowWidget()

> **shouldShowWidget**(`widgetConfig`, `securityLevels`): `boolean`

Defined in: [src/components/widgets/utils/widgetHelpers.tsx:297](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/components/widgets/utils/widgetHelpers.tsx#L297)

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
