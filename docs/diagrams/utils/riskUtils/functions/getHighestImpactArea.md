[**CIA Compliance Manager Diagrams v1.0.6**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:430](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/utils/riskUtils.ts#L430)

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
