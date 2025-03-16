[**CIA Compliance Manager Diagrams v0.8.1**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/utils/widgetHelpers](../README.md) / checkRequiredSecurityLevels

# Function: checkRequiredSecurityLevels()

> **checkRequiredSecurityLevels**(`securityLevels`, `requiredLevels`?): `boolean`

Defined in: [src/components/widgets/utils/widgetHelpers.tsx:280](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/components/widgets/utils/widgetHelpers.tsx#L280)

Check if all required security levels are present in the given security levels object

## Parameters

### securityLevels

`Record`\<`string`, `unknown`\>

Object containing security levels

### requiredLevels?

`string`[]

Array of required security level keys

## Returns

`boolean`

True if all required levels are present, false otherwise
