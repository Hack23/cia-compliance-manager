[**CIA Compliance Manager — UML Diagrams v1.1.141**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/appConstants](../README.md) / ROI\_ESTIMATES

# Variable: ROI\_ESTIMATES

> `const` **ROI\_ESTIMATES**: `object`

Defined in: [constants/appConstants.ts:137](https://github.com/Hack23/cia-compliance-manager/blob/2466e24be381de87c2cf7f0cbaf94dcc49cfb214/src/constants/appConstants.ts#L137)

ROI estimates by security level

## Type Declaration

### NONE

> **NONE**: `string` = `"Negative (high risk of losses)"`

### LOW

> **LOW**: `string` = `"1-2x for basic security implementation"`

### MODERATE

> **MODERATE**: `string` = `"2-3x with moderate security"`

### HIGH

> **HIGH**: `string` = `"3-5x with high security"`

### VERY\_HIGH

> **VERY\_HIGH**: `string` = `"5x+ with very high security"`

### NONE\_OBJ

> **NONE\_OBJ**: `object`

#### NONE\_OBJ.returnRate

> **returnRate**: `string` = `"0%"`

#### NONE\_OBJ.description

> **description**: `string` = `"No security investment means no return"`

### LOW\_OBJ

> **LOW\_OBJ**: `object`

#### LOW\_OBJ.returnRate

> **returnRate**: `string` = `"120%"`

#### LOW\_OBJ.description

> **description**: `string` = `"Basic security measures provide minimal protection"`

### MODERATE\_OBJ

> **MODERATE\_OBJ**: `object`

#### MODERATE\_OBJ.returnRate

> **returnRate**: `string` = `"200%"`

#### MODERATE\_OBJ.description

> **description**: `string` = `"Standard security provides good cost-benefit balance"`

### HIGH\_OBJ

> **HIGH\_OBJ**: `object`

#### HIGH\_OBJ.returnRate

> **returnRate**: `string` = `"350%"`

#### HIGH\_OBJ.description

> **description**: `string` = `"Advanced security provides significant protection"`

### VERY\_HIGH\_OBJ

> **VERY\_HIGH\_OBJ**: `object`

#### VERY\_HIGH\_OBJ.returnRate

> **returnRate**: `string` = `"450%"`

#### VERY\_HIGH\_OBJ.description

> **description**: `string` = `"Maximum security provides optimal protection"`
