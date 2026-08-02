[**CIA Compliance Manager — Markdown Documentation v1.1.125**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/d9b35b5e30691338e6477d6720a70864ae43ae9b/src/utils/index.ts#L73)

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
