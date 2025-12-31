[**CIA Compliance Manager Diagrams v1.1.4**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getChartAriaProps

# Variable: getChartAriaProps()

> **getChartAriaProps**: (`label`, `description`, `descriptionId?`) => `object`

Defined in: [utils/index.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/utils/index.ts#L45)

Generate ARIA props for a chart/visualization

## Parameters

### label

`string`

Chart label

### description

`string`

Detailed chart description

### descriptionId?

`string`

ID of element containing description

## Returns

`object`

ARIA props object

### aria-describedby?

> `optional` **aria-describedby**: `string`

### aria-label

> **aria-label**: `string`

### role

> **role**: `string`
