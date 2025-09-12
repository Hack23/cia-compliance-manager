[**CIA Compliance Manager Diagrams v0.8.27**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI()

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/26bb73ca86d23be8656cdd29d12202323a449310/src/utils/index.ts#L56)

Calculate security ROI

## Parameters

### securityCost

`number`

### riskReductionPercent

`number`

### potentialLoss

`number`

### timeframeYears

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
