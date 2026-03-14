[**CIA Compliance Manager Diagrams v1.1.31**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateSecurityROI

# Function: calculateSecurityROI()

> **calculateSecurityROI**(`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears?`): `object`

Defined in: [utils/costCalculationUtils.ts:164](https://github.com/Hack23/cia-compliance-manager/blob/1c8bec6cbe09f80caaef8f0521c4e2e531753f04/src/utils/costCalculationUtils.ts#L164)

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
