[**CIA Compliance Manager — UML Diagrams v1.1.121**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getChartAriaProps

# Variable: getChartAriaProps

> **getChartAriaProps**: (`label`, `description`, `descriptionId?`) => `object`

Defined in: [utils/index.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/utils/index.ts#L39)

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
