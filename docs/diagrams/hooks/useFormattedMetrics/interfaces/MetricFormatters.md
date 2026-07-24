[**CIA Compliance Manager — UML Diagrams v1.1.118**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useFormattedMetrics](../README.md) / MetricFormatters

# Interface: MetricFormatters

Defined in: [hooks/useFormattedMetrics.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/hooks/useFormattedMetrics.ts#L22)

Formatted metric functions

## Properties

### currency

> **currency**: (`value`) => `string`

Defined in: [hooks/useFormattedMetrics.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/hooks/useFormattedMetrics.ts#L28)

Format a number as currency

#### Parameters

##### value

`number`

Numeric value to format

#### Returns

`string`

Formatted currency string

***

### percentage

> **percentage**: (`value`, `decimalPlaces?`) => `string`

Defined in: [hooks/useFormattedMetrics.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/hooks/useFormattedMetrics.ts#L36)

Format a decimal as percentage

#### Parameters

##### value

`number`

Decimal value (0-1 range) to format

##### decimalPlaces?

`number`

Number of decimal places (default: 0)

#### Returns

`string`

Formatted percentage string

***

### number

> **number**: (`value`) => `string`

Defined in: [hooks/useFormattedMetrics.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/hooks/useFormattedMetrics.ts#L43)

Format a number with locale-specific formatting

#### Parameters

##### value

`number`

Number to format

#### Returns

`string`

Formatted number string
