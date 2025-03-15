[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [constants/appConstants](../README.md) / getTextElementMatcher

# Function: getTextElementMatcher()

> **getTextElementMatcher**(`text`, `className`): (`content`, `element`) => `boolean`

Defined in: [src/constants/appConstants.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/ab84d120f6a49e6faf7bc7924811e0da9b635211/src/constants/appConstants.ts#L77)

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
