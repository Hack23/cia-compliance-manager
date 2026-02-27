[**CIA Compliance Manager Diagrams v1.1.25**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI()

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/59ebd29f77a54a25971ff7a3c0faf33a391bbcc5/src/utils/index.ts#L82)

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

### costAvoidance

> **costAvoidance**: `number`

### paybackPeriodMonths

> **paybackPeriodMonths**: `number`

### roi

> **roi**: `number`

### roiPercentage

> **roiPercentage**: `string`
