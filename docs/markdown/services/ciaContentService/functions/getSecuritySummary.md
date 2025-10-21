[**CIA Compliance Manager Documentation v0.8.33**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/ciaContentService](../README.md) / getSecuritySummary

# Function: getSecuritySummary()

> **getSecuritySummary**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/ciaContentService.ts:1428](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/services/ciaContentService.ts#L1428)

Get security summary based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`Promise`\<`any`\>

Security summary details
