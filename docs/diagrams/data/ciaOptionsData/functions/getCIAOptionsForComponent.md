[**CIA Compliance Manager Diagrams v1.1.29**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getCIAOptionsForComponent

# Function: getCIAOptionsForComponent()

> **getCIAOptionsForComponent**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Defined in: [data/ciaOptionsData.ts:313](https://github.com/Hack23/cia-compliance-manager/blob/6b0efc4a0e6dc19fe754f64606c6464995b0f7f5/src/data/ciaOptionsData.ts#L313)

Get CIA options for a specific component

## Parameters

### component

The CIA component to get options for

`"confidentiality"` | `"integrity"` | `"availability"`

## Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Record of security levels and their details
