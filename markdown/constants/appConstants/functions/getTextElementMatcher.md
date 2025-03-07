[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [constants/appConstants](../README.md) / getTextElementMatcher

# Function: getTextElementMatcher()

> **getTextElementMatcher**(`text`, `className`): (`content`, `element`) => `boolean`

Defined in: [src/constants/appConstants.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/constants/appConstants.ts#L77)

Creates a matcher function for testing that checks if text appears in an element with a specific class

## Parameters

### text

`string`

Text to look for

### className

`string`

CSS class the element should have

## Returns

`Function`

A function that returns true if the element matches both conditions

### Parameters

#### content

`string`

#### element

`Element`

### Returns

`boolean`
