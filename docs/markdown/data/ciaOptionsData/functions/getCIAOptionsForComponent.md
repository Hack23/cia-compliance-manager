[**CIA Compliance Manager Documentation v1.0.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/ciaOptionsData](../README.md) / getCIAOptionsForComponent

# Function: getCIAOptionsForComponent()

> **getCIAOptionsForComponent**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Defined in: [data/ciaOptionsData.ts:313](https://github.com/Hack23/cia-compliance-manager/blob/0b7da06a2d009cc9cac58e6400d72865b757f5d4/src/data/ciaOptionsData.ts#L313)

Get CIA options for a specific component

## Parameters

### component

The CIA component to get options for

`"confidentiality"` | `"integrity"` | `"availability"`

## Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Record of security levels and their details
