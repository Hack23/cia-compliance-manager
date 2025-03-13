[**CIA Compliance Manager Diagrams v0.7.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../globals.md) / [AppConstants](../README.md) / getTextElementMatcher

# Function: getTextElementMatcher()

> **getTextElementMatcher**(`text`, `className`): (`content`, `element`) => `boolean`

Defined in: [constants/appConstants.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/constants/appConstants.ts#L77)

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
