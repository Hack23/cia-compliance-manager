[**CIA Compliance Manager Documentation v0.8.1**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / checkRequiredSecurityLevels

# Function: checkRequiredSecurityLevels()

> **checkRequiredSecurityLevels**(`securityLevels`, `requiredLevels`?): `boolean`

Defined in: [src/utils/widgetHelpers.tsx:277](https://github.com/Hack23/cia-compliance-manager/blob/4236f4375d9cfb0505c191818eeb5443ec527132/src/utils/widgetHelpers.tsx#L277)

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
