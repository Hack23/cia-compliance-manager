[**CIA Compliance Manager — UML Diagrams v1.1.162**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/c5d2cdbe87deaa6017000fb97918cf60099cbeee/src/utils/index.ts#L73)

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
