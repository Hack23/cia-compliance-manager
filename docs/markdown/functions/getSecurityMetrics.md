[**CIA Compliance Manager Documentation v0.8.3**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / getSecurityMetrics

# Function: getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [src/services/ciaContentService.ts:1379](https://github.com/Hack23/cia-compliance-manager/blob/368d5a1330a94df78d48c65d28962bd0f7cab363/src/services/ciaContentService.ts#L1379)

Get combined metrics for a security profile

## Parameters

### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

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
