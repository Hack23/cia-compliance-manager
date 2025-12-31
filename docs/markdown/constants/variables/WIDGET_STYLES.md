[**CIA Compliance Manager Documentation v1.1.4**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [constants](../README.md) / WIDGET\_STYLES

# Variable: WIDGET\_STYLES

> `const` **WIDGET\_STYLES**: `object`

Defined in: [constants/designTokens.ts:295](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/constants/designTokens.ts#L295)

Widget-specific styling utilities
These helpers generate consistent className strings for common widget patterns

NOTE: These utilities are provided for convenience and future use. While all widgets
have been refactored to use design tokens via inline Tailwind classes, these helpers
can be adopted in future refactoring to further reduce code duplication and improve
maintainability. They are kept for forward compatibility and as reference patterns.

## Type Declaration

### badge()

> `readonly` **badge**: (`variant`) => `string`

Get badge classes

#### Parameters

##### variant

Color variant (primary, success, warning, error, info, neutral)

`"success"` | `"info"` | `"warning"` | `"error"` | `"neutral"` | `"primary"`

#### Returns

`string`

Tailwind className string for badges

### card()

> `readonly` **card**: () => `string`

Get card classes for nested content

#### Returns

`string`

Tailwind className string for cards within widgets

### container()

> `readonly` **container**: () => `string`

Get widget container classes

#### Returns

`string`

Tailwind className string for widget containers

### content()

> `readonly` **content**: () => `string`

Get widget content classes

#### Returns

`string`

Tailwind className string for widget content areas

### header()

> `readonly` **header**: () => `string`

Get widget header classes

#### Returns

`string`

Tailwind className string for widget headers

### section()

> `readonly` **section**: () => `string`

Get widget section classes

#### Returns

`string`

Tailwind className string for widget sections

### subtitle()

> `readonly` **subtitle**: () => `string`

Get widget subtitle classes

#### Returns

`string`

Tailwind className string for widget subtitles

### title()

> `readonly` **title**: () => `string`

Get widget title classes

#### Returns

`string`

Tailwind className string for widget titles
