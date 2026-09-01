[**CIA Compliance Manager — Markdown Documentation v1.1.142**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getChartAriaProps

# Variable: getChartAriaProps

> **getChartAriaProps**: (`label`, `description`, `descriptionId?`) => `object`

Defined in: [utils/index.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/utils/index.ts#L39)

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

### aria-label

> **aria-label**: `string`

### aria-describedby?

> `optional` **aria-describedby?**: `string`

### role

> **role**: `string`
