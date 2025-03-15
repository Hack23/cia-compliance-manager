[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [services/ciaContentService](../README.md) / getSecurityMetrics

# Function: getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [src/services/ciaContentService.ts:1378](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/services/ciaContentService.ts#L1378)

Get combined metrics for a security profile

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`object`

### capexEstimate

> **capexEstimate**: `string`

### isSmallSolution

> **isSmallSolution**: `boolean`

### opexEstimate

> **opexEstimate**: `string`

### roi

> **roi**: `string`

### totalCapex

> **totalCapex**: `number`

### totalOpex

> **totalOpex**: `number`
