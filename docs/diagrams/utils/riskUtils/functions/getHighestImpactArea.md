[**CIA Compliance Manager Diagrams v0.9.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/utils/riskUtils.ts#L436)

Identifies the highest impact area from component impact details

## Parameters

### availabilityImpact

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Availability impact details

### integrityImpact

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Integrity impact details

### confidentialityImpact

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Confidentiality impact details

## Returns

`string`

The highest impact area or areas as a string
