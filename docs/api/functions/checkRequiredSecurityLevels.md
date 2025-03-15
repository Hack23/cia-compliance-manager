[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / checkRequiredSecurityLevels

# Function: checkRequiredSecurityLevels()

> **checkRequiredSecurityLevels**(`securityLevels`, `requiredLevels`?): `boolean`

Defined in: [src/utils/widgetHelpers.tsx:276](https://github.com/Hack23/cia-compliance-manager/blob/main/src/utils/widgetHelpers.tsx#L276)

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
