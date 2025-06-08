[**CIA Compliance Manager Diagrams v0.8.16**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getCIAOptionsForComponent

# Function: getCIAOptionsForComponent()

> **getCIAOptionsForComponent**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Defined in: [data/ciaOptionsData.ts:315](https://github.com/Hack23/cia-compliance-manager/blob/96f4020424aba8c55d4fe94eddf596babc070968/src/data/ciaOptionsData.ts#L315)

Get CIA options for a specific component

## Parameters

### component

The CIA component to get options for

`"confidentiality"` | `"integrity"` | `"availability"`

## Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Record of security levels and their details
