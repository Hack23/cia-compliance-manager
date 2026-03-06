[**CIA Compliance Manager Documentation v1.1.27**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateSecurityROI

# Function: calculateSecurityROI()

> **calculateSecurityROI**(`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears?`): `object`

Defined in: [utils/costCalculationUtils.ts:164](https://github.com/Hack23/cia-compliance-manager/blob/941390918f346f297f13633b97ad67c12ed14d0e/src/utils/costCalculationUtils.ts#L164)

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
