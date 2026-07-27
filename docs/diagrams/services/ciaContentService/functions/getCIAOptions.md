[**CIA Compliance Manager — UML Diagrams v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / getCIAOptions

# Function: getCIAOptions()

> **getCIAOptions**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Defined in: [services/ciaContentService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/services/ciaContentService.ts#L73)

Get CIA options for a specific component

## Parameters

### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

Component type

## Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Option mapping for the component
