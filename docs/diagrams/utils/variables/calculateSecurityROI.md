[**CIA Compliance Manager — UML Diagrams v1.1.110**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/utils/index.ts#L73)

Calculate security ROI

## Parameters

### securityCost

`number`

### riskReductionPercent

`number`

### potentialLoss

`number`

### timeframeYears?

`number` = `3`

## Returns

`object`

### roi

> **roi**: `number`

### roiPercentage

> **roiPercentage**: `string`

### paybackPeriodMonths

> **paybackPeriodMonths**: `number`

### costAvoidance

> **costAvoidance**: `number`
