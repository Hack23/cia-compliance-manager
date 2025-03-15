[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / getSecurityMetrics

# Function: getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [src/services/ciaContentService.ts:1379](https://github.com/Hack23/cia-compliance-manager/blob/ab84d120f6a49e6faf7bc7924811e0da9b635211/src/services/ciaContentService.ts#L1379)

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
