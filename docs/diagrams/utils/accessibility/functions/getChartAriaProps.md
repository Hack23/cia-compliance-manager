[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getChartAriaProps

# Function: getChartAriaProps()

> **getChartAriaProps**(`label`, `description`, `descriptionId?`): `object`

Defined in: [utils/accessibility.ts:397](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/utils/accessibility.ts#L397)

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
