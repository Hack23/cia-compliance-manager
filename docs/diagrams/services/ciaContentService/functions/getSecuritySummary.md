[**CIA Compliance Manager — UML Diagrams v1.1.122**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / getSecuritySummary

# Function: getSecuritySummary()

> **getSecuritySummary**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [services/ciaContentService.ts:1441](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/services/ciaContentService.ts#L1441)

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

`Promise`\<`Record`\<`string`, `unknown`\>\>

Security summary details
