[**CIA Compliance Manager Documentation v1.0.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:430](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/utils/riskUtils.ts#L430)

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
