[**CIA Compliance Manager Diagrams v0.6.0**](../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../modules.md) / [constants](../../../README.md) / [AppConstants](../README.md) / getTextElementMatcher

# Function: getTextElementMatcher()

> **getTextElementMatcher**(`text`, `className`): (`content`, `element`) => `boolean`

Defined in: [constants/appConstants.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/9aafe15eec550c621832d88d750cb4cde17896e9/src/constants/appConstants.ts#L77)

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
