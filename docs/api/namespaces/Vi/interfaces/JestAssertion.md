[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../globals.md) / [Vi](../README-1.md) / JestAssertion

# Interface: JestAssertion\<T\>

Defined in: [src/tests/vitest-extensions.d.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L12)

## Extends

- `TestingLibraryMatchers`\<`T`, [`JestAssertion`](JestAssertion.md)\<`T`\>\>

## Type Parameters

• **T** = `any`

## Methods

### toBeChecked()

#### Call Signature

> **toBeChecked**(): `void`

Defined in: [src/tests/vitest-extensions.d.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L34)

##### Returns

`void`

##### Description

Assert whether the given element is checked.

It accepts an `input` of type `checkbox` or `radio` and elements with a `role` of `radio` with a valid
`aria-checked` attribute of "true" or "false".

##### Example

```ts
<input
  type="checkbox"
  checked
  data-testid="input-checkbox" />
<input
  type="radio"
  value="foo"
  data-testid="input-radio" />

const inputCheckbox = getByTestId('input-checkbox')
const inputRadio = getByTestId('input-radio')
expect(inputCheckbox).toBeChecked()
expect(inputRadio).not.toBeChecked()
```

##### See

[testing-library/jest-dom#tobechecked](https://github.com/testing-library/jest-dom#tobechecked)

##### Inherited from

`TestingLibraryMatchers.toBeChecked`

#### Call Signature

> **toBeChecked**(): `any`

Defined in: src/types/global-extensions.d.ts:10

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toBeChecked`

***

### toBeDisabled()

#### Call Signature

> **toBeDisabled**(): `void`

Defined in: [src/tests/vitest-extensions.d.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L32)

##### Returns

`void`

##### Description

Allows you to check whether an element is disabled from the user's perspective.

Matches if the element is a form control and the `disabled` attribute is specified on this element or the
element is a descendant of a form element with a `disabled` attribute.

##### Example

```ts
<button
  data-testid="button"
  type="submit"
  disabled
>
  submit
</button>

expect(getByTestId('button')).toBeDisabled()
```

##### See

[testing-library/jest-dom#tobedisabled](https://github.com/testing-library/jest-dom#tobedisabled)

##### Inherited from

`TestingLibraryMatchers.toBeDisabled`

#### Call Signature

> **toBeDisabled**(): `any`

Defined in: src/types/global-extensions.d.ts:11

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toBeDisabled`

***

### toBeEnabled()

#### Call Signature

> **toBeEnabled**(): `void`

Defined in: [src/tests/vitest-extensions.d.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L33)

##### Returns

`void`

##### Description

Allows you to check whether an element is not disabled from the user's perspective.

Works like `not.toBeDisabled()`.

Use this matcher to avoid double negation in your tests.

##### Example

```ts
<button
  data-testid="button"
  type="submit"
>
  submit
</button>

expect(getByTestId('button')).toBeEnabled()
```

##### See

[testing-library/jest-dom#tobeenabled](https://github.com/testing-library/jest-dom#tobeenabled)

##### Inherited from

`TestingLibraryMatchers.toBeEnabled`

#### Call Signature

> **toBeEnabled**(): `any`

Defined in: src/types/global-extensions.d.ts:12

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toBeEnabled`

***

### toBeGreaterThan()

> **toBeGreaterThan**(`number`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L20)

#### Parameters

##### number

`number`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toBeGreaterThanOrEqual()

> **toBeGreaterThanOrEqual**(`number`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L21)

#### Parameters

##### number

`number`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toBeInTheDocument()

#### Call Signature

> **toBeInTheDocument**(): `void`

Defined in: [src/tests/vitest-extensions.d.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L27)

##### Returns

`void`

##### Description

Assert whether an element is present in the document or not.

##### Example

```ts
<svg data-testid="svg-element"></svg>

expect(queryByTestId('svg-element')).toBeInTheDocument()
expect(queryByTestId('does-not-exist')).not.toBeInTheDocument()
```

##### See

[testing-library/jest-dom#tobeinthedocument](https://github.com/testing-library/jest-dom#tobeinthedocument)

##### Inherited from

`TestingLibraryMatchers.toBeInTheDocument`

#### Call Signature

> **toBeInTheDocument**(): `any`

Defined in: src/types/global-extensions.d.ts:7

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toBeInTheDocument`

***

### toBeLessThan()

> **toBeLessThan**(`number`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L22)

#### Parameters

##### number

`number`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toBeLessThanOrEqual()

> **toBeLessThanOrEqual**(`number`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:23](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L23)

#### Parameters

##### number

`number`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toBeRequired()

> **toBeRequired**(): `any`

Defined in: src/types/global-extensions.d.ts:13

#### Returns

`any`

#### Inherited from

`TestingLibraryMatchers.toBeRequired`

***

### toBeTruthy()

> **toBeTruthy**(): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L18)

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toBeUndefined()

> **toBeUndefined**(): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L19)

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toBeValid()

> **toBeValid**(): `any`

Defined in: src/types/global-extensions.d.ts:14

#### Returns

`any`

#### Inherited from

`TestingLibraryMatchers.toBeValid`

***

### toBeVisible()

#### Call Signature

> **toBeVisible**(): `void`

Defined in: [src/tests/vitest-extensions.d.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L28)

##### Returns

`void`

##### Description

This allows you to check if an element is currently visible to the user.

An element is visible if **all** the following conditions are met:
* it does not have its css property display set to none
* it does not have its css property visibility set to either hidden or collapse
* it does not have its css property opacity set to 0
* its parent element is also visible (and so on up to the top of the DOM tree)
* it does not have the hidden attribute
* if `<details />` it has the open attribute

##### Example

```ts
<div
  data-testid="zero-opacity"
  style="opacity: 0"
>
  Zero Opacity
</div>

<div data-testid="visible">Visible Example</div>

expect(getByTestId('zero-opacity')).not.toBeVisible()
expect(getByTestId('visible')).toBeVisible()
```

##### See

[testing-library/jest-dom#tobevisible](https://github.com/testing-library/jest-dom#tobevisible)

##### Inherited from

`TestingLibraryMatchers.toBeVisible`

#### Call Signature

> **toBeVisible**(): `any`

Defined in: src/types/global-extensions.d.ts:15

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toBeVisible`

***

### toContainElement()

#### Call Signature

> **toContainElement**(`element`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L36)

##### Parameters

###### element

`null` | `HTMLElement`

##### Returns

`void`

##### Description

Allows you to assert whether an element contains another element as a descendant or not.

##### Example

```ts
<span data-testid="ancestor">
  <span data-testid="descendant"></span>
</span>

const ancestor = getByTestId('ancestor')
const descendant = getByTestId('descendant')
const nonExistantElement = getByTestId('does-not-exist')
expect(ancestor).toContainElement(descendant)
expect(descendant).not.toContainElement(ancestor)
expect(ancestor).not.toContainElement(nonExistantElement)
```

##### See

[testing-library/jest-dom#tocontainelement](https://github.com/testing-library/jest-dom#tocontainelement)

##### Inherited from

`TestingLibraryMatchers.toContainElement`

#### Call Signature

> **toContainElement**(`element`): `any`

Defined in: src/types/global-extensions.d.ts:16

##### Parameters

###### element

`null` | `HTMLElement`

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toContainElement`

***

### toContainHTML()

#### Call Signature

> **toContainHTML**(`htmlText`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L37)

##### Parameters

###### htmlText

`string`

##### Returns

`void`

##### Description

Assert whether a string representing a HTML element is contained in another element.

##### Example

```ts
<span data-testid="parent"><span data-testid="child"></span></span>

expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
```

##### See

[testing-library/jest-dom#tocontainhtml](https://github.com/testing-library/jest-dom#tocontainhtml)

##### Inherited from

`TestingLibraryMatchers.toContainHTML`

#### Call Signature

> **toContainHTML**(`htmlText`): `any`

Defined in: src/types/global-extensions.d.ts:17

##### Parameters

###### htmlText

`string`

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toContainHTML`

***

### toEqual()

> **toEqual**(`value`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L25)

#### Parameters

##### value

`any`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toHaveAttribute()

#### Call Signature

> **toHaveAttribute**(`attr`, `value`?): `void`

Defined in: [src/tests/vitest-extensions.d.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L31)

##### Parameters

###### attr

`string`

###### value?

`string`

##### Returns

`void`

##### Description

Allows you to check if a given element has an attribute or not.

You can also optionally check that the attribute has a specific expected value or partial match using
[expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring) or
[expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).

##### Example

```ts
<button
  data-testid="ok-button"
  type="submit"
  disabled
>
  ok
</button>

expect(button).toHaveAttribute('disabled')
expect(button).toHaveAttribute('type', 'submit')
expect(button).not.toHaveAttribute('type', 'button')
```

##### See

[testing-library/jest-dom#tohaveattribute](https://github.com/testing-library/jest-dom#tohaveattribute)

##### Inherited from

`TestingLibraryMatchers.toHaveAttribute`

#### Call Signature

> **toHaveAttribute**(`name`, `value`?): `any`

Defined in: src/types/global-extensions.d.ts:9

##### Parameters

###### name

`string`

###### value?

`string`

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toHaveAttribute`

***

### toHaveBeenCalled()

> **toHaveBeenCalled**(): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L15)

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toHaveBeenCalledTimes()

> **toHaveBeenCalledTimes**(`times`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L16)

#### Parameters

##### times

`number`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toHaveBeenCalledWith()

> **toHaveBeenCalledWith**(...`args`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:17](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L17)

#### Parameters

##### args

...`any`[]

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>

***

### toHaveClass()

#### Call Signature

> **toHaveClass**(`className`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L29)

##### Parameters

###### className

`string`

##### Returns

`void`

##### Description

Check whether the given element has certain classes within its `class` attribute.

You must provide at least one class, unless you are asserting that an element does not have any classes.

##### Example

```ts
<button
  data-testid="delete-button"
  class="btn xs btn-danger"
>
  delete item
</button>

<div data-testid="no-classes">no classes</div>

const deleteButton = getByTestId('delete-button')
const noClasses = getByTestId('no-classes')
expect(deleteButton).toHaveClass('btn')
expect(deleteButton).toHaveClass('btn-danger xs')
expect(deleteButton).toHaveClass(/danger/, 'xs')
expect(deleteButton).toHaveClass('btn xs btn-danger', {exact: true})
expect(deleteButton).not.toHaveClass('btn xs btn-danger', {exact: true})
expect(noClasses).not.toHaveClass()
```

##### See

[testing-library/jest-dom#tohaveclass](https://github.com/testing-library/jest-dom#tohaveclass)

##### Inherited from

`TestingLibraryMatchers.toHaveClass`

#### Call Signature

> **toHaveClass**(...`classNames`): `any`

Defined in: src/types/global-extensions.d.ts:18

##### Parameters

###### classNames

...`string`[]

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toHaveClass`

***

### toHaveFocus()

> **toHaveFocus**(): `any`

Defined in: src/types/global-extensions.d.ts:19

#### Returns

`any`

#### Inherited from

`TestingLibraryMatchers.toHaveFocus`

***

### toHaveFormValues()

> **toHaveFormValues**(`expectedValues`): `any`

Defined in: src/types/global-extensions.d.ts:20

#### Parameters

##### expectedValues

`Record`\<`string`, `any`\>

#### Returns

`any`

#### Inherited from

`TestingLibraryMatchers.toHaveFormValues`

***

### toHaveLength()

> **toHaveLength**(`length`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L39)

#### Parameters

##### length

`number`

#### Returns

`void`

***

### toHaveStyle()

#### Call Signature

> **toHaveStyle**(`css`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L38)

##### Parameters

###### css

`Record`\<`string`, `any`\>

##### Returns

`void`

##### Description

Check if an element has specific css properties with specific values applied.

Only matches if the element has *all* the expected properties applied, not just some of them.

##### Example

```ts
<button
  data-testid="submit-button"
  style="background-color: green; display: none"
>
  submit
</button>

const button = getByTestId('submit-button')
expect(button).toHaveStyle('background-color: green')
expect(button).toHaveStyle({
  'background-color': 'green',
  display: 'none'
})
```

##### See

[testing-library/jest-dom#tohavestyle](https://github.com/testing-library/jest-dom#tohavestyle)

##### Inherited from

`TestingLibraryMatchers.toHaveStyle`

#### Call Signature

> **toHaveStyle**(`css`): `any`

Defined in: src/types/global-extensions.d.ts:21

##### Parameters

###### css

`string` | `Record`\<`string`, `any`\>

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toHaveStyle`

***

### toHaveTextContent()

#### Call Signature

> **toHaveTextContent**(`text`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L30)

##### Parameters

###### text

`string`

##### Returns

`void`

##### Description

Check whether the given element has a text content or not.

When a string argument is passed through, it will perform a partial case-sensitive match to the element
content.

To perform a case-insensitive match, you can use a RegExp with the `/i` modifier.

If you want to match the whole content, you can use a RegExp to do it.

##### Example

```ts
<span data-testid="text-content">Text Content</span>

const element = getByTestId('text-content')
expect(element).toHaveTextContent('Content')
// to match the whole content
expect(element).toHaveTextContent(/^Text Content$/)
// to use case-insentive match
expect(element).toHaveTextContent(/content$/i)
expect(element).not.toHaveTextContent('content')
```

##### See

[testing-library/jest-dom#tohavetextcontent](https://github.com/testing-library/jest-dom#tohavetextcontent)

##### Inherited from

`TestingLibraryMatchers.toHaveTextContent`

#### Call Signature

> **toHaveTextContent**(`text`): `any`

Defined in: src/types/global-extensions.d.ts:8

##### Parameters

###### text

`string` | `RegExp`

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toHaveTextContent`

***

### toHaveValue()

#### Call Signature

> **toHaveValue**(`value`): `void`

Defined in: [src/tests/vitest-extensions.d.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L35)

##### Parameters

###### value

`any`

##### Returns

`void`

##### Description

Check whether the given form element has the specified value.

Accepts `<input>`, `<select>`, and `<textarea>` elements with the exception of `<input type="checkbox">` and
`<input type="radiobox">`, which can be matched only using
[toBeChecked](https://github.com/testing-library/jest-dom#tobechecked) or
[toHaveFormValues](https://github.com/testing-library/jest-dom#tohaveformvalues).

##### Example

```ts
<input
  type="number"
  value="5"
  data-testid="input-number" />

const numberInput = getByTestId('input-number')
expect(numberInput).toHaveValue(5)
```

##### See

[testing-library/jest-dom#tohavevalue](https://github.com/testing-library/jest-dom#tohavevalue)

##### Inherited from

`TestingLibraryMatchers.toHaveValue`

#### Call Signature

> **toHaveValue**(`value`?): `any`

Defined in: src/types/global-extensions.d.ts:22

##### Parameters

###### value?

`string` | `number` | `string`[]

##### Returns

`any`

##### Inherited from

`TestingLibraryMatchers.toHaveValue`

***

### toMatch()

> **toMatch**(`pattern`): [`JestAssertion`](JestAssertion.md)\<`T`\>

Defined in: [src/tests/vitest-extensions.d.ts:24](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L24)

#### Parameters

##### pattern

`string` | `RegExp`

#### Returns

[`JestAssertion`](JestAssertion.md)\<`T`\>
