[**CIA Compliance Manager Documentation v1.1.18**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/utils/riskUtils.ts#L448)

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
