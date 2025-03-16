[**CIA Compliance Manager Diagrams v0.8.2**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/test-utils](../README.md) / Config

# Interface: Config

Defined in: node\_modules/@testing-library/react/types/index.d.ts:16

## Extends

- `Config`

## Properties

### asyncUtilTimeout

> **asyncUtilTimeout**: `number`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:12

#### Inherited from

`ConfigDTL.asyncUtilTimeout`

***

### computedStyleSupportsPseudoElements

> **computedStyleSupportsPseudoElements**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:13

#### Inherited from

`ConfigDTL.computedStyleSupportsPseudoElements`

***

### defaultHidden

> **defaultHidden**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:14

#### Inherited from

`ConfigDTL.defaultHidden`

***

### defaultIgnore

> **defaultIgnore**: `string`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:16

default value for the `ignore` option in `ByText` queries

#### Inherited from

`ConfigDTL.defaultIgnore`

***

### getElementError()

> **getElementError**: (`message`, `container`) => `Error`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:19

#### Parameters

##### message

`null` | `string`

##### container

`Element`

#### Returns

`Error`

#### Inherited from

`ConfigDTL.getElementError`

***

### reactStrictMode

> **reactStrictMode**: `boolean`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:17

***

### showOriginalStackTrace

> **showOriginalStackTrace**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:17

#### Inherited from

`ConfigDTL.showOriginalStackTrace`

***

### testIdAttribute

> **testIdAttribute**: `string`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:2

#### Inherited from

`ConfigDTL.testIdAttribute`

***

### throwSuggestions

> **throwSuggestions**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:18

#### Inherited from

`ConfigDTL.throwSuggestions`

## Methods

### asyncWrapper()

> **asyncWrapper**(`cb`): `Promise`\<`any`\>

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:9

#### Parameters

##### cb

(...`args`) => `any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`ConfigDTL.asyncWrapper`

***

### eventWrapper()

> **eventWrapper**(`cb`): `void`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:11

#### Parameters

##### cb

(...`args`) => `any`

#### Returns

`void`

#### Inherited from

`ConfigDTL.eventWrapper`

***

### unstable\_advanceTimersWrapper()

> **unstable\_advanceTimersWrapper**(`cb`): `unknown`

Defined in: node\_modules/@testing-library/dom/types/config.d.ts:7

WARNING: `unstable` prefix means this API may change in patch and minor releases.

#### Parameters

##### cb

(...`args`) => `unknown`

#### Returns

`unknown`

#### Inherited from

`ConfigDTL.unstable_advanceTimersWrapper`
