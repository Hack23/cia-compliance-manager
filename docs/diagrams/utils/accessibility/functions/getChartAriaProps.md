[**CIA Compliance Manager — UML Diagrams v1.1.118**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getChartAriaProps

# Function: getChartAriaProps()

> **getChartAriaProps**(`label`, `description`, `descriptionId?`): `object`

Defined in: [utils/accessibility.ts:397](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/utils/accessibility.ts#L397)

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
