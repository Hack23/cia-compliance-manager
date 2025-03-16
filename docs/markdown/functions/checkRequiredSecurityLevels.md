[**CIA Compliance Manager Documentation v0.8.0**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / checkRequiredSecurityLevels

# Function: checkRequiredSecurityLevels()

> **checkRequiredSecurityLevels**(`securityLevels`, `requiredLevels`?): `boolean`

Defined in: [src/utils/widgetHelpers.tsx:277](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/utils/widgetHelpers.tsx#L277)

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
