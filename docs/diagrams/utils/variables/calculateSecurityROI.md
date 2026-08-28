[**CIA Compliance Manager — UML Diagrams v1.1.140**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/utils/index.ts#L73)

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
