[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI()

> **calculateSecurityROI**: (`securityCost`, `riskReduction`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [src/utils/index.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/utils/index.ts#L54)

Calculate return on investment for security implementation

## Business Perspective

This function helps security officers demonstrate the business value of
security investments, which is critical for getting executive buy-in. It
translates security controls into financial terms that business leaders
understand. 📊

## Parameters

### securityCost

`number`

Total security implementation cost

### riskReduction

`number`

Risk reduction percentage (0-100)

### potentialLoss

`number`

Potential loss from security incidents

### timeframeYears

`number` = `3`

Timeframe for ROI calculation in years

## Returns

`object`

Object containing ROI metrics

### costAvoidance

> **costAvoidance**: `number`

### paybackPeriodMonths

> **paybackPeriodMonths**: `number`

### roi

> **roi**: `number`

### roiPercentage

> **roiPercentage**: `string`
