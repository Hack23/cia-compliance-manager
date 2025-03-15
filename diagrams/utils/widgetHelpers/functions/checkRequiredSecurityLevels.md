[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/widgetHelpers](../README.md) / checkRequiredSecurityLevels

# Function: checkRequiredSecurityLevels()

> **checkRequiredSecurityLevels**(`securityLevels`, `requiredLevels`?): `boolean`

Defined in: [src/utils/widgetHelpers.tsx:277](https://github.com/Hack23/cia-compliance-manager/blob/ab84d120f6a49e6faf7bc7924811e0da9b635211/src/utils/widgetHelpers.tsx#L277)

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
