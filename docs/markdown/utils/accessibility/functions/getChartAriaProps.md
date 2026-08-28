[**CIA Compliance Manager — Markdown Documentation v1.1.140**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getChartAriaProps

# Function: getChartAriaProps()

> **getChartAriaProps**(`label`, `description`, `descriptionId?`): `object`

Defined in: [utils/accessibility.ts:397](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/utils/accessibility.ts#L397)

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
