[**CIA Compliance Manager Documentation v1.1.18**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getChartAriaProps

# Variable: getChartAriaProps()

> **getChartAriaProps**: (`label`, `description`, `descriptionId?`) => `object`

Defined in: [utils/index.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/utils/index.ts#L45)

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
